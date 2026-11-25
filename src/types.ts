export type PageTab = 'home' | 'privacy' | 'playground' | 'blog' | 'faq' | 'contact';

export interface PermissionItem {
  name: string;
  code: string;
  category: 'Storage & Media' | 'Audio & Hardware' | 'System & Alerts' | 'Network';
  purpose: string;
  legacyAlternative?: string;
  requiredFor: string;
}

export interface SDKItem {
  name: string;
  purpose: string;
  dataHandling: string;
  offlineCapability: string;
  link?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Privacy' | 'Features' | 'Performance' | 'Permissions';
}

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: { label: string; text: string }[];
  callout?: { title: string; text: string };
}

export interface BlogHowToStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface BlogComparisonRow {
  feature: string;
  canrot: string;
  cloudApps: string;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  publishedDate: string;
  publishedIso: string;
  updatedIso: string;
  readTime: string;
  author: string;
  keywords: string[];
  heroBadge: string;
  intro: string[];
  keyTakeaways: string[];
  sections: BlogSection[];
  howToTitle: string;
  howToDescription: string;
  howToSteps: BlogHowToStep[];
  comparisonTitle: string;
  comparisonRows: BlogComparisonRow[];
  faqs: BlogFAQ[];
}
