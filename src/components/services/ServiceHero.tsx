import React from 'react';
import { motion } from 'framer-motion';

interface HeroStat {
  index: string;
  label: string;
  value: string;
  caption: string;
  accent: 'blue' | 'pink' | 'light';
}

interface ServiceHeroPreset {
  code: string;
  ghost: string;
  stats: HeroStat[];
}

const presets: Record<string, ServiceHeroPreset> = {
  seo: {
    code: 'PROTO-001',
    ghost: 'ENGINE',
    stats: [
      { index: '01 / CHANNELS', label: 'Channels', value: 'WA', caption: 'WhatsApp Bots', accent: 'blue' },
      { index: '02 / OUTREACH', label: 'Outreach', value: 'IN', caption: 'LinkedIn Sequences', accent: 'pink' },
      { index: '03 / AGENTS', label: 'Agents', value: 'AI', caption: 'Custom Workflows', accent: 'light' },
    ],
  },
  web: {
    code: 'PROTO-002',
    ghost: 'BUILD',
    stats: [
      { index: '01 / STACK', label: 'Stack', value: 'React', caption: 'Modern Stack', accent: 'blue' },
      { index: '02 / LAYOUT', label: 'Layout', value: 'RWD', caption: 'Responsive Design', accent: 'pink' },
      { index: '03 / CODE', label: 'Code', value: 'CLN', caption: 'Clean Architecture', accent: 'light' },
    ],
  },
  commerce: {
    code: 'PROTO-003',
    ghost: 'STORE',
    stats: [
      { index: '01 / PLATFORM', label: 'Platform', value: 'SHOP', caption: 'Shopify Builds', accent: 'blue' },
      { index: '02 / DESIGN', label: 'Design', value: 'UI', caption: 'Custom Storefront', accent: 'pink' },
      { index: '03 / SETUP', label: 'Setup', value: 'PAY', caption: 'Payment Setup', accent: 'light' },
    ],
  },
  graphic: {
    code: 'PROTO-004',
    ghost: 'DESIGN',
    stats: [
      { index: '01 / FORMAT', label: 'Format', value: 'SVG', caption: 'Vector Assets', accent: 'blue' },
      { index: '02 / SYSTEM', label: 'System', value: 'KIT', caption: 'Brand Guidelines', accent: 'pink' },
      { index: '03 / FILES', label: 'Files', value: 'PRNT', caption: 'Print-Ready Files', accent: 'light' },
    ],
  },
  architecture: {
    code: 'PROTO-005',
    ghost: 'SPACE',
    stats: [
      { index: '01 / MODEL', label: 'Model', value: '3D', caption: '3D Modeling', accent: 'blue' },
      { index: '02 / PLANS', label: 'Plans', value: '2D', caption: 'Floor Plans', accent: 'pink' },
      { index: '03 / RENDER', label: 'Renders', value: 'HD', caption: 'Visualizations', accent: 'light' },
    ],
  },
  social: {
    code: 'PROTO-006',
    ghost: 'SIGNAL',
    stats: [
      { index: '01 / RETOUCH', label: 'Retouch', value: 'SKIN', caption: 'Blemish Removal', accent: 'blue' },
      { index: '02 / COLOR', label: 'Color', value: 'TONE', caption: 'Color Grading', accent: 'pink' },
      { index: '03 / CUTOUT', label: 'Cutout', value: 'BG', caption: 'Background Removal', accent: 'light' },
    ],
  },
};

const defaultPreset: ServiceHeroPreset = {
  code: 'PROTO-000',
  ghost: 'ZOGAGO',
  stats: [
    { index: '01 / DIRECTION', label: 'Direction', value: 'ART', caption: 'Creative Direction', accent: 'blue' },
    { index: '02 / NETWORK', label: 'Network', value: 'SPEC', caption: 'Specialist-Led', accent: 'pink' },
    { index: '03 / CONTACT', label: 'Contact', value: '1:1', caption: 'Single Point of Contact', accent: 'light' },
  ],
};

