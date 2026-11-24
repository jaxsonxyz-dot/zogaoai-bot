import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Maximize,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';
import { caseStudies, CaseStudy, OverviewSection } from '@/data/caseStudies';
import { useAllCaseStudies } from '@/lib/cms';
import { createClickThrottle } from '@/utils/requestGuard';
import { getDevicePerformanceProfile } from '@/utils/devicePerformance';

/**
 * Set this to your showreel MP4/WebM URL. While empty, the frame plays an
 * animated reel built from your real case study covers.
 */
const SHOWREEL_VIDEO_URL = '';
const SLIDE_MS = 4500;

function getProjectDetails(study: CaseStudy) {
  const overview = study.sections.find(
    (s): s is OverviewSection => s.type === 'overview'
  );
  const titleParts = study.name.split(' — ');
  const brandTitle = titleParts[0] || study.name;
  const subtitle = titleParts[1] || overview?.projectType || study.category;
  const year =
    overview?.year && overview.year !== '—' && overview.year !== 'Year'
      ? overview.year
      : '2025';
  const projectType =
    overview?.projectType && overview.projectType !== 'Project Type'
      ? overview.projectType
      : study.category;

  let deliverables: string[] = [];
  if (
    study.brandSystem?.deliverables &&
    study.brandSystem.deliverables.length > 0
  ) {
    deliverables = study.brandSystem.deliverables.slice(0, 4);
  } else {
    const derived: string[] = [];
    for (const sec of study.sections) {
      if (sec.type === 'image' && sec.image.label) {
        derived.push(sec.image.label.replace(/^.*?—\s*/, ''));
      } else if (sec.type === 'imagePair') {
        sec.images.forEach((img) => {
          if (img.label) derived.push(img.label);
        });
      } else if (sec.type === 'fullWidthImage' && sec.image.label) {
        derived.push(sec.image.label);
      }
    }
    deliverables = Array.from(new Set(derived)).slice(0, 4);
  }

  if (deliverables.length === 0) {
    deliverables = [
      'Brand Identity & Direction',
      'Visual System & Guidelines',
      'Digital & Print Touchpoints',
      'Production-Ready Assets',
    ];
  }

  return {
    brandTitle,
    subtitle,
    year,
    projectType,
    deliverables,
    colors: study.brandSystem?.colors?.slice(0, 4) || [],
  };
}

