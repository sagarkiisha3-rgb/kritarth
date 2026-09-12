export interface AddressItem {
  id: string;
  hospital: string;
  address: string;
  timing: string;
  days: string;
  mapEmbedUrl: string;
  mapDirectUrl: string;
}

export interface WebsiteSettings {
  doctorName: string;
  doctorDesignation: string;
  qualifications: string;
  fellowships: string;
  primaryHospital: string;
  heroBadge: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroDoctorImage: string;
  heroImageUrl?: string;
  heroImageUrlDesktop?: string;
  heroImageUrlMobile?: string;
  heroImagePositionDesktop?: string;
  heroImagePositionMobile?: string;
  heroDesktopPositionX?: number;
  heroDesktopPositionY?: number;
  heroDesktopZoom?: number;
  heroMobilePositionX?: number;
  heroMobilePositionY?: number;
  heroMobileZoom?: number;
  heroImageFit?: 'cover' | 'contain';
  heroDisplayMode?: 'portrait' | 'cover' | 'contain' | 'custom';
  heroOverlayStrength?: number;
  heroOverlayDirection?: 'left-to-right' | 'right-to-left' | 'uniform';
  heroImageAlt?: string;
  aboutDoctorImage: string;
  lungsVisualImage: string;
  clinicSuiteImage: string;
  phonePrimary: string;
  phoneEmergency: string;
  whatsappNumber: string;
  email: string;
  addresses: AddressItem[];
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
  };
  analytics: {
    gaMeasurementId: string;
    gscVerification: string;
    metaPixelId: string;
  };
  medicalDisclaimer: string;
  emergencyNotice: string;
  seoDefaults: {
    title: string;
    description: string;
    keywords: string;
  };
}

export interface ConditionService {
  id: string;
  title: string;
  slug: string;
  category: 'condition' | 'interventional' | 'sleep' | 'critical';
  iconName: string;
  featuredImage: string;
  shortDescription: string;
  detailedOverview: string;
  commonSymptoms: string[];
  possibleCauses: string[];
  whenToConsult: string[];
  diagnosisApproach: string[];
  treatmentApproach: string[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
  order: number;
  isFeatured: boolean;
  hidden: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  featuredImage: string;
  date: string;
  author: string;
  tags: string[];
  status: 'published' | 'draft' | 'scheduled';
  readTime: string;
}

export interface AppointmentLead {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  age: number | string;
  preferredLocation: string;
  preferredDate: string;
  concern: string;
  message: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Appointment Scheduled' | 'Completed' | 'Cancelled';
}

export interface Testimonial {
  id: string;
  patientInitials: string;
  conditionTreated: string;
  reviewText: string;
  rating: number;
  date: string;
  location: string;
  isFeatured: boolean;
  isPlaceholder?: boolean;
}

export interface DoctorVideo {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
  duration: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  category: string; // 'Doctor Photos' | 'Hero Images' | 'Lung Conditions' | 'Blog Images' | 'Certificates' | 'Hospital' | 'Testimonials' | 'Videos / Thumbnails'
  altText: string;
  caption: string;
  uploadedAt: string;
  fileSize: string;
  focalPoint?: { x: number; y: number };
  crop?: { x: number; y: number; width: number; height: number };
}

export interface LungHotspot {
  id: string;
  name: string;
  badge: string;
  anatomicalPosition: string;
  description: string;
  conditionsAssociated: string[];
  investigations: string[];
  x: number; // percentage coordinate
  y: number; // percentage coordinate
}
