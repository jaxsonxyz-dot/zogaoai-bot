/**
 * Single source of truth for all case studies.
 * Replace placeholder copy and add `src` values to image blocks when real
 * content is ready — no component changes are required.
 */

import gymCover from '@/assets/casestudies/gym-cover.png.asset.json';
import gymSignage from '@/assets/casestudies/gym-gym_wall.jpg.asset.json';
import gymInterior from '@/assets/casestudies/gym-intereor.jpg.asset.json';
import gymCard from '@/assets/casestudies/gym-card_gym.jpg.asset.json';
import gymBottle from '@/assets/casestudies/gym-bottle_gym.jpg.asset.json';
import gymBag from '@/assets/casestudies/gym-bag_gym.jpg.asset.json';
import gymLogo from '@/assets/logos/logo-3d-gym.png.asset.json';
import popCover from '@/assets/casestudies/pop-culture-cover.png.asset.json';
import popStudio from '@/assets/casestudies/pop-culture-studio.png.asset.json';
import popHoodie from '@/assets/casestudies/pop-culture-hoodie.png.asset.json';
import popEmblem from '@/assets/casestudies/pop-culture-emblem.png.asset.json';
import popMug from '@/assets/casestudies/pop-culture-mug.png.asset.json';
import popStationery from '@/assets/casestudies/pop-culture-stationery.png.asset.json';
import popPoster from '@/assets/casestudies/pop-culture-poster.webp.asset.json';
import beautyStorefront from '@/assets/casestudies/beauty-storefront.png.asset.json';
import beautyEmblem from '@/assets/casestudies/beauty-emblem.png.asset.json';
import beautyBag from '@/assets/casestudies/beauty-bag.png.asset.json';
import beautyVanity from '@/assets/casestudies/beauty-vanity.png.asset.json';
import beautyCard from '@/assets/casestudies/beauty-card.png.asset.json';
import beautyCream from '@/assets/casestudies/beauty-cream.png.asset.json';
import beautyCampaign from '@/assets/casestudies/beauty-campaign.png.asset.json';
import mrvCover from '@/assets/casestudies/mrv-cover.png.asset.json';
import mrvHeadset from '@/assets/casestudies/mrv-headset.png.asset.json';
import mrvRig from '@/assets/casestudies/mrv-rig.png.asset.json';
import mrvHoodie from '@/assets/casestudies/mrv-hoodie.png.asset.json';
import mrvDeskmat from '@/assets/casestudies/mrv-deskmat.png.asset.json';
import mrvTumbler from '@/assets/casestudies/mrv-tumbler.png.asset.json';
import acCover from '@/assets/casestudies/ac-cover.png.asset.json';
import acBadge from '@/assets/casestudies/ac-badge.png.asset.json';
import acSuite from '@/assets/casestudies/ac-suite.png.asset.json';
import acSign from '@/assets/casestudies/ac-sign.jpg.asset.json';
import acCard from '@/assets/casestudies/ac-card.png.asset.json';
import acSkincare from '@/assets/casestudies/ac-skincare.png.asset.json';
import hdCover from '@/assets/casestudies/hd-cover.png.asset.json';
import hdCard from '@/assets/casestudies/hd-card.png.asset.json';
import hdGift from '@/assets/casestudies/hd-gift.png.asset.json';
import hdLounge from '@/assets/casestudies/hd-lounge.png.asset.json';
import hdBedroom from '@/assets/casestudies/hd-bedroom.png.asset.json';
import hdStationery from '@/assets/casestudies/hd-stationery.png.asset.json';
import hdStorefront from '@/assets/casestudies/hd-storefront.png.asset.json';
import gfCover from '@/assets/casestudies/gf-cover.png.asset.json';
import gfStorefront from '@/assets/casestudies/gf-storefront.png.asset.json';
import gfTable from '@/assets/casestudies/gf-table.png.asset.json';
import gfJacket from '@/assets/casestudies/gf-jacket.png.asset.json';
import gfTakeaway from '@/assets/casestudies/gf-takeaway.png.asset.json';
import pnCover from '@/assets/casestudies/pn-cover.png.asset.json';
import pnSerum from '@/assets/casestudies/pn-serum.png.asset.json';
import pnBag from '@/assets/casestudies/pn-bag.png.asset.json';
import pnCarton from '@/assets/casestudies/pn-carton.png.asset.json';
import pnBox from '@/assets/casestudies/pn-box.png.asset.json';
import pnCandle from '@/assets/casestudies/pn-candle.png.asset.json';
import cyCover from '@/assets/casestudies/cy-cover.png.asset.json';
import cyCloth from '@/assets/casestudies/cy-cloth.png.asset.json';
import cyWeb from '@/assets/casestudies/cy-web.png.asset.json';
import cyBox from '@/assets/casestudies/cy-box.png.asset.json';
import cyCards from '@/assets/casestudies/cy-cards.png.asset.json';
import cyHoodie from '@/assets/casestudies/cy-hoodie.png.asset.json';
import cySign from '@/assets/casestudies/cy-sign.png.asset.json';
import ldCover from '@/assets/casestudies/ld-cover.png.asset.json';
import ldLabel from '@/assets/casestudies/ld-label.png.asset.json';
import ldBag from '@/assets/casestudies/ld-bag.png.asset.json';
import ldHoodie from '@/assets/casestudies/ld-hoodie.png.asset.json';
import ldMug from '@/assets/casestudies/ld-mug.png.asset.json';
import ldPhone from '@/assets/casestudies/ld-phone.png.asset.json';
import ldContact from '@/assets/casestudies/ld-contact.png.asset.json';




export type CaseStudyCategory =
  | 'Logo & Branding'
  | 'Web Design'
  | 'Architecture'
  | 'Image Editing'
  | 'Shopify';

export const caseStudyCategories: CaseStudyCategory[] = [
  'Logo & Branding',
  'Web Design',
  'Architecture',
  'Image Editing',
  'Shopify',
];

export interface CaseImage {
  /** Real image URL. When omitted a neutral placeholder surface is rendered. */
  src?: string;
  label: string;
  alt?: string;
  /** width / height, e.g. 16/9. Defaults per block type. */
  ratio?: number;
  /** Keep the leading side of a wide cover visible in cropped card previews. */
  focus?: 'left';
}

export interface OverviewSection {
  type: 'overview';
  client: string;
  service: string;
  projectType: string;
  year: string;
}

export interface TextSection {
  type: 'text';
  title: string;
  body: string;
  /** Optional bullet list under the body */
  points?: string[];
}

export interface ImageSection {
  type: 'image';
  title: string;
  body: string;
  image: CaseImage;
  /** Places the image on the left instead of the right */
  flip?: boolean;
}

