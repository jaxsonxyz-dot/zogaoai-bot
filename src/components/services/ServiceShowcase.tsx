import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { createFadeScaleReveal } from '@/utils/animations/sequenceAnimations';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { GlowCard } from '@/components/ui/spotlight-card';
import Autoplay from 'embla-carousel-autoplay';
import CircularPortfolio from '@/components/ui/circular-portfolio';
import { createClickThrottle } from '@/utils/requestGuard';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  route: string;
  color?: string;
  galleryImages?: string[];
  caseStudyRoute?: string;
  caseStudyLabel?: string;
  galleryItems?: { src: string; title?: string; caseStudyRoute?: string }[];
}

interface ServiceShowcaseProps {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

const ServiceShowcase: React.FC<ServiceShowcaseProps> = ({
  title,
  subtitle,
  services,
}) => {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null
  );

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

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (isVisible && showcaseRef.current) {
      const items = showcaseRef.current.querySelectorAll('.service-item');
      cleanup = createFadeScaleReveal(showcaseRef.current, items, {
        stagger: 0.15,
        scale: 0.95,
      });
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, [isVisible]);

  // Throttle gallery opens so 50-100 rapid clicks don't thrash modal mount/unmount state
  const handleServiceClick = useRef(
    createClickThrottle((service: ServiceItem) => {
      setSelectedService(service);
      setIsImageGalleryOpen(true);
    }, 250)
  ).current;

  const defaultGalleryImages = [
    '/assets/logos/beauty logo.png',
    '/assets/logos/resturant.png',
    '/assets/logos/premium.jpg',
    '/assets/logos/home logo.png',
    '/assets/logos/cyberlogo.png',
    '/assets/logos/3d gym.png',
    '/assets/logos/latest logo.png',
    '/assets/logos/pop culture.jpg',
    '/assets/logos/ac logo.png',
    '/assets/logos/Mr vision.png',
    '/assets/logos/lexis dow.png',
  ];

  const carouselImages = services[0]?.galleryImages?.length
    ? services[0].galleryImages
    : defaultGalleryImages;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.dataset.fallbackApplied === 'true') return;
    target.dataset.fallbackApplied = 'true';
    target.src = '/logo.svg';
    target.classList.remove('object-cover');
    target.classList.add('object-contain', 'p-8', 'bg-slate-950');
  };

  return (
    <div className="bg-zogago-dark/60 backdrop-blur-sm text-white py-20">
      <div className="container mx-auto px-4" ref={showcaseRef}>
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zogago-blue to-zogago-purple">
                {title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-zogago-light/70">
                {subtitle}
              </p>
            </div>

            {/* Gallery Carousel */}
            <div className="w-full">
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 2500,
                    stopOnInteraction: true,
                    stopOnMouseEnter: true,
                  }),
                ]}
                className="w-full"
              >
                <CarouselContent>
                  {carouselImages.map((img, index) => (
                    <CarouselItem key={index} className="md:basis-1/2">
                      <div
                        className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group select-none bg-slate-950/80 border border-white/10"
                        onContextMenu={(e) => e.preventDefault()}
                        onClick={() =>
                          handleServiceClick({
                            ...services[0],
                            galleryImages: carouselImages,
                          })
                        }
                      >
                        <img
                          src={img}
                          alt={`Showcase ${index + 1}`}
                          loading="lazy"
                          decoding="async"
                          onError={handleImageError}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] pointer-events-none"
                          draggable={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zogago-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {/* Watermark */}
                        <div className="absolute top-2 right-2 w-14 md:w-16 opacity-80 pointer-events-none">
                          <img
                            src="/logo.svg"
                            alt=""
                            loading="lazy"
                            className="block w-full h-auto object-contain drop-shadow-lg"
                            draggable={false}
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-zogago-dark/80 border-zogago-blue/50 hover:bg-gradient-to-r hover:from-zogago-blue hover:via-zogago-purple hover:to-zogago-pink hover:text-white" />
                <CarouselNext className="right-2 bg-zogago-dark/80 border-zogago-blue/50 hover:bg-gradient-to-r hover:from-zogago-blue hover:via-zogago-purple hover:to-zogago-pink hover:text-white" />
              </Carousel>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-item relative group perspective-1000"
            >
              <GlowCard className="h-full overflow-hidden">
                <div className="flex flex-col h-full rounded-xl overflow-hidden">
                  {/* Image Container */}
                  <div
                    className="overflow-hidden aspect-[16/9] relative select-none cursor-pointer bg-slate-950"
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() =>
                      handleServiceClick({
                        ...service,
                        galleryImages: service.galleryImages?.length
                          ? service.galleryImages
                          : defaultGalleryImages,
                      })
                    }
                  >
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      loading="lazy"
                      decoding="async"
                      onError={handleImageError}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] pointer-events-none"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/90 opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <h3 className="absolute bottom-4 left-4 right-4 text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-zogago-blue transition-colors duration-300">
                      {service.title}
                    </h3>
                    {/* Watermark */}
                    <div className="absolute top-2 right-2 w-14 md:w-16 opacity-80 pointer-events-none">
                      <img
                        src="/logo.svg"
                        alt=""
                        loading="lazy"
                        className="block w-full h-auto object-contain drop-shadow-lg"
                        draggable={false}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                    <p className="text-sm sm:text-base text-white/80 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <Button
                      className="button-glow w-full group/btn"
                      onClick={() =>
                        handleServiceClick({
                          ...service,
                          galleryImages: service.galleryImages?.length
                            ? service.galleryImages
                            : defaultGalleryImages,
                        })
                      }
                    >
                      <span className="flex items-center">
                        Explore Service
                        <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </span>
                    </Button>
                  </div>
                </div>
              </GlowCard>
            </div>
          ))}
        </div>
      </div>

      {/* Full-screen Circular Portfolio */}
      <AnimatePresence>
        {isImageGalleryOpen && selectedService && (
          <CircularPortfolio
            items={(selectedService.galleryImages?.length
              ? selectedService.galleryImages
              : defaultGalleryImages
            ).map((img, idx) => {
              const meta = selectedService.galleryItems?.find(
                (g) => g.src === img
              );
              return {
                title:
                  meta?.title ||
                  `${selectedService.title} - Project ${idx + 1}`,
                description: selectedService.description,
                src: img,
                caseStudyRoute: meta?.caseStudyRoute,
              };
            })}
            onClose={() => setIsImageGalleryOpen(false)}
            autoplay
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceShowcase;
