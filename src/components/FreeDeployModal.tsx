import React, { useState } from 'react';
import { 
  Rocket, 
  Check, 
  Copy, 
  ExternalLink, 
  Server, 
  Cloud, 
  Terminal, 
  ShieldCheck, 
  Cpu,
  Layers,
  ArrowRight
} from 'lucide-react';

interface FreeDeployModalProps {
  onClose: () => void;
}

export const FreeDeployModal: React.FC<FreeDeployModalProps> = ({ onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <Rocket className="w-3.5 h-3.5" />
          <span>100% Free Hosting Deployment Guide</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How to Deploy BikeCare AI for Free
        </h2>
        <p className="mt-2 text-slate-300 text-sm sm:text-base">
          This full-stack React + Express + SQLite/JSON database app is production-ready and configured to run on top free cloud tiers.
        </p>
      </div>

      {/* 3 Free Platforms Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Platform 1: Google Cloud Run */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                RECOMMENDED / CONTAINER
              </span>
              <Cloud className="w-5 h-5 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Google Cloud Run</h3>
            <p className="text-xs text-slate-400 mt-1">
              Deploy directly using the production <code className="text-cyan-400">Dockerfile</code>. Free tier includes 2 million requests/month and auto-scales to zero.
            </p>

            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>One-command source deploy</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automatic HTTPS / SSL domain</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero idle cost (scale to 0)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => copyToClipboard('gcloud run deploy bikecare-ai --source . --region asia-south1 --port 3000 --allow-unauthenticated', 'cloudrun')}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedKey === 'cloudrun' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'cloudrun' ? 'Copied gcloud Command!' : 'Copy Cloud Run Deploy'}</span>
            </button>
          </div>
        </div>

        {/* Platform 2: Render.com */}
        <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                FREE WEB SERVICE
              </span>
              <Server className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Render.com Free Tier</h3>
            <p className="text-xs text-slate-400 mt-1">
              Deploy as a Node.js Web Service directly from your GitHub repository in 2 clicks.
            </p>

            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free 750 compute hours/month</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Native Node.js & Vite build support</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free custom domain & SSL</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => copyToClipboard('Build Command: npm run build\nStart Command: npm start\nPublish Directory: dist', 'render')}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedKey === 'render' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'render' ? 'Copied Config!' : 'Copy Render Build Config'}</span>
            </button>
          </div>
        </div>

        {/* Platform 3: Railway / Docker */}
        <div className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                CONTAINER / DOCKER
              </span>
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white">Docker / Self-Hosted</h3>
            <p className="text-xs text-slate-400 mt-1">
              Run on any VPS, Railway, Fly.io, or DigitalOcean droplet with standard container commands.
            </p>

            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Includes optimized Alpine Dockerfile</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Persistent disk volume for ./data</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Runs anywhere Docker is installed</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <button
              onClick={() => copyToClipboard('docker build -t bikecare-ai . && docker run -d -p 3000:3000 -v $(pwd)/data:/app/data --name bikecare bikecare-ai', 'docker')}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedKey === 'docker' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'docker' ? 'Copied Docker Command!' : 'Copy Docker Run Command'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Step-by-Step Step Instructions */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          Quick 3-Step Free Deployment Checklist
        </h3>

        <div className="space-y-4 text-xs">
          
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white">Repository & Build Commands</h4>
              <p className="text-slate-400 mt-1">
                This project already contains the production scripts inside <code className="text-cyan-400 font-mono">package.json</code>:
              </p>
              <div className="mt-2 p-2.5 rounded-lg bg-slate-900 font-mono text-[11px] text-slate-300 space-y-1">
                <div>Build Command: <span className="text-cyan-400">npm run build</span></div>
                <div>Start Command: <span className="text-emerald-400">npm start</span> (runs <code className="text-white">tsx server.ts</code> on port 3000)</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white">Set Up Environment Variables</h4>
              <p className="text-slate-400 mt-1">
                Add these 2 variables to your cloud hosting dashboard (Render / Railway / Cloud Run):
              </p>
              <div className="mt-2 p-2.5 rounded-lg bg-slate-900 font-mono text-[11px] text-slate-300 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span>PORT=3000</span>
                  <span className="text-[10px] text-slate-500">Default web port</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>GEMINI_API_KEY=YOUR_KEY</span>
                  <span className="text-[10px] text-emerald-400">Get free from Google AI Studio</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white">Persistent Database Storage</h4>
              <p className="text-slate-400 mt-1">
                All bookings, workshop jobs, service packages, and AI queries are stored in <code className="text-cyan-400 font-mono">data/bikecare-db.json</code>. On platforms with ephemeral containers (like free Render), the database auto-initializes with realistic seed data on boot, or you can attach a free persistent disk mount at <code className="text-cyan-400 font-mono">/data</code>.
              </p>
            </div>
          </div>

        </div>

        <div className="flex justify-center pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
          >
            Got It, Back to App
          </button>
        </div>

      </div>

    </div>
  );
};
