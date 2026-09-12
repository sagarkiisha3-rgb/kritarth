import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DoctorVideo } from '../types';
import {
  Play,
  Clock,
  Tag,
  X,
  Video,
  Film
} from 'lucide-react';

export const VideoSection: React.FC = () => {
  const { videos } = useApp();
  const [activeVideo, setActiveVideo] = useState<DoctorVideo | null>(null);

  if (!videos || videos.length === 0) return null;

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Video Education
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-3">
              Doctor Explains
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
            Short, patient-friendly video guides on clinical inhaler technique, sleep apnea risks, and bronchoscopy expectations.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveVideo(vid)}
              className="bg-slate-50/60 rounded-3xl overflow-hidden border border-slate-200/80 hover:border-teal-200 shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail with overlay play button */}
                <div className="aspect-[16/9] relative bg-slate-800 overflow-hidden">
                  <img
                    src={vid.thumbnailUrl || "/src/assets/images/clinic_suite_interior_1789018639524.jpg"}
                    alt={vid.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-teal-700 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white transition-all">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {vid.duration}
                  </div>
                </div>

                <div className="p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    {vid.category}
                  </span>
                  <h3 className="font-heading font-bold text-slate-900 text-sm mt-2 mb-1.5 group-hover:text-teal-700 transition-colors leading-snug">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 text-[11px] font-semibold text-teal-700 flex items-center gap-1">
                <span>Watch Explanation</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-teal-600" />
                <span className="font-heading font-bold text-slate-900 text-base">
                  {activeVideo.title}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video embed or medical simulation player */}
            <div className="aspect-[16/9] bg-slate-900 rounded-2xl overflow-hidden relative flex items-center justify-center mb-4">
              {activeVideo.videoUrl.includes('youtube') || activeVideo.videoUrl.includes('vimeo') ? (
                <iframe
                  src={activeVideo.videoUrl}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center p-6 text-white">
                  <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center mx-auto mb-3">
                    <Video className="w-8 h-8" />
                  </div>
                  <p className="font-semibold text-sm mb-1">{activeVideo.title}</p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Clinical educational video streaming from Livasa Pulmonology Media Library.
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {activeVideo.description}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setActiveVideo(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
