import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { AiDiagnostics } from './components/AiDiagnostics.tsx';
import { ServiceBooking } from './components/ServiceBooking.tsx';
import { BookingTracker } from './components/BookingTracker.tsx';
import { ServiceCatalog } from './components/ServiceCatalog.tsx';
import { AdminPortal } from './components/AdminPortal.tsx';
import { Footer } from './components/Footer.tsx';
import { Wrench, ShieldAlert, ExternalLink, ArrowLeft, Radio } from 'lucide-react';

export default function App() {
  // Check if current route is the isolated admin portal
  const checkIsAdminPath = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    return path === '/admin' || path.startsWith('/admin/') || search.includes('portal=admin') || search.includes('admin=true');
  };

  const [isAdminView, setIsAdminView] = useState<boolean>(checkIsAdminPath);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [bookingPackageId, setBookingPackageId] = useState<string>('pkg-master-overhaul');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [trackingCode, setTrackingCode] = useState<string>('BK-8492');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Sync with browser URL & history navigation
  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminView(checkIsAdminPath());
    };

    window.addEventListener('popstate', handleLocationChange);

    // Keyboard shortcut for authorized staff to access admin without any public UI buttons (Ctrl+Shift+A or Alt+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        navigateToAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Update document title based on portal
  useEffect(() => {
    if (isAdminView) {
      document.title = 'BikeCare Ops Console | Internal Workshop Operations';
    } else {
      document.title = 'BikeCare AI | Smart Two-Wheeler Care & Service';
    }
  }, [isAdminView]);

  // Navigation handlers
  const navigateToAdmin = () => {
    window.history.pushState(null, '', '/admin');
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCustomer = () => {
    window.history.pushState(null, '', '/');
    setIsAdminView(false);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // =========================================================================
  // RENDER 1: DEDICATED SEPARATE ADMIN WEBSITE (/admin)
  // Completely isolated from customer storefront with zero customer navbar/footer
  // =========================================================================
  if (isAdminView) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
        {/* Dedicated Admin Portal Header */}
        <header className="sticky top-0 z-50 bg-slate-900/95 border-b border-amber-500/20 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* Admin Brand & Internal System Label */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold shadow-inner">
                <Wrench className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg text-white tracking-tight">BikeCare Ops Console</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Internal System
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Dedicated Workshop Operations Portal • Route: <span className="text-amber-400">/admin</span>
                </p>
              </div>
            </div>

            {/* Restricted Banner & Quick Navigation */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>Restricted Access: Authorized Mechanics Only</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Workshop Node Active</span>
                </div>

                {/* Return / Open Customer Storefront */}
                <button
                  onClick={navigateToCustomer}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Switch to customer storefront"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Customer Storefront</span>
                </button>
              </div>
            </div>

          </div>
        </header>

        {/* Dedicated Admin Portal Content */}
        <main className="flex-1 py-6">
          <AdminPortal
            onBackToCustomerSite={navigateToCustomer}
            onAdminAuthChange={(isLoggedIn) => setIsAdminLoggedIn(isLoggedIn)}
          />
        </main>

        {/* Dedicated Admin Operations Footer */}
        <footer className="border-t border-slate-900 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500 font-mono">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              BikeCare AI Workshop Operations Console • <span className="text-amber-400/80">Internal Node ID: WS-BAY-04</span>
            </div>
            <div className="text-[11px] text-slate-600">
              This admin operations dashboard is segregated from the customer website. Customers cannot access this view.
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // RENDER 2: CUSTOMER STOREFRONT WEBSITE (/)
  // Purely customer-facing with NO admin buttons or access links
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Customer Navigation Bar (No admin button) */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Customer Content Area */}
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
      </main>

      {/* Customer Footer (No admin links) */}
      <Footer onNavigate={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}
