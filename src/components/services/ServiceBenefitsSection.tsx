
import React from 'react';
import { motion } from 'framer-motion';
import { sectionHeaderVariants } from '@/utils/animations/pageAnimations';
import CardFlip from '../ui/flip-card';
import { type LucideIcon } from 'lucide-react';

export interface BenefitFlipCard {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  frontIcon: LucideIcon;
  featureIcons: LucideIcon[];
  color: string;
}

interface ServiceBenefitsSectionProps {
  title: string;
  subtitle: string;
  benefits?: { icon: React.ReactNode; title: string; description: string; bgColor: string; iconColor: string }[];
  flipCards?: BenefitFlipCard[];
  className?: string;
}

const ServiceBenefitsSection: React.FC<ServiceBenefitsSectionProps> = ({
  title,
  subtitle,
  benefits,
  flipCards,
  className = "py-20 relative overflow-hidden"
}) => {
  return (
    <section className={className}>
      <div className="container mx-auto px-4">
        <motion.div 
          variants={sectionHeaderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zogago-blue to-blue-500">
            {title}
          </h2>
          <p className="text-lg text-zogago-light/70 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {flipCards ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flipCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CardFlip
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  features={card.features}
                  frontIcon={card.frontIcon}
                  featureIcons={card.featureIcons}
                  color={card.color}
                />
              </motion.div>
            ))}
          </div>
        ) : benefits ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 hover:shadow-lg hover:shadow-zogago-blue/20 transition-all duration-300"
              >
                <div className={`${benefit.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <div className={benefit.iconColor}>{benefit.icon}</div>
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-zogago-light/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ServiceBenefitsSection;