const aliases: Record<string, string[]> = {
  seo: ['seo', 'search engine', 'automation', 'ai agent'],
  web: ['web design', 'web development', 'website'],
  commerce: ['commerce', 'store', 'shop'],
  graphic: ['graphic', 'brand'],
  architecture: ['architect'],
  social: ['social', 'marketing', 'photo', 'retouch'],
};

const resolvePreset = (title: string): ServiceHeroPreset => {
  const t = title.toLowerCase();
  const key = Object.keys(aliases).find((k) => aliases[k].some((a) => t.includes(a)));
  return key ? presets[key] : defaultPreset;
};

const accentText: Record<HeroStat['accent'], string> = {
  blue: 'text-zogago-blue',
  pink: 'text-zogago-pink',
  light: 'text-zogago-light',
};

const accentDot: Record<HeroStat['accent'], string> = {
  blue: 'bg-zogago-blue',
  pink: 'bg-zogago-pink',
  light: 'bg-zogago-light',
};

interface ServiceHeroProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ title, description, children }) => {
  const preset = resolvePreset(title);
  const words = title.trim().split(' ');
  const lastWord = words.length > 1 ? words.pop() as string : '';
  const firstLine = words.join(' ');

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pb-24">
      {/* Cinematic background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,hsl(var(--secondary)/0.18),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(to top, hsl(var(--primary)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-100px)',
            maskImage: 'linear-gradient(to top, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
          }}
        />
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full blur-[120px] bg-zogago-blue/20 animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full blur-[120px] bg-zogago-pink/20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-zogago-blue via-zogago-pink to-zogago-blue opacity-60" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Technical metadata row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-10 border-b border-zogago-light/10 pb-4"
        >
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[10px] text-zogago-blue tracking-[0.4em] uppercase">
              System Status: Active
            </span>
            <span className="text-[10px] text-zogago-light/40 font-mono uppercase tracking-widest">
              Zogago Visuals // Service Node
            </span>
          </div>
          <span className="font-display text-xs font-bold text-zogago-light tracking-[0.2em]">
            {preset.code}
          </span>
        </motion.div>

        {/* Headline lockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mb-14"
        >
          <span className="absolute -top-10 md:-top-16 -left-2 text-[6rem] md:text-[12rem] font-black text-zogago-light/[0.03] tracking-tighter leading-none select-none pointer-events-none uppercase font-display">
            {preset.ghost}
          </span>
          <h1 className="relative z-10 flex flex-col font-display uppercase tracking-tighter leading-[0.9]">
            {firstLine && (
              <span className="text-4xl md:text-7xl font-black text-zogago-light">{firstLine}</span>
            )}
            <span className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-zogago-blue via-zogago-light to-zogago-pink drop-shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
              {lastWord || firstLine}
            </span>
          </h1>
        </motion.div>

        {/* Content matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="w-12 h-1 bg-zogago-blue" />
            <p className="text-base md:text-lg text-zogago-light/60 font-light leading-relaxed">
              {description}
            </p>
            {children}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-px bg-zogago-light/10 p-px"
          >
            {preset.stats.map((stat) => (
              <div
                key={stat.index}
                className="bg-zogago-dark p-6 md:p-8 flex flex-col justify-between sm:aspect-square group transition-colors duration-300 hover:bg-zogago-light/5"
              >
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-mono tracking-wider ${accentText[stat.accent]}`}>
                    {stat.index}
                  </span>
                  <span className={`w-2 h-2 ${accentDot[stat.accent]} group-hover:scale-150 transition-transform duration-300`} />
                </div>
                <div className="mt-8">
                  <div className="text-3xl md:text-4xl font-black text-zogago-light font-display mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-zogago-light/40 uppercase tracking-widest">
                    {stat.caption}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Footer accents */}
        <div className="mt-14 flex items-center gap-6">
          <div className="flex-1 h-px bg-gradient-to-r from-zogago-light/20 to-transparent" />
          <div className="flex gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zogago-blue" />
            <span className="w-1.5 h-1.5 rounded-full bg-zogago-blue/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-zogago-blue/20" />
          </div>
          <span className="text-[10px] text-zogago-light/30 font-mono uppercase tracking-[0.4em] hidden sm:block">
            Sequence Established
          </span>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
