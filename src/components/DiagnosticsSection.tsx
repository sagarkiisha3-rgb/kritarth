import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  FileScan,
  Microscope,
  Moon,
  Shield,
  Layers,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const DiagnosticsSection: React.FC = () => {
  const { openAppointmentModal } = useApp();

  const diagnosticServices = [
    {
      id: 'pft',
      title: 'Pulmonary Function Testing (PFT & Spirometry)',
      desc: 'Precision measurement of lung volumes, expiratory flow rates, and bronchodilator reversibility to diagnose asthma, COPD, and airway obstruction.',
      icon: <Activity className="w-5 h-5 text-teal-600" />,
      parameters: ['FEV1 / FVC Ratio', 'Reversibility Testing', 'Flow Volume Loops']
    },
    {
      id: 'dlco',
      title: 'Diffusion Capacity (DLCO Testing)',
      desc: 'Assesses the efficiency of gas exchange across the alveolar-capillary membrane, vital for evaluating Interstitial Lung Disease (ILD) and pulmonary vascular disease.',
      icon: <Layers className="w-5 h-5 text-cyan-600" />,
      parameters: ['Gas Transfer Factor', 'Alveolar Volume', 'Early Fibrosis Detection']
    },
    {
      id: 'imaging',
      title: 'Chest Imaging & HRCT Thorax Review',
      desc: 'Expert pulmonologist interpretation of High-Resolution Computed Tomography (HRCT) of the chest to characterize interstitial patterns, nodules, and bronchiectasis.',
      icon: <FileScan className="w-5 h-5 text-indigo-600" />,
      parameters: ['HRCT Thorax Review', 'Nodule Tracking', 'Emphysema Quantification']
    },
    {
      id: 'bronch-bal',
      title: 'Flexible Bronchoscopy & BAL',
      desc: 'Direct optical visualization of bronchial architecture with Bronchoalveolar Lavage (BAL) for microbiological cultures, GeneXpert MTB testing, and cytology.',
      icon: <Microscope className="w-5 h-5 text-emerald-600" />,
      parameters: ['Airway Inspection', 'Microbiology Cultures', 'Endobronchial Biopsies']
    },
    {
      id: 'psg',
      title: 'Polysomnography (Sleep Study)',
      desc: 'Comprehensive multi-channel recording of nocturnal respiratory parameters, airflow, and blood oxygen desaturations for diagnosing Obstructive Sleep Apnea.',
      icon: <Moon className="w-5 h-5 text-violet-600" />,
      parameters: ['Level 1 In-Lab Study', 'Home Sleep Testing (HSAT)', 'CPAP Titration']
    },
    {
      id: 'pleural',
      title: 'Thoracic Ultrasound & Pleural Tap',
      desc: 'Bedside thoracic ultrasound assessment for accurate localization and diagnostic aspiration of pleural effusions, guided catheter drainage, or medical pleuroscopy.',
      icon: <Shield className="w-5 h-5 text-rose-600" />,
      parameters: ['Ultrasound Guidance', 'Fluid Analysis & ADA', 'Diagnostic Thoracentesis']
    }
  ];

  return (
    <section id="diagnostics-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Diagnostic Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-3">
              Respiratory Evaluation &amp; Diagnostics
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
            Accurate diagnosis forms the bedrock of respiratory therapeutics. Tests conducted and interpreted in specialized clinical laboratories.
          </p>
        </div>

        {/* Diagnostic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {diagnosticServices.map((test) => (
            <div
              key={test.id}
              className="bg-slate-50/70 rounded-3xl p-6 border border-slate-200/80 hover:border-teal-200 hover:bg-white shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-white border border-slate-200/70 flex items-center justify-center mb-4 shadow-2xs">
                  {test.icon}
                </div>

                <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">
                  {test.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {test.desc}
                </p>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Clinical Scope
                </div>
                <div className="space-y-1.5 pt-1 border-t border-slate-200/60">
                  {test.parameters.map((param, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{param}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Diagnostic Phrasing Note */}
        <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-teal-900">
          <p>
            <strong>Diagnostic Protocol:</strong> Tests are recommended strictly based on clinical indication following thorough in-person examination.
          </p>
          <button
            onClick={() => openAppointmentModal({ concern: 'PFT / Diagnostic Workup Enquiry' })}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 transition-colors shrink-0"
          >
            Enquire About Testing
          </button>
        </div>

      </div>
    </section>
  );
};
