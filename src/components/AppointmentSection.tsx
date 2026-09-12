import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Phone,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  X,
  User,
  Mail,
  FileText,
  ShieldCheck
} from 'lucide-react';

interface AppointmentFormProps {
  isModal?: boolean;
  onClose?: () => void;
}

export const AppointmentSection: React.FC<AppointmentFormProps> = ({ isModal = false, onClose }) => {
  const { settings, submitAppointment, appointmentPrefill, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    location: appointmentPrefill.location || settings.primaryHospital,
    preferredDate: '',
    concern: appointmentPrefill.concern || 'General Pulmonology Consultation',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (appointmentPrefill.concern) {
      setFormData((prev) => ({ ...prev, concern: appointmentPrefill.concern || prev.concern }));
    }
    if (appointmentPrefill.location) {
      setFormData((prev) => ({ ...prev, location: appointmentPrefill.location || prev.location }));
    }
  }, [appointmentPrefill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic validation
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMessage('Please provide a valid contact phone number.');
      return;
    }

    setIsSubmitting(true);
    const success = await submitAppointment({
      fullName: formData.name,
      phone: formData.phone,
      email: formData.email,
      age: formData.age,
      preferredLocation: formData.location,
      preferredDate: formData.preferredDate || new Date().toISOString().split('T')[0],
      concern: formData.concern,
      message: formData.message
    });

    setIsSubmitting(false);

    if (success) {
      setIsSuccess(true);
      showToast('Appointment request received');
    } else {
      setErrorMessage('Unable to submit enquiry at this time. Please call the clinic directly.');
    }
  };

  const formContent = (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 ${!isModal ? 'border border-slate-200/80 shadow-md' : ''}`}>
      {isSuccess ? (
        <div className="py-8 text-center animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-slate-900 mb-2">
            Appointment Request Received
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
            Thank you, <strong>{formData.name}</strong>. Our clinical coordination desk at {formData.location} will review Dr. Kritarth&apos;s OPD schedule and contact you at <strong>{formData.phone}</strong> to confirm your slot.
          </p>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 max-w-sm mx-auto mb-6 space-y-1 text-left">
            <div><strong>Consultation:</strong> {formData.concern}</div>
            <div><strong>Preferred Date:</strong> {formData.preferredDate || 'Earliest Available'}</div>
            <div><strong>Location:</strong> {formData.location}</div>
          </div>

          <div className="flex justify-center gap-3">
            {isModal && onClose ? (
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white bg-teal-700 hover:bg-teal-800"
              >
                Close
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    age: '',
                    location: settings.primaryHospital,
                    preferredDate: '',
                    concern: 'General Pulmonology Consultation',
                    message: ''
                  });
                }}
                className="px-6 py-2.5 rounded-xl font-semibold text-xs text-teal-800 bg-teal-50 border border-teal-200"
              >
                Book Another Appointment
              </button>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-2">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900">
              Schedule Your Consultation
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select your preferred OPD facility and clinical concern. Our hospital team will confirm your slot.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Gurpreet Singh"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-teal-600 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 79861 48502"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-teal-600 shadow-2xs"
              />
            </div>
          </div>

          {/* Email & Age */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-teal-600 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Patient Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="e.g. 45"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-teal-600 shadow-2xs"
              />
            </div>
          </div>

          {/* Location & Preferred Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Consultation Location
              </label>
              <select
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-teal-600 shadow-2xs bg-white"
              >
                <option value="Livasa Hospital, Sector 71, Mohali">Livasa Hospital, Sector 71, Mohali</option>
                <option value="Dhillon Medical Center, Phase 7, Mohali">Dhillon Medical Center, Phase 7, Mohali</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-teal-600 shadow-2xs bg-white"
              />
            </div>
          </div>

          {/* Primary Concern */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Primary Respiratory Concern <span className="text-rose-500">*</span>
            </label>
            <select
              required
              value={formData.concern}
              onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-teal-600 shadow-2xs bg-white"
            >
              <option value="General Pulmonology Consultation">General Pulmonology Consultation</option>
              <option value="Asthma Consultation">Asthma Consultation</option>
              <option value="COPD Consultation">COPD Consultation</option>
              <option value="Chronic Cough Evaluation">Chronic Cough Evaluation</option>
              <option value="Breathing Difficulty / Shortness of Breath">Breathing Difficulty / Shortness of Breath</option>
              <option value="Chest Infection / Recurrent Respiratory Infection">Chest Infection / Recurrent Respiratory Infection</option>
              <option value="Sleep Medicine Consultation">Sleep Medicine Consultation</option>
              <option value="Snoring & Sleep Apnea Evaluation">Snoring & Sleep Apnea Evaluation</option>
              <option value="Critical Care Follow-up">Critical Care Follow-up</option>
              <option value="Pulmonary Function / Respiratory Evaluation">Pulmonary Function / Respiratory Evaluation</option>
              <option value="Second Opinion / Follow-up Consultation">Second Opinion / Follow-up Consultation</option>
            </select>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Brief Symptoms / Existing Reports (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="e.g. Coughing for 4 weeks, have previous chest X-Ray, currently using blue inhaler..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-teal-600 shadow-2xs"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl font-heading font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 shadow-md shadow-teal-700/20 transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Submitting Request...
              </span>
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                <span>Confirm Appointment Request</span>
              </>
            )}
          </button>

          <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Strict medical confidentiality. Your information is encrypted and never shared.</span>
          </div>
        </form>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
        <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 relative max-h-[92vh] overflow-y-auto">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 z-10"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <section id="appointment-section" className="py-20 bg-gradient-to-b from-white to-[#f4fbfb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hospital & OPD Timings info */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Consultation Desk
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-3 mb-4">
              Book an In-Person Consultation with Dr. Kritarth
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              Consult for chronic coughing, breathlessness, asthma, COPD, sleep disorders, and interventional bronchoscopy procedures at Livasa Hospital Mohali and Dhillon Medical Center.
            </p>

            {/* Timings cards */}
            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">OPD Consultation Hours</div>
                  <div className="text-xs text-slate-600 mt-0.5">{settings.opdHoursMohali}</div>
                  <div className="text-[11px] text-teal-700 font-medium mt-1">Monday through Saturday</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{settings.primaryHospital}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{settings.addressMohali}</div>
                  <div className="text-[11px] text-slate-500 mt-1">Also visiting Dhillon Medical Center</div>
                </div>
              </div>
            </div>

            {/* Direct Calling helpline */}
            <div className="flex items-center gap-3">
              <a
                href={`tel:${settings.phonePrimary}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>Call Directly: {settings.phonePrimary}</span>
              </a>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="lg:col-span-6">
            {formContent}
          </div>

        </div>
      </div>
    </section>
  );
};
