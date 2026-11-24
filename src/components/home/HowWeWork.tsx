import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import {
  MessageSquare,
  Palette,
  Code,
  Rocket,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  buildSmoothZigzagPath,
  isNodeIlluminated,
  type ZigzagPoint,
} from '@/utils/zigzagPath';

interface ProcessStep {
  id: number;
  stepNum: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  color: string;
  bgColor: string;
  badgeBg: string;
  nodeActiveClass: string;
  cardActiveClass: string;
  connectorActiveClass: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    stepNum: '01',
    icon: MessageSquare,
    title: 'Discover',
    subtitle: 'Goals, Audience & Brand Direction',
    description:
      'We learn about your business, your customers, and what you want to achieve so every design and website decision has a clear purpose.',
    deliverables: [
      'Business & Brand Review',
      'Customer Journey Plan',
      'Clear Project Scope',
    ],
    color: 'text-zogago-blue',
    bgColor: 'bg-zogago-blue/10',
    badgeBg: 'from-zogago-blue to-cyan-500',
    nodeActiveClass:
      'border-zogago-blue text-white shadow-[0_0_18px_rgba(31,182,250,0.55)] bg-slate-900 scale-105',
    cardActiveClass:
      'border-zogago-blue/45 bg-slate-900/90 shadow-[0_0_28px_-8px_rgba(31,182,250,0.32)]',
    connectorActiveClass:
      'bg-gradient-to-r from-zogago-blue/75 to-zogago-blue/25 shadow-[0_0_8px_rgba(31,182,250,0.5)]',
  },
  {
    id: 2,
    stepNum: '02',
    icon: Palette,
    title: 'Plan',
    subtitle: 'Visual Direction & Page Structure',
    description:
      'We map out your brand style, page layouts, messaging, and interactive user journeys before full production begins.',
    deliverables: [
      'Page Layouts & Wireframes',
      'Brand & Visual Concepts',
      'Content & Conversion Flow',
    ],
    color: 'text-zogago-purple',
    bgColor: 'bg-zogago-purple/10',
    badgeBg: 'from-zogago-purple to-indigo-500',
    nodeActiveClass:
      'border-zogago-purple text-white shadow-[0_0_18px_rgba(139,92,246,0.55)] bg-slate-900 scale-105',
    cardActiveClass:
      'border-zogago-purple/45 bg-slate-900/90 shadow-[0_0_28px_-8px_rgba(139,92,246,0.32)]',
    connectorActiveClass:
      'bg-gradient-to-r from-zogago-purple/75 to-zogago-purple/25 shadow-[0_0_8px_rgba(139,92,246,0.5)]',
  },
  {
    id: 3,
    stepNum: '03',
    icon: Code,
    title: 'Build',
    subtitle: 'Design, Development & Visual Craft',
    description:
      'We craft your brand visuals, build your responsive website or online store, and share regular progress updates for your feedback.',
    deliverables: [
      'Custom Website or Storefront',
      'Mobile-Responsive Design',
      'Polished Brand & Media Assets',
    ],
    color: 'text-zogago-pink',
    bgColor: 'bg-zogago-pink/10',
    badgeBg: 'from-zogago-pink to-rose-500',
    nodeActiveClass:
      'border-zogago-pink text-white shadow-[0_0_18px_rgba(236,72,153,0.55)] bg-slate-900 scale-105',
    cardActiveClass:
      'border-zogago-pink/45 bg-slate-900/90 shadow-[0_0_28px_-8px_rgba(236,72,153,0.32)]',
    connectorActiveClass:
      'bg-gradient-to-r from-zogago-pink/75 to-zogago-pink/25 shadow-[0_0_8px_rgba(236,72,153,0.5)]',
  },
  {
    id: 4,
    stepNum: '04',
    icon: Rocket,
    title: 'Launch',
    subtitle: 'Testing, Performance & Go-Live',
    description:
      'We test across mobile, tablet, and desktop, optimize page speed and responsiveness, and launch your project smoothly.',
    deliverables: [
      'Smooth Go-Live Launch',
      'Cross-Device & Speed Check',
      'Post-Launch Support',
    ],
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    badgeBg: 'from-cyan-400 to-teal-400',
    nodeActiveClass:
      'border-cyan-400 text-white shadow-[0_0_18px_rgba(34,211,238,0.55)] bg-slate-900 scale-105',
    cardActiveClass:
      'border-cyan-400/45 bg-slate-900/90 shadow-[0_0_28px_-8px_rgba(34,211,238,0.32)]',
    connectorActiveClass:
      'bg-gradient-to-r from-cyan-400/75 to-cyan-400/25 shadow-[0_0_8px_rgba(34,211,238,0.5)]',
  },
];

