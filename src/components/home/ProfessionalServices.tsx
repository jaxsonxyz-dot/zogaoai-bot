import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, Code, ShoppingCart, Palette, Building2, Wand2, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import {
  create3DTiltEffect,
  createPulseAnimation,
} from '../../utils/animationUtils';
import gsap from 'gsap';

interface ServiceProps {
  icon: React.ElementType;
  title: string;
  pillar: string;
  description: string;
  offerings: string[];
  route: string;
  accentColor: string;
  index: number;
}

const ServiceCard: React.FC<ServiceProps> = ({
  icon: Icon,
  title,
  pillar,
  description,
  offerings,
  route,
  accentColor,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isPopupVisible = useRef(false);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);

          if (!isPopupVisible.current) {
            isPopupVisible.current = true;
            gsap.fromTo(
              cardEl,
              {
                scale: 0.92,
                opacity: 0,
                y: 28,
              },
              {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.55,
                delay: index * 0.08,
                ease: 'power2.out',
              }
            );
          }

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(cardEl);

    const hasFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(pointer: fine)').matches;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = cardEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    if (hasFinePointer) {
      cardEl.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      observer.unobserve(cardEl);
      observer.disconnect();
      if (hasFinePointer) {
        cardEl.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [index]);

  const handleServiceClick = (e: React.MouseEvent, targetRoute: string) => {
    e.preventDefault();
    // Synchronous lock: prevents 50-100 rapid clicks from stacking GSAP tweens & duplicate navigations
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    const cardEl = cardRef.current;
    if (cardEl) {
      gsap.killTweensOf(cardEl);
      gsap.to(cardEl, {
        scale: 1.03,
        duration: 0.14,
        ease: 'power1.out',
        onComplete: () => {
          gsap.to(cardEl, {
            scale: 1,
            duration: 0.16,
            ease: 'power2.out',
            onComplete: () => {
              navigate(targetRoute);
              setTimeout(() => {
                isNavigatingRef.current = false;
              }, 400);
            },
          });
        },
      });
    } else {
      navigate(targetRoute);
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 400);
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'service-card glass-card p-4 sm:p-5 transition-all duration-500 transform group flex flex-col border border-white/10 hover:border-zogago-blue/40',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={
        {
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
        } as React.CSSProperties
      }
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="relative overflow-hidden rounded-xl">
          <div
            ref={iconRef}
            className={cn(
              'w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-all duration-500 group-hover:scale-110',
              accentColor
            )}
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 group-hover:rotate-6" />
          </div>
          <div
            className={cn(
              'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl',
              accentColor
            )}
            style={{ zIndex: -1 }}
          />
        </div>
        <span className="text-[11px] uppercase tracking-[0.16em] text-zogago-blue/85 font-medium text-right">
          {pillar}
        </span>
      </div>

      <h3 className="text-sm sm:text-base md:text-lg font-bold mb-1.5 group-hover:text-zogago-blue transition-colors duration-300 leading-snug">
        {title}
      </h3>
      <p className="text-zogago-light/75 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
        {description}
      </p>

      <div className="mb-4 flex-1">
        <h4 className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zogago-light/60 mb-1.5">
          What You Receive
        </h4>
        <ul className="space-y-1">
          {offerings.map((offering, i) => (
            <li key={i} className="flex items-start group/item">
              <span className="text-zogago-blue mr-1.5 text-xs shrink-0">•</span>
              <span className="text-zogago-light/80 text-xs leading-snug">
                {offering}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto">
        <a href={route} onClick={(e) => handleServiceClick(e, route)}>
          <Button
            variant="default"
            size="sm"
            className="button-glow w-full transition-all duration-300 hover:shadow-lg font-medium text-xs h-9 sm:h-10"
          >
            <span>Explore Service</span>
          </Button>
        </a>
      </div>
    </div>
  );
};

const servicePillars = [
  {
    code: 'A',
    title: 'Web Design, Development & E-Commerce',
    summary:
      'Custom Websites · UI/UX Design · Responsive Builds · Shopify & Online Stores',
  },
  {
    code: 'B',
    title: 'Branding, Graphic Design & Visuals',
    summary:
      'Logo & Brand Identity · Marketing Graphics · Photo Retouching · 3D Visualization',
  },
  {
    code: 'C',
    title: 'AI Agents & Workflow Automation',
    summary:
      '24/7 Support Chatbots · Lead Capture & Routing · Connected Business Workflows',
  },
];

const ProfessionalServices = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Code,
      title: 'Web Design & Development',
      pillar: 'Core Digital Service',
      description:
        'Custom, high-converting websites designed to build credibility, showcase your brand, and turn visitors into paying clients.',
      offerings: [
        'Custom Responsive Website & UI/UX Design',
        'Clean Architecture & Cross-Browser Performance',
        'Fast Loading Speed & Mobile Optimization',
        'Easy-to-Manage Pages & Lead Capture Forms',
      ],
      route: '/services/web-development',
      accentColor: 'bg-zogago-purple',
    },
    {
      icon: Palette,
      title: 'Branding & Graphic Design',
      pillar: 'Core Creative Service',
      description:
        'Distinctive logos, complete brand identity systems, and marketing visuals crafted to make your business unforgettable.',
      offerings: [
        'Custom Logo & Visual Identity System',
        'Brand Colors, Typography & Style Guide',
        'Social Media, Ad & Campaign Graphics',
        'Pitch Decks, Print & Marketing Collateral',
      ],
      route: '/services/graphics-design',
      accentColor: 'bg-blue-500',
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce & Shopify',
      pillar: 'Online Storefronts',
      description:
        'Conversion-focused online stores and custom Shopify builds designed to showcase products and grow online sales.',
      offerings: [
        'Custom Shopify Storefront & Theme Setup',
        'Product Pages, Collections & Catalog Structure',
        'Smooth Mobile Cart & Checkout Flow',
        'Payment Gateway & Inventory Setup',
      ],
      route: '/services/ecommerce',
      accentColor: 'bg-zogago-pink',
    },
    {
      icon: Wand2,
      title: 'Photo Editing & Retouching',
      pillar: 'Visual Craft',
      description:
        'Studio-grade commercial photo retouching, color grading, and product imagery for e-commerce and brand campaigns.',
      offerings: [
        'Commercial Product & Portrait Retouching',
        'Color Grading & Lighting Enhancement',
        'Background Removal & Clean Compositing',
        'Web, Catalog & Campaign-Ready Exports',
      ],
      route: '/services/photo-editing',
      accentColor: 'bg-zogago-blue',
    },
    {
      icon: Building2,
      title: 'Architecture Visualization',
      pillar: '3D & Spatial Visuals',
      description:
        'Photorealistic 3D architectural renders and interior/exterior visualizations that help clients see spaces before they are built.',
      offerings: [
        'Photorealistic 3D Interior & Exterior Renders',
        'Residential & Commercial Concept Visuals',
        'Lighting, Material & Environment Detailing',
        'High-Resolution Client Presentation Renders',
      ],
      route: '/services/architecture',
      accentColor: 'bg-zogago-purple',
    },
    {
      icon: Bot,
      title: 'AI & Workflow Automation',
      pillar: 'Additional Agency Service',
      description:
        'Practical automated customer support and connected workflows that save your team hours on repetitive daily tasks.',
      offerings: [
        '24/7 Customer Inquiry & Support Chatbots',
        'Automated Lead Capture & Email Follow-Ups',
        'CRM, Calendar & Booking Integrations',
        'Custom Time-Saving Business Workflows',
      ],
      route: '/services/ai-automation',
      accentColor: 'bg-zogago-blue',
    },
  ];

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const cardsEl = cardsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionEl) {
      observer.observe(sectionEl);
    }

    let tiltCleanup: (() => void) | undefined;
    let pulseCleanup: (() => void) | undefined;

    if (cardsEl) {
      const cardElements = cardsEl.querySelectorAll('.service-card');
      const iconElements = cardsEl.querySelectorAll('.service-card .rounded-xl');

      tiltCleanup = create3DTiltEffect(cardElements, {
        perspective: 1500,
        tiltAmount: 8,
        scale: 1.02,
        speed: 0.5,
      });

      pulseCleanup = createPulseAnimation(iconElements, {
        scale: 1.15,
        duration: 0.35,
        ease: 'power2.out',
        repeat: 1,
      });
    }

    return () => {
      observer.disconnect();
      tiltCleanup?.();
      pulseCleanup?.();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="zg-section relative overflow-hidden pt-8 sm:pt-10"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-zogago-dark to-black/50 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zogago-blue/50 to-transparent"></div>

      <div className="zg-container relative z-10">
        <div
          className={`text-center max-w-3xl mx-auto mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-3">
            <p className="text-xs sm:text-sm font-medium text-zogago-blue">
              Services Overview
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 font-bold">
            <span className="text-gradient-blue">Professional</span> Services That{' '}
            <span className="text-gradient-purple">Elevate</span> Your Brand
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-zogago-light/75 leading-relaxed">
            As a creative and digital agency, we help businesses grow with custom web
            design, branding and graphic design, e-commerce stores, commercial photo
            retouching, 3D architectural visuals, and practical workflow automation.
          </p>
        </div>

        {/* 3 Broader Service Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
          {servicePillars.map((pillar) => (
            <div
              key={pillar.code}
              className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3.5 flex items-start gap-3"
            >
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zogago-blue/15 text-xs font-bold text-zogago-blue border border-zogago-blue/30">
                {pillar.code}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                <p className="text-xs text-zogago-light/65 mt-0.5 leading-relaxed">
                  {pillar.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.route}
              index={index}
              icon={service.icon}
              title={service.title}
              pillar={service.pillar}
              description={service.description}
              offerings={service.offerings}
              route={service.route}
              accentColor={service.accentColor}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/services" className="inline-block">
            <button
              type="button"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] backdrop-blur-md px-6 py-3 text-xs sm:text-sm font-medium text-white transition-all duration-300 hover:border-zogago-blue/50 hover:bg-white/[0.08]"
            >
              <span>View All Services &amp; Capabilities</span>
              <ArrowRight className="w-4 h-4 text-zogago-blue transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalServices;
