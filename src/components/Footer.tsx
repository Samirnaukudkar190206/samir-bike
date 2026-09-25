import React from 'react';
import { Wrench, Phone, MapPin, Mail, ShieldCheck, Clock, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/90 text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-emerald-400 flex items-center justify-center text-slate-950 font-bold">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-base">BikeCare AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pioneering intelligent motorcycle, bicycle, and EV diagnostics with doorstep hydraulic pickup and transparent digital job cards.
            </p>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Central Bay Open: 8:00 AM - 9:00 PM Daily
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Quick Services</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('diagnostics')} className="hover:text-cyan-400 transition-colors">
                  AI Sound & Noise Diagnostic
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('booking')} className="hover:text-cyan-400 transition-colors">
                  Book Doorstep Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tracker')} className="hover:text-cyan-400 transition-colors">
                  Live Bike Job Card Tracker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-cyan-400 transition-colors">
                  Service Packages & Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Workshop Locations */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Central Workshop</h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Bay #4, Precision Motopark, Innovation Blvd, Metro Tech Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline: 1-800-BIKE-AI (Toll-Free)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@bikecare.ai</span>
              </div>
            </div>
          </div>

          {/* Col 4: Dispatch Portal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Workshop Staff</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Certified Master Technicians and service managers can access the live dispatch board below.
            </p>
            <button
              onClick={() => onNavigate('admin')}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 text-xs font-bold transition-all text-center block"
            >
              Open Workshop Admin Portal →
            </button>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} BikeCare AI Inc. All rights reserved. Powered by Google Gemini AI.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('deploy')} className="text-cyan-400 hover:underline">
              Free Hosting Deployment Guide
            </button>
            <span>•</span>
            <span>15-Day Service Satisfaction Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
