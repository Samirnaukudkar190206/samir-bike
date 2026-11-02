# BikeCare AI — Smart Two-Wheeler Diagnostics & Workshop Management

An end-to-end intelligent diagnostic, service booking, and workshop management platform for motorcycles, scooters, electric vehicles, and bicycles powered by Google Gemini AI.

---

## 🚀 Key Features

- **AI Acoustic & Symptom Diagnostic**: Multimodal audio and symptom analysis diagnosing engine rattles, gearbox hesitation, brake shudder, and carburetor issues with actionable fix recommendations.
- **Visual Wear Inspector**: Upload component photos (sprockets, brake discs, tire tread, fork seals) for real-time computer vision wear estimation and risk scoring.
- **Predictive Maintenance Plan Generator**: Customized maintenance schedules by brand, model, mileage, and riding profile.
- **Doorstep Booking Engine**: Choose service packages, doorstep pickup & drop, and real-time hydraulic vehicle pickup scheduling.
- **Live Digital Job Card Tracker**: Track inspection, parts replacement, test rides, and digital invoicing via tracking code (`BK-8492`).
- **Segregated Workshop Admin Console**: Dedicated operational dashboard (`/admin`) for mechanics, bay allocation, status updates, and parts inventory control.
- **Complete Academic Project Documentation**:
  - Full 50-Page Academic Project Report (`BikeCare_AI_Project_Documentation.pdf` & `.docx`)
  - UML diagrams (ER, Use Case, Class, Sequence, Activity, Deployment)
  - Work Breakdown Structure (WBS), Gantt chart, and Test matrices (Selenium, Black-box)

---

## 📦 How to Upload to GitHub

To upload this repository to your GitHub account:

```bash
# 1. Create a new empty repository on GitHub (e.g., https://github.com/<your-username>/bikecare-ai.git)

# 2. Add your GitHub remote repository URL
git remote add origin https://github.com/<your-username>/bikecare-ai.git

# 3. Ensure branch is main
git branch -M main

# 4. Push your code to GitHub
git push -u origin main
```

---

## 💻 Running the Application Locally

### Option A: Full-Stack Node.js / TypeScript (Default)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional Gemini API Key for live AI)
cp .env.example .env

# 3. Start development server
npm run dev
```

App runs on: `http://localhost:3000`
- **Customer Storefront**: `http://localhost:3000/`
- **Workshop Admin Operations**: `http://localhost:3000/admin` (Passcode: `admin123`)

---

### Option B: Python (No Docker Required)

See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for full instructions:

```bash
# 1. Build frontend bundle
npm run build

# 2. Run Python server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

---

## 📄 Documentation Generation

To regenerate the documentation reports:

```bash
# Generate 50-Page Academic PDF
npm run pdf

# Generate Academic Word Document (.docx)
npm run docx
```

Both documents are located in:
- `public/BikeCare_AI_Project_Documentation.pdf`
- `public/BikeCare_AI_Project_Documentation.docx`
- Root directory files: `BikeCare_AI_Project_Documentation.pdf` and `.docx`
