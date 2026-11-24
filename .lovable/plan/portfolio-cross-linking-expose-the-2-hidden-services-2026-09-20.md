# Portfolio cross-linking + expose the 2 hidden services

## Goal

The site shows its work in two ways — small image strips on service pages and full case-study stories. Today they are separate silos. We connect them (each points to the other), and we surface the two service pages that already exist but aren't reachable from the Services page: **E-Commerce** (`/services/ecommerce`) and **Architecture** (`/services/architecture`).

## What changes

### 1. Services page — add the 2 missing service cards

In `src/pages/Services.tsx` "What We Offer" grid, add:

- Card 06 — E-Commerce Solutions → `/services/ecommerce`
- Card 07 — Architecture Visualization → `/services/architecture`

Each card follows the existing card design and gets an **image slot**: when a real image is added later it shows there; until then a neutral placeholder with the existing icon treatment is rendered. Grid stays responsive with 7 cards.

### 2. Service pages — "Related Case Studies" section

New reusable component (e.g. `ServiceRelatedCaseStudies`) rendered by `ServicesPageTemplate` above the final CTA on every service page. It pulls matching studies from `src/data/caseStudies.ts` using a service→category map:

| Service page | Case study categories used |
|---|---|
| Brand Strategy | Logo & Branding |
| Graphics Design | Logo & Branding, Image Editing |
| Web Development | Web Design |
| E-Commerce | Shopify |
| Architecture | Architecture |
| SEO, Social Media Marketing | (no direct match) → 3 newest studies, headed "Selected Work" |

Reuses the existing `CaseStudyCard`; 3 cards max; each links to its case-study detail page. Placeholder images show until real case-study images are added — no other content changes.

### 3. Case study pages — service back-link

On the case study detail page, the overview row that reads "Service: …" becomes a link to the matching service page (using the same map). Where no match exists it stays plain text. This closes the loop: client lands on a case study → one click to the service → service page shows more proof.

## What does NOT change

- Navbar, logo, homepage hero (keeps its BeamLight), existing animations, routes (only reusing the two existing routes), colors, design system.
- All placeholder copy stays until you supply real text/images — this plan only wires the structure so dropping real images in later needs no code changes.

## Verification

- Build passes; `/tmp/observability/build-errors.log` clean.
- Playwright check: Services grid shows 7 cards with working links; a service page (e.g. `/services/brand-strategy`) shows the Related Case Studies section with 3 linked cards; a case study's Service row links back to its service page; mobile layout stacks correctly; no console errors.
