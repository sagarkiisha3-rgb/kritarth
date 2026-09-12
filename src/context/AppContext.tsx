import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  WebsiteSettings,
  ConditionService,
  BlogPost,
  Testimonial,
  DoctorVideo,
  MediaItem,
  AppointmentLead
} from '../types';
import {
  initialSettings,
  initialServices,
  initialBlogs,
  initialTestimonials,
  initialVideos,
  initialMedia
} from '../data/defaultData';
import doctorKritarthClinicHero from '../assets/images/doctor_kritarth_clinic_hero.webp';

// Hero image fields that need to always resolve to the correct bundled image
// if no valid admin-uploaded URL exists.
const HERO_IMAGE_FIELDS = [
  'heroImageUrl',
  'heroImageUrlDesktop',
  'heroImageUrlMobile',
  'heroDoctorImage',
] as const;

/**
 * Returns true if the given hero image value should be ignored and replaced
 * with the bundled portrait.
 *
 * Invalid values:
 *   - falsy / empty string
 *   - /src/assets/... paths — these are Vite dev-mode source paths that
 *     DO NOT exist as stable URLs in production builds. They look correct
 *     in dev but break after a Vite build where assets get hashed.
 *   - /uploads/ paths that point to a now-deleted old image
 */
function isStaleHeroUrl(val: unknown): boolean {
  if (!val || typeof val !== 'string' || val.trim() === '') return true;
  if (val.startsWith('/src/assets/')) return true;
  if (val.startsWith('/uploads/')) return true;
  return false;
}

/** Strip stale hero URLs from a settings object, replacing with the bundled portrait. */
function sanitizeHeroFields(obj: Record<string, unknown>): void {
  for (const field of HERO_IMAGE_FIELDS) {
    if (isStaleHeroUrl(obj[field])) {
      obj[field] = doctorKritarthClinicHero;
    }
  }
}

interface AdminAuth {
  isAuthenticated: boolean;
  token: string | null;
  user: { email: string; name: string } | null;
}

interface AppContextType {
  settings: WebsiteSettings;
  services: ConditionService[];
  blogs: BlogPost[];
  testimonials: Testimonial[];
  videos: DoctorVideo[];
  media: MediaItem[];
  appointments: AppointmentLead[];
  activeRoute: string;
  selectedConditionSlug: string | null;
  selectedBlogSlug: string | null;
  adminAuth: AdminAuth;
  isAppointmentModalOpen: boolean;
  appointmentPrefill: { concern?: string; location?: string };
  toastMessage: string | null;
  
  // Navigation
  navigate: (route: string, param?: string | null) => void;
  openAppointmentModal: (prefill?: { concern?: string; location?: string }) => void;
  closeAppointmentModal: () => void;
  showToast: (msg: string) => void;
  
  // Admin Auth
  loginAdmin: (token: string, user: { email: string; name: string }) => void;
  logoutAdmin: () => void;

