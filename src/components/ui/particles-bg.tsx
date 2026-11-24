"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { getDevicePerformanceProfile } from "@/utils/devicePerformance";

const BASE_PARTICLES = 110;
const PUSH_PER_CLICK = 1;
const CLICKS_PER_CLEANUP_CYCLE = 6;
const REMOVE_PER_CYCLE = 3;
const MAX_EXTRA_PARTICLES = 12;
const CLICK_THROTTLE_MS = 80;

interface ParticlesComponentProps {
  soundEnabled?: boolean;
}

interface RipplePulse {
  id: number;
  x: number;
  y: number;
}

export default function ParticlesComponent({ soundEnabled = false }: ParticlesComponentProps) {
  const [ripples, setRipples] = useState<RipplePulse[]>([]);
  const soundEnabledRef = useRef(soundEnabled);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  const playCyberChime = useCallback(() => {
    if (!soundEnabledRef.current || typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      // Harmonic cyber chime chord
      osc1.type = "sine";
      osc2.type = "triangle";
      osc1.frequency.setValueAtTime(528, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.18);
      osc2.frequency.setValueAtTime(792, now);
      osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.22);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.28);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.28);
      osc2.stop(now + 0.28);
    } catch {
      // Fallback to static audio file if Web Audio fails
      const fallback = new Audio("/success-sound.mp3");
      fallback.volume = 0.15;
      fallback.play().catch(() => {});
    }
  }, []);

  const destroyParticles = useCallback(() => {
    const oldCanvas = document.querySelector("#particles-js canvas");
    if (oldCanvas) oldCanvas.remove();

    // @ts-ignore
    if (window.pJSDom?.length > 0) {
      // @ts-ignore
      window.pJSDom.forEach((p: any) => p.pJS?.fn?.vendors?.destroypJS?.());
      // @ts-ignore
      window.pJSDom = [];
    }
  }, []);

  const initParticles = useCallback(() => {
    if (typeof window === "undefined") return;

    const profile = getDevicePerformanceProfile();
    if (!profile.shouldEnableParticles) {
      return;
    }

    destroyParticles();

    // @ts-ignore
    if (typeof window.particlesJS !== "function") return;

    const particleCount = profile.isMobile ? 26 : BASE_PARTICLES;

    // @ts-ignore
    window.particlesJS("particles-js", {
      particles: {
        number: { value: particleCount, density: { enable: true, value_area: 900 } },

        color: { value: "#00f5ff" },
        shape: { type: "circle", stroke: { width: 0.5, color: "#0096c7" } },
        opacity: {
          value: 0.7,
          random: true,
          anim: { enable: !profile.isMobile, speed: 1, opacity_min: 0.3 },
        },
        size: {
          value: 3,
          random: true,
          anim: { enable: !profile.isMobile, speed: 2, size_min: 1 },
        },
        line_linked: {
          enable: true,
          distance: profile.isMobile ? 120 : 165,
          color: "#00d9ff",
          opacity: 0.45,
          width: 1.2,
        },
        move: {
          enable: true,
          speed: profile.isMobile ? 1.5 : 2.8,
          random: false,
          straight: false,
          out_mode: "bounce",
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: !profile.isMobile, mode: "grab" },
          // Click particles are managed manually below for exact tap coordinates
          // and periodic line cleanup every 6 clicks.
          onclick: { enable: false, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 220, line_linked: { opacity: 0.9 } },
          push: { particles_nb: PUSH_PER_CLICK },
          repulse: { distance: 180, duration: 0.4 },
        },
      },
      // Cap canvas pixel density on mobile so a 3x DPR screen does not allocate a 9x bitmap buffer
      retina_detect: !profile.isMobile,
    });
  }, [destroyParticles]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const profile = getDevicePerformanceProfile();
    if (!profile.shouldEnableParticles) {
      return;
    }

    const container = document.getElementById("particles-js");
    let isVisible = true;
    let scriptListenerAttached = false;

    const startOrLoad = () => {
      if (!isVisible || document.hidden) return;
      // @ts-ignore
      if (window.particlesJS) {
        initParticles();
      } else {
        const existingScript = document.getElementById("particles-js-cdn-script") as HTMLScriptElement | null;
        if (existingScript) {
          if (!scriptListenerAttached) {
            scriptListenerAttached = true;
            existingScript.addEventListener("load", initParticles, { once: true });
          }
        } else {
          const script = document.createElement("script");
          script.id = "particles-js-cdn-script";
          script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
          script.async = true;
          script.onload = () => {
            if (isVisible && !document.hidden) initParticles();
          };
          script.onerror = () => {
            // Graceful no-op when CDN is unreachable on slow/offline networks
          };
          document.body.appendChild(script);
        }
      }
    };

    startOrLoad();

    // Free GPU canvas & pause loop when scrolled past Hero or tab backgrounded
    const io = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !isVisible && !document.hidden) {
          isVisible = true;
          startOrLoad();
        } else if (!nowVisible && isVisible) {
          isVisible = false;
          destroyParticles();
        }
      },
      { threshold: 0.05 },
    );
    if (container) io.observe(container);

    const handleVisibility = () => {
      if (document.hidden) {
        destroyParticles();
      } else if (isVisible) {
        startOrLoad();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      destroyParticles();
      if (audioCtxRef.current && typeof audioCtxRef.current.close === "function") {
        void audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, [initParticles, destroyParticles]);

  // Spawn 1 particle node at the exact tap/click coordinate and ensure a line
  // connects right at the tap location. Every 6 clicks, remove the 3 oldest
  // added particle lines so the canvas stays balanced and lag-free.
  useEffect(() => {
    if (typeof window === "undefined") return;

    let clickCount = 0;
    let lastAcceptedClick = 0;
    const addedParticles: any[] = [];

    const handlePointerDown = (event: PointerEvent) => {
      // Ignore right-clicks or clicks on interactive buttons/links
      if (event.button !== 0 && event.pointerType === "mouse") return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select, [role='button']")) {
        return;
      }

      const now = performance.now();
      if (now - lastAcceptedClick < CLICK_THROTTLE_MS) return;

      const container = document.getElementById("particles-js");
      if (!container) return;

      // @ts-ignore particles.js exposes its active instances globally.
      const instance = window.pJSDom?.find(
        (entry: any) => entry?.pJS?.canvas?.el?.parentElement === container,
      )?.pJS;
      if (!instance || !instance.canvas?.el) return;

      const canvas = instance.canvas.el as HTMLCanvasElement;
      const bounds = canvas.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;

      // Only react to taps/clicks that land inside the Hero canvas area.
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        return;
      }

      lastAcceptedClick = now;
      clickCount += 1;

      // Visual energy pulse ripple at exact local CSS coordinate
      const localX = event.clientX - bounds.left;
      const localY = event.clientY - bounds.top;
      const rippleId = Date.now() + Math.random();
      setRipples((prev) => [...prev.slice(-5), { id: rippleId, x: localX, y: localY }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 650);

      // Synthesized cyber chime feedback if enabled
      playCyberChime();

      // Exact conversion from viewport tap coordinates to internal canvas buffer coordinates
      const scaleX = canvas.width / bounds.width;
      const scaleY = canvas.height / bounds.height;
      const posX = localX * scaleX;
      const posY = localY * scaleY;

      const particles: any[] = instance.particles.array;

      // Every 6 clicks, remove the 3 oldest user-added particle lines
      if (clickCount % CLICKS_PER_CLEANUP_CYCLE === 0) {
        let removed = 0;
        while (removed < REMOVE_PER_CYCLE && addedParticles.length > 0) {
          const oldest = addedParticles.shift();
          const idx = particles.indexOf(oldest);
          if (idx !== -1) {
            particles.splice(idx, 1);
            removed += 1;
          }
        }
      }

      // Also enforce a hard cap on extra particles to prevent any buildup
      while (addedParticles.length >= MAX_EXTRA_PARTICLES) {
        const oldest = addedParticles.shift();
        const idx = particles.indexOf(oldest);
        if (idx !== -1) {
          particles.splice(idx, 1);
        }
      }

      // Create 1 new particle directly at the exact tap coordinate (never random)
      const newParticle = new instance.fn.particle(
        instance.particles.color,
        instance.particles.opacity.value,
        { x: posX, y: posY },
      );
      newParticle.x = posX;
      newParticle.y = posY;
      particles.push(newParticle);
      addedParticles.push(newParticle);

      // Guarantee an immediate visible line at the exact tap location
      const pxRatio = instance.canvas.pxratio || scaleX || 1;
      const maxLinkDist = (instance.particles.line_linked?.distance || 165) * pxRatio;
      const idealDist = maxLinkDist * 0.55;

      let nearestParticle: any = null;
      let nearestDistSq = Infinity;

      for (let i = 0; i < particles.length - 1; i++) {
        const p = particles[i];
        const dx = p.x - posX;
        const dy = p.y - posY;
        const distSq = dx * dx + dy * dy;
        if (distSq < nearestDistSq) {
          nearestDistSq = distSq;
          nearestParticle = p;
        }
      }

      if (nearestParticle && Math.sqrt(nearestDistSq) > idealDist) {
        const angle = Math.atan2(nearestParticle.y - posY, nearestParticle.x - posX);
        nearestParticle.x = posX + Math.cos(angle) * (idealDist * 0.7);
        nearestParticle.y = posY + Math.sin(angle) * (idealDist * 0.7);
      }

      // Sync interactivity mouse coordinates to the exact tap point so grab lines
      // also connect immediately at the tap position
      if (instance.interactivity?.mouse) {
        instance.interactivity.mouse.pos_x = posX;
        instance.interactivity.mouse.pos_y = posY;
        instance.interactivity.status = "mousemove";
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [playCyberChime]);

  return (
    <div
      id="particles-js"
      className="absolute inset-0 z-[2] overflow-hidden"
      style={{ pointerEvents: "auto" }}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full border border-cyan-400/70 bg-cyan-400/10 animate-ping"
          style={{
            left: `${ripple.x - 18}px`,
            top: `${ripple.y - 18}px`,
            width: "36px",
            height: "36px",
            animationDuration: "600ms",
          }}
        />
      ))}
    </div>
  );
}


