import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CaseStudyCard from '@/components/casestudies/CaseStudyCard';
import { caseStudyCategories, CaseStudyCategory } from '@/data/caseStudies';
import { useAllCaseStudiesQuery, CATEGORY_DISPLAY_LABELS } from '@/lib/cms';
import { getDevicePerformanceProfile } from '@/utils/devicePerformance';

type Filter = 'All' | CaseStudyCategory;

const filters: Filter[] = ['All', ...caseStudyCategories];

const filterLabel = (f: Filter): string =>
  f === 'All' ? 'All Work' : CATEGORY_DISPLAY_LABELS[f] || f;

const CaseStudies: React.FC = () => {
  const [active, setActive] = useState<Filter>('All');
  const { studies, isLoading } = useAllCaseStudiesQuery();
  const profile = useMemo(() => getDevicePerformanceProfile(), []);
  const pageSize = profile.isMobile || profile.isLowEndDevice ? 6 : 12;
  const [visibleLimit, setVisibleLimit] = useState(pageSize);

  useEffect(() => {
    setVisibleLimit(pageSize);
  }, [active, pageSize]);

  const filtered = useMemo(
    () => (active === 'All' ? studies : studies.filter((c) => c.category === active)),
    [active, studies],
  );

  const visible = useMemo(
    () => filtered.slice(0, visibleLimit),
    [filtered, visibleLimit],
  );
  const remainingCount = Math.max(0, filtered.length - visible.length);

  return (
    <div className="min-h-screen bg-zogago-dark text-zogago-light">
      <Navbar />

      <main className="pt-28 md:pt-[150px] pb-16 md:pb-24">
        <section className="container mx-auto px-4">
          <motion.div
            initial={profile.isLowEndDevice ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-zogago-blue mb-3">
              Portfolio &amp; Case Studies
            </p>
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zogago-blue to-zogago-purple">
              Selected Work
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-zogago-light/70">
              Explore our brand systems, websites, digital products and visual concepts built for ambitious ideas.
            </p>
          </motion.div>

          <div
            role="tablist"
            aria-label="Filter case studies by category"
            className="mt-8 md:mt-12 flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2 md:gap-3 px-4 -mx-4 sm:mx-0 sm:px-0 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                onClick={() => setActive(f)}
                className={`whitespace-nowrap flex-shrink-0 rounded-full border px-4 py-2 text-xs sm:px-5 sm:py-2 sm:text-sm font-medium transition-all duration-200 ${
                  active === f
                    ? 'border-zogago-blue/60 bg-zogago-blue/15 text-white shadow-[0_0_25px_-8px_rgba(31,182,250,0.7)]'
                    : 'border-white/10 text-zogago-light/65 hover:border-zogago-blue/40 hover:text-white'
                }`}
              >
                {filterLabel(f)}
              </button>
            ))}
          </div>

          {isLoading && visible.length === 0 ? (
            <div className="mt-12 grid gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[16/11] rounded-2xl border border-white/10 bg-white/[0.03] animate-pulse"
                />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="mt-16 text-center py-14 rounded-2xl border border-white/10 bg-white/[0.02] max-w-xl mx-auto px-6">
              <p className="text-lg font-medium text-white mb-2">No projects in this category yet</p>
              <p className="text-sm text-zogago-light/65 mb-6">
                We are currently preparing new case studies for {filterLabel(active)}.
              </p>
              <button
                type="button"
                onClick={() => setActive('All')}
                className="button-glow px-5 py-2.5 text-sm font-medium text-white rounded-xl"
              >
                <span>View All Projects</span>
              </button>
            </div>
          ) : profile.isMobile || profile.isLowEndDevice ? (
            <>
              <div className="mt-8 md:mt-14 grid gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((study) => (
                  <div className="h-full" key={study.slug}>
                    <CaseStudyCard study={study} />
                  </div>
                ))}
              </div>
              {remainingCount > 0 && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleLimit((n) => n + pageSize)}
                    className="rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] px-6 py-3 text-sm font-semibold text-white transition-colors"
                  >
                    Load More Projects ({remainingCount} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <motion.div layout className="mt-8 md:mt-14 grid gap-5 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visible.map((study) => (
                    <motion.div
                      className="h-full"
                      key={study.slug}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      <CaseStudyCard study={study} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              {remainingCount > 0 && (
                <div className="mt-12 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleLimit((n) => n + pageSize)}
                    className="rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] px-6 py-3 text-sm font-semibold text-white transition-colors"
                  >
                    Load More Projects ({remainingCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;

