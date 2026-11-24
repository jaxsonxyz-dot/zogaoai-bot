import React from 'react';
import { Building2, Home, CheckCircle, Ruler, Compass, TreePine, Lightbulb, HardHat, Landmark, Layers, PenTool } from 'lucide-react';
import ServicesPageTemplate from '../../components/services/ServicesPageTemplate';
import { createStandardProcessSteps, architectureFlipCards } from '@/data/standardProcessSteps';
import { BenefitFlipCard } from '@/components/services/ServiceBenefitsSection';

const architectureProcessSteps = createStandardProcessSteps(architectureFlipCards);

const architectureServices = [{
  id: 1,
  title: "Residential Architecture",
  description: "Custom home designs that blend aesthetic appeal with practical functionality for modern living spaces.",
  imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2070",
  route: "/contact",
  galleryImages: ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1600047509807-f8261a1f898e?auto=format&fit=crop&q=80&w=2070"]
}, {
  id: 2,
  title: "Commercial Spaces",
  description: "Innovative designs for offices, retail spaces, and hospitality venues that enhance user experience and business operations.",
  imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2835",
  route: "/contact",
  galleryImages: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2835", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1600047509807-f8261a1f898e?auto=format&fit=crop&q=80&w=2070"]
}, {
  id: 3,
  title: "Interior Design",
  description: "Beautiful interior spaces that optimize functionality while reflecting your personal style and preferences.",
  imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2800",
  route: "/contact",
  galleryImages: ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2835"]
}];

const architectureFlipCardBenefits: BenefitFlipCard[] = [{
  title: "Functional Excellence",
  subtitle: "Form meets function",
  description: "Create spaces that perfectly balance aesthetics with practical functionality for optimal user experience.",
  features: ['Space Planning', 'Flow Optimization', 'Natural Lighting', 'Ergonomic Design'],
  frontIcon: Building2,
  featureIcons: [Building2, Ruler, Compass, Layers],
  color: "#0EA5E9"
}, {
  title: "Sustainable Design",
  subtitle: "Eco-conscious builds",
  description: "Implement energy-efficient and environmentally conscious architectural solutions for long-term value.",
  features: ['Green Materials', 'Energy Efficient', 'Solar Ready', 'Water Systems'],
  frontIcon: TreePine,
  featureIcons: [TreePine, Lightbulb, Home, Landmark],
  color: "#8B5CF6"
}, {
  title: "Regulatory Compliance",
  subtitle: "Smooth approvals",
  description: "Navigate complex building codes and regulations to ensure smooth approval and construction processes.",
  features: ['Code Compliance', 'Permit Filing', 'Safety Standards', 'Quality Checks'],
  frontIcon: CheckCircle,
  featureIcons: [CheckCircle, HardHat, PenTool, Ruler],
  color: "#EC4899"
}];

const architectureGalleryImages = ["https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2835", "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2800", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2070"];

const Architecture = () => {
  return (
    <div className="min-h-screen bg-zogago-dark">
      <ServicesPageTemplate
        pageTitle="Architecture"
        pageDescription="Transform spaces with our innovative architectural designs that blend form and function for stunning, practical environments tailored to your needs and vision."
        galleryImages={architectureGalleryImages}
        services={architectureServices}
        processSteps={architectureProcessSteps}
        benefits={[]}
        flipCards={architectureFlipCardBenefits}
        ctaTitle="Ready to Transform Your Space?"
        ctaSubtitle="Explore our architectural portfolio and discover how we can bring your vision to life."
        workSectionTitle="Our Architecture Work"
      />
    </div>
  );
};

export default Architecture;
