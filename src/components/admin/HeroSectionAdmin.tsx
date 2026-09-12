import React, { useState, useRef, useEffect } from 'react';
import { WebsiteSettings, MediaItem } from '../../types';
import doctorKritarthClinicHero from '../../assets/images/doctor_kritarth_clinic_hero.webp';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  Sliders,
  Sparkles,
  Smartphone,
  Monitor,
  Move,
  ZoomIn,
  Target,
  RotateCcw,
  ShieldAlert,
  Info,
  Check
} from 'lucide-react';

interface HeroSectionAdminProps {
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => Promise<boolean>;
  uploadMedia: (file: File, category: string, altText?: string, caption?: string) => Promise<MediaItem | null>;
  showToast: (msg: string) => void;
  navigate: (route: string) => void;
}

export const HeroSectionAdmin: React.FC<HeroSectionAdminProps> = ({
  settings,
  updateSettings,
  uploadMedia,
  showToast,
  navigate
}) => {
  // Active Preview & Edit Device
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Hero Media State
  const [desktopImageUrl, setDesktopImageUrl] = useState<string>(
    settings.heroImageUrlDesktop || settings.heroImageUrl || ''
  );
  const [mobileImageUrl, setMobileImageUrl] = useState<string>(
    settings.heroImageUrlMobile || ''
  );

  // Desktop Focal & Zoom State (Default 72% X, 30% Y)
  const [desktopFocalX, setDesktopFocalX] = useState<number>(
    settings.heroDesktopPositionX ?? 72
  );
  const [desktopFocalY, setDesktopFocalY] = useState<number>(
    settings.heroDesktopPositionY ?? 30
  );
  const [desktopZoom, setDesktopZoom] = useState<number>(
    settings.heroDesktopZoom ?? 100
  );

  // Mobile Focal & Zoom State (Default 50% X, 18% Y)
  const [mobileFocalX, setMobileFocalX] = useState<number>(
    settings.heroMobilePositionX ?? 50
  );
  const [mobileFocalY, setMobileFocalY] = useState<number>(
    settings.heroMobilePositionY ?? 18
  );
  const [mobileZoom, setMobileZoom] = useState<number>(
    settings.heroMobileZoom ?? 100
  );

  // General Settings
  const [displayMode, setDisplayMode] = useState<'cover' | 'contain' | 'custom'>(
    settings.heroDisplayMode === 'portrait' ? 'cover' : settings.heroDisplayMode || 'cover'
  );
  const [overlayStrength, setOverlayStrength] = useState<number>(
    settings.heroOverlayStrength ?? 65
  );
  const [overlayDirection, setOverlayDirection] = useState<'left-to-right' | 'right-to-left' | 'uniform'>(
    settings.heroOverlayDirection || 'left-to-right'
  );
  const [imageAlt, setImageAlt] = useState<string>(
    settings.heroImageAlt || 'Dr. Kritarth – Consultant Pulmonologist & Sleep Specialist'
  );

  // Image Dimension Inspection
  const [detectedRatio, setDetectedRatio] = useState<number | null>(null);
  const [isPortraitUploaded, setIsPortraitUploaded] = useState<boolean>(false);

  // File Upload State
  const [desktopFile, setDesktopFile] = useState<File | null>(null);
  const [mobileFile, setMobileFile] = useState<File | null>(null);
  const [desktopPreview, setDesktopPreview] = useState<string | null>(null);
  const [mobilePreview, setMobilePreview] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDesktopDragOver, setIsDesktopDragOver] = useState(false);
  const [isMobileDragOver, setIsMobileDragOver] = useState(false);

  // Drag-to-reposition in live preview
  const [isDraggingFocal, setIsDraggingFocal] = useState(false);
  const previewBoxRef = useRef<HTMLDivElement>(null);

  // Removal Confirmation Modal
  const [showRemoveModal, setShowRemoveModal] = useState<'desktop' | 'mobile' | null>(null);

  const desktopFileInputRef = useRef<HTMLInputElement>(null);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when settings change
  useEffect(() => {
    setDesktopImageUrl(settings.heroImageUrlDesktop || settings.heroImageUrl || '');
    setMobileImageUrl(settings.heroImageUrlMobile || '');
    setDesktopFocalX(settings.heroDesktopPositionX ?? 72);
    setDesktopFocalY(settings.heroDesktopPositionY ?? 30);
    setDesktopZoom(settings.heroDesktopZoom ?? 100);
    setMobileFocalX(settings.heroMobilePositionX ?? 50);
    setMobileFocalY(settings.heroMobilePositionY ?? 18);
    setMobileZoom(settings.heroMobileZoom ?? 100);
    setDisplayMode(settings.heroDisplayMode === 'portrait' ? 'cover' : settings.heroDisplayMode || 'cover');
    setOverlayStrength(settings.heroOverlayStrength ?? 65);
    setOverlayDirection(settings.heroOverlayDirection || 'left-to-right');
    setImageAlt(settings.heroImageAlt || 'Dr. Kritarth – Consultant Pulmonologist & Sleep Specialist');
  }, [settings]);

  // Inspect image aspect ratio
  useEffect(() => {
    const srcToInspect = desktopPreview || desktopImageUrl || doctorKritarthClinicHero;
    if (srcToInspect) {
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          const ratio = img.naturalWidth / img.naturalHeight;
          setDetectedRatio(ratio);
          setIsPortraitUploaded(ratio < 0.85);
        }
      };
      img.src = srcToInspect;
    }
  }, [desktopPreview, desktopImageUrl]);

  // Handle Desktop File Selection
  const handleDesktopFileChange = (file: File) => {
    if (!validateFile(file)) return;
    setDesktopFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setDesktopPreview(result);
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth && img.naturalHeight) {
          const ratio = img.naturalWidth / img.naturalHeight;
          setDetectedRatio(ratio);
          if (ratio < 0.85) {
            setIsPortraitUploaded(true);
            showToast('Portrait image uploaded. Adjust focal point to keep doctor visible on right.');
          } else {
            setIsPortraitUploaded(false);
            showToast('Landscape hero image uploaded successfully.');
          }
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  // Handle Mobile File Selection
  const handleMobileFileChange = (file: File) => {
    if (!validateFile(file)) return;
    setMobileFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setMobilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showToast('Please select a valid image file (JPG, PNG, or WEBP).');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast('Image file size exceeds the 10MB limit.');
      return false;
    }
    return true;
  };

  // Drag-to-reposition handler inside Admin Live Preview
  const handlePreviewPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDraggingFocal(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFocalFromPointer(e);
  };

  const handlePreviewPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingFocal) {
      updateFocalFromPointer(e);
    }
  };

  const handlePreviewPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDraggingFocal(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  const updateFocalFromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!previewBoxRef.current) return;
    const rect = previewBoxRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.max(0, Math.min(100, Math.round(((e.clientY - rect.top) / rect.height) * 100)));

    if (activeDevice === 'desktop') {
      setDesktopFocalX(x);
      setDesktopFocalY(y);
    } else {
      setMobileFocalX(x);
      setMobileFocalY(y);
    }
  };

  // 3x3 Position Grid Presets
  const applyPositionPreset = (x: number, y: number) => {
    if (activeDevice === 'desktop') {
      setDesktopFocalX(x);
      setDesktopFocalY(y);
    } else {
      setMobileFocalX(x);
      setMobileFocalY(y);
    }
  };

  // Subject Position Presets
  const applySubjectPreset = (preset: 'left' | 'center' | 'right') => {
    if (activeDevice === 'desktop') {
      if (preset === 'right') {
        setDesktopFocalX(72);
        setDesktopFocalY(30);
      } else if (preset === 'center') {
        setDesktopFocalX(50);
        setDesktopFocalY(30);
      } else {
        setDesktopFocalX(25);
        setDesktopFocalY(30);
      }
    } else {
      setMobileFocalX(50);
      setMobileFocalY(18);
    }
  };

  // Reset Position
  const resetPosition = () => {
    if (activeDevice === 'desktop') {
      setDesktopFocalX(72);
      setDesktopFocalY(30);
      setDesktopZoom(100);
      setOverlayStrength(65);
    } else {
      setMobileFocalX(50);
      setMobileFocalY(18);
      setMobileZoom(100);
    }
    showToast('Reset focal position & zoom to defaults (Desktop: 72% X, 30% Y; Mobile: 50% X, 18% Y).');
  };

  // Confirm Removal
  const handleRemoveImage = (type: 'desktop' | 'mobile') => {
    if (type === 'desktop') {
      setDesktopFile(null);
      setDesktopPreview(null);
      setDesktopImageUrl('');
      setDesktopFocalX(72);
      setDesktopFocalY(30);
      setDesktopZoom(100);
      setOverlayStrength(65);
      showToast('Desktop hero image reset to default fallback.');
    } else {
      setMobileFile(null);
      setMobilePreview(null);
      setMobileImageUrl('');
      setMobileFocalX(50);
      setMobileFocalY(18);
      setMobileZoom(100);
      showToast('Mobile hero image removed.');
    }
    setShowRemoveModal(null);
  };

  // Save Settings Submit
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setIsUploading(true);

    try {
      let finalDesktopUrl = desktopImageUrl;
      let finalMobileUrl = mobileImageUrl;

      if (desktopFile) {
        const uploaded = await uploadMedia(
          desktopFile,
          'Hero Images',
          imageAlt || 'Hero Desktop Background',
          'Homepage Desktop Hero Image'
        );
        if (uploaded?.url) finalDesktopUrl = uploaded.url;
      }

      if (mobileFile) {
        const uploaded = await uploadMedia(
          mobileFile,
          'Hero Images',
          imageAlt || 'Hero Mobile Background',
          'Homepage Mobile Hero Image'
        );
        if (uploaded?.url) finalMobileUrl = uploaded.url;
      }

      const desktopPosString = `${desktopFocalX}% ${desktopFocalY}%`;
      const mobilePosString = `${mobileFocalX}% ${mobileFocalY}%`;

      const success = await updateSettings({
        heroImageUrlDesktop: finalDesktopUrl,
        heroImageUrl: finalDesktopUrl,
        heroImageUrlMobile: finalMobileUrl,
        heroImagePositionDesktop: desktopPosString,
        heroImagePositionMobile: mobilePosString,
        heroDesktopPositionX: desktopFocalX,
        heroDesktopPositionY: desktopFocalY,
        heroDesktopZoom: desktopZoom,
        heroMobilePositionX: mobileFocalX,
        heroMobilePositionY: mobileFocalY,
        heroMobileZoom: mobileZoom,
        heroImageFit: 'cover',
        heroDisplayMode: 'cover',
        heroOverlayStrength: overlayStrength,
        heroOverlayDirection: overlayDirection,
        heroImageAlt: imageAlt
      });

      setIsUploading(false);
      setIsSaving(false);

      if (success) {
        setDesktopFile(null);
        setDesktopPreview(null);
        setMobileFile(null);
        setMobilePreview(null);
        showToast('Hero background updated successfully.');
      } else {
        showToast('Failed to update hero section. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      setIsSaving(false);
      showToast('An error occurred while saving changes.');
    }
  };

  // Active display image
  const activeDesktopDisplay = desktopPreview || desktopImageUrl || doctorKritarthClinicHero;
  const activeMobileDisplay = mobilePreview || mobileImageUrl || activeDesktopDisplay;
  const currentDisplayImage = activeDevice === 'desktop' ? activeDesktopDisplay : activeMobileDisplay;

  const currentFocalX = activeDevice === 'desktop' ? desktopFocalX : mobileFocalX;
  const currentFocalY = activeDevice === 'desktop' ? desktopFocalY : mobileFocalY;
  const currentZoom = activeDevice === 'desktop' ? desktopZoom : mobileZoom;

  const computeGradientCss = () => {
    const alpha = overlayStrength / 100;
    if (overlayDirection === 'right-to-left') {
      return `linear-gradient(270deg, rgba(4, 27, 32, ${alpha * 0.96}) 0%, rgba(4, 27, 32, ${alpha * 0.85}) 30%, rgba(4, 27, 32, ${alpha * 0.4}) 60%, rgba(4, 27, 32, 0.05) 100%)`;
    } else if (overlayDirection === 'uniform') {
      return `rgba(4, 27, 32, ${alpha * 0.75})`;
    }
    return `linear-gradient(90deg, rgba(4, 27, 32, ${Math.min(0.96, alpha * 1.45)}) 0%, rgba(4, 27, 32, ${Math.min(0.88, alpha * 1.32)}) 22%, rgba(4, 27, 32, ${alpha * 1.03}) 40%, rgba(4, 27, 32, ${alpha * 0.46}) 58%, rgba(4, 27, 32, ${alpha * 0.12}) 75%, rgba(4, 27, 32, 0.02) 100%)`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-700 font-bold">
              <ImageIcon className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-heading font-extrabold text-slate-900">
              Full-Width Hero Background Management
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Uploaded images automatically become the full hero background image. Adjust focal point (X/Y) to keep the doctor visible on the right while left text remains 100% readable.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('home')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Eye className="w-4 h-4 text-teal-700" />
            <span>Preview Live Site</span>
          </button>
        </div>
      </div>

      {/* Recommended Dimension Banner */}
      <div className="bg-[#DDF4F2] border border-[#0B6F73]/30 rounded-3xl p-6 text-slate-900 flex flex-col sm:flex-row items-start gap-4 shadow-xs">
        <div className="p-3 rounded-2xl bg-[#0B6F73] text-white shrink-0 shadow-sm">
          <ImageIcon className="w-6 h-6" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-extrabold text-[#0B6F73] font-heading">
              Recommended Desktop Hero Image: 1920 × 900 px or 1920 × 1080 px
            </h3>
            <span className="text-[10px] uppercase font-extrabold bg-[#0B6F73] text-white px-2.5 py-0.5 rounded-full tracking-wider">
              Landscape
            </span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            For ideal full-bleed desktop performance, upload a <strong>1920 × 900 px or 1920 × 1080 px landscape photo</strong>.
          </p>
          {isPortraitUploaded && (
            <div className="pt-1 flex items-center gap-2 text-xs text-amber-800 font-semibold bg-amber-100/80 px-3 py-1.5 rounded-xl border border-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                "Portrait images may crop significantly in full-width desktop mode. Adjust focal point or upload a wider desktop hero image."
              </span>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSaveChanges} className="space-y-8">
        
        {/* ========================================================= */}
        {/* 1. FULL LIVE HERO PREVIEW CANVAS                          */}
        {/* ========================================================= */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Full Live Hero Preview (Click or Drag to Reposition Doctor)
              </span>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                type="button"
                onClick={() => setActiveDevice('desktop')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeDevice === 'desktop'
                    ? 'bg-teal-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop View</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveDevice('mobile')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeDevice === 'mobile'
                    ? 'bg-teal-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile View</span>
              </button>
            </div>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="relative flex justify-center">
            
            {/* Desktop Full Hero Background Preview */}
            {activeDevice === 'desktop' ? (
              <div
                ref={previewBoxRef}
                onPointerDown={handlePreviewPointerDown}
                onPointerMove={handlePreviewPointerMove}
                onPointerUp={handlePreviewPointerUp}
                className={`relative w-full rounded-2xl overflow-hidden border border-slate-700 bg-[#041B20] shadow-2xl select-none touch-none h-[320px] sm:h-[380px] ${
                  isDraggingFocal ? 'cursor-grabbing' : 'cursor-grab'
                }`}
              >
                {/* Background Image Media Layer */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={currentDisplayImage}
                    alt={imageAlt || 'Hero Background Preview'}
                    className="w-full h-full pointer-events-none transition-transform duration-75"
                    style={{
                      objectFit: 'cover',
                      objectPosition: `${currentFocalX}% ${currentFocalY}%`,
                      transform: `scale(${currentZoom / 100})`
                    }}
                  />
                  {/* Left-to-Right Clinical Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: computeGradientCss() }}
                  />
                </div>

                {/* Left Text Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-center text-left text-white pointer-events-none z-20">
                  <div className="text-[10px] font-bold text-teal-300 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <span className="w-3 h-[2px] bg-teal-300 rounded-full" />
                    <span>PULMONOLOGY • RESPIRATORY</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight font-heading">
                    Breathe Better.<br />
                    <span className="text-[#79D8D5]">Sleep Better.</span><br />
                    Live Better.
                  </h3>
                  <p className="text-[11px] text-white/80 line-clamp-2 mt-1 max-w-[280px]">
                    {settings.heroSubtitle || 'Specialized clinical care for complex lung diseases.'}
                  </p>
                  <div className="mt-2.5">
                    <span className="text-xs font-bold text-white block">Dr. Kritarth</span>
                    <span className="text-[10px] text-teal-300 block">Consultant – Pulmonary Medicine</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="px-3.5 py-1.5 rounded bg-[#0B6F73] text-white text-[11px] font-bold shadow-xs">
                      Book Appointment
                    </div>
                    <div className="px-3.5 py-1.5 rounded border border-white/40 text-white text-[11px] font-semibold">
                      Call Now
                    </div>
                  </div>
                </div>

                {/* Focal Point Targeting Dot */}
                <div
                  className="absolute w-7 h-7 rounded-full border-2 border-teal-400 bg-teal-400/30 shadow-[0_0_15px_rgba(20,184,166,0.8)] -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center z-30"
                  style={{
                    left: `${currentFocalX}%`,
                    top: `${currentFocalY}%`
                  }}
                >
                  <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
                </div>

                {/* Info Pill */}
                <div className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-[11px] px-3 py-1.5 rounded-full border border-slate-700 pointer-events-none flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 shadow-md z-30 font-semibold">
                  <span className="flex items-center gap-1 text-teal-400">
                    <Move className="w-3 h-3" />
                    <span>Horizontal Position: {currentFocalX}%</span>
                  </span>
                  <span className="hidden sm:inline text-slate-500">•</span>
                  <span className="text-teal-300">Vertical Position: {currentFocalY}%</span>
                </div>
              </div>
            ) : (
              /* Mobile Preview Simulation */
              <div
                ref={previewBoxRef}
                onPointerDown={handlePreviewPointerDown}
                onPointerMove={handlePreviewPointerMove}
                onPointerUp={handlePreviewPointerUp}
                className="relative w-full max-w-[320px] rounded-2xl overflow-hidden border border-slate-700 bg-[#0E3034] shadow-2xl select-none touch-none h-[420px] flex flex-col"
              >
                {/* Top Mobile Image Box */}
                <div className="h-[200px] w-full relative overflow-hidden bg-[#041B20]">
                  <img
                    src={currentDisplayImage}
                    alt={imageAlt || 'Hero Mobile'}
                    className="w-full h-full pointer-events-none"
                    style={{
                      objectFit: 'cover',
                      objectPosition: `${mobileFocalX}% ${mobileFocalY}%`,
                      transform: `scale(${mobileZoom / 100})`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0E3034]" />
                </div>

                {/* Bottom Content Panel */}
                <div className="p-4 text-left text-white space-y-2 flex-1">
                  <div className="text-[9px] font-bold text-teal-300 uppercase tracking-widest">
                    PULMONOLOGY • RESPIRATORY
                  </div>
                  <h4 className="text-base font-extrabold text-white leading-snug">
                    Breathe Better. Sleep Better.
                  </h4>
                  <p className="text-[10px] text-white/80 line-clamp-2">
                    {settings.heroSubtitle || 'Specialized clinical care for complex lung diseases.'}
                  </p>
                  <div className="pt-1 flex items-center gap-1.5">
                    <div className="px-2.5 py-1 rounded bg-[#0B6F73] text-white text-[10px] font-bold">
                      Book Appointment
                    </div>
                  </div>
                </div>

                {/* Focal Dot Target */}
                <div
                  className="absolute w-6 h-6 rounded-full border-2 border-teal-400 bg-teal-400/30 shadow-[0_0_15px_rgba(20,184,166,0.8)] -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center z-30"
                  style={{
                    left: `${mobileFocalX}%`,
                    top: `${mobileFocalY * 0.48}%`
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400">
            <span>💡 Click or drag anywhere on the hero preview above to move the doctor focal point.</span>
            <button
              type="button"
              onClick={resetPosition}
              className="px-3 py-1.5 rounded-lg bg-teal-950 border border-teal-500/40 text-teal-300 hover:bg-teal-900 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Position</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. IMAGE POSITIONING & OVERLAY CONTROLS                    */}
        {/* ========================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-lg font-heading font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-teal-700" />
              <span>Doctor Position &amp; Overlay Controls</span>
            </h3>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              Focal: {currentFocalX}% X, {currentFocalY}% Y ({activeDevice.toUpperCase()})
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Position Shortcuts & 3x3 Grid (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Subject Position Preset
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => applySubjectPreset('left')}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all ${
                      currentFocalX === 25 && currentFocalY === 30
                        ? 'border-teal-600 bg-teal-50 text-teal-900 shadow-2xs font-extrabold'
                        : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-teal-50'
                    }`}
                  >
                    Subject Left
                  </button>
                  <button
                    type="button"
                    onClick={() => applySubjectPreset('center')}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all ${
                      currentFocalX === 50 && currentFocalY === 30
                        ? 'border-teal-600 bg-teal-50 text-teal-900 shadow-2xs font-extrabold'
                        : 'border-slate-200 text-slate-700 bg-slate-50 hover:bg-teal-50'
                    }`}
                  >
                    Subject Center
                  </button>
                  <button
                    type="button"
                    onClick={() => applySubjectPreset('right')}
                    className={`py-2 px-2.5 rounded-xl border transition-all text-xs font-extrabold ${
                      currentFocalX === 72 && currentFocalY === 30
                        ? 'border-2 border-teal-600 text-teal-900 bg-teal-50 shadow-2xs'
                        : 'border-teal-400 text-teal-800 bg-teal-50/60 hover:bg-teal-50'
                    }`}
                  >
                    Subject Right ★ (Default)
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  ★ "Subject Right (72% X, 30% Y)" positions doctor on right side, keeping left area clean for text.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  2. 3×3 Focal Grid Presets
                </label>
                <div className="grid grid-cols-3 gap-2 max-w-[280px]">
                  {[
                    { label: 'Top L', x: 0, y: 0 },
                    { label: 'Top C', x: 50, y: 0 },
                    { label: 'Top R', x: 100, y: 0 },
                    { label: 'Mid L', x: 0, y: 50 },
                    { label: 'Center', x: 50, y: 50 },
                    { label: 'Mid R (72/30) ★', x: 72, y: 30 },
                    { label: 'Bot L', x: 0, y: 100 },
                    { label: 'Bot C', x: 50, y: 100 },
                    { label: 'Bot R', x: 100, y: 100 }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPositionPreset(preset.x, preset.y)}
                      className={`py-2 text-[11px] font-bold rounded-lg border transition-all ${
                        currentFocalX === preset.x && currentFocalY === preset.y
                          ? 'bg-teal-700 text-white border-teal-700 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Fine-Tune Sliders, Zoom, Overlay Strength & Direction (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Fine-Tune X & Y Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Horizontal Position X ({activeDevice === 'desktop' ? 'Desktop' : 'Mobile'})
                    </label>
                    <span className="text-xs font-extrabold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">
                      {currentFocalX}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={currentFocalX}
                    onChange={(e) => {
                      const val = Math.max(0, Math.min(100, Number(e.target.value)));
                      if (activeDevice === 'desktop') setDesktopFocalX(val);
                      else setMobileFocalX(val);
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">0% = Far Left, 100% = Far Right</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Vertical Position Y ({activeDevice === 'desktop' ? 'Desktop' : 'Mobile'})
                    </label>
                    <span className="text-xs font-extrabold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-md">
                      {currentFocalY}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={currentFocalY}
                    onChange={(e) => {
                      const val = Math.max(0, Math.min(100, Number(e.target.value)));
                      if (activeDevice === 'desktop') setDesktopFocalY(val);
                      else setMobileFocalY(val);
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">0% = Top, 100% = Bottom</p>
                </div>
              </div>

              {/* Image Zoom Control */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <ZoomIn className="w-4 h-4 text-teal-700" />
                    <span>Image Zoom Scale ({activeDevice === 'desktop' ? 'Desktop' : 'Mobile'})</span>
                  </label>
                  <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    {(currentZoom / 100).toFixed(2)}x ({currentZoom}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="125"
                  step="1"
                  value={currentZoom}
                  onChange={(e) => {
                    const val = Math.max(100, Math.min(125, Number(e.target.value)));
                    if (activeDevice === 'desktop') setDesktopZoom(val);
                    else setMobileZoom(val);
                  }}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Default: 1.00x (100%). Scale clamped between 1.00x and 1.25x to prevent excessive zoom crop.
                </p>
              </div>

              {/* Overlay Strength & Direction */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Overlay Darkness (Default: 65%)
                    </label>
                    <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      {overlayStrength}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={overlayStrength}
                    onChange={(e) => setOverlayStrength(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Overlay Gradient Direction
                  </label>
                  <select
                    value={overlayDirection}
                    onChange={(e) => setOverlayDirection(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-semibold focus:outline-teal-600"
                  >
                    <option value="left-to-right">Left to Right (Default for Left Text)</option>
                    <option value="right-to-left">Right to Left</option>
                    <option value="uniform">Uniform Dark Overlay</option>
                  </select>
                </div>
              </div>

              {/* Alt Text Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Image Alt Text (SEO &amp; Accessibility)
                </label>
                <input
                  type="text"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Dr. Kritarth – Consultant Pulmonologist & Sleep Specialist"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-teal-600"
                />
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. UPLOAD FILES SECTION (DESKTOP & MOBILE)                */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Desktop Upload Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-heading font-bold text-slate-900 flex items-center gap-2">
                <Monitor className="w-4 h-4 text-teal-700" />
                <span>Upload Desktop Hero Image</span>
              </h4>
              {activeDesktopDisplay !== doctorKritarthClinicHero && (
                <button
                  type="button"
                  onClick={() => setShowRemoveModal('desktop')}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>
              )}
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDesktopDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDesktopDragOver(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDesktopDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) handleDesktopFileChange(file);
              }}
              onClick={() => desktopFileInputRef.current?.click()}
              className={`w-full h-[160px] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer ${
                isDesktopDragOver
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-300 hover:border-teal-500 bg-slate-50/50'
              }`}
            >
              <input
                ref={desktopFileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleDesktopFileChange(file);
                }}
              />
              <Upload className="w-6 h-6 text-teal-700 mb-1" />
              <p className="text-xs font-bold text-slate-800">
                {desktopFile ? `Selected: ${desktopFile.name}` : 'Drag & drop Desktop Image, or Browse'}
              </p>
              <p className="text-[11px] text-teal-800 font-extrabold mt-1">Recommended 1920 × 900 px or 1920 × 1080 px</p>
              <p className="text-[10px] text-slate-500 mt-0.5">WEBP, JPG, or PNG • Max 10MB</p>
            </div>
          </div>

          {/* Mobile Upload Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-heading font-bold text-slate-900 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-teal-700" />
                <span>Upload Mobile Hero Image (Optional)</span>
              </h4>
              {mobileImageUrl && (
                <button
                  type="button"
                  onClick={() => setShowRemoveModal('mobile')}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Mobile</span>
                </button>
              )}
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsMobileDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsMobileDragOver(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsMobileDragOver(false);
                const file = e.dataTransfer.files[0];
                if (file) handleMobileFileChange(file);
              }}
              onClick={() => mobileFileInputRef.current?.click()}
              className={`w-full h-[160px] rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 text-center cursor-pointer ${
                isMobileDragOver
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-slate-300 hover:border-teal-500 bg-slate-50/50'
              }`}
            >
              <input
                ref={mobileFileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleMobileFileChange(file);
                }}
              />
              <Upload className="w-6 h-6 text-teal-700 mb-1" />
              <p className="text-xs font-bold text-slate-800">
                {mobileFile ? `Selected: ${mobileFile.name}` : 'Drag & drop Mobile Image, or Browse'}
              </p>
              <p className="text-[11px] text-teal-800 font-extrabold mt-1">Recommended 1080×1350 px or 1080×1620 px</p>
              <p className="text-[10px] text-slate-500 mt-0.5">WEBP, JPG, or PNG • Max 10MB</p>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* 4. BOTTOM ACTION STICKY BAR                               */}
        {/* ========================================================= */}
        <div className="sticky bottom-4 z-20 bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-800 flex items-center justify-between gap-4">
          <div className="text-xs text-slate-300">
            {desktopFile || mobileFile ? (
              <span className="text-teal-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Unsaved hero background selection ready
              </span>
            ) : (
              <span>Hero Background Mode | Focal ({currentFocalX}% X, {currentFocalY}% Y)</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setDesktopFile(null);
                setDesktopPreview(null);
                setMobileFile(null);
                setMobilePreview(null);
                showToast('Changes discarded.');
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              {isSaving || isUploading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Uploading &amp; Saving...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>

      </form>

      {/* REMOVAL MODAL */}
      {showRemoveModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 text-left space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-heading font-bold text-slate-900">
                Remove {showRemoveModal === 'desktop' ? 'Desktop' : 'Mobile'} Hero Image?
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to remove the custom {showRemoveModal} hero image? The homepage will automatically restore the default doctor background photo.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRemoveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleRemoveImage(showRemoveModal)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-sm"
              >
                Remove Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
