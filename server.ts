import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './server/db.ts';
import { runBikeDiagnosis, runImageInspection, runMaintenanceSchedule } from './server/ai.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();

  // JSON body parser with increased limit for base64 photo inspection
  app.use(express.json({ limit: '15mb' }));
  app.use(express.urlencoded({ extended: true, limit: '15mb' }));

  // --- API Endpoints ---
  
  // Health & System Info
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      appName: 'BikeCare AI',
      timestamp: new Date().toISOString(),
      aiConfigured: Boolean(process.env.GEMINI_API_KEY),
      databaseReady: true
    });
  });

  // Services Catalog & Add-ons
  app.get('/api/services', (req, res) => {
    try {
      res.json({
        services: db.getServices(),
        addOns: db.getAddOns()
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to fetch services' });
    }
  });

  app.post('/api/services', (req, res) => {
    try {
      const service = req.body;
      if (!service.id || !service.name || !service.price) {
        return res.status(400).json({ error: 'Missing required service fields' });
      }
      const saved = db.saveService(service);
      res.json({ success: true, service: saved });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to update service' });
    }
  });

  // Bookings - List (Supports Search & Filter)
  app.get('/api/bookings', (req, res) => {
    try {
      const search = req.query.search as string | undefined;
      const status = req.query.status as string | undefined;
      const bookings = db.getBookings(search, status);
      res.json({ bookings });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to fetch bookings' });
    }
  });

  // Bookings - Single by ID or Tracking Code
  app.get('/api/bookings/:id', (req, res) => {
    try {
      const booking = db.getBookingByIdOrCode(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json({ booking });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to fetch booking' });
    }
  });

  // Bookings - Create
  app.post('/api/bookings', (req, res) => {
    try {
      const data = req.body;
      if (!data.customerName || !data.customerPhone || !data.bikeBrand || !data.bikeModel || !data.packageId) {
        return res.status(400).json({ error: 'Please provide all required vehicle and contact details.' });
      }

      const newBooking = db.createBooking(data);
      res.status(201).json({
        success: true,
        booking: newBooking,
        message: `Booking ${newBooking.bookingCode} registered successfully!`
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to create booking' });
    }
  });

  // Bookings - Update (Admin status updates, notes, mechanic assignment, invoice)
  app.patch('/api/bookings/:id', (req, res) => {
    try {
      const updated = db.updateBooking(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json({ success: true, booking: updated });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to update booking' });
    }
  });

  // Bookings - Customer Feedback & Review
  app.post('/api/bookings/:id/feedback', (req, res) => {
    try {
      const { rating, feedback, tags } = req.body;
      const numRating = Number(rating);
      if (!numRating || numRating < 1 || numRating > 5) {
        return res.status(400).json({ error: 'A rating between 1 and 5 stars is required.' });
      }

      const booking = db.getBookingByIdOrCode(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      const updated = db.updateBooking(booking.id, {
        customerRating: numRating,
        customerFeedback: typeof feedback === 'string' ? feedback.trim() : '',
        feedbackTags: Array.isArray(tags) ? tags : [],
        feedbackSubmittedAt: new Date().toISOString()
      });

      res.json({
        success: true,
        booking: updated,
        message: 'Thank you for your feedback! Your review has been recorded.'
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to submit feedback' });
    }
  });

  // Bookings - Delete
  app.delete('/api/bookings/:id', (req, res) => {
    try {
      const ok = db.deleteBooking(req.params.id);
      if (!ok) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json({ success: true, message: 'Booking removed successfully.' });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to delete booking' });
    }
  });

  // Admin Authentication
  app.post('/api/admin/login', (req, res) => {
    const { pin } = req.body;
    // Standard default passcode for workshop administrator
    if (pin === 'admin123' || pin === 'bikecare2026' || pin === 'admin') {
      return res.json({
        success: true,
        token: `admin-token-${Date.now()}`,
        user: { name: 'Master Workshop Admin', role: 'admin' }
      });
    }
    return res.status(401).json({ error: 'Invalid admin passcode. Default demo passcode is: admin123' });
  });

  // Admin Dashboard Stats & Mechanics
  app.get('/api/admin/stats', (req, res) => {
    try {
      const stats = db.getStats();
      const mechanics = db.getMechanics();
      const aiQueries = db.getAiQueries();
      res.json({ stats, mechanics, aiQueries });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to load stats' });
    }
  });

  // AI Diagnostic - Symptom & Sound Analysis
  app.post('/api/ai/diagnose', async (req, res) => {
    try {
      const { bikeType, bikeBrand, bikeModel, bikeYear, mileageKm, symptoms, soundDescription, customNotes } = req.body;

      if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
        return res.status(400).json({ error: 'Please select at least one symptom or describe the issue.' });
      }

      const result = await runBikeDiagnosis({
        bikeType: bikeType || 'commuter_motorcycle',
        bikeBrand: bikeBrand || 'Motorcycle',
        bikeModel: bikeModel || 'Bike',
        bikeYear: Number(bikeYear) || undefined,
        mileageKm: Number(mileageKm) || undefined,
        symptoms,
        soundDescription,
        customNotes
      });

      // Log into admin queries pool for analytics
      db.logAiQuery(`${bikeBrand || ''} ${bikeModel || ''}`.trim(), symptoms, result.primaryIssue);

      res.json({ success: true, result });
    } catch (err: any) {
      console.error('Diagnosis route error:', err);
      res.status(500).json({ error: err.message || 'Diagnostic failed' });
    }
  });

  // AI Visual Inspection - Multimodal Image Analysis
  app.post('/api/ai/inspect-image', async (req, res) => {
    try {
      const { imageBase64, mimeType, partContext } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ error: 'Image base64 data is required.' });
      }

      const result = await runImageInspection({
        imageBase64,
        mimeType: mimeType || 'image/jpeg',
        partContext
      });

      res.json({ success: true, result });
    } catch (err: any) {
      console.error('Image inspection route error:', err);
      res.status(500).json({ error: err.message || 'Image inspection failed' });
    }
  });

  // AI Custom Maintenance Schedule Generator
  app.post('/api/ai/maintenance-plan', async (req, res) => {
    try {
      const { bikeBrand, bikeModel, bikeYear, currentKm, rideStyle } = req.body;
      const plan = await runMaintenanceSchedule({
        bikeBrand: bikeBrand || 'Honda',
        bikeModel: bikeModel || 'Motorcycle',
        bikeYear: Number(bikeYear) || 2023,
        currentKm: Number(currentKm) || 6000,
        rideStyle: rideStyle || 'Daily Commuter'
      });

      res.json({ success: true, plan });
    } catch (err: any) {
      console.error('Maintenance plan route error:', err);
      res.status(500).json({ error: err.message || 'Failed to generate maintenance schedule' });
    }
  });

  // --- Frontend Integration (Vite Middleware in dev / Static files in prod) ---
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 BikeCare AI server running at http://0.0.0.0:${PORT} [${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}]`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
