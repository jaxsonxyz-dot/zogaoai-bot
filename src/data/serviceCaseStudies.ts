/**
 * Maps services to case studies so the two portfolio surfaces cross-link:
 * service pages show "Related Case Studies", and case study overview rows
 * link back to the matching service page.
 */
import { caseStudies, type CaseStudy, type CaseStudyCategory } from './caseStudies';

/** Service page slug -> case study categories that count as proof of that service. */
const serviceToCategories: Record<string, CaseStudyCategory[]> = {
  'graphics-design': ['Logo & Branding', 'Image Editing'],
  'web-development': ['Web Design'],
  'ecommerce': ['Shopify'],
  'architecture': ['Architecture'],
  'photo-editing': ['Image Editing'],
};

/** pageTitle used by the service pages -> service slug. */
const pageTitleToSlug: Record<string, string> = {
  'Graphics Design': 'graphics-design',
  'Web Design & Development': 'web-development',
  'Photo Editing & Retouching': 'photo-editing',
  'AI Agents & Automation': 'ai-automation',
  'E-commerce Store Design': 'ecommerce',
  'Architecture': 'architecture',
};

/** Case study overview "Service" label -> service page route. */
export const caseServiceToRoute: Record<string, string> = {
  'Logo & Branding': '/services/graphics-design',
  'Web Design & Development': '/services/web-development',
  'Architecture & Visualization': '/services/architecture',
  'Image Editing & Retouching': '/services/photo-editing',
  'Shopify Store Design': '/services/ecommerce',
};

/** Round-robin across category groups so multi-category services stay varied. */
const interleave = (limit: number, groups: CaseStudy[][]): CaseStudy[] => {
  const picked: CaseStudy[] = [];
  for (let i = 0; picked.length < limit; i++) {
    let added = false;
    for (const group of groups) {
      if (i < group.length && picked.length < limit) {
        picked.push(group[i]);
        added = true;
      }
    }
    if (!added) break;
  }
  return picked;
};

/** Whether the service has case-study categories matched directly. */
export const serviceHasCaseStudyMatch = (serviceSlug?: string): boolean =>
  Boolean(serviceSlug && serviceToCategories[serviceSlug]);

export const getRelatedCaseStudies = (
  serviceSlug?: string,
  limit = 2,
  sourceStudies: CaseStudy[] = caseStudies,
): CaseStudy[] => {
  const categories = serviceSlug ? serviceToCategories[serviceSlug] : undefined;
  if (!categories) {
    // No matching category: show nothing rather than unrelated work.
    return [];
  }
  const groups = categories.map((cat) => sourceStudies.filter((c) => c.category === cat));
  return interleave(limit, groups);
};

export const resolveServiceSlug = (
  serviceSlug?: string,
  pageTitle?: string,
): string | undefined => serviceSlug ?? (pageTitle ? pageTitleToSlug[pageTitle] : undefined);
