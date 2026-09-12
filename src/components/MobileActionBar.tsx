import React from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Calendar, MessageSquare } from 'lucide-react';

export const MobileActionBar: React.FC = () => {
  const { settings, openAppointmentModal } = useApp();

  const whatsappMessage = encodeURIComponent(
    settings.whatsappPreFill || "Hello, I would like to book an appointment with Dr. Kritarth."
  );
  const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl flex items-center justify-between gap-2 safe-area-bottom">
      
      {/* Call Button */}
      <a
        href={`tel:${settings.phonePrimary}`}
        className="flex-1 py-2.5 px-2 rounded-xl bg-slate-100 active:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-teal-600" />
        <span>Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${cleanPhone}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-2.5 px-2 rounded-xl bg-emerald-50 active:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 border border-emerald-200 transition-colors"
      >
        <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
        <span>WhatsApp</span>
      </a>

      {/* Book Appointment Button */}
      <button
        onClick={() => openAppointmentModal()}
        className="flex-[1.5] py-2.5 px-3 rounded-xl bg-teal-700 active:bg-teal-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-teal-700/20 transition-all"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Book Slot</span>
      </button>

    </div>
  );
};
