import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Cpu,
  Users,
  ShieldCheck,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Globe2,
  Lock,
  Minus,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AboutSection from '../components/home/About';
import { Button } from '@/components/ui/button';

const studioProofMetrics = [
  {
    value: '6 Disciplines',
    label: 'Unified Under One Roof',
    detail: 'Web, Shopify, Brand Identity, Photo Retouching, 3D & AI Automation',
  },
  {
    value: '10+ Case Studies',
    label: 'Verified Production Work',
    detail: 'Real brand systems, storefronts, and digital launches you can inspect',
  },
  {
    value: '< 24 Hours',
    label: 'Direct Specialist Response',
    detail: 'Work directly with the creative and technical lead—no middlemen',
  },
  {
    value: '100% Custom',
    label: 'Tailored to Your Market',
    detail: 'Zero cookie-cutter templates; every asset is engineered for conversion',
  },
];

const values = [
  {
    number: '01',
    icon: Compass,
    tag: 'Strategy First',
    title: 'Purpose Before Polish',
    description:
      'Every visual and digital choice begins with understanding the people interacting with your brand and the real business outcome you want to achieve.',
    focus: 'Audience Clarity · Conversion Architecture · Intentional Design',
    accent: 'text-zogago-blue',
    glow: 'from-zogago-blue/12 via-zogago-blue/[0.03] to-transparent',
    line: 'bg-zogago-blue',
  },
  {
    number: '02',
    icon: Cpu,
    tag: 'Unified Studio',
    title: 'Creative & Digital Under One Roof',
    description:
      'Visual craft and digital execution are not separate handoffs. We design logos, visuals, 3D spaces, websites, and AI workflows that work together seamlessly.',
    focus: 'Brand Identity · Custom Web & Shopify · 3D & AI Workflows',
    accent: 'text-zogago-purple',
    glow: 'from-zogago-purple/12 via-zogago-purple/[0.03] to-transparent',
    line: 'bg-zogago-purple',
  },
  {
    number: '03',
    icon: ShieldCheck,
    tag: 'Direct Collaboration',
    title: 'Honest, Transparent Craft',
    description:
      'No inflated promises or agency bloat. We communicate clearly, scope realistically, and let measurable quality and milestone previews speak for themselves.',
    focus: 'Clear Milestones · Realistic Scope · Direct Creator Access',
    accent: 'text-cyan-400',
    glow: 'from-cyan-400/12 via-cyan-400/[0.03] to-transparent',
    line: 'bg-cyan-400',
  },
  {
    number: '04',
    icon: Layers,
    tag: 'Long-Term Value',
    title: 'Built to Scale With Your Business',
    description:
      'From a startup’s first product launch to an established brand’s next chapter, we deliver clean design systems and scalable digital foundations.',
    focus: 'Scalable Systems · Production-Ready Assets · Post-Launch Support',
    accent: 'text-zogago-pink',
    glow: 'from-zogago-pink/12 via-zogago-pink/[0.03] to-transparent',
    line: 'bg-zogago-pink',
  },
];

