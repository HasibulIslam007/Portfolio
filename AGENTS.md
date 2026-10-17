# Portfolio Codex Instructions

This repository is my personal Full-Stack Developer / Software Engineer portfolio.

Before portfolio redesign work, read:
- docs/PORTFOLIO_DESIGN.md
- docs/CURRENT_STATE.md

## Core rules

- Continue from the current implementation; never rebuild the site from scratch.
- Preserve working functionality unless the task explicitly changes it.
- Primary positioning: Full-Stack Developer / Software Engineer.
- Do not call me an AI/ML Researcher.
- Do not create a Research section.
- Never invent jobs, achievements, metrics, project users, certificates, links, or research.

## Design direction

Premium dark cinematic portfolio:
- near-black / charcoal
- restrained deep crimson accents
- warm off-white typography
- editorial serif headings
- clean sans-serif UI/body text
- thin architectural borders
- subtle dark-fantasy atmosphere
- professional first, fantasy second

Avoid:
- gaming HUD
- cyberpunk overload
- excessive neon/glow
- glassmorphism-heavy UI
- giant card grids
- copyrighted anime characters/logos/symbols

## Existing important behavior

Preserve:
- existing Hero 3D room/model
- React Three Fiber / Three.js setup
- GSAP / Framer Motion setup
- mobile navigation
- reduced-motion support
- Resume link
- section anchor offsets

## Workflow

Work on ONE requested section at a time.

Inspect only files relevant to that task.
Do not refactor unrelated code.
Do not add dependencies unless necessary.
Prefer existing components/styles.

After changes:
- run `npx eslint .`
- run `npm run build`

Only perform deeper browser testing when explicitly requested.

Keep final reports concise.