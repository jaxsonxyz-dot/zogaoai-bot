import React from 'react';
import { Search, Target, Rocket, BarChart3, RefreshCw } from 'lucide-react';
import CardFlip from '@/components/ui/flip-card';
import { ProcessStep } from '@/types/services';

// Standardized 5-step process used across ALL service pages
// Each service provides unique flip card content per step

interface FlipCardConfig {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  color: string;
}

export function createStandardProcessSteps(
  flipCards: [FlipCardConfig, FlipCardConfig, FlipCardConfig, FlipCardConfig, FlipCardConfig]
): ProcessStep[] {
  return [
    {
      id: 1,
      title: "Discovery & Planning",
      description: "We dive deep into your business goals, audience, and market landscape to build a solid strategic foundation.",
      icon: <Search className="w-8 h-8" />,
      color: "bg-zogago-blue/20",
      activities: [
        "Conduct stakeholder interviews and requirement gathering",
        "Research target audience demographics and behavior",
        "Analyze competitors and industry trends",
        "Define project scope, timeline, and deliverables",
        "Establish KPIs and success metrics"
      ],
      mockups: [
        <CardFlip key="fc1" {...flipCards[0]} />
      ]
    },
    {
      id: 2,
      title: "Strategy Development",
      description: "Craft a tailored strategy aligned with your objectives, ensuring every decision is data-driven and purposeful.",
      icon: <Target className="w-8 h-8" />,
      color: "bg-zogago-purple/20",
      activities: [
        "Develop comprehensive project roadmap",
        "Create wireframes, prototypes, or campaign blueprints",
        "Plan resource allocation and team structure",
        "Present multiple strategic directions for review",
        "Refine approach based on stakeholder feedback"
      ],
      mockups: [
        <CardFlip key="fc2" {...flipCards[1]} />
      ]
    },
    {
      id: 3,
      title: "Implementation",
      description: "Execute the plan with precision, leveraging cutting-edge tools and industry best practices for outstanding results.",
      icon: <Rocket className="w-8 h-8" />,
      color: "bg-zogago-pink/20",
      activities: [
        "Build and develop core deliverables",
        "Implement design systems and brand guidelines",
        "Integrate third-party tools and platforms",
        "Ensure quality through code reviews and testing",
        "Maintain clear communication throughout the process"
      ],
      mockups: [
        <CardFlip key="fc3" {...flipCards[2]} />
      ]
    },
    {
      id: 4,
      title: "Testing & Launch",
      description: "Rigorous testing across all touchpoints ensures a flawless launch that meets the highest quality standards.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "bg-blue-500/20",
      activities: [
        "Perform comprehensive quality assurance testing",
        "Conduct cross-platform and device compatibility checks",
        "Optimize performance, speed, and accessibility",
        "Execute smooth deployment and launch procedures",
        "Monitor post-launch metrics and resolve issues"
      ],
      mockups: [
        <CardFlip key="fc4" {...flipCards[3]} />
      ]
    },
    {
      id: 5,
      title: "Optimization & Growth",
      description: "Continuous monitoring, analysis, and refinement to maximize long-term results and drive sustained growth.",
      icon: <RefreshCw className="w-8 h-8" />,
      color: "bg-cyan-500/20",
      activities: [
        "Track performance metrics and generate reports",
        "Identify improvement opportunities from data insights",
        "Implement iterative enhancements and updates",
        "Adapt strategy based on market changes",
        "Provide ongoing support and maintenance"
      ],
      mockups: [
        <CardFlip key="fc5" {...flipCards[4]} />
      ]
    }
  ];
}

// Service-specific flip card configs

export const webDevFlipCards: [FlipCardConfig, FlipCardConfig, FlipCardConfig, FlipCardConfig, FlipCardConfig] = [
  { title: "Site Analysis", subtitle: "Understand your needs", description: "We analyze your existing web presence, user journeys, and business requirements to craft the right digital direction.", features: ["Technical Audit", "User Research", "Competitor Analysis", "Goal Setting"], color: "#0EA5E9" },
  { title: "UX & Wireframes", subtitle: "Design the blueprint", description: "Create intuitive wireframes and interactive prototypes that map out user flows and interface architecture.", features: ["Wireframing", "Prototyping", "User Flow Design", "Responsive Layouts"], color: "#8B5CF6" },
  { title: "Code & Build", subtitle: "Modern web development", description: "Build with React, TypeScript, and modern frameworks for fast, scalable, and maintainable web applications.", features: ["React / Next.js", "API Integration", "Database Design", "CMS Setup"], color: "#EC4899" },
  { title: "QA & Deploy", subtitle: "Launch with confidence", description: "Cross-browser testing, performance optimization, and seamless deployment to production environments.", features: ["Cross-Browser Testing", "Performance Tuning", "Accessibility Checks", "CI/CD Pipeline"], color: "#3B82F6" },
  { title: "Scale & Support", subtitle: "Grow your platform", description: "Ongoing maintenance, feature updates, and performance monitoring to keep your website running at peak performance.", features: ["Uptime Monitoring", "Security Patches", "Feature Updates", "Analytics Review"], color: "#06B6D4" }
];