export interface ImagePairSection {
  type: 'imagePair';
  title: string;
  body?: string;
  images: [CaseImage, CaseImage];
}

export interface GallerySection {
  type: 'gallery';
  title: string;
  body?: string;
  images: CaseImage[];
}

export interface BeforeAfterSection {
  type: 'beforeAfter';
  title: string;
  body?: string;
  before: CaseImage;
  after: CaseImage;
}

export interface FullWidthImageSection {
  type: 'fullWidthImage';
  title: string;
  body?: string;
  image: CaseImage;
}

export type CaseStudySection =
  | OverviewSection
  | TextSection
  | ImageSection
  | ImagePairSection
  | GallerySection
  | BeforeAfterSection
  | FullWidthImageSection;

export interface CaseStudy {
  slug: string;
  name: string;
  category: CaseStudyCategory;
  shortDescription: string;
  hero: CaseImage;
  sections: CaseStudySection[];
  brandSystem?: BrandSystem;
}

export interface BrandSystem {
  colors: { name: string; hex: string; role: string }[];
  typography: { role: string; font: string; usage: string }[];
  deliverables?: string[];
}

/* ------------------------------------------------------------------ */
/* Shared placeholder copy                                            */
/* ------------------------------------------------------------------ */

const LOREM =
  'Placeholder description. Replace this with the real project story when the final content is ready.';

const overview = (service: string): OverviewSection => ({
  type: 'overview',
  client: 'Client Name',
  service,
  projectType: 'Project Type',
  year: 'Year',
});

const img = (label: string, ratio?: number): CaseImage => ({ label, ratio });

/* ------------------------------------------------------------------ */
/* Category specific section sets                                      */
/* ------------------------------------------------------------------ */

const logoSections = (n: string): CaseStudySection[] => [
  overview('Logo & Branding'),
  { type: 'text', title: 'The Challenge', body: LOREM },
  {
    type: 'image',
    title: 'Creative Direction',
    body: LOREM,
    image: img(`Logo ${n} — Direction`, 4 / 3),
  },
  {
    type: 'gallery',
    title: 'Logo Concepts',
    body: LOREM,
    images: [img('Concept A', 1), img('Concept B', 1), img('Concept C', 1)],
  },
  {
    type: 'imagePair',
    title: 'Variations',
    body: LOREM,
    images: [img('Horizontal Lockup', 4 / 3), img('Monogram', 4 / 3)],
  },
  {
    type: 'fullWidthImage',
    title: 'Color Palette',
    body: LOREM,
    image: img('Palette & Typography', 21 / 9),
  },
  {
    type: 'gallery',
    title: 'Mockups',
    images: [img('Stationery', 4 / 3), img('Signage', 4 / 3), img('Packaging', 4 / 3)],
  },
  { type: 'text', title: 'Outcome', body: LOREM },
];

const webSections = (n: string): CaseStudySection[] => [
  overview('Web Design & Development'),
  { type: 'text', title: 'The Challenge', body: LOREM },
  {
    type: 'image',
    title: 'Creative Direction',
    body: LOREM,
    image: img(`Web ${n} — Style Frame`, 16 / 9),
  },
  {
    type: 'fullWidthImage',
    title: 'Homepage',
    body: LOREM,
    image: img('Homepage Design', 16 / 9),
  },
  {
    type: 'imagePair',
    title: 'UI Components',
    body: LOREM,
    images: [img('Component Set', 4 / 3), img('Interaction States', 4 / 3)],
  },
  {
    type: 'gallery',
    title: 'Responsive Layouts',
    images: [img('Desktop', 4 / 3), img('Tablet', 4 / 3), img('Mobile', 4 / 3)],
  },
  {
    type: 'fullWidthImage',
    title: 'Final Website',
    body: LOREM,
    image: img('Final Build', 16 / 9),
  },
  { type: 'text', title: 'Outcome', body: LOREM },
];

const architectureSections = (n: string): CaseStudySection[] => [
  overview('Architecture & Visualization'),
  { type: 'text', title: 'The Brief', body: LOREM },
  {
    type: 'image',
    title: 'Concept & Massing',
    body: LOREM,
    image: img(`Architecture ${n} — Concept`, 4 / 3),
  },
  {
    type: 'imagePair',
    title: 'Plans & Elevations',
    body: LOREM,
    images: [img('Floor Plan', 4 / 3), img('Elevation', 4 / 3)],
  },
  {
    type: 'fullWidthImage',
    title: 'Exterior Render',
    body: LOREM,
    image: img('Exterior Visualization', 21 / 9),
  },
  {
    type: 'gallery',
    title: 'Interior Views',
    images: [img('Living Space', 4 / 3), img('Detail View', 4 / 3), img('Night Shot', 4 / 3)],
  },
  { type: 'text', title: 'Outcome', body: LOREM },
];

const imageEditingSections = (n: string): CaseStudySection[] => [
  overview('Image Editing & Retouching'),
  { type: 'text', title: 'The Challenge', body: LOREM },
  {
    type: 'beforeAfter',
    title: 'Before & After',
    body: LOREM,
    before: img('Before', 4 / 3),
    after: img('After', 4 / 3),
  },
  {
    type: 'image',
    title: 'Retouching Process',
    body: LOREM,
    flip: true,
    image: img(`Edit ${n} — Process`, 4 / 3),
  },
  {
    type: 'gallery',
    title: 'Final Set',
    images: [img('Frame 01', 1), img('Frame 02', 1), img('Frame 03', 1)],
  },
  { type: 'text', title: 'Outcome', body: LOREM },
];

const shopifySections = (n: string): CaseStudySection[] => [
  overview('Shopify Store Design'),
  { type: 'text', title: 'The Challenge', body: LOREM },
  {
    type: 'image',
    title: 'Store Direction',
    body: LOREM,
    image: img(`Shopify ${n} — Direction`, 16 / 9),
  },
  {
    type: 'fullWidthImage',
    title: 'Storefront',
    body: LOREM,
    image: img('Storefront Design', 16 / 9),
  },
  {
    type: 'imagePair',
    title: 'Product & Cart',
    body: LOREM,
    images: [img('Product Page', 4 / 3), img('Cart & Checkout', 4 / 3)],
  },
  {
    type: 'gallery',
    title: 'Showcase',
    images: [img('Collection', 4 / 3), img('Mobile Store', 4 / 3), img('Campaign', 4 / 3)],
  },
  { type: 'text', title: 'Outcome', body: LOREM },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

const build = (
  prefix: string,
  label: string,
  category: CaseStudyCategory,
  count: number,
  sections: (n: string) => CaseStudySection[],
  heroRatio: number,
  /** Optional real hero image override for a specific project */
  heroImage?: CaseImage,
): CaseStudy[] =>
  Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      slug: `${prefix}-project-${n}`,
      name: `${label} Project ${n}`,
      category,
      shortDescription: 'Short placeholder line describing this project.',
      hero: heroImage && i === 0 ? heroImage : img(`${label} Project ${n}`, heroRatio),
      sections: sections(n),
    };
  });

