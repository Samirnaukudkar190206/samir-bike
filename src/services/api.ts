import { 
  Booking, 
  ServicePackage, 
  ServiceAddOn, 
  AdminStats, 
  Mechanic, 
  AiDiagnosticResult, 
  AiInspectionResult, 
  AiMaintenanceScheduleItem 
} from '../types/index.ts';

export const api = {
  // Services
  async getServices(): Promise<{ services: ServicePackage[]; addOns: ServiceAddOn[] }> {
    const res = await fetch('/api/services');
    if (!res.ok) throw new Error('Failed to fetch services');
    return res.json();
  },

  async updateService(service: ServicePackage): Promise<{ success: boolean; service: ServicePackage }> {
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    if (!res.ok) throw new Error('Failed to update service');
    return res.json();
  },

  // Bookings
  async getBookings(search?: string, status?: string): Promise<{ bookings: Booking[] }> {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status && status !== 'all') params.append('status', status);
    const res = await fetch(`/api/bookings?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  },

  async getBooking(idOrCode: string): Promise<{ booking: Booking }> {
    const res = await fetch(`/api/bookings/${encodeURIComponent(idOrCode)}`);
    if (!res.ok) throw new Error('Booking not found');
    return res.json();
  },

  async createBooking(bookingData: any): Promise<{ success: boolean; booking: Booking; message: string }> {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit booking');
    return data;
  },

  async updateBooking(idOrCode: string, updates: Partial<Booking>): Promise<{ success: boolean; booking: Booking }> {
    const res = await fetch(`/api/bookings/${encodeURIComponent(idOrCode)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update booking');
    return data;
  },

  async submitFeedback(
    idOrCode: string, 
    payload: { rating: number; feedback: string; tags?: string[] }
  ): Promise<{ success: boolean; booking: Booking; message: string }> {
    const res = await fetch(`/api/bookings/${encodeURIComponent(idOrCode)}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit feedback');
    return data;
  },

  async deleteBooking(idOrCode: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`/api/bookings/${encodeURIComponent(idOrCode)}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete booking');
    return data;
  },

  // Admin
  async adminLogin(pin: string): Promise<{ success: boolean; token: string; user: any }> {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Invalid passcode');
    return data;
  },

  async getAdminStats(): Promise<{ stats: AdminStats; mechanics: Mechanic[]; aiQueries: any[] }> {
    const res = await fetch('/api/admin/stats');
    if (!res.ok) throw new Error('Failed to fetch admin stats');
    return res.json();
  },

  // AI Diagnostic Services
  async diagnoseBike(payload: {
    bikeType: string;
    bikeBrand: string;
    bikeModel: string;
    bikeYear?: number;
    mileageKm?: number;
    symptoms: string[];
    soundDescription?: string;
    customNotes?: string;
  }): Promise<{ success: boolean; result: AiDiagnosticResult }> {
    const res = await fetch('/api/ai/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Diagnostic failed');
    return data;
  },

  async inspectImage(payload: {
    imageBase64: string;
    mimeType: string;
    partContext?: string;
  }): Promise<{ success: boolean; result: AiInspectionResult }> {
    const res = await fetch('/api/ai/inspect-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Visual inspection failed');
    return data;
  },

  async generateMaintenancePlan(payload: {
    bikeBrand: string;
    bikeModel: string;
    bikeYear: number;
    currentKm: number;
    rideStyle: string;
  }): Promise<{ success: boolean; plan: AiMaintenanceScheduleItem[] }> {
    const res = await fetch('/api/ai/maintenance-plan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Plan generation failed');
    return data;
  },
};
