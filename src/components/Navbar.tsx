import React from 'react';
import { 
  Wrench, 
  Sparkles, 
  Calendar, 
  Search, 
  PhoneCall,
  Layers
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  BikeCare
                </span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-medium">Smart Two-Wheeler Care</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'diagnostics'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI Diagnostics
            </button>

            <button
              onClick={() => setActiveTab('booking')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'booking'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              Book Service
            </button>

            <button
              onClick={() => setActiveTab('tracker')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'tracker'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Search className="w-4 h-4 text-amber-400" />
              Track Bike
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'services'
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-4 h-4 text-blue-400" />
              Packages
            </button>
          </nav>

          {/* Action Area: Emergency Contact & Book CTA for customers */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 pr-2 border-r border-slate-800">
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>Workshop: <strong className="text-slate-200">1-800-BIKE-AI</strong></span>
            </div>

            {/* Customer Book Service Action */}
            <button
              onClick={() => setActiveTab('booking')}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-950" />
              <span>Book Service</span>
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 gap-2 border-t border-slate-900 text-xs no-scrollbar">
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'diagnostics' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Diagnostic
          </button>
          <button
            onClick={() => setActiveTab('booking')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'booking' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Service
          </button>
          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'tracker' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            Track Bike
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'services' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Packages
          </button>
        </div>

      </div>
    </header>
  );
};
