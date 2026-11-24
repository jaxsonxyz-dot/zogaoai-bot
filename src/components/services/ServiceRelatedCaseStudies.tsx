import React from 'react';
import { motion } from 'framer-motion';
import CaseStudyCard from '@/components/casestudies/CaseStudyCard';
import { getRelatedCaseStudies, resolveServiceSlug, serviceHasCaseStudyMatch } from '@/data/serviceCaseStudies';
import { useAllCaseStudies } from '@/lib/cms';

interface Props {
  /** Explicit service slug; when omitted it is resolved from pageTitle. */
  serviceSlug?: string;
  pageTitle?: string;
}

const ServiceRelatedCaseStudies: React.FC<Props> = ({ serviceSlug, pageTitle }) => {
  const allStudies = useAllCaseStudies();
  const slug = resolveServiceSlug(serviceSlug, pageTitle);
  const studies = getRelatedCaseStudies(slug, 2, allStudies);

  if (studies.length === 0) return null;

  const matched = serviceHasCaseStudyMatch(slug);
  const heading = matched ? 'Related Case Studies' : 'Selected Work';
  const sub = matched
    ? 'Selected work exploring our approach across design, technology and digital disciplines.'
    : 'A few recent projects across our disciplines — explore the full stories.';

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zogago-purple mb-4">
            Proof Of Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zogago-blue to-zogago-purple">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-zogago-light/70 max-w-2xl mx-auto">{sub}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {studies.map((study, index) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CaseStudyCard study={study} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceRelatedCaseStudies;
