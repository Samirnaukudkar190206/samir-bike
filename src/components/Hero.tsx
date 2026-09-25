import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Search, 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  Truck, 
  Zap,
  ArrowRight,
  Clock,
  Gauge
} from 'lucide-react';

interface HeroProps {
  onStartBooking: () => void;
  onStartDiagnostic: () => void;
  onTrackBike: (code: string) => void;
  onViewPackages: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onStartBooking, 
  onStartDiagnostic, 
  onTrackBike,
  onViewPackages 
}) => {
  const [quickCode, setQuickCode] = useState('');

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickCode.trim()) {
      onTrackBike(quickCode.trim());
    }
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-6 shadow-sm shadow-cyan-500/10">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Next-Gen Two-Wheeler Diagnostics & Cloud Service Booking</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-slate-400">Free Tier Ready</span>
        </div>

        {/* Main Title & Value Prop */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Predict Bike Issues <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
                Before They Happen.
              </span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
              Experience intelligent motorcycle & bicycle care. Diagnose mysterious ticking noises, spongy brakes, and engine stalls with Google Gemini AI — then book certified doorstep pickup with live job card tracking.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onStartBooking}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-base shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-slate-950" />
                Book Service Online
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={onStartDiagnostic}
                className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 font-semibold text-base transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-cyan-400" />
                Free AI Sound & Health Scan
              </button>
            </div>

            {/* Quick Tracking Widget */}
            <div className="pt-4 max-w-lg">
              <form onSubmit={handleQuickTrack} className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 focus-within:border-cyan-500/60 shadow-lg">
                <Search className="w-4 h-4 text-slate-400 ml-2.5" />
                <input
                  type="text"
                  placeholder="Enter Booking ID (e.g. BK-8492) or Phone..."
                  value={quickCode}
                  onChange={(e) => setQuickCode(e.target.value)}
                  className="bg-transparent border-none text-sm text-slate-200 placeholder-slate-500 focus:outline-none flex-1 px-2 py-1.5"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  Track Status
                </button>
              </form>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                <span>Try sample active booking:</span>
                <button 
                  onClick={() => { setQuickCode('BK-8492'); onTrackBike('BK-8492'); }}
                  className="text-cyan-400 hover:underline font-mono"
                >
                  BK-8492
                </button>
                <span>or</span>
                <button 
                  onClick={() => { setQuickCode('BK-6321'); onTrackBike('BK-6321'); }}
                  className="text-cyan-400 hover:underline font-mono"
                >
                  BK-6321
                </button>
              </div>
            </div>

            {/* Key Service Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-900">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free Doorstep Pickup</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>15-Day Service Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Genuine OEM Spares</span>
              </div>
            </div>

          </div>

          {/* Right Visual Card: Live AI Diagnostic & Workshop Preview */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-2xl shadow-cyan-950/30">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">AI Diagnostic Engine</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                  Gemini-3.8-Flash
                </span>
              </div>

              {/* Sample Diagnostic Simulation */}
              <div className="mt-5 space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Target Vehicle</span>
                    <span className="text-cyan-400 font-semibold">Yamaha MT-07 (2023)</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-500 font-mono">Symptoms:</span> Metallic chattering under idle &gt; 1800 RPM
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      AI Diagnosis Result
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      94% Confidence
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-100">
                    Cam Chain Tensioner (CCT) Hydraulic Slack
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Timing flutter risks premature valve collision. Recommended service: Comprehensive Master Overhaul.
                  </p>
                  
                  <div className="mt-3 pt-3 border-t border-amber-500/20 flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      Est. Repair: <strong className="text-slate-200">₹800 - ₹1,400</strong>
                    </div>
                    <button
                      onClick={onStartDiagnostic}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                      Run Your Scan <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Mechanic Live Status Preview */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
                    MP
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-200">Mike Peterson (Master Tech)</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">Bay #2 Active</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      Currently servicing Booking <span className="font-mono text-cyan-400">BK-8492</span> (Brake Bleed & CCT)
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Feature Footer */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Same-Day Delivery
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Free Diagnostics
                </span>
                <button 
                  onClick={onViewPackages} 
                  className="text-cyan-400 font-medium hover:underline"
                >
                  View Packages
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Workshop Credibility Metrics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">15,400+</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Two-Wheelers Serviced</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">99.4%</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">AI Diagnostic Match Rate</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">60 Min</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Express Service Turnaround</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">4.9 / 5.0</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Verified Rider CSAT Rating</div>
          </div>
        </div>

      </div>
    </div>
  );
};
