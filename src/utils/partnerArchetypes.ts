export type PartnerFocusFilter =
  | 'all'
  | 'web-design'
  | 'branding'
  | 'ecommerce'
  | 'automation';

export interface PartnerArchetype {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  spineTag: string;
  stageLabel: string;
  focusStat: string;
  flowStat: string;
  categories: Exclude<PartnerFocusFilter, 'all'>[];
  challenge: string;
  outcome: string;
  text: string;
  deliverables: string[];
  workflowSteps: string[];
  serviceRoute: string;
  serviceLabel: string;
  colSpanClass: string;
  accentGradient: string;
  accentText: string;
  accentBorderHover: string;
  spineSurface: string;
  expandedSurface: string;
  glowRgb: string;
}

export const PARTNER_ARCHETYPES: PartnerArchetype[] = [
  {
    id: 'new-growing-brands',
    index: '01',
    title: 'New & Growing Brands',
    shortTitle: 'Growing Brands',
    spineTag: 'Brand & Web UI',
    stageLabel: 'Branding, Web Design & Launch',
    focusStat: 'Identity & Web UI',
    flowStat: 'Direction → Launch',
    categories: ['branding', 'web-design'],
    challenge:
      'You need a cohesive brand look and a custom website that makes a strong first impression and turns visitors into inquiries.',
    outcome:
      'Launch with a memorable visual identity and a fast, responsive website that builds immediate customer trust.',
    text: 'We design distinctive logos, complete brand identities, and custom websites that position your business professionally from day one.',
    deliverables: [
      'Logo & Brand Style Guide',
      'Custom Responsive Website',
      'Conversion-Ready UI/UX Design',
    ],
    workflowSteps: ['Brand Direction', 'Website Design & Build', 'Polished Launch'],
    serviceRoute: '/services/web-development',
    serviceLabel: 'View Web Design Services',
    colSpanClass: 'lg:col-span-3',
    accentGradient: 'from-rose-500/20 via-red-500/10 to-transparent',
    accentText: 'text-rose-300',
    accentBorderHover: 'hover:border-rose-400/50',
    spineSurface:
      'from-[#9e2636] via-[#7c1b29] to-[#460d16] border-rose-300/25',
    expandedSurface:
      'from-[#6e1926]/95 via-[#4e111b]/95 to-[#2b080e]/98 border-rose-300/30',
    glowRgb: '244, 63, 94',
  },
  {
    id: 'ecommerce-online-stores',
    index: '02',
    title: 'E-Commerce & Online Stores',
    shortTitle: 'Online Stores',
    spineTag: 'Shopify & Sales',
    stageLabel: 'Shopify, Product Visuals & Sales Growth',
    focusStat: 'Shopify & Retouching',
    flowStat: 'Storefront → Sales',
    categories: ['ecommerce', 'branding', 'web-design'],
    challenge:
      'Generic store templates, slow mobile pages, and inconsistent product photos are costing you sales and repeat buyers.',
    outcome:
      'Increase checkout conversions and brand value with a custom online storefront and studio-grade product visuals.',
    text: 'We build high-converting Shopify and e-commerce stores paired with commercial product retouching and smooth checkout experiences.',
    deliverables: [
      'Custom Shopify Storefront',
      'Commercial Product Retouching',
      'Mobile Checkout & Catalog Setup',
    ],
    workflowSteps: ['Storefront Direction', 'Theme & Product Visuals', 'Sales Launch'],
    serviceRoute: '/services/ecommerce',
    serviceLabel: 'View E-Commerce Services',
    colSpanClass: 'lg:col-span-3',
    accentGradient: 'from-zogago-blue/20 via-blue-500/10 to-transparent',
    accentText: 'text-sky-300',
    accentBorderHover: 'hover:border-sky-400/50',
    spineSurface:
      'from-[#235789] via-[#1a4168] to-[#0f253e] border-sky-300/25',
    expandedSurface:
      'from-[#1b436b]/95 via-[#132f4c]/95 to-[#0b1b2e]/98 border-sky-300/30',
    glowRgb: '56, 189, 248',
  },
  {
    id: 'service-local-businesses',
    index: '03',
    title: 'Service & Professional Businesses',
    shortTitle: 'Service Brands',
    spineTag: 'Lead Gen & Web',
    stageLabel: 'Lead Generation, Web Design & Visual Identity',
    focusStat: 'Lead-Focused Web',
    flowStat: 'Plan → Lead Capture',
    categories: ['web-design', 'branding'],
    challenge:
      'Your current website or visual identity feels outdated and fails to communicate your services clearly to prospective clients.',
    outcome:
      'Attract qualified client inquiries with clear service pages, polished brand visuals, and effortless contact flows.',
    text: 'We craft clear, credible service websites and cohesive brand visuals designed to build trust and convert visitors into booked inquiries.',
    deliverables: [
      'Lead-Focused Service Website',
      'Responsive UI & Speed Optimization',
      'Marketing & Campaign Graphics',
    ],
    workflowSteps: ['Messaging & Layout Plan', 'Custom Page Design', 'Lead Capture Setup'],
    serviceRoute: '/services/graphics-design',
    serviceLabel: 'View Branding & Design Services',
    colSpanClass: 'lg:col-span-2',
    accentGradient: 'from-emerald-400/20 via-teal-500/10 to-transparent',
    accentText: 'text-emerald-300',
    accentBorderHover: 'hover:border-emerald-400/50',
    spineSurface:
      'from-[#247a57] via-[#1b5e43] to-[#0e3525] border-emerald-300/30',
    expandedSurface:
      'from-[#1b5e43]/95 via-[#144531]/95 to-[#0b271c]/98 border-emerald-300/35',
    glowRgb: '52, 211, 153',
  },
  {
    id: 'established-companies',
    index: '04',
    title: 'Growing & Established Companies',
    shortTitle: 'Scaling Teams',
    spineTag: 'Redesign & AI',
    stageLabel: 'Website Redesign & Smart Automation',
    focusStat: 'Redesign & AI Agents',
    flowStat: 'Audit → Automation',
    categories: ['web-design', 'automation'],
    challenge:
      'An outdated website and repetitive manual customer inquiries are slowing down your team as your business expands.',
    outcome:
      'Modernize your digital presence while saving hours every week with automated customer support and lead routing.',
    text: 'We refresh legacy websites for better performance and set up practical AI support agents and workflow automations.',
    deliverables: [
      'Complete Website Redesign',
      '24/7 AI Customer Support Agent',
      'CRM & Inquiry Automation',
    ],
    workflowSteps: ['Site & Workflow Audit', 'Redesign & Integration', 'Team Rollout'],
    serviceRoute: '/services/ai-automation',
    serviceLabel: 'View Automation Services',
    colSpanClass: 'lg:col-span-2',
    accentGradient: 'from-amber-400/20 via-orange-500/10 to-transparent',
    accentText: 'text-amber-300',
    accentBorderHover: 'hover:border-amber-400/50',
    spineSurface:
      'from-[#a16627] via-[#7c4d1b] to-[#46290c] border-amber-300/25',
    expandedSurface:
      'from-[#784b1b]/95 via-[#573512]/95 to-[#301c08]/98 border-amber-300/30',
    glowRgb: '251, 191, 36',
  },
  {
    id: 'real-estate-visual-brands',
    index: '05',
    title: 'Real Estate & Architecture Brands',
    shortTitle: 'Real Estate & 3D',
    spineTag: '3D & Retouching',
    stageLabel: '3D Visualization, Retouching & Creative Assets',
    focusStat: '3D & Photo Studio',
    flowStat: 'Concept → 3D Render',
    categories: ['branding'],
    challenge:
      'You need photorealistic 3D renders, architectural visuals, or campaign imagery that presents your spaces and products at their best.',
    outcome:
      'Win client approvals and buyer interest faster with lifelike 3D visualizations and polished commercial imagery.',
    text: 'We produce interior and exterior 3D architectural renders, high-end photo retouching, and visual campaign materials.',
    deliverables: [
      '3D Interior & Exterior Renders',
      'Commercial Photo Retouching',
      'Presentation & Campaign Visuals',
    ],
    workflowSteps: ['Concept & Lighting', '3D Render & Retouching', 'High-Res Delivery'],
    serviceRoute: '/services/architecture',
    serviceLabel: 'View 3D & Visual Services',
    colSpanClass: 'lg:col-span-2',
    accentGradient: 'from-zogago-purple/20 via-purple-500/10 to-transparent',
    accentText: 'text-purple-300',
    accentBorderHover: 'hover:border-purple-400/50',
    spineSurface:
      'from-[#5e318c] via-[#47236b] to-[#27113d] border-purple-300/25',
    expandedSurface:
      'from-[#49246e]/95 via-[#351952]/95 to-[#1d0c2e]/98 border-purple-300/30',
    glowRgb: '168, 85, 247',
  },
];

export function isArchetypeHighlighted(
  archetype: PartnerArchetype,
  activeFilter: PartnerFocusFilter
): boolean {
  if (activeFilter === 'all') return true;
  return archetype.categories.includes(activeFilter);
}

export function getMatchingArchetypeCount(activeFilter: PartnerFocusFilter): number {
  return PARTNER_ARCHETYPES.filter((item) =>
    isArchetypeHighlighted(item, activeFilter)
  ).length;
}

export function getArchetypeById(id: string): PartnerArchetype | undefined {
  return PARTNER_ARCHETYPES.find((item) => item.id === id);
}
