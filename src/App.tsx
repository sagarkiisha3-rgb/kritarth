import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SymptomNavigation } from './components/SymptomNavigation';
import { AboutSection } from './components/AboutSection';
import { SpecialitiesSection } from './components/SpecialitiesSection';
import { InteractiveLungs } from './components/InteractiveLungs';
import { InterventionalSection } from './components/InterventionalSection';
import { SleepMedicineSection } from './components/SleepMedicineSection';
import { ConditionDetailPage } from './components/ConditionDetailPage';
import { WhenToSeePulmonologist } from './components/WhenToSeePulmonologist';
import { PatientJourney } from './components/PatientJourney';
import { DiagnosticsSection } from './components/DiagnosticsSection';
import { EmergencyWarning } from './components/EmergencyWarning';
import { BlogSection } from './components/BlogSection';
import { VideoSection } from './components/VideoSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AppointmentSection } from './components/AppointmentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckCircle2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    activeRoute,
    isAppointmentModalOpen,
    closeAppointmentModal,
    toastMessage
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased selection:bg-teal-100 selection:text-teal-900">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-medium border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Global Header (Sticky navigation) */}
      <Header />

      {/* Dynamic Route Content */}
      <main className="flex-grow">
        {activeRoute === 'home' && (
          <>
            <HeroSection />
            <SymptomNavigation />
            <AboutSection />
            <SpecialitiesSection />
            <InteractiveLungs />
            <InterventionalSection />
            <SleepMedicineSection />
            <WhenToSeePulmonologist />
            <PatientJourney />
            <DiagnosticsSection />
            <EmergencyWarning />
            <BlogSection />
            <VideoSection />
            <TestimonialsSection />
            <AppointmentSection />
            <ContactSection />
          </>
        )}

        {activeRoute === 'condition' && (
          <>
            <ConditionDetailPage />
            <AppointmentSection />
          </>
        )}

        {activeRoute === 'blogs' && (
          <div className="pt-24">
            <BlogSection />
          </div>
        )}

        {activeRoute === 'contact' && (
          <div className="pt-24">
            <ContactSection />
            <AppointmentSection />
          </div>
        )}

        {activeRoute === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar */}
      {activeRoute !== 'admin' && <MobileActionBar />}

      {/* Desktop WhatsApp Floating Button */}
      {activeRoute !== 'admin' && <WhatsAppFloating />}

      {/* Appointment Booking Modal */}
      {isAppointmentModalOpen && (
        <AppointmentSection isModal onClose={closeAppointmentModal} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
