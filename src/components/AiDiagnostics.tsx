import React, { useState } from 'react';
import { 
  Sparkles, 
  Wrench, 
  Camera, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Volume2, 
  ArrowRight, 
  ShieldAlert, 
  Gauge, 
  Zap,
  Upload,
  RefreshCw,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { api } from '../services/api.ts';
import { AiDiagnosticResult, AiInspectionResult, AiMaintenanceScheduleItem } from '../types/index.ts';

interface AiDiagnosticsProps {
  onBookWithDiagnosis: (packageId: string, notes: string) => void;
}

const COMMON_SYMPTOMS = [
  'Metallic ticking / knocking in engine',
  'Squeaking or spongy brake lever',
  'Hard clutch / gear shift resistance',
  'Sudden throttle hesitation or lag',
  'Battery draining overnight / slow crank',
  'Loose chain rattling against swingarm',
  'Black or white smoke from exhaust',
  'Engine running hotter than usual',
  'Handlebar vibration at high speed',
  'Fuel smell / minor carburetor overflow'
];

export const AiDiagnostics: React.FC<AiDiagnosticsProps> = ({ onBookWithDiagnosis }) => {
  const [activeSubTab, setActiveSubTab] = useState<'symptom' | 'visual' | 'schedule'>('symptom');

  // --- Symptom Diagnostic State ---
  const [bikeType, setBikeType] = useState('sports_superbike');
  const [bikeBrand, setBikeBrand] = useState('Yamaha');
  const [bikeModel, setBikeModel] = useState('MT-07');
  const [bikeYear, setBikeYear] = useState('2023');
  const [mileageKm, setMileageKm] = useState('8500');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'Metallic ticking / knocking in engine'
  ]);
  const [soundDescription, setSoundDescription] = useState('Rhythmic chattering around 2000-3000 RPM, quietens slightly once engine warms up.');
  const [customNotes, setCustomNotes] = useState('');
  
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<AiDiagnosticResult | null>(null);
  const [diagError, setDiagError] = useState<string | null>(null);

  // --- Visual Inspection State ---
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [partContext, setPartContext] = useState('Drive Chain & Rear Sprocket');
  const [isInspecting, setIsInspecting] = useState(false);
  const [inspectionResult, setInspectionResult] = useState<AiInspectionResult | null>(null);
  const [inspectError, setInspectError] = useState<string | null>(null);

  // --- Maintenance Plan State ---
  const [planBrand, setPlanBrand] = useState('Honda');
  const [planModel, setPlanModel] = useState('CB350 Hness');
  const [planYear, setPlanYear] = useState(2023);
  const [planKm, setPlanKm] = useState(5000);
  const [planRideStyle, setPlanRideStyle] = useState('Daily Commuter + Weekend Highway');
  const [isPlanning, setIsPlanning] = useState(false);
  const [maintenancePlan, setMaintenancePlan] = useState<AiMaintenanceScheduleItem[] | null>(null);

  // Toggle symptom chip
  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  // Run Symptom Diagnostic
  const handleRunDiagnosis = async () => {
    if (selectedSymptoms.length === 0 && !soundDescription.trim() && !customNotes.trim()) {
      setDiagError('Please pick at least one symptom or describe what the bike is doing.');
      return;
    }
    setDiagError(null);
    setIsDiagnosing(true);

    try {
      const res = await api.diagnoseBike({
        bikeType,
        bikeBrand,
        bikeModel,
        bikeYear: Number(bikeYear) || undefined,
        mileageKm: Number(mileageKm) || undefined,
        symptoms: selectedSymptoms.length > 0 ? selectedSymptoms : ['Unspecified noise / symptom'],
        soundDescription,
        customNotes
      });
      setDiagnosticResult(res.result);
    } catch (err: any) {
      setDiagError(err.message || 'Diagnostic scan failed. Please try again.');
    } finally {
      setIsDiagnosing(false);
    }
  };

  // Handle Photo File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImageBase64(reader.result as string);
        setInspectionResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Run Visual Inspection
  const handleRunInspection = async () => {
    if (!selectedImageBase64) {
      setInspectError('Please upload a photo of the part to inspect.');
      return;
    }
    setInspectError(null);
    setIsInspecting(true);

    try {
      const res = await api.inspectImage({
        imageBase64: selectedImageBase64,
        mimeType: 'image/jpeg',
        partContext
      });
      setInspectionResult(res.result);
    } catch (err: any) {
      setInspectError(err.message || 'Inspection failed.');
    } finally {
      setIsInspecting(false);
    }
  };

  // Run Maintenance Schedule Generator
  const handleGeneratePlan = async () => {
    setIsPlanning(true);
    try {
      const res = await api.generateMaintenancePlan({
        bikeBrand: planBrand,
        bikeModel: planModel,
        bikeYear: planYear,
        currentKm: planKm,
        rideStyle: planRideStyle
      });
      setMaintenancePlan(res.plan);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsPlanning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Mechanical Intelligence Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Bike Health & Symptom Diagnostic
        </h2>
        <p className="mt-3 text-slate-300 text-base">
          Analyze strange noises, erratic idling, and component wear in seconds with our master technician AI model.
        </p>

        {/* Sub-Tabs */}
        <div className="flex justify-center gap-2 mt-8 p-1.5 rounded-xl bg-slate-900 border border-slate-800 max-w-md mx-auto">
          <button
            onClick={() => setActiveSubTab('symptom')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'symptom'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            Symptom & Sound
          </button>
          
          <button
            onClick={() => setActiveSubTab('visual')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'visual'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            Photo Wear Scan
          </button>

          <button
            onClick={() => setActiveSubTab('schedule')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'schedule'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Service Planner
          </button>
        </div>
      </div>

      {/* --- TAB 1: SYMPTOM & SOUND DIAGNOSTIC --- */}
      {activeSubTab === 'symptom' && (
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Input Form */}
          <div className="lg:col-span-6 space-y-6 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan-400" />
                Describe Vehicle & Observations
              </h3>
              <span className="text-xs text-slate-400">Step 1 of 2</span>
            </div>

            {/* Vehicle Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Make / Brand</label>
                <input
                  type="text"
                  value={bikeBrand}
                  onChange={(e) => setBikeBrand(e.target.value)}
                  placeholder="e.g. Yamaha, Honda"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Model</label>
                <input
                  type="text"
                  value={bikeModel}
                  onChange={(e) => setBikeModel(e.target.value)}
                  placeholder="e.g. MT-07, Splendor"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Year</label>
                <input
                  type="number"
                  value={bikeYear}
                  onChange={(e) => setBikeYear(e.target.value)}
                  placeholder="2023"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-medium text-slate-400 mb-1">Odometer (km)</label>
                <input
                  type="number"
                  value={mileageKm}
                  onChange={(e) => setMileageKm(e.target.value)}
                  placeholder="8500"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-slate-400 mb-1">Vehicle Category</label>
                <select
                  value={bikeType}
                  onChange={(e) => setBikeType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="sports_superbike">Sports / Naked / Superbike</option>
                  <option value="commuter_motorcycle">Standard Commuter Motorcycle</option>
                  <option value="cruiser">Cruiser / Heritage (Royal Enfield, Harley)</option>
                  <option value="scooter_moped">Gearless Scooter / Moped</option>
                  <option value="electric_bike">Electric Scooter / EV Motorcycle</option>
                  <option value="bicycle_mtb">Mountain Bike / Road Bicycle</option>
                </select>
              </div>
            </div>

            {/* Quick Symptom Chips */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Select Observed Symptoms:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_SYMPTOMS.map((symptom) => {
                  const isSelected = selectedSymptoms.includes(symptom);
                  return (
                    <button
                      key={symptom}
                      type="button"
                      onClick={() => toggleSymptom(symptom)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer text-left ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {symptom}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sound or Feel Description */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center justify-between">
                <span>Sound / Mechanical Feel (Describe in your own words)</span>
                <span className="text-[10px] text-slate-500">e.g. clicking, grinding, squeal</span>
              </label>
              <textarea
                rows={2}
                value={soundDescription}
                onChange={(e) => setSoundDescription(e.target.value)}
                placeholder="Describe the noise: where does it come from, does it change with speed/gear/brakes?"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {diagError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{diagError}</span>
              </div>
            )}

            <button
              onClick={handleRunDiagnosis}
              disabled={isDiagnosing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isDiagnosing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing Mechanical Telemetry with Gemini...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  Run BikeCare AI Diagnostic Scan
                </>
              )}
            </button>
          </div>

          {/* Right Diagnostic Output */}
          <div className="lg:col-span-6">
            {diagnosticResult ? (
              <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in duration-300">
                
                {/* Result Top Banner */}
                <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                        diagnosticResult.severity === 'Immediate Danger'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : diagnosticResult.severity === 'Moderate Attention Required'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      }`}>
                        {diagnosticResult.severity}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-mono">
                        {diagnosticResult.confidenceScore}% Diagnostic Match
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white leading-snug">
                      {diagnosticResult.primaryIssue}
                    </h4>
                  </div>
                  
                  {/* Estimated Cost Pill */}
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block">Estimated Cost</span>
                    <span className="text-base font-extrabold text-emerald-400 font-mono">
                      ₹{diagnosticResult.estimatedCostRange.min.toLocaleString('en-IN')} - ₹{diagnosticResult.estimatedCostRange.max.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Technical Explanation */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-cyan-400 block mb-1">Technical Mechanical Analysis:</span>
                  {diagnosticResult.technicalExplanation}
                </div>

                {/* Possible Root Causes */}
                <div>
                  <h5 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    Probable Root Causes:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {diagnosticResult.possibleCauses.map((cause, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safe DIY Checks for the Rider */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <h5 className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Recommended DIY Pre-Inspection:
                  </h5>
                  <div className="space-y-2 text-xs text-slate-300">
                    {diagnosticResult.diyCheckSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Immediate 1-Click Action to Book */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-400">Recommended Workshop Service:</span>
                    <p className="text-xs font-bold text-white capitalize">
                      {diagnosticResult.recommendedPackageId?.replace('pkg-', '').replace('-', ' ') || 'Express 360° Tune-Up'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const notes = `AI Diagnostic Findings: ${diagnosticResult.primaryIssue}. ${diagnosticResult.technicalExplanation}`;
                      onBookWithDiagnosis(diagnosticResult.recommendedPackageId || 'pkg-master-overhaul', notes);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-transform hover:scale-105 cursor-pointer shadow-lg shadow-cyan-500/20"
                  >
                    <span>Book Service For This Issue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ) : (
              <div className="h-full min-h-[380px] rounded-2xl border border-dashed border-slate-800 flex flex-col items-center justify-center p-8 text-center bg-slate-900/30">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 mb-4 shadow-inner">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-slate-200">Awaiting Diagnostic Input</h4>
                <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                  Select your symptoms on the left and click "Run Diagnostic Scan" to trigger the Gemini AI mechanical engine.
                </p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* --- TAB 2: VISUAL PARTS WEAR INSPECTOR --- */}
      {activeSubTab === 'visual' && (
        <div className="max-w-4xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-xl font-bold text-white">Multimodal Bike Component Inspector</h3>
            <p className="text-xs text-slate-400 mt-1">
              Upload a picture of your brake rotor, tire tread, chain slack, spark plug, or fork seal for instant wear evaluation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            
            {/* Upload Area & Sample Selectors */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-300">
                Upload Component Photo:
              </label>
              
              <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-6 text-center bg-slate-950/60 transition-colors">
                {selectedImageBase64 ? (
                  <div className="space-y-3">
                    <img 
                      src={selectedImageBase64} 
                      alt="Uploaded part" 
                      className="max-h-56 mx-auto rounded-lg object-cover border border-slate-800"
                    />
                    <button
                      onClick={() => { setSelectedImageBase64(null); setInspectionResult(null); }}
                      className="text-xs text-rose-400 hover:underline"
                    >
                      Remove photo & upload another
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-cyan-400 mx-auto" />
                    <p className="text-xs text-slate-300 font-medium">Click to select photo or drag and drop</p>
                    <p className="text-[11px] text-slate-500">JPG, PNG, WebP up to 10MB</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="bike-photo-upload"
                    />
                    <label
                      htmlFor="bike-photo-upload"
                      className="inline-block mt-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 cursor-pointer"
                    >
                      Browse Files
                    </label>
                  </div>
                )}
              </div>

              {/* Sample presets for quick demo */}
              <div>
                <label className="block text-[11px] text-slate-400 mb-2">Or inspect common component types:</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Drive Chain & Sprocket', 'Disc Brake Rotor & Pads', 'Rear Tire Center Tread', 'Front Fork Oil Seal'].map(part => (
                    <button
                      key={part}
                      type="button"
                      onClick={() => setPartContext(part)}
                      className={`p-2 rounded-lg border text-left text-xs transition-colors ${
                        partContext === part 
                          ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 font-semibold' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {part}
                    </button>
                  ))}
                </div>
              </div>

              {inspectError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {inspectError}
                </div>
              )}

              <button
                onClick={handleRunInspection}
                disabled={isInspecting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isInspecting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Inspecting Component Pixels...
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 text-slate-950" />
                    Analyze Part Wear with AI
                  </>
                )}
              </button>
            </div>

            {/* Right: Inspection Output */}
            <div>
              {inspectionResult ? (
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Component Detected</span>
                      <h4 className="text-base font-bold text-white">{inspectionResult.partIdentified}</h4>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      inspectionResult.conditionStatus.includes('Critical')
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }`}>
                      {inspectionResult.conditionStatus}
                    </span>
                  </div>

                  {/* Wear Meter */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Estimated Component Wear Level</span>
                      <span className="font-mono font-bold text-cyan-400">{inspectionResult.wearLevelPercentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          inspectionResult.wearLevelPercentage > 75 
                            ? 'bg-rose-500' 
                            : inspectionResult.wearLevelPercentage > 45 
                            ? 'bg-amber-400' 
                            : 'bg-emerald-400'
                        }`}
                        style={{ width: `${inspectionResult.wearLevelPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Observations */}
                  <div>
                    <h5 className="text-xs font-semibold text-slate-300 mb-1.5">Observations:</h5>
                    <ul className="space-y-1 text-xs text-slate-400">
                      {inspectionResult.observations.map((obs, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                          <span>{obs}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Safety Risk */}
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200">
                    <strong className="block text-amber-400 font-semibold mb-0.5">Safety Hazard:</strong>
                    {inspectionResult.safetyRisk}
                  </div>

                  {/* Action Required */}
                  <div className="p-3 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-xs text-slate-200">
                    <strong className="block text-cyan-400 font-semibold mb-0.5">Workshop Recommendation:</strong>
                    {inspectionResult.actionRequired}
                  </div>

                  <button
                    onClick={() => onBookWithDiagnosis('pkg-brakes-drivetrain', `Photo inspection result for ${inspectionResult.partIdentified}: ${inspectionResult.actionRequired}`)}
                    className="w-full py-2.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors"
                  >
                    Book Drivetrain / Component Replacement
                  </button>
                </div>
              ) : (
                <div className="h-64 border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-6 text-center text-xs text-slate-500">
                  <Camera className="w-8 h-8 text-slate-700 mb-2" />
                  <span>Visual telemetry report will render here after analysis.</span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* --- TAB 3: SERVICE PLANNER --- */}
      {activeSubTab === 'schedule' && (
        <div className="max-w-4xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-6">
            <h3 className="text-xl font-bold text-white">Predictive Maintenance Roadmap</h3>
            <p className="text-xs text-slate-400 mt-1">
              AI calculates your customized service schedule based on bike model and your real-world riding conditions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Make</label>
              <input
                type="text"
                value={planBrand}
                onChange={(e) => setPlanBrand(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Model</label>
              <input
                type="text"
                value={planModel}
                onChange={(e) => setPlanModel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Current Mileage (km)</label>
              <input
                type="number"
                value={planKm}
                onChange={(e) => setPlanKm(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleGeneratePlan}
                disabled={isPlanning}
                className="w-full py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                {isPlanning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Calendar className="w-3.5 h-3.5" />}
                Generate Plan
              </button>
            </div>
          </div>

          {/* Schedule Timeline */}
          {maintenancePlan ? (
            <div className="space-y-4">
              {maintenancePlan.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col items-center justify-center text-cyan-400 shrink-0">
                      <span className="text-[10px] uppercase font-mono">Interval</span>
                      <span className="text-sm font-bold font-mono">#{idx + 1}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white font-mono">
                          {item.mileageKm.toLocaleString()} km
                        </span>
                        <span className="text-[11px] text-slate-400">
                          (in ~{item.intervalMonths} months)
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          item.urgency === 'Critical' 
                            ? 'bg-rose-500/20 text-rose-300' 
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {item.urgency}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {item.criticalPartsToCheck.map((part, pIdx) => (
                          <span key={pIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                            Check: {part}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <ul className="text-xs text-slate-400 space-y-1 md:max-w-md">
                    {item.tasks.map((task, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-1.5">
                        <span className="text-cyan-400">•</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">
              Click "Generate Plan" to calculate dynamic maintenance intervals.
            </div>
          )}
        </div>
      )}

    </div>
  );
};
