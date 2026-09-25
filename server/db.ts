import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Booking, ServicePackage, ServiceAddOn, Mechanic, AdminStats } from '../src/types/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, '../data');
const DB_FILE = path.join(DATA_DIR, 'bikecare-db.json');

export interface DatabaseSchema {
  services: ServicePackage[];
  addOns: ServiceAddOn[];
  bookings: Booking[];
  mechanics: Mechanic[];
  aiQueries: Array<{
    id: string;
    timestamp: string;
    bikeModel: string;
    symptoms: string[];
    resultSummary: string;
  }>;
}

const INITIAL_SERVICES: ServicePackage[] = [
  {
    id: 'pkg-express-tune',
    name: 'Express 360° Tune-Up',
    category: 'tune_up',
    tagline: 'Quick safety inspection, chain lube, brake check & oil top-up.',
    price: 499,
    durationMinutes: 60,
    popular: true,
    features: [
      '21-Point Safety & Tightening Inspection',
      'Engine Oil Top-Up / Level Check',
      'Drive Chain Degreasing, Tensioning & High-Speed Lube',
      'Brake Pad Thickness & Lever Play Calibration',
      'Tire Pressure & Tread Depth Inspection',
      'Battery Voltage & Charging Health Test',
      'Complimentary Exterior Foam Jet Wash'
    ],
    bikeTypesSupported: ['commuter_motorcycle', 'scooter_moped', 'sports_superbike', 'cruiser', 'electric_bike', 'bicycle_mtb']
  },
  {
    id: 'pkg-master-overhaul',
    name: 'Comprehensive Master Overhaul',
    category: 'full_service',
    tagline: 'The ultimate engine, carburetor/FI, electrical & mechanical renewal.',
    price: 1499,
    durationMinutes: 180,
    popular: true,
    features: [
      'Everything in Express Tune-Up',
      'Complete Engine Oil & Oil Filter Replacement (Premium Semi-Synthetic)',
      'Spark Plug Cleaning & Gap Setting (or replacement check)',
      'Air Filter Ultrasonic Cleaning or Replacement',
      'Carburetor Ultrasonic Tuning or Throttle Body De-Carbonization',
      'Clutch Cable & Throttle Free Play Fine Calibration',
      'Front & Rear Brake Caliper Service & Deglaze',
      'Steering Stem & Wheel Bearing Grease Check',
      'Computerized Diagnostic Scan (OBD2 for supported EFI bikes)',
      '15-Day Service Satisfaction Warranty'
    ],
    bikeTypesSupported: ['commuter_motorcycle', 'sports_superbike', 'cruiser', 'scooter_moped']
  },
  {
    id: 'pkg-brakes-drivetrain',
    name: 'Brakes & Drivetrain Revive',
    category: 'brakes_tyres',
    tagline: 'Eliminate squeaks, slipping clutches, and loose chains.',
    price: 799,
    durationMinutes: 90,
    features: [
      'Brake Rotor Truing & Pad Replacement / Dressing',
      'DOT 4 Brake Fluid Complete Hydraulic Bleed & Flush',
      'Drive Chain Deep Ultrasonic Soak, Link Inspection & Alignment',
      'Sprocket Tooth Wear Profiling & Torque Check',
      'Clutch Friction Plate Drag & Engagement Testing',
      'Rear Suspension Linkage Bushing Lubrication'
    ],
    bikeTypesSupported: ['commuter_motorcycle', 'sports_superbike', 'cruiser', 'scooter_moped', 'bicycle_mtb']
  },
  {
    id: 'pkg-ev-special',
    name: 'EV & E-Bike Power Shield',
    category: 'ev_special',
    tagline: 'Specialized for electric scooters, hub motors & high-voltage packs.',
    price: 899,
    durationMinutes: 120,
    features: [
      'Lithium-Ion Battery Pack Health & Cell Balancing Check',
      'BLDC Hub / Mid-Drive Motor Phase Current Diagnostics',
      'Regenerative Braking Calibration & Sensor Check',
      'Controller Thermal Pad & Water Ingress Inspection',
      'Display Controller & Throttle Hall-Sensor Tuning',
      'High-Voltage Wiring Harness Continuity & Insulation Test',
      'E-Drive Firmware Update (Supported Models)'
    ],
    bikeTypesSupported: ['electric_bike', 'scooter_moped']
  },
  {
    id: 'pkg-monsoon-weather',
    name: 'All-Weather & Monsoon Shield',
    category: 'monsoon_winter',
    tagline: 'Anti-rust sealing, electrical moisture-proofing and deep waterproofing.',
    price: 699,
    durationMinutes: 90,
    features: [
      'Anti-Corrosion Ceramic Underbody & Silencer Coating',
      'Electrical Coupler Di-electric Silicon Grease Moisture Sealing',
      'Tire Wet-Grip Siping & Compound Check',
      'Chain Water-Displacement Anti-Rust Synthetic Wax Coat',
      'Brake Drum & Disc Water Drain Ports Clear-out',
      'Hydrophobic Windscreen & Mirror Rain-Repellent Treatment'
    ],
    bikeTypesSupported: ['commuter_motorcycle', 'sports_superbike', 'cruiser', 'scooter_moped', 'electric_bike']
  }
];

