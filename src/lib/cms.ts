import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { caseStudies, type CaseStudy, type CaseStudySection, type CaseStudyCategory } from '@/data/caseStudies';

/* ---------------- Services ---------------- */

export interface CmsGalleryItem { src: string; title?: string }
export interface CmsCard { title?: string; description?: string; imageUrl?: string; gallery?: CmsGalleryItem[] }
export interface CmsService {
  page_key: string;
  hero_title: string;
  hero_description: string;
  showcase_title: string;
  showcase_subtitle: string;
  cards: CmsCard[];
}

export const SERVICE_PAGES: { key: string; label: string }[] = [
  { key: 'ai-automation', label: 'AI Agents & Automation' },
  { key: 'photo-editing', label: 'Photo Editing & Retouching' },
  { key: 'web-development', label: 'Web Development' },
  { key: 'ecommerce', label: 'E-commerce / Shopify' },
  { key: 'graphics-design', label: 'Graphics Design' },
  { key: 'architecture', label: 'Architecture' },
];

import { withTimeout } from '@/utils/requestGuard';

export const isSupabaseConfigured = (): boolean => {
  const url = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '').trim();
  return Boolean(
    url &&
      key &&
      (url.startsWith('https://') || url.startsWith('http://')) &&
      url !== 'https://placeholder.supabase.co' &&
      !url.includes('placeholder.supabase.co') &&
      key !== 'placeholder-key' &&
      key !== 'placeholder'
  );
};

/** Returns the admin overrides for the current service page (or undefined). */
export const useServiceOverride = () => {
  const { pathname } = useLocation();
  const key = pathname.startsWith('/services/') ? pathname.split('/')[2] : '';
  const canQuery = Boolean(key) && isSupabaseConfigured();
  const { data } = useQuery({
    queryKey: ['cms_service', key],
    enabled: canQuery,
    staleTime: 60_000,
    retry: 1,
    queryFn: async () => {
      if (!isSupabaseConfigured()) return null;
      const { supabase } = await import('@/integrations/supabase/client');
      const fetchPromise = supabase
        .from('cms_services')
        .select('*')
        .eq('page_key', key)
        .maybeSingle()
        .then(({ data }) => (data as unknown as CmsService) || null)
        .catch(() => null);
      return withTimeout(fetchPromise, 5000, null);
    },
  });
  return data || undefined;
};

/* ---------------- Case studies ---------------- */

type CmsSection = { title: string; body: string; layout: 'side' | 'pair' | 'full'; images: string[] };

export const normalizeCmsCategory = (raw?: string): CaseStudyCategory => {
  if (!raw) return 'Logo & Branding';
  const c = raw.trim();
  if (c === 'Logo & Branding') return 'Logo & Branding';
  if (c === 'Web Design' || c === 'Web Design & Development' || c === 'AI Automation') return 'Web Design';
  if (c === 'Shopify' || c === 'Shopify & E-commerce' || c === 'E-commerce') return 'Shopify';
  if (c === 'Architecture') return 'Architecture';
  if (c === 'Image Editing' || c === 'Creative & Image Editing') return 'Image Editing';
  return 'Logo & Branding';
};

export const CATEGORY_DISPLAY_LABELS: Record<CaseStudyCategory, string> = {
  'Logo & Branding': 'Logo & Branding',
  'Web Design': 'Web Design & Development',
  'Shopify': 'Shopify & E-commerce',
  'Architecture': 'Architecture',
  'Image Editing': 'Creative & Image Editing',
};

const toSection = (s: CmsSection): CaseStudySection => {
  const imgs = (s.images || []).filter(Boolean).map((src, i) => ({ src, label: `${s.title || 'Image'} ${i + 1}` }));
  if (!imgs.length) return { type: 'text', title: s.title, body: s.body };
  if (s.layout === 'pair' && imgs.length >= 2) return { type: 'imagePair', title: s.title, body: s.body, images: [imgs[0], imgs[1]] };
  if (s.layout === 'full') return { type: 'fullWidthImage', title: s.title, body: s.body, image: imgs[0] };
  return { type: 'image', title: s.title, body: s.body, image: imgs[0] };
};

