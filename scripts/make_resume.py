# Builds a one-page resume PDF from the SAME verified data the site renders.
# No invented employers, dates, metrics, certificates or education.
lines = []


def H(t):
    lines.append(("H", t))


def T(t):
    lines.append(("T", t))


def S(t):
    lines.append(("S", t))


H("Md Hasibul Islam")
T("Full-Stack Developer / Software Engineer")
S("hasibulislam.bracu@gmail.com  |  github.com/HasibulIslam007  |  linkedin.com/in/md-hasibul-islam-ooo7")

H("Profile")
T("Full-stack developer building web applications end to end: responsive frontends,")
T("backend APIs, authentication, databases and the application architecture that")
T("connects them. Currently building IELTSHUB, an IELTS practice platform.")
T("Secondary interest in applied AI/ML features inside real product applications.")

H("Selected Projects")
S("IELTSHUB - IELTS practice platform (in development)")
T("React exam workspace with local draft recovery, Laravel services for publication,")
T("marking and assessment, and a Filament console for admins and teachers. Shared")
T("TypeScript contracts published as an OpenAPI specification. Playwright browser")
T("tests and PHPUnit suites run in CI on every push.")
T("github.com/HasibulIslam007/IELTSHUB")
S("JobFlow AI - AI job-search workspace (live)")
T("Next.js workspace that captures postings from text, PDFs, screenshots and links,")
T("tracks applications through a pipeline and matches a resume against each role.")
T("Frontend API types are generated from the OpenAPI document; breaking contract")
T("changes fail CI.  github.com/HasibulIslam007/jobflow_frontend")
S("MarketPlace - full-stack marketplace")
T("Next.js storefront over an Express and Prisma API on PostgreSQL, with JWT")
T("authentication, catalog management, orders and SSLCommerz sandbox checkout.")
T("github.com/HasibulIslam007/MarketPlace")
S("AImage - AI image editing (live)")
T("Colorization, background removal and restoration in one interface, built for")
T("speed and simplicity.  github.com/HasibulIslam007/aimage")
S("HomeHunt - rental housing platform (live)")
T("Typed Next.js platform with smart search filters, broker-free listings, contact")
T("forms and role-based access via JWT.  github.com/HasibulIslam007/homehunt_frontend")

H("Technical Skills")
T("Frontend - React, Next.js, TypeScript, JavaScript, Tailwind CSS, TanStack Query, Zustand")
T("Backend - Node.js, Express, Laravel, Filament, PHP, REST APIs, JWT auth")
T("Data - PostgreSQL, MongoDB, Prisma")
T("Tools - Git, GitHub, Playwright, PHPUnit, CI, Vercel, Render, OpenAPI, Clerk")


def esc(s):
    return s.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")


buf = ["BT"]
y = 750
for kind, txt in lines:
    if y < 60:
        break
    font = {"H": "/F1 12 Tf", "S": "/F2 10.5 Tf", "T": "/F3 9.5 Tf"}[kind]
    step = {"H": 18, "S": 13, "T": 12.5}[kind]
    buf.append(f"{font} 1 0 0 1 54 {y:.1f} Tm ({esc(txt)}) Tj")
    y -= step
    if kind == "H":
        y -= 2
buf.append("ET")

content = "\n".join(buf).encode("latin-1")
objs = [
    b"<< /Type /Catalog /Pages 2 0 R >>",
    b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R >>",
    b"<< /Length " + str(len(content)).encode() + b" >>\nstream\n" + content + b"\nendstream",
    b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
    b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
]

out = bytearray(b"%PDF-1.4\n")
offsets = []
for i, o in enumerate(objs, start=1):
    offsets.append(len(out))
    out += f"{i} 0 obj\n".encode() + o + b"\nendobj\n"
xref = len(out)
out += f"xref\n0 {len(objs) + 1}\n".encode() + b"0000000000 65535 f \n"
for off in offsets:
    out += f"{off:010d} 00000 n \n".encode()
out += f"trailer\n<< /Size {len(objs) + 1} /Root 1 0 R >>\nstartxref\n{xref}\n%%EOF\n".encode()

with open("public/resume.pdf", "wb") as fh:
    fh.write(bytes(out))
print("resume bytes:", len(out))