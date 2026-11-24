
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ServiceSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  path: string;
}

const HeroSlider = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const slides: ServiceSlide[] = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom websites that combine stunning design with powerful functionality",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2940",
      path: "/services/web-development"
    },
    {
      id: 2,
      title: "E-commerce",
      description: "Online stores designed to convert visitors into loyal customers",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&q=80&w=2940",
      path: "/services/ecommerce"
    },
    {
      id: 3,
      title: "Graphics Design",
      description: "Visual elements that communicate your brand's unique story",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2940",
      path: "/services/graphics-design"
    },
    {
      id: 4,
      title: "Architecture",
      description: "Custom architectural designs that bring your ideas to life",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2940",
      path: "/services/architecture"
    },
    {
      id: 5,
      title: "SEO",
      description: "Strategic optimization that increases your visibility online",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2940",
      path: "/services/seo"
    }
  ];
  
  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };
  
  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };
  
  const goToService = () => {
    // When clicking a service, navigate to the service page
    navigate(slides[currentSlide].path);
    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  // Reset transition state
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);
  
  return (
    <div className="relative overflow-hidden w-full h-96 rounded-xl shadow-2xl">
      {/* Slide background images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      ))}
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end text-white p-8">
        <div className={`transition-all duration-500 ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}>
          <h3 className="text-3xl font-bold mb-2">{slides[currentSlide].title}</h3>
          <p className="text-white/80 mb-6">{slides[currentSlide].description}</p>
          <button 
            onClick={goToService}
            className="button-glow px-6 py-2 rounded-lg flex items-center space-x-2 group"
          >
            <span>Explore Services</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/50 hover:bg-gradient-to-r hover:from-zogago-blue hover:via-zogago-purple hover:to-zogago-pink rounded-full flex items-center justify-center transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/50 hover:bg-gradient-to-r hover:from-zogago-blue hover:via-zogago-purple hover:to-zogago-pink rounded-full flex items-center justify-center transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
