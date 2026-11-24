"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/*
 * Card Deck Carousel — photos or rich agency cards stacked like a loose deck of prints.
 * Throw the top card in any direction (drag and let go) and it flies off, then slides
 * back in at the bottom of the pile; the next one is already waiting. The
 * buttons, arrow keys and autoplay do the same throw; "previous" pulls the
 * last card back on top.
 *
 * Slides without an `image` get a painted landscape, so it works with no
 * assets at all.
 */

export type LandPalette = "dawn" | "alpine" | "dusk" | "mist"

export type Slide = {
  image?: string
  title?: string
  caption?: string
  alt?: string
  /** Palette and seed of the painted landscape used when `image` is empty. */
  palette?: LandPalette
  seed?: number
  /** Optional custom React content rendered inside the card surface. */
  content?: React.ReactNode
}

export type CardDeckCarouselProps = {
  slides?: Slide[]
  /** Any CSS length. Default 100svh. */
  height?: number | string
  /** Width of a card, any CSS length. */
  cardWidth?: string
  /** Optional explicit height of a card, any CSS length. */
  cardHeight?: string
  /** CSS aspect-ratio of a card. */
  aspect?: string
  /** How messy the pile is: the largest tilt in degrees of the cards behind. */
  scatter?: number
  /** ms per card; 0 turns autoplay off. It waits while someone is interacting. */
  autoplay?: number
  background?: string
  ink?: string
  /** Optional controlled or jump-to index. */
  activeIndex?: number
  onChange?: (index: number) => void
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
}

// #region logic
export function wrap(i: number, n: number): number {
  return n ? ((i % n) + n) % n : 0
}

/** Resting pose of a card `depth` places down the pile. Only the top four show. */
export function deckPose(depth: number, tilt: number, reduce = false) {
  const d = Math.min(depth, 3)
  return {
    y: d ? -d * 13 : 0,
    scale: 1 - d * 0.048,
    rot: depth === 0 || reduce ? 0 : tilt,
    opacity: depth > 3 ? 0 : 1,
    shade: 1 - d * 0.08,
  }
}

/** A stable, slightly random tilt per card, in [-max, max] degrees. */
export function tiltFor(i: number, max: number): number {
  const u = (((i + 1) * 2654435761) >>> 0) / 4294967296
  return (u * 2 - 1) * max
}

/** Did the drag end as a throw? dx in px, vx in px/ms, w = card width. */
export function isThrow(dx: number, vx: number, w: number): boolean {
  return Math.abs(dx) > w * 0.24 || (Math.abs(vx) > 0.48 && Math.abs(dx) > 20)
}

export function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n)
}
// #endregion logic

/* ------------------------------------------------------- painted images */

const PALETTES = {
  dawn: { top: "#e7b7a5", bottom: "#f8e8d6", sun: "#fff4df", far: "#d2b2bb", near: "#3a2a3b", mist: "255,240,232" },
  alpine: { top: "#7ea5c8", bottom: "#e3ecf2", sun: "#ffffff", far: "#a9bfd0", near: "#1c3044", mist: "236,244,250" },
  dusk: { top: "#2a2450", bottom: "#ef8d60", sun: "#ffd9a6", far: "#93607c", near: "#18121f", mist: "255,196,160" },
  mist: { top: "#c4d0cb", bottom: "#eef1ec", sun: "#ffffff", far: "#aebcb5", near: "#2c3a33", mist: "246,248,245" },
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function hexRgb(h: string): [number, number, number] {
  const v = parseInt(h.replace("#", ""), 16)
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255]
}
function mixRgb(a: string, b: string, t: number): string {
  const A = hexRgb(a)
  const B = hexRgb(b)
  return "rgb(" + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",") + ")"
}