const ShowreelSection = () => {
  const allStudies = useAllCaseStudies();
  const slides = React.useMemo(
    () => allStudies.filter((c) => c.hero.src).slice(0, 10),
    [allStudies]
  );
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const [index, setIndex] = useState(0);
  const [isInView, setIsInView] = useState(true);
  const hasVideo = Boolean(SHOWREEL_VIDEO_URL);
  const isLowEnd = React.useMemo(() => getDevicePerformanceProfile().isLowEndDevice, []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (hasVideo || !playing || isHovered || !isInView || isLowEnd || slides.length < 2) return;
    const t = setInterval(() => {
      if (!document.hidden) {
        setIndex((i) => (i + 1) % slides.length);
      }
    }, SLIDE_MS);
    return () => clearInterval(t);
  }, [playing, isHovered, isInView, isLowEnd, hasVideo, slides.length]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (v) {
      if (playing) {
        v.pause();
      } else {
        v.play();
      }
    }
    setPlaying((p) => !p);
  };

  const toggleMute = () => {
    if (videoRef.current) videoRef.current.muted = !muted;
    setMuted((m) => !m);
  };

  const fullscreen = () => frameRef.current?.requestFullscreen?.();

  // Throttle rapid 50-100 click bursts on Prev/Next buttons
  const stepSlide = useRef(
    createClickThrottle((delta: number, total: number) => {
      if (total < 2) return;
      setIndex((i) => (i + delta + total) % total);
    }, 150)
  ).current;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.dataset.fallbackApplied === 'true') return;
    target.dataset.fallbackApplied = 'true';
    target.src = '/logo.svg';
  };

  const current = slides[index] || slides[0];
  const details = current ? getProjectDetails(current) : null;

  return (
    <section id="showreel" className="zg-section relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zogago-blue/50 to-transparent" />
      <div className="hidden md:block absolute top-1/3 left-1/2 -translate-x-1/2 w-[70%] h-[60%] bg-zogago-purple/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="zg-container relative z-10">
        {/* Section Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider text-zogago-light/70 mb-3">
              <span className="text-zogago-blue font-semibold">
                Selected Work in Motion
              </span>
              <span className="text-white/30" aria-hidden="true">
                ·
              </span>
              <span>Curated Portfolio Reel</span>
            </div>
            <h2 className="zg-heading-lg">
              Featured <span className="text-gradient-blue">Showreel</span> &amp; Case
              Studies
            </h2>
          </div>

          <p className="zg-paragraph max-w-md text-sm sm:text-base text-zogago-light/75">
            Explore how we translate creative vision into cohesive brand identities,
            physical environments, and high-converting digital products.
          </p>
        </motion.div>

        {/* Split-Screen Showcase Container (div:nth-of-type(3)) */}
        <motion.div
          ref={frameRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative mx-auto max-w-6xl rounded-2xl overflow-hidden border border-white/10 bg-slate-950/75 backdrop-blur-xl shadow-[0_20px_70px_-15px_rgba(14,165,233,0.28)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Column: Visual Reel Stage */}
            <div className="lg:col-span-7 relative flex flex-col justify-between bg-slate-950 min-h-[300px] sm:min-h-[400px] lg:min-h-[480px] border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden">
              {/* Top Stage Bar */}
              <div className="relative z-20 flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5 pointer-events-none">
                <div className="flex items-center gap-2 text-xs font-mono text-white/80 bg-black/50 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                  <span className="text-zogago-blue font-semibold tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/30">/</span>
                  <span className="text-white/60 tabular-nums">
                    {String(slides.length).padStart(2, '0')}
                  </span>
                </div>

                {current && (
                  <div className="text-xs font-mono text-white/75 bg-black/50 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    {current.category}
                  </div>
                )}
              </div>

              {/* Artwork / Video Viewport */}
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                {hasVideo ? (
                  <video
                    ref={videoRef}
                    src={SHOWREEL_VIDEO_URL}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <AnimatePresence mode="wait">
                    {current && (
                      <motion.div
                        key={current.slug}
                        className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      >
                        {/* Lightweight CSS radial backdrop instead of duplicating full-size decoded <img> bitmap */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              'radial-gradient(circle at 50% 45%, rgba(31, 182, 250, 0.16), rgba(121, 40, 202, 0.12) 45%, rgba(2, 6, 23, 0.9) 85%)',
                          }}
                        />
                        {/* Crisp primary project cover */}
                        <img
                          src={current.hero.src}
                          alt={current.hero.alt || current.name}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          onError={handleImageError}
                          className="relative z-10 max-h-full max-w-full w-full h-full object-contain rounded-lg shadow-2xl"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Bottom Scrim & Transport Controls */}
              <div className="relative z-20 mt-auto bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-10 pb-4 px-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={playing ? 'Pause showreel' : 'Play showreel'}
                    className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors shrink-0"
                  >
                    {playing && !isHovered ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </button>

                  {hasVideo && (
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={muted ? 'Unmute' : 'Mute'}
                      className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors shrink-0"
                    >
                      {muted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  )}

                  {/* Segmented Timeline Progress */}
                  {!hasVideo && (
                    <div className="flex-1 flex items-center gap-1.5">
                      {slides.map((s, i) => (
                        <button
                          type="button"
                          key={s.slug}
                          onClick={() => setIndex(i)}
                          aria-label={`Select project ${s.name}`}
                          className="group/bar flex-1 py-2 focus:outline-none"
                        >
                          <span className="block h-1.5 rounded-full bg-white/15 overflow-hidden group-hover/bar:bg-white/30 transition-colors">
                            <span
                              className={`block h-full rounded-full transition-all duration-300 ${
                                i === index
                                  ? 'w-full bg-zogago-blue'
                                  : i < index
                                  ? 'w-full bg-white/50'
                                  : 'w-0 bg-transparent'
                              }`}
                            />
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {hasVideo && <div className="flex-1" />}

                  {/* Prev / Next Navigation Buttons */}
                  {!hasVideo && (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => stepSlide(-1, slides.length)}
                        aria-label="Previous project"
                        className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => stepSlide(1, slides.length)}
                        aria-label="Next project"
                        className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={fullscreen}
                    aria-label="Enter fullscreen"
                    className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-colors shrink-0"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Project Story, Deliverables & Direct CTA Sidebar */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-white/[0.02]">
              {current && details && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.slug}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex flex-col h-full justify-between gap-6"
                  >
                    <div>
                      {/* Unboxed Metadata Line */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zogago-light/65 mb-3">
                        <span className="text-zogago-blue font-medium">
                          {current.category}
                        </span>
                        <span className="text-white/25" aria-hidden="true">
                          ·
                        </span>
                        <span>{details.projectType}</span>
                        <span className="text-white/25" aria-hidden="true">
                          ·
                        </span>
                        <span className="tabular-nums">{details.year}</span>
                      </div>

                      {/* Project Title & Subtitle */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1.5">
                        {details.brandTitle}
                      </h3>
                      <p className="text-sm font-medium text-zogago-light/60 mb-4">
                        {details.subtitle}
                      </p>

                      {/* Project Story Summary */}
                      <p className="text-sm sm:text-base text-zogago-light/85 leading-relaxed mb-6">
                        {current.shortDescription}
                      </p>

                      {/* Client Deliverables List */}
                      <div className="border-t border-white/10 pt-5">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-zogago-light/60 mb-3.5">
                          Key Client Deliverables
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                          {details.deliverables.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2.5 text-sm text-zogago-light/90"
                            >
                              <Check className="w-4 h-4 text-zogago-blue shrink-0" />
                              <span className="truncate">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center justify-between gap-3">
                      <Link
                        to={`/case-studies/${current.slug}`}
                        className="button-glow group inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white rounded-xl whitespace-nowrap shrink-0"
                      >
                        <span className="relative z-10 flex items-center">
                          Explore Case Study
                          <ArrowUpRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </span>
                      </Link>

                      <Link
                        to="/case-studies"
                        className="inline-flex items-center justify-center px-4 py-2.5 text-xs sm:text-sm font-medium text-zogago-light/75 hover:text-white transition-colors whitespace-nowrap shrink-0"
                      >
                        View All {caseStudies.length} Projects
                        <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ShowreelSection;
