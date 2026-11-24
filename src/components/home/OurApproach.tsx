import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket,
  TrendingUp,
  ShoppingBag,
  Globe,
  Building2,
  Star,
  ExternalLink,
  ChevronDown,
  ArrowUpRight,
  Check,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPublishedReviews, type Review } from '@/lib/storage';
import CardDeckCarousel, { type Slide, type LandPalette } from '@/components/ui/card-deck-carousel';
import {
  PARTNER_ARCHETYPES,
  type PartnerArchetype,
} from '@/utils/partnerArchetypes';
import { getDevicePerformanceProfile } from '@/utils/devicePerformance';

const archetypeIcons: Record<string, React.ElementType> = {
  'new-growing-brands': Rocket,
  'ecommerce-online-stores': ShoppingBag,
  'service-local-businesses': Globe,
  'established-companies': TrendingUp,
  'real-estate-visual-brands': Building2,
};

const archetypeVisuals: Record<
  string,
  { image: string; palette: LandPalette; seed: number }
> = {
  'new-growing-brands': {
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
    palette: 'dawn',
    seed: 3,
  },
  'ecommerce-online-stores': {
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
    palette: 'alpine',
    seed: 8,
  },
  'service-local-businesses': {
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
    palette: 'dusk',
    seed: 14,
  },
  'established-companies': {
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    palette: 'mist',
    seed: 21,
  },
  'real-estate-visual-brands': {
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop',
    palette: 'alpine',
    seed: 55,
  },
};

const faqs = [
  {
    question: 'What services does Zogago provide as a digital agency?',
    answer:
      'Zogago is a creative and digital agency. Our core services include Custom Web Design & Development, Branding & Graphic Design (logos, visual identity systems, and marketing graphics), E-Commerce & Shopify Storefronts, Commercial Photo Editing & Retouching, 3D Architectural Visualization, and practical AI & Workflow Automation.',
  },
  {
    question: 'How do I start a project and what is the process?',
    answer:
      'You can start a project using the Contact Us form on our website or by emailing us directly at contact@zogagovisuals.com. We review your goals, discuss your design and business requirements, and share a clear scope, deliverable list, and timeline before confirming your order.',
  },
  {
    question: 'How does project pricing and payment work?',
    answer:
      'In accordance with our Payment Policy, a 50% upfront deposit is required before work begins (or you may choose to pay the full amount upfront if preferred). For larger-scope projects, an initial payment of 30% may be arranged depending on the project scope.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept Bank Transfer, Credit Card, PayPal, Skrill, and major cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and USDT. Payments are verified promptly so your project can move forward without delay.',
  },
  {
    question: 'How do project timelines and revisions work?',
    answer:
      'We provide a clear delivery timeframe before starting every project and collaborate with you through structured milestones. Please share all key requirements before placing your order; after final delivery, any additional revisions outside the agreed scope are charged at $20 per revision.',
  },
  {
    question: 'How is my personal and business information protected?',
    answer:
      'Under our Privacy Policy, we only collect the identity, contact, and project details necessary to communicate with you and deliver your services. Your information is kept strictly confidential and is never sold to third parties.',
  },
];

interface DeckSlideCardContentProps {
  archetype: PartnerArchetype;
}