// A layered-ridge landscape: sky, a low sun, five ridges fading into haze with
// mist between them, a tree line on the nearest, film grain. Painted once.
function paintLandscape(seed: number, palette: LandPalette, w = 640, h = 400): string {
  if (typeof document === "undefined") return ""
  const c = document.createElement("canvas")
  c.width = w
  c.height = h
  const g = c.getContext("2d")
  if (!g) return ""
  const P = PALETTES[palette] ?? PALETTES.dawn
  const r = mulberry32(seed * 104729 + 7)

  const sky = g.createLinearGradient(0, 0, 0, h * 0.72)
  sky.addColorStop(0, P.top)
  sky.addColorStop(1, P.bottom)
  g.fillStyle = sky
  g.fillRect(0, 0, w, h)
  const sx = w * (0.22 + r() * 0.56)
  const sy = h * (0.26 + r() * 0.16)
  const halo = g.createRadialGradient(sx, sy, 0, sx, sy, w * 0.45)
  halo.addColorStop(0, "rgba(" + hexRgb(P.sun).join(",") + ",.85)")
  halo.addColorStop(0.08, "rgba(" + hexRgb(P.sun).join(",") + ",.55)")
  halo.addColorStop(1, "rgba(" + hexRgb(P.sun).join(",") + ",0)")
  g.fillStyle = halo
  g.fillRect(0, 0, w, h)
  g.fillStyle = P.sun
  g.beginPath()
  g.arc(sx, sy, h * 0.045, 0, Math.PI * 2)
  g.fill()

  const layers = 5
  for (let L = 0; L < layers; L++) {
    const k = L / (layers - 1)
    const base = h * (0.42 + k * 0.4)
    const amp = h * (0.07 + k * 0.1)
    const ph = [r(), r(), r(), r()].map((v) => v * Math.PI * 2)
    const fr = [1.3 + r(), 3.1 + r() * 2, 7 + r() * 4, 17 + r() * 8]
    const ridge = (x: number) => {
      const u = x / w
      return (
        base -
        amp *
          (0.55 * Math.sin(u * fr[0] + ph[0]) +
            0.28 * Math.sin(u * fr[1] + ph[1]) +
            0.12 * Math.abs(Math.sin(u * fr[2] + ph[2])) +
            0.05 * Math.sin(u * fr[3] + ph[3]))
      )
    }
    const mist = g.createLinearGradient(0, base - amp * 1.4, 0, base + amp * 0.4)
    mist.addColorStop(0, "rgba(" + P.mist + ",0)")
    mist.addColorStop(1, "rgba(" + P.mist + "," + (0.55 - k * 0.35).toFixed(2) + ")")
    g.fillStyle = mist
    g.fillRect(0, base - amp * 1.4, w, amp * 1.8)
    const body = g.createLinearGradient(0, base - amp, 0, h)
    body.addColorStop(0, mixRgb(P.far, P.near, Math.pow(k, 1.3)))
    body.addColorStop(1, mixRgb(P.far, P.near, Math.min(1, Math.pow(k, 1.3) + 0.18)))
    g.fillStyle = body
    g.beginPath()
    g.moveTo(0, h)
    for (let x = 0; x <= w; x += 6) g.lineTo(x, ridge(x))
    g.lineTo(w, h)
    g.closePath()
    g.fill()
    if (L >= layers - 2) {
      g.fillStyle = mixRgb(P.far, P.near, Math.min(1, Math.pow(k, 1.3) + 0.08))
      for (let x = 0; x < w; x += 7 + r() * 9) {
        if (r() < 0.35) continue
        const y = ridge(x) + 2
        const th = h * (0.025 + r() * 0.035) * (0.6 + k)
        const tw = th * 0.32
        g.beginPath()
        g.moveTo(x, y - th)
        g.lineTo(x + tw, y)
        g.lineTo(x - tw, y)
        g.closePath()
        g.fill()
      }
    }
  }

  const vig = g.createRadialGradient(w / 2, h * 0.45, h * 0.3, w / 2, h / 2, w * 0.78)
  vig.addColorStop(0, "rgba(0,0,0,0)")
  vig.addColorStop(1, "rgba(0,0,0,.32)")
  g.fillStyle = vig
  g.fillRect(0, 0, w, h)
  const grain = g.getImageData(0, 0, w, h)
  const d = grain.data
  for (let i = 0; i < d.length; i += 4) {
    const v = (r() - 0.5) * 14
    d[i] += v
    d[i + 1] += v
    d[i + 2] += v
  }
  g.putImageData(grain, 0, 0)
  return c.toDataURL("image/jpeg", 0.88)
}

const DEFAULT_SLIDES: Slide[] = [
  { title: "First Light", caption: "Haze lifting off the eastern ridges.", palette: "dawn", seed: 3 },
  { title: "High Pass", caption: "Cold air, clear to the far range.", palette: "alpine", seed: 8 },
  { title: "Ember Hour", caption: "The last of the sun on the valley floor.", palette: "dusk", seed: 14 },
  { title: "Still Valley", caption: "Morning mist that never quite lifts.", palette: "mist", seed: 21 },
  { title: "Rose Ridge", caption: "Five ridges, one long exhale.", palette: "dawn", seed: 34 },
  { title: "Blue Hour", caption: "Pines going dark against the snow.", palette: "alpine", seed: 55 },
]