const clientAdvantages = [
  {
    number: '01',
    icon: Sparkles,
    shortLabel: 'First Impression',
    criterion: 'Brand Authority',
    bigStat: '3 sec',
    statCaption: 'To win or lose buyer trust online',
    title: 'Design That Acts as a Silent Salesperson',
    traditional:
      'Generic theme templates and stock visuals that look identical to every other competitor in your market, forcing you to compete on price alone.',
    zogagoWay:
      'Custom visual identity, high-contrast editorial typography, and conversion-architected layouts engineered to command authority the moment a buyer lands.',
    workflowSteps: [
      'Competitor & Market Positioning Audit',
      'Bespoke Visual Identity & UI System',
      'High-Converting Interactive Storytelling',
    ],
    accentText: 'text-zogago-blue',
    accentBorder: 'border-zogago-blue',
    accentBg: 'bg-zogago-blue',
  },
  {
    number: '02',
    icon: Zap,
    shortLabel: 'Unified Studio',
    criterion: 'Cross-Discipline Execution',
    bigStat: '6-in-1',
    statCaption: 'Core disciplines under one roof',
    title: 'One Cohesive Team Instead of Fragmented Vendors',
    traditional:
      'Juggling separate freelancers for logo design, web development, Shopify setup, product retouching, and AI automation—resulting in mismatched quality and delays.',
    zogagoWay:
      'Your brand guidelines, custom website or Shopify storefront, commercial imagery, 3D renders, and AI lead workflows are crafted together in complete harmony.',
    workflowSteps: [
      'Single Creative & Technical Lead',
      'Synchronized Brand, Web, 3D & Shopify',
      'Automated AI Lead & CRM Integration',
    ],
    accentText: 'text-zogago-purple',
    accentBorder: 'border-zogago-purple',
    accentBg: 'bg-zogago-purple',
  },
  {
    number: '03',
    icon: Globe2,
    shortLabel: 'Live Checkpoints',
    criterion: 'Milestone Transparency',
    bigStat: '4x',
    statCaption: 'Interactive staging checkpoints',
    title: 'De-Risked Delivery With Live Previews',
    traditional:
      'Weeks of radio silence hidden behind account managers, followed by a rigid final reveal that misses your commercial objectives and costs extra to revise.',
    zogagoWay:
      'Structured Discover → Plan → Build → Launch checkpoints where you inspect live interactive staging links and approve visual direction before the next phase begins.',
    workflowSteps: [
      'Interactive Wireframe & Direction Sign-Off',
      'Live Staging URL During Development',
      'Pre-Launch QA & Performance Verification',
    ],
    accentText: 'text-cyan-400',
    accentBorder: 'border-cyan-400',
    accentBg: 'bg-cyan-400',
  },
  {
    number: '04',
    icon: Lock,
    shortLabel: '100% Ownership',
    criterion: 'Speed & IP Handover',
    bigStat: '100%',
    statCaption: 'Source code & vector IP ownership',
    title: 'Production-Ready Systems You Fully Own',
    traditional:
      'Bloated plugins, locked proprietary agency retainers, or fragile builds that break the moment your team tries to update a product or campaign page.',
    zogagoWay:
      'Clean, documented codebases, organized vector brand packages, and scalable Shopify/web architectures handed over with full intellectual property ownership.',
    workflowSteps: [
      'Clean, Documented Production Codebase',
      'Master Vector, 3D & Retouched Source Files',
      'Zero Mandatory Retainer Lock-In',
    ],
    accentText: 'text-zogago-pink',
    accentBorder: 'border-zogago-pink',
    accentBg: 'bg-zogago-pink',
  },
];