export const mapCmsProject = (p: any): CaseStudy => {
  const category = normalizeCmsCategory(p.category);
  const rawSections: CaseStudySection[] = [];

  if (p.challenge) {
    rawSections.push({ type: 'text', title: 'The Challenge', body: p.challenge });
  }
  if (p.direction) {
    rawSections.push({ type: 'text', title: 'Creative Direction', body: p.direction });
  }

  const mappedChapters = (Array.isArray(p.sections) ? p.sections : []).map(toSection);
  const allSections: CaseStudySection[] = [
    {
      type: 'overview',
      client: p.name?.split(' — ')[0] || p.name || 'Project Overview',
      service: CATEGORY_DISPLAY_LABELS[category] || category,
      projectType: p.category || category,
      year: p.created_at ? String(new Date(p.created_at).getFullYear()) : '2025',
    },
    ...rawSections,
    ...mappedChapters,
  ];

  return {
    slug: p.slug,
    name: p.name,
    category,
    shortDescription: p.summary || '',
    hero: { src: p.cover_url || undefined, label: p.name, alt: p.name },
    sections: allSections,
    brandSystem: Array.isArray(p.colors) && p.colors.length
      ? {
          colors: p.colors.map((c: any) => ({ name: c.name, hex: c.hex, role: '' })),
          typography: [],
        }
      : undefined,
  };
};

const getLocalPublishedCmsProjects = (): CaseStudy[] => {
  try {
    const raw = localStorage.getItem('zogago_cms_projects_local');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((p: any) => p && p.published !== false)
      .map(mapCmsProject);
  } catch {
    return [];
  }
};

export const useAllCaseStudiesQuery = () => {
  const canQuery = isSupabaseConfigured();
  const query = useQuery({
    queryKey: ['cms_projects_public'],
    enabled: canQuery,
    staleTime: 60_000,
    retry: 1,
    queryFn: async () => {
      if (!isSupabaseConfigured()) return [];
      const { supabase } = await import('@/integrations/supabase/client');
      const fetchPromise = Promise.resolve(
        supabase
          .from('cms_projects')
          .select('*')
          .eq('published', true)
          .order('sort_order')
          .order('created_at', { ascending: false })
      )
        .then(({ data, error }) => {
          if (error || !data) return [];
          return data.map(mapCmsProject);
        })
        .catch(() => []);
      return withTimeout(fetchPromise, 5000, []);
    },
  });

  const remoteCms = query.data || [];
  const localCms = getLocalPublishedCmsProjects();
  const remoteSlugs = new Set(remoteCms.map((c) => c.slug));
  const combinedCms = [
    ...remoteCms,
    ...localCms.filter((c) => !remoteSlugs.has(c.slug)),
  ];
  const allCmsSlugs = new Set(combinedCms.map((c) => c.slug));
  const merged = [
    ...combinedCms,
    ...caseStudies.filter((c) => !allCmsSlugs.has(c.slug)),
  ];

  return {
    studies: merged,
    isLoading: canQuery ? query.isLoading && merged.length === 0 : false,
    isError: query.isError,
    refetch: query.refetch,
  };
};

/** Admin-published case studies first, then the built-in ones (admin wins on same slug). */
export const useAllCaseStudies = (): CaseStudy[] => {
  return useAllCaseStudiesQuery().studies;
};

/** Resolve a single case study by slug from merged CMS + static catalog, with adjacent project. */
export const useCaseStudyBySlug = (slug?: string) => {
  const { studies, isLoading, isError } = useAllCaseStudiesQuery();
  const study = slug ? studies.find((c) => c.slug === slug) : undefined;
  const idx = slug ? studies.findIndex((c) => c.slug === slug) : -1;
  const next = idx !== -1 && studies.length > 1 ? studies[(idx + 1) % studies.length] : undefined;

  return {
    study,
    next,
    isLoading,
    isError,
  };
};

