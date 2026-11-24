import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  Minus,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Code2,
  Palette,
  CreditCard,
  ShieldCheck,
  X,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';

export type FAQCategoryId =
  | 'all'
  | 'onboarding'
  | 'digital'
  | 'creative'
  | 'payments'
  | 'delivery';

interface FAQItem {
  id: string;
  category: Exclude<FAQCategoryId, 'all'>;
  categoryLabel: string;
  question: string;
  answer: string;
  highlights: string[];
  relatedLink?: {
    label: string;
    to: string;
  };
}

const faqCategories: {
  id: FAQCategoryId;
  label: string;
  shortDesc: string;
  icon: React.ElementType;
  accent: string;
}[] = [
  {
    id: 'all',
    label: 'All Questions',
    shortDesc: 'Complete knowledge base across all 6 studio disciplines & policies',
    icon: Sparkles,
    accent: 'text-zogago-blue',
  },
  {
    id: 'onboarding',
    label: 'Studio & Onboarding',
    shortDesc: 'How we collaborate, multi-service bundles & first-24h workflow',
    icon: Sparkles,
    accent: 'text-zogago-blue',
  },
  {
    id: 'digital',
    label: 'Web, Shopify & AI',
    shortDesc: 'Custom websites, e-commerce storefronts & AI lead automation',
    icon: Code2,
    accent: 'text-zogago-purple',
  },
  {
    id: 'creative',
    label: 'Brand, Photo & 3D',
    shortDesc: 'Logo systems, commercial retouching & 3D architectural renders',
    icon: Palette,
    accent: 'text-cyan-400',
  },
  {
    id: 'payments',
    label: 'Pricing & Payments',
    shortDesc: 'Deposit structure, accepted currencies, crypto & verification',
    icon: CreditCard,
    accent: 'text-zogago-pink',
  },
  {
    id: 'delivery',
    label: 'Timelines, Revisions & IP',
    shortDesc: 'Milestones, revision policy, source file ownership & privacy',
    icon: ShieldCheck,
    accent: 'text-emerald-400',
  },
];

