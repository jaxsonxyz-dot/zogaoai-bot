
import React from 'react';
import { ChevronRight, X } from 'lucide-react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from 'framer-motion';
import { modalContentVariants } from '@/utils/animations/pageAnimations';

interface ServiceGalleryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
  title?: string;
}

const ServiceGalleryDialog: React.FC<ServiceGalleryDialogProps> = ({
  isOpen,
  onOpenChange,
  images,
  currentImageIndex,
  setCurrentImageIndex,
  title = "Gallery"
}) => {
  if (!images || images.length === 0) return null;

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
  };

  const handlePrevImage = () => {
    const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl bg-black/90 border border-white/10 p-0 overflow-hidden">
        <motion.div 
          className="relative w-full h-full"
          variants={modalContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Close Button */}
          <button 
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 z-20 bg-black/60 rounded-full p-2 text-white hover:bg-gradient-to-r hover:from-zogago-blue hover:via-zogago-purple hover:to-zogago-pink transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Main Image */}
          <div className="relative aspect-video w-full overflow-hidden">
            <motion.img 
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={images[currentImageIndex]} 
              alt={`Showcase ${currentImageIndex + 1}`} 
              className="w-full h-full object-contain"
            />
            
            {/* Navigation Arrows */}
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
              <button 
                onClick={handlePrevImage}
                className="bg-black/60 rounded-full p-4 text-white hover:bg-gradient-to-r hover:from-zogago-blue hover:via-zogago-purple hover:to-zogago-pink transition-colors"
              >
                <ChevronRight className="w-6 h-6 transform rotate-180" />
              </button>
              <button 
                onClick={handleNextImage}
                className="bg-black/60 rounded-full p-4 text-white hover:bg-gradient-to-r hover:from-zogago-blue hover:via-zogago-purple hover:to-zogago-pink transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="bg-black/80 p-4">
            <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`cursor-pointer flex-shrink-0 w-20 h-20 rounded overflow-hidden ${idx === currentImageIndex ? 'ring-2 ring-zogago-blue' : 'opacity-70'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceGalleryDialog;