/* ------------------------------------------------------------------ */
/* Featured project: 3D Gym                                            */
/* ------------------------------------------------------------------ */

const gymStudy: CaseStudy = {
  slug: 'logo-project-01',
  name: '3D Gym — Fitness & Wellness',
  category: 'Logo & Branding',
  shortDescription:
    'A bold, metal-forged identity for a performance gym — from emblem to signage, print and merchandise.',
  hero: {
    src: gymCover.url,
    label: '3D Gym — Build A Stronger You',
    alt: '3D Gym brand banner with the tagline Build A Stronger You',
    ratio: 1079 / 336,
  },
  sections: [
    {
      type: 'overview',
      client: 'Concept Project — 3D Gym',
      service: 'Logo & Branding',
      projectType: 'Brand Identity & Environmental Branding',
      year: '2025',
    },
    {
      type: 'text',
      title: 'The Challenge',
      body:
        '3D Gym was opening a premium strength-training facility in a market crowded with look-alike fitness logos — thin lettering, generic dumbbell icons, no presence on a wall. They needed an identity that felt as heavy and engineered as the equipment inside, and that would still read clearly on a bottle, a business card and a backlit reception wall.',
      points: [
        'Stand apart from flat, interchangeable gym logos',
        'Hold up at every size, from a 12mm badge to a 3-metre wall',
        'Carry one look across the building, print and merchandise',
      ],
    },
    {
      type: 'image',
      title: 'The Emblem',
      body:
        'We built a dimensional shield: a chiselled athlete mid-lift, a loaded barbell as the base line, and brushed-steel bevels lit from above. The "3D" sits in a hot crimson that becomes the brand\'s single accent colour, with carbon black and steel grey carrying everything else.',
      image: {
        src: gymLogo.url,
        label: '3D Gym — Primary Emblem',
        alt: '3D Gym metallic shield emblem with athlete and barbell',
        ratio: 1,
      },
    },
    {
      type: 'imagePair',
      title: 'Presence In The Space',
      body:
        'The emblem was translated into a dimensional reception piece on honed black stone, with a crimson light line cut into the desk. Inside the training floor, the same voice continues as typographic wall art, so the brand keeps talking to members while they train.',
      images: [
        {
          src: gymSignage.url,
          label: 'Reception Signage',
          alt: '3D Gym dimensional logo on a black stone reception wall',
          ratio: 583 / 237,
        },
        {
          src: gymInterior.url,
          label: 'Interior Branding',
          alt: 'No Pain No Gain wall mural on the 3D Gym training floor',
          ratio: 500 / 184,
        },
      ],
    },
    {
      type: 'fullWidthImage',
      title: 'Print & Touchpoints',
      body:
        'Soft-touch black cards with a raised metallic emblem on the front, and the three brand pillars — Stronger Bodies, Healthier Minds, Better Lives — on the back. It turns a handover into a statement of what the gym is for.',
      image: {
        src: gymCard.url,
        label: 'Business Cards',
        alt: '3D Gym black business cards with metallic emblem and brand pillars',
        ratio: 581 / 187,
      },
    },
    {
      type: 'imagePair',
      title: 'Merchandise Members Carry',
      body:
        'Matte black gear built for daily use: an insulated bottle with a crimson collar and an embroidered duffle with crimson zip pulls. Every piece leaves the building and keeps advertising the gym.',
      images: [
        {
          src: gymBottle.url,
          label: 'Insulated Bottle',
          alt: '3D Gym matte black insulated water bottle with crimson accent',
          ratio: 344 / 236,
        },
        {
          src: gymBag.url,
          label: 'Gear Duffle',
          alt: '3D Gym black duffle bag with embroidered emblem and red zips',
          ratio: 367 / 237,
        },
      ],
    },
    {
      type: 'text',
      title: 'Final Design Direction',
      body:
        '3D Gym launched with one consistent look across the building, its print and its merchandise — an identity that reads as serious strength training at a glance. The dimensional emblem became the signature element members photograph and share, turning the reception wall into free marketing.',
      points: [
        'One identity system covering signage, print and merchandise',
        'A signature emblem members photograph and post',
        'Assets ready for apparel, social and paid campaigns',
      ],
    },
  ],
};

const popCultureStudy: CaseStudy = {
  slug: 'logo-project-03',
  name: 'Pop Culture — Creative Studio',
  category: 'Logo & Branding',
  shortDescription: 'An interlocking PC monogram carried from brand palette to studio signage, stationery, and everyday objects.',
  hero: {
    src: popCover.url,
    label: 'Pop Culture — brand identity',
    alt: 'Pop Culture gold monogram on a studio wall alongside its color palette and typography',
    ratio: 1974 / 797,
    focus: 'left',
  },
  sections: [
    {
      type: 'overview',
      client: 'Concept Project — Pop Culture Creative Studio',
      service: 'Logo & Branding',
      projectType: 'Visual Identity Concept',
      year: '—',
    },
    {
      type: 'text',
      title: 'The Identity',
      body: 'The identity centers on an interlocking PC monogram, paired with the full Pop Culture name and Creative Studio descriptor. The mark can stand alone on smaller surfaces while the full lockup gives the studio a clear introduction in larger spaces.',
    },
    {
      type: 'image',
      title: 'The Monogram',
      body: 'A close view of the overlapping letters shows how the mark holds together as a single symbol. Warm metallic gold against a dark textured surface gives this presentation depth; a flat, single-color version would be the next step for production use.',
      image: {
        src: popEmblem.url,
        label: 'PC monogram',
        alt: 'Close-up of the gold Pop Culture PC monogram and studio wordmark on dark material',
        ratio: 1620 / 971,
      },
    },
    {
      type: 'fullWidthImage',
      title: 'A Place For The Brand',
      body: 'The storefront concept scales the monogram into a sign above the studio entrance. The same gold-and-charcoal language continues across the exterior and the interior view.',
      image: {
        src: popStudio.url,
        label: 'Studio exterior',
        alt: 'Pop Culture Creative Studio storefront concept with gold signage on a dark facade',
        ratio: 1535 / 1024,
      },
    },
    {
      type: 'imagePair',
      title: 'Desk & Daily Use',
      body: 'The compact mark carries through on a notebook, phone case and black mug, demonstrating how the identity reads at a smaller scale.',
      images: [
        {
          src: popStationery.url,
          label: 'Studio stationery',
          alt: 'Black notebook, phone case and pen with Pop Culture gold monogram',
          ratio: 1446 / 1087,
        },
        {
          src: popMug.url,
          label: 'Studio mug',
          alt: 'Black coffee mug with gold Pop Culture Creative Studio mark',
          ratio: 1316 / 1195,
        },
      ],
    },
    {
      type: 'imagePair',
      title: 'Beyond The Studio',
      body: 'A hoodie and framed print extend the same visual language into apparel and the studio environment. The line “Ideas Shape Culture” on the hoodie and “Great Ideas Build Culture” on the print are shown as separate message explorations.',
      images: [
        {
          src: popHoodie.url,
          label: 'Studio apparel',
          alt: 'Black Pop Culture hoodie with gold monogram and Ideas Shape Culture sleeve text',
          ratio: 1080 / 1010,
        },
        {
          src: popPoster.url,
          label: 'Framed studio print',
          alt: 'Framed Great Ideas Build Culture print with Pop Culture monogram',
          ratio: 1348 / 1167,
        },
      ],
    },
    {
      type: 'text',
      title: 'The System',
      body: 'The concept pairs gold, warm neutrals and charcoal with a display serif for headlines and a clean sans-serif for supporting text. Together, the applications show a recognizable direction from architecture to small-format objects.',
    },
  ],
};

