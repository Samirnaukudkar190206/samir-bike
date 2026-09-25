# BikeCare AI — Deployment Guide

BikeCare AI is a full-stack Node.js + Express + React (Vite) application with Gemini AI integration and local JSON persistence in `./data/`.

---

## 1. Quick Preview & Sharing (Built-in)
In Google AI Studio Build, the app is already continuously built and hosted:
- **Share Link**: Click the **Share** button at the top right of your AI Studio interface to get a public, live preview URL for anyone to view and test.
- **Environment Secrets**: In AI Studio, ensure `GEMINI_API_KEY` is added in the Secrets panel so that AI photo inspection and diagnostics work.

---

## 2. Deploy to Google Cloud Run (Recommended for Production)

Because BikeCare AI is already container-ready with a `Dockerfile`, deploying to Google Cloud Run takes 2 minutes:

```bash
# 1. Authenticate with Google Cloud
gcloud auth login
gcloud config set project YOUR_GCP_PROJECT_ID

# 2. Deploy directly from source (Cloud Build builds the Dockerfile)
gcloud run deploy bikecare-ai \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 3000 \
  --set-env-vars "NODE_ENV=production,GEMINI_API_KEY=your_gemini_api_key_here"
```

---

## 3. Deploy with Docker (Any VPS / Server / EC2 / DigitalOcean)

```bash
# 1. Build the production image
docker build -t bikecare-ai:latest .

# 2. Run the container
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e GEMINI_API_KEY="your_gemini_api_key_here" \
  -v $(pwd)/data:/app/data \
  --name bikecare \
  bikecare-ai:latest
```

*Note: Mounting `-v $(pwd)/data:/app/data` ensures your local bookings, services, and technician job sheets persist across container restarts.*

---

## 4. Deploy to Render / Railway / Fly.io

### Render
1. Push your code to a GitHub / GitLab repository.
2. Create a **New Web Service** and connect your repo.
3. Configure settings:
   - **Environment**: `Node` or `Docker`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. In **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `GEMINI_API_KEY`: `<your-key-from-aistudio>`
   - `PORT`: `3000` (or leave default `$PORT`)

### Railway
1. Click **New Project** -> **Deploy from GitHub repo**.
2. Railway will automatically detect the `Dockerfile` or `package.json`.
3. Add the `GEMINI_API_KEY` in the Variables tab.

---

## 5. Self-Hosted VPS (Ubuntu/Debian with systemd or PM2)

```bash
# 1. Clone repository & install dependencies
git clone <your-repo-url>
cd <repo-folder>
npm install

# 2. Build the frontend client bundle
npm run build

# 3. Create .env file with your key
echo "GEMINI_API_KEY=your_key_here" >> .env
echo "NODE_ENV=production" >> .env
echo "PORT=3000" >> .env

# 4. Start with PM2 for auto-restart & process management
npm install -g pm2
pm2 start "npm start" --name "bikecare-ai"
pm2 save
pm2 startup
```

---

## 6. Required Environment Variables

| Variable | Description | Required? |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key for bike sound/text diagnostics and image inspections | **Yes** (for AI features) |
| `NODE_ENV` | Set to `production` when deployed | Recommended (`production`) |
| `PORT` | Listening port (defaults to `3000` or assigned by host) | Optional (defaults to `3000`) |
