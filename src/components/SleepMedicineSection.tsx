import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Moon,
  Sun,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Activity,
  BedDouble
} from 'lucide-react';

export const SleepMedicineSection: React.FC = () => {
  const { openAppointmentModal, navigate } = useApp();

  // Questionnaire state
  const [answers, setAnswers] = useState({
    snore: false,
    wakeTired: false,
    pauses: false,
    daytimeSleepy: false
  });
  const [hasCalculated, setHasCalculated] = useState(false);

  const calculateRisk = () => {
    setHasCalculated(true);
  };

  const resetCalculator = () => {
    setAnswers({
      snore: false,
      wakeTired: false,
      pauses: false,
      daytimeSleepy: false
    });
    setHasCalculated(false);
  };

  const positiveCount = Object.values(answers).filter(Boolean).length;
  const isHighRisk = positiveCount >= 3 || answers.pauses;
  const isModerateRisk = positiveCount === 2 && !answers.pauses;
  const isLowRisk = positiveCount <= 1 && !answers.pauses;

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#121c2b] via-[#1a2d42] to-[#1e3a4c] text-white">
      {/* Background subtle twilight night aura */}
      <div className="absolute -top-24 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-4">
            <Moon className="w-3.5 h-3.5 text-cyan-400" />
            Sleep Medicine &amp; Sleep Apnea Care
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Your Sleep May Be Affecting Your Breathing
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Repeated nighttime airway collapse starves vital organs of oxygen, causes loud snoring,
            and leads to dangerous daytime fatigue. A scientific sleep study identifies the root cause.
          </p>
        </div>

        {/* 5 Core Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-14">
          {[
            { title: "Habitual Snoring", desc: "Noisy nighttime airway vibration disturbing sleep" },
            { title: "Obstructive Sleep Apnea", desc: "Repeated airway blockage and choking pauses" },
            { title: "Daytime Sleepiness", desc: "Unrefreshing rest and excessive daytime nodding off" },
            { title: "Nocturnal Hypoxemia", desc: "Critical drops in blood oxygen during deep sleep" },
            { title: "Cardiovascular Strain", desc: "Hypertension, morning headaches & heart stress" }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-bold mb-3">
                0{idx + 1}
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Sleep Risk Questionnaire & Educational CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Questionnaire Card */}
          <div className="lg:col-span-7 bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white">
                    Interactive Sleep Risk Screener
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Answer 4 clinical questions to assess your risk profile for Obstructive Sleep Apnea (OSA).
                  </p>
                </div>
                <BedDouble className="w-8 h-8 text-cyan-400 shrink-0 opacity-80" />
              </div>

              {/* Questions */}
              <div className="space-y-3.5 mb-6">
                {[
                  {
                    key: 'snore' as const,
                    q: "Do you snore loudly enough to be heard through closed doors or disturb your bed partner?"
                  },
                  {
                    key: 'wakeTired' as const,
                    q: "Do you wake up feeling tired, unrefreshed, or with a dry throat / morning headache?"
                  },
                  {
                    key: 'pauses' as const,
                    q: "Has anyone observed you stop breathing, gasp, or choke during sleep?"
                  },
                  {
                    key: 'daytimeSleepy' as const,
                    q: "Do you experience excessive daytime fatigue or doze off during passive activities?"
                  }
                ].map((item, idx) => (
                  <label
                    key={item.key}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                      answers[item.key]
                        ? 'bg-cyan-500/20 border-cyan-400/70 text-white'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium pr-3 leading-relaxed">
                      <span className="text-cyan-400 font-bold mr-1.5">{idx + 1}.</span>
                      {item.q}
                    </span>
                    <input
                      type="checkbox"
                      checked={answers[item.key]}
                      onChange={(e) => {
                        setAnswers({ ...answers, [item.key]: e.target.checked });
                        setHasCalculated(false);
                      }}
                      className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500 bg-slate-900 border-slate-700 shrink-0"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              {!hasCalculated ? (
                <button
                  onClick={calculateRisk}
                  className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01]"
                >
                  Check Your Sleep Risk
                </button>
              ) : (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div
                    className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                      isHighRisk
                        ? 'bg-rose-950/60 border-rose-500/60 text-rose-200'
                        : isModerateRisk
                        ? 'bg-amber-950/60 border-amber-500/60 text-amber-200'
                        : 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                    }`}
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-sm mb-1">
                        {isHighRisk
                          ? 'Elevated Risk for Obstructive Sleep Apnea (OSA)'
                          : isModerateRisk
                          ? 'Moderate Risk for Sleep Disordered Breathing'
                          : 'Low Risk Indicators Reported'}
                      </div>
                      <p>
                        {isHighRisk
                          ? 'Your responses, particularly witnessed breathing pauses or severe daytime exhaustion, strongly suggest significant airway obstruction during sleep. A Level 1 Polysomnography test is recommended.'
                          : isModerateRisk
                          ? 'You are experiencing symptoms consistent with sleep fragmentation. A clinical pulmonology evaluation can determine whether a sleep study is warranted.'
                          : 'Your answers reflect few classic apnea indicators. However, if chronic unrefreshing sleep persists, clinical consultation can explore other sleep hygiene factors.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <button
                      onClick={resetCalculator}
                      className="text-xs text-slate-400 hover:text-white underline"
                    >
                      Reset Screener
                    </button>
                    <button
                      onClick={() => openAppointmentModal({ concern: 'Sleep Apnea & Snoring Evaluation' })}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300"
                    >
                      Book Sleep Consultation
                    </button>
                  </div>
                </div>
              )}

              {/* Mandatory Medical Disclaimer */}
              <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400">
                <strong>Medical Notice:</strong> This screening tool does not provide a medical diagnosis.
                A definitive diagnosis of sleep apnea requires a diagnostic sleep study (Polysomnography) evaluated by a sleep physician.
              </div>
            </div>

          </div>

          {/* Right Column: Polysomnography Sleep Study Details */}
          <div className="lg:col-span-5 bg-gradient-to-b from-white/10 to-white/5 rounded-3xl p-6 sm:p-8 border border-white/15 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold mb-3">
                <Activity className="w-3.5 h-3.5" />
                Comprehensive Diagnostics
              </div>

              <h3 className="font-heading font-bold text-2xl text-white mb-3">
                Polysomnography (Sleep Study)
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Conducted either in our dedicated sleep laboratory suite at Livasa Hospital or through approved Home Sleep Apnea Testing (HSAT). The test continuously records:
              </p>

              <div className="space-y-2.5 mb-6 text-xs text-slate-200">
                {[
                  "Continuous electroencephalogram (EEG) to map sleep architecture & micro-arousals",
                  "Nasal cannula airflow sensor to detect hypopneas & apneas",
                  "Chest and abdominal effort belts for respiratory drive measurement",
                  "Continuous high-precision pulse oximetry for nocturnal desaturations",
                  "Snoring microphone and body position tracking"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => navigate('condition', 'sleep-apnea')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Read OSA Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => openAppointmentModal({ concern: 'Sleep Study / Polysomnography Booking' })}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-all flex items-center justify-center gap-1.5"
              >
                Schedule Sleep Study
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