const beautyStudy: CaseStudy = {
  slug: 'logo-project-02',
  name: 'B Beauty Cosmetics — Luxury Beauty',
  category: 'Logo & Branding',
  shortDescription:
    'A crowned monogram crest for a luxury cosmetics house — carried from boutique signage to packaging, print and vanity tools.',
  hero: {
    src: beautyCampaign.url,
    label: 'B Beauty Cosmetics — Campaign Key Visual',
    alt: 'B Beauty Cosmetics campaign banner with model and products on marble',
    ratio: 1672 / 940,
  },
  sections: [
    {
      type: 'overview',
      client: 'Concept Project — B Beauty Cosmetics',
      service: 'Logo & Branding',
      projectType: 'Brand Identity, Packaging & Retail',
      year: '2025',
    },
    {
      type: 'text',
      title: 'The Challenge',
      body:
        'B Beauty Cosmetics was launching a premium skincare and colour line into a category where almost every competitor looks the same: thin sans-serif wordmarks on white. The brand needed a mark that felt collectible and worth displaying on a vanity, while still stamping cleanly in a single colour on small bottles, leather and a shopping bag.',
      points: [
        'Read as luxury without relying on gloss or gradients',
        'Stamp cleanly in one colour of foil at very small sizes',
        'Hold one look across retail, packaging and print',
      ],
    },
    {
      type: 'image',
      title: 'The Crest',
      body:
        'The mark is a crowned circular crest built around a serif “B”, with a profile silhouette and fine cosmetic detailing inside the ring. It is designed as a single-colour stamp first, so the same artwork works as silver foil on black, gold on cream, or debossed into leather.',
      image: {
        src: beautyEmblem.url,
        label: 'Crest — Leather Deboss',
        alt: 'Silver B Beauty Cosmetics crest debossed into textured black leather',
        ratio: 1536 / 1024,
      },
    },
    {
      type: 'imagePair',
      title: 'Retail & Vanity Touchpoints',
      body:
        'A matte black bag with silver foil and blush tissue turns the purchase into an unboxing moment. On the vanity, the same crest carries onto the pebbled leather brush cup and the blush skincare bottle — one mark, different materials.',
      images: [
        {
          src: beautyBag.url,
          label: 'Boutique Shopping Bag',
          alt: 'Matte black B Beauty shopping bag with silver foil crest and blush tissue',
          ratio: 1521 / 1034,
        },
        {
          src: beautyVanity.url,
          label: 'Vanity & Tools',
          alt: 'Leather brush cup with rose gold brushes and blush skincare bottle',
          ratio: 1536 / 1024,
        },
      ],
    },
    {
      type: 'fullWidthImage',
      title: 'Print & Stationery',
      body:
        'Soft-touch black cards with a debossed silver crest, paired with a warm cream contact card. The two-stock pairing keeps the brand feeling considered rather than loud.',
      image: {
        src: beautyCard.url,
        label: 'Business Cards',
        alt: 'Black B Beauty business card with silver foil crest beside a cream contact card',
        ratio: 1672 / 941,
      },
    },
    {
      type: 'image',
      title: 'Product Packaging',
      body:
        'The skincare range uses an obsidian jar with a polished silver rim, letting the crest sit as the single point of detail. Weight and finish do the luxury work; the label stays quiet.',
      flip: true,
      image: {
        src: beautyCream.url,
        label: 'Rejuvenating Face Cream — 50g',
        alt: 'Black B Beauty face cream jar with silver rim and crest',
        ratio: 1,
      },
    },
    {
      type: 'fullWidthImage',
      title: 'Flagship Boutique',
      body:
        'At the boutique, the crest becomes illuminated signage above the entrance — the same one-colour mark, now glowing at street scale and anchoring the brand in the real world.',
      image: {
        src: beautyStorefront.url,
        label: 'Flagship Boutique',
        alt: 'B Beauty Cosmetics boutique at night with illuminated crest signage',
        ratio: 1672 / 941,
      },
    },
    {
      type: 'text',
      title: 'Final Design Direction',
      body:
        'B Beauty launched with a single recognisable crest running from the storefront to the smallest bottle. Because the mark was drawn as a one-colour stamp, every touchpoint — foil, deboss, screen print, embroidery — came from the same artwork with no redraws.',
      points: [
        'One crest across retail, packaging, print and campaign',
        'Single-colour artwork ready for foil, deboss and embroidery',
        'Palette of obsidian, brushed silver, blush and marble white',
      ],
    },
  ],
};


/* ------------------------------------------------------------------ */
/* Brand projects 04–08                                                */
/* ------------------------------------------------------------------ */

const pic = (a: { url: string }, label: string, alt: string, ratio: number): CaseImage => ({
  src: a.url,
  label,
  alt,
  ratio,
});

