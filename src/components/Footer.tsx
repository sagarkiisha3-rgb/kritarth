import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wind,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Lock,
  X,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, navigate, openAppointmentModal } = useApp();
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Doctor Overview */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-sm">
                <Wind className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <div>
                <span className="font-heading font-bold text-base text-white block">
                  {settings.doctorName || "Dr. Kritarth"}
                </span>
                <span className="text-[11px] text-teal-400 font-medium">
                  {settings.doctorDesignation}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed mb-5">
              Comprehensive clinical pulmonology, sleep-related breathing disorders, and advanced interventional endoscopy services at Livasa Hospital Mohali &amp; Dhillon Medical Center.
            </p>

            <div className="space-y-1 text-[11px] text-slate-300">
              <div><strong>DM Pulmonology:</strong> PGIMER Chandigarh</div>
              <div><strong>MD Medicine:</strong> General Internal Medicine</div>
              <div><strong>Affiliations:</strong> Livasa Hospital Mohali &amp; Dhillon Medical Center</div>
            </div>
          </div>

          {/* Column 2: Lung Conditions Links */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-slate-200 text-sm mb-4">
              Lung Conditions
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Asthma & Allergies', slug: 'asthma' },
                { name: 'COPD & Emphysema', slug: 'copd' },
                { name: 'Interstitial Lung Disease (ILD)', slug: 'interstitial-lung-disease' },
                { name: 'Bronchiectasis', slug: 'bronchiectasis' },
                { name: 'Pulmonary Tuberculosis', slug: 'tuberculosis' },
                { name: 'Pleural Effusion & Thoracentesis', slug: 'pleural-disease' },
                { name: 'Respiratory Infections & Pneumonia', slug: 'pulmonary-infections' }
              ].map((item) => (
                <li key={item.slug}>
                  <button
                    onClick={() => navigate('condition', item.slug)}
                    className="hover:text-teal-400 transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Sleep & Interventional */}
          <div className="lg:col-span-2">
            <h4 className="font-heading font-bold text-slate-200 text-sm mb-4">
              Procedures &amp; Sleep
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigate('condition', 'sleep-apnea')} className="hover:text-teal-400 transition-colors text-left">
                  Obstructive Sleep Apnea
                </button>
              </li>
              <li>
                <button onClick={() => navigate('condition', 'sleep-apnea')} className="hover:text-teal-400 transition-colors text-left">
                  Polysomnography Study
                </button>
              </li>
              <li>
                <button onClick={() => navigate('condition', 'bronchoscopy')} className="hover:text-teal-400 transition-colors text-left">
                  Flexible Bronchoscopy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('condition', 'ebus')} className="hover:text-teal-400 transition-colors text-left">
                  EBUS-TBNA Staging
                </button>
              </li>
              <li>
                <button onClick={() => navigate('condition', 'thoracoscopy')} className="hover:text-teal-400 transition-colors text-left">
                  Medical Thoracoscopy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('blogs')} className="hover:text-teal-400 transition-colors text-left">
                  Patient Articles
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Hospital & Emergency Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-slate-200 text-sm mb-4">
              Contact &amp; OPD
            </h4>
            <div className="space-y-4 text-xs">
              
              <div className="space-y-3">
                {settings.addresses && settings.addresses.length > 0 ? (
                  settings.addresses.map((addr) => (
                    <div key={addr.id} className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <a 
                        href={addr.mapDirectUrl || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-teal-400 transition-colors flex-1"
                      >
                        <span className="block text-slate-200 font-semibold mb-0.5">{addr.hospital}</span>
                        <span className="block text-slate-400 leading-tight">{addr.address}</span>
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span className="flex-1 text-slate-400">Sector 71, Mohali</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${settings.phonePrimary}`} className="text-white hover:text-teal-400 font-semibold text-sm">
                  {settings.phonePrimary}
                </a>
              </div>
            </div>

            <div className="mt-5">
              <button
                onClick={() => openAppointmentModal()}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-teal-600 hover:bg-teal-500 transition-all text-center"
              >
                Book Appointment
              </button>
            </div>
          </div>

        </div>

        {/* Medical Disclaimer Callout */}
        <div className="py-6 border-b border-slate-800 text-[11px] text-slate-500 leading-relaxed">
          <p>
            <strong>Medical Disclaimer:</strong> {settings.disclaimerText || "The medical information provided on this website is for general educational and informational purposes only and does not constitute medical advice or establish a formal doctor-patient relationship. Always seek the advice of a qualified pulmonologist or healthcare provider with any questions regarding a medical condition."}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Dr. Kritarth. All rights reserved. Consultant Pulmonologist.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Use
            </button>
          </div>
        </div>

      </div>

      {/* Legal Policy Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white text-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-heading font-bold text-lg text-slate-900">
                {legalModal === 'privacy' ? 'Patient Privacy Policy' : 'Terms of Website Use'}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed space-y-3">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    Dr. Kritarth and Livasa Hospital are committed to protecting the privacy of patients and website visitors. Any personal information submitted through the appointment booking form (name, contact number, clinical concern) is kept strictly confidential and used solely for outpatient consultation scheduling and clinical coordination.
                  </p>
                  <p>
                    We do not sell, license, or transmit patient contact records to external third-party marketing companies. Data is protected using standard industry security measures.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    The content on this website (drkritarth.com) is provided strictly for educational purposes and patient information. Use of this site does not constitute an in-person medical relationship.
                  </p>
                  <p>
                    If you are experiencing acute medical emergencies such as sudden severe breathlessness or chest pain, please immediately contact emergency services or proceed to the nearest emergency room.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
