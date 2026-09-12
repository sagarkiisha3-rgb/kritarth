import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const { settings } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  const whatsappMessage = encodeURIComponent(
    settings.whatsappPreFill || "Hello Dr. Kritarth, I would like to schedule a consultation regarding respiratory / lung care."
  );
  const cleanPhone = (settings.whatsappNumber || "+917986148502").replace(/[^0-9]/g, '');

  return (
    <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end pointer-events-auto">
      {/* Tooltip prompt on hover */}
      {isHovered && (
        <div className="mb-2 bg-[#10272B] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200 whitespace-nowrap">
          Chat for OPD Assistance
        </div>
      )}

      {/* Sleek Circular WhatsApp Action Button */}
      <a
        href={`https://wa.me/${cleanPhone}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat on WhatsApp with Dr. Kritarth Clinic"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all group cursor-pointer border border-emerald-400/30"
      >
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-white stroke-none group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
