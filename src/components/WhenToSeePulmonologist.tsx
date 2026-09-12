import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Wind,
  ShieldAlert,
  Activity,
  AlertTriangle,
  Moon,
  FileScan,
  HeartCrack,
  ArrowRight,
  Calendar
} from 'lucide-react';

export const WhenToSeePulmonologist: React.FC = () => {
  const { openAppointmentModal } = useApp();

  const reasons = [
    {
      id: 1,
      title: "Cough Lasting More Than a Few Weeks",
      desc: "A subacute or chronic cough persisting past 3 to 8 weeks warrants formal pulmonology workup beyond standard cough syrups.",
      icon: <Clock className="w-5 h-5 text-teal-600" />
    },
    {
      id: 2,
      title: "Difficulty Breathing with Normal Routine",
      desc: "Shortness of breath climbing a flight of stairs or walking distances that used to feel effortless.",
      icon: <Wind className="w-5 h-5 text-cyan-600" />
    },
    {
      id: 3,
      title: "Repeated Chest Infections",
      desc: "Recurrent episodes of bronchitis or pneumonia needing repeated courses of antibiotics throughout the year.",
      icon: <ShieldAlert className="w-5 h-5 text-amber-600" />
    },
    {
      id: 4,
      title: "Persistent Wheezing or Chest Tightness",
      desc: "Whistling noises during exhalation or a restrictive sensation across the ribcage that wakes you at night.",
      icon: <Activity className="w-5 h-5 text-indigo-600" />
    },
    {
      id: 5,
      title: "Unexplained Breathlessness",
      desc: "Sudden or gradual air hunger where standard cardiac or basic blood workups have returned inconclusive.",
      icon: <HeartCrack className="w-5 h-5 text-rose-600" />
    },
    {
      id: 6,
      title: "Blood in Sputum (Hemoptysis)",
      desc: "Even tiny streaks of red blood in your cough require prompt microbiological and bronchial evaluation.",
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />
    },
    {
      id: 7,
      title: "Severe Snoring / Disturbed Sleep",
      desc: "Choking gasps during sleep, witnessed breathing pauses, and heavy daytime exhaustion impacting vitality.",
      icon: <Moon className="w-5 h-5 text-violet-600" />
    },
    {
      id: 8,
      title: "Abnormal Chest X-Ray or CT Findings",
      desc: "Incidental nodules, ground-glass opacities, pleural fluid, or fibrotic scarring detected on radiological scans.",
      icon: <FileScan className="w-5 h-5 text-teal-700" />
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Clinical Guidance
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-3 mb-3">
            When Should You See a Lung Specialist?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Respiratory diseases often develop gradually. Seeking timely consultation with a pulmonologist prevents irreversible lung architecture damage.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {reasons.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:border-teal-200 hover:bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/70 flex items-center justify-center mb-3.5 shadow-2xs">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-slate-900 text-base mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                <span>Indicator 0{item.id}</span>
                <span className="text-teal-700">Specialist Review</span>
              </div>
            </div>
          ))}
        </div>

        {/* Storytelling CTA Box */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-teal-50/70 border border-teal-200/80 text-center">
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-2">
            Early Diagnosis Protects Your Lung Capacity
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-6 leading-relaxed">
            Whether you are struggling with a lingering post-viral cough, increasing breathlessness, or unusual CT scan findings, specialized evaluation gives you clarity.
          </p>
          <button
            onClick={() => openAppointmentModal()}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-white bg-teal-700 hover:bg-teal-800 shadow-md shadow-teal-700/20 transition-all hover:scale-[1.02]"
          >
            <Calendar className="w-4 h-4" />
            <span>Consult Dr. Kritarth</span>
          </button>
        </div>

      </div>
    </section>
  );
};
