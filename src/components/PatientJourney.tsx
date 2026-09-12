import React from 'react';
import {
  MessageSquare,
  Stethoscope,
  Activity,
  HeartHandshake,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const PatientJourney: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Share Your Concern',
      desc: 'Submit your symptoms online or call our clinic desk to schedule your appointment at Livasa Hospital.',
      icon: <MessageSquare className="w-5 h-5 text-teal-600" />
    },
    {
      num: '02',
      title: 'Specialist Evaluation',
      desc: 'In-depth clinical consultation with Dr. Kritarth, detailed history taking, and thorough chest examination.',
      icon: <Stethoscope className="w-5 h-5 text-cyan-600" />
    },
    {
      num: '03',
      title: 'Diagnostic Investigations',
      desc: 'Spirometry, DLCO, high-resolution CT analysis, or sleep studies to precisely pinpoint physiological defects.',
      icon: <Activity className="w-5 h-5 text-indigo-600" />
    },
    {
      num: '04',
      title: 'Personalized Care Plan',
      desc: 'Evidence-based treatment protocol, inhaler device technique training, and clear lifestyle modifications.',
      icon: <HeartHandshake className="w-5 h-5 text-emerald-600" />
    },
    {
      num: '05',
      title: 'Follow-up & Monitoring',
      desc: 'Periodic objective monitoring of lung function parameters ensuring sustained symptom control and vitality.',
      icon: <ShieldCheck className="w-5 h-5 text-teal-700" />
    }
  ];

  return (
    <section className="py-20 bg-[#f9fcfc] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Care Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-3 mb-3">
            Your Respiratory Care Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            From your first consultation to sustained long-term lung health, our approach is structured, transparent, and patient-centered.
          </p>
        </div>

        {/* Desktop Horizontal Flow / Mobile Vertical */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-teal-200 via-cyan-200 to-teal-300 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center group"
              >
                {/* Step badge & icon */}
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-teal-100/70 transition-all shadow-2xs">
                  {step.icon}
                </div>

                <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wider mb-1">
                  Step {step.num}
                </div>

                <h3 className="font-heading font-bold text-slate-900 text-base mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
