import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCaseStudy } from '@/data/caseStudies';
import { trackPageView } from '@/utils/analytics';

const SITE_ORIGIN = 'https://zogagovisuals.com';

const ROUTE_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Zogago | Creative & Digital Agency — Web, Design, 3D & AI',
    description:
      'Zogago is a creative and digital agency helping startups and growing businesses with custom websites, Shopify stores, brand identity, photo retouching, 3D visualization, and AI automation.',
  },
  '/services': {
    title: 'Services | Zogago — Creative & Digital Agency',
    description:
      'Explore Zogago services across Digital Products & Web, AI & Automation, and Brand & Visual Craft.',
  },
  '/services/web-development': {
    title: 'Web Design & Development | Zogago',
    description:
      'Custom websites, UI/UX design, and scalable web applications engineered for startups and growing businesses.',
  },
  '/services/ecommerce': {
    title: 'Shopify & E-Commerce Solutions | Zogago',
    description:
      'High-converting online stores and custom Shopify storefronts designed and built for modern commerce.',
  },
  '/services/ai-automation': {
    title: 'AI Agents & Workflow Automation | Zogago',
    description:
      'Custom AI agents, AI-powered customer support, and business workflow automation built around your operations.',
  },
  '/services/graphics-design': {
    title: 'Graphics & Brand Identity Design | Zogago',
    description:
      'Memorable logos, visual identity systems, and brand collateral crafted with precision.',
  },
  '/services/photo-editing': {
    title: 'Commercial Photo Editing & Retouching | Zogago',
    description:
      'High-end product retouching, color grading, and commercial visual post-production.',
  },
  '/services/architecture': {
    title: '3D Architectural Visualization | Zogago',
    description:
      'Photorealistic 3D architectural rendering and spatial visualization for residential and commercial projects.',
  },
  '/case-studies': {
    title: 'Portfolio & Case Studies | Zogago',
    description:
      'Explore selected work across logo & branding, web design & development, Shopify e-commerce, architecture, and creative retouching.',
  },
  '/faq': {
    title: 'FAQ — Onboarding, Pricing, Revisions & Delivery | Zogago',
    description:
      'Find answers on Zogago services, milestone payments, revision rounds, timelines, deliverables, and 100% file ownership.',
  },
  '/reviews': {
    title: 'Client Reviews & Testimonials | Zogago',
    description:
      'Read verified client feedback on our websites, Shopify builds, brand identity systems, 3D renders, and AI workflows.',
  },
  '/about': {
    title: 'About Zogago | Great Ideas Deserve Great Design & Digital Craft',
    description:
      'Learn how Zogago combines creative vision and digital execution to help startups and growing businesses build what is next.',
  },
  '/contact': {
    title: 'Contact Zogago | Start a Project',
    description:
      'Have an idea? Get in touch with Zogago to discuss your website, Shopify store, brand identity, 3D render, or AI automation project.',
  },
  '/thank-you': {
    title: 'Thank You — Inquiry Received | Zogago',
    description:
      'Thank you for contacting Zogago. Our team has received your project brief and will follow up shortly.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Zogago',
    description: 'Privacy Policy and data handling practices for Zogago.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Zogago',
    description: 'Terms and Conditions for using Zogago services and website.',
  },
};

function updateMetaAttribute(selector: string, attribute: string, value: string): void {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute(attribute, value);
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    let seo = ROUTE_SEO[pathname];
    if (!seo && pathname.startsWith('/case-studies/')) {
      const slug = pathname.replace('/case-studies/', '');
      const study = getCaseStudy(slug);
      seo = study
        ? {
            title: `${study.name} | Zogago Case Study`,
            description: study.shortDescription,
          }
        : {
            title: 'Case Study | Zogago Portfolio',
            description:
              'Explore Zogago portfolio case studies across branding, web development, Shopify, architecture, and retouching.',
          };
    }

    if (!seo) {
      seo = {
        title: 'Zogago | Creative & Digital Agency — Web, Design, 3D & AI',
        description:
          'Zogago is a creative and digital agency helping startups and growing businesses with custom websites, Shopify stores, brand identity, photo retouching, 3D visualization, and AI automation.',
      };
    }

    const canonicalUrl = `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname}`;

    document.title = seo.title;
    updateMetaAttribute('meta[name="description"]', 'content', seo.description);
    updateMetaAttribute('link[rel="canonical"]', 'href', canonicalUrl);
    updateMetaAttribute('meta[property="og:title"]', 'content', seo.title);
    updateMetaAttribute('meta[property="og:description"]', 'content', seo.description);
    updateMetaAttribute('meta[property="og:url"]', 'content', canonicalUrl);
    updateMetaAttribute('meta[name="twitter:title"]', 'content', seo.title);
    updateMetaAttribute('meta[name="twitter:description"]', 'content', seo.description);

    trackPageView(pathname);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

