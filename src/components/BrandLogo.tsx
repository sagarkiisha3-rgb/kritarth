import React from 'react';
import { useApp } from '../context/AppContext';

interface BrandLogoProps {
  isMobileCompact?: boolean;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ isMobileCompact = false, onClick }) => {
  const { settings } = useApp();
  const doctorName = settings?.doctorName || 'Dr. Kritarth';
  const doctorDesignation = settings?.doctorDesignation || 'Consultant – Pulmonary Medicine';

  return (
    <button
      id="brand-logo-btn"
      onClick={onClick}
      className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer select-none"
      aria-label={`${doctorName} - ${doctorDesignation}`}
    >
      {/* Compact Vector Brand Icon */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#0B6F73] via-[#0E7C81] to-[#102A2E] flex items-center justify-center text-white shadow-md shadow-[#0B6F73]/20 group-hover:scale-[1.02] transition-all duration-300 shrink-0 border border-white/20">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[1.8]"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 4V28"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M16 13C16 15 11 15.5 8.5 17"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M16 13C16 15 21 15.5 23.5 17"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M7 17.5C5 19.5 4.5 23 6 25.5C7.5 28 11.5 27.5 13 25.5C14 24 14 21 13 19C12 17 9 16.5 7 17.5Z"
            fill="currentColor"
            fillOpacity="0.25"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M25 17.5C27 19.5 27.5 23 26 25.5C24.5 28 20.5 27.5 19 25.5C18 24 18 21 19 19C20 17 23 16.5 25 17.5Z"
            fill="currentColor"
            fillOpacity="0.25"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      {/* Brand Name & Credentials */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-heading font-extrabold text-base sm:text-lg text-[#102A2E] tracking-tight leading-tight group-hover:text-[#0B6F73] transition-colors truncate">
            {doctorName}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#DDF4F2] text-[#0B6F73] border border-[#0B6F73]/20 tracking-wider uppercase whitespace-nowrap">
            DM Pulmonology
          </span>
        </div>

        {!isMobileCompact && (
          <p className="text-[11px] sm:text-xs text-[#607378] font-medium truncate tracking-tight leading-tight mt-0.5">
            {doctorDesignation}
          </p>
        )}
      </div>
    </button>
  );
};
