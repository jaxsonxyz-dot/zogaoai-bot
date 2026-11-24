import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Target, Cpu, MessageSquare, Layers } from 'lucide-react';
import gsap from 'gsap';

interface PrincipleItem {
  id: number;
  badge: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const principles: PrincipleItem[] = [
  {
    id: 1,
    badge: '01',
    label: 'Built Around Your Goals',
    description:
      'Every website, brand identity, and campaign starts with attracting the right customers and growing your business.',
    icon: <Target className="h-6 w-6" strokeWidth={1.5} />,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    badge: '02',
    label: 'Creative & Digital Under One Roof',
    description:
      'Get web design, branding, graphic design, e-commerce, photo retouching, 3D visuals, and automation from one dedicated agency.',
    icon: <Cpu className="h-6 w-6" strokeWidth={1.5} />,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    badge: '03',
    label: 'Clear Collaboration',
    description:
      'Direct communication, clear timelines, and regular previews from our first conversation through launch day.',
    icon: <MessageSquare className="h-6 w-6" strokeWidth={1.5} />,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 4,
    badge: '04',
    label: 'Made to Grow With You',
    description:
      'Future-ready websites, cohesive brand assets, and flexible digital systems designed to support your business as it expands.',
    icon: <Layers className="h-6 w-6" strokeWidth={1.5} />,
    color: 'from-indigo-500 to-purple-500',
  },
];

const Statistics = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && containerRef.current) {
      principles.forEach((_, index) => {
        const card = containerRef.current?.querySelector(
          `[data-stat-card="${index}"]`
        );
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: index * 0.12,
            ease: 'power3.out',
          }
        );

        const icon = card.querySelector('[data-stat-icon]');
        if (icon) {
          gsap.fromTo(
            icon,
            { scale: 0.6, rotation: -30 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.5,
              delay: index * 0.12 + 0.2,
              ease: 'back.out(1.6)',
            }
          );
        }
      });
    }
  }, [inView]);

  return (
    <section
      id="why-zogago"
      className="relative py-14 sm:py-20 overflow-hidden bg-gradient-to-br from-zogago-dark via-black to-zogago-dark/80"
      ref={ref}
    >
      {/* Background decorative elements — hidden on mobile to preserve GPU VRAM */}
      <div className="hidden md:block absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-zogago-blue/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-zogago-purple/30 rounded-full blur-[120px]"></div>
      </div>

      <div className="zg-container relative z-10" ref={containerRef}>
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 space-y-3 max-w-3xl mx-auto">
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <p className="text-xs sm:text-sm font-medium text-zogago-blue">
              Why Choose Zogago
            </p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-zogago-blue via-zogago-purple to-zogago-blue bg-clip-text text-transparent">
            Great digital work should feel effortless, purposeful, and built to last.
          </h2>
          <p className="text-zogago-light/70 text-sm sm:text-base max-w-2xl mx-auto">
            We combine creative direction and modern digital execution to help
            ambitious ideas move forward with clarity, speed, and craftsmanship.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {principles.map((item, index) => (
            <div key={item.id} data-stat-card={index} className="group relative">
              {/* Glow effect on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-500 rounded-2xl`}
              ></div>

              {/* Card */}
              <div className="relative h-full overflow-hidden backdrop-blur-xl bg-white/[0.04] border border-white/10 rounded-xl p-5 sm:p-6 hover:border-white/25 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-zogago-blue/20 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  {/* Icon box — expands smoothly to fill the entire card on hover */}
                  <div
                    data-stat-icon
                    className="relative z-0 inline-flex p-2.5 rounded-lg shadow-lg"
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br ${item.color} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[18] z-0`}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-lg bg-white/0 border border-transparent transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/35 z-[1]"
                    />
                    <div className="relative z-10 text-white">{item.icon}</div>
                  </div>
                  <span className="relative z-10 text-xs font-mono tracking-widest text-white/35 group-hover:text-white/90 transition-colors duration-300">
                    {item.badge}
                  </span>
                </div>

                {/* Label */}
                <h3 className="relative z-10 text-base sm:text-lg font-bold text-white mb-2 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-zogago-light/70 group-hover:text-white/95 text-sm leading-relaxed transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;