const faqCatalog: FAQItem[] = [
  // 1. STUDIO & ONBOARDING
  {
    id: 'what-services-zogago-provides',
    category: 'onboarding',
    categoryLabel: 'Studio & Onboarding',
    question: 'What services does Zogago Visuals provide under one roof?',
    answer:
      'Zogago Visuals operates across six focused creative and technical disciplines grouped into three core pillars: (1) Custom Web Design & Development and E-Commerce & Shopify Storefronts, (2) Branding & Graphic Design, Commercial Photo Editing & Retouching, and 3D Architecture Visualization, and (3) AI Agents & Workflow Automation. Because all six disciplines sit under one roof, your visual identity, product imagery, website code, and lead automation are built to work together seamlessly.',
    highlights: [
      '6 Integrated Disciplines',
      'Web & Shopify Engineering',
      'Brand, 3D & AI Automation',
    ],
    relatedLink: {
      label: 'Explore All 6 Services',
      to: '/services',
    },
  },
  {
    id: 'how-to-start-project',
    category: 'onboarding',
    categoryLabel: 'Studio & Onboarding',
    question: 'How do I start a project, and what happens in the first 24 hours?',
    answer:
      'You can initiate a project through our Contact page, the Get Started popup in the navigation bar, or by emailing contact@zogagovisuals.com directly. Within 24 hours, our lead specialists review your goals, audit your current brand or digital bottlenecks, and reply with a clear scope breakdown, recommended deliverables, and timeline before you commit.',
    highlights: [
      '< 24h Specialist Review',
      'Written Scope & Deliverable List',
      'Zero-Obligation Consultation',
    ],
    relatedLink: {
      label: 'Start Your Project Brief',
      to: '/contact',
    },
  },
  {
    id: 'who-will-i-work-with',
    category: 'onboarding',
    categoryLabel: 'Studio & Onboarding',
    question: 'Will I work directly with the creators or go through account managers?',
    answer:
      'You collaborate directly with the creative and technical specialists building your project—never through layers of disconnected junior account managers. This direct access eliminates communication delays, ensures your feedback is understood immediately, and keeps production moving fast.',
    highlights: [
      'Direct Creator Access',
      'Single Point of Accountability',
      'No Agency Middlemen',
    ],
    relatedLink: {
      label: 'Learn About Our Studio Philosophy',
      to: '/about',
    },
  },
  {
    id: 'combine-multiple-services',
    category: 'onboarding',
    categoryLabel: 'Studio & Onboarding',
    question:
      'Can I combine multiple services—like Brand Identity, Product Retouching, and a Shopify Store—in one project?',
    answer:
      'Yes, and that is where clients see the highest return. Instead of hiring separate freelancers for your logo, product photography cleanup, 3D packaging renders, and Shopify or web build, we unify them into one coordinated production roadmap so your launch looks cohesive from day one.',
    highlights: [
      'Unified Multi-Discipline Roadmaps',
      'Consistent Visual & Code Standards',
      'Streamlined Single-Team Handoff',
    ],
    relatedLink: {
      label: 'Inspect Multi-Discipline Case Studies',
      to: '/case-studies',
    },
  },

  // 2. WEB, SHOPIFY & AI AUTOMATION
  {
    id: 'web-and-shopify-tech',
    category: 'digital',
    categoryLabel: 'Web, Shopify & AI',
    question: 'What kind of websites and e-commerce stores do you design and build?',
    answer:
      'We build custom, high-converting marketing websites, interactive web applications, and bespoke Shopify e-commerce storefronts. Every build features custom UI/UX tailored to your brand (no cookie-cutter templates), responsive mobile-first layouts, smooth checkout and payment gateway integration, and structured product catalog architecture.',
    highlights: [
      'Custom Responsive Web Builds',
      'Bespoke Shopify Storefronts',
      'Conversion-First Checkout Flows',
    ],
    relatedLink: {
      label: 'View Web Development Capabilities',
      to: '/services/web-development',
    },
  },
  {
    id: 'ecommerce-shopify-deliverables',
    category: 'digital',
    categoryLabel: 'Web, Shopify & AI',
    question: 'What is included in an E-Commerce & Shopify Storefront build?',
    answer:
      'Our e-commerce engagements cover custom storefront UI design, product and collection taxonomy organization, high-converting product detail pages (PDPs), mobile checkout optimization, payment processor setup, and integration with your shipping, inventory, or email marketing tools.',
    highlights: [
      'Custom Storefront & PDP Design',
      'Catalog & Collection Architecture',
      'Payment & Checkout Setup',
    ],
    relatedLink: {
      label: 'Explore E-Commerce Solutions',
      to: '/services/ecommerce',
    },
  },
  {
    id: 'ai-workflow-automation-details',
    category: 'digital',
    categoryLabel: 'Web, Shopify & AI',
    question: 'What practical AI Agents & Workflow Automations can you implement for my business?',
    answer:
      'We focus on practical, revenue-supporting automation rather than gimmicks. This includes 24/7 customer support and lead-qualification chatbots trained on your business offerings, automated instant follow-up sequences for inbound inquiries, and seamless integrations connecting your website forms directly to your CRM, calendar booking tools, and internal notifications.',
    highlights: [
      '24/7 Lead & Support Chatbots',
      'Automated Inquiry Follow-Up',
      'CRM & Calendar Integrations',
    ],
    relatedLink: {
      label: 'Explore AI & Workflow Automation',
      to: '/services/ai-automation',
    },
  },
  {
    id: 'mobile-speed-and-seo',
    category: 'digital',
    categoryLabel: 'Web, Shopify & AI',
    question: 'Are your websites optimized for mobile devices, fast loading speeds, and search engines?',
    answer:
      'Every website and storefront we launch goes through cross-device testing across mobile, tablet, and desktop viewports. We optimize asset compression, lazy-loading, semantic HTML hierarchy, OpenGraph social cards, and technical SEO foundations so your site loads rapidly even on mobile networks.',
    highlights: [
      'Mobile-First Viewport QA',
      'Performance & Asset Optimization',
      'Clean Technical SEO Structure',
    ],
  },

  // 3. BRANDING, 3D & COMMERCIAL RETOUCHING
  {
    id: 'brand-identity-deliverables',
    category: 'creative',
    categoryLabel: 'Brand, Photo & 3D',
    question: 'What deliverables do I receive in a Branding & Graphic Design project?',
    answer:
      'Depending on your scope, we deliver primary and secondary logo lockups, brand marks, curated color palettes, typographic hierarchy systems, comprehensive brand style guidelines, and marketing collateral (packaging, apparel, stationery, signage, and social media graphics). You receive master vector files (SVG, EPS, PDF) alongside high-resolution web-ready PNG/WebP exports.',
    highlights: [
      'Master Vector Files (SVG, EPS, PDF)',
      'Complete Brand Style Guidelines',
      'Packaging, Apparel & Social Collateral',
    ],
    relatedLink: {
      label: 'Explore Branding & Graphic Design',
      to: '/services/graphics-design',
    },
  },
  {
    id: 'photo-editing-retouching-scope',
    category: 'creative',
    categoryLabel: 'Brand, Photo & 3D',
    question: 'What does your Commercial Photo Editing & Retouching service cover?',
    answer:
      'We provide studio-grade commercial post-production for e-commerce catalogs, fashion, beauty, jewelry, and editorial campaigns. Services include high-end skin and portrait retouching, dust/scratch and reflection cleanup, precision background removal or scene compositing, consistent color and lighting grading, and crisp web-ready exports.',
    highlights: [
      'Product, Beauty & Portrait Retouching',
      'Precision Color & Lighting Grading',
      'Clean E-Commerce & Campaign Exports',
    ],
    relatedLink: {
      label: 'Explore Photo Editing & Retouching',
      to: '/services/photo-editing',
    },
  },
  {
    id: 'architecture-3d-visualization',
    category: 'creative',
    categoryLabel: 'Brand, Photo & 3D',
    question: 'How does 3D Architecture Visualization work, and what inputs do you need?',
    answer:
      'We create photorealistic 3D interior and exterior renders for architects, real estate developers, interior designers, and hospitality brands. You can share CAD files, floor plans, elevations, 3D models, or even rough sketches and material moodboards—we handle the modeling, physically accurate lighting, texturing, and high-resolution camera renders for investor decks and pre-sale marketing.',
    highlights: [
      'Photorealistic Interior & Exterior Renders',
      'Physically Accurate Lighting & Materials',
      'Works From CAD, Plans, or Sketches',
    ],
    relatedLink: {
      label: 'Explore Architecture Visualization',
      to: '/services/architecture',
    },
  },
  {
    id: 'inspect-real-portfolio-work',
    category: 'creative',
    categoryLabel: 'Brand, Photo & 3D',
    question: 'Can I see real examples of your completed projects before reaching out?',
    answer:
      'Absolutely. Our Case Studies catalog showcases real production work across Logo & Branding, Web Design, Shopify E-Commerce, Architecture Visualization, and Image Editing—complete with visual breakdowns of the challenge, approach, and final deliverables.',
    highlights: [
      '10+ Detailed Case Studies',
      'Filterable by Service Discipline',
      'Full Visual & Strategy Breakdowns',
    ],
    relatedLink: {
      label: 'Browse All Case Studies',
      to: '/case-studies',
    },
  },

  // 4. PRICING, PAYMENTS & CRYPTO
  {
    id: 'payment-policy-deposits',
    category: 'payments',
    categoryLabel: 'Pricing & Payments',
    question: 'How does project pricing and upfront deposit payment work?',
    answer:
      'We scope every project transparently based on your exact deliverables and timeline before any work begins. Under our official Payment Policy, a 50% upfront payment is required to kick off production (or you may choose to pay 100% upfront if preferred). For larger-scope engagements, an initial deposit of 30% may be accepted depending on the project structure.',
    highlights: [
      '50% Standard Upfront Deposit',
      '30% Initial Option for Larger Scopes',
      'Fixed Scope Agreed Before Kickoff',
    ],
    relatedLink: {
      label: 'Read Full Payment Policy',
      to: '/terms-and-conditions',
    },
  },
  {
    id: 'accepted-payment-methods',
    category: 'payments',
    categoryLabel: 'Pricing & Payments',
    question: 'What payment methods and cryptocurrencies do you accept?',
    answer:
      'We support both traditional international payments and major cryptocurrencies for fast, borderless settlement. Accepted methods include Bank Transfer, Credit Card, PayPal, Skrill, Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and Tether (USDT).',
    highlights: [
      'Bank Transfer, Credit Card & PayPal',
      'Skrill International Transfers',
      'Crypto: BTC, ETH, SOL & USDT',
    ],
    relatedLink: {
      label: 'View Accepted Payment Methods',
      to: '/terms-and-conditions',
    },
  },
  {
    id: 'payment-verification-speed',
    category: 'payments',
    categoryLabel: 'Pricing & Payments',
    question: 'How long does payment verification take before my project starts?',
    answer:
      'Payments made via Credit Card, PayPal, Skrill, or cryptocurrency (BTC, ETH, SOL, USDT) are typically verified within 1 hour of receipt so production can start the same day. Standard bank transfers may take up to 3 business days to clear depending on your financial institution.',
    highlights: [
      '~1 Hour Verification for Card, PayPal & Crypto',
      'Up to 3 Business Days for Bank Transfers',
      'Proactive Support If Delayed',
    ],
  },

  // 5. TIMELINES, REVISIONS & IP OWNERSHIP
  {
    id: 'process-and-milestone-previews',
    category: 'delivery',
    categoryLabel: 'Timelines, Revisions & IP',
    question: 'How do you manage project timelines and keep me updated during production?',
    answer:
      'Every project is executed through our four-stage framework: Discover → Plan → Build → Launch. Before we start, you receive a clear delivery timeframe. During the Build phase, we share live interactive previews and milestone check-ins so you can see real progress and provide feedback before final launch.',
    highlights: [
      'Discover → Plan → Build → Launch',
      'Clear Delivery Timeframe Upfront',
      'Live Milestone Checkpoints',
    ],
  },
  {
    id: 'revision-policy-and-rates',
    category: 'delivery',
    categoryLabel: 'Timelines, Revisions & IP',
    question: 'How do revisions work during and after final project delivery?',
    answer:
      'Collaborative feedback checkpoints are included during active project milestones. To prevent unnecessary delays, we ask clients to communicate all core requirements before placing an order. In accordance with our Terms and Conditions, any additional revisions requested after final delivery outside the agreed scope are billed transparently at $20 per revision.',
    highlights: [
      'Milestone Feedback Built Into Process',
      '$20 Per Additional Post-Delivery Revision',
      'Transparent Scope Protection',
    ],
    relatedLink: {
      label: 'Review Terms & Revision Policy',
      to: '/terms-and-conditions',
    },
  },
  {
    id: 'ip-and-source-file-ownership',
    category: 'delivery',
    categoryLabel: 'Timelines, Revisions & IP',
    question: 'Do I get full ownership of my source code, vector logos, and design files?',
    answer:
      'Yes. Once final payment is completed, you own 100% of the final deliverables, custom source code, master vector identity files, retouched high-resolution imagery, and 3D renders. We do not hold your website or brand hostage behind mandatory proprietary retainers.',
    highlights: [
      '100% Client IP & File Handover',
      'Full Source Code & Vector Masters',
      'Zero Proprietary Lock-In',
    ],
  },
  {
    id: 'privacy-and-nda-protection',
    category: 'delivery',
    categoryLabel: 'Timelines, Revisions & IP',
    question: 'How is my business data protected, and can you sign an NDA?',
    answer:
      'Under our Privacy Policy, we collect only the identity, contact, and project details required to communicate with you and deliver your work. Your data and unlaunched brand assets are kept strictly confidential and never sold to third parties. We are also happy to sign a mutual Non-Disclosure Agreement (NDA) before reviewing sensitive product or architectural briefs.',
    highlights: [
      'Strict Confidentiality & Data Protection',
      'Mutual NDA Available on Request',
      'Zero Third-Party Data Selling',
    ],
    relatedLink: {
      label: 'Read Our Privacy Policy',
      to: '/privacy-policy',
    },
  },
];