const About = () => {
  const [activeValue, setActiveValue] = useState<number>(0);
  const [activeAdvantage, setActiveAdvantage] = useState<number>(0);
  const currentAdvantage = clientAdvantages[activeAdvantage];
  const ActiveIcon = currentAdvantage.icon;

  return (
    <div className="min-h-screen bg-zogago-dark text-zogago-light flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 md:pt-32">
        {/* 1. Hero / Outcome-Driven Studio Positioning (Distinct from Bottom Conversion Section) */}
        <section className="zg-container py-10 md:py-16">
          <div className="max-w-4xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.25em] text-zogago-blue mb-5">
              About Zogago Visuals · Studio &amp; Strategy
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              Built for Brands Ready to{' '}
              <span className="text-gradient-blue">Lead Their Market</span>, Not{' '}
              <span className="text-gradient-purple">Blend In.</span>
            </h1>
            <p className="text-lg sm:text-xl text-zogago-light/85 leading-relaxed max-w-3xl mb-5">
              When customers evaluate your business online, they judge your credibility in seconds. We bridge the gap between striking visual craft and high-converting digital execution so your brand wins trust immediately.
            </p>
            <p className="text-sm sm:text-base text-zogago-light/70 leading-relaxed max-w-3xl mb-8">
              Rather than operating as a traditional agency with layers of account managers, Zogago pairs you directly with focused specialists across custom web engineering, Shopify e-commerce, brand identity systems, commercial retouching, 3D architectural visualization, and AI workflow automation.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#contact">
                <Button className="button-glow group px-6 py-3">
                  <span>Start a Conversation</span>
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <Link to="/case-studies">
                <Button
                  variant="outline"
                  className="border-white/15 bg-white/[0.03] backdrop-blur-md hover:bg-white/10 hover:border-zogago-blue/40 rounded-xl px-6 py-3 text-white"
                >
                  <span>Inspect Our Case Studies</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Simple Understated Studio Summary Row */}
          <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {studioProofMetrics.map((metric) => (
              <div key={metric.value}>
                <p className="text-lg sm:text-xl font-semibold text-white">
                  {metric.value}
                </p>
                <p className="text-xs text-zogago-light/60 mt-0.5">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Core Values & Philosophy — Interactive Editorial Hairline Ledger */}
        <section className="zg-container py-10 md:py-14 border-t border-white/10">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zogago-purple mb-2">
                Our Principles
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Where Creative Vision Meets Digital Execution
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-zogago-light/55 font-mono">
              01 — 04 · Hover or tap any principle
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10 bg-white/[0.02] backdrop-blur-md rounded-2xl overflow-hidden">
            {values.map(
              (
                {
                  number,
                  icon: Icon,
                  tag,
                  title,
                  description,
                  focus,
                  accent,
                  glow,
                  line,
                },
                idx
              ) => {
                const isActive = activeValue === idx;
                return (
                  <div
                    key={title}
                    role="button"
                    tabIndex={0}
                    onMouseEnter={() => setActiveValue(idx)}
                    onClick={() => setActiveValue(idx)}
                    onFocus={() => setActiveValue(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveValue(idx);
                      }
                    }}
                    className="group relative py-6 sm:py-8 px-4 sm:px-6 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-md transition-colors duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zogago-blue"
                  >
                    {/* Smooth ambient horizontal sweep when active/hovered */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${glow} transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />

                    {/* Left animated accent bar */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute left-0 top-0 bottom-0 w-[3px] ${line} transition-transform duration-500 origin-top ${
                        isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                      }`}
                    />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start lg:items-center">
                      {/* Column 1: Number + Tag + Title */}
                      <div className="lg:col-span-5 flex items-start sm:items-center gap-4">
                        <span
                          className={`font-mono text-2xl sm:text-3xl font-bold tabular-nums transition-colors duration-300 ${
                            isActive ? accent : 'text-white/25 group-hover:text-white/60'
                          }`}
                        >
                          {number}
                        </span>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon
                              className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
                                isActive
                                  ? `${accent} scale-110`
                                  : 'text-white/45 group-hover:text-white/80'
                              }`}
                            />
                            <span
                              className={`text-[11px] font-mono uppercase tracking-[0.18em] transition-colors duration-300 ${
                                isActive ? accent : 'text-zogago-light/45'
                              }`}
                            >
                              {tag}
                            </span>
                          </div>

                          <h3
                            className={`text-lg sm:text-xl font-bold transition-all duration-300 ${
                              isActive
                                ? 'text-white translate-x-1'
                                : 'text-zogago-light/85 group-hover:text-white group-hover:translate-x-1'
                            }`}
                          >
                            {title}
                          </h3>
                        </div>
                      </div>

                      {/* Column 2: Always-readable description + interactive focus strip */}
                      <div className="lg:col-span-7 space-y-2.5 pl-10 sm:pl-12 lg:pl-0">
                        <p
                          className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
                            isActive
                              ? 'text-zogago-light/95'
                              : 'text-zogago-light/65 group-hover:text-zogago-light/90'
                          }`}
                        >
                          {description}
                        </p>

                        <div
                          className={`text-xs font-mono tracking-wide transition-all duration-300 ${
                            isActive
                              ? `${accent} opacity-100 translate-y-0`
                              : 'text-zogago-light/40 opacity-75 group-hover:opacity-100'
                          }`}
                        >
                          {focus}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>

        {/* 3. Open-Canvas Interactive Spotlight: Horizontal Timeline Rail + Giant Metric Stage (Zero Outer Boxes) */}
        <section className="zg-container py-14 md:py-20 border-t border-white/10 relative overflow-hidden">
          {/* Header Row */}
          <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-zogago-blue mb-2">
                <Users className="w-3.5 h-3.5" />
                <span>Why Clients Choose Us</span>
                <span aria-hidden="true" className="text-white/25">·</span>
                <span className="text-zogago-light/55 font-mono">Interactive Studio Lens</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-white">
                Designed to Eliminate Agency Friction
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-zogago-light/60 max-w-md leading-relaxed">
              Select any milestone along the track below to inspect how we replace traditional agency bottlenecks with direct, measurable execution.
            </p>
          </div>

          {/* Frameless Horizontal Interactive Timeline Track */}
          <div className="relative border-b border-white/15 mb-12">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {clientAdvantages.map((item, idx) => {
                const isSelected = activeAdvantage === idx;
                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setActiveAdvantage(idx)}
                    onMouseEnter={() => setActiveAdvantage(idx)}
                    className={`group relative text-left py-4 sm:py-5 pr-4 transition-colors focus-visible:outline-none ${
                      isSelected ? 'text-white' : 'text-zogago-light/45 hover:text-zogago-light/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1">
                      <span
                        className={`font-mono text-xs font-bold tabular-nums transition-colors ${
                          isSelected ? item.accentText : 'text-white/30 group-hover:text-white/60'
                        }`}
                      >
                        {item.number}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-[0.18em] whitespace-nowrap">
                        {item.shortLabel}
                      </span>
                    </div>
                    <p
                      className={`text-sm sm:text-base font-semibold truncate transition-colors ${
                        isSelected ? 'text-white' : 'text-zogago-light/55 group-hover:text-white/85'
                      }`}
                    >
                      {item.criterion}
                    </p>

                    {/* Active bottom laser indicator on the timeline rail */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute left-0 right-0 -bottom-[1px] h-[2px] ${item.accentBg} transition-transform duration-300 origin-left ${
                        isSelected ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Frameless Open-Canvas Spotlight Stage (No Box Enclosures) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Stage (Cols 1-4): Giant Editorial Typography Stat + Step Navigation */}
            <div className="lg:col-span-4 flex flex-col justify-between lg:pr-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zogago-light/55 mb-3">
                  <ActiveIcon className={`w-4 h-4 ${currentAdvantage.accentText}`} />
                  <span>{currentAdvantage.criterion}</span>
                </div>

                {/* Giant Unboxed Editorial Numeral */}
                <div
                  className={`text-6xl sm:text-7xl xl:text-8xl font-bold font-display tracking-tight leading-none tabular-nums ${currentAdvantage.accentText} mb-3 transition-all duration-300`}
                >
                  {currentAdvantage.bigStat}
                </div>

                <p className="text-sm sm:text-base font-medium text-white/90 mb-6">
                  {currentAdvantage.statCaption}
                </p>
              </div>

              {/* Minimal Editorial Step Scrubber */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {clientAdvantages.map((item, idx) => (
                    <button
                      key={item.number}
                      type="button"
                      aria-label={`View ${item.criterion}`}
                      onClick={() => setActiveAdvantage(idx)}
                      className={`h-1.5 transition-all duration-300 rounded-full ${
                        activeAdvantage === idx
                          ? `w-8 ${item.accentBg}`
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setActiveAdvantage((prev) => (prev + 1) % clientAdvantages.length)
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] text-zogago-light/70 hover:text-white transition-colors whitespace-nowrap"
                >
                  <span>Next Lens</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Center & Right Stage (Cols 5-12): Open Editorial Contrast & Connected Execution Pipeline */}
            <div className="lg:col-span-8 lg:pl-10 lg:border-l lg:border-white/10 space-y-8">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug mb-6">
                  {currentAdvantage.title}
                </h3>

                {/* Frameless Two-Column Before vs. After Editorial Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                  {/* Old Bottleneck (Struck/Dimmed Open Column) */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zogago-light/40">
                      <Minus className="w-3.5 h-3.5 text-white/30" />
                      <span>Typical Agency Bottleneck</span>
                    </div>
                    <p className="text-sm sm:text-base text-zogago-light/50 leading-relaxed line-through decoration-white/20">
                      {currentAdvantage.traditional}
                    </p>
                  </div>

                  {/* The Zogago Standard (High-Contrast Open Column) */}
                  <div className="space-y-2.5">
                    <div
                      className={`flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] ${currentAdvantage.accentText}`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>The Zogago Studio Standard</span>
                    </div>
                    <p className="text-sm sm:text-base text-white/95 leading-relaxed font-medium">
                      {currentAdvantage.zogagoWay}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connected 3-Node Execution Flow (Frameless Horizontal Pipeline) */}
              <div className="pt-8 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zogago-light/50">
                    How We Execute This Standard
                  </span>
                  <Link
                    to="/case-studies"
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold ${currentAdvantage.accentText} hover:text-white transition-colors whitespace-nowrap group`}
                  >
                    <span>See Proof in Our Case Studies</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {currentAdvantage.workflowSteps.map((step, stepIdx) => (
                    <div key={step} className="relative flex items-start gap-3">
                      <span
                        className={`font-mono text-xs font-bold tabular-nums pt-0.5 ${currentAdvantage.accentText}`}
                      >
                        0{stepIdx + 1}.
                      </span>
                      <p className="text-xs sm:text-sm text-zogago-light/85 font-medium leading-snug">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Interactive Project Onboarding & Conversion Section */}
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
