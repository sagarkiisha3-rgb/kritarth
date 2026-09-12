import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { symptomList } from '../data/defaultData';
import {
  Wind,
  Activity,
  ShieldAlert,
  Moon,
  Coffee,
  Thermometer,
  AlertTriangle,
  Stethoscope,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  AlertOctagon,
  Sparkles
} from 'lucide-react';

interface SymptomMetadata {
  category: string;
  badge: string;
  theme: {
    iconBg: string;
    iconBorder: string;
    iconColor: string;
    accentColor: string;
    hoverGlow: string;
  };
  svgPattern: React.ReactNode;
}

const symptomConfig: Record<string, SymptomMetadata> = {
  cough: {
    category: 'Airway Sensitivity',
    badge: 'Chronic Airway',
    theme: {
      iconBg: 'bg-teal-50',
      iconBorder: 'border-teal-200/80',
      iconColor: 'text-teal-700',
      accentColor: 'from-teal-500 to-teal-700',
      hoverGlow: 'group-hover:border-teal-300'
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
  sob: {
    category: 'Ventilation Deficit',
    badge: 'Dyspnea Evaluation',
    theme: {
      iconBg: 'bg-cyan-50',
      iconBorder: 'border-cyan-200/80',
      iconColor: 'text-cyan-700',
      accentColor: 'from-cyan-500 to-cyan-700',
      hoverGlow: 'group-hover:border-cyan-300'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-cyan-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M20 75 C 35 25, 65 25, 80 75" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M10 82 C 30 45, 70 45, 90 82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" />
      </svg>
    )
  },
  wheezing: {
    category: 'Bronchial Constriction',
    badge: 'Airway Resistance',
    theme: {
      iconBg: 'bg-blue-50',
      iconBorder: 'border-blue-200/80',
      iconColor: 'text-blue-700',
      accentColor: 'from-blue-500 to-blue-700',
      hoverGlow: 'group-hover:border-blue-300'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-blue-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M5 50 Q 20 20, 35 50 T 65 50 T 95 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 65 Q 25 35, 40 65 T 70 65 T 100 65" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>
    )
  },
  congestion: {
    category: 'Mucociliary Clearance',
    badge: 'Secretions & Sputum',
    theme: {
      iconBg: 'bg-amber-50',
      iconBorder: 'border-amber-200/80',
      iconColor: 'text-amber-700',
      accentColor: 'from-amber-500 to-amber-700',
      hoverGlow: 'group-hover:border-amber-300'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-amber-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="6" fill="currentColor" />
      </svg>
    )
  },
  snoring: {
    category: 'Sleep-Disordered Breathing',
    badge: 'Upper Airway Collapse',
    theme: {
      iconBg: 'bg-purple-50',
      iconBorder: 'border-purple-200/80',
      iconColor: 'text-purple-700',
      accentColor: 'from-purple-500 to-purple-700',
      hoverGlow: 'group-hover:border-purple-300'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-purple-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M70 30 A 25 25 0 1 1 45 60 A 20 20 0 0 0 70 30" fill="currentColor" opacity="0.4" />
        <path d="M15 70 Q 30 55, 50 70 T 85 70" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
      </svg>
    )
  },
  sleepiness: {
    category: 'Sleep Architecture',
    badge: 'Excessive Somnolence',
    theme: {
      iconBg: 'bg-indigo-50',
      iconBorder: 'border-indigo-200/80',
      iconColor: 'text-indigo-700',
      accentColor: 'from-indigo-500 to-indigo-700',
      hoverGlow: 'group-hover:border-indigo-300'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-indigo-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M15 50 C 35 30, 65 70, 85 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="28" cy="38" r="2.5" fill="currentColor" />
        <circle cx="72" cy="62" r="2.5" fill="currentColor" />
      </svg>
    )
  },
  infections: {
    category: 'Recurrent Infection',
    badge: 'Bronchial Defense',
    theme: {
      iconBg: 'bg-rose-50',
      iconBorder: 'border-rose-200/80',
      iconColor: 'text-rose-700',
      accentColor: 'from-rose-500 to-rose-700',
      hoverGlow: 'group-hover:border-rose-300'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-rose-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 35 L50 65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M35 50 L65 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  hemoptysis: {
    category: 'Urgent Clinical Sign',
    badge: 'Immediate Workup',
    theme: {
      iconBg: 'bg-red-50',
      iconBorder: 'border-red-200/80',
      iconColor: 'text-red-700',
      accentColor: 'from-red-500 to-red-700',
      hoverGlow: 'group-hover:border-red-300'
    },
    svgPattern: (
      <svg className="w-24 h-24 text-red-600/10 pointer-events-none" viewBox="0 0 100 100" fill="none">
        <path d="M50 15 C 50 15, 25 50, 25 68 A 25 25 0 0 0 75 68 C 75 50, 50 15, 50 15 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
        <path d="M50 45 L50 62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50" cy="70" r="1.5" fill="currentColor" />
      </svg>
    )
  }
};

export const SymptomNavigation: React.FC = () => {
  const { navigate } = useApp();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const totalSymptoms = symptomList.length;

  // Icon mapping with modern Lucide components
  const getSymptomIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className={className} />;
      case 'Wind':
        return <Wind className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      case 'Moon':
        return <Moon className={className} />;
      case 'Coffee':
        return <Coffee className={className} />;
      case 'Thermometer':
        return <Thermometer className={className} />;
      case 'AlertTriangle':
        return <AlertTriangle className={className} />;
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

    // Calculate approx visible index
    const cardWidth = sliderRef.current.firstElementChild
      ? (sliderRef.current.firstElementChild as HTMLElement).offsetWidth + 20
      : 300;
    const index = Math.min(
      Math.max(0, Math.round(scrollLeft / cardWidth)),
      totalSymptoms - 1
    );
    setActiveIndex(index);
  }, [totalSymptoms]);

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
        // Smoothly loop back to start
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        const cardWidth = sliderRef.current.firstElementChild
          ? (sliderRef.current.firstElementChild as HTMLElement).offsetWidth + 20
          : 300;
        sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 6500);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Programmatic scroll handlers
  const scrollPrev = () => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.firstElementChild
      ? (sliderRef.current.firstElementChild as HTMLElement).offsetWidth + 20
      : 300;
    sliderRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.firstElementChild
      ? (sliderRef.current.firstElementChild as HTMLElement).offsetWidth + 20
      : 300;
    sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  const scrollToCard = (index: number) => {
    if (!sliderRef.current) return;
    const cardWidth = sliderRef.current.firstElementChild
      ? (sliderRef.current.firstElementChild as HTMLElement).offsetWidth + 20
      : 300;
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
      id="symptom-navigator-section"
      className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-[#f5fafb] via-[#f9fdfe] to-white border-y border-slate-100/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      aria-label="Respiratory Symptom Navigator"
    >
      {/* ========================================================= */}
      {/* BACKGROUND ACCENTS: Subtle Airflow Curves & Radial Aura   */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Medical Grid Dots */}
        <svg className="w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="symptom-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="1" fill="#0f766e" fillOpacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#symptom-dots)" />
        </svg>

        {/* Ambient Respiratory Aura behind the carousel */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-gradient-to-tr from-teal-100/35 via-cyan-100/25 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-cyan-100/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-teal-100/20 blur-3xl pointer-events-none" />

        {/* Abstract pulmonary streamlines */}
        <svg
          className="w-full h-full min-w-[1100px] opacity-40 absolute top-0 left-0"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-50 180 C 320 80, 680 260, 1100 160 C 1280 120, 1420 180, 1500 170"
            stroke="#0d9488"
            strokeWidth="1.5"
            strokeOpacity="0.16"
            strokeDasharray="4 8"
          />
          <path
            d="M0 420 C 400 320, 800 500, 1200 380 C 1350 340, 1450 390, 1500 370"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeOpacity="0.14"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* ========================================================= */}
        {/* SECTION HEADER: Badge + Headline                          */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          
          {/* Header Left: Hierarchy with Badge & Accent Title */}
          <div className="max-w-2xl">
            {/* 1. Small Pill Badge */}
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
              <span className="font-heading font-bold">SYMPTOM NAVIGATOR</span>
            </motion.div>

            {/* 2. Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-heading font-extrabold text-slate-900 tracking-tight leading-[1.15]"
            >
              What&apos;s Troubling{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">
                Your Breathing?
              </span>
            </motion.h2>

            {/* 3. Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-sm sm:text-base text-slate-600 font-normal mt-3 leading-relaxed"
            >
              Explore common respiratory symptoms to understand clinical pathways, differential diagnoses,
              and advanced evaluations by Dr. Kritarth.
            </motion.p>
          </div>

          {/* Subtle Right Metadata Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50/70 border border-teal-200/60 text-xs font-semibold text-teal-800 self-start md:self-end"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
            <span>Interactive Clinical Explorer</span>
          </motion.div>

        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE CAROUSEL / SLIDER WRAPPER                     */}
        {/* Arrows float contextually over the edges of the cards     */}
        {/* ========================================================= */}
        <div className="relative group/slider -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          
          {/* Edge Gradients for Visual Depth & High-Contrast Arrow Backdrop */}
          <div
            className={`pointer-events-none absolute left-0 top-0 bottom-8 w-12 sm:w-16 bg-gradient-to-r from-[#f5fafb] via-[#f5fafb]/70 to-transparent z-10 transition-opacity duration-300 ${
              canScrollPrev ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div
            className={`pointer-events-none absolute right-0 top-0 bottom-8 w-12 sm:w-16 bg-gradient-to-l from-white via-white/70 to-transparent z-10 transition-opacity duration-300 ${
              canScrollNext ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Left Floating Navigation Arrow - Overlapping Left Edge */}
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous respiratory symptoms"
            className={`absolute left-3 sm:left-5 lg:left-7 top-[46%] -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
              !canScrollPrev
                ? 'opacity-0 pointer-events-none scale-90 -translate-x-3'
                : 'opacity-70 sm:opacity-90 lg:opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0 group-hover/slider:scale-100 -translate-x-1'
            } bg-white/95 backdrop-blur-md border border-slate-200/90 text-teal-800 shadow-md shadow-slate-900/10 hover:bg-teal-600 hover:text-white hover:border-teal-600 hover:shadow-lg hover:shadow-teal-900/20 hover:scale-108 active:scale-95`}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.4]" />
          </button>

          {/* Right Floating Navigation Arrow - Overlapping Right Edge */}
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next respiratory symptoms"
            className={`absolute right-3 sm:right-5 lg:right-7 top-[46%] -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
              !canScrollNext
                ? 'opacity-0 pointer-events-none scale-90 translate-x-3'
                : 'opacity-70 sm:opacity-90 lg:opacity-0 group-hover/slider:opacity-100 group-hover/slider:translate-x-0 group-hover/slider:scale-100 translate-x-1'
            } bg-white/95 backdrop-blur-md border border-slate-200/90 text-teal-800 shadow-md shadow-slate-900/10 hover:bg-teal-600 hover:text-white hover:border-teal-600 hover:shadow-lg hover:shadow-teal-900/20 hover:scale-108 active:scale-95`}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.4]" />
          </button>

          <div
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            className={`flex gap-5 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory select-none ${
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
            aria-label="Symptom carousel"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') scrollPrev();
              if (e.key === 'ArrowRight') scrollNext();
            }}
          >
            {symptomList.map((item, index) => {
              const meta = symptomConfig[item.id] || symptomConfig.cough;
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.08, 0.4),
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  onClick={() => navigate('condition', item.targetSlug)}
                  className={`snap-start shrink-0 group relative rounded-[24px] p-6 sm:p-7 bg-white/95 backdrop-blur-md border transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden ${
                    /* Responsive Card Widths:
                       Mobile: 82vw (1.1 cards visible)
                       Tablet: 340px (2 to 2.5 cards)
                       Desktop: 320px (~3.8 cards visible)
                    */
                    'w-[82vw] sm:w-[340px] lg:w-[320px] min-h-[340px]'
                  } ${
                    isActive
                      ? 'border-teal-300 ring-2 ring-teal-500/15 shadow-xl shadow-teal-950/10'
                      : 'border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-teal-950/10 hover:border-teal-300'
                  } hover:-translate-y-2`}
                >
                  {/* Subtle Top Gradient Accent Strip */}
                  <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${meta.theme.accentColor} opacity-70 group-hover:opacity-100 transition-opacity`} />

                  {/* Micro Visual SVG Graphic in the background */}
                  <div className="absolute top-3 right-3 opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {meta.svgPattern}
                  </div>

                  {/* Card Content Top Area */}
                  <div className="relative z-10">
                    
                    {/* Top Row: Icon + Category Pill */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      {/* Premium Soft-Color Icon Container */}
                      <div
                        className={`w-13 h-13 rounded-2xl ${meta.theme.iconBg} border ${meta.theme.iconBorder} flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform duration-300`}
                      >
                        {getSymptomIcon(item.iconName, `w-6 h-6 ${meta.theme.iconColor} stroke-[2.2]`)}
                      </div>

                      {/* Category Label */}
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-50 text-slate-600 border border-slate-100 group-hover:bg-teal-50/70 group-hover:text-teal-800 group-hover:border-teal-200/60 transition-colors">
                        {meta.badge}
                      </span>
                    </div>

                    {/* Category Subhead */}
                    <span className="text-[11px] uppercase tracking-wider font-bold text-teal-700 block mb-1">
                      {meta.category}
                    </span>

                    {/* Symptom Title */}
                    <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl mb-2.5 group-hover:text-teal-800 transition-colors tracking-tight leading-snug">
                      {item.title}
                    </h3>

                    {/* Educational Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Content Bottom CTA Strip */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-heading font-bold text-teal-700 group-hover:text-teal-800 transition-colors">
                    <span className="flex items-center gap-1.5">
                      <span>Learn About This</span>
                    </span>
                    <div className="w-7 h-7 rounded-full bg-teal-50 group-hover:bg-teal-600 text-teal-700 group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-2xs">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* SLIDER PROGRESS & COUNTER INDICATOR: 01 ━━━━━━━ 08         */}
        {/* ========================================================= */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          
          {/* Step Numbers & Track Line */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="font-mono text-xs font-bold text-teal-700">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>

            {/* Clickable Progress Dots/Bars Track */}
            <div className="flex items-center gap-1.5 flex-1 sm:w-56 h-3 bg-slate-100/90 rounded-full px-1.5">
              {symptomList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(i)}
                  aria-label={`Go to symptom ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIndex
                      ? 'w-7 bg-teal-600'
                      : 'w-2 bg-slate-300 hover:bg-teal-300'
                  }`}
                />
              ))}
            </div>

            <span className="font-mono text-xs font-medium text-slate-400">
              {String(totalSymptoms).padStart(2, '0')}
            </span>
          </div>

          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            Click any symptom to review comprehensive clinical pathways
          </span>
        </div>

        {/* ========================================================= */}
        {/* REDESIGNED EMERGENCY MEDICAL ALERT PANEL                  */}
        {/* Pale-coral / rose tone, serious, high medical clarity     */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 p-5 sm:p-6 rounded-2xl bg-rose-50/70 border border-rose-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          {/* Alert Content */}
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="relative shrink-0 mt-0.5 sm:mt-0">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center border border-rose-200 shadow-2xs">
                <AlertOctagon className="w-5 h-5 stroke-[2.2]" />
              </div>
              {/* Pulsing Alert Pip */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600 border-2 border-white" />
              </span>
            </div>

            <div>
              <h4 className="font-heading font-bold text-slate-900 text-sm sm:text-base leading-snug">
                Experiencing Acute Distress?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                Sudden severe breathlessness, bluish discoloration, severe chest pain, or rapid worsening may require immediate emergency care.
              </p>
            </div>
          </div>

          {/* Action Link */}
          <button
            onClick={() => {
              document.getElementById('emergency-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-rose-200 text-rose-700 hover:bg-rose-100/80 hover:text-rose-800 text-xs font-heading font-bold shadow-2xs transition-colors shrink-0 cursor-pointer self-start md:self-auto"
          >
            <span>View Emergency Guidance</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};
