# Replace Only the Services Orbital Animation

## Scope

Change only the existing animated visual on the right side of the Services-page hero. Preserve the navbar, logo, hero copy, buttons, service cards, all other sections, page spacing, routes, and footer exactly as they are.

## Animation replacement

- Replace the current orbit visual inside `src/pages/Services.tsx` with a lightweight, reference-matched orbital system.
- Keep the existing animation container and its responsive footprint so the surrounding two-column layout does not move.
- Draw three thin concentric rings: a restrained outer ring, cyan/blue middle ring, and purple inner ring.
- Keep the center empty except for a soft, breathing blue/purple radial glow.
- Add exactly three glowing orbit particles: pink, purple, and cyan/blue, each traveling continuously at a distinct slow speed.
- Add exactly three dark bordered labels: `STRATEGY` near the upper area, `DESIGN` on the right, and `DEVELOPMENT` near the lower-left.
- Synchronize each label’s subtle brightness, glow, and approximately `1.02` scale pulse with its corresponding particle’s approach.
- Add only a few fixed micro-particles with slow opacity fades and a restrained moving highlight around the rings.

## Technical approach

- Use semantic project colors and scoped CSS classes/keyframes; no image, video, canvas, WebGL, Three.js, or JavaScript animation loop.
- Animate only `transform` and `opacity` where practical for smooth GPU-friendly motion.
- Keep the existing entrance reveal, but use CSS for all continuous orbital movement.
- Add a reduced-motion treatment that stops orbiting while preserving the visual composition.
- Scale the composition proportionally within the existing container across desktop and tablet; retain the page’s current mobile visibility behavior so layout remains unchanged.

## Verification

- Confirm only the hero animation changed by comparing the surrounding Services page before and after.
- Check desktop, tablet, and mobile for proportional rings, correctly placed labels, three visible particles, and no overlap with hero content.
- Confirm smooth motion, subtle label reactions, reduced-motion behavior, clean console output, and a successful build.  
  
Reference fidelity
  Use the attached reference screenshot as the visual source of truth for the orbital animation.
  Match the reference as closely as practical:
  - Overall composition
  - Ring sizes and relative positions
  - Particle colors and approximate positions
  - STRATEGY / DESIGN / DEVELOPMENT label positions
  - Label dimensions and styling
  - Glow intensity
  - Dark background treatment
  - Amount of empty space
  - Overall minimal futuristic aesthetic
  Do not add extra visual elements that are not present in the reference.
  The reference is inspiration for recreating the animation with CSS — do not use the screenshot itself as an asset or background.