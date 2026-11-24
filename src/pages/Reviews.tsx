import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  MessageSquarePlus,
  Layers,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { getPublishedReviews, saveReview, type Review } from '@/lib/storage';
import { useAllCaseStudies, CATEGORY_DISPLAY_LABELS } from '@/lib/cms';
import { useToast } from '@/hooks/use-toast';

const studioStandards = [
  {
    number: '01',
    title: 'Direct Senior Specialist Execution',
    description:
      'Every project is led and executed directly by our core designers, 3D artists, retouchers, and engineers for fast, clear communication.',
  },
  {
    number: '02',
    title: 'Interactive Milestone Checkpoints',
    description:
      'You review live staging links, design boards, and high-resolution proof renders at every stage of Discover → Plan → Build → Launch.',
  },
  {
    number: '03',
    title: '100% File & Code Ownership',
    description:
      'Upon completion, you receive full ownership of your production codebase, master vector brand files, retouched imagery, and 3D assets.',
  },
];

const ReviewsPage: React.FC = () => {
  const { toast } = useToast();
  const allStudies = useAllCaseStudies();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');

  useEffect(() => {
    setReviews(getPublishedReviews());
  }, []);

  const featuredOutcomes = allStudies.slice(0, 6);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      toast({
        title: 'Missing fields',
        description: 'Please enter your name and your project feedback.',
        variant: 'destructive',
      });
      return;
    }

    // Save privately to the backend Review Vault (approved: false) so the studio can batch-publish after collecting 10-15 reviews
    saveReview({
      name: name.trim(),
      role: role.trim() || 'Client Partner',
      company: company.trim() || 'Verified Project',
      rating,
      text: text.trim(),
      initial: name.trim().charAt(0).toUpperCase(),
      source: 'Client Review',
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
      approved: false,
    });

    setReviews(getPublishedReviews());
    setName('');
    setRole('');
    setCompany('');
    setRating(5);
    setText('');
    setShowSubmitForm(false);

    toast({
      title: 'Review received & saved',
      description:
        'Thank you! Your review has been securely recorded in our client review system.',
    });
  };

  return (
    <div className="min-h-screen bg-zogago-dark text-zogago-light flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 md:pt-32 pb-20">
        {/* 1. Simple, Clean Header */}
        <section className="zg-container pt-4 pb-10 border-b border-white/10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zogago-light/60 mb-3">
              Client Reviews &amp; Work
            </p>

            <h1 className="text-3xl sm:text-5xl font-bold font-display leading-tight text-white mb-4">
              Real Work &amp; Client Feedback.
            </h1>

            <p className="text-sm sm:text-base text-zogago-light/70 leading-relaxed mb-7 max-w-2xl">
              Browse project results across web development, e-commerce, brand identity, 3D visualization, and photo retouching, or share your experience working with our team.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitForm((prev) => !prev)}
                className="button-glow inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-xl"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>Leave a Review</span>
              </button>

              <Link to="/case-studies">
                <Button
                  variant="outline"
                  className="border-white/15 bg-white/[0.03] hover:bg-white/[0.08] rounded-xl px-5 py-2.5 text-sm text-white"
                >
                  <span>View Case Studies</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Review Submission Drawer */}
        {showSubmitForm && (
          <section className="zg-container py-10 border-b border-white/10 bg-white/[0.01]">
            <div className="max-w-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-zogago-blue">
                    Client Feedback Form
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Share Your Experience With Zogago Visuals
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSubmitForm(false)}
                  className="text-xs font-mono text-zogago-light/60 hover:text-white"
                >
                  Close
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zogago-light/65 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 text-sm text-white focus:outline-none focus:border-zogago-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zogago-light/65 mb-1.5">
                      Role / Title
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Founder"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 text-sm text-white focus:outline-none focus:border-zogago-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-zogago-light/65 mb-1.5">
                      Brand / Company
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 text-sm text-white focus:outline-none focus:border-zogago-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zogago-light/65 mb-1.5">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          size={20}
                          className={
                            star <= rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-white/20'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-zogago-light/65 mb-1.5">
                    Your Review *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell us about your project and experience working with our team..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/15 text-sm text-white focus:outline-none focus:border-zogago-blue"
                  />
                </div>

                <Button type="submit" className="button-glow px-6 py-2.5">
                  Submit Review
                </Button>
              </form>
            </div>
          </section>
        )}

        {/* 2. Client Reviews Section */}
        <section className="zg-container py-12 md:py-16 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zogago-blue mb-2">
                Client Feedback
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Client Reviews
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowSubmitForm(true)}
              className="text-xs font-mono text-zogago-blue hover:text-white transition-colors self-start sm:self-auto"
            >
              + Submit a review for a completed project
            </button>
          </div>

          {reviews.length > 0 ? (
            <div className="divide-y divide-white/10 border-y border-white/10">
              {reviews.map((rev, idx) => (
                <div
                  key={rev.id || idx}
                  className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
                >
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={15}
                          className={
                            i < rev.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-white/20'
                          }
                        />
                      ))}
                    </div>
                    <p className="text-base font-bold text-white">{rev.name}</p>
                    <p className="text-xs text-zogago-light/60 mt-0.5">
                      {rev.role}
                      {rev.company ? ` · ${rev.company}` : ''}
                    </p>
                    <p className="text-[11px] font-mono text-zogago-blue mt-2 uppercase tracking-wider">
                      {rev.source || 'Client Review'}
                      {rev.date ? ` · ${rev.date}` : ''}
                    </p>
                  </div>

                  <div className="lg:col-span-8 flex flex-col justify-between gap-4">
                    <p className="text-base sm:text-lg text-zogago-light/90 leading-relaxed">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                    {rev.reviewUrl && (
                      <div>
                        <a
                          href={rev.reviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-zogago-blue hover:text-white transition-colors"
                        >
                          <span>View on Google</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 border-y border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-zogago-blue">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Founding Client Program Open</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Client reviews from our current project cohort are being added as launches conclude.
                </h3>
                <p className="text-sm text-zogago-light/70 leading-relaxed">
                  In the meantime, explore our detailed project breakdowns below or inquire about our Founding Client program for priority scheduling and direct senior execution.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowSubmitForm(true)}
                  className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-semibold text-white transition-colors"
                >
                  Share Project Feedback
                </button>
                <Link to="/contact">
                  <Button className="button-glow px-5 py-2.5 text-xs sm:text-sm">
                    <span>Start a Project</span>
                    <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* 3. Proven Results & Case Study Breakdowns (Challenge -> Execution -> Outcome) */}
        <section className="zg-container py-12 md:py-16 border-b border-white/10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-zogago-purple mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>Project Outcomes &amp; Proof</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Recent Work &amp; Client Deliverables
              </h2>
            </div>

            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-zogago-blue hover:text-white transition-colors"
            >
              <span>View All {allStudies.length} Case Studies</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {featuredOutcomes.map((study) => (
              <Link
                key={study.slug}
                to={`/case-studies/${study.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-zogago-blue/40 transition-all duration-300"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative bg-black/40">
                    {study.hero.src && (
                      <img
                        src={study.hero.src}
                        alt={study.hero.alt || study.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>

                  <div className="p-6">
                    <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-zogago-blue mb-1.5">
                      {CATEGORY_DISPLAY_LABELS[study.category] || study.category}
                    </p>
                    <h3 className="text-lg font-bold text-white group-hover:text-zogago-blue transition-colors mb-2">
                      {study.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zogago-light/70 line-clamp-3 leading-relaxed">
                      {study.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-medium text-zogago-light/80 group-hover:text-white">
                  <span>Inspect Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zogago-blue transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Our Studio Commitment */}
        <section className="zg-container pt-12 md:pt-16">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zogago-blue mb-2">
              Our Commitment
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Every Client Can Expect
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-white/10">
            {studioStandards.map((item) => (
              <div key={item.number} className="space-y-2.5">
                <span className="font-mono text-xs font-bold text-zogago-blue tracking-widest">
                  {item.number}
                </span>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-sm text-zogago-light/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ReviewsPage;