const mrVisionStudy: CaseStudy = {
  slug: 'logo-project-04',
  name: 'MR VISION — Gaming & Lifestyle',
  category: 'Logo & Branding',
  shortDescription:
    'A crowned chrome-and-ruby monogram for a gaming, tech and streetwear brand — carried across audio, hardware, apparel and everyday gear.',
  hero: { ...pic(mrvCover, 'MR VISION — Brand Manifesto', 'MR VISION crown monogram beside a red-lit gaming setup', 1920 / 692), focus: 'left' },
  sections: [
    { type: 'overview', client: 'Concept Project — MR VISION', service: 'Logo & Branding', projectType: 'Brand Identity, Product & Apparel', year: '2026' },
    {
      type: 'text',
      title: 'The Challenge',
      body:
        'Most gaming brands end up looking like toy packaging or cold tech software. MR VISION wanted to sit somewhere in between — serious enough for players who care about their gear, clean enough to wear outside the setup.',
      points: ['One mark for hardware, apparel and lifestyle', 'Hold up in chrome, embroidery and print', 'A campaign voice that repeats across every product'],
    },
    {
      type: 'image',
      title: 'Built For Real Players',
      body:
        'We started with the headset, because that is where the brand lives closest to the player. The crowned MR sits on a brushed metal earcup inside a thin red ring, so the logo reads as part of the product rather than a sticker on it.',
      image: pic(mrvHeadset, 'Pro Audio Headset', 'MR VISION gaming headset with red ring and chrome monogram', 1303 / 1207),
    },
    {
      type: 'fullWidthImage',
      title: 'Power Your Vision',
      body:
        'On the full setup, the brand stays restrained: the cooler, the screen and the headset stand carry the mark, and the red lighting does the rest. Fewer logos, more presence.',
      image: pic(mrvRig, 'Performance System', 'MR VISION PC build, monitor and headset stand on a desk', 1672 / 941),
    },
    {
      type: 'imagePair',
      title: 'Vision In Every Thread',
      body:
        'The apparel line was treated like a proper clothing drop, not merch — raised embroidery, red metal eyelets and a woven neck label. The tumbler follows the same quiet finish for everyday carry.',
      images: [
        pic(mrvHoodie, 'Performance Streetwear', 'Black MR VISION hoodie with embroidered crown logo', 1122 / 1402),
        pic(mrvTumbler, 'Carry The Vision', 'Matte black MR VISION tumbler on a desk', 1448 / 1086),
      ],
    },
    {
      type: 'fullWidthImage',
      title: 'Built For Every Move',
      body:
        'The desk mat closes the set: red stitched edges, a heat-pressed emblem and plenty of clean space for the mouse. Each campaign line follows the same pattern, so the whole range feels like one family.',
      image: pic(mrvDeskmat, 'Performance Desk Mat', 'Wide MR VISION desk mat with red stitched edge', 1920 / 641),
    },
    {
      type: 'text',
      title: 'Final Design Direction',
      body:
        'MR VISION now has one mark and one voice across six product lines. The crest works in chrome, thread and print, and every campaign headline reads like it came from the same brand.',
      points: ['Monogram ready for metal, embroidery and print', 'Repeatable campaign headline system', 'Palette of black, brushed platinum and crimson'],
    },
  ],
};

const chronosStudy: CaseStudy = {
  slug: 'logo-project-05',
  name: 'Chronos Aesthetics — Medical Aesthetics',
  category: 'Logo & Branding',
  shortDescription:
    'A watchmaker-inspired identity for an aesthetics clinic — precise, calm and trustworthy, from the street sign to the treatment room.',
  hero: { ...pic(acCover, 'Chronos Aesthetics — Brand Cover', 'Chronos Aesthetics wall sign and brand cover', 1874 / 839), focus: 'left' },
  sections: [
    { type: 'overview', client: 'Concept Project — Chronos Aesthetics', service: 'Logo & Branding', projectType: 'Brand Identity, Signage & Clinic Interior', year: '2026' },
    {
      type: 'text',
      title: 'The Challenge',
      body:
        'Aesthetic clinics often look either too clinical or too glossy, and both make people nervous. Chronos needed to feel precise and medical, but also warm enough that a first-time client would feel comfortable walking in.',
    },
    {
      type: 'image',
      title: 'Time, Drawn Carefully',
      body:
        'The name means time, so the AC monogram borrows from watchmaking — small gears sit inside the letters, quietly pointing to precision and lasting results. Here it is as an enamel and metal badge for the clinic team.',
      image: pic(acBadge, 'Clockwork Badge', 'Chronos Aesthetics metal badge with gear details on black fabric', 1122 / 1402),
    },
    {
      type: 'fullWidthImage',
      title: 'The Treatment Room',
      body:
        'Inside the clinic, the logo is embroidered onto towels and kept off the walls. Dark marble, warm wood and soft light let the room feel calm, with the brand present but never loud.',
      image: pic(acSuite, 'Treatment Suite', 'Chronos Aesthetics treatment room with embroidered towel', 1672 / 941),
    },
    {
      type: 'image',
      title: 'Found From The Street',
      body:
        'A round brass blade sign with soft halo lighting makes the clinic easy to find at dusk, and gives the brick facade a sense of quality before anyone opens the door.',
      flip: true,
      image: pic(acSign, 'Projecting Street Sign', 'Round brass Chronos Aesthetics sign on a brick wall', 1536 / 1152),
    },
    {
      type: 'imagePair',
      title: 'Cards & Skincare',
      body:
        'Black cards with red foil and painted edges, and a men’s skincare line in matte black bottles — the same red, black and brass running through both.',
      images: [
        pic(acCard, 'Business Cards', 'Black Chronos Aesthetics business cards with red foil', 1537 / 1023),
        pic(acSkincare, 'Skincare Range', 'Three matte black Chronos skincare bottles on marble', 1122 / 1402),
      ],
    },
    {
      type: 'text',
      title: 'Final Design Direction',
      body:
        'Chronos now looks like a clinic people can trust with their face. The watchmaker idea gives the brand a real story to tell, and the system stays consistent from signage to the smallest bottle.',
      points: ['Monogram with a clear, ownable idea', 'Works in brass, enamel, foil and thread', 'Palette of slate black, brass and crimson'],
    },
  ],
};