const DeckSlideCardContent: React.FC<DeckSlideCardContentProps> = ({ archetype }) => {
  const Icon = archetypeIcons[archetype.id] || Layers;

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    const contactSection =
      document.getElementById('contact') || document.getElementById('about');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `radial-gradient(circle at 92% 10%, rgba(${archetype.glowRgb}, 0.22), transparent 55%), linear-gradient(155deg, rgba(15, 23, 42, 0.88) 0%, rgba(9, 14, 26, 0.90) 60%, rgba(6, 10, 19, 0.92) 100%)`,
      }}
      className="relative w-full h-full px-4 py-3.5 sm:px-6 sm:py-5 flex flex-col justify-between bg-white/[0.03] backdrop-blur-xl border border-white/15 rounded-[18px] text-left shadow-2xl"
    >
      {/* Top Row: Stage Eyebrow + Icon */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/[0.06] border border-white/10 min-w-0">
            <span
              className={cn(
                'font-mono font-bold tabular-nums text-xs sm:text-[13px] shrink-0',
                archetype.accentText
              )}
            >
              {archetype.index}
            </span>
            <span aria-hidden="true" className="text-white/35 shrink-0">
              ·
            </span>
            <span className="text-[11px] sm:text-xs font-medium tracking-wide text-slate-200 truncate">
              {archetype.stageLabel}
            </span>
          </div>

          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg border border-white/15 bg-white/[0.06] flex items-center justify-center shrink-0">
            <Icon className={cn('w-4 h-4 sm:w-4.5 sm:h-4.5', archetype.accentText)} />
          </div>
        </div>

        {/* Clear, Large Headline + Single Scannable Value Proposition */}
        <h3 className="text-[17px] sm:text-[21px] font-bold text-[#F8FAFC] tracking-tight mb-1 sm:mb-1.5 leading-snug truncate">
          {archetype.title}
        </h3>
        <p className="text-[12.5px] sm:text-[14px] text-slate-200/95 font-normal leading-relaxed line-clamp-2">
          {archetype.outcome}
        </p>
      </div>

      {/* Middle / Lower Section: Scannable Deliverable Chips + Action Bar */}
      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
          {archetype.deliverables.map((item, idx) => (
            <div
              key={item}
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/12 text-[11px] sm:text-xs text-slate-100 font-medium',
                idx === 2 && 'hidden sm:inline-flex'
              )}
            >
              <Check className={cn('w-3 h-3 shrink-0', archetype.accentText)} />
              <span className="truncate max-w-[135px] sm:max-w-none">{item}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 sm:pt-2.5 border-t border-white/15">
          <Link
            to={archetype.serviceRoute}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'inline-flex items-center gap-1 text-xs sm:text-[13px] font-semibold hover:text-white focus-visible:outline-none focus-visible:underline transition-colors whitespace-nowrap',
              archetype.accentText
            )}
          >
            <span>{archetype.serviceLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleScrollToContact}
            className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/[0.08] hover:bg-white/15 border border-white/15 text-xs sm:text-[13px] font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zogago-blue transition-colors whitespace-nowrap"
          >
            Start Project →
          </button>
        </div>
      </div>
    </div>
  );
};

