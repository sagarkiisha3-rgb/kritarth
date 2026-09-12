import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import doctorKritarthClinicHero from '../assets/images/doctor_kritarth_clinic_hero.webp';
import {
  GraduationCap,
  Briefcase,
  Building2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  X,
  Wind,
  Activity,
  Moon,
  Microscope,
  Stethoscope,
  Sparkles
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { settings, openAppointmentModal } = useApp();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Dynamic doctor details with verified fallbacks
  const doctorName = settings.doctorName || 'Dr. Kritarth';
  const doctorDesignation = settings.doctorDesignation || 'Consultant Pulmonologist';
  const primaryHospital = settings.primaryHospital || 'Livasa Hospital, Mohali';
  const doctorImage =
    settings.aboutDoctorImage ||
    settings.heroDoctorImage ||
    doctorKritarthClinicHero;

  // Core clinical expertise pillars
  const expertisePillars = [
    {
      icon: <Wind className="w-4 h-4 text-[#125B62]" />,
      title: 'Pulmonary Medicine'
    },
    {
      icon: <Activity className="w-4 h-4 text-[#125B62]" />,
      title: 'Critical Care'
    },
    {
      icon: <Moon className="w-4 h-4 text-[#125B62]" />,
      title: 'Sleep Medicine'
    },
    {
      icon: <Microscope className="w-4 h-4 text-[#125B62]" />,
      title: 'Interventional Pulmonology'
    }
  ];

  // Education Journey Steps
  const educationSteps = [
    {
      step: '01',
      degree: 'MBBS',
      level: 'Undergraduate',
      institution: 'Medical College & Internship',
      isHighlight: false
    },
    {
      step: '02',
      degree: 'MD Medicine',
      level: 'Postgraduate',
      institution: 'Internal Medicine Foundation',
      isHighlight: false
    },
    {
      step: '03',
      degree: 'DM Pulmonary & Critical Care',
      level: 'Super-Specialization',
      institution: 'PGIMER Chandigarh',
      isHighlight: true
    }
  ];

  // Clinical Experience Timeline
  const experienceTimeline = [
    {
      role: 'Senior Resident',
      institution: 'PGIMER Chandigarh',
      type: 'Super-Specialty Training & Patient Care',
      isCurrent: false
    },
    {
      role: 'Assistant Professor',
      institution: 'Dayanand Medical College & Hospital, Ludhiana',
      type: 'Clinical Faculty & Pulmonology Teaching',
      isCurrent: false
    },
    {
      role: 'Consultant Pulmonologist',
      institution: 'Paras Hospital, Panchkula',
      type: 'Inpatient & Interventional Pulmonology',
      isCurrent: false
    },
    {
      role: 'Consultant – Pulmonary Medicine',
      institution: primaryHospital,
      type: 'Outpatient, Inpatient & ICU Respiratory Care',
      isCurrent: true
    }
  ];

  return (
    <section
      id="about-section"
      className="relative py-24 lg:py-32 overflow-hidden bg-[#F5F7F4] border-y border-[#E5EAE7]"
      aria-label="About Dr. Kritarth - Specialist Pulmonologist"
    >
      {/* ========================================================= */}
      {/* BACKGROUND ACCENTS: Subtle Radial Teal Glow + Contours   */}
      {/* ========================================================= */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Soft radial glow anchored behind the portrait on the left */}
        <div className="absolute top-1/4 -left-20 w-[580px] h-[580px] rounded-full bg-gradient-to-tr from-[#125B62]/10 via-[#A8C7BE]/18 to-transparent blur-3xl" />

        {/* Ambient warmth on top right */}
        <div className="absolute top-10 right-0 w-[420px] h-[420px] rounded-full bg-[#1B7D7A]/5 blur-3xl" />

        {/* Subtle organic lung-inspired contour line in the background */}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[700px] opacity-[0.14] text-[#125B62]"
          viewBox="0 0 600 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 120 C 220 80, 480 180, 520 360 C 560 540, 360 620, 200 660"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          <path
            d="M120 40 C 310 100, 540 280, 480 480 C 440 600, 310 670, 180 690"
            stroke="#1B7D7A"
            strokeWidth="2"
          />
          <circle cx="480" cy="360" r="140" stroke="#A8C7BE" strokeWidth="1" strokeDasharray="4 6" />
        </svg>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: Large Doctor Portrait Panel (~42% desktop)     */}
          {/* ========================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            {/* Organic Soft Teal/Sage Backdrop Blob */}
            <div className="absolute -inset-4 sm:-inset-6 rounded-[42px] bg-gradient-to-br from-[#125B62]/12 via-[#A8C7BE]/20 to-transparent -rotate-1 pointer-events-none -z-10" />

            {/* Main Editorial Portrait Container */}
            <div className="relative mx-auto max-w-[420px] lg:max-w-none rounded-[32px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(7,27,36,0.12)] border border-white/90 bg-white">
              <div className="aspect-[4/5] relative">
                <img
                  src={doctorImage}
                  alt={`${doctorName} – ${doctorDesignation}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top filter brightness-[1.01] contrast-[1.02]"
                />

                {/* Subtle bottom vignette to ensure contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B24]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* FLOATING CARD 1: Near Bottom-Left */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-4 sm:bottom-6 left-3 sm:left-5 right-3 sm:right-auto sm:max-w-[270px] p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_12px_28px_rgba(7,27,36,0.10)] flex items-center gap-3 z-20"
              >
                <div className="w-10 h-10 rounded-xl bg-[#125B62]/10 text-[#125B62] flex items-center justify-center shrink-0 border border-[#125B62]/15 shadow-2xs">
                  <GraduationCap className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#102126] truncate leading-tight">
                    DM Pulmonary &amp; Critical Care
                  </div>
                  <div className="text-[11px] font-semibold text-[#125B62] mt-0.5">
                    PGIMER Chandigarh
                  </div>
                </div>
              </motion.div>

              {/* FLOATING CARD 2: Near Upper-Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hidden sm:flex absolute top-5 right-4 max-w-[220px] p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-[0_10px_24px_rgba(7,27,36,0.08)] items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-lg bg-[#1B7D7A]/10 text-[#1B7D7A] flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-bold text-[#102126] truncate leading-tight">
                    Consultant Pulmonologist
                  </div>
                  <div className="text-[10px] font-medium text-[#5F7073] truncate">
                    {primaryHospital}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: Narrative + Expertise + Timeline (~58%)       */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 flex flex-col items-start pt-2 lg:pt-0">
            
            {/* Top Eyebrow: Subtle Text Label (No Outlined Capsule) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 text-[#125B62] text-xs font-bold tracking-[0.16em] uppercase mb-3 font-heading"
            >
              <span className="w-2 h-2 rounded-full bg-[#1B7D7A] animate-pulse" />
              <span>ABOUT THE SPECIALIST</span>
            </motion.div>

            {/* Main Heading: Meet Dr. Kritarth */}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-[46px] font-heading font-bold text-[#102126] tracking-tight leading-[1.14] mb-3"
            >
              Meet{' '}
              <span className="text-[#125B62] relative inline-block">
                {doctorName}
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

            {/* Subtitle: Refined Secondary Designation Line */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="text-base sm:text-lg font-medium text-[#102126] mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-1"
            >
              <span className="font-semibold text-[#125B62]">{doctorDesignation}</span>
              <span className="text-[#A8C7BE] hidden sm:inline">•</span>
              <span className="text-[#5F7073]">{primaryHospital}</span>
            </motion.div>

            {/* Intro Paragraph (17-18px, relaxed line height, max width) */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-[17px] text-[#5F7073] leading-[1.7] max-w-[680px] mb-8 font-normal"
            >
              Dr. Kritarth specializes in the diagnosis and management of complex respiratory conditions,
              pulmonary infections, sleep-related breathing disorders, and interventional pulmonology.
              Trained at premier medical institutes including PGIMER Chandigarh, he delivers evidence-based,
              compassionate, and patient-first care across Mohali, Chandigarh, and the wider Tricity.
            </motion.p>

            {/* ======================================================= */}
            {/* EXPERTISE HIGHLIGHT ROW: 4 Clean Icon + Text Items       */}
            {/* ======================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="w-full mb-10"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {expertisePillars.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/80 border border-[#E2E8E5] shadow-2xs hover:border-[#125B62]/30 hover:bg-white transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#125B62]/10 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-xs font-semibold text-[#102126] leading-tight">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ======================================================= */}
            {/* HORIZONTAL EDUCATION JOURNEY: 01 ━━━ 02 ━━━ 03           */}
            {/* ======================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full mb-10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#65777A] font-heading">
                  Education &amp; Super-Specialty Journey
                </h3>
              </div>

              {/* Horizontal layout on desktop, stacked with connector on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 relative">
                {educationSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-2xl p-4 transition-all duration-300 ${
                      step.isHighlight
                        ? 'bg-gradient-to-br from-[#125B62]/10 via-[#A8C7BE]/20 to-white/90 border border-[#125B62]/25 shadow-sm'
                        : 'bg-white/90 border border-[#E2E8E5] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-[#125B62]">
                        {step.step}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/90 text-[#5F7073] border border-[#E2E8E5]">
                        {step.level}
                      </span>
                    </div>

                    <div className="font-heading font-bold text-sm text-[#102126] mb-1">
                      {step.degree}
                    </div>

                    <div className="text-xs text-[#5F7073] font-medium leading-relaxed">
                      {step.institution}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ======================================================= */}
            {/* CLINICAL EXPERIENCE VERTICAL TIMELINE                    */}
            {/* ======================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="w-full mb-8"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#65777A] mb-4 font-heading">
                Clinical Experience &amp; Faculty Appointments
              </h3>

              <div className="relative pl-6 sm:pl-7 border-l-2 border-[#125B62]/25 space-y-5">
                {experienceTimeline.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle timeline marker */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[35px] top-1 w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
                        item.isCurrent
                          ? 'bg-[#125B62] border-white ring-4 ring-[#125B62]/20'
                          : 'bg-white border-[#125B62]/60 group-hover:border-[#125B62]'
                      }`}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-sm text-[#102126]">
                          {item.role}
                        </span>
                        {item.isCurrent && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#125B62] text-white uppercase tracking-wider">
                            Current
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#125B62] font-semibold">
                        {item.institution}
                      </span>
                    </div>

                    <div className="text-xs text-[#65777A] mt-0.5 font-normal">
                      {item.type}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ======================================================= */}
            {/* COMPACT TRUST STAT ROW                                   */}
            {/* ======================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.4 }}
              className="w-full mb-9 p-3.5 rounded-2xl bg-white/70 border border-[#E2E8E5] flex flex-wrap items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2 text-[#102126]">
                <ShieldCheck className="w-4 h-4 text-[#125B62] shrink-0" />
                <span className="font-semibold">PGIMER Alumnus</span>
                <span className="text-[#65777A]">Super-Specialty DM</span>
              </div>

              <div className="flex items-center gap-2 text-[#102126]">
                <Stethoscope className="w-4 h-4 text-[#125B62] shrink-0" />
                <span className="font-semibold">Advanced Diagnostics</span>
                <span className="text-[#65777A]">EBUS &amp; Bronchoscopy</span>
              </div>

              <div className="flex items-center gap-2 text-[#102126]">
                <Sparkles className="w-4 h-4 text-[#125B62] shrink-0" />
                <span className="font-semibold">Comprehensive Care</span>
                <span className="text-[#65777A]">Sleep &amp; Critical Care</span>
              </div>
            </motion.div>

            {/* ======================================================= */}
            {/* CTAs: Primary Booking Button + Secondary Text Link       */}
            {/* ======================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.45 }}
              className="flex flex-wrap items-center gap-6"
            >
              {/* Primary Action */}
              <button
                onClick={() => openAppointmentModal()}
                className="px-6 py-3.5 rounded-xl sm:rounded-2xl text-sm font-semibold text-white bg-[#125B62] hover:bg-[#0e484e] transition-all duration-200 flex items-center gap-2.5 shadow-md shadow-[#125B62]/20 hover:shadow-lg hover:shadow-[#125B62]/30 hover:-translate-y-0.5 cursor-pointer"
              >
                <Calendar className="w-4 h-4 stroke-[2.2]" />
                <span>Book Consultation</span>
              </button>

              {/* Secondary Action: Elegant Text Link with Arrow */}
              <button
                onClick={() => setProfileModalOpen(true)}
                className="group text-sm font-semibold text-[#125B62] hover:text-[#071B24] transition-colors flex items-center gap-2 cursor-pointer py-2"
              >
                <span>View Full Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* FULL CLINICAL PROFILE MODAL (PRESERVED & REFINED)        */}
      {/* ========================================================= */}
      {profileModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-doctor-title"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 id="modal-doctor-title" className="font-heading font-bold text-2xl text-[#102126]">
                  {doctorName}
                </h3>
                <p className="text-sm font-medium text-[#125B62] mt-0.5">
                  {doctorDesignation} – {primaryHospital}
                </p>
              </div>
              <button
                onClick={() => setProfileModalOpen(false)}
                aria-label="Close modal"
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-6 text-sm text-[#5F7073]">
              <div>
                <h4 className="font-heading font-bold text-[#102126] text-base mb-2.5">
                  Clinical Specialization &amp; Focus Areas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Severe Refractory Asthma',
                    'Chronic Obstructive Pulmonary Disease (COPD)',
                    'Interstitial Lung Disease (ILD) & Fibrosis',
                    'Endobronchial Ultrasound (EBUS-TBNA)',
                    'Diagnostic & Therapeutic Bronchoscopy',
                    'Obstructive Sleep Apnea & Polysomnography',
                    'Pleural Effusions & Medical Thoracoscopy',
                    'Respiratory Critical Care & Mechanical Ventilation'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#102126]">
                      <CheckCircle2 className="w-4 h-4 text-[#125B62] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold text-[#102126] text-base mb-2.5">
                  Medical Qualifications &amp; Alumni
                </h4>
                <ul className="space-y-2.5 text-xs leading-relaxed">
                  <li className="p-3.5 bg-[#F5F7F4] rounded-2xl border border-[#E5EAE7]">
                    <div className="font-bold text-[#102126]">DM in Pulmonary &amp; Critical Care Medicine</div>
                    <div className="text-[#125B62] font-semibold mt-0.5">
                      Postgraduate Institute of Medical Education and Research (PGIMER), Chandigarh
                    </div>
                    <div className="text-[#65777A] mt-1">
                      Advanced clinical training in interventional pulmonology, mechanical ventilation, and respiratory physiology.
                    </div>
                  </li>
                  <li className="p-3.5 bg-[#F5F7F4] rounded-2xl border border-[#E5EAE7]">
                    <div className="font-bold text-[#102126]">MD in General Medicine</div>
                    <div className="text-[#65777A] mt-0.5">Comprehensive internal medicine foundation.</div>
                  </li>
                  <li className="p-3.5 bg-[#F5F7F4] rounded-2xl border border-[#E5EAE7]">
                    <div className="font-bold text-[#102126]">MBBS</div>
                    <div className="text-[#65777A] mt-0.5">Undergraduate medical education and clinical internship.</div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-heading font-bold text-[#102126] text-base mb-2">
                  Current Affiliations
                </h4>
                <p className="text-xs text-[#5F7073] leading-relaxed">
                  Consultant in Pulmonary Medicine at <strong>Livasa Hospital, Sector 71, Mohali</strong> and visiting specialist at <strong>Dhillon Medical Center, Phase 7, Mohali</strong>.
                </p>
              </div>

              <div className="p-4 bg-[#125B62]/10 rounded-2xl border border-[#125B62]/20 text-xs text-[#125B62]">
                <strong>Medical Practice Philosophy:</strong> Prioritizing evidence-based diagnostic precision, rational antibiotic stewardship, proper inhaler technique education, and empathetic patient communication.
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setProfileModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-[#5F7073] hover:text-[#102126] cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setProfileModalOpen(false);
                  openAppointmentModal();
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#125B62] rounded-xl hover:bg-[#0e484e] cursor-pointer transition-colors shadow-xs"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