const homeDecoratorsStudy: CaseStudy = {
  slug: 'logo-project-06',
  name: 'Home Decorators — Interior Design',
  category: 'Logo & Branding',
  shortDescription:
    'A warm, gold-and-green identity for an interior design studio — from the showroom to the welcome letter.',
  hero: { ...pic(hdCover, 'Home Decorators — Brand Wall', 'Home Decorators living room with brand wall', 1920 / 641), focus: 'left' },
  sections: [
    { type: 'overview', client: 'Concept Project — Home Decorators', service: 'Logo & Branding', projectType: 'Brand Identity, Retail & Stationery', year: '2026' },
    {
      type: 'text',
      title: 'The Challenge',
      body:
        'Home Decorators sells a feeling as much as a service. The brand needed to look like the homes they create — calm, well made and lived in — without slipping into the usual beige that every interior studio uses.',
    },
    {
      type: 'image',
      title: 'The Mark In Print',
      body:
        'The HD house mark is simple enough to press into thick card and still read clearly. Gold on deep green became the core pairing, used sparingly so it always feels special.',
      image: pic(hdCard, 'Letterpress Card', 'Home Decorators letterpress card with gold house mark', 1309 / 1202),
    },
    {
      type: 'imagePair',
      title: 'Spaces We Style',
      body:
        'The brand is shown where it belongs: in finished rooms. A velvet lounge corner and a soft bedroom suite show the studio’s taste better than any slogan could.',
      images: [
        pic(hdLounge, 'Living Room', 'Emerald velvet armchair with brass lamp', 1536 / 1024),
        pic(hdBedroom, 'Bedroom Suite', 'Styled bedroom with soft linen bedding', 1740 / 904),
      ],
    },
    {
      type: 'imagePair',
      title: 'Gifts & Welcome',
      body:
        'Every new client receives a candle, a diffuser and a handwritten welcome card. It is a small touch, but it turns a design project into a relationship.',
      images: [
        pic(hdGift, 'Fragrance Gift Set', 'Green Home Decorators gift box with candle and diffuser', 1308 / 1202),
        pic(hdStationery, 'Welcome Stationery', 'Green envelope with gold foil and cream card', 1672 / 940),
      ],
    },
    {
      type: 'image',
      title: 'The Showroom',
      body:
        'At night the showroom sign glows warm gold, so the storefront feels like an invitation inside rather than a shop window.',
      flip: true,
      image: pic(hdStorefront, 'Showroom Storefront', 'Home Decorators showroom at night with gold sign', 1278 / 1230),
    },
    {
      type: 'text',
      title: 'Final Design Direction',
      body:
        'Home Decorators now has a brand that feels like their work: warm, thoughtful and finished. The line “We Decorate, You Relax” ties everything together.',
      points: ['Simple house mark that prints and presses well', 'Gold and forest green used with restraint', 'Brand experience from showroom to welcome gift'],
    },
  ],
};

const goodFoodStudy: CaseStudy = {
  slug: 'logo-project-07',
  name: 'Good Food • Good Mood — Restaurant',
  category: 'Logo & Branding',
  shortDescription:
    'A forest-green and brass identity for a modern restaurant — from the front door to the takeaway bag.',
  hero: pic(gfCover, 'Good Food • Good Mood — Brand Cards', 'Green restaurant cards with gold foil on dark marble', 1536 / 1024),
  sections: [
    { type: 'overview', client: 'Concept Project — Good Food • Good Mood', service: 'Logo & Branding', projectType: 'Brand Identity, Hospitality & Packaging', year: '2026' },
    {
      type: 'text',
      title: 'The Challenge',
      body:
        'The restaurant wanted to feel special enough for a dinner date, but friendly enough for a quick lunch. The name already sets a happy tone; the identity had to add the quality.',
    },
    {
      type: 'image',
      title: 'The Front Door',
      body:
        'A round backlit sign and dark wood front make the restaurant easy to spot at dusk. The emblem repeats on the entrance pillar, so guests see it twice before they sit down.',
      image: pic(gfStorefront, 'Restaurant Storefront', 'Restaurant front at dusk with round glowing sign', 1311 / 1200),
    },
    {
      type: 'imagePair',
      title: 'At The Table & In The Kitchen',
      body:
        'Engraved brass napkin rings bring the brand to the table without a single printed word. The chef jackets carry the same emblem in gold thread.',
      images: [
        pic(gfTable, 'Table Setting', 'Brass napkin ring with engraved emblem on green linen', 1536 / 1024),
        pic(gfJacket, 'Chef Jacket', 'Dark green chef jacket with embroidered gold emblem', 1412 / 1114),
      ],
    },
    {
      type: 'fullWidthImage',
      title: 'Takeaway',
      body:
        'Bags, cups and boxes use the same green and gold, so a takeaway order still feels like a meal from the restaurant, not just food in a box.',
      image: pic(gfTakeaway, 'Takeaway Packaging', 'Green paper bag, coffee cup and kraft box with green band', 1536 / 1024),
    },
    {
      type: 'text',
      title: 'Final Design Direction',
      body:
        'Good Food • Good Mood now feels as good as it tastes. One emblem and two colours carry the brand from the sign outside to the bag that goes home.',
      points: ['Emblem that works in light, brass and thread', 'Forest green, brass and cream palette', 'Packaging ready for delivery and takeaway'],
    },
  ],
};

const premiumNatureStudy: CaseStudy = {
  slug: 'logo-project-08',
  name: 'Premium by Nature — Botanical Skincare',
  category: 'Logo & Branding',
  shortDescription:
    'A gold-crest identity for a natural skincare brand — clean ingredients presented with real luxury.',
  hero: { ...pic(pnCover, 'Premium by Nature — Brand Cover', 'Premium by Nature brand cover with gold crest on dark green', 1920 / 641), focus: 'left' },
  sections: [
    { type: 'overview', client: 'Concept Project — Premium by Nature', service: 'Logo & Branding', projectType: 'Brand Identity & Packaging', year: '2026' },
    {
      type: 'text',
      title: 'The Challenge',
      body:
        'Natural skincare is often shown with kraft paper and plain labels. Premium by Nature wanted to prove that clean products can still feel like a gift — rich, careful and worth the price.',
    },
    {
      type: 'image',
      title: 'The Serum',
      body:
        'The facial serum sets the tone: amber glass, a simple label and the gold crest. Real wood and leaves around it keep the natural promise honest.',
      image: pic(pnSerum, 'Facial Serum — 30ml', 'Amber dropper bottle on wood with green leaves', 1046 / 1503),
    },
    {
      type: 'imagePair',
      title: 'Retail Packaging',
      body:
        'A deep green bag with gold leaf patterns for the shop, and a light cream carton for everyday products. Two moods, one crest.',
      images: [
        pic(pnBag, 'Gift Bag & Cleanser', 'Green gift bag with gold pattern beside a cleanser tube', 1122 / 1402),
        pic(pnCarton, 'Skincare Carton', 'Cream skincare box with gold crest', 1536 / 1024),
      ],
    },
    {
      type: 'fullWidthImage',
      title: 'The Gift Box',
      body:
        'The rigid green box with gold corners and a wax seal is made to be kept. It turns a skincare order into something people want to give.',
      image: pic(pnBox, 'Luxury Gift Box', 'Green rigid gift box with gold crest and wax seal', 1536 / 1024),
    },
    {
      type: 'fullWidthImage',
      title: 'The Atmosphere',
      body:
        'Next to a lit candle on marble, the box shows the full mood of the brand: slow, warm and natural.',
      image: pic(pnCandle, 'Gift Box & Candle', 'Green gift box beside a lit candle on dark marble', 1920 / 641),
    },
    {
      type: 'text',
      title: 'Final Design Direction',
      body:
        'Premium by Nature now looks as good as its ingredients. The crest and the green-and-gold palette give the range a clear, giftable identity.',
      points: ['Gold crest ready for foil and emboss', 'Forest green, gold and cream palette', 'Packaging range from serum to gift box'],
    },
  ],
};

