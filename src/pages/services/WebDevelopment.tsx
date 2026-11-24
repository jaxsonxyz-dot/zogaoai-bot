import React from 'react';
import { Globe, Smartphone, Languages, Code2, Layers, Monitor, Cpu, Zap, Shield, Rocket, Settings } from 'lucide-react';
import ServicesPageTemplate from '../../components/services/ServicesPageTemplate';
import { createStandardProcessSteps, webDevFlipCards } from '@/data/standardProcessSteps';
import { BenefitFlipCard } from '@/components/services/ServiceBenefitsSection';

const webDevProcessSteps = createStandardProcessSteps(webDevFlipCards);

const webDevServices = [{
  id: 1,
  title: "Custom Website Development",
  description: "Bespoke websites built from the ground up to meet your unique business needs and user requirements.",
  imageUrl: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=2070",
  route: "/contact",
  galleryImages: ["https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2940", "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2074"]
}, {
  id: 2,
  title: "Front-end Development",
  description: "Modern, responsive user interfaces built with React, Angular, or Vue that deliver exceptional user experiences.",
  imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
  route: "/contact",
  galleryImages: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072", "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2069", "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=2106", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"]
}, {
  id: 3,
  title: "Full-Stack Solutions",
  description: "End-to-end web development with robust back-end systems, APIs, and database architecture.",
  imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1931",
  route: "/contact",
  galleryImages: ["https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1931", "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=2074", "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=2070"]
}];

const webDevFlipCardBenefits: BenefitFlipCard[] = [{
  title: "Enhanced Online Presence",
  subtitle: "Stand out digitally",
  description: "Establish a professional digital footprint that represents your brand and attracts your target audience effectively.",
  features: ['Custom Designs', 'Responsive UI/UX', 'Fast Loading', 'Brand Aligned'],
  frontIcon: Globe,
  featureIcons: [Globe, Rocket, Zap, Layers],
  color: "#0EA5E9"
}, {
  title: "Mobile Optimization",
  subtitle: "Perfect on every device",
  description: "All our websites are fully responsive, ensuring perfect performance across all devices and screen sizes.",
  features: ['Responsive Layout', 'Touch Friendly', 'Cross-Browser', 'Adaptive Design'],
  frontIcon: Smartphone,
  featureIcons: [Smartphone, Monitor, Settings, Code2],
  color: "#8B5CF6"
}, {
  title: "Modern Technologies",
  subtitle: "Cutting-edge stack",
  description: "We use cutting-edge frameworks and libraries to build fast, scalable, and maintainable web applications.",
  features: ['React & Next.js', 'Cloud Hosting', 'API Integration', 'Security First'],
  frontIcon: Cpu,
  featureIcons: [Cpu, Shield, Layers, Zap],
  color: "#EC4899"
}];

const webDevGalleryImages = ["https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2069", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072", "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1931", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"];

const WebDevelopment = () => {
  return (
    <div className="min-h-screen bg-zogago-dark">
      <ServicesPageTemplate
        pageTitle="Web Design & Development"
        pageDescription="Transform your digital presence with custom websites that combine stunning designs with powerful functionality, creating memorable online experiences that drive results."
        galleryImages={webDevGalleryImages}
        services={webDevServices}
        processSteps={webDevProcessSteps}
        benefits={[]}
        flipCards={webDevFlipCardBenefits}
        ctaTitle="Ready to Elevate Your Online Presence?"
        ctaSubtitle="Explore our web development portfolio and discover how we can help your business grow online."
        workSectionTitle="Our Web Development Work"
      />
    </div>
  );
};

export default WebDevelopment;
