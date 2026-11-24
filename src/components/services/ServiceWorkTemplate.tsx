
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "../ui/button";
import { scrollToTop } from '../../utils/scrollUtils';
import { cn } from '@/lib/utils';
import { ScrollArea } from "../ui/scroll-area";
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel";

export interface WorkSample {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  detailImages?: string[];
  projectInfo?: string;
  tags: string[];
}

interface ServiceWorkTemplateProps {
  serviceTitle: string;
  serviceDescription: string;
  workSamples: WorkSample[];
  backgroundColor?: string;
}

const ServiceWorkTemplate: React.FC<ServiceWorkTemplateProps> = ({
  serviceTitle,
  serviceDescription,
  workSamples,
  backgroundColor = "from-zogago-blue/20 to-zogago-purple/20"
}) => {
  const [selectedSample, setSelectedSample] = useState<WorkSample | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const navigate = useNavigate();

  // SEO page check - only SEO page should display images
  const isSeoPage = serviceTitle.toLowerCase().includes('seo');

  const handleShowcase = (sample: WorkSample) => {
    const index = workSamples.findIndex(item => item.id === sample.id);
    setCurrentIndex(index);
    setSelectedSample(sample);
    setActiveImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setSelectedSample(null);
    document.body.style.overflow = 'auto';
  };

  const handleNext = () => {
    if (!selectedSample) return;

    // Only use images for SEO pages
    if (!isSeoPage) return;
    const allImages = selectedSample.imageUrl ? [selectedSample.imageUrl, ...(selectedSample.detailImages || [])] : [];
    if (allImages.length === 0) return;
    const nextIndex = (activeImageIndex + 1) % allImages.length;
    setActiveImageIndex(nextIndex);
  };

  const handlePrevious = () => {
    if (!selectedSample) return;

    // Only use images for SEO pages
    if (!isSeoPage) return;
    const allImages = selectedSample.imageUrl ? [selectedSample.imageUrl, ...(selectedSample.detailImages || [])] : [];
    if (allImages.length === 0) return;
    const prevIndex = (activeImageIndex - 1 + allImages.length) % allImages.length;
    setActiveImageIndex(prevIndex);
  };

  const handleThumbnailClick = (index: number) => {
    setActiveImageIndex(index);
  };

  const handleNavigateHome = () => {
    navigate('/');
    scrollToTop();
  };

  useEffect(() => {
    scrollToTop();
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedSample) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSample, activeImageIndex]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const buttonVariants = {
    rest: {
      scale: 1
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={cn("py-20 px-4", `bg-gradient-to-br ${backgroundColor}`)}>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zogago-blue to-zogago-purple">
            {serviceTitle}
          </h2>
          <p className="text-lg text-zogago-light/80 max-w-3xl mx-auto">
            {serviceDescription}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workSamples.map((sample, index) => (
            <motion.div
              key={sample.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => handleShowcase(sample)}
            >
              {isSeoPage && sample.imageUrl && (
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img 
                    src={sample.imageUrl} 
                    alt={sample.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2 text-white">{sample.title}</h3>
              <p className="text-zogago-light/70 mb-4">{sample.description}</p>
              <div className="flex flex-wrap gap-2">
                {sample.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="px-2 py-1 text-xs rounded-full bg-zogago-blue/20 text-zogago-blue"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for detailed view */}
        {selectedSample && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="bg-zogago-dark border border-white/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h3 className="text-2xl font-bold text-white">{selectedSample.title}</h3>
                <button 
                  onClick={handleClose}
                  className="text-white hover:text-zogago-blue transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <ScrollArea className="max-h-[calc(90vh-120px)]">
                <div className="p-6">
                  {isSeoPage && selectedSample.imageUrl && (
                    <div className="mb-6">
                      {(() => {
                        const allImages = selectedSample.imageUrl ? [selectedSample.imageUrl, ...(selectedSample.detailImages || [])] : [];
                        return allImages.length > 0 ? (
                          <div>
                            <div className="aspect-video rounded-lg overflow-hidden mb-4 relative">
                              <img 
                                src={allImages[activeImageIndex]} 
                                alt={`${selectedSample.title} ${activeImageIndex + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {allImages.length > 1 && (
                                <>
                                  <button 
                                    onClick={handlePrevious}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-gradient-to-r hover:from-zogago-blue hover:via-zogago-purple hover:to-zogago-pink transition-colors"
                                  >
                                    <ChevronLeft size={20} />
                                  </button>
                                  <button 
                                    onClick={handleNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-gradient-to-r hover:from-zogago-blue hover:via-zogago-purple hover:to-zogago-pink transition-colors"
                                  >
                                    <ChevronRight size={20} />
                                  </button>
                                </>
                              )}
                            </div>
                            {allImages.length > 1 && (
                              <div className="flex gap-2 overflow-x-auto pb-2">
                                {allImages.map((img, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => handleThumbnailClick(idx)}
                                    className={cn(
                                      "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                                      activeImageIndex === idx ? "border-zogago-blue" : "border-white/20"
                                    )}
                                  >
                                    <img 
                                      src={img} 
                                      alt={`Thumbnail ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : null;
                      })()}
                    </div>
                  )}
                  
                  <p className="text-zogago-light/80 mb-4">{selectedSample.description}</p>
                  
                  {selectedSample.projectInfo && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-white mb-2">Project Details</h4>
                      <p className="text-zogago-light/70">{selectedSample.projectInfo}</p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedSample.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 text-sm rounded-full bg-zogago-blue/20 text-zogago-blue"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceWorkTemplate;
