import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Palette,
  Code,
  Share2,
  TrendingUp,
  ShoppingCart,
  Building2,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAllCaseStudies, CATEGORY_DISPLAY_LABELS } from '@/lib/cms';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface ServiceCard {
  number: string;
  pillar:
    | 'A. Web Design, Development & E-Commerce'
    | 'B. Branding, Graphic Design & Visuals'
    | 'C. AI Agents & Workflow Automation';
  icon: React.ReactNode;
  title: string;
  description: string;
  capabilities: string[];
  route: string;
  /** Real service image. When omitted the icon treatment is shown instead. */
  image?: string;
}

const services: ServiceCard[] = [
  {
    number: '01',
    pillar: 'A. Web Design, Development & E-Commerce',
    icon: <Code className="w-6 h-6" />,
    title: 'Web Design & Development',
    description:
      'Custom, high-converting websites designed to represent your brand professionally, engage visitors, and turn traffic into inquiries.',
    capabilities: [
      'Custom Responsive Website',
      'UI/UX & Performance Setup',
      'Lead Capture & CMS Pages',
    ],
    route: '/services/web-development',
  },
  {
    number: '02',
    pillar: 'B. Branding, Graphic Design & Visuals',
    icon: <Palette className="w-6 h-6" />,
    title: 'Branding & Graphic Design',
    description:
      'Distinctive logos, complete brand style guides, and marketing graphics crafted so customers immediately recognize and trust your business.',
    capabilities: [
      'Logo & Visual Identity',
      'Brand Style Guidelines',
      'Social & Marketing Graphics',
    ],
    route: '/services/graphics-design',
  },
  {
    number: '03',
    pillar: 'A. Web Design, Development & E-Commerce',
    icon: <ShoppingCart className="w-6 h-6" />,
    title: 'E-Commerce & Shopify Solutions',
    description:
      'High-converting online stores and custom Shopify builds with smooth mobile checkout, product organization, and payment setup.',
    capabilities: [
      'Custom Shopify Storefront',
      'Product & Catalog Design',
      'Checkout & Payment Setup',
    ],
    route: '/services/ecommerce',
  },
  {
    number: '04',
    pillar: 'B. Branding, Graphic Design & Visuals',
    icon: <Share2 className="w-6 h-6" />,
    title: 'Photo Editing & Retouching',
    description:
      'Studio-quality commercial retouching, color grading, background cleanup, and product imagery ready for websites and campaigns.',
    capabilities: [
      'Product & Portrait Retouching',
      'Color & Lighting Grading',
      'Clean E-Commerce Exports',
    ],
    route: '/services/photo-editing',
  },
  {
    number: '05',
    pillar: 'B. Branding, Graphic Design & Visuals',
    icon: <Building2 className="w-6 h-6" />,
    title: 'Architecture Visualization',
    description:
      'Photorealistic 3D interior and exterior renders that help real estate, hospitality, and architecture clients present spaces clearly.',
    capabilities: [
      '3D Interior & Exterior Renders',
      'Material & Lighting Realism',
      'Client Presentation Visuals',
    ],
    route: '/services/architecture',
  },
  {
    number: '06',
    pillar: 'C. AI Agents & Workflow Automation',
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'AI & Workflow Automation',
    description:
      'Practical automated customer support and connected daily workflows that save your team time and respond to leads 24/7.',
    capabilities: [
      '24/7 Support Chatbots',
      'Automated Lead Follow-Up',
      'CRM & Booking Integrations',
    ],
    route: '/services/ai-automation',
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We learn about your business goals, target customers, and what your brand or website needs to achieve.',
  },
  {
    number: '02',
    title: 'Plan',
    description:
      'We map out your website structure, visual direction, content flow, and project timeline before production.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'We design and build your brand assets, website, or online store with regular previews and clear feedback milestones.',
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'We test across mobile and desktop, optimize for cross-device performance and speed, and support your smooth launch.',
  },
];

