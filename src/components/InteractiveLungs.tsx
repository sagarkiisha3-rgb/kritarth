import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { lungHotspotsData } from '../data/defaultData';
import { LungHotspot } from '../types';
import {
  Info,
  Stethoscope,
  Sparkles,
  Layers,
  Activity,
  Microscope,
  CheckCircle2,
  Wind,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

export const InteractiveLungs: React.FC = () => {
  const { settings, navigate } = useApp();
  const [selectedHotspot, setSelectedHotspot] = useState<LungHotspot>(lungHotspotsData[0]);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  // Fallback lung visual image from CMS or verified asset
  const lungImageSrc =
    settings.lungsVisualImage || '/src/assets/images/translucent_3d_lungs_1789018628489.jpg';

  // Short labels for bottom segmented tabs
  const getTabLabel = (id: string, name: string) => {
    switch (id) {
      case 'airways':
        return 'Airways';
      case 'bronchi':
        return 'Bronchial';
      case 'alveoli':
        return 'Alveoli';
      case 'tissue':
        return 'Parenchyma';
      case 'pleura':
        return 'Pleural';
      default:
        return name.split(' ')[0];
    }
  };

  // Specific medical icon per investigation to enrich visual hierarchy
  const getInvestigationIcon = (test: string) => {
    const lower = test.toLowerCase();
    if (lower.includes('bronchoscopy') || lower.includes('biopsy') || lower.includes('microbiology')) {
      return <Microscope className="w-4 h-4 text-[#125B62] shrink-0" />;
    }
    if (lower.includes('spirometry') || lower.includes('pft') || lower.includes('dlco') || lower.includes('gas')) {
      return <Activity className="w-4 h-4 text-[#125B62] shrink-0" />;
    }
    return <Stethoscope className="w-4 h-4 text-[#125B62] shrink-0" />;
  };

  return (
    <section
      id="understanding-lungs-section"
      className="relative py-24 lg:py-32 overflow-hidden bg-[#F5F7F4] border-y border-[#E5EAE7]"
      aria-label="Understanding Your Lungs - Interactive Respiratory Anatomy Visualizer"
    >
      {/* ========================================================= */}
      {/* BACKGROUND ACCENTS: Soft Ambient Glow + Subtle Contours   */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft blurred radial teal aura centered behind the visualizer panel */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#125B62]/10 via-[#A8C7BE]/18 to-transparent blur-3xl" />

        {/* Ambient warmth on top right */}
        <div className="absolute top-12 right-12 w-[480px] h-[480px] rounded-full bg-[#1B7D7A]/5 blur-3xl" />

        {/* Faint respiratory airflow streamline contour in background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 text-[#125B62]"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M-50 320 C 320 200, 680 440, 1080 280 C 1260 210, 1380 260, 1490 240"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />
          <path
            d="M50 560 C 420 420, 820 660, 1220 500 C 1360 440, 1420 480, 1500 460"
            stroke="#1B7D7A"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* ========================================================= */}
        {/* SECTION HEADER: Pill Eyebrow + Elegant Heading + Context  */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#125B62]/20 text-[#125B62] text-xs font-bold tracking-[0.16em] uppercase mb-4 shadow-2xs backdrop-blur-xs font-heading"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#125B62]" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#125B62]" />
            <span>PATIENT EDUCATION VISUALIZER</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-bold text-[#102126] tracking-tight leading-[1.16] mb-4"
          >
            Understanding{' '}
            <span className="relative inline-block text-[#125B62]">
              Your Lungs
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-2 text-[#A8C7BE]/60"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path d="M1 6 C 50 2, 150 2, 199 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base sm:text-lg text-[#5F7073] leading-relaxed max-w-2xl mx-auto font-normal"
          >
            Click on an anatomical region to explore how different parts of the respiratory system function and what conditions may affect them.
          </motion.p>
        </div>

        {/* ========================================================= */}
        {/* 2-COLUMN INTERACTIVE MODULE: Left Visual + Right Card     */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* ======================================================= */}
          {/* LEFT PANEL: 3D Anatomical Lung Visualizer (~45%)        */}
          {/* Smooth Slide-in from the LEFT                           */}
          {/* ======================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="relative rounded-[32px] sm:rounded-[36px] bg-white/95 backdrop-blur-md p-6 sm:p-8 border border-slate-200/80 shadow-[0_20px_50px_rgba(7,27,36,0.08)] flex flex-col items-center overflow-hidden">
              
              {/* Subtle Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#125B62] via-[#1B7D7A] to-[#A8C7BE]" />

              {/* Status Header inside Visualizer */}
              <div className="w-full flex items-center justify-between mb-4 z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#125B62] animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#125B62] font-heading">
                    Interactive Thorax
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#65777A]">
                  5 Active Regions
                </span>
              </div>

              {/* Central Anatomical Canvas Container with Hotspots */}
              <div className="relative w-full max-w-[400px] aspect-square rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-[#125B62]/[0.03] via-[#A8C7BE]/[0.05] to-transparent border border-slate-100 flex items-center justify-center overflow-hidden group/canvas">
                
                {/* Ambient breathing back-glow */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#125B62]/10 to-[#1B7D7A]/5 blur-2xl pointer-events-none animate-pulse" />

                {/* Translucent 3D Lung Anatomical Rendering */}
                <img
                  src={lungImageSrc}
                  alt="Human Respiratory Anatomy 3D Visualization"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain mix-blend-multiply opacity-95 transition-transform duration-700 ease-out group-hover/canvas:scale-[1.03] animate-breathe"
                />

                {/* Hotspot Markers */}
                {lungHotspotsData.map((spot) => {
                  const isSelected = selectedHotspot.id === spot.id;
                  const isHovered = hoveredHotspot === spot.id;

                  return (
                    <div
                      key={spot.id}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        onClick={() => setSelectedHotspot(spot)}
                        onMouseEnter={() => setHoveredHotspot(spot.id)}
                        onMouseLeave={() => setHoveredHotspot(null)}
                        aria-label={`Inspect anatomical region: ${spot.name}`}
                        aria-pressed={isSelected}
                        className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#125B62] cursor-pointer"
                      >
                        {/* Outer gentle pulsing ring */}
                        <span
                          className={`absolute inline-flex h-full w-full rounded-full transition-all duration-300 ${
                            isSelected
                              ? 'bg-[#125B62]/35 animate-ping'
                              : isHovered
                              ? 'bg-[#1B7D7A]/40 scale-125'
                              : 'bg-[#125B62]/20 scale-90 group-hover:scale-125'
                          }`}
                        />

                        {/* Mid halo glow */}
                        <span
                          className={`absolute rounded-full transition-all duration-300 ${
                            isSelected
                              ? 'h-6 w-6 sm:h-7 sm:w-7 bg-[#125B62]/25 ring-2 ring-[#125B62]/40'
                              : isHovered
                              ? 'h-5 w-5 sm:h-6 sm:w-6 bg-[#1B7D7A]/20'
                              : 'h-4 w-4 bg-transparent'
                          }`}
                        />

                        {/* Core center bead */}
                        <span
                          className={`relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-white shadow-md transition-all duration-300 ${
                            isSelected
                              ? 'bg-[#125B62] scale-125 shadow-[#125B62]/40'
                              : isHovered
                              ? 'bg-[#1B7D7A] scale-110'
                              : 'bg-[#1B7D7A]/85 group-hover:bg-[#125B62]'
                          }`}
                        />
                      </button>

                      {/* Active / Hover Region Floating Indicator */}
                      <AnimatePresence>
                        {(isSelected || isHovered) && (
                          <motion.div
                            initial={{ opacity: 0, y: 6, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.92 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute left-1/2 -translate-x-1/2 top-full mt-1.5 px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap shadow-lg pointer-events-none z-30 flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-[#102126] text-white border border-[#125B62]/40'
                                : 'bg-white text-[#102126] border border-slate-200'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A8C7BE]" />
                            <span>{spot.name.split(' ')[0]}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* ===================================================== */}
              {/* BOTTOM REGION TABS: Premium Segmented Pills          */}
              {/* ===================================================== */}
              <div className="w-full mt-6 pt-5 border-t border-slate-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#65777A] text-center mb-3 font-heading">
                  Quick Select Region
                </div>
                <div
                  className="flex flex-wrap justify-center gap-2"
                  role="tablist"
                  aria-label="Respiratory regions"
                >
                  {lungHotspotsData.map((spot) => {
                    const isSelected = selectedHotspot.id === spot.id;
                    const tabLabel = getTabLabel(spot.id, spot.name);

                    return (
                      <button
                        key={spot.id}
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => setSelectedHotspot(spot)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-[#125B62] text-white shadow-md shadow-[#125B62]/25 ring-1 ring-[#125B62]/20 -translate-y-0.5'
                            : 'bg-[#F5F7F4] text-[#5F7073] hover:text-[#102126] hover:bg-slate-200/70 border border-[#E2E8E5]'
                        }`}
                      >
                        {tabLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>

          {/* ======================================================= */}
          {/* RIGHT PANEL: Educational Content Card (~55%)            */}
          {/* Smooth Slide-in from the RIGHT with slight stagger      */}
          {/* ======================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="h-full rounded-[32px] sm:rounded-[36px] bg-white/95 backdrop-blur-md p-7 sm:p-9 lg:p-10 border border-slate-200/80 shadow-[0_20px_50px_rgba(7,27,36,0.06)] flex flex-col justify-between">
              
              {/* Smooth Animated Content Replacement when Region Changes */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedHotspot.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  
                  {/* TOP META ROW: Badge + Anatomical Location */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#125B62] bg-[#125B62]/10 border border-[#125B62]/20 font-heading">
                      {selectedHotspot.badge}
                    </span>
                    <span className="text-xs text-[#65777A] font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A8C7BE]" />
                      <span>{selectedHotspot.anatomicalPosition}</span>
                    </span>
                  </div>

                  {/* REGION TITLE: 36-42px on Desktop */}
                  <h3 className="text-2xl sm:text-3xl lg:text-[36px] font-heading font-bold text-[#102126] tracking-tight leading-[1.2]">
                    {selectedHotspot.name}
                  </h3>

                  {/* DESCRIPTION PARAGRAPH */}
                  <p className="text-base sm:text-[17px] text-[#5F7073] leading-[1.7] max-w-[640px] font-normal">
                    {selectedHotspot.description}
                  </p>

                  {/* CONDITIONS COMMONLY INVOLVING THIS REGION */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <ShieldAlert className="w-4 h-4 text-[#125B62]" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#102126] font-heading">
                        Conditions Commonly Involving this Region
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {selectedHotspot.conditionsAssociated.map((cond, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, delay: idx * 0.04 }}
                          className="px-3.5 py-1.5 rounded-xl bg-[#F5F7F4] border border-[#E2E8E5] text-xs font-semibold text-[#102126] shadow-2xs hover:border-[#125B62]/40 hover:bg-white transition-all duration-200"
                        >
                          {cond}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* KEY DIAGNOSTIC INVESTIGATIONS */}
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="w-4 h-4 text-[#125B62]" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#102126] font-heading">
                        Key Diagnostic Investigations
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedHotspot.investigations.map((test, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: 0.1 + idx * 0.05 }}
                          className="p-3 rounded-2xl bg-white border border-[#E2E8E5] shadow-2xs flex items-center gap-2.5 text-xs text-[#102126] font-medium"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#125B62]/10 flex items-center justify-center shrink-0">
                            {getInvestigationIcon(test)}
                          </div>
                          <span className="leading-snug">{test}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* EDUCATIONAL DISCLAIMER NOTE BOX */}
                  <div className="mt-6 p-4 rounded-2xl bg-[#125B62]/[0.06] border border-[#125B62]/15 flex items-start gap-3 text-xs text-[#125B62] leading-relaxed">
                    <Info className="w-4 h-4 text-[#125B62] shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-heading font-bold text-[#102126] block mb-0.5">
                        Clinical Advisory Note
                      </strong>
                      <span>
                        This interactive visualization is designed for patient anatomical education. For persistent cough, breathlessness, or localized chest discomfort, an in-person clinical examination and pulmonary function test (PFT) are essential for accurate diagnosis.
                      </span>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
