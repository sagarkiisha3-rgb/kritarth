import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import doctorKritarthClinicHero from '../assets/images/doctor_kritarth_clinic_hero.webp';
import {
  Calendar,
  Phone,
  ShieldCheck,
  MapPin,
  MessageSquare,
  GraduationCap,
  Stethoscope
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { settings, openAppointmentModal } = useApp();

  // Desktop Media & Framing State
  const defaultHeroImage = doctorKritarthClinicHero;
  const desktopHeroImage = settings?.heroImageUrlDesktop || settings?.heroImageUrl || settings?.heroDoctorImage || defaultHeroImage;
  const desktopPosX = settings?.heroDesktopPositionX ?? 72;
  const desktopPosY = settings?.heroDesktopPositionY ?? 30;
  const desktopZoom = settings?.heroDesktopZoom ?? 100;

  // Mobile Media & Framing State
  const mobileHeroImage = settings?.heroImageUrlMobile || desktopHeroImage;
  const mobilePosX = settings?.heroMobilePositionX ?? 50;
  const mobilePosY = settings?.heroMobilePositionY ?? 18;
  const mobileZoom = settings?.heroMobileZoom ?? 100;

  const overlayStrength = settings?.heroOverlayStrength ?? 65;
  const overlayDirection = settings?.heroOverlayDirection || 'left-to-right';
  const imageAlt = settings?.heroImageAlt || `${settings?.doctorName || "Dr. Kritarth"} – Consultant Pulmonologist & Sleep Specialist`;

  const cleanWhatsapp = (settings.whatsappNumber || "+917986148502").replace(/[^0-9]/g, '');
  const whatsappPreFill = encodeURIComponent(
    "Hello Dr. Kritarth, I would like to schedule a consultation regarding respiratory / lung care."
  );

  const computeDesktopGradientCss = () => {
    const alpha = (overlayStrength / 100);
    if (overlayDirection === 'right-to-left') {
      return `linear-gradient(270deg, rgba(4, 27, 32, ${alpha * 0.94}) 0%, rgba(4, 27, 32, ${alpha * 0.86}) 22%, rgba(4, 27, 32, ${alpha * 0.66}) 40%, rgba(4, 27, 32, ${alpha * 0.32}) 54%, rgba(4, 27, 32, ${alpha * 0.08}) 72%, rgba(4, 27, 32, 0.02) 100%)`;
    } else if (overlayDirection === 'uniform') {
      return `rgba(4, 27, 32, ${alpha * 0.75})`;
    }
    // Default left-to-right gradient for clean left text reading area and bright right doctor image
    return `linear-gradient(90deg, rgba(4, 27, 32, ${0.94 * alpha}) 0%, rgba(4, 27, 32, ${0.86 * alpha}) 22%, rgba(4, 27, 32, ${0.66 * alpha}) 40%, rgba(4, 27, 32, ${0.32 * alpha}) 54%, rgba(4, 27, 32, ${0.08 * alpha}) 72%, rgba(4, 27, 32, 0.02) 100%)`;
  };

  return (
    <div className="relative w-full">
      {/* ========================================================= */}
      {/* 1. FULL-WIDTH EDGE-TO-EDGE HERO SECTION (DISPLAYED >= 768px) */}
      {/* ========================================================= */}
      <section
        id="home-hero-section-desktop"
        className="hero-section hidden md:flex relative w-full min-h-[660px] items-center overflow-hidden bg-[#657476] isolate"
        aria-label="Clinical Pulmonology Hero - Dr. Kritarth"
      >
        {/* Full-Width Edge-to-Edge Hero Background Image */}
        <div className="hero-background absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src={desktopHeroImage}
            alt={imageAlt}
            width="1920"
            height="670"
            className="absolute inset-0 w-full h-full max-w-none object-cover opacity-100 block"
            style={{
              '--desktop-x': `${desktopPosX}%`,
              '--desktop-y': `${desktopPosY}%`,
              '--desktop-zoom': `${desktopZoom / 100}`,
              ...(settings?.heroDesktopPositionX !== undefined && settings?.heroDesktopPositionX !== 72
                ? { '--desktop-x-override': `${desktopPosX}%` }
                : {}),
              ...(settings?.heroDesktopPositionY !== undefined && settings?.heroDesktopPositionY !== 30
                ? { '--desktop-y-override': `${desktopPosY}%` }
                : {})
            } as React.CSSProperties}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />

          {/* Left-to-Right Premium Dark Teal Clinical Gradient Overlay */}
          <div
            className="hero-overlay absolute inset-0 z-1 pointer-events-none"
            style={{ background: computeDesktopGradientCss() }}
          />
        </div>

        {/* Hero Content Positioned Cleanly Over Overlay */}
        <div className="hero-container custom-container relative z-10 w-full min-h-inherit flex items-center py-12">
          <div className="hero-content w-full max-w-[590px] text-left text-white">
            
            {/* Specialty Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2.5 mb-4"
            >
              <span className="w-6 h-[2px] bg-[#79D8D5] rounded-full shrink-0" />
              <span className="text-[12px] lg:text-[13px] font-semibold uppercase tracking-[0.08em] text-[#79D8D5]">
                {settings.heroBadge || "PULMONOLOGY • RESPIRATORY MEDICINE • SLEEP MEDICINE"}
              </span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-[clamp(44px,4.8vw,68px)] font-heading font-extrabold text-white tracking-tight leading-[1.02] mb-5 drop-shadow-xs">
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Breathe Better.
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[#79D8D5] mt-1"
              >
                Sleep Better.
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block mt-1"
              >
                Live Better.
              </motion.span>
            </h1>

            {/* Clinical Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16px] lg:text-[18px] text-white/90 font-normal leading-[1.65] mb-5 drop-shadow-xs max-w-[560px]"
            >
              {settings.heroSubtitle ||
                "Specialized clinical care for complex lung diseases, respiratory infections, sleep-related breathing disorders, and advanced interventional pulmonology."}
            </motion.p>

            {/* Doctor Identity Block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mb-3"
            >
              <h2 className="text-xl lg:text-2xl font-heading font-extrabold text-white tracking-tight">
                {settings.doctorName || "Dr. Kritarth"}
              </h2>
              <p className="text-xs lg:text-sm font-medium text-[#79D8D5] mt-0.5">
                {settings.doctorDesignation || "Consultant – Pulmonary Medicine"}
              </p>
            </motion.div>

            {/* Professional Trust Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-xs lg:text-sm text-white/80 font-medium mb-7 flex flex-wrap items-center gap-x-2 gap-y-1"
            >
              <span>DM Pulmonology (PGIMER Chandigarh)</span>
              <span className="text-[#79D8D5]">•</span>
              <span>Livasa Hospital Mohali</span>
              <span className="text-[#79D8D5]">•</span>
              <span>Ex-PGIMER Chandigarh</span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3.5"
            >
              {/* Primary: Book Appointment */}
              <button
                id="hero-book-appointment-btn"
                onClick={() => openAppointmentModal()}
                className="min-h-[54px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg text-sm font-heading font-bold text-white bg-[#0B6F73] hover:bg-[#0E7C81] shadow-md shadow-black/20 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-teal-100" />
                <span>Book Appointment</span>
              </button>

              {/* Secondary: Call Now */}
              <a
                href={`tel:${settings.phonePrimary || "+917986148502"}`}
                className="min-h-[54px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-heading font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/40 backdrop-blur-xs transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4 text-white" />
                <span>Call Now</span>
              </a>

              {/* Tertiary: WhatsApp Inquiry */}
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${whatsappPreFill}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[54px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-xs font-heading font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-900/50 backdrop-blur-xs transition-all cursor-pointer hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Inquiry</span>
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MOBILE DEDICATED STACKED HERO COMPOSITION (< 768px)    */}
      {/* ========================================================= */}
      <section
        id="home-hero-section-mobile"
        className="block md:hidden w-full bg-[#0E3034]"
        aria-label="Clinical Pulmonology Hero - Mobile - Dr. Kritarth"
      >
        {/* Mobile Top Hero Media Container */}
        <div className="mobile-hero-image relative w-full h-[clamp(300px,78vw,430px)] overflow-hidden bg-[#657476]">
          <img
            src={mobileHeroImage}
            alt={imageAlt}
            width="768"
            height="430"
            className="w-full h-full object-cover opacity-100 block"
            style={{
              '--mobile-x': `${mobilePosX}%`,
              '--mobile-y': `${mobilePosY}%`,
              '--mobile-zoom': `${mobileZoom / 100}`
            } as React.CSSProperties}
            loading="eager"
            fetchPriority="high"
            decoding="sync"
          />

          {/* Bottom Gradient Fade into Dark Teal Panel */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0E3034]" />
        </div>

        {/* Mobile Content Panel in Normal Document Flow (Zero Text Overlap) */}
        <div className="px-5 pt-4 pb-8 text-left text-white space-y-4">
          
          {/* Eyebrow Specialty Label */}
          <div className="flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#79D8D5] rounded-full shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#79D8D5]">
              {settings.heroBadge || "PULMONOLOGY • RESPIRATORY MEDICINE"}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Breathe Better.<br />
            <span className="text-[#79D8D5]">Sleep Better.</span><br />
            Live Better.
          </h1>

          {/* Subtitle */}
          <p className="text-sm text-white/90 font-normal leading-relaxed">
            {settings.heroSubtitle ||
              "Specialized clinical care for complex lung diseases, respiratory infections, sleep-related breathing disorders, and advanced interventional pulmonology."}
          </p>

          {/* Doctor Identity & Credentials */}
          <div className="border-t border-teal-800/60 pt-3">
            <h2 className="text-xl font-heading font-extrabold text-white">
              {settings.doctorName || "Dr. Kritarth"}
            </h2>
            <p className="text-xs font-medium text-[#79D8D5] mt-0.5">
              {settings.doctorDesignation || "Consultant – Pulmonary Medicine"}
            </p>
            <p className="text-[11px] text-white/80 mt-1">
              DM Pulmonology (PGIMER) • Livasa Hospital Mohali • Ex-PGIMER
            </p>
          </div>

          {/* Mobile Full-Width Stacked CTA Buttons */}
          <div className="pt-2 space-y-2.5 w-full">
            <button
              onClick={() => openAppointmentModal()}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-heading font-bold text-white bg-[#0B6F73] active:bg-[#0E7C81] shadow-md transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-teal-100" />
              <span>Book Appointment</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${settings.phonePrimary || "+917986148502"}`}
                className="w-full min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-heading font-semibold text-white bg-white/10 border border-white/30 transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-white" />
                <span>Call Now</span>
              </a>

              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${whatsappPreFill}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-heading font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-500/40 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. CLEAN WHITE CLINICAL INFO STRIP IMMEDIATELY BELOW HERO  */}
      {/* ========================================================= */}
      <section className="bg-white border-b border-slate-200/90 shadow-xs py-5 sm:py-6 relative z-20">
        <div className="custom-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
            
            {/* Column 1: Qualification */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4 first:pt-0 first:px-0">
              <div className="w-10 h-10 rounded-xl bg-[#DDF4F2] text-[#0B6F73] flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-[#0B6F73]" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#607378]">Qualifications</h4>
                <p className="text-sm font-bold text-[#102A2E] leading-snug">DM Pulmonology</p>
                <p className="text-xs text-[#607378] font-medium">PGIMER Chandigarh</p>
              </div>
            </div>

            {/* Column 2: Specialty */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-800 flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5 text-cyan-800" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#607378]">Consultant</h4>
                <p className="text-sm font-bold text-[#102A2E] leading-snug">Pulmonary &amp; Sleep</p>
                <p className="text-xs text-[#607378] font-medium">Super-Specialist Care</p>
              </div>
            </div>

            {/* Column 3: Location */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-blue-800" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#607378]">Primary Clinic</h4>
                <p className="text-sm font-bold text-[#102A2E] leading-snug">Livasa Hospital</p>
                <p className="text-xs text-[#607378] font-medium">Mohali, Punjab</p>
              </div>
            </div>

            {/* Column 4: Consultation */}
            <div className="flex items-center gap-3.5 pt-4 sm:pt-0 sm:px-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-800" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#607378]">OPD &amp; Inpatient</h4>
                <p className="text-sm font-bold text-[#102A2E] leading-snug">Ex-PGIMER Specialist</p>
                <p className="text-xs text-[#607378] font-medium">Prior Appointment Preferred</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
