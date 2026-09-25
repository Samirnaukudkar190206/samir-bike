export type ServiceStatus = 
  | 'pending_confirmation' 
  | 'confirmed' 
  | 'picked_up' 
  | 'in_progress' 
  | 'quality_check' 
  | 'ready_for_delivery' 
  | 'completed' 
  | 'cancelled';

export type BikeType = 
  | 'commuter_motorcycle' 
  | 'sports_superbike' 
  | 'cruiser' 
  | 'scooter_moped' 
  | 'electric_bike' 
  | 'bicycle_mtb';

export type PickupType = 'doorstep_pickup' | 'service_center_drop';

export interface ServicePackage {
  id: string;
  name: string;
  category: 'tune_up' | 'full_service' | 'brakes_tyres' | 'ev_special' | 'monsoon_winter';
  tagline: string;
  price: number;
  durationMinutes: number;
  features: string[];
  popular?: boolean;
  bikeTypesSupported: BikeType[];
}

export interface ServiceAddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress?: string;
  pickupType: PickupType;
  
  // Bike Info
  bikeType: BikeType;
  bikeBrand: string;
  bikeModel: string;
  bikeYear: number;
  licensePlate: string;
  odometerKm?: number;

  // Selected Service
  packageId: string;
  packageName: string;
  packagePrice: number;
  addOns: ServiceAddOn[];
  totalPrice: number;

  // Schedule
  preferredDate: string;
  timeSlot: string;

  // Status & Tracking
  status: ServiceStatus;
  assignedMechanic?: string;
  customerNotes?: string;
  technicianNotes?: string;
  estimatedCompletion?: string;
  
  // Job Card & Invoice
  invoiceNumber?: string;
  additionalCost?: number;
  partsReplaced?: string[];
  isPaid?: boolean;
  paymentMethod?: 'cash_on_delivery' | 'online_card' | 'upi';

  // Customer Feedback & Rating
  customerRating?: number;
  customerFeedback?: string;
  feedbackTags?: string[];
  feedbackSubmittedAt?: string;
}

export interface Mechanic {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  specialty: string;
  activeJobsCount: number;
  avatarUrl?: string;
}

export interface AiDiagnosticResult {
  primaryIssue: string;
  severity: 'Immediate Danger' | 'Moderate Attention Required' | 'Routine Maintenance';
  confidenceScore: number;
  possibleCauses: string[];
  recommendedAction: string;
  diyCheckSteps: string[];
  estimatedCostRange: {
    min: number;
    max: number;
    currency: string;
  };
  recommendedPackageId?: string;
  technicalExplanation: string;
}

export interface AiInspectionResult {
  partIdentified: string;
  wearLevelPercentage: number;
  conditionStatus: 'Good' | 'Fair - Plan Replacement' | 'Critical - Replace Now';
  observations: string[];
  safetyRisk: string;
  actionRequired: string;
}

export interface AiMaintenanceScheduleItem {
  mileageKm: number;
  intervalMonths: number;
  tasks: string[];
  criticalPartsToCheck: string[];
  urgency: 'Standard' | 'Critical';
}

export interface AdminStats {
  totalBookings: number;
  pendingBookings: number;
  inProgressBookings: number;
  completedBookings: number;
  totalRevenue: number;
  averageRating: number;
  popularServices: { name: string; count: number }[];
  activeMechanics: number;
}
