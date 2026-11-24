import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import type { BrandSystem } from '@/data/caseStudies';

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="mb-3 block font-mono text-xs uppercase tracking-[0.3em] text-zogago-blue/70">{children}</span>
);

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-zogago-light/50">{children}</p>
);

interface Props {
  system: BrandSystem;
  brandName?: string;
  outcomePoints?: string[];
}

const BrandSystemSection: React.FC<Props> = ({ system, brandName, outcomePoints }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [sample, setSample] = useState(brandName ?? 'Type to preview');
  const [size, setSize] = useState(56);

  const copyHex = async (hex: string, name: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      toast.success(`${hex} copied`, { description: name });
      setTimeout(() => setCopied(null), 1500);
    } catch {
      toast.error('Could not copy');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
      className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10"
    >
      <Kicker>Interactive Spec Sheet</Kicker>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">Brand System</h2>

      {/* Palette strip */}
      <div className="mt-10">
        <Label>Color Tokens — click to copy</Label>
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {system.colors.map((c) => (
            <button
              key={c.hex}
              onClick={() => copyHex(c.hex, c.name)}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left"
              aria-label={`Copy ${c.name} ${c.hex}`}
            >
              <span className="block h-20" style={{ backgroundColor: c.hex }} />
              <span className="block p-3 text-white">
                <span className="block text-sm font-medium leading-tight">{c.name}</span>
                <span className="mt-1 block text-[11px] text-zogago-light/60">{c.role}</span>
                <span className="mt-2 flex min-h-[32px] items-center gap-1.5 font-mono text-xs">
                  {copied === c.hex ? <Check size={14} /> : <Copy size={14} />} {c.hex}
                </span>
              </span>
            </button>
          ))}
        </div>
        <div className="hidden md:flex md:h-56 overflow-hidden rounded-2xl border border-white/10">
          {system.colors.map((c) => (
            <button
              key={c.hex}
              onClick={() => copyHex(c.hex, c.name)}
              className="group relative flex-1 transition-all duration-500 hover:flex-[2.2] focus:flex-[2.2] outline-none"
              style={{ backgroundColor: c.hex }}
              aria-label={`Copy ${c.name} ${c.hex}`}
            >
              <span className="absolute inset-x-2 bottom-2 rounded-xl bg-black/60 p-2 text-left text-white backdrop-blur-sm opacity-90 md:opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100">
                <span className="flex items-center gap-1 text-xs font-medium">
                  {copied === c.hex ? <Check size={12} /> : <Copy size={12} />} {c.name}
                </span>
                <span className="mt-0.5 block font-mono text-[10px] opacity-80">{c.hex} · {c.role}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

    </motion.div>
  );
};

export default BrandSystemSection;
