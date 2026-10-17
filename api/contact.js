const MAX_LENGTHS = { name: 100, email: 254, subject: 160, message: 5000, website: 200 };
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimits = new Map();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeText = (value, maxLength) => {
  if (typeof value !== "string") return null;
  const normalized = value.replace(/\r\n?/g, "\n").trim();
  return normalized.length <= maxLength ? normalized : null;
};

export const validateContactPayload = (body) => {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const name = normalizeText(body.name, MAX_LENGTHS.name);
  const email = normalizeText(body.email, MAX_LENGTHS.email)?.toLowerCase() ?? null;
  const subject = normalizeText(body.subject ?? "", MAX_LENGTHS.subject);
  const message = normalizeText(body.message, MAX_LENGTHS.message);
  const website = normalizeText(body.website ?? "", MAX_LENGTHS.website);
  if (!name || !email || !message || subject === null || website === null) return null;
  if (!EMAIL_PATTERN.test(email) || /[\r\n]/.test(email)) return null;
  return { name, email, subject, message, website };
};

const getClientIp = (request) => {
  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return request.socket?.remoteAddress || "unknown";
};

const isRateLimited = (ip) => {
  const now = Date.now();
  const attempts = (rateLimits.get(ip) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
  attempts.push(now);
  rateLimits.set(ip, attempts);
  return attempts.length > RATE_LIMIT_MAX;
};

const parseBody = (body) => {
  if (typeof body !== "string") return body;
  try { return JSON.parse(body); } catch { return null; }
};

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }
  if (!request.headers["content-type"]?.toLowerCase().startsWith("application/json")) {
    return response.status(415).json({ error: "Content-Type must be application/json." });
  }
  const contentLength = Number(request.headers["content-length"] || 0);
  if (!Number.isFinite(contentLength) || contentLength > 10_000) {
    return response.status(413).json({ error: "Request body is too large." });
  }
  if (isRateLimited(getClientIp(request))) {
    return response.status(429).json({ error: "Too many requests. Please try again later." });
  }

  const contact = validateContactPayload(parseBody(request.body));
  if (!contact) return response.status(400).json({ error: "Invalid contact form submission." });
  if (contact.website) return response.status(200).json({ ok: true });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return response.status(503).json({ error: "Contact service is not configured." });
  }

  const safeSubject = contact.subject.replace(/[\r\n]+/g, " ") || "Portfolio contact form";
  const emailText = [`Name: ${contact.name}`, `Visitor email: ${contact.email}`, `Subject: ${contact.subject || "(No subject)"}`, "", "Message:", contact.message].join("\n");

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: contact.email,
        subject: `Portfolio message: ${safeSubject}`,
        text: emailText,
      }),
    });
    if (!resendResponse.ok) return response.status(502).json({ error: "Email provider rejected the request." });
    return response.status(200).json({ ok: true });
  } catch {
    return response.status(502).json({ error: "Email delivery failed." });
  }
}
