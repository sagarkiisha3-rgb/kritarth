import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Wind,
  Activity,
  Layers,
  ShieldAlert,
  Thermometer,
  AlertTriangle,
  Shield,
  Moon,
  Microscope,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SpecialityMeta {
  badge: string;
  category: string;
  theme: {
    iconBg: string;
    iconBorder: string;
    iconColor: string;
    accentColor: string;
    pillBg: string;
    pillText: string;
    pillBorder: string;
  };
  svgPattern: React.ReactNode;
}

const specialityConfig: Record<string, SpecialityMeta> = {
  asthma: {
    badge: 'Airway Hyper-Reactivity',
    category: 'Allergy & Bronchial Care',
    theme: {
      iconBg: 'bg-teal-50',
      iconBorder: 'border-teal-200/80',
      iconColor: 'text-teal-700',
      accentColor: 'from-teal-500 to-teal-700',
      pillBg: 'bg-teal-50/70',
      pillText: 'text-teal-800',
      pillBorder: 'border-teal-200/60'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-teal-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M10 50 Q 30 20, 50 50 T 90 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 4" />
        <path d="M15 65 Q 40 40, 65 65 T 95 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="75" cy="30" r="3" fill="currentColor" />
        <circle cx="85" cy="38" r="2" fill="currentColor" />
      </svg>
    )
  },
  copd: {
    badge: 'Airflow Limitation',
    category: 'Chronic Bronchitis & Emphysema',
    theme: {
      iconBg: 'bg-cyan-50',
      iconBorder: 'border-cyan-200/80',
      iconColor: 'text-cyan-700',
      accentColor: 'from-cyan-500 to-cyan-700',
      pillBg: 'bg-cyan-50/70',
      pillText: 'text-cyan-800',
      pillBorder: 'border-cyan-200/60'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-cyan-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M15 75 C 35 25, 65 25, 85 75" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M10 82 C 30 45, 70 45, 90 82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" />
        <circle cx="50" cy="32" r="4" fill="currentColor" opacity="0.3" />
      </svg>
    )
  },
  'interstitial-lung-disease': {
    badge: 'Parenchymal Fibrosis',
    category: 'Interstitial & Autoimmune',
    theme: {
      iconBg: 'bg-indigo-50',
      iconBorder: 'border-indigo-200/80',
      iconColor: 'text-indigo-700',
      accentColor: 'from-indigo-500 to-indigo-700',
      pillBg: 'bg-indigo-50/70',
      pillText: 'text-indigo-800',
      pillBorder: 'border-indigo-200/60'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-indigo-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M20 20 L80 20 L80 80 L20 80 Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M20 50 L80 50" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 20 L50 80" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 20 L80 80" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 80 L80 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  bronchiectasis: {
    badge: 'Mucociliary Deficit',
    category: 'Airway Preservation & Clearance',
    theme: {
      iconBg: 'bg-amber-50',
      iconBorder: 'border-amber-200/80',
      iconColor: 'text-amber-700',
      accentColor: 'from-amber-500 to-amber-700',
      pillBg: 'bg-amber-50/70',
      pillText: 'text-amber-800',
      pillBorder: 'border-amber-200/60'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-amber-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="8" fill="currentColor" />
        <path d="M25 50 L75 50" stroke="currentColor" strokeWidth="1" />
      </svg>
    )
  },
  'pulmonary-infections': {
    badge: 'Microbial Diagnostics',
    category: 'Acute & Complicated Pneumonia',
    theme: {
      iconBg: 'bg-rose-50',
      iconBorder: 'border-rose-200/80',
      iconColor: 'text-rose-700',
      accentColor: 'from-rose-500 to-rose-700',
      pillBg: 'bg-rose-50/70',
      pillText: 'text-rose-800',
      pillBorder: 'border-rose-200/60'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-rose-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M50 18 L76 33 L76 67 L50 82 L24 67 L24 33 Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="5" fill="currentColor" />
      </svg>
    )
  },
  tuberculosis: {
    badge: 'Molecular CBNAAT Care',
    category: 'Pulmonary & MDR-TB Regimens',
    theme: {
      iconBg: 'bg-orange-50',
      iconBorder: 'border-orange-200/80',
      iconColor: 'text-orange-700',
      accentColor: 'from-orange-500 to-orange-700',
      pillBg: 'bg-orange-50/70',
      pillText: 'text-orange-800',
      pillBorder: 'border-orange-200/60'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-orange-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M50 15 L85 75 L15 75 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M50 36 L50 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="65" r="2" fill="currentColor" />
      </svg>
    )
  },
  'pleural-disease': {
    badge: 'Ultrasound Guided',
    category: 'Effusion, Empyema & Pneumothorax',
    theme: {
      iconBg: 'bg-emerald-50',
      iconBorder: 'border-emerald-200/80',
      iconColor: 'text-emerald-700',
      accentColor: 'from-emerald-500 to-emerald-700',
      pillBg: 'bg-emerald-50/70',
      pillText: 'text-emerald-800',
      pillBorder: 'border-emerald-200/60'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-emerald-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M50 15 C 65 15, 80 30, 80 50 C 80 75, 50 85, 50 85 C 50 85, 20 75, 20 50 C 20 30, 35 15, 50 15 Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M35 48 C 45 42, 55 42, 65 48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 58 C 42 52, 58 52, 70 58" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
      </svg>
    )
  },
  'sleep-apnea': {
    badge: 'Polysomnography & CPAP',
    category: 'Sleep Disordered Breathing',
    theme: {
      iconBg: 'bg-purple-50',
      iconBorder: 'border-purple-200/80',
      iconColor: 'text-purple-700',
      accentColor: 'from-purple-500 to-purple-700',
      pillBg: 'bg-purple-50/70',
      pillText: 'text-purple-800',
      pillBorder: 'border-purple-200/60'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-purple-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M68 25 A 28 28 0 1 1 40 65 A 22 22 0 0 0 68 25" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="75" cy="40" r="2" fill="currentColor" />
        <circle cx="82" cy="52" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  bronchoscopy: {
    badge: 'Endoscopic Diagnostics',
    category: 'Airway Visualization & Biopsy',
    theme: {
      iconBg: 'bg-teal-50',
      iconBorder: 'border-teal-200/80',
      iconColor: 'text-teal-700',
      accentColor: 'from-teal-500 to-teal-700',
      pillBg: 'bg-teal-50/70',
      pillText: 'text-teal-800',
      pillBorder: 'border-teal-200/60'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-teal-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="38" r="18" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="38" r="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" />
        <path d="M50 56 L50 82" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 82 L58 82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
};

export const SpecialitiesSection: React.FC = () => {
  const { services, navigate } = useApp();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Exact 9 requested services in clinical sequence
  const targetSlugs = [
    'asthma',
    'copd',
    'interstitial-lung-disease',
    'bronchiectasis',
    'pulmonary-infections',
    'tuberculosis',
    'pleural-disease',
    'sleep-apnea',
    'bronchoscopy'
  ];

  // Retrieve services in exact sequence, falling back to clean defaults if needed
  const displayServices = targetSlugs.map((slug) => {
    const found = services.find((s) => s.slug === slug);
    if (found) return found;
    return {
      id: slug,
      title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      slug,
      shortDescription: 'Comprehensive specialist evaluation and therapeutic management.',
      category: 'condition',
      iconName: 'Wind',
      hidden: false
    };
  });

  const totalServices = displayServices.length;

  const getServiceIcon = (slug: string, className: string) => {
    switch (slug) {
      case 'asthma':
        return <Wind className={className} />;
      case 'copd':
        return <Activity className={className} />;
      case 'interstitial-lung-disease':
        return <Layers className={className} />;
      case 'bronchiectasis':
        return <ShieldAlert className={className} />;
      case 'pulmonary-infections':
        return <Thermometer className={className} />;
      case 'tuberculosis':
        return <AlertTriangle className={className} />;
      case 'pleural-disease':
        return <Shield className={className} />;
      case 'sleep-apnea':
        return <Moon className={className} />;
      case 'bronchoscopy':
        return <Microscope className={className} />;
      default:
        return <Wind className={className} />;
    }
  };

  // Check scroll position and calculate current active index
  const updateScrollState = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollPrev(scrollLeft > 10);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);

    const firstCard = sliderRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 360;
    const index = Math.min(
      Math.max(0, Math.round(scrollLeft / cardWidth)),
      totalServices - 1
    );
    setActiveIndex(index);
  }, [totalServices]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    updateScrollState();

    return () => {
      slider.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  // Gentle auto-advance (only when not paused / hovered / touched)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (!sliderRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

      if (scrollLeft >= scrollWidth - clientWidth - 15) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const firstCard = sliderRef.current.firstElementChild as HTMLElement | null;
        const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 360;
        sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 7000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Programmatic scroll handlers
  const scrollPrev = () => {
    if (!sliderRef.current) return;
    const firstCard = sliderRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 360;
    sliderRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!sliderRef.current) return;
    const firstCard = sliderRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 360;
    sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  const scrollToCard = (index: number) => {
    if (!sliderRef.current) return;
    const firstCard = sliderRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 360;
    sliderRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    sliderRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="specialities-section"
      className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#f8fcfd] via-white to-[#f5fbfb] border-y border-slate-100/90"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      aria-label="Clinical Specializations and Comprehensive Lung Care"
    >
      {/* ========================================================= */}
      {/* BACKGROUND ACCENTS: Medical Grid + Pulmonary Streamlines */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Subtle dot matrix grid */}
        <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="speciality-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="1" fill="#0d9488" fillOpacity="0.09" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#speciality-dots)" />
        </svg>

        {/* Ambient Respiratory Auras */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[360px] rounded-full bg-gradient-to-tr from-teal-100/30 via-cyan-100/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-8 left-10 w-96 h-96 rounded-full bg-teal-50/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyan-50/50 blur-3xl pointer-events-none" />

        {/* Faint respiratory streamline vectors */}
        <svg
          className="w-full h-full min-w-[1100px] opacity-35 absolute top-0 left-0"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-40 220 C 340 120, 720 300, 1140 180 C 1300 130, 1420 200, 1500 190"
            stroke="#0d9488"
            strokeWidth="1.5"
            strokeOpacity="0.14"
            strokeDasharray="4 8"
          />
          <path
            d="M0 450 C 420 340, 840 520, 1220 390 C 1360 350, 1450 400, 1500 380"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeOpacity="0.12"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* ========================================================= */}
        {/* SECTION HEADER: Pill Badge + Main Heading + Supporting  */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          
          {/* Header Left: Pill Badge + Main Heading */}
          <div className="max-w-2xl">
            {/* 1. Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-teal-200/90 text-teal-800 text-xs font-semibold tracking-wider uppercase mb-4 shadow-2xs backdrop-blur-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span className="font-heading font-bold">CLINICAL SPECIALIZATIONS</span>
            </motion.div>

            {/* 2. Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15]"
            >
              Comprehensive Lung &amp;{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">
                Respiratory Care
              </span>
            </motion.h2>
          </div>

          {/* Header Right: Supporting Text */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="max-w-md self-start md:self-end"
          >
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Advanced diagnostic workup, physiological testing, and evidence-based therapeutic care for acute and chronic pulmonary disorders.
            </p>
          </motion.div>

        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE CAROUSEL / SLIDER WRAPPER                     */}
        {/* Contextual navigation arrows over the card area edges    */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group/slider -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
        >
          {/* Edge Gradients for Visual Depth & Arrow Contrast */}
          <div
            className={`pointer-events-none absolute left-0 top-0 bottom-8 w-12 sm:w-16 bg-gradient-to-r from-[#f8fcfd] via-[#f8fcfd]/80 to-transparent z-10 transition-opacity duration-300 ${
              canScrollPrev ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`pointer-events-none absolute right-0 top-0 bottom-8 w-12 sm:w-16 bg-gradient-to-l from-[#f5fbfb] via-[#f5fbfb]/80 to-transparent z-10 transition-opacity duration-300 ${
              canScrollNext ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Left Floating Navigation Arrow */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous clinical specialities"
            className={`absolute left-3 sm:left-5 lg:left-7 top-[46%] -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
              !canScrollPrev
                ? 'opacity-0 pointer-events-none scale-90 -translate-x-3'
                : 'opacity-70 sm:opacity-90 lg:opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0 group-hover/slider:scale-100 -translate-x-1'
            } bg-white/95 backdrop-blur-md border border-slate-200/90 text-teal-800 shadow-md shadow-slate-900/10 hover:bg-teal-600 hover:text-white hover:border-teal-600 hover:shadow-lg hover:shadow-teal-900/20 hover:scale-108 active:scale-95`}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.4]" />
          </button>

          {/* Right Floating Navigation Arrow */}
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next clinical specialities"
            className={`absolute right-3 sm:right-5 lg:right-7 top-[46%] -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
              !canScrollNext
                ? 'opacity-0 pointer-events-none scale-90 translate-x-3'
                : 'opacity-70 sm:opacity-90 lg:opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0 group-hover/slider:scale-100 translate-x-1'
            } bg-white/95 backdrop-blur-md border border-slate-200/90 text-teal-800 shadow-md shadow-slate-900/10 hover:bg-teal-600 hover:text-white hover:border-teal-600 hover:shadow-lg hover:shadow-teal-900/20 hover:scale-108 active:scale-95`}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.4]" />
          </button>

          {/* Horizontal Slider Track */}
          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            className={`flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory select-none ${
              isDragging ? 'cursor-grabbing scroll-auto' : 'cursor-grab scroll-smooth'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Clinical Specializations carousel"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') scrollPrev();
              if (e.key === 'ArrowRight') scrollNext();
            }}
          >
            {displayServices.map((service, index) => {
              const meta = specialityConfig[service.slug] || specialityConfig.asthma;
              const isActive = index === activeIndex;
              const serviceNumber = String(index + 1).padStart(2, '0');

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.08, 0.45),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  onClick={() => navigate('condition', service.slug)}
                  className={`snap-start shrink-0 group relative rounded-[24px] p-6 sm:p-7 bg-white/95 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden ${
                    /* Responsive Card Widths:
                       Mobile: 84vw (1 card + preview of next)
                       Tablet: 345px (~2 cards visible)
                       Desktop: 360px (~3 cards visible)
                    */
                    'w-[84vw] sm:w-[345px] lg:w-[360px] min-h-[350px]'
                  } ${
                    isActive
                      ? 'border-teal-300 ring-2 ring-teal-500/15 shadow-xl shadow-teal-950/10'
                      : 'border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-teal-950/10 hover:border-teal-300'
                  } hover:-translate-y-2`}
                >
                  {/* Subtle Top Gradient Accent Strip */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${meta.theme.accentColor} opacity-70 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Micro Visual SVG Graphic in background */}
                  <div className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {meta.svgPattern}
                  </div>

                  {/* Card Content Top Area */}
                  <div className="relative z-10">
                    
                    {/* Top Row: Icon + Service Number */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      {/* Premium Soft-Color Icon Container */}
                      <div
                        className={`w-13 h-13 rounded-2xl ${meta.theme.iconBg} border ${meta.theme.iconBorder} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}
                      >
                        {getServiceIcon(service.slug, `w-6 h-6 ${meta.theme.iconColor} stroke-[2.2]`)}
                      </div>

                      {/* Service Number Badge */}
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-slate-50 text-slate-400 border border-slate-100 group-hover:bg-teal-50 group-hover:text-teal-700 group-hover:border-teal-200/60 transition-colors">
                        {serviceNumber}
                      </span>
                    </div>

                    {/* Category Subhead */}
                    <span className="text-[11px] uppercase tracking-wider font-bold text-teal-700 block mb-1">
                      {meta.category}
                    </span>

                    {/* Service Title */}
                    <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl mb-2.5 group-hover:text-teal-800 transition-colors tracking-tight leading-snug">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Card Content Bottom CTA Strip */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-heading font-bold text-teal-700 group-hover:text-teal-800 transition-colors">
                    <span className="flex items-center gap-1.5">
                      <span>View Details</span>
                    </span>
                    <div className="w-7 h-7 rounded-full bg-teal-50 group-hover:bg-teal-600 text-teal-700 group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* SLIDER PROGRESS & COUNTER INDICATOR: 01 ━━━━━━━ 09         */}
        {/* ========================================================= */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          
          {/* Step Numbers & Track Line */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="font-mono text-xs font-bold text-teal-700">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>

            {/* Clickable Progress Dots/Bars Track */}
            <div className="flex items-center gap-1.5 flex-1 sm:w-60 h-3 bg-slate-100/90 rounded-full px-1.5">
              {displayServices.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(i)}
                  aria-label={`Go to clinical service ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? 'w-7 bg-teal-600'
                      : 'w-2 bg-slate-300 hover:bg-teal-300'
                  }`}
                />
              ))}
            </div>

            <span className="font-mono text-xs font-medium text-slate-400">
              {String(totalServices).padStart(2, '0')}
            </span>
          </div>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            Click any service card for comprehensive disease overview and management
          </span>
        </div>

      </div>
    </section>
  );
};
