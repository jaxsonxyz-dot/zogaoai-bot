# Project architecture

- Keep case study content and image ordering in `src/data/caseStudies.ts`, because cards, detail pages and service cross-links all consume the same catalog.
- Keep uploaded portfolio media as Lovable Assets pointer files under `src/assets/casestudies/`, because the repository should not contain large binary uploads.