// Every slide as an image URL; slides without one are painted after mount.
function useSlideImages(slides: Slide[]): string[] {
  const key = slides.map((s) => s.image || (s.palette || "dawn") + ":" + (s.seed ?? 1)).join("|")
  const [painted, setPainted] = React.useState(() => slides.map(() => ""))
  React.useEffect(() => {
    setPainted(slides.map((s, i) => (s.image ? "" : paintLandscape(s.seed ?? i + 1, s.palette || "dawn"))))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
  return slides.map((s, i) => s.image || painted[i] || "")
}

const CD_CSS = [
  ".cd-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(16px,2.5vh,26px);overflow:visible;background:var(--cd-bg);color:var(--cd-ink);outline:none;padding:24px 4px 8px;box-sizing:border-box}",
  ".cd-root:focus-visible{box-shadow:inset 0 0 0 2px var(--cd-ink);border-radius:16px}",
  ".cd-deck{position:relative;width:min(100%,var(--cd-w));height:var(--cd-card-h,auto);aspect-ratio:var(--cd-aspect);touch-action:pan-y;user-select:none;margin:0 auto}",
  ".cd-card{position:absolute;inset:0;border-radius:18px;overflow:hidden;background:#090d16;box-shadow:0 1px 2px rgba(0,0,0,.25),0 24px 52px -18px rgba(0,0,0,.75);transition:transform .55s cubic-bezier(.2,.8,.2,1),opacity .38s ease,filter .38s ease;will-change:transform}",
  ".cd-card[data-top='1']{cursor:grab}",
  ".cd-card[data-drag='1']{cursor:grabbing;transition:none}",
  ".cd-card[data-fly='1']{transition:transform .42s cubic-bezier(.3,.5,.3,1),opacity .42s ease}",
  ".cd-card[data-snap='1']{transition:none}",
  ".cd-card img.cd-bg-img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;display:block;pointer-events:none;user-select:none;filter:brightness(.58) contrast(.92) saturate(1.1)}",
  ".cd-meta{display:flex;align-items:center;gap:clamp(12px,2.5vw,24px);width:min(var(--cd-w),100%);max-width:640px}",
  ".cd-cap{flex:1;min-width:0;overflow:hidden;padding-bottom:.15em}",
  ".cd-cap>*{display:block;animation:cd-in .5s cubic-bezier(.2,.8,.2,1) both}",
  ".cd-title{font:600 clamp(15px,1.9vw,19px)/1.2 ui-sans-serif,system-ui,sans-serif;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".cd-sub{margin-top:3px;font:400 12px/1.35 ui-sans-serif,system-ui,sans-serif;color:var(--cd-muted);animation-delay:.04s;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".cd-count{font:600 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.12em;color:var(--cd-muted);flex-shrink:0}",
  ".cd-count b{color:var(--cd-ink);font-weight:700}",
  ".cd-btn{appearance:none;border:1px solid var(--cd-line);background:rgba(15,23,42,.75);color:inherit;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;cursor:pointer;flex:none;transition:background .2s ease,color .2s ease,border-color .2s ease,transform .15s ease}",
  ".cd-btn:hover{background:var(--cd-ink);color:#090d16;border-color:var(--cd-ink);transform:scale(1.05)}",
  ".cd-btn:focus-visible{outline:2px solid var(--cd-ink);outline-offset:2px}",
  ".cd-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}",
  "@keyframes cd-in{from{transform:translateY(100%);opacity:0}to{transform:none;opacity:1}}",
  "@media (prefers-reduced-motion:reduce){.cd-card,.cd-card[data-fly='1']{transition:opacity .3s ease}.cd-cap>*{animation:none}}",
].join("\n")

type Override = { i: number; x: number; y: number; r: number; mode: "drag" | "fly" | "snap" }

export default function CardDeckCarousel({
  slides = DEFAULT_SLIDES,
  height = "auto",
  cardWidth = "min(88vw, 440px)",
  cardHeight,
  aspect = "4 / 5",
  scatter = 5,
  autoplay = 0,
  background = "transparent",
  ink = "#f8fafc",
  activeIndex,
  onChange,
  className,
  style,
  ariaLabel = "Image carousel",
}: CardDeckCarouselProps) {
  const n = slides.length
  const srcs = useSlideImages(slides)
  const [top, setTop] = React.useState(0)
  const [over, setOver] = React.useState(null as Override | null)
  const rootRef = React.useRef(null as HTMLDivElement | null)
  const deckRef = React.useRef(null as HTMLDivElement | null)
  const busy = React.useRef(false)
  const lastTouch = React.useRef(0)
  const topRef = React.useRef(0)
  topRef.current = top
  const reduce = React.useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  )

  // Keep `top` within valid bounds when slides array changes (e.g. category filter)
  React.useEffect(() => {
    setOver(null)
    busy.current = false
    setTop((prev) => (n > 0 ? wrap(prev, n) : 0))
  }, [n])

  // Sync when controlled `activeIndex` changes externally
  React.useEffect(() => {
    if (typeof activeIndex === "number" && n > 0) {
      const nextIdx = wrap(activeIndex, n)
      if (nextIdx !== topRef.current) {
        setOver(null)
        busy.current = false
        setTop(nextIdx)
      }
    }
  }, [activeIndex, n])

  const later = (fn: () => void, ms: number) => window.setTimeout(fn, ms)

  // Fly the top card off toward (dirX, dirY), then tuck it under the pile.
  const throwTop = React.useCallback(
    (dirX: number, fromX = 0, fromY = 0, dirY = 0) => {
      const w = deckRef.current?.offsetWidth || 380
      if (busy.current || n < 2) return
      busy.current = true
      const i = topRef.current
      const sx = dirX >= 0 ? 1 : -1
      setOver({ i, x: fromX + sx * w * 1.18, y: fromY + dirY * 0.35 - 28, r: sx * 14, mode: "fly" })
      later(() => {
        setOver(null)
        setTop((t) => wrap(t + 1, n))
        busy.current = false
      }, reduce ? 180 : 410)
    },
    [n, reduce],
  )

  // Pull the bottom card back on top from the left.
  const pullBack = React.useCallback(() => {
    const w = deckRef.current?.offsetWidth || 380
    if (busy.current || n < 2) return
    busy.current = true
    const i = wrap(topRef.current - 1, n)
    setOver({ i, x: -w * 1.18, y: -28, r: -14, mode: "snap" })
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setOver({ i, x: 0, y: 0, r: 0, mode: "fly" })
        later(() => {
          setOver(null)
          setTop(i)
          busy.current = false
        }, reduce ? 180 : 420)
      }),
    )
  }, [n, reduce])

  React.useEffect(() => {
    onChange?.(top)
  }, [top, onChange])

  React.useEffect(() => {
    if (!autoplay || n < 2) return
    const root = rootRef.current
    let seen = true
    const io = new IntersectionObserver(([e]) => (seen = e.isIntersecting))
    if (root) io.observe(root)
    const t = window.setInterval(() => {
      if (!seen || document.hidden || performance.now() - lastTouch.current < autoplay) return
      throwTop(1)
    }, autoplay)
    return () => {
      window.clearInterval(t)
      io.disconnect()
    }
  }, [autoplay, n, throwTop])

  // Dragging the top card (without hijacking interactive links/buttons inside the card)
  const drag = React.useRef(
    null as null | { x: number; y: number; lx: number; lt: number; vx: number; captured: boolean; pointerId: number },
  )
  const onDown = (e: React.PointerEvent) => {
    lastTouch.current = performance.now()
    if (busy.current || (e.pointerType === "mouse" && e.button !== 0)) return
    const target = e.target as HTMLElement | null
    if (target?.closest("a, button, input, textarea, select")) return
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      lx: e.clientX,
      lt: e.timeStamp,
      vx: 0,
      captured: false,
      pointerId: e.pointerId,
    }
  }
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (!d.captured && Math.hypot(dx, dy) > 6) {
      try {
        ;(e.currentTarget as HTMLElement).setPointerCapture(d.pointerId)
        d.captured = true
      } catch {
        // Ignore if pointer capture is unavailable
      }
    }
    if (!d.captured && Math.abs(dx) < 6) return
    const dt = Math.max(1, e.timeStamp - d.lt)
    d.vx = 0.8 * ((e.clientX - d.lx) / dt) + 0.2 * d.vx
    d.lx = e.clientX
    d.lt = e.timeStamp
    setOver({ i: topRef.current, x: dx, y: dy * 0.45, r: reduce ? 0 : dx * 0.045, mode: "drag" })
  }
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current
    drag.current = null
    lastTouch.current = performance.now()
    if (!d) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    const w = deckRef.current?.offsetWidth || 380
    if (isThrow(dx, d.vx, w)) throwTop(dx, dx, dy * 0.45, dy)
    else setOver(null)
  }
  const onKey = (e: React.KeyboardEvent) => {
    lastTouch.current = performance.now()
    if (e.key === "ArrowRight") throwTop(1)
    else if (e.key === "ArrowLeft") pullBack()
    else return
    e.preventDefault()
  }

  const safeTop = wrap(top, n)
  const s = slides[safeTop] || {}

  return (
    <div
      ref={rootRef}
      className={["cd-root", className].filter(Boolean).join(" ")}
      style={{
        height,
        ["--cd-h" as string]: typeof height === "number" ? height + "px" : height,
        ["--cd-w" as string]: cardWidth,
        ["--cd-card-h" as string]: cardHeight || "auto",
        ["--cd-aspect" as string]: cardHeight ? "unset" : aspect,
        ["--cd-ar" as string]: aspect,
        ["--cd-bg" as string]: background,
        ["--cd-ink" as string]: ink,
        ["--cd-muted" as string]: "color-mix(in srgb, var(--cd-ink) 62%, transparent)",
        ["--cd-line" as string]: "color-mix(in srgb, var(--cd-ink) 22%, transparent)",
        ...style,
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKey}
    >
      <style>{CD_CSS}</style>
      <div ref={deckRef} className="cd-deck">
        {slides.map((sl, i) => {
          const depth = wrap(i - safeTop, n)
          const o = over && over.i === i ? over : null
          // Skip mounting hidden cards deeper than 3 levels so mobile doesn't decode unnecessary card layers
          if (depth > 3 && !o) return null
          const p = deckPose(depth, tiltFor(i, scatter), reduce)
          const isTop = depth === 0
          const transform = o
            ? "translate(" + o.x + "px," + o.y + "px) rotate(" + o.r + "deg)"
            : "translateY(" + p.y + "px) scale(" + p.scale + ") rotate(" + p.rot.toFixed(2) + "deg)"
          return (
            <div
              key={sl.title ? `${sl.title}-${i}` : i}
              className="cd-card"
              data-top={isTop ? "1" : "0"}
              data-drag={o?.mode === "drag" ? "1" : "0"}
              data-fly={o?.mode === "fly" ? "1" : "0"}
              data-snap={o?.mode === "snap" ? "1" : "0"}
              style={{
                transform,
                zIndex: o ? n + 1 : n - depth,
                opacity: o ? 1 : p.opacity,
                filter: o || isTop ? "none" : "brightness(" + p.shade + ")",
                pointerEvents: isTop ? "auto" : "none",
              }}
              aria-hidden={isTop ? undefined : true}
              onPointerDown={isTop ? onDown : undefined}
              onPointerMove={isTop ? onMove : undefined}
              onPointerUp={isTop ? onUp : undefined}
              onPointerCancel={isTop ? onUp : undefined}
            >
              {srcs[i] ? (
                <img
                  src={srcs[i]}
                  alt={isTop ? sl.alt || sl.title || "" : ""}
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  className="cd-bg-img"
                />
              ) : null}
              {sl.content ? (
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  {sl.content}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
      <div className="cd-meta">
        <button
          type="button"
          className="cd-btn"
          aria-label="Previous"
          onClick={() => ((lastTouch.current = performance.now()), pullBack())}
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
        </button>
        <div className="cd-cap" key={safeTop} aria-hidden="true">
          {s.title ? <span className="cd-title">{s.title}</span> : null}
          {s.caption ? <span className="cd-sub">{s.caption}</span> : null}
        </div>
        <span className="cd-count" aria-hidden="true">
          <b>{pad2(safeTop + 1)}</b> / {pad2(n)}
        </span>
        <button
          type="button"
          className="cd-btn"
          aria-label="Next"
          onClick={() => ((lastTouch.current = performance.now()), throwTop(1))}
        >
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      <div className="cd-sr" aria-live="polite">
        {"Card " + (safeTop + 1) + " of " + n + (s.title ? ": " + s.title : "")}
      </div>
    </div>
  )
}
