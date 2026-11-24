# Redesign the Services Page — ZOGAGO VISUALS

Only the `/services` page changes. Navbar, logo, brand, routes, and all other pages stay untouched. The page keeps the existing design system: dark navy background (`#1A1F2C`), blue/purple/pink gradients (`#1FB6FA` / `#7928CA` / `#FF2D92`), Inter + Orbitron typography, existing glass styles and button-glow.

## 1. New hero (two-column)

Replace the centered "Our Services" header with a two-column hero:

- **Left:**
  - Small uppercase label: "WHAT WE DO" (gradient accent, tracked out)
  - Headline: "We Turn Ideas Into Impact." — blue→purple gradient text, gentle shimmer
  - Description: "Creative strategy, design and digital solutions built to move your brand forward."
  - Buttons: "Start a Project →" (gradient button → `/contact`) and "View Our Work" (ghost/outline button → `/case-studies`)
- **Right:** custom ambient visual — glowing abstract orbiting shapes/rings and light blooms in the brand blue/purple, built with CSS + framer-motion (slow float, soft pulse). No stock photos, no heavy neon. Keep the existing BeamLight accent lines framing the section.
- Entrance: staggered fade-up of label → headline → text → buttons.

## 2. Premium service-card grid

Title: "What We Offer". Five cards, numbered 01–05:

1. 01 — Brand Strategy
2. 02 — Brand Identity & Design
3. 03 — Web Design & Development → links to `/services/web-development`
4. 04 — Content & Social Media → links to `/services/social-media-marketing`
5. 05 — Digital Marketing → links to `/services/seo`

Each card: minimal Lucide icon, large faint number, title, 1–2 line description, "Explore Service →" link. Dark glassmorphism surface, thin white/10 border, soft blue/purple glow on hover, subtle lift + gradient border sweep. Staggered scroll-in reveal. Cards without a matching service route link to `/contact`.

## 3. "How We Work"

Subtitle: "A simple process. Clear thinking. Measurable results."

Three steps — 01 Discover, 02 Create, 03 Grow — each with a short line of supporting copy. Horizontal layout on desktop with an animated SVG connecting line that draws itself on scroll (framer-motion `whileInView` path animation); dots on the line light up as each step reveals.

## 4. "Built To Make An Impact." (featured work)

2–3 large case-study previews pulled from the existing `src/data/caseStudies.ts` (category, project name, hero visual, "View Case Study →" → `/case-studies/:slug`). Hover: slow image zoom + arrow slide. Note: current case-study content is placeholder text/images — the section is built to display real projects as soon as they're added.

## 5. Final CTA

Centered closing band: "Have an idea worth building?" + "Let's turn your vision into something people remember." + gradient "Start a Project →" button → `/contact`, framed by the existing BeamLight lines.

## Implementation notes

- Rebuild `src/pages/Services.tsx` (single file; small inline sub-sections). Reuse existing tokens/utilities: `zogago-*` colors, `glass-card`, `button-glow`, `BeamLight`, framer-motion.
- All animations: framer-motion `whileInView` reveals with small stagger, CSS keyframes already in `tailwind.config.ts` (float, glow, marquee) — add no new libraries.
- Fully responsive: hero stacks on mobile, process steps go vertical with the connector line hidden, cards single-column.
- Verify in the preview afterwards: hero, all 5 cards, process line animation, case-study links, CTA; check `/case-studies/:slug` links resolve; no console errors.

## Not changing

Navbar, logo, footer, brand name, existing routes, all other pages, toast behavior.