const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>([
    'what-services-zogago-provides',
    'how-to-start-project',
  ]);
  const resultsRef = React.useRef<HTMLDivElement>(null);

  const isSearching = searchQuery.trim().length > 0;

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const tokens = q.split(/\s+/).filter(Boolean);

    return faqCatalog.filter((item) => {
      // When actively searching, search across all categories so results are never hidden by an active tab
      if (!q) {
        return selectedCategory === 'all' || item.category === selectedCategory;
      }

      const searchableText = [
        item.question,
        item.answer,
        item.categoryLabel,
        ...item.highlights,
      ]
        .join(' ')
        .toLowerCase();

      return tokens.every((token) => searchableText.includes(token));
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<FAQCategoryId, number> = {
      all: faqCatalog.length,
      onboarding: 0,
      digital: 0,
      creative: 0,
      payments: 0,
      delivery: 0,
    };
    faqCatalog.forEach((item) => {
      counts[item.category] += 1;
    });
    return counts;
  }, []);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAllVisible = () => {
    setOpenIds(filteredFaqs.map((f) => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredFaqs.length > 0) {
      setOpenIds(filteredFaqs.map((f) => f.id));
    }
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-zogago-dark text-zogago-light flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 md:pt-32 pb-20">
        {/* 1. Simple, Clean Header + Search & Topic Filter */}
        <section className="zg-container pt-4 pb-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zogago-blue mb-3">
              Frequently Asked Questions
            </p>

            <h1 className="text-3xl sm:text-5xl font-bold font-display leading-tight text-white mb-4">
              Clear Answers Before{' '}
              <span className="text-gradient-blue">We Start.</span>
            </h1>

            <p className="text-sm sm:text-base text-zogago-light/70 leading-relaxed mb-8">
              Straightforward answers about our services, workflow, pricing, payment methods, timelines, and file ownership.
            </p>

            {/* Working Search Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative max-w-xl mx-auto"
              role="search"
            >
              <Search className="w-4 h-4 text-zogago-light/50 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="faq-search"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  const trimmed = val.trim().toLowerCase();
                  if (trimmed) {
                    setSelectedCategory('all');
                    const tokens = trimmed.split(/\s+/).filter(Boolean);
                    const matchedIds = faqCatalog
                      .filter((item) => {
                        const searchable = [
                          item.question,
                          item.answer,
                          item.categoryLabel,
                          ...item.highlights,
                        ]
                          .join(' ')
                          .toLowerCase();
                        return tokens.every((t) => searchable.includes(t));
                      })
                      .map((item) => item.id);
                    setOpenIds(matchedIds);
                  } else {
                    setOpenIds([
                      'what-services-zogago-provides',
                      'how-to-start-project',
                    ]);
                  }
                }}
                placeholder="Search any topic (e.g. Shopify, pricing, crypto, revisions)..."
                className="w-full pl-11 pr-24 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-sm text-white placeholder:text-zogago-light/45 focus:outline-none focus:border-zogago-blue transition-colors"
              />
              {searchQuery ? (
                <button
                  type="button"
                  aria-label="Clear search query"
                  onClick={() => {
                    setSearchQuery('');
                    setOpenIds([
                      'what-services-zogago-provides',
                      'how-to-start-project',
                    ]);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 text-xs text-zogago-light/80 hover:text-white hover:bg-white/15 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-medium text-zogago-light/80 hover:text-white transition-colors"
                >
                  Search
                </button>
              )}
            </form>
          </div>

          {/* Simple Horizontal Category Filter Tabs */}
          <div className="max-w-4xl mx-auto mt-8 flex flex-wrap items-center justify-center gap-2">
            {faqCategories.map((cat) => {
              const active = !isSearching && selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    if (searchQuery) {
                      setSearchQuery('');
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-white text-zogago-dark font-semibold'
                      : 'bg-white/[0.03] text-zogago-light/70 hover:text-white hover:bg-white/[0.07]'
                  }`}
                >
                  {cat.label}{' '}
                  <span className="opacity-60 text-xs">
                    ({categoryCounts[cat.id]})
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Simple, Focused Question List */}
        <section ref={resultsRef} className="zg-container py-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/10 text-xs text-zogago-light/55">
              <span>
                {isSearching
                  ? `Found ${filteredFaqs.length} matching result${filteredFaqs.length === 1 ? '' : 's'} for "${searchQuery.trim()}"`
                  : `Showing ${filteredFaqs.length} question${filteredFaqs.length === 1 ? '' : 's'}`}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={expandAllVisible}
                  className="hover:text-white transition-colors"
                >
                  Expand all
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="hover:text-white transition-colors"
                >
                  Collapse all
                </button>
              </div>
            </div>

            {filteredFaqs.length === 0 ? (
              <div className="py-14 text-center">
                <p className="text-base font-medium text-white mb-2">
                  No matching questions found for &ldquo;{searchQuery}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-xs text-zogago-blue hover:underline"
                >
                  Reset search &amp; show all questions
                </button>
              </div>
            ) : (
              <div className="divide-y divide-white/10 border-b border-white/10">
                {filteredFaqs.map((item) => {
                  const isOpen = openIds.includes(item.id);
                  return (
                    <div key={item.id} className="py-5">
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                        className="w-full flex items-start justify-between gap-4 text-left focus-visible:outline-none"
                      >
                        <div>
                          <span className="block text-[11px] text-zogago-light/45 mb-1">
                            {item.categoryLabel}
                          </span>
                          <h2 className="text-base sm:text-lg font-semibold text-white leading-snug">
                            {item.question}
                          </h2>
                        </div>

                        <span className="mt-1 text-zogago-light/60 shrink-0">
                          {isOpen ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="mt-3 space-y-3 text-sm text-zogago-light/75 leading-relaxed">
                          <p>{item.answer}</p>
                          {item.relatedLink && (
                            <div>
                              <Link
                                to={item.relatedLink.to}
                                className="inline-flex items-center gap-1 text-xs font-medium text-zogago-blue hover:text-white transition-colors"
                              >
                                <span>{item.relatedLink.label}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Simple Bottom Contact Prompt */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Still have a question?
                </h3>
                <p className="text-xs sm:text-sm text-zogago-light/65 mt-0.5">
                  Reach out directly and our team will reply within 24 hours.
                </p>
              </div>
              <Link to="/contact">
                <Button className="button-glow px-5 py-2.5 text-sm">
                  <span>Contact Us</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
