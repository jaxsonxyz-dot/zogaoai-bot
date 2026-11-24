import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CasePlaceholder from './CasePlaceholder';
import { caseServiceToRoute } from '@/data/serviceCaseStudies';
import type { CaseStudySection } from '@/data/caseStudies';

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionHeading: React.FC<{ index?: string; title: string }> = ({ index, title }) => (
  <div className="mb-6">
    {index && (
      <span className="mb-3 block text-xs font-mono uppercase tracking-[0.3em] text-zogago-blue/70">
        {index} — Chapter
      </span>
    )}
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
      {title}
    </h2>
  </div>
);

const Body: React.FC<{ text?: string }> = ({ text }) =>
  text ? <p className="max-w-2xl text-zogago-light/70 leading-relaxed">{text}</p> : null;

interface Props {
  section: CaseStudySection;
  /** Display number such as "01" — omitted for the overview block */
  index?: string;
}

const SectionRenderer: React.FC<Props> = ({ section, index }) => {
  switch (section.type) {
    case 'overview':
      return (
        <Reveal className="flex flex-wrap divide-white/10 overflow-hidden rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md max-md:rounded-2xl md:flex-nowrap md:divide-x">
          {[
            ['Client', section.client],
            ['Service', section.service],
            ['Year', section.year],
            ['Scope', section.projectType],
          ].map(([label, value]) => {
            const serviceRoute =
              label === 'Service' ? caseServiceToRoute[value] : undefined;
            return (
              <div key={label} className={`px-6 py-4 md:px-8 ${label === 'Scope' ? 'w-full md:flex-1' : 'w-1/2 md:w-auto md:shrink-0'}`}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zogago-blue/70">{label}</p>
                {serviceRoute ? (
                  <Link
                    to={serviceRoute}
                    className="mt-1 inline-block text-sm font-medium text-white transition-colors duration-300 hover:text-zogago-blue"
                  >
                    {value}
                  </Link>
                ) : (
                  <p className="mt-1 text-sm font-medium text-white">{value}</p>
                )}
              </div>
            );
          })}
        </Reveal>
      );

    case 'text':
      return (
        <Reveal>
          <SectionHeading index={index} title={section.title} />
          <Body text={section.body} />
          {section.points && (
            <ul className="mt-5 space-y-2">
              {section.points.map((p) => (
                <li key={p} className="flex gap-3 text-zogago-light/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zogago-blue" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      );

    case 'image':
      return (
        <Reveal className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className={section.flip ? 'md:order-2' : ''}>
            <SectionHeading index={index} title={section.title} />
            <Body text={section.body} />
          </div>
          <div className={section.flip ? 'md:order-1' : ''}>
            <CasePlaceholder image={section.image} />
          </div>
        </Reveal>
      );

    case 'imagePair':
      return (
        <Reveal>
          <SectionHeading index={index} title={section.title} />
          <Body text={section.body} />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {section.images.map((image, i) => (
              <CasePlaceholder key={i} image={image} />
            ))}
          </div>
        </Reveal>
      );

    case 'gallery':
      return (
        <Reveal>
          <SectionHeading index={index} title={section.title} />
          <Body text={section.body} />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.images.map((image, i) => (
              <CasePlaceholder key={i} image={image} />
            ))}
          </div>
        </Reveal>
      );

    case 'beforeAfter':
      return (
        <Reveal>
          <SectionHeading index={index} title={section.title} />
          <Body text={section.body} />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[section.before, section.after].map((image, i) => (
              <div key={i}>
                <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-zogago-light/40">
                  {i === 0 ? 'Before' : 'After'}
                </p>
                <CasePlaceholder image={image} />
              </div>
            ))}
          </div>
        </Reveal>
      );

    case 'fullWidthImage':
      return (
        <Reveal>
          <SectionHeading index={index} title={section.title} />
          <Body text={section.body} />
          <div className="mt-8">
            <CasePlaceholder image={section.image} />
          </div>
        </Reveal>
      );

    default:
      return null;
  }
};

export default SectionRenderer;
