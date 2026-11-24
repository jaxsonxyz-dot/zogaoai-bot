"use client";
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface PortfolioItem {
  title: string;
  description: string;
  src: string;
  caseStudyRoute?: string;
}

interface CircularPortfolioProps {
  items: PortfolioItem[];
  autoplay?: boolean;
  onClose: () => void;
}

const CircularPortfolio: React.FC<CircularPortfolioProps> = ({
  items,
  autoplay = true,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number; moved: boolean } | null>(null);

  useEffect(() => {
    setIsZoomed(false);
    setPan({ x: 0, y: 0 });
  }, [activeIndex]);

  useEffect(() => {
    if (!isZoomed) {
      setPan({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [isZoomed]);

  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX = useRef<number | null>(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const itemsLength = useMemo(() => items.length, [items]);
  const activeItem = useMemo(() => items[activeIndex], [activeIndex, items]);
  const [loadedSrcs, setLoadedSrcs] = useState<Set<string>>(new Set());

  // Preload all images as soon as the viewer opens so switching is instant
  useEffect(() => {
    items.forEach((item) => {
      const img = new window.Image();
      img.src = item.src;
      img.onload = () =>
        setLoadedSrcs((prev) => {
          if (prev.has(item.src)) return prev;
          const next = new Set(prev);
          next.add(item.src);
          return next;
        });
    });
  }, [items]);

  const isActiveLoaded = activeItem ? loadedSrcs.has(activeItem.src) : false;

  useEffect(() => {
    if (autoplay && !isZoomed) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % itemsLength);
      }, 5000);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, itemsLength, isZoomed]);

  const slideThrottleRef = useRef<number>(0);

  const handleNext = useCallback(() => {
    const now = performance.now();
    if (now - slideThrottleRef.current < 160) return;
    slideThrottleRef.current = now;
    setActiveIndex((prev) => (prev + 1) % itemsLength);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [itemsLength]);

  const handlePrev = useCallback(() => {
    const now = performance.now();
    if (now - slideThrottleRef.current < 160) return;
    slideThrottleRef.current = now;
    setActiveIndex((prev) => (prev - 1 + itemsLength) % itemsLength);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [itemsLength]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) setIsZoomed(false);
        else onClose();
        return;
      }
      if (isZoomed) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext, onClose, isZoomed]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
      moved: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isZoomed || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragStartRef.current.moved = true;
    }
    const rect = cardRef.current?.getBoundingClientRect();
    const maxX = rect ? rect.width * 0.25 : 250;
    const maxY = rect ? rect.height * 0.25 : 250;
    const nextX = Math.max(-maxX, Math.min(maxX, dragStartRef.current.panX + dx));
    const nextY = Math.max(-maxY, Math.min(maxY, dragStartRef.current.panY + dy));
    setPan({ x: nextX, y: nextY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const wasMoved = dragStartRef.current?.moved ?? false;
    dragStartRef.current = null;
    setIsDragging(false);

    if (!wasMoved) {
      setIsZoomed((prev) => !prev);
    }
  };

  if (!activeItem) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col bg-[#0a0a1a]/98 backdrop-blur-xl"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 md:px-8 pt-4 shrink-0">
        <span className="text-xs tracking-[0.2em] uppercase text-white/50">
          Logo Showcase <span className="mx-2 text-white/20">•</span>
          <span className="text-white/80">
            {String(activeIndex + 1).padStart(2, "0")} / {String(itemsLength).padStart(2, "0")}
          </span>
        </span>
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="p-2.5 rounded-full bg-black/70 border border-white/20 shadow-lg hover:bg-gradient-to-r hover:from-zogago-blue hover:via-zogago-purple hover:to-zogago-pink transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row items-stretch gap-4 lg:gap-8 px-3 md:px-8 py-3 md:py-6 overflow-y-auto lg:overflow-hidden">
        {/* Image stage */}
        <div
          className="relative shrink-0 lg:shrink lg:flex-1 lg:basis-[68%] h-[42vh] sm:h-[50vh] lg:h-auto lg:min-h-0 flex items-center justify-center touch-pan-y"
          onTouchStart={(e) => {
            if (!isZoomed) touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null || isZoomed) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) (dx < 0 ? handleNext : handlePrev)();
          }}
        >
          <div className="absolute inset-[10%] rounded-full bg-gradient-to-r from-[#1FB6FA]/20 via-[#9b5cff]/15 to-[#E040FB]/20 blur-3xl pointer-events-none" />

          {itemsLength > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full text-white bg-black/75 border border-white/20 backdrop-blur-md shadow-lg inline-flex items-center justify-center hover:bg-gradient-to-r hover:from-zogago-blue hover:via-zogago-purple hover:to-zogago-pink hover:border-transparent hover:scale-105 active:scale-95 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next image"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 sm:h-12 sm:w-12 rounded-full text-white bg-black/75 border border-white/20 backdrop-blur-md shadow-lg inline-flex items-center justify-center hover:bg-gradient-to-r hover:from-zogago-blue hover:via-zogago-purple hover:to-zogago-pink hover:border-transparent hover:scale-105 active:scale-95 transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative h-full w-full flex items-center justify-center px-12 sm:px-16"
            >
              <div
                ref={cardRef}
                className={`group relative h-full max-w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-[#1FB6FA]/20 select-none outline-none [-webkit-tap-highlight-color:transparent] bg-black/30 ${
                  isZoomed
                    ? isDragging
                      ? "cursor-grabbing touch-none"
                      : "cursor-grab touch-none"
                    : "cursor-pointer"
                }`}
                onContextMenu={(e) => e.preventDefault()}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={() => {
                  dragStartRef.current = null;
                  setIsDragging(false);
                }}
              >
                {!isActiveLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#1FB6FA] animate-spin" />
                  </div>
                )}
                <motion.img
                  src={activeItem.src}
                  alt={activeItem.title}
                  animate={{
                    scale: isZoomed ? 1.5 : 1,
                    x: isZoomed ? pan.x : 0,
                    y: isZoomed ? pan.y : 0,
                  }}
                  transition={
                    isDragging
                      ? { type: "tween", duration: 0 }
                      : { type: "spring", stiffness: 260, damping: 26 }
                  }
                  onLoad={() =>
                    setLoadedSrcs((prev) => {
                      if (prev.has(activeItem.src)) return prev;
                      const next = new Set(prev);
                      next.add(activeItem.src);
                      return next;
                    })
                  }
                  className={`h-full w-auto max-w-full object-contain pointer-events-none select-none transition-opacity duration-300 ${
                    isActiveLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  draggable={false}
                />
                <div className="absolute top-3 right-3 w-16 md:w-20 opacity-85 pointer-events-none">
                  <img
                    src="/logo.svg"
                    alt=""
                    className="block w-full h-auto object-contain drop-shadow-lg"
                    draggable={false}
                  />
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-white bg-black/60 backdrop-blur-md border border-white/15 opacity-80 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {isZoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                  <span className="lg:hidden">{isZoomed ? "Drag to inspect • Tap to reset" : "Tap to preview • Swipe"}</span>
                  <span className="hidden lg:inline">{isZoomed ? "Drag to inspect • Click to reset" : "Click to preview"}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Details panel */}
        <aside className="lg:basis-[32%] lg:max-w-md shrink-0 flex flex-col justify-center">
          <div className="rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md p-6 md:p-8 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col gap-4"
              >
                <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1FB6FA] to-[#E040FB]">
                  {activeItem.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  {activeItem.description}
                </p>
                {activeItem.caseStudyRoute && (
                  <Link
                    to={activeItem.caseStudyRoute}
                    onClick={onClose}
                    className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-white bg-gradient-to-r from-zogago-blue via-zogago-purple to-zogago-pink hover:opacity-90 transition-all"
                  >
                    View Case Study →
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="pt-5 border-t border-white/10 flex flex-col gap-4">
              <div className="flex justify-center flex-wrap gap-2">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveIndex(idx);
                      if (autoplayRef.current) clearInterval(autoplayRef.current);
                    }}
                    aria-label={`Go to image ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? "bg-gradient-to-r from-zogago-blue via-zogago-purple to-zogago-pink w-6"
                        : "w-2 bg-white/30 hover:bg-zogago-blue"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>,
    document.body
  );
};

export default CircularPortfolio;

