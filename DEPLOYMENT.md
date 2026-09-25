# BikeCare AI — Python Deployment Guide (No Docker Required)

This guide shows how to run and deploy **BikeCare AI** directly using **Python** (no Docker containers needed).

---

## 1. Quick Local Setup with Python

### Prerequisites
- Python 3.9+ (Python 3.10 or 3.11 recommended)
- Node.js 18+ (only needed once to compile the frontend assets with `npm run build`)

### Steps

```bash
# 1. Clone the repository and enter the directory
git clone <your-repo-url>
cd bikecare-ai

# 2. Build the frontend client bundle into ./dist
npm install
npm run build

# 3. Create a Python virtual environment
python3 -m venv venv

# 4. Activate the virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# 5. Install Python dependencies
pip install -r requirements.txt

# 6. Configure environment variables (optional for AI diagnostics)
export GEMINI_API_KEY="your_gemini_api_key_here"
export PORT=3000

# 7. Start the Python server
python app.py
```

The application will be live at **http://localhost:3000**.
- **Customer Storefront**: `http://localhost:3000/`
- **Workshop Admin Ops Console**: `http://localhost:3000/admin` (Default passcode: `admin123`)

---

## 2. Production Deployment on Linux VPS (Ubuntu / Debian)

You can run BikeCare AI natively on any virtual private server (EC2, DigitalOcean, Linode, Hetzner) using **Gunicorn** and **Systemd** without Docker.

### Step 1: Install System Packages
```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-venv nodejs npm
```

### Step 2: Build & Install
```bash
cd /var/www/bikecare-ai
npm ci
npm run build
python3 -m venv venv
./venv/bin/pip install -r requirements.txt
```

### Step 3: Create a Systemd Service
Create `/etc/systemd/system/bikecare.service`:

```ini
[Unit]
Description=BikeCare AI Python Application
After=network.target

[Service]
User=www-data
WorkingDirectory=/var/www/bikecare-ai
Environment="PATH=/var/www/bikecare-ai/venv/bin"
Environment="PORT=3000"
Environment="GEMINI_API_KEY=your_key_here"
ExecStart=/var/www/bikecare-ai/venv/bin/gunicorn -w 4 -b 0.0.0.0:3000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable bikecare
sudo systemctl start bikecare
```

### Step 4: Setup Nginx Reverse Proxy (Optional)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 3. Deploy to Cloud Platforms (No Docker)

### Render (Native Python Web Service)
1. Push your code to GitHub.
2. In [Render Dashboard](https://dashboard.render.com), click **New +** → **Web Service**.
3. Connect your repository.
4. Set settings:
   - **Runtime**: `Python 3`
   - **Build Command**: `npm install --legacy-peer-deps && npm run build && pip install -r requirements.txt`
   - **Start Command**: `gunicorn -b 0.0.0.0:$PORT app:app`
5. Add Environment Variables:
   - `GEMINI_API_KEY`: your Gemini API key.
   - `PYTHON_VERSION`: `3.10.12`

### Railway (Native Python)
1. Push code to GitHub.
2. In Railway, click **New Project** → **Deploy from GitHub repo**.
3. Under **Settings**:
   - Set Build Command: `npm install --legacy-peer-deps && npm run build && pip install -r requirements.txt`
   - Set Start Command: `gunicorn -b 0.0.0.0:$PORT app:app`
4. Add environment variables:
   - `GEMINI_API_KEY`: your key

### Google Cloud Run (Using Google Buildpacks — No Docker Required)
You can deploy directly to Cloud Run without writing or using a Dockerfile:
```bash
# Cloud Run automatically detects the Python runtime and requirements.txt
gcloud run deploy bikecare-ai \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars "GEMINI_API_KEY=your_key_here"
```

---

## 4. Persistent Storage
All bookings, services, and live mechanic dispatch records are stored in:
```
./data/bikecare-db.json
```
When deploying to a VPS or persistent disk, ensure this `./data/` folder has read/write permissions for the application user.
