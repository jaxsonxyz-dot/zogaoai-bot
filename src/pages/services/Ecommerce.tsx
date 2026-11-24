import React from 'react';
import { ShoppingCart, CreditCard, Package, Store, TrendingUp, Shield, Truck, Tags, BarChart3, Settings, Zap } from 'lucide-react';
import ServicesPageTemplate from '../../components/services/ServicesPageTemplate';
import { createStandardProcessSteps, ecommerceFlipCards } from '@/data/standardProcessSteps';
import { BenefitFlipCard } from '@/components/services/ServiceBenefitsSection';

const ecommerceProcessSteps = createStandardProcessSteps(ecommerceFlipCards);

const ecommerceServices = [{
  id: 1,
  title: "Custom E-commerce Stores",
  description: "Bespoke online stores designed specifically for your brand, products, and customer experience requirements.",
  imageUrl: "https://images.unsplash.com/photo-1612103198005-b238154f4590?auto=format&fit=crop&q=80&w=2069",
  route: "/contact",
  galleryImages: ["https://images.unsplash.com/photo-1612103198005-b238154f4590?auto=format&fit=crop&q=80&w=2069", "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1974", "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1664575599736-c5197c684128?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1649739436792-2ee864382f7d?auto=format&fit=crop&q=80&w=2070"]
}, {
  id: 2,
  title: "Shopify Development",
  description: "Expert Shopify store creation with custom theme development and app integration for a robust selling platform.",
  imageUrl: "https://images.unsplash.com/photo-1556742044-3c96a76ee43c?auto=format&fit=crop&q=80&w=2070",
  route: "/contact",
  galleryImages: ["https://images.unsplash.com/photo-1556742044-3c96a76ee43c?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1974", "https://images.unsplash.com/photo-1664575599736-c5197c684128?auto=format&fit=crop&q=80&w=2070"]
}, {
  id: 3,
  title: "Payment & Shipping Integration",
  description: "Seamless integration of payment gateways, shipping solutions, and inventory management systems.",
  imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070",
  route: "/contact",
  galleryImages: ["https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1556742044-3c96a76ee43c?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1612103198005-b238154f4590?auto=format&fit=crop&q=80&w=2069", "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1974"]
}];

const ecommerceFlipCardBenefits: BenefitFlipCard[] = [{
  title: "Optimized Shopping",
  subtitle: "Seamless experience",
  description: "User-friendly interfaces and streamlined checkout processes that reduce cart abandonment and increase conversions.",
  features: ['Quick Checkout', 'Smart Search', 'Product Filters', 'Wishlist Feature'],
  frontIcon: ShoppingCart,
  featureIcons: [ShoppingCart, Zap, Tags, Store],
  color: "#0EA5E9"
}, {
  title: "Scalable Infrastructure",
  subtitle: "Grow without limits",
  description: "Build on platforms that grow with your business, handling increased product catalogs and transaction volumes.",
  features: ['Auto Scaling', 'CDN Delivery', 'Load Balancing', 'Performance Tuned'],
  frontIcon: Package,
  featureIcons: [Package, TrendingUp, Settings, BarChart3],
  color: "#8B5CF6"
}, {
  title: "Secure Transactions",
  subtitle: "Trust & safety first",
  description: "Implement robust payment gateways and security measures to protect customer data and build trust.",
  features: ['SSL Encryption', 'PCI Compliant', 'Fraud Detection', 'Multi-Currency'],
  frontIcon: Shield,
  featureIcons: [Shield, CreditCard, Truck, Zap],
  color: "#EC4899"
}];

const ecommerceGalleryImages = ["https://images.unsplash.com/photo-1612103198005-b238154f4590?auto=format&fit=crop&q=80&w=2069", "https://images.unsplash.com/photo-1556742044-3c96a76ee43c?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&q=80&w=2070", "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=1974"];

const Ecommerce = () => {
  return (
    <div className="min-h-screen bg-zogago-dark">
      <ServicesPageTemplate
        pageTitle="E-commerce Store Design"
        pageDescription="Create seamless online shopping experiences with our tailored e-commerce solutions that drive conversions, engage customers, and boost your digital sales growth."
        galleryImages={ecommerceGalleryImages}
        services={ecommerceServices}
        processSteps={ecommerceProcessSteps}
        benefits={[]}
        flipCards={ecommerceFlipCardBenefits}
        ctaTitle="Ready to Launch Your Online Store?"
        ctaSubtitle="Explore our e-commerce portfolio and discover how we can help your business sell effectively online."
        workSectionTitle="Our E-commerce Work"
      />
    </div>
  );
};

export default Ecommerce;