/* ------------------------------------------------------------------ */
/* Motion presets                                                      */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const Services: React.FC = () => {
  const allStudies = useAllCaseStudies();
  const featuredStudies = React.useMemo(() => {
    const preferredSlugs = ['logo-project-01', 'web-project-01', 'shopify-project-01'];
    const matched = preferredSlugs
      .map((slug) => allStudies.find((c) => c.slug === slug))
      .filter((c): c is NonNullable<typeof c> => Boolean(c));
    return matched.length >= 3 ? matched : allStudies.slice(0, 3);
  }, [allStudies]);
  return (
    <div className="min-h-screen bg-zogago-dark text-zogago-light">
      <Navbar />

      <main className="pt-24 md:pt-28 pb-8">
        {/* ============================== HERO ============================== */}
        <section className="relative overflow-hidden">
          {/* ambient glows behind the hero */}
          <div className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-zogago-blue/10 blur-[140px]" />
          <div className="pointer-events-none absolute top-24 -right-24 w-[420px] h-[420px] rounded-full bg-zogago-purple/10 blur-[140px]" />

          <div className="zg-container grid grid-cols-1 lg:grid-cols-2 gap-14 items-center py-10 md:py-14 relative z-10">
            {/* Left — copy */}
            <div>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.1}
                className="text-xs md:text-sm font-semibold uppercase tracking-[0.35em] text-zogago-blue mb-6"
              >
                What We Do
              </motion.p>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.2}
                className="zg-heading-xl font-display mb-6 text-shimmer bg-gradient-to-r from-zogago-blue via-zogago-purple to-zogago-blue bg-clip-text text-transparent"
              >
                We Turn Ideas Into Impact.
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.35}
                className="zg-paragraph max-w-xl mb-10"
              >
                Creative direction, visual design, and digital solutions built to move your brand forward.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.5}
                className="flex flex-wrap items-center gap-4"
              >
                <Button
                  className="button-glow group"
                  onClick={() =>
                    document
                      .getElementById('services-grid')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Link to="/case-studies">
                  <Button
                    variant="outline"
                    className="border-white/15 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-zogago-blue/40 rounded-xl px-6 py-3"
                  >
                    <span>View Our Work</span>
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right — orbital service visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="services-orbit relative hidden md:block aspect-square max-w-[480px] mx-auto w-full"
              aria-hidden="true"
            >
              <div className="services-orbit__backdrop" />

              {/* sparse ambient points */}
              <div className="services-orbit__micro services-orbit__micro--one" />
              <div className="services-orbit__micro services-orbit__micro--two" />
              <div className="services-orbit__micro services-orbit__micro--three" />
              <div className="services-orbit__micro services-orbit__micro--four" />
              <div className="services-orbit__micro services-orbit__micro--five" />

              {/* three-ring ecosystem */}
              <div className="services-orbit__ring services-orbit__ring--outer">
                <span className="services-orbit__ring-light" />
              </div>
              <div className="services-orbit__ring services-orbit__ring--middle">
                <span className="services-orbit__ring-light" />
              </div>
              <div className="services-orbit__ring services-orbit__ring--inner">
                <span className="services-orbit__ring-light" />
              </div>

              <div className="services-orbit__center-glow" />

              {/* exactly three orbiting particles */}
              <div className="services-orbit__track services-orbit__track--pink">
                <span className="services-orbit__particle services-orbit__particle--pink" />
              </div>
              <div className="services-orbit__track services-orbit__track--purple">
                <span className="services-orbit__particle services-orbit__particle--purple" />
              </div>
              <div className="services-orbit__track services-orbit__track--cyan">
                <span className="services-orbit__particle services-orbit__particle--cyan" />
              </div>

              {/* labels pulse as their paired particle approaches */}
              <div className="services-orbit__label services-orbit__label--strategy">
                Strategy
              </div>
              <div className="services-orbit__label services-orbit__label--design">
                Design
              </div>
              <div className="services-orbit__label services-orbit__label--development">
                Development
              </div>
            </motion.div>
          </div>

        </section>

        {/* ========================= SERVICES GRID ========================= */}
        <section id="services-grid" className="zg-section scroll-mt-24">
          <div className="zg-container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="mb-14"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zogago-purple mb-4">
                Services
              </p>
              <h2 className="zg-heading-lg font-display text-gradient-blue mb-4">
                What We Offer
              </h2>
              <p className="zg-paragraph max-w-2xl">
                Six focused disciplines, one goal — work that looks premium and performs even better.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.12 }}
                  className="group relative glass-card p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-zogago-blue/40 hover:shadow-[0_20px_50px_-20px_rgba(31,182,250,0.35)] lg:col-span-2"
                >
                  {/* gradient sweep on hover */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zogago-blue/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-zogago-purple/10 blur-[60px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* image slot — shows a real service image when one is added later */}
                  {service.image && (
                    <div className="mb-8 aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-zogago-blue/20 to-zogago-purple/20 border border-white/10 text-zogago-blue transition-all duration-500 group-hover:from-zogago-blue group-hover:to-zogago-purple group-hover:text-white">
                      {service.icon}
                    </div>
                    <div className="text-right">
                      <span className="block text-[11px] uppercase tracking-[0.2em] text-zogago-blue/80 font-medium mb-1">
                        {service.pillar}
                      </span>
                      <span className="text-3xl font-bold text-white/[0.08] font-display select-none transition-colors duration-500 group-hover:text-zogago-blue/20">
                        {service.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="zg-heading-md font-display text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-zogago-light/60 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {service.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-zogago-light/75"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={service.route}
                    className="inline-flex items-center gap-2 text-sm font-medium text-zogago-light/80 transition-colors duration-300 group-hover:text-zogago-blue"
                  >
                    <span>Explore Service</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================== HOW WE WORK ========================== */}
        <section className="zg-section bg-black/20 relative overflow-hidden">
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-zogago-blue/5 blur-[120px]" />

          <div className="zg-container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zogago-blue mb-4">
                Process
              </p>
              <h2 className="zg-heading-lg font-display text-gradient-purple mb-4">
                Discover → Plan → Build → Launch
              </h2>
              <p className="zg-paragraph max-w-2xl mx-auto">
                A clear, collaborative workflow built around your goals.
              </p>
            </motion.div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* animated connector line (desktop) */}
              <div className="hidden lg:block absolute top-7 left-[12%] right-[12%] h-px bg-white/10">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                  className="absolute inset-0 origin-left bg-gradient-to-r from-zogago-blue via-zogago-purple to-zogago-pink shadow-[0_0_12px_rgba(31,182,250,0.5)]"
                />
              </div>

              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: 0.25 + index * 0.25 }}
                  className="relative text-center flex flex-col items-center"
                >
                  <div className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center bg-zogago-dark border border-zogago-blue/40 font-display text-sm font-bold text-zogago-blue shadow-[0_0_24px_-6px_rgba(31,182,250,0.6)] mb-7">
                    {step.number}
                  </div>
                  <h3 className="zg-heading-md font-display text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-zogago-light/60 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================= FEATURED WORK ========================= */}
        <section className="zg-section">
          <div className="zg-container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="flex flex-wrap items-end justify-between gap-6 mb-14"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zogago-pink mb-4">
                  Featured Work
                </p>
                <h2 className="zg-heading-lg font-display text-gradient-blue">
                  Built To Make An Impact.
                </h2>
              </div>
              <Link
                to="/case-studies"
                className="story-link inline-flex items-center gap-2 text-sm font-medium text-zogago-light/80 hover:text-zogago-blue transition-colors"
              >
                <span>All Case Studies</span>
                <ArrowUpRight size={16} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredStudies.map((study, index) => (
                <motion.div
                  key={study.slug}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <Link
                    to={`/case-studies/${study.slug}`}
                    className="group block rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-zogago-blue/40 hover:shadow-[0_24px_60px_-24px_rgba(31,182,250,0.4)]"
                  >
                    {/* preview */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {study.hero.src ? (
                        <img
                          src={study.hero.src}
                          alt={study.hero.alt || study.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zogago-blue/15 via-transparent to-zogago-purple/25">
                          <div className="absolute inset-[18%] rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-[34%] rounded-full border border-zogago-blue/20 transition-transform duration-700 group-hover:scale-110" />
                          <span className="relative px-5 py-2 neo-blur text-[11px] uppercase tracking-[0.25em] text-zogago-light/70">
                            {study.hero.label}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                    </div>

                    {/* meta */}
                    <div className="p-6">
                      <span className="text-[11px] uppercase tracking-[0.22em] text-zogago-blue/80">
                        {CATEGORY_DISPLAY_LABELS[study.category] || study.category}
                      </span>
                      <h3 className="mt-2 zg-heading-sm font-display text-white transition-colors duration-300 group-hover:text-zogago-blue">
                        {study.name}
                      </h3>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zogago-light/80 transition-colors duration-300 group-hover:text-zogago-purple">
                        View Case Study
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================ FINAL CTA =========================== */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full bg-zogago-purple/10 blur-[120px]" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="zg-container relative z-10 text-center"
          >
            <h2 className="zg-heading-lg md:text-5xl font-display mb-5 text-shimmer bg-gradient-to-r from-zogago-blue via-zogago-purple to-zogago-blue bg-clip-text text-transparent">
              Have an idea worth building?
            </h2>
            <p className="zg-paragraph max-w-xl mx-auto mb-10">
              Let's turn your vision into something people remember.
            </p>
            <Link to="/contact" className="inline-block">
              <Button className="button-glow group px-8 py-4 text-base">
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