const lexisDowStudy: CaseStudy = {
  slug: 'lexis-dow',
  name: 'Lexis Dow',
  category: 'Logo & Branding',
  shortDescription: 'A bold purple-and-black lifestyle brand built to dream, create and grow.',
  hero: pic(ldCover, 'Lexis Dow — Brand Identity', 'Lexis Dow brand identity board', 1672 / 941),
  sections: [
    { type: 'overview', client: 'Concept Project — Lexis Dow', service: 'Logo & Branding', projectType: 'Brand Identity', year: '2026' },
    {
      type: 'text',
      title: 'The Challenge',
      body: 'Lexis Dow wanted a premium lifestyle brand that feels bold and confident. Neon purple on deep black, with an elegant serif, says: bigger dreams, bolder moves.',
    },
    {
      type: 'imagePair',
      title: 'Packaging',
      body: 'A luxury shopping bag and gift box with contact card — premium from the first touch.',
      images: [
        pic(ldBag, 'Shopping Bag', 'Black Lexis Dow shopping bag', 1582 / 994),
        pic(ldContact, 'Box & Contact Card', 'Lexis Dow box and contact card', 1562 / 1007),
      ],
    },
    {
      type: 'imagePair',
      title: 'Apparel',
      body: 'Dream, create, grow — a statement hoodie and woven label.',
      images: [
        pic(ldHoodie, 'Hoodie', 'Black Lexis Dow hoodie', 1145 / 1374),
        pic(ldLabel, 'Woven Label', 'Embroidered Lexis Dow label', 1268 / 1241),
      ],
    },
    {
      type: 'imagePair',
      title: 'Everyday & Digital',
      body: 'The brand on the desk and on the phone screen.',
      images: [
        pic(ldMug, 'Office Mug', 'Lexis Dow office mug', 1),
        pic(ldPhone, 'Phone Wallpaper', 'Lexis Dow phone wallpaper', 1024 / 1536),
      ],
    },
  ],
};

const cyberStudy: CaseStudy = {
  slug: 'cyber-security',
  name: 'Cyber Security — Daniel Carter',
  category: 'Logo & Branding',
  shortDescription:
    'A shield identity for a cybersecurity expert — strong, modern and built to earn trust.',
  hero: pic(cyCover, 'Cyber Security — Brand Cover', 'Cyber Security shield logo on dark background', 1672 / 941),
  sections: [
    { type: 'overview', client: 'Concept Project — Daniel Carter', service: 'Logo & Branding', projectType: 'Brand Identity', year: '2026' },
    {
      type: 'text',
      title: 'The Challenge',
      body:
        'Daniel needed a brand that makes people feel safe at first look. The shield, cyan glow and chrome letters say one thing: protect, detect, defend.',
    },
    {
      type: 'imagePair',
      title: 'Office & Business Cards',
      body: 'A glass sign for the office and black cards with cyan details. Security builds trust.',
      images: [
        pic(cySign, 'Glass Office Sign', 'Glass office sign with shield logo', 1024 / 1536),
        pic(cyCards, 'Business Cards', 'Black business cards with cyan shield', 1024 / 1536),
      ],
    },
    {
      type: 'imagePair',
      title: 'Digital & Packaging',
      body: 'Stronger protection online, and a box that feels built to last.',
      images: [
        pic(cyWeb, 'Web Post', 'Laptop showing cyber security post', 1024 / 1536),
        pic(cyBox, 'Product Box', 'Black box with cyan shield logo', 1024 / 1536),
      ],
    },
    {
      type: 'imagePair',
      title: 'Apparel',
      body: 'Protection that moves with your business — embroidered logo and team hoodie.',
      images: [
        pic(cyCloth, 'Embroidered Logo', 'Embroidered shield logo on fabric', 1122 / 1402),
        pic(cyHoodie, 'Hoodie', 'Black hoodie with shield logo', 1122 / 1402),
      ],
    },
  ],
};