function getLayoutCenterRelativeTo(
  el: HTMLElement,
  ancestor: HTMLElement
): ZigzagPoint {
  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  let curr: HTMLElement | null = el;
  while (curr && curr !== ancestor) {
    x += curr.offsetLeft;
    y += curr.offsetTop;
    curr = curr.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

const HowWeWork: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = Boolean(useReducedMotion());

  const [svgSize, setSvgSize] = useState({ width: 1000, height: 1000 });
  const [pathData, setPathData] = useState<{ d: string; thresholds: number[] }>(
    () =>
      buildSmoothZigzagPath(
        [
          { x: 460, y: 120 },
          { x: 540, y: 360 },
          { x: 460, y: 600 },
          { x: 540, y: 840 },
        ],
        1000
      )
  );
  const [activeProgress, setActiveProgress] = useState(0);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 76%', 'end 56%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    setActiveProgress(latest);
  });

  const measureGeometry = useCallback(() => {
    const timelineEl = timelineRef.current;
    if (!timelineEl) return;

    const width = timelineEl.offsetWidth;
    const height = timelineEl.offsetHeight;
    if (width <= 0 || height <= 0) return;

    const points: ZigzagPoint[] = [];
    for (let i = 0; i < processSteps.length; i++) {
      const nodeEl = nodeRefs.current[i];
      if (nodeEl && nodeEl.offsetWidth > 0) {
        points.push(getLayoutCenterRelativeTo(nodeEl, timelineEl));
      }
    }

    setSvgSize((prev) =>
      prev.width === width && prev.height === height ? prev : { width, height }
    );

    if (points.length === processSteps.length) {
      setPathData(buildSmoothZigzagPath(points, width));
    }
  }, []);

  useLayoutEffect(() => {
    measureGeometry();
  }, [measureGeometry]);

  useEffect(() => {
    setActiveProgress(smoothProgress.get());
    const timelineEl = timelineRef.current;
    if (!timelineEl) return;

    let rafId = requestAnimationFrame(measureGeometry);
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(measureGeometry);
    });

    resizeObserver.observe(timelineEl);
    nodeRefs.current.forEach((node) => {
      if (node) resizeObserver.observe(node);
    });

    window.addEventListener('resize', measureGeometry);
    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', measureGeometry);
    };
  }, [measureGeometry, smoothProgress]);

  const pathLength = prefersReducedMotion ? 1 : smoothProgress;

  const handleStepSelect = (index: number) => {
    setSelectedStep((prev) => (prev === index ? null : index));
    const rowEl = rowRefs.current[index];
    if (rowEl) {
      rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="zg-section relative overflow-hidden bg-gradient-to-b from-zogago-dark via-black/80 to-zogago-dark py-12 sm:py-16 md:py-20"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zogago-purple/40 to-transparent" />

      {/* Background ambient lighting — hidden on mobile to preserve GPU VRAM */}
      <div className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-gradient-to-tr from-zogago-blue/10 via-zogago-purple/10 to-zogago-pink/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="zg-container relative z-10 max-w-5xl mx-auto px-3 sm:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-3 shadow-lg shadow-black/20">
            <Sparkles className="w-3.5 h-3.5 text-zogago-blue" />
            <span className="text-xs font-semibold tracking-wider text-zogago-light/90 uppercase">
              Our Process
            </span>
          </div>
          <h2 className="zg-heading-lg mb-2.5 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Discover → Plan →{' '}
            <span className="text-gradient-purple">Build → Launch</span>
          </h2>
          <p className="zg-paragraph text-xs sm:text-sm md:text-base text-zogago-light/75 max-w-xl mx-auto leading-relaxed">
            A clear, collaborative workflow designed to bring ambitious ideas from
            concept to launch without unnecessary complexity.
          </p>
        </motion.div>

        {/* Process Timeline Container — Unified Interactive Zigzag on Mobile, Tablet & Desktop */}
        <div ref={timelineRef} className="relative">
          {/* UNIFIED ZIGZAG SVG PATH (Active on Mobile, Tablet, and Desktop) */}
          <div className="block absolute inset-0 pointer-events-none z-0">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
              fill="none"
            >
              <defs>
                <linearGradient
                  id="zigzagGlow"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#1fb6fa" />
                  <stop offset="35%" stopColor="#8b5cf6" />
                  <stop offset="70%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
                <filter
                  id="neonBeamGlow"
                  x="-25%"
                  y="-10%"
                  width="150%"
                  height="120%"
                >
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="3.5"
                    result="softBlur"
                  />
                  <feComponentTransfer in="softBlur" result="softenedGlow">
                    <feFuncA type="linear" slope="0.55" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="softenedGlow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Guide Trace Line (Faded) */}
              <path
                d={pathData.d}
                stroke="rgba(255, 255, 255, 0.09)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Animated Glowing Neon Zigzag Beam (3.75px refined stroke) */}
              <motion.path
                d={pathData.d}
                stroke="url(#zigzagGlow)"
                strokeWidth="3.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#neonBeamGlow)"
                style={{
                  pathLength,
                }}
              />
            </svg>
          </div>

          {/* PROCESS STEP CARDS LIST */}
          <div className="space-y-14 sm:space-y-14 md:space-y-12 lg:space-y-14 relative z-10">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 1; // 0: Left, 1: Right, 2: Left, 3: Right
              const illuminated =
                isNodeIlluminated(
                  activeProgress,
                  index,
                  pathData.thresholds,
                  prefersReducedMotion
                ) || selectedStep === index;

              return (
                <motion.div
                  key={step.id}
                  ref={(el) => {
                    rowRefs.current[index] = el;
                  }}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: 'easeOut',
                  }}
                  className={cn(
                    'relative flex items-center justify-between',
                    isEven ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  {/* STEP CARD CONTENT — Compact on Mobile (73%), Sleek & Compact on Desktop (37%) */}
                  <div className="w-[73%] sm:w-[70%] md:w-[37%] lg:w-[36%] group">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-label={`Step ${step.stepNum}: ${step.title}`}
                      onClick={() => handleStepSelect(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleStepSelect(index);
                        }
                      }}
                      className={cn(
                        'relative p-3 sm:p-4 md:p-4 lg:p-5 rounded-xl sm:rounded-2xl bg-slate-950/85 border backdrop-blur-xl transition-all duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zogago-blue md:max-w-[360px]',
                        isEven ? 'md:mr-auto' : 'md:ml-auto',
                        illuminated
                          ? step.cardActiveClass
                          : 'border-white/10 hover:border-white/30 hover:bg-slate-900/85 hover:shadow-[0_0_28px_-10px_rgba(139,92,246,0.28)]'
                      )}
                    >
                      {/* Top Bar with Step Badge & Icon */}
                      <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                        <span
                          className={cn(
                            'px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-white shadow-sm bg-gradient-to-r',
                            step.badgeBg
                          )}
                        >
                          STEP {step.stepNum}
                        </span>

                        <div
                          className={cn(
                            'w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-md',
                            step.bgColor
                          )}
                        >
                          <Icon
                            className={cn(
                              'w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5',
                              step.color
                            )}
                          />
                        </div>
                      </div>

                      {/* Header Titles */}
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-0.5 group-hover:text-zogago-blue transition-colors duration-300 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-[10.5px] sm:text-xs font-medium text-zogago-light/60 mb-1.5 sm:mb-2">
                        {step.subtitle}
                      </p>

                      {/* Main Description */}
                      <p className="text-[11px] sm:text-xs text-zogago-light/80 leading-snug mb-2.5 sm:mb-3">
                        {step.description}
                      </p>

                      {/* Deliverables Checklist */}
                      <div className="space-y-1 pt-2 border-t border-white/10">
                        {step.deliverables.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] text-zogago-light/75"
                          >
                            <CheckCircle2
                              className={cn('w-3 h-3 shrink-0', step.color)}
                            />
                            <span className="leading-tight truncate">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Corner Neon Ambient Glow */}
                      <div
                        className={cn(
                          'absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-transparent to-zogago-purple/15 rounded-br-2xl blur-xl pointer-events-none transition-opacity duration-500',
                          illuminated
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100'
                        )}
                      />
                    </div>
                  </div>

                  {/* UNIFIED ZIGZAG CONNECTOR NODE (Mobile, Tablet & Desktop) */}
                  <div
                    className={cn(
                      'w-[27%] sm:w-[30%] md:w-[26%] lg:w-[28%] flex items-center relative',
                      isEven
                        ? 'justify-start pl-1.5 sm:pl-3 md:justify-end md:pl-0 md:pr-5 lg:pr-7'
                        : 'justify-end pr-1.5 sm:pr-3 md:justify-start md:pr-0 md:pl-5 lg:pl-7'
                    )}
                  >
                    {/* Subtle Horizontal Connector Bridge between Card and Node */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        'block h-[2px] w-4 sm:w-6 md:w-5 transition-all duration-300 rounded-full',
                        isEven
                          ? 'order-2 ml-1.5 sm:ml-2'
                          : 'order-1 mr-1.5 sm:mr-2',
                        illuminated ? step.connectorActiveClass : 'bg-white/10'
                      )}
                    />

                    <div
                      ref={(el) => {
                        nodeRefs.current[index] = el;
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Highlight step ${step.stepNum}: ${step.title}`}
                      onClick={() => handleStepSelect(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleStepSelect(index);
                        }
                      }}
                      data-illuminated={illuminated ? 'true' : 'false'}
                      className={cn(
                        'w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border-2 flex items-center justify-center z-20 transition-all duration-300 cursor-pointer shrink-0',
                        isEven ? 'order-1' : 'order-2',
                        illuminated
                          ? step.nodeActiveClass
                          : 'bg-slate-950 border-white/20 text-zogago-light/60 shadow-none hover:border-white/40'
                      )}
                    >
                      <span className="text-[11px] sm:text-xs font-mono font-bold tracking-tight">
                        {step.stepNum}
                      </span>
                    </div>
                  </div>

                  {/* EMPTY BALANCING COLUMN FOR DESKTOP ALTERNATING GRID */}
                  <div className="hidden md:block md:w-[37%] lg:w-[36%]" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <motion.div
          className="mt-12 sm:mt-16 md:mt-20 text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl max-w-md mx-auto shadow-2xl">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">
              Have an idea? Let&apos;s make it happen.
            </h3>
            <p className="text-xs sm:text-sm text-zogago-light/70 mb-4">
              From early creative direction to digital experiences built to perform.
            </p>
            <a
              href="#contact"
              className="button-glow group inline-flex items-center"
              onClick={(e) => {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="relative z-10 flex items-center text-xs sm:text-sm font-medium">
                Let&apos;s Talk About Your Project
                <Rocket className="ml-2 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeWork;
