
import React from 'react';

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  activities?: string[];
  mockups?: (string | React.ReactNode)[];
}

export interface BenefitItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  route: string;
  color?: string;
  galleryImages?: string[];
  caseStudyRoute?: string;
  caseStudyLabel?: string;
  galleryItems?: { src: string; title?: string; caseStudyRoute?: string }[];
}

export interface WorkSample {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  detailImages?: string[];
  projectInfo?: string;
  tags: string[];
}