  // Actions
  updateSettings: (newSettings: Partial<WebsiteSettings>) => Promise<boolean>;
  submitAppointment: (lead: Omit<AppointmentLead, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateAppointmentStatus: (id: string, status: AppointmentLead['status']) => Promise<boolean>;
  deleteAppointment: (id: string) => Promise<boolean>;
  saveService: (service: Partial<ConditionService>) => Promise<boolean>;
  deleteService: (id: string) => Promise<boolean>;
  saveBlog: (blog: Partial<BlogPost>) => Promise<boolean>;
  deleteBlog: (id: string) => Promise<boolean>;
  saveTestimonial: (test: Partial<Testimonial>) => Promise<boolean>;
  deleteTestimonial: (id: string) => Promise<boolean>;
  saveVideo: (video: Partial<DoctorVideo>) => Promise<boolean>;
  deleteVideo: (id: string) => Promise<boolean>;
  uploadMedia: (file: File, category: string, altText?: string, caption?: string) => Promise<MediaItem | null>;
  addMediaByUrl: (url: string, category: string, altText?: string, caption?: string) => Promise<MediaItem | null>;
  updateMedia: (id: string, updates: Partial<MediaItem>) => Promise<boolean>;
  deleteMedia: (id: string) => Promise<boolean>;
  reloadAllData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('drk_website_settings');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed && typeof parsed === 'object') {
            // MIGRATION: clear old phone numbers from cached settings
            if (parsed.phonePrimary && parsed.phonePrimary.includes('98765')) {
              parsed.phonePrimary = "+91 7986148502";
            }
            if (parsed.whatsappNumber && parsed.whatsappNumber.includes('98765')) {
              parsed.whatsappNumber = "+917986148502";
            }
            const merged = { ...initialSettings, ...parsed } as Record<string, unknown>;
            sanitizeHeroFields(merged);
            return merged as unknown as WebsiteSettings;
          }
        }
      } catch (e) {
        console.warn('Failed to load cached settings', e);
      }
    }
    return initialSettings;
  });
  const [services, setServices] = useState<ConditionService[]>(initialServices);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [videos, setVideos] = useState<DoctorVideo[]>(initialVideos);
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [appointments, setAppointments] = useState<AppointmentLead[]>([]);
  
  // Routing state
  const [activeRoute, setActiveRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/admin')) {
        return 'admin';
      }
      if (path.startsWith('/blogs')) {
        return 'blogs';
      }
      if (path.startsWith('/contact')) {
        return 'contact';
      }
    }
    return 'home';
  });
  const [selectedConditionSlug, setSelectedConditionSlug] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/conditions/')) {
        return path.replace('/conditions/', '');
      }
    }
    return null;
  });
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  // Appointment Modal
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentPrefill, setAppointmentPrefill] = useState<{ concern?: string; location?: string }>({});

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Admin Auth
  const [adminAuth, setAdminAuth] = useState<AdminAuth>(() => {
    const saved = localStorage.getItem('drk_admin_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { isAuthenticated: false, token: null, user: null };
      }
    }
    return { isAuthenticated: false, token: null, user: null };
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Keep browser URL in sync without full reload
  const navigate = (route: string, param?: string | null) => {
    setActiveRoute(route);
    if (route === 'condition') {
      setSelectedConditionSlug(param || 'asthma');
      setSelectedBlogSlug(null);
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', `/conditions/${param || 'asthma'}`);
      }
    } else if (route === 'blog-detail') {
      setSelectedBlogSlug(param || null);
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', `/blogs/${param || ''}`);
      }
    } else if (route === 'admin') {
      setSelectedConditionSlug(null);
      setSelectedBlogSlug(null);
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/admin');
      }
    } else if (route === 'home') {
      setSelectedConditionSlug(null);
      setSelectedBlogSlug(null);
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/');
      }
    } else {
      setSelectedConditionSlug(null);
      setSelectedBlogSlug(null);
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', `/${route}`);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle browser back and forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/admin')) {
        setActiveRoute('admin');
      } else if (path.startsWith('/conditions/')) {
        const slug = path.replace('/conditions/', '');
        setSelectedConditionSlug(slug);
        setActiveRoute('condition');
      } else if (path.startsWith('/blogs')) {
        setActiveRoute('blogs');
      } else if (path.startsWith('/contact')) {
        setActiveRoute('contact');
      } else {
        setActiveRoute('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openAppointmentModal = (prefill?: { concern?: string; location?: string }) => {
    setAppointmentPrefill(prefill || {});
    setIsAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
  };

  const loginAdmin = (token: string, user: { email: string; name: string }) => {
    const authData = { isAuthenticated: true, token, user };
    setAdminAuth(authData);
    localStorage.setItem('drk_admin_auth', JSON.stringify(authData));
    showToast(`Welcome back, ${user.name}`);
  };

  const logoutAdmin = () => {
    const authData = { isAuthenticated: false, token: null, user: null };
    setAdminAuth(authData);
    localStorage.removeItem('drk_admin_auth');
    showToast('Signed out of admin dashboard');
    navigate('home');
  };

  // Fetch initial data from server API
  const reloadAllData = async () => {
    try {
      const [resSettings, resServices, resBlogs, resTestimonials, resVideos, resMedia, resAppt] = await Promise.all([
        fetch('/api/settings').catch(() => null),
        fetch('/api/services').catch(() => null),
        fetch('/api/blogs').catch(() => null),
        fetch('/api/testimonials').catch(() => null),
        fetch('/api/videos').catch(() => null),
        fetch('/api/media').catch(() => null),
        fetch('/api/appointments').catch(() => null)
      ]);

      if (resSettings && resSettings.ok) {
        const data = await resSettings.json();
        setSettings((prev) => {
          // Sanitize API response: never let a raw /src/assets/ or /uploads/ path
          // overwrite the correctly-resolved bundled Vite import.
          const sanitizedData = { ...data } as Record<string, unknown>;
          sanitizeHeroFields(sanitizedData);
          const updated = { ...prev, ...sanitizedData };
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem('drk_website_settings', JSON.stringify(updated));
            }
          } catch (e) {
            console.warn('Failed to cache settings in localStorage', e);
          }
          return updated as WebsiteSettings;
        });
      }
      if (resServices && resServices.ok) {
        const data = await resServices.json();
        if (Array.isArray(data) && data.length > 0) setServices(data);
      }
      if (resBlogs && resBlogs.ok) {
        const data = await resBlogs.json();
        if (Array.isArray(data) && data.length > 0) setBlogs(data);
      }
      if (resTestimonials && resTestimonials.ok) {
        const data = await resTestimonials.json();
        if (Array.isArray(data) && data.length > 0) setTestimonials(data);
      }
      if (resVideos && resVideos.ok) {
        const data = await resVideos.json();
        if (Array.isArray(data) && data.length > 0) setVideos(data);
      }
      if (resMedia && resMedia.ok) {
        const data = await resMedia.json();
        if (Array.isArray(data) && data.length > 0) setMedia(data);
      }
      if (resAppt && resAppt.ok) {
        const data = await resAppt.json();
        if (Array.isArray(data)) setAppointments(data);
      }
    } catch (e) {
      console.warn('Using local fallback data while server connects', e);
    }
  };

  useEffect(() => {
    reloadAllData();
  }, []);

  // Update Settings
  const updateSettings = async (newSettings: Partial<WebsiteSettings>): Promise<boolean> => {
    try {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('drk_website_settings', JSON.stringify(updated));
        }
      } catch (e) {
        console.warn('Failed to cache updated settings in localStorage', e);
      }
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        showToast('Website settings updated successfully');
        return true;
      }
    } catch (e) {
      console.error('Failed to update settings', e);
    }
    return false;
  };

  // Submit appointment lead
  const submitAppointment = async (
    lead: Omit<AppointmentLead, 'id' | 'createdAt' | 'status'>
  ): Promise<boolean> => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.appointment) {
          setAppointments((prev) => [data.appointment, ...prev]);
        }
        return true;
      }
    } catch (e) {
      console.error('Failed to submit appointment', e);
    }
    return false;
  };

  // Update appointment lead status
  const updateAppointmentStatus = async (
    id: string,
    status: AppointmentLead['status']
  ): Promise<boolean> => {
    try {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showToast(`Lead status updated to ${status}`);
        return true;
      }
    } catch (e) {
      console.error('Failed to update lead status', e);
    }
    return false;
  };

  // Delete appointment
  const deleteAppointment = async (id: string): Promise<boolean> => {
    try {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Appointment enquiry removed');
        return true;
      }
    } catch (e) {
      console.error('Failed to delete appointment', e);
    }
    return false;
  };

  // Save / Update condition service
  const saveService = async (service: Partial<ConditionService>): Promise<boolean> => {
    try {
      if (service.id && services.some((s) => s.id === service.id)) {
        setServices((prev) => prev.map((s) => (s.id === service.id ? ({ ...s, ...service } as ConditionService) : s)));
        const res = await fetch(`/api/services/${service.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(service)
        });
        if (res.ok) {
          showToast('Service updated successfully');
          return true;
        }
      } else {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(service)
        });
        if (res.ok) {
          const data = await res.json();
          if (data.service) {
            setServices((prev) => [...prev, data.service]);
          }
          showToast('New service added');
          return true;
        }
      }
    } catch (e) {
      console.error('Failed to save service', e);
    }
    return false;
  };

  const deleteService = async (id: string): Promise<boolean> => {
    try {
      setServices((prev) => prev.filter((s) => s.id !== id && s.slug !== id));
      await fetch(`/api/services/${id}`, { method: 'DELETE' });
      showToast('Service deleted');
      return true;
    } catch (e) {
      console.error('Failed to delete service', e);
      return false;
    }
  };

  // Blog CRUD
  const saveBlog = async (blog: Partial<BlogPost>): Promise<boolean> => {
    try {
      if (blog.id && blogs.some((b) => b.id === blog.id)) {
        setBlogs((prev) => prev.map((b) => (b.id === blog.id ? ({ ...b, ...blog } as BlogPost) : b)));
        const res = await fetch(`/api/blogs/${blog.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blog)
        });
        if (res.ok) {
          showToast('Blog article updated');
          return true;
        }
      } else {
        const res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blog)
        });
        if (res.ok) {
          const data = await res.json();
          if (data.blog) {
            setBlogs((prev) => [data.blog, ...prev]);
          }
          showToast('New blog article published');
          return true;
        }
      }
    } catch (e) {
      console.error('Failed to save blog', e);
    }
    return false;
  };

  const deleteBlog = async (id: string): Promise<boolean> => {
    try {
      setBlogs((prev) => prev.filter((b) => b.id !== id && b.slug !== id));
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      showToast('Article deleted');
      return true;
    } catch (e) {
      console.error('Failed to delete blog', e);
      return false;
    }
  };

  // Testimonials CRUD
  const saveTestimonial = async (test: Partial<Testimonial>): Promise<boolean> => {
    try {
      if (test.id && testimonials.some((t) => t.id === test.id)) {
        setTestimonials((prev) => prev.map((t) => (t.id === test.id ? ({ ...t, ...test } as Testimonial) : t)));
        await fetch(`/api/testimonials/${test.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(test)
        });
        showToast('Testimonial updated');
        return true;
      } else {
        const res = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(test)
        });
        if (res.ok) {
          const data = await res.json();
          if (data.testimonial) {
            setTestimonials((prev) => [data.testimonial, ...prev]);
          }
          showToast('Testimonial added');
          return true;
        }
      }
    } catch (e) {
      console.error('Failed to save testimonial', e);
    }
    return false;
  };

  const deleteTestimonial = async (id: string): Promise<boolean> => {
    try {
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      showToast('Testimonial removed');
      return true;
    } catch (e) {
      console.error('Failed to delete testimonial', e);
      return false;
    }
  };

  // Video CRUD
  const saveVideo = async (video: Partial<DoctorVideo>): Promise<boolean> => {
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.video) {
          setVideos((prev) => [data.video, ...prev]);
        }
        showToast('Educational video added');
        return true;
      }
    } catch (e) {
      console.error('Failed to add video', e);
    }
    return false;
  };

  const deleteVideo = async (id: string): Promise<boolean> => {
    try {
      setVideos((prev) => prev.filter((v) => v.id !== id));
      await fetch(`/api/videos/${id}`, { method: 'DELETE' });
      showToast('Video entry removed');
      return true;
    } catch (e) {
      console.error('Failed to delete video', e);
      return false;
    }
  };

  // Media Library Upload & CRUD
  const uploadMedia = async (
    file: File,
    category: string,
    altText?: string,
    caption?: string
  ): Promise<MediaItem | null> => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('category', category);
      if (altText) formData.append('altText', altText);
      if (caption) formData.append('caption', caption);

      const res = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        if (data.media) {
          setMedia((prev) => [data.media, ...prev]);
          showToast('Image uploaded and saved permanently to Media Library');
          return data.media;
        }
      }
    } catch (e) {
      console.error('Failed to upload image', e);
    }
    return null;
  };

  const addMediaByUrl = async (
    url: string,
    category: string,
    altText?: string,
    caption?: string
  ): Promise<MediaItem | null> => {
    try {
      const res = await fetch('/api/media/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, category, altText, caption })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.media) {
          setMedia((prev) => [data.media, ...prev]);
          showToast('Image URL added and saved to Media Library');
          return data.media;
        }
      }
    } catch (e) {
      console.error('Failed to add image by URL', e);
    }
    return null;
  };

  const updateMedia = async (id: string, updates: Partial<MediaItem>): Promise<boolean> => {
    try {
      setMedia((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
      const res = await fetch(`/api/media/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        showToast('Media details updated');
        return true;
      }
    } catch (e) {
      console.error('Failed to update media', e);
    }
    return false;
  };

  const deleteMedia = async (id: string): Promise<boolean> => {
    try {
      setMedia((prev) => prev.filter((m) => m.id !== id));
      await fetch(`/api/media/${id}`, { method: 'DELETE' });
      showToast('Media item deleted');
      return true;
    } catch (e) {
      console.error('Failed to delete media', e);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        services,
        blogs,
        testimonials,
        videos,
        media,
        appointments,
        activeRoute,
        selectedConditionSlug,
        selectedBlogSlug,
        adminAuth,
        isAppointmentModalOpen,
        appointmentPrefill,
        toastMessage,
        navigate,
        openAppointmentModal,
        closeAppointmentModal,
        showToast,
        loginAdmin,
        logoutAdmin,
        updateSettings,
        submitAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        saveService,
        deleteService,
        saveBlog,
        deleteBlog,
        saveTestimonial,
        deleteTestimonial,
        saveVideo,
        deleteVideo,
        uploadMedia,
        addMediaByUrl,
        updateMedia,
        deleteMedia,
        reloadAllData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
