import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { AiDiagnostics } from './components/AiDiagnostics.tsx';
import { ServiceBooking } from './components/ServiceBooking.tsx';
import { BookingTracker } from './components/BookingTracker.tsx';
import { ServiceCatalog } from './components/ServiceCatalog.tsx';
import { AdminPortal } from './components/AdminPortal.tsx';
import { FreeDeployModal } from './components/FreeDeployModal.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [bookingPackageId, setBookingPackageId] = useState<string>('pkg-master-overhaul');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [trackingCode, setTrackingCode] = useState<string>('BK-8492');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Transition from AI Diagnosis to Booking with pre-filled recommendations
  const handleBookWithDiagnosis = (packageId: string, notes: string) => {
    setBookingPackageId(packageId);
    setBookingNotes(notes);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Transition from Service Catalog to Booking
  const handleSelectPackageFromCatalog = (packageId: string) => {
    setBookingPackageId(packageId);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Transition to Tracker
  const handleGoToTracker = (code: string) => {
    setTrackingCode(code);
    setActiveTab('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Global Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isAdminLoggedIn={isAdminLoggedIn} 
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onStartBooking={() => {
                setActiveTab('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartDiagnostic={() => {
                setActiveTab('diagnostics');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onTrackBike={(code) => handleGoToTracker(code)}
              onViewPackages={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            {/* Embedded interactive AI section preview on home page */}
            <div className="border-t border-slate-900 bg-slate-950/60">
              <AiDiagnostics onBookWithDiagnosis={handleBookWithDiagnosis} />
            </div>
            {/* Service catalog preview on home */}
            <div className="border-t border-slate-900 bg-slate-900/40">
              <ServiceCatalog onSelectPackage={handleSelectPackageFromCatalog} />
            </div>
          </>
        )}

        {activeTab === 'diagnostics' && (
          <div className="py-4">
            <AiDiagnostics onBookWithDiagnosis={handleBookWithDiagnosis} />
          </div>
        )}

        {activeTab === 'booking' && (
          <div className="py-4">
            <ServiceBooking
              initialPackageId={bookingPackageId}
              initialNotes={bookingNotes}
              onBookingSuccess={(code) => setTrackingCode(code)}
              onGoToTracker={handleGoToTracker}
            />
          </div>
        )}

        {activeTab === 'tracker' && (
          <div className="py-4">
            <BookingTracker
              initialCode={trackingCode}
              onBookNew={() => {
                setActiveTab('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="py-4">
            <ServiceCatalog onSelectPackage={handleSelectPackageFromCatalog} />
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="py-4">
            <AdminPortal
              onBackToCustomerSite={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onAdminAuthChange={(isLoggedIn) => setIsAdminLoggedIn(isLoggedIn)}
            />
          </div>
        )}

        {activeTab === 'deploy' && (
          <div className="py-4">
            <FreeDeployModal onClose={() => setActiveTab('home')} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}
