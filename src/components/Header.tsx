import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  Phone,
  Calendar,
  Menu,
  X,
  ChevronDown,
  Wind,
  ShieldCheck,
  ArrowRight,
  Activity,
  Microscope,
  Stethoscope,
  HeartPulse,
  AlertCircle
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    settings,
    activeRoute,
    selectedConditionSlug,
    navigate,
    openAppointmentModal
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [conditionsDropdownOpen, setConditionsDropdownOpen] = useState(false);
  const [mobileConditionsExpanded, setMobileConditionsExpanded] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConditionsDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setConditionsDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setConditionsDropdownOpen(false);
    }, 150);
  };

  const handleNavClick = (route: string, param?: string) => {
    navigate(route, param);
    setMobileMenuOpen(false);
    setConditionsDropdownOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    setConditionsDropdownOpen(false);
    if (activeRoute !== 'home') {
      navigate('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const lungConditionsList = [
    {
      title: 'Asthma',
      desc: 'Allergies & airway hyperreactivity',
      slug: 'asthma',
      icon: Wind,
      color: 'text-[#0B6F73] bg-[#DDF4F2]',
    },
    {
      title: 'COPD',
      desc: 'Emphysema & chronic bronchitis rehab',
      slug: 'copd',
      icon: Activity,
      color: 'text-cyan-800 bg-cyan-50',
    },
    {
      title: 'Interstitial Lung Disease',
      desc: 'Pulmonary fibrosis & alveolar care',
      slug: 'interstitial-lung-disease',
      icon: Stethoscope,
      color: 'text-blue-800 bg-blue-50',
    },
    {
      title: 'Bronchiectasis',
      desc: 'Chronic bronchial clearance & infection control',
      slug: 'bronchiectasis',
      icon: HeartPulse,
      color: 'text-indigo-800 bg-indigo-50',
    },
    {
      title: 'Pulmonary Infections',
      desc: 'Pneumonia & bacterial/viral lung conditions',
      slug: 'pulmonary-infections',
      icon: AlertCircle,
      color: 'text-amber-800 bg-amber-50',
    },
    {
      title: 'Tuberculosis',
      desc: 'Comprehensive TB diagnosis & DOTS management',
      slug: 'tuberculosis',
      icon: ShieldCheck,
      color: 'text-emerald-800 bg-emerald-50',
    },
    {
      title: 'Pleural Disease',
      desc: 'Effusion, pleurisy & diagnostic thoracentesis',
      slug: 'pleural-disease',
      icon: Microscope,
      color: 'text-purple-800 bg-purple-50',
    },
  ];

  const isHomeActive = activeRoute === 'home';
  const isSleepActive = activeRoute === 'condition' && selectedConditionSlug === 'sleep-apnea';
  const isInterventionalActive = activeRoute === 'condition' && selectedConditionSlug === 'bronchoscopy';
  const isLungConditionActive =
    activeRoute === 'condition' &&
    selectedConditionSlug !== 'sleep-apnea' &&
    selectedConditionSlug !== 'bronchoscopy';
  const isBlogsActive = activeRoute === 'blogs' || activeRoute === 'blog-detail';
  const isContactActive = activeRoute === 'contact';

  return (
    <header
      id="main-header"
      className="sticky top-0 left-0 right-0 z-50 h-[76px] bg-white border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
    >
      <div className="custom-container h-full">
        <div className="flex items-center justify-between h-full gap-3">

          {/* BRAND LOGO */}
          <div className="shrink-0">
            <BrandLogo onClick={() => handleNavClick('home')} />
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main Navigation"
            className="hidden xl:flex items-center gap-1.5 text-[14px] font-semibold text-[#102A2E]"
          >
            {/* Home */}
            <button
              id="nav-home"
              onClick={() => handleNavClick('home')}
              className={`relative px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isHomeActive ? 'text-[#0B6F73]' : 'text-[#102A2E] hover:text-[#0B6F73]'
              }`}
            >
              <span>Home</span>
              {isHomeActive && (
                <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#0B6F73]" />
              )}
            </button>

            {/* About */}
            <button
              id="nav-about"
              onClick={() => scrollToSection('about-section')}
              className="px-3 py-2 rounded-lg text-[#102A2E] hover:text-[#0B6F73] transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              About
            </button>

            {/* Lung Conditions Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterDropdown}
              onMouseLeave={handleMouseLeaveDropdown}
            >
              <button
                id="nav-conditions-dropdown"
                onClick={() => setConditionsDropdownOpen(!conditionsDropdownOpen)}
                className={`relative px-3 py-2 rounded-lg transition-all duration-200 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  isLungConditionActive || conditionsDropdownOpen ? 'text-[#0B6F73]' : 'text-[#102A2E] hover:text-[#0B6F73]'
                }`}
                aria-haspopup="true"
                aria-expanded={conditionsDropdownOpen}
              >
                <span>Lung Conditions</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    conditionsDropdownOpen ? 'rotate-180 text-[#0B6F73]' : 'text-[#607378]'
                  }`}
                />
                {isLungConditionActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#0B6F73]" />
                )}
              </button>

              <AnimatePresence>
                {conditionsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-1 w-84 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50"
                  >
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#607378]">
                        Respiratory Conditions
                      </span>
                      <span className="text-[10px] font-bold text-[#0B6F73] bg-[#DDF4F2] px-2 py-0.5 rounded-md">
                        Super-Specialty Care
                      </span>
                    </div>

                    <div className="py-1 space-y-0.5 max-h-[380px] overflow-y-auto">
                      {lungConditionsList.map((item) => {
                        const IconComponent = item.icon;
                        const isCurrent =
                          activeRoute === 'condition' && selectedConditionSlug === item.slug;
                        return (
                          <button
                            key={item.slug}
                            id={`nav-dropdown-item-${item.slug}`}
                            onClick={() => handleNavClick('condition', item.slug)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 flex items-start gap-2.5 group cursor-pointer ${
                              isCurrent
                                ? 'bg-[#DDF4F2] text-[#0B6F73] font-bold'
                                : 'hover:bg-slate-50 text-[#102A2E]'
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform group-hover:scale-110 ${item.color}`}
                            >
                              <IconComponent className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs font-semibold text-[#102A2E] group-hover:text-[#0B6F73] transition-colors flex items-center justify-between">
                                <span>{item.title}</span>
                                <ArrowRight className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-[#0B6F73] transition-all" />
                              </div>
                              <p className="text-[11px] text-[#607378] font-normal leading-tight truncate">
                                {item.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 mt-1 border-t border-slate-100 px-1">
                      <button
                        onClick={() => scrollToSection('specialities-section')}
                        className="w-full py-2 px-3 rounded-xl text-center text-xs font-bold text-[#0B6F73] bg-[#DDF4F2] hover:bg-[#DDF4F2]/90 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>View All Clinical Specialties</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sleep Medicine */}
            <button
              id="nav-sleep-medicine"
              onClick={() => handleNavClick('condition', 'sleep-apnea')}
              className={`relative px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isSleepActive ? 'text-[#0B6F73]' : 'text-[#102A2E] hover:text-[#0B6F73]'
              }`}
            >
              <span>Sleep Medicine</span>
              {isSleepActive && (
                <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#0B6F73]" />
              )}
            </button>

            {/* Interventional Pulmonology */}
            <button
              id="nav-interventional"
              onClick={() => handleNavClick('condition', 'bronchoscopy')}
              className={`relative px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isInterventionalActive ? 'text-[#0B6F73]' : 'text-[#102A2E] hover:text-[#0B6F73]'
              }`}
            >
              <span>Interventional Pulmonology</span>
              {isInterventionalActive && (
                <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#0B6F73]" />
              )}
            </button>

            {/* Diagnostics */}
            <button
              id="nav-diagnostics"
              onClick={() => scrollToSection('diagnostics-section')}
              className="px-3 py-2 rounded-lg text-[#102A2E] hover:text-[#0B6F73] transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Diagnostics
            </button>

            {/* Blogs */}
            <button
              id="nav-blogs"
              onClick={() => handleNavClick('blogs')}
              className={`relative px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isBlogsActive ? 'text-[#0B6F73]' : 'text-[#102A2E] hover:text-[#0B6F73]'
              }`}
            >
              <span>Blogs</span>
              {isBlogsActive && (
                <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#0B6F73]" />
              )}
            </button>

            {/* Contact */}
            <button
              id="nav-contact"
              onClick={() => handleNavClick('contact')}
              className={`relative px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isContactActive ? 'text-[#0B6F73]' : 'text-[#102A2E] hover:text-[#0B6F73]'
              }`}
            >
              <span>Contact</span>
              {isContactActive && (
                <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-[#0B6F73]" />
              )}
            </button>
          </nav>

          {/* RIGHT CTAS */}
          <div className="hidden xl:flex items-center gap-2.5 shrink-0">
            <a
              href={`tel:${settings.phonePrimary || "+917986148502"}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-[#102A2E] bg-slate-50 border border-slate-200 hover:border-[#0B6F73]/40 hover:bg-white shadow-2xs transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#0B6F73]" />
              <span>Call</span>
            </a>

            <button
              id="header-book-appointment-btn"
              onClick={() => openAppointmentModal()}
              className="inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#0B6F73] hover:bg-[#0E7C81] shadow-md shadow-[#0B6F73]/20 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* HAMBURGER TOGGLE (< xl / 1280px) */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#102A2E] hover:bg-slate-100 hover:text-[#0B6F73] transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#0B6F73]" />
              ) : (
                <Menu className="w-6 h-6 text-[#102A2E]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#102A2E]/40 backdrop-blur-xs z-40 xl:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-[76px] inset-x-0 bg-white border-b border-slate-200 shadow-2xl z-50 max-h-[calc(100vh-80px)] overflow-y-auto xl:hidden"
            >
              <div className="px-4 py-5 space-y-4">
                <nav className="flex flex-col space-y-1 text-sm font-semibold">
                  <button
                    onClick={() => handleNavClick('home')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                      isHomeActive ? 'bg-[#DDF4F2] text-[#0B6F73] font-bold' : 'text-[#102A2E] hover:bg-slate-100'
                    }`}
                  >
                    Home
                  </button>

                  <button
                    onClick={() => scrollToSection('about-section')}
                    className="w-full text-left px-4 py-3 rounded-xl text-[#102A2E] hover:bg-slate-100 transition-colors"
                  >
                    About
                  </button>

                  <div>
                    <button
                      onClick={() => setMobileConditionsExpanded(!mobileConditionsExpanded)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center justify-between ${
                        isLungConditionActive ? 'bg-[#DDF4F2] text-[#0B6F73] font-bold' : 'text-[#102A2E] hover:bg-slate-100'
                      }`}
                    >
                      <span>Lung Conditions</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileConditionsExpanded ? 'rotate-180 text-[#0B6F73]' : 'text-[#607378]'
                        }`}
                      />
                    </button>

                    {mobileConditionsExpanded && (
                      <div className="ml-3 pl-3 border-l-2 border-[#0B6F73]/20 my-1 space-y-1">
                        {lungConditionsList.map((item) => (
                          <button
                            key={item.slug}
                            onClick={() => handleNavClick('condition', item.slug)}
                            className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-[#607378] hover:text-[#0B6F73] hover:bg-[#DDF4F2]/50 transition-colors block"
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleNavClick('condition', 'sleep-apnea')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                      isSleepActive ? 'bg-[#DDF4F2] text-[#0B6F73] font-bold' : 'text-[#102A2E] hover:bg-slate-100'
                    }`}
                  >
                    Sleep Medicine
                  </button>

                  <button
                    onClick={() => handleNavClick('condition', 'bronchoscopy')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                      isInterventionalActive ? 'bg-[#DDF4F2] text-[#0B6F73] font-bold' : 'text-[#102A2E] hover:bg-slate-100'
                    }`}
                  >
                    Interventional Pulmonology
                  </button>

                  <button
                    onClick={() => scrollToSection('diagnostics-section')}
                    className="w-full text-left px-4 py-3 rounded-xl text-[#102A2E] hover:bg-slate-100 transition-colors"
                  >
                    Diagnostics
                  </button>

                  <button
                    onClick={() => handleNavClick('blogs')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                      isBlogsActive ? 'bg-[#DDF4F2] text-[#0B6F73] font-bold' : 'text-[#102A2E] hover:bg-slate-100'
                    }`}
                  >
                    Blogs
                  </button>

                  <button
                    onClick={() => handleNavClick('contact')}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                      isContactActive ? 'bg-[#DDF4F2] text-[#0B6F73] font-bold' : 'text-[#102A2E] hover:bg-slate-100'
                    }`}
                  >
                    Contact
                  </button>
                </nav>

                <div className="pt-4 border-t border-slate-200 space-y-2.5">
                  <a
                    href={`tel:${settings.phonePrimary || "+917986148502"}`}
                    className="w-full py-3.5 px-4 rounded-lg border border-slate-300 text-[#102A2E] font-bold text-sm flex items-center justify-center gap-2 bg-white active:bg-slate-100"
                  >
                    <Phone className="w-4 h-4 text-[#0B6F73]" />
                    <span>Call Now</span>
                  </a>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAppointmentModal();
                    }}
                    className="w-full py-3.5 px-4 rounded-lg bg-[#0B6F73] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md active:bg-[#0E7C81]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
