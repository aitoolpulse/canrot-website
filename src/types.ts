export type PageTab = 'home' | 'privacy' | 'playground' | 'faq' | 'contact';

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
