import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowCard } from '@/components/ui/spotlight-card';
import { create3DTiltEffect, createGlowingBorderEffect } from '@/utils/animationUtils';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  result: string;
  imageUrl: string;
  route: string;
  color: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Neon Commerce Rebrand",
    category: "E-commerce Store Design",
    result: "+40% checkout conversion",
    imageUrl: "/lovable-uploads/706fb2be-91c5-4f4e-bfc3-1a4450773135.png",
    route: "/services/ecommerce",
    color: "from-zogago-pink to-purple-500"
  },
  {
    id: 2,
    title: "Cyber Studio Website",
    category: "Web Design & Development",
    result: "2.1s faster load time",
    imageUrl: "/lovable-uploads/6f572f13-a17a-4036-ba2b-c2222a953e91.png",
    route: "/services/web-development",
    color: "from-zogago-purple to-blue-500"
  },
  {
    id: 3,
    title: "Organic Reach Campaign",
    category: "Social Media Marketing",
    result: "3x audience growth",
    imageUrl: "/lovable-uploads/93608a72-b8c2-4a4b-8838-5d4aed9a11bd.png",
    route: "/services/social-media-marketing",
    color: "from-zogago-blue to-cyan-400"
  },
  {
    id: 4,
    title: "Architectural Vision",
    category: "Architecture",
    result: "Rendered in 48 hours",
    imageUrl: "/lovable-uploads/af39ed02-5dd9-47e0-8743-fc98059cf9f9.png",
    route: "/services/architecture",
    color: "from-emerald-400 to-zogago-blue"
  },
  {
    id: 5,
    title: "Search Dominance SEO",
    category: "SEO",
    result: "Top 3 for 12 keywords",
    imageUrl: "/lovable-uploads/a2781407-6623-4ad9-9e66-6766b9f70e98.png",
    route: "/services/seo",
    color: "from-orange-400 to-zogago-pink"
  },
  {
    id: 6,
    title: "Cyberpunk Brand Identity",
    category: "Graphics Design",
    result: "Full visual system",
    imageUrl: "/lovable-uploads/db3c9cd8-ddd4-45bc-be3f-eb4afcdab213.png",
    route: "/services/graphics-design",
    color: "from-zogago-blue to-zogago-purple"
  }
];

const PortfolioShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !gridRef.current) return;

    const cards = gridRef.current.querySelectorAll('.portfolio-card');
    const tiltCleanup = create3DTiltEffect(cards, {
      perspective: 1500,
      tiltAmount: 8,
      scale: 1.02,
      speed: 0.5
    });

    const glowCleanup = createGlowingBorderEffect(cards, {
      color: '#1FB6FA',
      duration: 3,
      blur: 10,
      width: 2,
      intensity: 0.35
    });

    return () => {
      tiltCleanup();
      glowCleanup();
    };
  }, [isVisible]);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="zg-section relative overflow-hidden bg-gradient-to-b from-zogago-dark via-black/50 to-zogago-dark"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zogago-blue/50 to-transparent"></div>

      {/* Background glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-zogago-purple/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-zogago-blue/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="zg-container relative z-10">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-4">
            <p className="text-sm font-medium text-zogago-light/80">Selected Work</p>
          </div>
          <h2 className="zg-heading-lg mb-4">
            Projects That <span className="text-gradient-blue">Delivered Results</span>
          </h2>
          <p className="zg-paragraph">
            A glimpse of the brands and experiences we've shaped. Each project is a blend of bold visuals, smart strategy, and clean execution.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="portfolio-card group"
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 1, 0.5, 1]
              }}
            >
              <Link to={item.route} className="block h-full">
                <GlowCard className="h-full">
                  <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-[#0a0a1a]/95">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/30 to-transparent opacity-70"></div>
                      
                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-block px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium bg-gradient-to-r ${item.color} text-white shadow-lg`}>
                          {item.category}
                        </span>
                      </div>

                      {/* View icon */}
                      <div className="absolute top-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-zogago-blue transition-colors duration-300">
                          {item.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-zogago-light/50 group-hover:text-zogago-blue transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                      </div>
                      <p className="text-sm text-zogago-light/70 mt-auto">
                        <span className="text-zogago-blue font-semibold">{item.result}</span> — {item.category}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-10 md:mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            to="/services"
            className="button-glow group inline-flex items-center"
          >
            <span className="relative z-10 flex items-center">
              Explore All Services
              <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
