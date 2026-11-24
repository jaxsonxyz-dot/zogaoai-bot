
import React from 'react';
import { motion } from 'framer-motion';
import { ctaVariants } from '@/utils/animations/pageAnimations';
import { Button } from '@/components/ui/button';

interface ServiceCTASectionProps {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
  className?: string;
  showButton?: boolean;
}

const ServiceCTASection: React.FC<ServiceCTASectionProps> = ({
  title,
  subtitle,
  children,
  className = "py-20 bg-gradient-to-b from-black/40 to-zogago-dark relative overflow-hidden",
  showButton = true
}) => {
  return (
    <section className={className}>
      <div className="container mx-auto px-4">
        <motion.div 
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass-card border border-zogago-blue/20 p-8 md:p-12 max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zogago-blue to-zogago-purple">
            {title}
          </h2>
          <p className="text-lg text-zogago-light/80 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          {children}

          {showButton && (
            <Button 
              className="button-glow transition-all duration-300"
              size="lg"
              onClick={() => window.openContactForm?.()}
            >
              <span>Let's Work Together</span>
            </Button>
          )}
          
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCTASection;
