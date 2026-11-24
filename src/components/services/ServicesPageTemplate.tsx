import React from 'react';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import ServiceShowcase from './ServiceShowcase';
import ServiceHero from './ServiceHero';
import ServiceBenefitsSection, { BenefitFlipCard } from './ServiceBenefitsSection';
import ServiceRelatedCaseStudies from './ServiceRelatedCaseStudies';
import ServiceCTASection from './ServiceCTASection';
import { ProcessStep, BenefitItem, ServiceItem } from '@/types/services';

interface ServicesPageTemplateProps {
  pageTitle: string;
  pageDescription: string;
  galleryImages: string[];
  services: ServiceItem[];
  processSteps: ProcessStep[];
  benefits: BenefitItem[];
  flipCards?: BenefitFlipCard[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaGallery?: string[];
  workSectionTitle?: string;
  backgroundColor?: string;
}

const ServicesPageTemplate: React.FC<ServicesPageTemplateProps> = ({
  pageTitle,
  pageDescription,
  services,
  benefits,
  flipCards,
  ctaTitle,
  ctaSubtitle,
}) => {
  return (
    <>
      <Navbar />
      <div className="relative bg-zogago-dark">
        {/* Cyber Grid Convergence Hero */}
        <ServiceHero title={pageTitle} description={pageDescription} />

        {/* Services Showcase / Portfolio */}
        <div id="services">
          <ServiceShowcase
            title={`Our ${pageTitle} Services`}
            subtitle="Comprehensive creative and digital solutions tailored for your business needs"
            services={services}
          />
        </div>

        {/* Benefits Section */}
        <ServiceBenefitsSection
          title={`Why Choose Our ${pageTitle} Services?`}
          subtitle="Partner with a dedicated creative and digital team focused on lasting craft and business growth"
          benefits={benefits}
          flipCards={flipCards}
        />

        {/* Related Case Studies — links the service portfolio to the case studies */}
        <ServiceRelatedCaseStudies pageTitle={pageTitle} />

        {/* CTA Section */}
        <ServiceCTASection title={ctaTitle} subtitle={ctaSubtitle} />

        <Footer />
      </div>
    </>
  );
};

export default ServicesPageTemplate;
