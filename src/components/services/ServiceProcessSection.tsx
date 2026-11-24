import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sectionHeaderVariants } from '@/utils/animations/pageAnimations';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  activities?: string[];
  mockups?: (string | React.ReactNode)[];
}

interface ServiceProcessSectionProps {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
  className?: string;
}

const ServiceProcessSection: React.FC<ServiceProcessSectionProps> = ({
  title,
  subtitle,
  steps,
  className = "py-20 bg-black/30"
}) => {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-zogago-purple to-zogago-pink">
            {title}
          </h2>
          <p className="text-lg text-zogago-light/70 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Expanded Detail Panel - Fixed Position at Top */}
          <AnimatePresence>
            {expandedStep !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 glass-card border border-white/10 rounded-2xl p-8 shadow-2xl"
              >
                <div className="flex items-start gap-6 relative">
                  {/* Bigger Square Icon Box */}
                  <div className={`${steps.find(s => s.id === expandedStep)?.color} w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    {steps.find(s => s.id === expandedStep)?.icon}
                  </div>

                  {/* Text Content Beside Icon */}
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">
                      {steps.find(s => s.id === expandedStep)?.title}
                    </h3>
                    <p className="text-zogago-light/80 text-lg leading-relaxed mb-6">
                      {steps.find(s => s.id === expandedStep)?.description}
                    </p>


                    {/* Key Activities List Below Text */}
                    {steps.find(s => s.id === expandedStep)?.activities && (
                      <div>
                        <h4 className="text-xl font-semibold text-zogago-blue mb-4">
                          Key Activities:
                        </h4>
                        <ul className="space-y-3">
                          {steps.find(s => s.id === expandedStep)?.activities?.map((activity, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-zogago-light/70">
                              <ChevronRight className="w-5 h-5 text-zogago-purple flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* CTA Button */}
                    <Button 
                      className="button-glow mt-8"
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.openContactForm?.();
                      }}
                    >
                      <span>Let's Work Together</span>
                    </Button>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setExpandedStep(null)}
                    className="text-white hover:text-zogago-blue transition-colors text-3xl px-3 py-1 absolute top-0 right-0"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Process Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
                whileHover={{ y: -8 }}
                onClick={() => setExpandedStep(step.id)}
                className={`relative glass-card p-6 group transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-zogago-blue/20 ${
                  expandedStep === step.id ? 'ring-2 ring-zogago-blue' : ''
                }`}
              >

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-zogago-blue to-transparent z-10"></div>
                )}

                <div className="flex flex-col gap-4">
                  {/* Icon Box */}
                  <div className={`${step.color} w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                    {step.icon}
                  </div>

                  {/* Title Only */}
                  <h3 className="text-lg font-bold text-white group-hover:text-zogago-blue transition-all duration-300">
                    {step.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcessSection;
