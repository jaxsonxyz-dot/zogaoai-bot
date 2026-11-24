import React from 'react';
import { Palette, Brush, Image, Layers, Pen, Eye, Sparkles, Paintbrush, Shapes, Star, Wand2 } from 'lucide-react';
import ServicesPageTemplate from '../../components/services/ServicesPageTemplate';
import { createStandardProcessSteps, graphicsFlipCards } from '@/data/standardProcessSteps';
import { BenefitFlipCard } from '@/components/services/ServiceBenefitsSection';
const graphicsDesignProcessSteps = createStandardProcessSteps(graphicsFlipCards);

// Custom logo portfolio — real client logo designs from uploaded bundle
const logoPortfolioItems = [
  { src: "/assets/logos/beauty logo.png", title: "B Beauty Cosmetics", caseStudyRoute: "/case-studies/logo-project-02" },
  { src: "/assets/logos/resturant.png", title: "Good Food • Good Mood", caseStudyRoute: "/case-studies/logo-project-07" },
  { src: "/assets/logos/premium.jpg", title: "Premium by Nature", caseStudyRoute: "/case-studies/logo-project-08" },
  { src: "/assets/logos/home logo.png", title: "Home Decorators", caseStudyRoute: "/case-studies/logo-project-06" },
  { src: "/assets/logos/cyberlogo.png", title: "Cyber Security", caseStudyRoute: "/case-studies/cyber-security" },
  { src: "/assets/logos/3d gym.png", title: "3D Gym", caseStudyRoute: "/case-studies/logo-project-01" },
  { src: "/assets/logos/latest logo.png", title: "Latest in Social Media Work" },
  { src: "/assets/logos/pop culture.jpg", title: "Pop Culture", caseStudyRoute: "/case-studies/logo-project-03" },
  { src: "/assets/logos/ac logo.png", title: "Chronos Aesthetics", caseStudyRoute: "/case-studies/logo-project-05" },
  { src: "/assets/logos/Mr vision.png", title: "MR VISION", caseStudyRoute: "/case-studies/logo-project-04" },
  { src: "/assets/logos/lexis dow.png", title: "Lexis Dow", caseStudyRoute: "/case-studies/lexis-dow" },
];
const logoPortfolioImages = logoPortfolioItems.map((i) => i.src);


const graphicsDesignServices = [{
  id: 1,
  title: "Brand Identity Design",
  description: "Complete brand identity systems including logos, color palettes, typography, and brand guidelines.",
  imageUrl: "/assets/logos/3d gym.png",
  route: "/contact",
  galleryImages: logoPortfolioImages,
  galleryItems: logoPortfolioItems,
  caseStudyRoute: "/case-studies/logo-project-01",
  caseStudyLabel: "View Branding Work →"
}, {
  id: 2,
  title: "Digital Marketing Graphics",
  description: "Eye-catching graphics for social media, ads, email campaigns, and other digital marketing channels.",
  imageUrl: "/assets/logos/beauty logo.png",
  route: "/contact",
  galleryImages: logoPortfolioImages,
  galleryItems: logoPortfolioItems
}, {
  id: 3,
  title: "Print Design & Packaging",
  description: "High-quality print materials and product packaging designs that make your brand stand out.",
  imageUrl: "/assets/logos/ac logo.png",
  route: "/contact",
  galleryImages: logoPortfolioImages,
  galleryItems: logoPortfolioItems
}];

const graphicsFlipCardBenefits: BenefitFlipCard[] = [{
  title: "Visual Brand Consistency",
  subtitle: "Cohesive identity",
  description: "Create a cohesive visual identity across all touchpoints to strengthen brand recognition and trust.",
  features: ['Brand Guidelines', 'Color Systems', 'Typography Rules', 'Asset Libraries'],
  frontIcon: Palette,
  featureIcons: [Palette, Layers, Pen, Shapes],
  color: "#0EA5E9"
}, {
  title: "Professional Aesthetics",
  subtitle: "Polished & premium",
  description: "Elevate your brand's perceived value with polished, professional design that resonates with your target audience.",
  features: ['Premium Quality', 'Pixel Perfect', 'Print Ready', 'Digital Optimized'],
  frontIcon: Eye,
  featureIcons: [Eye, Star, Sparkles, Image],
  color: "#8B5CF6"
}, {
  title: "Creative Excellence",
  subtitle: "Unique & memorable",
  description: "Stand out from competitors with unique, creative designs that capture attention and communicate your message.",
  features: ['Custom Illustrations', 'Motion Graphics', 'Infographics', 'Icon Design'],
  frontIcon: Wand2,
  featureIcons: [Wand2, Paintbrush, Brush, Sparkles],
  color: "#EC4899"
}];

const graphicsDesignGalleryImages = logoPortfolioImages;

const GraphicsDesign = () => {
  return (
    <div className="min-h-screen bg-zogago-dark">
      <ServicesPageTemplate
        pageTitle="Graphics Design"
        pageDescription="Elevate your brand with eye-catching visual designs that communicate your message effectively and leave a lasting impression on your target audience."
        galleryImages={graphicsDesignGalleryImages}
        services={graphicsDesignServices}
        processSteps={graphicsDesignProcessSteps}
        benefits={[]}
        flipCards={graphicsFlipCardBenefits}
        ctaTitle="Ready to Transform Your Visual Identity?"
        ctaSubtitle="Explore our design portfolio and discover how we can help your brand stand out visually."
        workSectionTitle="Our Graphics Design Work"
      />
    </div>
  );
};

export default GraphicsDesign;