const INITIAL_ADDONS: ServiceAddOn[] = [
  {
    id: 'addon-synthetic-oil',
    name: '100% Fully Synthetic Motul/Castrol Race Oil Upgrade',
    price: 450,
    description: 'Superior thermal stability, reduces engine friction by up to 14%.'
  },
  {
    id: 'addon-chain-wax',
    name: 'Ultrasonic Chain Deep Bath + Ceramic Wax Lube',
    price: 299,
    description: 'Extends chain & sprocket lifespan by 2x; zero fling on rims.'
  },
  {
    id: 'addon-brake-flush',
    name: 'Full Hydraulic Brake Fluid Flush (DOT 4/5.1)',
    price: 349,
    description: 'Restores crisp, firm brake lever bite and eliminates air bubbles.'
  },
  {
    id: 'addon-nitrogen-fill',
    name: 'High-Purity Nitrogen Tire Inflation',
    price: 149,
    description: 'Maintains constant pressure through heat cycles and prevents rim corrosion.'
  },
  {
    id: 'addon-ceramic-coat',
    name: 'Nano-Ceramic 9H Gloss & Paint Protection Coat',
    price: 599,
    description: 'Deep mirror shine with 6-month hydrophobic swirl & UV protection.'
  },
  {
    id: 'addon-priority-slot',
    name: 'VIP Express Bay Pass (Guaranteed 2-Hour Return)',
    price: 399,
    description: 'Skips the workshop queue with dedicated twin-technician service.'
  }
];

