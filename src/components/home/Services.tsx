
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Brush, FileText, Building2, Share2, X, ChevronRight } from 'lucide-react';
import AnimatedCard from '../ui/AnimatedCard';
import GlitchText from '../ui/GlitchText';
import { AnimatePresence } from "framer-motion";
import CircularPortfolio from "@/components/ui/circular-portfolio";

const serviceData = [
  {
    icon: Brush,
    title: "Graphic Design",
    description: "Eye-catching visuals that blend futuristic aesthetics with modern design elements.",
    accentColor: "bg-zogago-blue",
    link: "/services/graphics-design",
    images: [
      "/assets/logos/beauty logo.png",
      "/assets/logos/resturant.png",
      "/assets/logos/premium.jpg",
      "/assets/logos/home logo.png",
      "/assets/logos/cyberlogo.png",
      "/assets/logos/3d gym.png",
      "/assets/logos/latest logo.png",
      "/assets/logos/pop culture.jpg",
      "/assets/logos/ac logo.png",
      "/assets/logos/Mr vision.png",
      "/assets/logos/lexis dow.png"
    ]
  },
  {
    icon: Monitor,
    title: "Web Development",
    description: "Custom websites with cutting-edge technologies and smooth interactive experiences.",
    accentColor: "bg-zogago-purple",
    link: "/services/web-development",
    images: [
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2069",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&q=80&w=2070"
    ]
  },
  {
    icon: FileText,
    title: "Content Creation",
    description: "Engaging digital content that tells your story with a unique cyberpunk flair.",
    accentColor: "bg-zogago-pink",
    link: "/services",
    images: [
      "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&q=80&w=2076",
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=2064",
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=2074",
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=2064"
    ]
  },
  {
    icon: Building2,
    title: "Architecture",
    description: "Innovative architectural designs that transform spaces with modern aesthetics and functionality.",
    accentColor: "bg-blue-500",
    link: "/services/architecture",
    images: [
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2071",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2032"
    ]
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Strategic marketing campaigns that build your brand presence across social platforms.",
    accentColor: "bg-zogago-purple",
    link: "/services/social-media-marketing",
    images: [
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?auto=format&fit=crop&q=80&w=2074",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&q=80&w=2070",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070"
    ]
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof serviceData[0] | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  React.useEffect(() => setIsZoomed(false), [currentImageIndex, isGalleryOpen]);

  const handleServiceClick = (service: typeof serviceData[0]) => {
    setSelectedService(service);
    setCurrentImageIndex(0);
    setIsGalleryOpen(true);
  };

  const handleNextImage = () => {
    if (selectedService) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedService.images.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedService) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedService.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="services" className="zg-section relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-zogago-dark to-black/50 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zogago-blue/50 to-transparent"></div>
      
      <div className="zg-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="zg-heading-lg mb-6">
            <GlitchText text="Services" className="text-gradient-blue" intensity="low" />{" "}
            That Push Boundaries
          </h2>
          
          <p className="zg-paragraph">
            We combine technical excellence with creative vision to deliver next-generation
            digital solutions that captivate and engage.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceData.map((service, index) => (
            <div key={index} className="block" onClick={() => handleServiceClick(service)}>
              <AnimatedCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                accentColor={service.accentColor}
                className={`animate-fade-in animate-delay-${index * 100} h-full group hover:scale-105 transition-transform duration-300 cursor-pointer`}
              >
                <div className="mt-4 grid grid-cols-3 gap-1">
                  {service.images.slice(0, 3).map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-sm overflow-hidden">
                      <img 
                        src={img} 
                        alt={`${service.title} ${idx + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isGalleryOpen && selectedService && (
          <CircularPortfolio
            items={selectedService.images.map((img, idx) => ({
              title: `${selectedService.title} - Project ${idx + 1}`,
              description: selectedService.description,
              src: img,
            }))}
            onClose={() => setIsGalleryOpen(false)}
            autoplay
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
