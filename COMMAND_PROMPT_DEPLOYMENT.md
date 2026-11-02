# BikeCare AI — Command Prompt (CMD) Deployment Guide

This guide provides the exact commands to run and deploy **BikeCare AI** using **Windows Command Prompt (`cmd.exe`)**, **PowerShell**, or any terminal.

---

## 🖥️ Part 1: Run & Deploy Locally in Windows Command Prompt

### Prerequisites
1. **Node.js** (v18 or higher): Download from [nodejs.org](https://nodejs.org/) if you haven't already.
2. Verify installation in Command Prompt:
   ```cmd
   node -v
   npm -v
   ```

---

### Step-by-Step CMD Commands

#### 1. Open Command Prompt
- Press `Windows Key + R`
- Type `cmd` and press `Enter`

#### 2. Navigate to the BikeCare AI Project Folder
```cmd
cd /d C:\Users\YourUsername\Downloads\bikecare-ai
```
*(Replace with your actual folder path where you extracted the project files)*

#### 3. Install Required Dependencies
```cmd
npm install
```

#### 4. (Optional) Set your Google Gemini API Key
If you have a Gemini API key for live AI acoustic diagnostics, set it in CMD:
```cmd
set GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(If omitted, the built-in deterministic heuristic fallback diagnostic automatically runs).*

#### 5. Build Production Client Assets
```cmd
npm run build
```

#### 6. Start the Server
For continuous production mode:
```cmd
npm start
```
*Or for hot-reloading development mode:*
```cmd
npm run dev
```

#### 7. Open the App in Your Web Browser
- **Customer Storefront**: [http://localhost:3000](http://localhost:3000)
- **Workshop Admin Portal**: [http://localhost:3000/admin](http://localhost:3000/admin) *(Passcode: `admin123`)*

---

## 🔄 Part 2: Keep the App Running 24/7 in Background (PM2)

If you want the app to keep running continuously in the background even when you close the Command Prompt:

```cmd
:: 1. Install PM2 globally
npm install -g pm2

:: 2. Start BikeCare AI as a background service
pm2 start "npm start" --name "bikecare-ai"

:: 3. Check running status
pm2 status

:: 4. View real-time logs
pm2 logs bikecare-ai

:: 5. Stop or restart if needed
pm2 restart bikecare-ai
pm2 stop bikecare-ai
```

---

## ☁️ Part 3: Deploy to Cloud Hosting from Command Prompt

### Option A: Deploy to Vercel (1-Command Cloud Deployment)
```cmd
:: 1. Install Vercel CLI
npm install -g vercel

:: 2. Log in and deploy directly from Command Prompt
vercel
```
Follow the on-screen prompts (accept default settings). Once completed, Vercel gives you a public `https://...` URL.

---

### Option B: Deploy to Railway (Full-Stack Cloud)
```cmd
:: 1. Install Railway CLI
npm install -g @railway/cli

:: 2. Login to Railway
railway login

:: 3. Initialize and deploy
railway init
railway up
```

---

### Option C: Deploy with Docker Container
```cmd
:: 1. Build Docker image
docker build -t bikecare-ai .

:: 2. Run container on port 3000
docker run -d -p 3000:3000 --name bikecare-app bikecare-ai
```

---

## 🛠️ Summary of Common Commands

| Task | Command |
| :--- | :--- |
| Install dependencies | `npm install` |
| Compile frontend | `npm run build` |
| Start full-stack server | `npm start` |
| Start in dev mode | `npm run dev` |
| Generate 50-page PDF report | `npm run pdf` |
| Generate Word documentation | `npm run docx` |
| Check TypeScript types | `npm run lint` |