const INITIAL_MECHANICS: Mechanic[] = [
  {
    id: 'mech-1',
    name: 'Mike "Torque" Peterson',
    role: 'Lead Master Technician',
    experienceYears: 14,
    specialty: 'High-performance engines, EFI diagnostics & Yamaha/Kawasaki',
    activeJobsCount: 2
  },
  {
    id: 'mech-2',
    name: 'Sarah Chen',
    role: 'Senior EV & Electronics Specialist',
    experienceYears: 8,
    specialty: 'Electric Powertrains, BMS, Battery health & modern electronics',
    activeJobsCount: 1
  },
  {
    id: 'mech-3',
    name: 'David Vance',
    role: 'Transmission & Drivetrain Specialist',
    experienceYears: 11,
    specialty: 'Gearboxes, multi-plate clutches, belts & chain alignment',
    activeJobsCount: 2
  },
  {
    id: 'mech-4',
    name: 'Alex Rivera',
    role: 'Chassis & Suspension Tuner',
    experienceYears: 9,
    specialty: 'Inverted fork seals, mono-shock damping & wheel truing',
    activeJobsCount: 0
  }
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg-1',
    bookingCode: 'BK-8492',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    customerName: 'Samir Patil',
    customerEmail: 'samir.patil@example.com',
    customerPhone: '+91 98201 43210',
    customerAddress: 'Flat 402, Sea View Apts, Bandra West, Mumbai',
    pickupType: 'doorstep_pickup',
    bikeType: 'sports_superbike',
    bikeBrand: 'Yamaha',
    bikeModel: 'YZF-R7',
    bikeYear: 2023,
    licensePlate: 'MH-02-CB-9942',
    odometerKm: 8400,
    packageId: 'pkg-master-overhaul',
    packageName: 'Comprehensive Master Overhaul',
    packagePrice: 1499,
    addOns: [
      { id: 'addon-synthetic-oil', name: '100% Fully Synthetic Motul/Castrol Race Oil Upgrade', price: 450, description: '' },
      { id: 'addon-chain-wax', name: 'Ultrasonic Chain Deep Bath + Ceramic Wax Lube', price: 299, description: '' }
    ],
    totalPrice: 2248,
    preferredDate: new Date().toISOString().split('T')[0],
    timeSlot: '09:00 AM - 11:00 AM',
    status: 'in_progress',
    assignedMechanic: 'Mike "Torque" Peterson',
    customerNotes: 'Slight vibration around 5000 RPM and brake lever feels a bit soft.',
    technicianNotes: 'Engine flush complete. Replaced spark plugs and fine-tuned throttle bodies. Currently bleeding front brake lines.',
    estimatedCompletion: 'Today, 04:30 PM',
    invoiceNumber: 'INV-2026-081',
    isPaid: false,
    paymentMethod: 'online_card'
  },
  {
    id: 'bkg-2',
    bookingCode: 'BK-6321',
    createdAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav.mehta@example.com',
    customerPhone: '+91 97654 32109',
    customerAddress: 'Plot 14, 100ft Road, Indiranagar, Bengaluru',
    pickupType: 'service_center_drop',
    bikeType: 'electric_bike',
    bikeBrand: 'Super73',
    bikeModel: 'RX Mojave Edition',
    bikeYear: 2024,
    licensePlate: 'KA-03-EV-1024',
    odometerKm: 2300,
    packageId: 'pkg-ev-special',
    packageName: 'EV & E-Bike Power Shield',
    packagePrice: 899,
    addOns: [
      { id: 'addon-brake-flush', name: 'Full Hydraulic Brake Fluid Flush (DOT 4/5.1)', price: 349, description: '' }
    ],
    totalPrice: 1248,
    preferredDate: new Date().toISOString().split('T')[0],
    timeSlot: '11:30 AM - 01:30 PM',
    status: 'ready_for_delivery',
    assignedMechanic: 'Sarah Chen',
    customerNotes: 'Sudden battery drop on hills, rear brake squeaking.',
    technicianNotes: 'Recalibrated BMS cells #4 and #7. De-glazed Magura disc pads. Road test verified 100% peak torque.',
    estimatedCompletion: 'Ready Now',
    invoiceNumber: 'INV-2026-080',
    isPaid: true,
    paymentMethod: 'upi'
  },
  {
    id: 'bkg-3',
    bookingCode: 'BK-9104',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    customerName: 'Marcus Bennett',
    customerEmail: 'm.bennett@example.com',
    customerPhone: '+91 99887 76655',
    customerAddress: 'Bungalow 7, Koregaon Park, Pune',
    pickupType: 'doorstep_pickup',
    bikeType: 'cruiser',
    bikeBrand: 'Royal Enfield',
    bikeModel: 'Super Meteor 650',
    bikeYear: 2024,
    licensePlate: 'MH-12-CR-8821',
    odometerKm: 4200,
    packageId: 'pkg-express-tune',
    packageName: 'Express 360° Tune-Up',
    packagePrice: 499,
    addOns: [
      { id: 'addon-nitrogen-fill', name: 'High-Purity Nitrogen Tire Inflation', price: 149, description: '' }
    ],
    totalPrice: 648,
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '02:00 PM - 04:00 PM',
    status: 'confirmed',
    assignedMechanic: 'David Vance',
    customerNotes: 'Getting ready for a 400km highway tour this weekend.',
    technicianNotes: 'Scheduled for technician bay #3 tomorrow morning.',
    estimatedCompletion: 'Tomorrow, 05:00 PM',
    isPaid: false,
    paymentMethod: 'cash_on_delivery'
  },
  {
    id: 'bkg-4',
    bookingCode: 'BK-3029',
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    customerName: 'Pooja Deshmukh',
    customerEmail: 'pooja.d@example.com',
    customerPhone: '+91 98112 23344',
    customerAddress: 'Tower B, Sector 62, Noida, NCR',
    pickupType: 'doorstep_pickup',
    bikeType: 'commuter_motorcycle',
    bikeBrand: 'Honda',
    bikeModel: 'CB300R',
    bikeYear: 2022,
    licensePlate: 'DL-01-HN-4412',
    odometerKm: 14500,
    packageId: 'pkg-monsoon-weather',
    packageName: 'All-Weather & Monsoon Shield',
    packagePrice: 699,
    addOns: [
      { id: 'addon-ceramic-coat', name: 'Nano-Ceramic 9H Gloss & Paint Protection Coat', price: 599, description: '' }
    ],
    totalPrice: 1298,
    preferredDate: new Date(Date.now() - 48 * 3600 * 1000).toISOString().split('T')[0],
    timeSlot: '10:00 AM - 12:00 PM',
    status: 'completed',
    assignedMechanic: 'Alex Rivera',
    customerNotes: 'Rust protection needed before rainy season.',
    technicianNotes: 'Complete silicone coupler sealing, ceramic paint protection cured under infrared lamps.',
    estimatedCompletion: 'Completed',
    invoiceNumber: 'INV-2026-077',
    isPaid: true,
    paymentMethod: 'online_card',
    customerRating: 5,
    customerFeedback: 'Outstanding job on the monsoon coating and electrical seal! The bike looks immaculate, paint shines like glass, and throttle feels super responsive. Alex Rivera is an ace technician.',
    feedbackTags: ['Super Smooth Engine', 'Spotless Wash & Polish', 'Master Technician Expertise'],
    feedbackSubmittedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
  }
];