const brandSystems: Record<string, BrandSystem> = {
  'logo-project-01': {
    colors: [
      { name: 'Gym Black', hex: '#0E0E0F', role: 'Background' },
      { name: 'Power Red', hex: '#E01E26', role: 'Primary accent' },
      { name: 'Chrome Silver', hex: '#B8BCC2', role: '3D emblem metal' },
      { name: 'White', hex: '#FFFFFF', role: 'Headlines & text' },
    ],
    typography: [
      { role: 'Display', font: 'Montserrat ExtraBold', usage: 'Headlines like “More Than Just a Gym”' },
      { role: 'Accent', font: 'Brush script', usage: '“No Pain No Gain” wall art' },
      { role: 'Body', font: 'Montserrat', usage: 'Wide-spaced labels & card copy' },
    ],
    deliverables: ['3D chrome emblem', 'Reception & wall signage', 'Business cards', 'Bag & bottle merch'],
  },
  'logo-project-02': {
    colors: [
      { name: 'Jet Black', hex: '#0B0B0B', role: 'Packaging base' },
      { name: 'Polished Silver', hex: '#C9C6C2', role: 'Crest & wordmark' },
      { name: 'Champagne Gold', hex: '#C9A46A', role: 'Metal trims' },
      { name: 'Blush Pink', hex: '#E9B8B4', role: 'Secondary accent' },
    ],
    typography: [
      { role: 'Display', font: 'Trajan-style serif', usage: '“BEAUTY” wordmark & product names' },
      { role: 'Headline', font: 'Playfair Display', usage: 'Campaign headlines' },
      { role: 'Body', font: 'Montserrat', usage: 'Tagline & labels' },
    ],
    deliverables: ['Crest monogram logo', 'Skincare packaging', 'Shopping bags', 'Storefront signage'],
  },
  'logo-project-03': {
    colors: [
      { name: 'Gold', hex: '#D4AF37', role: 'Primary — monogram' },
      { name: 'Ecru', hex: '#E8DCCA', role: 'Light background' },
      { name: 'Sand', hex: '#C8B89A', role: 'Supporting neutral' },
      { name: 'Taupe', hex: '#8A7F72', role: 'Secondary neutral' },
      { name: 'Charcoal', hex: '#2A2A2A', role: 'Dark base' },
    ],
    typography: [
      { role: 'Headings', font: 'Playfair Display', usage: 'As shown on the brand board' },
      { role: 'Body', font: 'Montserrat', usage: 'Body text & “Creative Studio” line' },
    ],
    deliverables: ['PC monogram & wordmark', 'Studio signage', 'Stationery', 'Hoodie & mug merch'],
  },
  'logo-project-04': {
    colors: [
      { name: 'Carbon Black', hex: '#0A0A0A', role: 'Background' },
      { name: 'Vision Red', hex: '#E10600', role: 'Primary accent & glow' },
      { name: 'Silver', hex: '#D9D9D9', role: 'MR monogram' },
      { name: 'White', hex: '#FFFFFF', role: 'Headlines' },
    ],
    typography: [
      { role: 'Display', font: 'Montserrat ExtraBold', usage: '“Power Your Vision.” headlines' },
      { role: 'Body', font: 'Montserrat', usage: 'Wide-spaced subtitles' },
    ],
    deliverables: ['Crown MR emblem', 'Gaming gear branding', 'Streetwear', 'Desk mat & tumbler'],
  },
  'logo-project-05': {
    colors: [
      { name: 'Ruby Red', hex: '#B3121B', role: 'Primary — emblem' },
      { name: 'Gunmetal', hex: '#8C8C8C', role: 'Metal frame' },
      { name: 'Copper Gold', hex: '#C08A5B', role: 'Accent & caps' },
      { name: 'Matte Black', hex: '#111111', role: 'Background' },
    ],
    typography: [
      { role: 'Display', font: 'Bold geometric sans', usage: '“CHRONOS” wordmark' },
      { role: 'Headline', font: 'Lora', usage: '“Advanced Aesthetics…” headlines' },
      { role: 'Body', font: 'Montserrat', usage: 'Cards, labels & menus' },
    ],
    deliverables: ['3D AC emblem', 'Hanging clinic sign', 'Business cards', "Men's skincare packaging"],
  },
  'logo-project-06': {
    colors: [
      { name: 'Forest Green', hex: '#1F4A36', role: 'Primary' },
      { name: 'Antique Gold', hex: '#B8893F', role: 'Accent & foil' },
      { name: 'Cream', hex: '#EFE6D6', role: 'Background' },
      { name: 'Walnut', hex: '#6B4426', role: 'Wood tones' },
    ],
    typography: [
      { role: 'Display', font: 'Cinzel', usage: '“HOME” wordmark & signage' },
      { role: 'Body', font: 'Montserrat', usage: '“Decorators” line & tagline' },
    ],
    deliverables: ['HD house monogram', 'Storefront signage', 'Gift & fragrance packaging', 'Stationery'],
  },
  'logo-project-07': {
    colors: [
      { name: 'Deep Green', hex: '#173B2E', role: 'Primary' },
      { name: 'Brushed Gold', hex: '#C9A04E', role: 'Emblem & foil' },
      { name: 'Kraft', hex: '#C49A6C', role: 'Takeaway packaging' },
      { name: 'Ivory', hex: '#F2ECDF', role: 'Light cards' },
    ],
    typography: [
      { role: 'Display', font: 'Cinzel', usage: '“RESTAURANT” wordmark' },
      { role: 'Body', font: 'Montserrat', usage: '“Good Food • Good Mood” line' },
    ],
    deliverables: ['Chef emblem', 'Storefront signage', 'Uniforms & napkin rings', 'Takeaway packaging'],
  },
  'logo-project-08': {
    colors: [
      { name: 'Forest Green', hex: '#123A2C', role: 'Primary' },
      { name: 'Gold', hex: '#C6A15B', role: 'Crest & botanicals' },
      { name: 'Natural Cream', hex: '#EEE6D4', role: 'Labels & boxes' },
      { name: 'Amber', hex: '#7A4A1E', role: 'Glass bottles' },
    ],
    typography: [
      { role: 'Display', font: 'Cinzel', usage: '“PREMIUM” wordmark' },
      { role: 'Headline', font: 'Lora', usage: '“Pure Ingredients…” headlines' },
      { role: 'Accent', font: 'Script', usage: 'Gift-box messages' },
    ],
    deliverables: ['Crest monogram', 'Serum & cleanser labels', 'Gift box & bag', 'Candle packaging'],
  },
  'lexis-dow': {
    colors: [
      { name: 'Neon Purple', hex: '#D633FF', role: 'Logo & accents' },
      { name: 'Pure White', hex: '#FFFFFF', role: 'Text' },
      { name: 'Charcoal Grey', hex: '#333337', role: 'Secondary' },
      { name: 'Matte Black', hex: '#0B0B0B', role: 'Background' },
    ],
    typography: [
      { role: 'Display', font: 'Playfair Display', usage: 'Headings' },
      { role: 'Body', font: 'Montserrat', usage: 'Body text' },
    ],
    deliverables: ['Logo', 'Packaging', 'Apparel', 'Digital assets'],
  },
  'cyber-security': {
    colors: [
      { name: 'Electric Cyan', hex: '#00A3FF', role: 'Shield & circuit glow' },
      { name: 'Obsidian Navy', hex: '#0A0F1D', role: 'Background' },
      { name: 'Chrome Silver', hex: '#C5CCD6', role: 'Wordmark' },
      { name: 'Stealth Black', hex: '#12141A', role: 'Packaging & apparel' },
    ],
    typography: [
      { role: 'Display', font: 'Bold geometric sans', usage: '“CYBER SECURITY” wordmark' },
      { role: 'Body', font: 'Montserrat', usage: 'Taglines & cards' },
    ],
    deliverables: ['Shield emblem', 'Glass office sign', 'Business cards', 'Packaging & apparel'],
  },
};

/**
 * Curated layout for brand studies: keep text sections plus only the first
 * few image sections, so the interactive brand system carries the story
 * instead of a long run of mockups.
 */
const MAX_IMAGE_SECTIONS = Infinity;
const curate = (study: CaseStudy): CaseStudy => {
  let shown = 0;
  return {
    ...study,
    sections: study.sections.filter((s) => {
      if (s.type === 'overview' || s.type === 'text') return true;
      shown += 1;
      return shown <= MAX_IMAGE_SECTIONS;
    }),
  };
};

export const caseStudies: CaseStudy[] = [
  ...[
    gymStudy,
    beautyStudy,
    popCultureStudy,
    mrVisionStudy,
    chronosStudy,
    homeDecoratorsStudy,
    goodFoodStudy,
    premiumNatureStudy,
    cyberStudy,
    lexisDowStudy,
  ].map(curate),
  ...build('web', 'Web', 'Web Design', 3, webSections, 16 / 9),
  ...build('architecture', 'Architecture', 'Architecture', 2, architectureSections, 4 / 3),
  ...build('image-editing', 'Image Editing', 'Image Editing', 2, imageEditingSections, 4 / 3),
  ...build('shopify', 'Shopify', 'Shopify', 2, shopifySections, 16 / 9),
].map((c) => (brandSystems[c.slug] ? { ...c, brandSystem: brandSystems[c.slug] } : c));

export const getCaseStudy = (slug?: string) =>
  caseStudies.find((c) => c.slug === slug);

export const getAdjacentCaseStudy = (slug: string) => {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i === -1) return undefined;
  return caseStudies[(i + 1) % caseStudies.length];
};
