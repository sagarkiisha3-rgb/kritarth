import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Calendar,
  Phone,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Share2,
  FileText,
  Stethoscope,
  Activity,
  ArrowRight
} from 'lucide-react';

export const ConditionDetailPage: React.FC = () => {
  const { services, selectedConditionSlug, navigate, openAppointmentModal, blogs, settings, showToast } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Find current condition or fallback to first
  const currentService =
    services.find((s) => s.slug === selectedConditionSlug) ||
    services[0];

  const relatedBlogs = blogs.filter(
    (b) =>
      b.category.toLowerCase().includes(currentService.slug.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(currentService.slug.toLowerCase()))
  ).slice(0, 2);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Page link copied to clipboard');
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#fbfdff]">
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-100 py-3 mb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => navigate('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-teal-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 text-xs flex items-center gap-1"
              title="Share Article"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => openAppointmentModal({ concern: `${currentService.title} Consultation` })}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-2xs"
            >
              Consult Doctor
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Main Article Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4 border border-teal-200">
            <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
            Specialist Pulmonology Guide
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 tracking-tight mb-4">
            {currentService.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            {currentService.shortDescription}
          </p>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span>Author: <strong>{settings.doctorName}</strong> (DM Pulmonology)</span>
            <span>•</span>
            <span>Hospital: <strong>{settings.primaryHospital}</strong></span>
            <span>•</span>
            <span>Evidence-Based Clinical Overview</span>
          </div>
        </div>

        {/* 1. Simple Overview */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs mb-8">
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 mb-3">
            Overview &amp; Understanding the Condition
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            {currentService.detailedOverview}
          </p>
        </div>

        {/* 2. Symptoms & Possible Causes (2 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Common Symptoms */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg">
                Common Symptoms
              </h3>
            </div>
            <ul className="space-y-3">
              {currentService.commonSymptoms.map((sym, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Possible Causes */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-slate-900 text-lg">
                Possible Causes &amp; Risk Triggers
              </h3>
            </div>
            <ul className="space-y-3">
              {currentService.possibleCauses.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0 mt-2" />
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 3. When to Consult a Pulmonologist */}
        <div className="bg-amber-50/50 rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-2xs mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <h3 className="font-heading font-bold text-slate-900 text-xl">
              When Should You Consult a Lung Specialist?
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            Do not ignore respiratory symptoms if they fail to improve with routine primary care medicines:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentService.whenToConsult.map((when, idx) => (
              <div key={idx} className="p-3 bg-white rounded-xl border border-amber-100 text-xs sm:text-sm text-slate-800 flex items-start gap-2">
                <span className="font-bold text-amber-700">•</span>
                <span>{when}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Diagnosis & Treatment Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs">
            <h3 className="font-heading font-bold text-slate-900 text-lg mb-3">
              Diagnostic Approach
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Comprehensive evaluation protocol to accurately define underlying disease severity:
            </p>
            <ul className="space-y-2.5">
              {currentService.diagnosisApproach.map((diag, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{diag}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-2xs">
            <h3 className="font-heading font-bold text-slate-900 text-lg mb-3">
              Personalized Treatment Plan
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Tailored medical therapies targeting airway healing and preventing complications:
            </p>
            <ul className="space-y-2.5">
              {currentService.treatmentApproach.map((trt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{trt}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 5. Frequently Asked Questions (Accordion) */}
        {currentService.faqs && currentService.faqs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs mb-8">
            <h3 className="font-heading font-bold text-slate-900 text-xl mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {currentService.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-heading font-semibold text-slate-900 text-sm sm:text-base">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-teal-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Book Appointment CTA Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-teal-700 to-cyan-800 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200 bg-teal-900/60 px-3 py-1 rounded-full">
              Expert Respiratory Consultation
            </span>
            <h3 className="font-heading font-bold text-2xl text-white mt-2">
              Concerned about {currentService.title}?
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl leading-relaxed">
              Consult Dr. Kritarth at Livasa Hospital Mohali for advanced lung function testing, personalized diagnosis, and therapeutic management.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => openAppointmentModal({ concern: `${currentService.title} Consultation` })}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-heading font-bold text-xs sm:text-sm text-slate-900 bg-white hover:bg-teal-50 shadow-md transition-all text-center"
            >
              Book Consultation
            </button>
            <a
              href={`tel:${settings.phonePrimary}`}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-teal-900/60 hover:bg-teal-900 border border-teal-500/40 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Clinic</span>
            </a>
          </div>
        </div>

        {/* Related Educational Articles */}
        {relatedBlogs.length > 0 && (
          <div className="pt-8 border-t border-slate-200">
            <h3 className="font-heading font-bold text-slate-900 text-xl mb-4">
              Related Respiratory Articles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedBlogs.map((blog) => (
                <div
                  key={blog.id}
                  onClick={() => navigate('blog-detail', blog.slug)}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
                      {blog.category}
                    </span>
                    <h4 className="font-heading font-bold text-slate-900 text-base mt-2 mb-1">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {blog.summary}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-teal-700">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
