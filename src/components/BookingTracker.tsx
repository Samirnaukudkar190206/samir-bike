import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  Wrench, 
  Truck, 
  FileText, 
  Printer, 
  User, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  AlertCircle,
  Activity,
  Star,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api.ts';
import { Booking, ServiceStatus } from '../types/index.ts';
import { Feedback } from './Feedback.tsx';

interface BookingTrackerProps {
  initialCode?: string;
  onBookNew: () => void;
}

const STAGES: { key: string; label: string; desc: string }[] = [
  { key: 'received', label: 'Booked & Bay Scheduled', desc: 'Job card opened in system' },
  { key: 'transit', label: 'Transit / Checked In', desc: 'Doorstep pickup completed or bike dropped at center' },
  { key: 'service', label: 'Active Mechanical Service', desc: 'Fluid flushes, engine tune & parts calibration' },
  { key: 'qc', label: 'Quality & Road Test', desc: 'Supervisor 15-point dyno & brake road testing' },
  { key: 'ready', label: 'Ready for Delivery', desc: 'Cleaned, sanitized, ready for handover' }
];

export const BookingTracker: React.FC<BookingTrackerProps> = ({ initialCode, onBookNew }) => {
  const [searchInput, setSearchInput] = useState(initialCode || 'BK-8492');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookingData = async (codeToSearch: string) => {
    if (!codeToSearch.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await api.getBooking(codeToSearch.trim());
      setBooking(res.booking);
    } catch (err: any) {
      setError(err.message || 'No booking found with that tracking code.');
      setBooking(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCode) {
      setSearchInput(initialCode);
      fetchBookingData(initialCode);
    } else {
      // Load sample active booking for instant gratification
      fetchBookingData('BK-8492');
    }
  }, [initialCode]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBookingData(searchInput);
  };

  // Helper to map status to stage index (0 to 4)
  const getStageIndex = (status: ServiceStatus): number => {
    switch (status) {
      case 'pending_confirmation':
        return 0;
      case 'confirmed':
      case 'picked_up':
        return 1;
      case 'in_progress':
        return 2;
      case 'quality_check':
        return 3;
      case 'ready_for_delivery':
      case 'completed':
        return 4;
      default:
        return 0;
    }
  };

  const currentStageIdx = booking ? getStageIndex(booking.status) : 0;

  const handleMarkCompleteForTesting = async () => {
    if (!booking) return;
    try {
      const res = await api.updateBooking(booking.id, { status: 'completed' });
      setBooking(res.booking);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Real-Time Workshop Telemetry</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Track Your Bike's Service Journey
        </h2>
        <p className="mt-2 text-slate-300 text-sm sm:text-base">
          Live stage monitoring, technician diagnostic notes, and digital job card inspection.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 flex max-w-md mx-auto items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl focus-within:border-cyan-500">
          <Search className="w-5 h-5 text-slate-400 ml-3" />
          <input
            type="text"
            placeholder="Enter Booking ID (e.g. BK-8492, BK-6321)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="bg-transparent border-none text-sm text-white placeholder-slate-500 focus:outline-none flex-1 px-2 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        <div className="flex flex-wrap justify-center items-center gap-2 mt-3 text-xs text-slate-500">
          <span>Active demo IDs:</span>
          <button onClick={() => { setSearchInput('BK-3029'); fetchBookingData('BK-3029'); }} className="text-emerald-400 font-mono font-bold hover:underline">
            BK-3029 (Completed & Feedback)
          </button>
          <span>•</span>
          <button onClick={() => { setSearchInput('BK-8492'); fetchBookingData('BK-8492'); }} className="text-cyan-400 font-mono hover:underline">
            BK-8492 (In Progress)
          </button>
          <span>•</span>
          <button onClick={() => { setSearchInput('BK-6321'); fetchBookingData('BK-6321'); }} className="text-cyan-400 font-mono hover:underline">
            BK-6321 (Ready)
          </button>
          <span>•</span>
          <button onClick={() => { setSearchInput('BK-9104'); fetchBookingData('BK-9104'); }} className="text-cyan-400 font-mono hover:underline">
            BK-9104 (Confirmed)
          </button>
        </div>
      </div>

      {error && (
        <div className="max-w-xl mx-auto p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={onBookNew} className="text-cyan-400 font-bold hover:underline">
            Book Service Now →
          </button>
        </div>
      )}

      {booking && (
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Top Live Progress Bar Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl font-black text-white font-mono">{booking.bookingCode}</span>
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                    booking.status === 'in_progress'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse'
                      : booking.status === 'ready_for_delivery' || booking.status === 'completed'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {booking.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Scheduled for <strong className="text-slate-200">{booking.preferredDate}</strong> ({booking.timeSlot})
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-cyan-400" />
                  Print Job Card
                </button>
              </div>
            </div>

            {/* 5-Step Pipeline Graphic */}
            <div className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {STAGES.map((stg, idx) => {
                  const isCompleted = currentStageIdx > idx;
                  const isCurrent = currentStageIdx === idx;

                  return (
                    <div 
                      key={stg.key}
                      className={`p-4 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-cyan-500/15 border-cyan-400 ring-2 ring-cyan-500/20 shadow-lg'
                          : isCompleted
                          ? 'bg-slate-950 border-emerald-500/40 text-slate-300'
                          : 'bg-slate-950/40 border-slate-800/80 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-mono font-bold ${isCurrent ? 'text-cyan-400' : isCompleted ? 'text-emerald-400' : 'text-slate-600'}`}>
                          0{idx + 1}
                        </span>
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-slate-700" />
                        )}
                      </div>
                      
                      <h5 className={`text-xs font-bold ${isCurrent ? 'text-white' : isCompleted ? 'text-slate-200' : 'text-slate-500'}`}>
                        {stg.label}
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                        {stg.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Technician Telemetry Update */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                    Assigned Master Technician
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    {booking.assignedMechanic || 'Mike "Torque" Peterson (Master Tech)'}
                  </h4>
                </div>
              </div>

              <div className="flex-1 md:max-w-lg bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs">
                <span className="text-slate-400 font-semibold block text-[11px]">Latest Workshop Note:</span>
                <p className="text-slate-200 mt-0.5 italic">
                  "{booking.technicianNotes || 'Initial check-in diagnostics underway. Measuring valve clearances & chain tension.'}"
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-500 block">Est. Ready Time</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">
                  {booking.estimatedCompletion || 'Today, 05:00 PM'}
                </span>
              </div>
            </div>

          </div>

          {/* Digital Job Card & Line Items */}
          <div className="grid md:grid-cols-12 gap-6">
            
            {/* Vehicle Card */}
            <div className="md:col-span-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                <Wrench className="w-4 h-4 text-cyan-400" />
                Vehicle Specifications
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Bike Model</span>
                  <strong className="text-white text-base">{booking.bikeBrand} {booking.bikeModel}</strong>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 block">Reg / Plate</span>
                    <strong className="text-slate-200 font-mono">{booking.licensePlate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Year</span>
                    <strong className="text-slate-200">{booking.bikeYear}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Category</span>
                    <strong className="text-slate-200 capitalize">{booking.bikeType.replace('_', ' ')}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Odometer</span>
                    <strong className="text-slate-200">{booking.odometerKm ? `${booking.odometerKm} km` : 'N/A'}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-500 block">Delivery / Pickup Mode:</span>
                  <strong className="text-cyan-400 capitalize">
                    {booking.pickupType === 'doorstep_pickup' ? 'Doorstep Van Pickup & Drop' : 'Central Workshop Drive-In'}
                  </strong>
                  {booking.customerAddress && (
                    <p className="text-[11px] text-slate-400 mt-1">{booking.customerAddress}</p>
                  )}
                </div>

                {booking.customerNotes && (
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-500 block">Customer Reported Issues:</span>
                    <p className="text-slate-300 mt-0.5">{booking.customerNotes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Itemized Job Invoice */}
            <div className="md:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  Itemized Service Invoice & Spares
                </h4>
                <span className="text-xs font-mono text-slate-400">
                  Invoice: {booking.invoiceNumber || 'INV-2026-081'}
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-2">Description</th>
                      <th className="pb-2 text-center">Type</th>
                      <th className="pb-2 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    <tr>
                      <td className="py-2.5 font-semibold text-slate-200">{booking.packageName}</td>
                      <td className="py-2.5 text-center text-slate-400">Base Package</td>
                      <td className="py-2.5 text-right font-mono text-white">₹{booking.packagePrice.toLocaleString('en-IN')}</td>
                    </tr>
                    {booking.addOns && booking.addOns.map((add, i) => (
                      <tr key={i}>
                        <td className="py-2 text-slate-300">• {add.name}</td>
                        <td className="py-2 text-center text-slate-400">Performance Add-on</td>
                        <td className="py-2 text-right font-mono text-slate-300">+₹{add.price.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                    {booking.additionalCost ? (
                      <tr>
                        <td className="py-2 text-slate-300">• Authorized Extra Replacement Parts</td>
                        <td className="py-2 text-center text-slate-400">OEM Spares</td>
                        <td className="py-2 text-right font-mono text-slate-300">+₹{booking.additionalCost.toLocaleString('en-IN')}</td>
                      </tr>
                    ) : null}
                    <tr>
                      <td className="py-2 text-emerald-400 font-medium">Doorstep Hydraulic Van Transport</td>
                      <td className="py-2 text-center text-emerald-400">Complimentary</td>
                      <td className="py-2 text-right font-mono text-emerald-400">₹0.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-slate-800">
                      <td colSpan={2} className="pt-3 text-sm font-bold text-white">Grand Total</td>
                      <td className="pt-3 text-right text-base font-black text-emerald-400 font-mono">
                        ₹{(booking.totalPrice + (booking.additionalCost || 0)).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Payment & Satisfaction Shield */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-slate-300">
                    Payment Status: <strong className={booking.isPaid ? 'text-emerald-400' : 'text-amber-400'}>
                      {booking.isPaid ? 'Paid in Full' : 'Due upon handover & road test'}
                    </strong>
                  </span>
                </div>
                <div className="text-slate-400">
                  Questions? Call Master Bay: <strong className="text-slate-200">1-800-BIKE-AI</strong>
                </div>
              </div>

            </div>

          </div>

          {/* Feedback & Service Rating Component */}
          {booking.status === 'completed' ? (
            <Feedback 
              booking={booking} 
              onFeedbackSubmitted={(updated) => setBooking(updated)} 
            />
          ) : (
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-200 block text-xs font-semibold">
                    Customer Experience Rating & Comments
                  </strong>
                  <span className="text-[11px] text-slate-400">
                    Activates as soon as your bike service is marked complete by our quality inspection team.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleMarkCompleteForTesting}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold whitespace-nowrap self-start sm:self-auto transition-colors cursor-pointer"
              >
                Mark Complete to Test Rating & Review →
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
