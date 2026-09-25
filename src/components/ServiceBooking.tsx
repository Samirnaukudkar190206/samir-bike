import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Wrench, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Check, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  DollarSign, 
  CheckCircle2, 
  FileText,
  AlertCircle,
  Phone,
  User,
  CreditCard
} from 'lucide-react';
import { api } from '../services/api.ts';
import { ServicePackage, ServiceAddOn, Booking, BikeType, PickupType } from '../types/index.ts';

interface ServiceBookingProps {
  initialPackageId?: string;
  initialNotes?: string;
  onBookingSuccess: (bookingCode: string) => void;
  onGoToTracker: (bookingCode: string) => void;
}

export const ServiceBooking: React.FC<ServiceBookingProps> = ({
  initialPackageId,
  initialNotes,
  onBookingSuccess,
  onGoToTracker
}) => {
  const [step, setStep] = useState<number>(1);
  const [services, setServices] = useState<ServicePackage[]>([]);
  const [availableAddOns, setAvailableAddOns] = useState<ServiceAddOn[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // Form State
  const [bikeType, setBikeType] = useState<BikeType>('commuter_motorcycle');
  const [bikeBrand, setBikeBrand] = useState('Honda');
  const [bikeModel, setBikeModel] = useState('CB350');
  const [bikeYear, setBikeYear] = useState<number>(2023);
  const [licensePlate, setLicensePlate] = useState('MH-02-CB-4912');
  const [odometerKm, setOdometerKm] = useState<number>(6500);

  const [selectedPackageId, setSelectedPackageId] = useState<string>(initialPackageId || 'pkg-master-overhaul');
  const [selectedAddOns, setSelectedAddOns] = useState<ServiceAddOn[]>([]);

  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [preferredDate, setPreferredDate] = useState<string>(tomorrowStr);
  const [timeSlot, setTimeSlot] = useState<string>('09:00 AM - 11:00 AM');
  const [pickupType, setPickupType] = useState<PickupType>('doorstep_pickup');

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState(initialNotes || '');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'online_card' | 'upi'>('cash_on_delivery');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Fetch Services on load
  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getServices();
        setServices(data.services);
        setAvailableAddOns(data.addOns);
        if (initialPackageId) {
          setSelectedPackageId(initialPackageId);
        } else if (data.services.length > 0) {
          setSelectedPackageId(data.services[0].id);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoadingServices(false);
      }
    }
    loadData();
  }, [initialPackageId]);

  // If initialNotes updates from diagnostic
  useEffect(() => {
    if (initialNotes) {
      setCustomerNotes(initialNotes);
    }
    if (initialPackageId) {
      setSelectedPackageId(initialPackageId);
    }
  }, [initialNotes, initialPackageId]);

  const selectedPackage = services.find(s => s.id === selectedPackageId) || services[0];

  // Price Calculation
  const packagePrice = selectedPackage ? selectedPackage.price : 499;
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const pickupFee = 0; // Free doorstep pickup promotion!
  const grandTotal = packagePrice + addOnsTotal + pickupFee;

  const toggleAddOn = (addOn: ServiceAddOn) => {
    if (selectedAddOns.some(a => a.id === addOn.id)) {
      setSelectedAddOns(selectedAddOns.filter(a => a.id !== addOn.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  // Submit Booking
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !bikeBrand.trim() || !bikeModel.trim()) {
      setSubmitError('Please complete all contact and vehicle details.');
      return;
    }
    if (pickupType === 'doorstep_pickup' && !customerAddress.trim()) {
      setSubmitError('Please provide your doorstep pickup address.');
      return;
    }

    setSubmitError(null);
    setSubmitting(true);

    try {
      const res = await api.createBooking({
        customerName,
        customerEmail: customerEmail || 'customer@bikecare.ai',
        customerPhone,
        customerAddress: customerAddress || 'Service Center Drive-In',
        pickupType,
        bikeType,
        bikeBrand,
        bikeModel,
        bikeYear: Number(bikeYear) || 2023,
        licensePlate: licensePlate || 'TEMP-PLATE',
        odometerKm: Number(odometerKm) || 0,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        packagePrice: selectedPackage.price,
        addOns: selectedAddOns,
        totalPrice: grandTotal,
        preferredDate,
        timeSlot,
        customerNotes,
        paymentMethod
      });

      setCreatedBooking(res.booking);
      onBookingSuccess(res.booking.bookingCode);
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit service booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // If successfully booked, render confirmation screen
  if (createdBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              Booking Confirmed & Bay Reserved
            </span>
            <h2 className="text-3xl font-black text-white mt-3">
              We've Got Your Bike Scheduled!
            </h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto mt-2">
              Thank you, <strong className="text-white">{createdBooking.customerName}</strong>. Your appointment has been logged into our workshop dispatch board.
            </p>
          </div>

          {/* Booking Code Card */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 max-w-md mx-auto">
            <span className="text-xs text-slate-400 block mb-1">Your Tracking ID</span>
            <div className="text-4xl font-black tracking-widest text-cyan-400 font-mono">
              {createdBooking.bookingCode}
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Save this tracking code to check real-time workshop progress and mechanic notes.
            </p>
          </div>

          {/* Summary Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block">Vehicle</span>
              <strong className="text-slate-200">{createdBooking.bikeBrand} {createdBooking.bikeModel}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Service Package</span>
              <strong className="text-slate-200">{createdBooking.packageName}</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Slot</span>
              <strong className="text-slate-200">{createdBooking.preferredDate} ({createdBooking.timeSlot.split('-')[0]})</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Estimated Bill</span>
              <strong className="text-emerald-400 font-mono text-sm">₹{createdBooking.totalPrice.toLocaleString('en-IN')}</strong>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onGoToTracker(createdBooking.bookingCode)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Track Live Workshop Progress</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Print Job Confirmation</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>Transparent 5-Minute Booking</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Book Workshop Service & Doorstep Pickup
        </h2>
        <p className="mt-2 text-slate-300 text-sm sm:text-base">
          Zero advance payment required. Pay only after our quality road-test and complete customer satisfaction.
        </p>
      </div>

      {/* Progress Steps Header */}
      <div className="max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          {[
            { num: 1, label: 'Bike' },
            { num: 2, label: 'Package' },
            { num: 3, label: 'Add-Ons' },
            { num: 4, label: 'Schedule' },
            { num: 5, label: 'Confirm' }
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none`}
            >
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.num
                    ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/30 font-extrabold scale-110'
                    : step > s.num
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-slate-900 border border-slate-700 text-slate-400'
                }`}
              >
                {step > s.num ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
              </div>
              <span className={`text-[11px] font-medium mt-1.5 ${step === s.num ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Wizard Form Area (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          
          {/* STEP 1: VEHICLE INFORMATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-cyan-400" />
                  Step 1: Your Vehicle Information
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Tell us what you ride so we assign the right technician.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Category of Two-Wheeler:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'commuter_motorcycle', name: 'Commuter / Street' },
                    { id: 'sports_superbike', name: 'Sports / Superbike' },
                    { id: 'cruiser', name: 'Cruiser / Touring' },
                    { id: 'scooter_moped', name: 'Scooter / Moped' },
                    { id: 'electric_bike', name: 'Electric Scooter / EV' },
                    { id: 'bicycle_mtb', name: 'Bicycle / MTB / E-Bike' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setBikeType(cat.id as BikeType)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                        bikeType === cat.id
                          ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-sm'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Make / Brand *</label>
                  <input
                    type="text"
                    required
                    value={bikeBrand}
                    onChange={(e) => setBikeBrand(e.target.value)}
                    placeholder="e.g. Honda, Yamaha, Royal Enfield, BMW"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Model Name *</label>
                  <input
                    type="text"
                    required
                    value={bikeModel}
                    onChange={(e) => setBikeModel(e.target.value)}
                    placeholder="e.g. CB350, MT-07, Classic 350, Activa"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Manufacturing Year</label>
                  <input
                    type="number"
                    value={bikeYear}
                    onChange={(e) => setBikeYear(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">License Plate / Reg Number</label>
                  <input
                    type="text"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    placeholder="e.g. 7X-9942 or MH-02-CB-4912"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">Current Odometer (km)</label>
                  <input
                    type="number"
                    value={odometerKm}
                    onChange={(e) => setOdometerKm(Number(e.target.value))}
                    placeholder="6500"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  Continue to Service Selection <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE SERVICE PACKAGE */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    Step 2: Choose Service Package
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Select transparent fixed-price service package.</p>
                </div>
                <button 
                  onClick={() => setStep(1)} 
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Edit Bike
                </button>
              </div>

              {loadingServices ? (
                <div className="py-8 text-center text-xs text-slate-400">Loading service packages...</div>
              ) : (
                <div className="space-y-3">
                  {services.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base font-bold text-white">{pkg.name}</h4>
                              {pkg.popular && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                                  Most Popular
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{pkg.tagline}</p>
                          </div>
                          
                          <div className="text-right shrink-0">
                            <span className="text-2xl font-black text-cyan-400 font-mono">₹{pkg.price.toLocaleString('en-IN')}</span>
                            <span className="text-[11px] text-slate-500 block">~{pkg.durationMinutes} mins</span>
                          </div>
                        </div>

                        {/* Package Checklist Highlights */}
                        <div className="mt-3.5 pt-3 border-t border-slate-900 grid sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                          {pkg.features.slice(0, 4).map((feat, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  Continue to Add-Ons <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PERFORMANCE ADD-ONS */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    Step 3: Performance Add-Ons & Fluids
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Optional specialized fluids, coating, and express passes.</p>
                </div>
                <button onClick={() => setStep(2)} className="text-xs text-slate-400 hover:text-white">
                  ← Edit Package
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {availableAddOns.map((addon) => {
                  const isChecked = selectedAddOns.some(a => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isChecked
                          ? 'bg-cyan-500/10 border-cyan-400 ring-1 ring-cyan-500/40 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{addon.name}</span>
                          <span className="text-xs font-mono font-bold text-emerald-400">+₹{addon.price.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{addon.description}</p>
                      </div>
                      
                      <div className="mt-3 flex items-center gap-1.5 text-[11px]">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700 bg-slate-900'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={isChecked ? 'text-cyan-300 font-semibold' : 'text-slate-500'}>
                          {isChecked ? 'Added to Service' : 'Add to service'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  Continue to Schedule <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SCHEDULE & PICKUP */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    Step 4: Pickup Mode & Time Slot
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Select when and where our workshop should service your bike.</p>
                </div>
                <button onClick={() => setStep(3)} className="text-xs text-slate-400 hover:text-white">
                  ← Edit Add-ons
                </button>
              </div>

              {/* Pickup Mode Switch */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Service Delivery Mode:</label>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setPickupType('doorstep_pickup')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      pickupType === 'doorstep_pickup'
                        ? 'bg-cyan-500/15 border-cyan-400 shadow-md'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <Truck className="w-4 h-4 text-cyan-400" />
                        Doorstep Van Pickup & Drop
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        FREE
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Our hydraulic lift van collects your bike from your home/office and returns it post-service.
                    </p>
                  </div>

                  <div
                    onClick={() => setPickupType('service_center_drop')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      pickupType === 'service_center_drop'
                        ? 'bg-cyan-500/15 border-cyan-400 shadow-md'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        Drive-in to Central Bay
                      </span>
                      <span className="text-[10px] text-slate-400">No wait bay</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Bring your bike to our high-tech workshop lounge with free coffee & live bay window view.
                    </p>
                  </div>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Time Slot Window</label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="09:00 AM - 11:00 AM">Morning: 09:00 AM - 11:00 AM (Recommended)</option>
                    <option value="11:30 AM - 01:30 PM">Midday: 11:30 AM - 01:30 PM</option>
                    <option value="02:00 PM - 04:00 PM">Afternoon: 02:00 PM - 04:00 PM</option>
                    <option value="04:30 PM - 06:30 PM">Evening Express: 04:30 PM - 06:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  Continue to Final Details <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: CUSTOMER DETAILS & SUBMIT */}
          {step === 5 && (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-cyan-400" />
                    Step 5: Contact & Job Card Notes
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Where we should dispatch updates and return your vehicle.</p>
                </div>
                <button type="button" onClick={() => setStep(4)} className="text-xs text-slate-400 hover:text-white">
                  ← Edit Schedule
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Samir Patil"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Phone (for SMS / WhatsApp Job Card) *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98201 43210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. samir@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {pickupType === 'doorstep_pickup' && (
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-slate-300 mb-1">Doorstep Pickup Street Address *</label>
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="e.g. 742 Evergreen Terrace, Downtown"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                )}

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Special Mechanic Instructions / AI Diagnostic Notes
                  </label>
                  <textarea
                    rows={3}
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Mention any specific sounds, previous repairs, or parts you want extra attention on..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Payment preference */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Payment Preference:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'cash_on_delivery', name: 'Cash on Handover' },
                      { id: 'online_card', name: 'Card on Delivery' },
                      { id: 'upi', name: 'UPI / Digital Wallet' }
                    ].map(pay => (
                      <button
                        key={pay.id}
                        type="button"
                        onClick={() => setPaymentMethod(pay.id as any)}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-center ${
                          paymentMethod === pay.id
                            ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {pay.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/20 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting ? 'Confirming Service Slot...' : 'Confirm & Book Service (₹' + grandTotal.toLocaleString('en-IN') + ')'}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Right Sticky Summary Sidebar (4 cols) */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Service Job Quote
              </h4>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                No Prepayment
              </span>
            </div>

            {/* Vehicle Preview */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs">
              <span className="text-slate-500 block text-[10px] uppercase font-mono">Bike Assigned</span>
              <strong className="text-white text-sm">{bikeBrand} {bikeModel}</strong>
              <span className="text-slate-400 block text-[11px]">{licensePlate} • {bikeYear}</span>
            </div>

            {/* Line Items */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>{selectedPackage?.name || 'Package'}</span>
                <span className="font-mono font-bold text-white">₹{packagePrice.toLocaleString('en-IN')}</span>
              </div>

              {selectedAddOns.map(addon => (
                <div key={addon.id} className="flex justify-between items-center text-slate-400">
                  <span className="truncate max-w-[180px]">• {addon.name}</span>
                  <span className="font-mono font-semibold text-slate-200">+₹{addon.price.toLocaleString('en-IN')}</span>
                </div>
              ))}

              <div className="flex justify-between items-center text-slate-300 pt-2 border-t border-slate-800/80">
                <span>Doorstep Van Pickup & Drop</span>
                <span className="text-emerald-400 font-bold">FREE (₹0)</span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span>15-Day Service Satisfaction Warranty</span>
                <span className="text-emerald-400 font-bold">INCLUDED</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Payable</span>
                <span className="text-[11px] text-slate-500">Pay after inspection</span>
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                ₹{grandTotal.toLocaleString('en-IN')}
              </div>
            </div>

            {/* Guarantee badge */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Includes 100% genuine parts guarantee and video proof before old part disposal.</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
