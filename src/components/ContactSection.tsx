import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Calendar,
  Building2,
  Navigation
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { settings, openAppointmentModal } = useApp();

  return (
    <section id="contact-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Locations &amp; Access
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-3 mb-3">
            Consultation Facilities &amp; Contact
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Dr. Kritarth conducts outpatient clinics and performs interventional procedures at Livasa Hospital Mohali and Dhillon Medical Center, Mohali.
          </p>
        </div>

        {/* 2 Hospital Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Location 1: Livasa Hospital Mohali */}
          <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  Primary OPD Center
                </span>
                <Building2 className="w-5 h-5 text-teal-600" />
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-2">
                Livasa Hospital, Sector 71, Mohali
              </h3>

              <div className="space-y-4 my-6 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div className="w-full">
                    <div className="font-semibold text-slate-800 mb-2">Consultation Hours</div>
                    <div className="space-y-2">
                      <div className="flex justify-between gap-2 border-b border-slate-200/60 pb-1.5">
                        <span className="font-medium">Mon, Tue, Thu &amp; Sat</span>
                        <span>9:30 AM – 4:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-2 border-b border-slate-200/60 pb-1.5">
                        <span className="font-medium">Wednesday</span>
                        <span className="text-right">9:30–10:30 AM<br/>3:30–4:30 PM</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="font-medium">Friday</span>
                        <span className="text-right">9:30–10:00 AM<br/>3:00–4:30 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                  <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                  <a href="tel:+917986148502" className="font-semibold text-teal-800 hover:underline">
                    +91 79861 48502
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-3 mt-4">
              <a
                href={settings.googleMapsUrlMohali}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal-800"
              >
                <Navigation className="w-3.5 h-3.5 text-teal-600" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <button
                onClick={() => openAppointmentModal({ location: 'Livasa Hospital, Sector 71, Mohali' })}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 transition-colors"
              >
                Book Livasa OPD
              </button>
            </div>
          </div>

          {/* Location 2: Dhillon Medical Center */}
          <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-[11px] font-bold text-cyan-800 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                  Consultation Center
                </span>
                <Building2 className="w-5 h-5 text-cyan-600" />
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 mb-2">
                Dhillon Medical Center, Phase 7, Mohali
              </h3>

              <div className="space-y-4 my-6 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                  <div className="w-full">
                    <div className="font-semibold text-slate-800 mb-2">Prior Appointments Only</div>
                    <div className="space-y-2">
                      <div className="flex justify-between gap-2 border-b border-slate-200/60 pb-1.5">
                        <span className="font-medium">Mon – Sat</span>
                        <span>8:30–9:30 AM</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="font-medium">Tue – Sat</span>
                        <span>5:00–6:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-2">
                  <Phone className="w-4 h-4 text-cyan-600 shrink-0" />
                  <a href="tel:+917986148502" className="font-semibold text-cyan-800 hover:underline">
                    +91 79861 48502
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between gap-3 mt-4">
              <a
                href="https://maps.google.com" // Assuming no specific link provided yet, let's keep dummy or remove
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-cyan-800"
              >
                <Navigation className="w-3.5 h-3.5 text-cyan-600" />
                <span>Get Directions</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <button
                onClick={() => openAppointmentModal({ location: 'Dhillon Medical Center, Phase 7, Mohali' })}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-cyan-700 hover:bg-cyan-800 transition-colors"
              >
                Book Dhillon Medical Center Appointment
              </button>
            </div>
          </div>

        </div>

        {/* Map Preview Embed container */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 aspect-[21/9] relative">
          <iframe
            title="Livasa Hospital Mohali Location"
            src="https://maps.google.com/maps?q=Livasa%20Hospital%20Mohali%20Sector%2062&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>

      </div>
    </section>
  );
};
