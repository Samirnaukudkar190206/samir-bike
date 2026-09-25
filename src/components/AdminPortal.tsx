import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Wrench, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  Check, 
  LogOut, 
  Activity, 
  Sliders, 
  FileText,
  Phone,
  Mail,
  Layers,
  Sparkles,
  ChevronDown,
  Star
} from 'lucide-react';
import { api } from '../services/api.ts';
import { Booking, ServicePackage, Mechanic, AdminStats, ServiceStatus } from '../types/index.ts';

interface AdminPortalProps {
  onBackToCustomerSite: () => void;
  onAdminAuthChange: (isLoggedIn: boolean) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ 
  onBackToCustomerSite,
  onAdminAuthChange
}) => {
  const [pin, setPin] = useState('admin123');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Admin Dashboard State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [aiQueries, setAiQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Active editing booking modal or inline editing
  const [selectedBookingForNotes, setSelectedBookingForNotes] = useState<Booking | null>(null);
  const [tempNotes, setTempNotes] = useState('');
  const [tempExtraCost, setTempExtraCost] = useState(0);

  // Check persistent session on load
  useEffect(() => {
    const savedToken = sessionStorage.getItem('bikecare_admin_token');
    if (savedToken) {
      setIsAuthenticated(true);
      onAdminAuthChange(true);
      loadDashboardData();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const res = await api.adminLogin(pin);
      if (res.success) {
        sessionStorage.setItem('bikecare_admin_token', res.token);
        setIsAuthenticated(true);
        onAdminAuthChange(true);
        loadDashboardData();
      }
    } catch (err: any) {
      setAuthError(err.message || 'Invalid admin passcode.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('bikecare_admin_token');
    setIsAuthenticated(false);
    onAdminAuthChange(false);
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [bookingsData, statsData] = await Promise.all([
        api.getBookings(searchTerm, statusFilter),
        api.getAdminStats()
      ]);
      setBookings(bookingsData.bookings);
      setStats(statsData.stats);
      setMechanics(statsData.mechanics);
      setAiQueries(statsData.aiQueries || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [statusFilter, searchTerm]);

  // Handle Quick Status Change
  const handleStatusChange = async (id: string, newStatus: ServiceStatus) => {
    try {
      await api.updateBooking(id, { status: newStatus });
      loadDashboardData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  // Handle Assign Mechanic
  const handleAssignMechanic = async (id: string, mechanicName: string) => {
    try {
      await api.updateBooking(id, { assignedMechanic: mechanicName });
      loadDashboardData();
    } catch (err) {
      alert('Failed to assign mechanic');
    }
  };

  // Handle Save Notes & Extra Cost
  const handleSaveNotes = async () => {
    if (!selectedBookingForNotes) return;
    try {
      await api.updateBooking(selectedBookingForNotes.id, {
        technicianNotes: tempNotes,
        additionalCost: Number(tempExtraCost) || 0
      });
      setSelectedBookingForNotes(null);
      loadDashboardData();
    } catch (err) {
      alert('Failed to save technician notes');
    }
  };

  // Handle Delete Booking
  const handleDeleteBooking = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this booking?')) {
      try {
        await api.deleteBooking(id);
        loadDashboardData();
      } catch (err) {
        alert('Failed to delete booking');
      }
    }
  };

  // Toggle Paid status
  const handleTogglePaid = async (b: Booking) => {
    try {
      await api.updateBooking(b.id, { isPaid: !b.isPaid });
      loadDashboardData();
    } catch (err) {
      alert('Failed to toggle payment status');
    }
  };

  // --- RENDER 1: AUTHENTICATION LOCK SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">Workshop Admin Portal</h2>
            <p className="text-xs text-slate-400 mt-1">
              Restricted to authorized mechanics and workshop dispatchers.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-left text-xs font-semibold text-slate-300 mb-1">
                Admin Passcode:
              </label>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter passcode..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 tracking-widest text-center"
              />
            </div>

            {authError && (
              <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                {authError}
              </div>
            )}

            {/* Quick demo passcode button */}
            <div className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <span>Demo Passcode:</span>
              <button
                type="button"
                onClick={() => setPin('admin123')}
                className="text-amber-400 font-mono font-bold hover:underline"
              >
                admin123
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              Unlock Workshop Dashboard
            </button>

            <button
              type="button"
              onClick={onBackToCustomerSite}
              className="w-full text-xs text-slate-400 hover:text-white pt-2"
            >
              ← Return to Customer Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER 2: AUTHENTICATED WORKSHOP DASHBOARD ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Admin Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
            <Wrench className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">Workshop Dispatch & Master Board</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Live Workshop
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Logged in as Master Administrator • Real-time database sync active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={loadDashboardData}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={onBackToCustomerSite}
            className="px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold"
          >
            View Customer Site
          </button>

          <button
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
            <span className="text-xs text-slate-400 block font-medium">Total Bookings</span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">{stats.totalBookings}</div>
            <span className="text-[11px] text-slate-500">All registered jobs</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-md">
            <span className="text-xs text-cyan-400 block font-semibold">Active in Bays</span>
            <div className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">{stats.inProgressBookings}</div>
            <span className="text-[11px] text-slate-500">Under technician service</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-md">
            <span className="text-xs text-amber-400 block font-semibold">Awaiting Intake</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">{stats.pendingBookings}</div>
            <span className="text-[11px] text-slate-500">Pending & confirmed</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-md">
            <span className="text-xs text-emerald-400 block font-semibold">Ready / Completed</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">{stats.completedBookings}</div>
            <span className="text-[11px] text-slate-500">Handed over to rider</span>
          </div>

          <div className="col-span-2 md:col-span-1 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
            <span className="text-xs text-slate-400 block font-medium">Total Revenue</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 font-mono">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">Workshop Turnaround</span>
          </div>
        </div>
      )}

      {/* Mechanics Roster Quick Strip */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Active Workshop Technicians on Duty ({mechanics.length})
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {mechanics.map(m => (
            <div key={m.id} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <strong className="text-slate-200">{m.name.split(' ')[0]}</strong>
              <span className="text-slate-500 text-[11px]">({m.specialty.split(',')[0]})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Job Board Management Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        
        {/* Controls: Search & Status Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              { id: 'all', label: 'All Jobs' },
              { id: 'in_progress', label: 'In Progress' },
              { id: 'confirmed', label: 'Confirmed' },
              { id: 'ready_for_delivery', label: 'Ready' },
              { id: 'completed', label: 'Completed' },
              { id: 'cancelled', label: 'Cancelled' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                  statusFilter === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search code, customer, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

        </div>

        {/* Bookings Data Table / Job Cards */}
        {bookings.length === 0 ? (
          <div className="text-center py-12 text-xs text-slate-500">
            No bookings matching the current filter.
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-900 pb-3">
                  
                  {/* Left: Code, Vehicle & Customer */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center shrink-0">
                      <span className="text-[10px] text-slate-500 uppercase font-mono">Code</span>
                      <strong className="text-sm font-black text-cyan-400 font-mono">{b.bookingCode}</strong>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">{b.bikeBrand} {b.bikeModel}</h4>
                        <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                          {b.licensePlate}
                        </span>
                        <span className="text-xs text-slate-400">({b.bikeYear})</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-slate-200">
                          <Users className="w-3.5 h-3.5 text-slate-500" />
                          {b.customerName}
                        </span>
                        <a href={`tel:${b.customerPhone}`} className="flex items-center gap-1 text-cyan-400 hover:underline">
                          <Phone className="w-3.5 h-3.5" />
                          {b.customerPhone}
                        </a>
                        <span className="text-slate-500">
                          Scheduled: {b.preferredDate} ({b.timeSlot.split('-')[0]})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Package, Pricing & Payment */}
                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-xs font-bold text-white block">{b.packageName}</span>
                      <div className="flex items-center gap-2 justify-end mt-0.5">
                        <span className="text-base font-black text-emerald-400 font-mono">
                          ₹{(b.totalPrice + (b.additionalCost || 0)).toLocaleString('en-IN')}
                        </span>
                        <button
                          onClick={() => handleTogglePaid(b)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${
                            b.isPaid
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          }`}
                        >
                          {b.isPaid ? 'PAID' : 'PAYMENT DUE'}
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Status & Actions Controls Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
                  
                  {/* Status Dropdown */}
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1 font-medium">Service Status:</label>
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value as ServiceStatus)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="pending_confirmation">Pending Confirmation</option>
                      <option value="confirmed">Confirmed / Bay Reserved</option>
                      <option value="picked_up">Picked Up / Checked In</option>
                      <option value="in_progress">In Progress (Active Service)</option>
                      <option value="quality_check">Quality Check & Road Test</option>
                      <option value="ready_for_delivery">Ready for Delivery</option>
                      <option value="completed">Completed / Handed Over</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Assign Mechanic Dropdown */}
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1 font-medium">Assign Master Tech:</label>
                    <select
                      value={b.assignedMechanic || ''}
                      onChange={(e) => handleAssignMechanic(b.id, e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="">Unassigned</option>
                      {mechanics.map(m => (
                        <option key={m.id} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Technician Notes Trigger */}
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1 font-medium">Technician Notes:</label>
                    <button
                      onClick={() => {
                        setSelectedBookingForNotes(b);
                        setTempNotes(b.technicianNotes || '');
                        setTempExtraCost(b.additionalCost || 0);
                      }}
                      className="w-full text-left bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 hover:border-slate-700 flex items-center justify-between truncate"
                    >
                      <span className="truncate">{b.technicianNotes || 'Add work log & spares...'}</span>
                      <Edit3 className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />
                    </button>
                  </div>

                  {/* Action Buttons: Delete / Print */}
                  <div className="flex items-end gap-2">
                    <button
                      onClick={() => {
                        // Quick print for job card
                        window.print();
                      }}
                      className="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium text-center"
                    >
                      Job Card
                    </button>
                    <button
                      onClick={() => handleDeleteBooking(b.id)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                      title="Cancel/Delete booking"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

                {/* Customer Address or Special Notes preview */}
                {(b.customerAddress || b.customerNotes) && (
                  <div className="text-[11px] text-slate-400 bg-slate-900/50 p-2.5 rounded-xl border border-slate-900 flex flex-wrap gap-x-6 gap-y-1">
                    {b.customerAddress && (
                      <span><strong>Pickup Address:</strong> {b.customerAddress}</span>
                    )}
                    {b.customerNotes && (
                      <span className="text-amber-300/80"><strong>Rider Notes:</strong> {b.customerNotes}</span>
                    )}
                  </div>
                )}

                {/* Customer Verified Review & Rating */}
                {b.customerRating && (
                  <div className="text-[11px] text-slate-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-amber-400 font-bold shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="font-mono ml-1">{b.customerRating}.0 / 5.0</span>
                      </div>
                      <span className="text-slate-400 font-semibold">Rider Review:</span>
                      <span className="text-white italic truncate max-w-md">
                        "{b.customerFeedback || 'Verified Rating'}"
                      </span>
                    </div>
                    {b.feedbackTags && b.feedbackTags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {b.feedbackTags.slice(0, 3).map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-cyan-300 border border-cyan-800/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </div>

      {/* AI Diagnostic Logs - Workshop Telemetry */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Live AI Diagnostic Query Pool</h3>
          </div>
          <span className="text-xs text-slate-400">Recent rider failure complaints & AI recommendations</span>
        </div>

        <div className="space-y-2">
          {aiQueries.length === 0 ? (
            <p className="text-xs text-slate-500">No AI queries logged yet.</p>
          ) : (
            aiQueries.slice(0, 5).map((q) => (
              <div key={q.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <strong className="text-white">{q.bikeModel || 'Motorcycle'}</strong>
                  <span className="text-slate-400 ml-2">Symptoms: {q.symptoms.join(', ')}</span>
                </div>
                <div className="text-cyan-400 font-semibold truncate sm:max-w-md">
                  AI Finding: {q.resultSummary}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Notes & Extra Cost Modal */}
      {selectedBookingForNotes && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-base font-bold text-white">
                Update Technician Work Log • {selectedBookingForNotes.bookingCode}
              </h4>
              <button 
                onClick={() => setSelectedBookingForNotes(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Technician Notes (Visible to Rider on Live Tracker):
              </label>
              <textarea
                rows={4}
                value={tempNotes}
                onChange={(e) => setTempNotes(e.target.value)}
                placeholder="e.g. Engine oil replaced with 10W-40 Motul Synthetic. Cleaned spark plugs. Calibrated rear brake pads."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Additional Authorized Spare Parts Cost (₹):
              </label>
              <input
                type="number"
                value={tempExtraCost}
                onChange={(e) => setTempExtraCost(Number(e.target.value))}
                placeholder="0"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                This will automatically update the customer's digital invoice and total bill.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedBookingForNotes(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Save Notes & Bill
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
