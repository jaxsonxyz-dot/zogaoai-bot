import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, Minimize2, X } from 'lucide-react';
import type { CaseImage } from '@/data/caseStudies';

interface Props {
  image: CaseImage;
  open: boolean;
  onClose: () => void;
}

const ImageLightbox: React.FC<Props> = ({ image, open, onClose }) => {
  const [actual, setActual] = useState(false);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; l: number; t: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      setActual(false);
    };
  }, [open, onClose]);

  // Center the image when switching to actual size
  useEffect(() => {
    const el = scroller.current;
    if (actual && el) {
      requestAnimationFrame(() => {
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
        el.scrollTop = (el.scrollHeight - el.clientHeight) / 2;
      });
    }
  }, [actual]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!actual || !scroller.current) return;
    drag.current = { x: e.clientX, y: e.clientY, l: scroller.current.scrollLeft, t: scroller.current.scrollTop };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !scroller.current) return;
    scroller.current.scrollLeft = drag.current.l - (e.clientX - drag.current.x);
    scroller.current.scrollTop = drag.current.t - (e.clientY - drag.current.y);
  };
  const endDrag = () => (drag.current = null);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={image.label}
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 md:px-6">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">{image.label}</p>
              {dims && (
                <p className="font-mono text-[11px] tracking-[0.2em] text-zogago-blue/70">
                  {dims.w} × {dims.h}px
                </p>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={() => setActual((a) => !a)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white transition-colors hover:border-zogago-blue hover:text-zogago-blue"
              >
                {actual ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                {actual ? 'Fit to Screen' : '100% Actual Size'}
              </button>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-full border border-white/15 p-2 text-white transition-colors hover:border-zogago-blue hover:text-zogago-blue"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div
            ref={scroller}
            className={`relative flex-1 ${actual ? 'overflow-auto cursor-grab active:cursor-grabbing' : 'overflow-hidden flex items-center justify-center p-4 md:p-10'}`}
            onClick={(e) => !actual && e.target === e.currentTarget && onClose()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <motion.img
              src={image.src}
              alt={image.alt ?? image.label}
              draggable={false}
              onLoad={(e) => {
                const t = e.currentTarget;
                setDims({ w: t.naturalWidth, h: t.naturalHeight });
              }}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={() => !actual && setActual(true)}
              className={
                actual
                  ? 'block max-w-none select-none m-auto'
                  : 'max-h-full max-w-full cursor-zoom-in select-none rounded-lg object-contain'
              }
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default ImageLightbox;
