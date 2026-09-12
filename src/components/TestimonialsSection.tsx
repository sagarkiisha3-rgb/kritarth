import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, openAppointmentModal } = useApp();

  return (
    <section className="py-20 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Patient Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-3 mb-3">
            Patient Experiences &amp; Care Feedback
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Observations from individuals treated for asthma, chronic respiratory cough, and sleep disorders.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: test.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-teal-100" />
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  &quot;{test.review}&quot;
                </p>
              </div>

              {/* Patient info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-heading font-bold text-slate-900 text-sm">
                    {test.patientName}
                  </div>
                  <div className="text-xs text-teal-700 font-medium">
                    {test.conditionTreated}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {test.date}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Medical Notice */}
        <div className="max-w-2xl mx-auto text-center p-4 rounded-2xl bg-white border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
          <strong>Medical Notice:</strong> Patient experiences vary depending on individual physiological response, condition severity, and treatment adherence. We uphold strict medical ethics: no treatment guarantees or unverified claims are made.
        </div>

      </div>
    </section>
  );
};
