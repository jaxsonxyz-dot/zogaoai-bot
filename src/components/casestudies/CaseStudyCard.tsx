import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CasePlaceholder from './CasePlaceholder';
import type { CaseStudy } from '@/data/caseStudies';
import { CATEGORY_DISPLAY_LABELS } from '@/lib/cms';

const CaseStudyCard: React.FC<{ study: CaseStudy }> = ({ study }) => (
  <Link
    to={`/case-studies/${study.slug}`}
    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-2.5 sm:p-3 transition-all duration-500 active:scale-[0.98] hover:-translate-y-1 hover:border-zogago-blue/40 hover:shadow-[0_0_40px_-12px_rgba(31,182,250,0.45)]"
  >
    <CasePlaceholder image={{ ...study.hero, ratio: 16 / 10 }} zoomOnHover lightbox={false} />

    <div className="flex flex-1 flex-col p-3 sm:p-4">
      <span className="text-[11px] uppercase tracking-[0.22em] text-zogago-blue/80">
        {CATEGORY_DISPLAY_LABELS[study.category] || study.category}
      </span>
      <h3 className="mt-2 line-clamp-2 sm:min-h-[3.5rem] text-lg sm:text-xl font-bold leading-7 text-white transition-colors duration-300 group-hover:text-zogago-blue">
        {study.name}
      </h3>
      <p className="mt-2 line-clamp-3 sm:min-h-[3.75rem] text-sm leading-5 text-zogago-light/60">{study.shortDescription}</p>
      <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-medium text-zogago-light/80 transition-colors duration-300 group-hover:text-zogago-purple">
        View Case Study
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </div>
  </Link>
);

export default CaseStudyCard;
