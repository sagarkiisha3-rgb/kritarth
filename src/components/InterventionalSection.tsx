import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Microscope,
  Eye,
  Shield,
  Activity,
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const InterventionalSection: React.FC = () => {
  const { navigate, openAppointmentModal } = useApp();

  const procedures = [
    {
      id: 'flex-bronch',
      title: 'Flexible Video Bronchoscopy',
      slug: 'bronchoscopy',
      tag: 'Airway Inspection & BAL',
      icon: <Microscope className="w-5 h-5 text-teal-600" />,
      whatItIs: 'Direct visualization of the tracheobronchial tree using an ultra-thin flexible video bronchoscope equipped with high-definition optics.',
      whyRecommended: 'To diagnose unresolved cough, blood in sputum (hemoptysis), unexplained lung nodules, or to collect airway washings for microbiological testing.',
      patientExpects: 'Conducted under throat local anesthetic spray with light conscious sedation. Daycare observation for 1–2 hours with minimal discomfort.'
    },
    {
      id: 'ebus-tbna',
      title: 'Endobronchial Ultrasound (EBUS-TBNA)',
      slug: 'ebus',
      tag: 'Mediastinal Nodal Biopsy',
      icon: <Activity className="w-5 h-5 text-cyan-600" />,
      whatItIs: 'A specialized ultrasound-guided bronchoscopy technique allowing real-time visualization and safe transbronchial needle aspiration of deep mediastinal and hilar lymph nodes.',
      whyRecommended: 'Accurate staging of lung nodules/malignancies and definitive minimally invasive diagnosis of sarcoidosis and mediastinal tuberculosis.',
      patientExpects: 'Minimally invasive alternative to surgical open chest mediastinoscopy. Outpatient daycare discharge in the majority of patients.'
    },
    {
      id: 'thoracoscopy',
      title: 'Medical Thoracoscopy (Pleuroscopy)',
      slug: 'thoracoscopy',
      tag: 'Pleural Space Inspection',
      icon: <Eye className="w-5 h-5 text-indigo-600" />,
      whatItIs: 'Direct endoscopic examination of the pleural space through a single small thoracic port to inspect lung lining and perform guided biopsies.',
      whyRecommended: 'For undiagnosed exudative pleural effusions, recurrent fluid accumulation, or targeted talc pleurodesis.',
      patientExpects: 'Performed in the endoscopy suite under local anesthesia and conscious sedation, avoiding general anesthesia and endotracheal intubation.'
    },
    {
      id: 'rigid-bronch',
      title: 'Rigid Bronchoscopy & Airway Stenting',
      slug: 'bronchoscopy',
      tag: 'Therapeutic Central Airway Care',
      icon: <Shield className="w-5 h-5 text-emerald-600" />,
      whatItIs: 'Rigid hollow barrel endoscopy designed for advanced therapeutic airway reconstruction, tumor debulking, and silicone/metallic stent placement.',
      whyRecommended: 'Relief of critical central tracheal obstruction, extraction of large aspirated foreign bodies, and control of massive endobronchial hemorrhage.',
      patientExpects: 'Carried out in a surgical theater under general anesthesia with immediate restoration of central airway patency.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#f6fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Minimally Invasive Interventions
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-3">
              Advanced Interventional Pulmonology
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
            State-of-the-art endoscopic diagnostic and therapeutic procedures providing precise histological confirmation without major thoracic surgery.
          </p>
        </div>

        {/* 4 Procedure Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {procedures.map((proc) => (
            <div
              key={proc.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                    {proc.icon}
                  </div>
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50/70 border border-teal-200/60 px-2.5 py-0.5 rounded-full">
                    {proc.tag}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-slate-900 text-xl mb-3">
                  {proc.title}
                </h3>

                {/* What it is */}
                <div className="mb-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    What It Is
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {proc.whatItIs}
                  </p>
                </div>

                {/* Why recommended */}
                <div className="mb-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Why It May Be Recommended
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {proc.whyRecommended}
                  </p>
                </div>

                {/* What patients can expect */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    What Patients Can Expect
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proc.patientExpects}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => navigate('condition', proc.slug)}
                  className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1 group"
                >
                  <span>Know More About {proc.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => openAppointmentModal({ concern: `${proc.title} Consultation` })}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 transition-colors"
                >
                  Consult Specialist
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Callout */}
        <div className="p-6 rounded-2xl bg-teal-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl">
              Advised a Bronchoscopy, EBUS or Pleural Procedure?
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-2xl leading-relaxed">
              Dr. Kritarth performs advanced interventional pulmonology procedures in accredited clinical suites with dedicated conscious sedation and continuous cardiopulmonary monitoring.
            </p>
          </div>
          <button
            onClick={() => openAppointmentModal({ concern: "Procedure Consultation / Second Opinion" })}
            className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-teal-900 bg-white hover:bg-teal-50 shrink-0 shadow-sm transition-all"
          >
            Request Procedure Review
          </button>
        </div>

      </div>
    </section>
  );
};
