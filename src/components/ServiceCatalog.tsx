import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  Sparkles, 
  ArrowRight,
  Zap,
  Droplets,
  Layers,
  ChevronRight
} from 'lucide-react';
import { api } from '../services/api.ts';
import { ServicePackage } from '../types/index.ts';

interface ServiceCatalogProps {
  onSelectPackage: (packageId: string) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ onSelectPackage }) => {
  const [packages, setPackages] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getServices();
        setPackages(data.services);
      } catch (err) {
        console.error('Failed to load packages:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Transparent Workshop Tiering</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Engineered Service Packages
        </h2>
        <p className="mt-2 text-slate-300 text-sm sm:text-base">
          From quick 60-minute express safety tune-ups to comprehensive master engine & drivetrain overhauls.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-xs text-slate-400">Loading service catalog...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 sm:p-7 bg-slate-900 border transition-all flex flex-col justify-between ${
                pkg.popular 
                  ? 'border-cyan-400 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/30' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
                    {pkg.category.replace('_', ' ')}
                  </span>
                  {pkg.popular && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Top Choice
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mt-1">{pkg.name}</h3>
                <p className="text-xs text-slate-400 mt-1 min-h-[36px]">{pkg.tagline}</p>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white font-mono">₹{pkg.price.toLocaleString('en-IN')}</span>
                    <span className="text-xs text-slate-500">/ service</span>
                  </div>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    ~{pkg.durationMinutes} mins
                  </span>
                </div>

                {/* Features List */}
                <div className="mt-6 space-y-2.5">
                  <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider text-[11px]">
                    Included in this Package:
                  </span>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800">
                <button
                  onClick={() => onSelectPackage(pkg.id)}
                  className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>Book {pkg.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Workshop standard warranty bar */}
      <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 grid md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">15-Day Service Guarantee</h4>
            <p className="text-xs text-slate-400 mt-0.5">Free follow-up inspection if any issue reoccurs.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">100% Genuine OEM Spares</h4>
            <p className="text-xs text-slate-400 mt-0.5">Direct manufacturer seals and original part numbers.</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Video Proof & Inspection</h4>
            <p className="text-xs text-slate-400 mt-0.5">Video sent to your phone before any worn part is replaced.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