class DatabaseManager {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDirectory();
    this.data = this.loadData();
  }

  private ensureDirectory() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.services && parsed.bookings) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Failed to parse database file, re-initializing with seeds:', err);
    }

    const defaultData: DatabaseSchema = {
      services: INITIAL_SERVICES,
      addOns: INITIAL_ADDONS,
      bookings: INITIAL_BOOKINGS,
      mechanics: INITIAL_MECHANICS,
      aiQueries: [
        {
          id: 'ai-q1',
          timestamp: new Date().toISOString(),
          bikeModel: 'Yamaha MT-07',
          symptoms: ['Metallic ticking noise at idle', 'Rough cold start'],
          resultSummary: 'Cam Chain Tensioner (CCT) slack suspected. High urgency to avoid timing jump.'
        },
        {
          id: 'ai-q2',
          timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
          bikeModel: 'Royal Enfield Classic 350',
          symptoms: ['Squeaking disc brakes when coming to halt'],
          resultSummary: 'Glazed brake pads / brake dust accumulation. Requires deglaze and disc truing.'
        }
      ]
    };

    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(dataToSave: DatabaseSchema) {
    try {
      this.ensureDirectory();
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error writing to database file:', err);
    }
  }

  // --- Services ---
  getServices(): ServicePackage[] {
    return this.data.services;
  }

  getServiceById(id: string): ServicePackage | undefined {
    return this.data.services.find(s => s.id === id);
  }

  saveService(service: ServicePackage): ServicePackage {
    const idx = this.data.services.findIndex(s => s.id === service.id);
    if (idx >= 0) {
      this.data.services[idx] = service;
    } else {
      this.data.services.push(service);
    }
    this.saveData(this.data);
    return service;
  }

  getAddOns(): ServiceAddOn[] {
    return this.data.addOns;
  }

  // --- Bookings ---
  getBookings(search?: string, status?: string): Booking[] {
    let result = [...this.data.bookings];
    if (status && status !== 'all') {
      result = result.filter(b => b.status === status);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b => 
        b.bookingCode.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.toLowerCase().includes(q) ||
        b.bikeModel.toLowerCase().includes(q) ||
        b.licensePlate.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getBookingByIdOrCode(idOrCode: string): Booking | undefined {
    const searchVal = idOrCode.trim().toLowerCase();
    return this.data.bookings.find(b => 
      b.id.toLowerCase() === searchVal || 
      b.bookingCode.toLowerCase() === searchVal
    );
  }

  createBooking(newBookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt' | 'status'>): Booking {
    // Generate unique friendly code e.g. BK-4921
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `BK-${randomSuffix}`;
    const id = `bkg-${Date.now()}-${randomSuffix}`;
    
    const newBooking: Booking = {
      ...newBookingData,
      id,
      bookingCode,
      createdAt: new Date().toISOString(),
      status: 'pending_confirmation',
      invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      isPaid: false
    };

    this.data.bookings.unshift(newBooking);
    this.saveData(this.data);
    return newBooking;
  }

  updateBooking(id: string, updates: Partial<Booking>): Booking | null {
    const idx = this.data.bookings.findIndex(b => b.id === id || b.bookingCode.toUpperCase() === id.toUpperCase());
    if (idx === -1) return null;

    this.data.bookings[idx] = {
      ...this.data.bookings[idx],
      ...updates
    };
    this.saveData(this.data);
    return this.data.bookings[idx];
  }

  deleteBooking(id: string): boolean {
    const prevLen = this.data.bookings.length;
    this.data.bookings = this.data.bookings.filter(b => b.id !== id && b.bookingCode !== id);
    if (this.data.bookings.length !== prevLen) {
      this.saveData(this.data);
      return true;
    }
    return false;
  }

  // --- Mechanics ---
  getMechanics(): Mechanic[] {
    return this.data.mechanics;
  }

  // --- AI Queries Logging ---
  logAiQuery(bikeModel: string, symptoms: string[], resultSummary: string) {
    this.data.aiQueries.unshift({
      id: `ai-q-${Date.now()}`,
      timestamp: new Date().toISOString(),
      bikeModel,
      symptoms,
      resultSummary
    });
    // Keep max 50 queries
    if (this.data.aiQueries.length > 50) {
      this.data.aiQueries = this.data.aiQueries.slice(0, 50);
    }
    this.saveData(this.data);
  }

  getAiQueries() {
    return this.data.aiQueries;
  }

  // --- Admin Stats ---
  getStats(): AdminStats {
    const bookings = this.data.bookings;
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending_confirmation' || b.status === 'confirmed').length;
    const inProgressBookings = bookings.filter(b => b.status === 'in_progress' || b.status === 'picked_up' || b.status === 'quality_check').length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    
    const totalRevenue = bookings
      .filter(b => b.status !== 'cancelled')
      .reduce((sum, b) => sum + (b.totalPrice || 0) + (b.additionalCost || 0), 0);

    // Popular services counter
    const counts: Record<string, number> = {};
    bookings.forEach(b => {
      counts[b.packageName] = (counts[b.packageName] || 0) + 1;
    });

    const popularServices = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const ratedBookings = bookings.filter(b => b.customerRating && b.customerRating > 0);
    const averageRating = ratedBookings.length > 0
      ? Number((ratedBookings.reduce((sum, b) => sum + (b.customerRating || 5), 0) / ratedBookings.length).toFixed(1))
      : 4.9;

    return {
      totalBookings,
      pendingBookings,
      inProgressBookings,
      completedBookings,
      totalRevenue,
      averageRating,
      popularServices,
      activeMechanics: this.data.mechanics.length
    };
  }
}

export const db = new DatabaseManager();
