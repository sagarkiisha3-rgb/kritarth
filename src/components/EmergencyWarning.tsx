import React from 'react';
import { useApp } from '../context/AppContext';
import {
  AlertOctagon,
  PhoneCall,
  ShieldAlert,
  ArrowRight,
  MapPin
} from 'lucide-react';

export const EmergencyWarning: React.FC = () => {
  const { settings } = useApp();

  const redFlags = [
    "Severe or sudden inability to catch your breath",
    "Bluish tint on lips, face, or fingernails (Cyanosis)",
    "Crushing chest tightness or radiating pain",
    "Extreme drowsiness, disorientation, or confusion",
    "Coughing up significant amounts of red blood (Hemoptysis)",
    "Rapidly deteriorating oxygen levels below safe thresholds"
  ];

  return (
    <section id="emergency-section" className="py-16 bg-[#fff8f8] border-y border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-200 shadow-sm">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Warning Text Area */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider mb-3">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                Medical Safety &amp; Red-Flag Advisory
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight mb-3">
                When to Seek Immediate Emergency Attention
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                If you or a loved one develops any of the following acute respiratory warning signs, do not wait for an outpatient OPD appointment. Proceed immediately to the nearest hospital casualty emergency room:
              </p>

              {/* 6 Warning Signs in 2 Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {redFlags.map((flag, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Casualty Contact Action Box */}
            <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200 flex flex-col justify-between gap-4 shrink-0 lg:w-80">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-rose-800 mb-1">
                  24x7 Hospital Emergency
                </div>
                <div className="text-xs font-semibold text-slate-900 mb-1">
                  {settings.primaryHospital} Emergency
                </div>
                <div className="text-[11px] text-slate-500 mb-3 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-600 shrink-0" />
                  Sector 62, Phase 9, Mohali
                </div>
              </div>

              <div className="space-y-2">
                <a
                  href={`tel:${settings.emergencyPhone || "112"}`}
                  className="w-full py-3 px-4 rounded-xl font-heading font-bold text-xs text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Emergency: {settings.emergencyPhone || "112"}</span>
                </a>

                <div className="text-center text-[10px] text-slate-500 font-medium">
                  National Ambulance Helpline: 108 / 112
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
