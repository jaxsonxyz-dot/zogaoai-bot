'use client';

import { cn } from '@/lib/utils';
import { ArrowRight, Code2, Copy, Rocket, Zap, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  featureIcons?: LucideIcon[];
  frontIcon?: LucideIcon;
  color?: string;
}

export default function CardFlip({
  title = 'Build MVPs Fast',
  subtitle = 'Launch your idea in record time',
  description = 'Copy, paste, customize—and launch your MVP faster than ever with our developer-first component library.',
  features = [
    'Copy & Paste Ready',
    'Developer-First',
    'MVP Optimized',
    'Zero Setup Required',
  ],
  featureIcons,
  frontIcon: FrontIcon = Rocket,
  color = '#ff2e88',
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full max-w-sm mx-auto" style={{ perspective: '1200px' }}>
      <div
        className="relative w-full cursor-pointer"
        style={{ aspectRatio: '3/4' }}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front of card */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-black/80"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Background gradient effect */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${color}40, transparent 60%)`,
              }}
            />

            {/* Animated code blocks */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-32 h-32">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded"
                    style={{
                      width: `${60 + i * 10}px`,
                      height: '6px',
                      background: `${color}${30 + i * 10}`,
                      top: `${i * 18}px`,
                      left: `${10 + (i % 3) * 8}px`,
                      animation: `slideIn ${2 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}

                {/* Central rocket icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: `${color}30` }}
                  >
                    <FrontIcon className="w-8 h-8" style={{ color }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="text-sm text-white/60">{subtitle}</p>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: `${color}20` }}
                >
                  <ArrowRight className="w-5 h-5" style={{ color }} />
                </div>
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 bg-black/90"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle at 70% 70%, ${color}, transparent 60%)`,
              }}
            />

            <div className="p-6 h-full flex flex-col">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}20` }}
                  >
                    <FrontIcon className="w-5 h-5" style={{ color }} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="mt-4 space-y-2 flex-1">
                {features.map((feature, index) => {
                  const defaultIcons = [Copy, Code2, Rocket, Zap];
                  const icons = featureIcons || defaultIcons;
                  const IconComponent = icons[index % icons.length];

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg"
                      style={{ background: `${color}08` }}
                    >
                      <div
                        className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}20` }}
                      >
                        <IconComponent className="w-3.5 h-3.5" style={{ color }} />
                      </div>
                      <span className="text-sm text-white/80">{feature}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 pt-0">
              <button
                className="w-full py-2.5 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.openContactForm?.();
                }}
              >
                Start Building
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.2)' }}
                >
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          0% { transform: translateX(-100px); opacity: 0; }
          50% { transform: translateX(0); opacity: 0.8; }
          100% { transform: translateX(100px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