export const architectureFlipCards: [FlipCardConfig, FlipCardConfig, FlipCardConfig, FlipCardConfig, FlipCardConfig] = [
  { title: "Client Vision", subtitle: "Understand your space", description: "In-depth consultation to understand your lifestyle, functional needs, and aesthetic preferences for your space.", features: ["Site Analysis", "Lifestyle Review", "Budget Planning", "Style Discovery"], color: "#0EA5E9" },
  { title: "Concept Design", subtitle: "Visualize possibilities", description: "Develop creative design concepts with 3D models, mood boards, and spatial layouts for your review.", features: ["3D Modeling", "Mood Boards", "Spatial Planning", "Material Exploration"], color: "#8B5CF6" },
  { title: "Detailed Plans", subtitle: "Technical precision", description: "Create comprehensive construction documents with detailed specifications, elevations, and engineering coordination.", features: ["Floor Plans", "Elevations", "Material Specs", "MEP Coordination"], color: "#EC4899" },
  { title: "Permits & Docs", subtitle: "Navigate regulations", description: "Prepare all permit applications, ensure building code compliance, and manage regulatory submissions.", features: ["Code Compliance", "Permit Applications", "Zoning Review", "Authority Submissions"], color: "#3B82F6" },
  { title: "Construction", subtitle: "Bring it to life", description: "Provide construction oversight, site visits, and quality control to ensure your vision is built to perfection.", features: ["Site Inspections", "Quality Control", "Contractor Coordination", "Final Handover"], color: "#06B6D4" }
];

export const graphicsFlipCards: [FlipCardConfig, FlipCardConfig, FlipCardConfig, FlipCardConfig, FlipCardConfig] = [
  { title: "Creative Brief", subtitle: "Define your vision", description: "Understand your brand, audience, and design goals through collaborative discovery and research sessions.", features: ["Brand Analysis", "Audience Research", "Trend Study", "Deliverable Scoping"], color: "#0EA5E9" },
  { title: "Concept Art", subtitle: "Explore directions", description: "Generate multiple creative concepts, mood boards, and style explorations aligned with your brand identity.", features: ["Mood Boards", "Concept Sketches", "Color Palettes", "Typography Selection"], color: "#8B5CF6" },
  { title: "Design Craft", subtitle: "Pixel-perfect creation", description: "Craft polished, high-resolution design assets with meticulous attention to color, typography, and composition.", features: ["Hi-Res Assets", "Brand Consistency", "Multi-Format", "Print & Digital"], color: "#EC4899" },
  { title: "Review Cycle", subtitle: "Refine together", description: "Collaborative feedback rounds to perfect your designs while maintaining creative integrity and brand alignment.", features: ["Stakeholder Review", "Revision Rounds", "Design Iteration", "Final Approval"], color: "#3B82F6" },
  { title: "Asset Delivery", subtitle: "Ready to use", description: "Deliver finalized assets in all required formats with brand guidelines and usage documentation.", features: ["Multi-Format Export", "Brand Guidelines", "Source Files", "Usage Training"], color: "#06B6D4" }
];

export const ecommerceFlipCards: [FlipCardConfig, FlipCardConfig, FlipCardConfig, FlipCardConfig, FlipCardConfig] = [
  { title: "Store Blueprint", subtitle: "Plan your shop", description: "Analyze your product catalog, target customers, and business model to build the ideal e-commerce experience.", features: ["Product Catalog", "Market Research", "Pricing Structure", "Platform Selection"], color: "#0EA5E9" },
  { title: "UX Shopping", subtitle: "Design to convert", description: "Create intuitive shopping experiences with optimized product pages, filtering, and streamlined checkout flows.", features: ["Product Pages", "Smart Filters", "Cart Design", "Mobile-First UX"], color: "#8B5CF6" },
  { title: "Store Build", subtitle: "Powerful e-commerce", description: "Build your store on Shopify, WooCommerce, or custom platforms with advanced features and integrations.", features: ["Shopify / WooCommerce", "Custom Features", "Inventory System", "Admin Dashboard"], color: "#EC4899" },
  { title: "Payments & Ship", subtitle: "Seamless operations", description: "Integrate secure payment gateways, shipping providers, and business tools for smooth day-to-day operations.", features: ["Payment Gateways", "Shipping Integration", "CRM Connect", "Analytics Setup"], color: "#3B82F6" },
  { title: "Grow Sales", subtitle: "Scale your revenue", description: "Implement conversion optimization, catalog refinements, and retention workflows to continuously grow your online sales.", features: ["Catalog Optimization", "Email Automation", "Cart Recovery", "Conversion Optimization"], color: "#06B6D4" }
];
