import React, { useState } from 'react';
import ImageLightbox from './ImageLightbox';
import type { CaseImage } from '@/data/caseStudies';

interface CasePlaceholderProps {
  image: CaseImage;
  /** Fallback aspect ratio when the image has none */
  ratio?: number;
  className?: string;
  /** Enables a zoom-on-hover effect when inside a `group` parent */
  zoomOnHover?: boolean;
  /** Click to open fullscreen lightbox (disable inside links) */
  lightbox?: boolean;
}

/**
 * Aspect-ratio aware surface. Renders a neutral dark gradient block with a
 * label until a real `src` is supplied — then it renders the image with the
 * exact same footprint, so swapping in artwork needs no layout change.
 */
const CasePlaceholder: React.FC<CasePlaceholderProps> = ({
  image,
  ratio,
  className = '',
  zoomOnHover = false,
  lightbox = true,
}) => {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const hasValidImage = Boolean(image.src) && !failed;
  const canOpen = lightbox && hasValidImage;
  const aspect = image.ratio ?? ratio ?? 16 / 9;

  return (
    <>
    <div
      onClick={canOpen ? () => setOpen(true) : undefined}
      role={canOpen ? 'button' : undefined}
      tabIndex={canOpen ? 0 : undefined}
      onKeyDown={canOpen ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); } } : undefined}
      aria-label={canOpen ? `Open ${image.label} fullscreen` : undefined}
      className={`relative w-full overflow-hidden rounded-xl border border-white/10 bg-zogago-dark ${canOpen ? 'cursor-zoom-in' : ''} ${className}`}
      style={{ aspectRatio: String(aspect) }}
    >
      {hasValidImage ? (
        <>
          {!loaded && (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-zogago-blue/10 to-zogago-purple/10 animate-pulse"
            />
          )}
          <img
            src={image.src}
            alt={image.alt ?? image.label}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`w-full h-full object-cover ${image.focus === 'left' ? 'object-left' : ''} transition-all duration-500 ${
              loaded ? 'opacity-100' : 'opacity-0'
            } ${zoomOnHover ? 'group-hover:scale-110' : ''}`}
          />
        </>
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.07] via-zogago-blue/5 to-zogago-purple/10 transition-transform duration-700 ${
            zoomOnHover ? 'group-hover:scale-110' : ''
          }`}
        >
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />
          <span className="relative z-10 px-4 text-center text-xs md:text-sm uppercase tracking-[0.25em] text-zogago-light/50">
            {image.label}
          </span>
        </div>
      )}
    </div>
    {canOpen && <ImageLightbox image={image} open={open} onClose={() => setOpen(false)} />}
    </>
  );
};

export default CasePlaceholder;
