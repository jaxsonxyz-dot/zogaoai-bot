import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CasePlaceholder from '@/components/casestudies/CasePlaceholder';
import BrandSystemSection from '@/components/casestudies/BrandSystemSection';
import ConsultationCTA from '@/components/casestudies/ConsultationCTA';
import SectionRenderer from '@/components/casestudies/SectionRenderer';
import { useCaseStudyBySlug, CATEGORY_DISPLAY_LABELS } from '@/lib/cms';

const CaseStudyDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { study, next, isLoading } = useCaseStudyBySlug(slug);

  if (!study && isLoading) {
    return (
      <div className="min-h-screen bg-zogago-dark text-zogago-light">
        <Navbar />
        <main className="pt-28 md:pt-[150px] pb-16 md:pb-24 container mx-auto px-4">
          <div className="h-8 w-40 rounded bg-white/5 animate-pulse mb-8" />
          <div className="h-14 w-2/3 rounded bg-white/5 animate-pulse mb-4" />
          <div className="h-6 w-1/2 rounded bg-white/5 animate-pulse mb-10" />
          <div className="aspect-video w-full rounded-2xl bg-white/5 animate-pulse" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!study) return <Navigate to="/case-studies" replace />;

  let counter = 0;

  return (
    <div className="min-h-screen bg-zogago-dark text-zogago-light">
      <Navbar />

      <main className="pt-28 md:pt-[150px] pb-16 md:pb-24">
        {/* Hero */}
        <section className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-zogago-light/60 transition-colors hover:text-zogago-blue"
            >
              <ArrowLeft size={16} /> Back to Case Studies
            </Link>

            <span className="mt-8 block text-xs uppercase tracking-[0.28em] text-zogago-blue/80">
              {CATEGORY_DISPLAY_LABELS[study.category] || study.category}
            </span>
            <h1 className="mt-3 text-4xl md:text-6xl font-bold tracking-tight text-white">
              {study.name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-zogago-light/70">{study.shortDescription}</p>

            <div className="mt-10">
              <CasePlaceholder image={study.hero} ratio={16 / 9} />
            </div>
          </motion.div>
        </section>

        {/* Sections */}
        <section className="container mx-auto px-4">
          <div className="mt-12 md:mt-20 space-y-14 md:space-y-24">
            {study.sections.map((section, i) => {
              const index =
                section.type === 'overview'
                  ? undefined
                  : String(++counter).padStart(2, '0');
              return <SectionRenderer key={i} section={section} index={index} />;
            })}
          </div>
        </section>

        {study.brandSystem && (
          <section className="container mx-auto px-4 mt-24">
            <BrandSystemSection
              system={study.brandSystem}
              brandName={study.name.split(' — ')[0]}
              outcomePoints={
                [...study.sections].reverse().find(
                  (s): s is Extract<typeof s, { type: 'text' }> => s.type === 'text' && !!s.points,
                )?.points
              }
            />
          </section>
        )}

        <section className="container mx-auto px-4 mt-24">
          <ConsultationCTA />
        </section>

        {/* Footer navigation */}
        <section className="container mx-auto px-4">
          <div className="mt-24 flex flex-col gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-zogago-light/70 transition-colors hover:text-zogago-blue"
            >
              <ArrowLeft size={18} /> Back to Case Studies
            </Link>
            {next && (
              <Link
                to={`/case-studies/${next.slug}`}
                className="inline-flex items-center gap-2 text-zogago-light/70 transition-colors hover:text-zogago-purple"
              >
                Next Project <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
