"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Code2,
  Search,
  Palette,
  Share2,
  ShoppingCart,
  Building2,
  Sparkles,
  BarChart3,
  Shield,
  Layers,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    id: "web-dev",
    label: "Web Development",
    icon: Code2,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200",
    description: "Custom websites built with cutting-edge technologies for performance and scalability.",
  },
  {
    id: "seo",
    label: "SEO Optimization",
    icon: Search,
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200",
    description: "Data-driven SEO strategies that boost your rankings and organic traffic.",
  },
  {
    id: "graphics",
    label: "Graphics Design",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200",
    description: "Stunning visual designs that capture your brand identity and engage audiences.",
  },
  {
    id: "social",
    label: "Social Media",
    icon: Share2,
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200",
    description: "Strategic social media campaigns that grow your brand presence online.",
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200",
    description: "Powerful online stores designed to maximize conversions and sales.",
  },
  {
    id: "architecture",
    label: "Architecture",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200",
    description: "Innovative architectural visualization and digital solutions.",
  },
  {
    id: "branding",
    label: "Brand Strategy",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1493421419110-74f4e85ba126?q=80&w=1200",
    description: "Comprehensive branding that sets you apart from the competition.",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    image: "https://images.unsplash.com/photo-1551288049-bbda38a10ad5?q=80&w=1200",
    description: "Real-time insights and data analytics to drive informed decisions.",
  },
  {
    id: "global",
    label: "Global Reach",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200",
    description: "Connecting your business to audiences across every continent.",
  },
  {
    id: "security",
    label: "Cyber Security",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
    description: "Enterprise-grade security protocols to protect your digital assets.",
  },
  {
    id: "ui-ux",
    label: "UI/UX Design",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=1200",
    description: "User-centered design that delivers intuitive, delightful digital experiences.",
  },
  {
    id: "consulting",
    label: "Tech Consulting",
    icon: Lightbulb,
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200",
    description: "Expert guidance to navigate your digital transformation journey.",
  },
];

const AUTO_PLAY_INTERVAL = 3000;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
        {/* Left: Chips list */}
        <div className="w-full lg:w-[420px] flex flex-col justify-center">
          <div className="relative">
            <div className="absolute left-0 top-0 w-full h-8 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none rounded-t-2xl" />
            <div className="absolute left-0 bottom-0 w-full h-8 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none rounded-b-2xl" />

            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[420px] pb-2 lg:pb-0 scrollbar-none">
              {FEATURES.map((feature, index) => {
                const isActive = index === currentIndex;
                const distance = index - currentIndex;
                const wrappedDistance = wrap(
                  -(FEATURES.length / 2),
                  FEATURES.length / 2,
                  distance
                );

                return (
                  <motion.div
                    key={feature.id}
                    animate={{
                      opacity: Math.abs(wrappedDistance) > 3 ? 0.3 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0"
                  >
                    <button
                      onClick={() => handleChipClick(index)}
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      className={cn(
                        "relative flex items-center gap-3 px-5 py-3 lg:px-8 lg:py-4 rounded-full transition-all duration-700 text-left group border whitespace-nowrap",
                        isActive
                          ? "bg-white text-blue-500 border-white z-10"
                          : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                      )}
                    >
                      <span className={cn("transition-colors duration-300", isActive ? "text-blue-500" : "text-white/50 group-hover:text-white/80")}>
                        <feature.icon className="w-5 h-5" />
                      </span>

                      <span className="text-sm font-medium tracking-wide">
                        {feature.label}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Card stack */}
        <div className="flex-1 flex items-center justify-center min-h-[300px] lg:min-h-[480px]">
          <div className="relative w-full max-w-[500px] aspect-[4/3]">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  className="absolute inset-0 rounded-2xl overflow-hidden"
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : isPrev ? 0.92 : isNext ? 0.95 : 0.88,
                    y: isActive ? 0 : isPrev ? -30 : isNext ? 30 : 0,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.5 : 0,
                    zIndex: isActive ? 30 : isPrev ? 20 : isNext ? 10 : 0,
                    rotateX: isActive ? 0 : isPrev ? 8 : isNext ? -8 : 0,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  style={{ perspective: 1000 }}
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute bottom-0 left-0 right-0 p-6"
                      >
                        <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-1">
                          {index + 1} • {feature.label}
                        </p>
                        <p className="text-white text-base lg:text-lg font-medium">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-white/80 text-xs font-medium">
                      Live Session
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