const OurApproach: React.FC = () => {
  const [genuineReviews, setGenuineReviews] = useState<Review[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeDeckIndex, setActiveDeckIndex] = useState<number>(0);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    setGenuineReviews(getPublishedReviews());
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobileViewport(window.innerWidth < 640);
    };
    updateViewport();
    window.addEventListener('resize', updateViewport, { passive: true });
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const deckImageWidth = React.useMemo(
    () => getDevicePerformanceProfile().recommendedImageWidth,
    []
  );

  const deckSlides: Slide[] = useMemo(
    () =>
      PARTNER_ARCHETYPES.map((archetype) => {
        const visual = archetypeVisuals[archetype.id] || {
          image:
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
          palette: 'dawn' as LandPalette,
          seed: 3,
        };
        const sizedImage = visual.image.replace('w=1200', `w=${deckImageWidth}`);
        return {
          image: sizedImage,
          palette: visual.palette,
          seed: visual.seed,
          title: `${archetype.index} · ${archetype.title}`,
          caption: archetype.stageLabel,
          alt: `${archetype.title} — ${archetype.stageLabel}`,
          content: <DeckSlideCardContent archetype={archetype} />,
        };
      }),
    [deckImageWidth]
  );

  return (
    <section id="approach" className="zg-section relative space-y-20">
      {/* 1. Who We Work With — Interactive Card Deck Carousel */}
      <div className="zg-container">
        {/* div:nth-of-type(1) — Header + Client Profile Selector adjusted into header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-6">
          <div className="max-w-2xl">
            <h2 className="zg-heading-lg mb-2 text-left text-white">
              Who We <span className="text-gradient-blue">Work With</span>
            </h2>
            <p className="text-lg sm:text-xl font-semibold text-gradient-purple mb-2.5 text-left">
              Helping Businesses Build, Grow &amp; Stand Out.
            </p>
            <p className="zg-paragraph text-left">
              Whether you are launching a new brand, redesigning an outdated website, growing online sales, or automating daily workflows, we provide the creative design and digital craft your business needs to move forward.
            </p>
          </div>

          {/* Adjusted Client Profile Selector (01–05) in Header */}
          <div className="flex flex-col items-start lg:items-end gap-2 lg:max-w-lg shrink-0">
            <div
              role="tablist"
              aria-label="Select client profile in deck"
              className="flex flex-wrap items-center lg:justify-end gap-1.5 sm:gap-2 p-1.5 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10"
            >
              {PARTNER_ARCHETYPES.map((archetype, idx) => {
                const isCurrent = idx === activeDeckIndex;
                return (
                  <button
                    key={archetype.id}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`Jump to ${archetype.title}`}
                    onClick={() => setActiveDeckIndex(idx)}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zogago-blue',
                      isCurrent
                        ? 'bg-gradient-to-r from-zogago-blue/25 to-zogago-purple/25 border-zogago-blue/60 text-white shadow-[0_0_18px_rgba(31,182,250,0.22)]'
                        : 'bg-transparent border-transparent text-zogago-light/70 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <span className={cn('font-mono font-bold', archetype.accentText)}>
                      {archetype.index}
                    </span>
                    <span className="hidden sm:inline">{archetype.title}</span>
                    <span className="sm:hidden">
                      {archetype.title.split('&')[0].trim()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* div:nth-of-type(2) — Unboxed Interactive Throwable Card Deck Carousel */}
        <div className="relative py-1">
          <CardDeckCarousel
            slides={deckSlides}
            height="auto"
            cardWidth={isMobileViewport ? '320px' : '530px'}
            cardHeight={isMobileViewport ? '248px' : '282px'}
            scatter={5}
            autoplay={0}
            background="transparent"
            ink="#f8fafc"
            activeIndex={activeDeckIndex}
            onChange={setActiveDeckIndex}
            ariaLabel="Who We Work With client profile deck"
          />

          <p className="text-center text-[11px] text-zogago-light/45 mt-1">
            Drag or throw the top card, or use the arrows to explore client profiles
          </p>
        </div>
      </div>

      {/* 2. Client Reviews & Feedback (Google Reviews Ready, Zero Fabricated Reviews) */}
      <div id="reviews" className="zg-container scroll-mt-28">
        <div className="glass-card p-8 sm:p-10 border border-white/10 relative overflow-hidden">
          <div className="hidden md:block pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-zogago-blue/10 blur-[90px]" />
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-xs text-zogago-light/80 mb-3">
              <Star className="w-3.5 h-3.5 text-zogago-blue" />
              <span>Client Feedback &amp; Google Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Credibility Through <span className="text-gradient-blue">Real Work</span>
            </h2>

            {genuineReviews.length > 0 ? (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {genuineReviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={15}
                              className={
                                i < review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-white/20'
                              }
                            />
                          ))}
                        </div>
                        <span className="text-[11px] uppercase tracking-wider text-zogago-light/50">
                          {review.source || 'Google Review'}
                        </span>
                      </div>
                      <p className="text-sm text-zogago-light/85 leading-relaxed mb-4">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-zogago-light/60">
                      <div>
                        <span className="font-semibold text-white">{review.name}</span>
                        {review.company && <span> · {review.company}</span>}
                        {review.date && (
                          <span className="block text-[11px] text-zogago-light/40 mt-0.5">
                            {review.date}
                          </span>
                        )}
                      </div>
                      {review.reviewUrl && (
                        <a
                          href={review.reviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-zogago-blue hover:underline"
                        >
                          <span>View on Google</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                <p className="text-sm sm:text-base text-zogago-light/70 max-w-2xl mx-auto leading-relaxed">
                  Client reviews from our current project cohort are published here as launches conclude. In the meantime, explore our completed case studies or share your feedback if we have collaborated recently.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <a
                    href="/reviews"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-zogago-blue/40 text-xs sm:text-sm font-semibold text-white transition-all group"
                  >
                    <span>Explore Client Stories &amp; Leave a Review</span>
                    <ArrowUpRight className="w-4 h-4 text-zogago-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Frequently Asked Questions */}
      <div className="zg-container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-xs sm:text-sm font-medium text-zogago-purple mb-2">
              FAQ · Clear Answers Before We Start
            </div>
            <h2 className="zg-heading-lg mb-3">
              Common <span className="text-gradient-blue">Questions</span>
            </h2>
            <p className="text-sm sm:text-base text-zogago-light/70">
              Straightforward answers about our digital agency services, pricing, timelines, and how we work together.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="glass-card border border-white/10 rounded-xl overflow-hidden transition-colors hover:border-white/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zogago-blue"
                  >
                    <span className="font-semibold text-sm sm:text-base text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zogago-blue shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-zogago-light/75 leading-relaxed border-t border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <a
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.08] hover:border-zogago-blue/40 text-xs sm:text-sm font-semibold text-white transition-all duration-300 group"
            >
              <span>Explore Full FAQ &amp; Policy Knowledge Base (18+ Answers)</span>
              <ArrowUpRight className="w-4 h-4 text-zogago-blue transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;
