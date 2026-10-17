# Current Portfolio State

## Completed

### Hero V2
- Existing 3D room retained.
- Black/crimson cinematic presentation.
- Responsive and reduced-motion behavior preserved.

### About
- Complete: verified copy and compact capability rows on the left.
- Existing `astas_sword_demon_slayer.glb` is the only 3D object on the right.
- Transparent canvas with dark-metal/charcoal materials and restrained lighting.
- Lightweight SVG rune, crimson glow, haze, embers and vignette recreate the reference atmosphere.
- Desktop uses a 55/45 split; tablet/mobile stack copy, capabilities and artifact.
- Pointer tilt is restrained; reduced motion keeps the model visible and static.
- Artifact tuning pass complete: sword/rock runtime transforms, cinematic 3/4 camera, stronger PBR contrast, crimson rim/underlight and a softened terrain base.
- Final artifact pass complete: brighter neutral blade detail, clearer crimson edge light, smaller charcoal rock and a tighter glow behind the lower sword.

### Selected Work V2
- Header: "02 / SELECTED WORK" with the serif statement "Projects that turn ideas into real products." plus an anchor link down to the flagship.
- IELTSHUB stays flagship via the `featured` flag in `constants/projects.js`; asymmetric desktop composition — text/meta column left, dominant media area right with restrained crimson atmosphere. Null image keeps the honest mediaNote placeholder.
- Chapter numbers (CHAPTER 01–05) are derived automatically from position in `projects.js`; no project names, stacks, links or images are hardcoded in JSX. Missing `liveUrl`/`githubUrl` still omits the CTA.
- Remaining projects render as alternating editorial case-study chapters (never a card grid); new data entries need no JSX changes.
- Motion reuses Reveal/Divider/Framer Motion with reduced-motion support; no new dependencies.

### Tech Stack V2
- Complete: 03 / TECH STACK uses a 55/45 editorial heading-and-artifact composition followed by data-driven capability rows.
- Every group and technology renders directly from `src/constants/techStack.js`; no skills or evidence were added.
- The primitive R3F book was replaced by an original locally generated, optimized WebP grimoire with worn leather, parchment, metal and restrained crimson detail; it uses CSS perspective rather than another 3D scene and requires no external license.
- Smooth pointer tilt and slow float stop under reduced motion while the static artifact remains fully visible.
- Technology tiles use recognizable brand marks from the existing `react-icons` dependency through a presentation-only icon map; unsupported items render as clean text with no fake monograms.
- Tablet/mobile stack cleanly, the artifact stays centered at a reduced height, tokens wrap, decorative effects reduce and touch scrolling remains available.

### Contact
- Existing dark/crimson composition retained and expanded with a responsive contact form plus the original Email, LinkedIn, GitHub and Resume alternatives.
- Form supports idle, sending, success and error states, accessible live feedback, native client validation and duplicate-submit prevention.
- `POST /api/contact` validates and normalizes input server-side, uses a hidden honeypot and lightweight per-instance IP throttling, and sends plain-text mail through Resend with the visitor address as reply-to.
- Server-only configuration is documented in `.env.example`: `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.

### Final QA / Polish
- Verified the complete Navbar → Hero → About → Selected Work → Tech Stack → Experience → Engineering Proof → Credentials → Contact → Footer flow at 1440, 1280, 1024, 768, 430, 390, 375 and 320px.
- Confirmed no document-level horizontal overflow, broken images, missing anchor targets, empty hash links, HTTP failures or application console errors at the tested widths.
- Mobile navigation opens and closes correctly (including Escape), anchor offsets clear the fixed navbar, keyboard focus is visible and the document retains one logical H1.
- Reduced motion disables ambient drift, hero embers and smooth scrolling while keeping all content visible and composed.
- Contact validation, sending lock, success-only reset, retained error input and accessible status messages were exercised without sending a real email.
- The lightweight fixed crimson ambience now passes through non-Hero section backgrounds as intended; local section atmosphere remains restrained and the animation is disabled under reduced motion.
- Existing Three.js production chunk advisory remains known; no new dependency, canvas or heavy media was added.

## Next sections

1. Experience.
2. Engineering Proof.
3. Credentials.
4. Footer.

## Important

Work section-by-section.
Do not redesign finished sections without an explicit request.
