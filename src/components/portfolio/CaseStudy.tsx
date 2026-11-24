import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, MonitorSmartphone, MousePointerClick, SearchCheck, ArrowUpRight } from 'lucide-react';
import './CaseStudy.css';

export interface CaseStudyScreen {
  tag: string;
  title: string;
  description: string;
  image: string;
}

export interface CaseStudyData {
  projectName: string;
  summary: string;
  heroImage: string;
  client: string;
  industry: string;
  timeline: string;
  services: string;
  challenge: string;
  solution: string;
  screens: CaseStudyScreen[];
  backLink?: string;
  backLabel?: string;
  /** Optional per-project theme overrides (CSS custom properties) */
  theme?: React.CSSProperties;
}

const defaultFeatures = [
  { icon: <Zap size={24} />, title: 'Fast Page Speeds', text: 'Optimized assets and code for sub-second loads.' },
  { icon: <MonitorSmartphone size={24} />, title: 'Fully Responsive', text: 'Flawless on desktop, tablet, and mobile.' },
  { icon: <MousePointerClick size={24} />, title: 'Interactive UI/UX', text: 'Micro-interactions that guide and delight users.' },
  { icon: <SearchCheck size={24} />, title: 'SEO & Accessibility', text: 'Semantic markup built to rank and include everyone.' },
];

const CaseStudy: React.FC<{ data: CaseStudyData }> = ({ data }) => {
  return (
    <div className="cs-container" style={data.theme}>
      {/* A. Hero */}
      <section className="cs-hero cs-inner">
        <div>
          <Link to={data.backLink ?? '/#portfolio'} className="cs-breadcrumb">
            <ArrowLeft size={16} /> {data.backLabel ?? 'Back to Portfolio'}
          </Link>
          <h1 className="cs-hero-title">{data.projectName}</h1>
          <p className="cs-hero-summary">{data.summary}</p>
        </div>
        <div className="cs-device-frame">
          <div className="cs-device-bar">
            <span className="cs-device-dot" />
            <span className="cs-device-dot" />
            <span className="cs-device-dot" />
          </div>
          <div className="cs-device-screen">
            <img src={data.heroImage} alt={`${data.projectName} homepage`} />
          </div>
        </div>
      </section>

      <div className="cs-inner">
        {/* B. Metadata */}
        <div className="cs-meta">
          <div className="cs-meta-item">
            <p className="cs-meta-label">Client</p>
            <p className="cs-meta-value">{data.client}</p>
          </div>
          <div className="cs-meta-item">
            <p className="cs-meta-label">Industry</p>
            <p className="cs-meta-value">{data.industry}</p>
          </div>
          <div className="cs-meta-item">
            <p className="cs-meta-label">Timeline</p>
            <p className="cs-meta-value">{data.timeline}</p>
          </div>
          <div className="cs-meta-item">
            <p className="cs-meta-label">Services</p>
            <p className="cs-meta-value">{data.services}</p>
          </div>
        </div>

        {/* B. Challenge & Solution */}
        <div className="cs-about-grid">
          <article className="cs-about-card">
            <h3>The Challenge</h3>
            <p>{data.challenge}</p>
          </article>
          <article className="cs-about-card">
            <h3>The Solution</h3>
            <p>{data.solution}</p>
          </article>
        </div>
      </div>

      {/* C. Alternating screen showcase */}
      {data.screens.map((screen, i) => (
        <section key={i} className="cs-screen-wrap">
          <div className={`cs-screen cs-inner ${i % 2 === 1 ? 'cs-screen--flip' : ''}`}>
            <div className="cs-screen-text">
              <span className="cs-screen-tag">{screen.tag}</span>
              <h3>{screen.title}</h3>
              <p>{screen.description}</p>
            </div>
            <div className="cs-screen-media">
              <div className="cs-screen-frame">
                <img src={screen.image} alt={screen.title} loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* D. Features */}
      <section className="cs-features cs-inner">
        <div className="cs-features-grid">
          {defaultFeatures.map((f, i) => (
            <div key={i} className="cs-feature">
              <span className="cs-feature-icon">{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* E. CTA */}
      <section className="cs-cta">
        <h2>Want a similar website for your business?</h2>
        <p>Let's turn your vision into a high-performing digital experience.</p>
        <Link to="/contact" className="cs-cta-btn">
          Let's Talk <ArrowUpRight size={18} />
        </Link>
      </section>
    </div>
  );
};

export default CaseStudy;
