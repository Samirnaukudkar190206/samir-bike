const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.resolve(__dirname, '../assets/figures');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function saveSvg(filename, svgString, width = 800) {
  const filePath = path.join(outDir, filename);
  await sharp(Buffer.from(svgString))
    .resize(width)
    .png()
    .toFile(filePath);
  console.log('Saved figure:', filename);
}

// 1. DFD Level 0 & Level 1 Diagram
const dfdSvg = `<svg width="850" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Arial, sans-serif;">
  <text x="425" y="30" font-size="16" font-weight="bold" fill="#000000" text-anchor="middle">Data Flow Diagram (DFD Level 0 - Context Level)</text>
  
  <!-- External Entity: Bike Rider / Customer -->
  <rect x="50" y="90" width="180" height="80" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
  <text x="140" y="125" font-size="12" font-weight="bold" fill="#000000" text-anchor="middle">CUSTOMER / RIDER</text>
  <text x="140" y="145" font-size="10" fill="#000000" text-anchor="middle">(External Entity)</text>

  <!-- Process 0.0: BikeCare AI Core Portal -->
  <circle cx="425" cy="130" r="70" fill="#ffffff" stroke="#000000" stroke-width="2"/>
  <text x="425" y="115" font-size="11" font-weight="bold" fill="#000000" text-anchor="middle">0.0</text>
  <text x="425" y="133" font-size="12" font-weight="bold" fill="#000000" text-anchor="middle">BikeCare AI</text>
  <text x="425" y="148" font-size="10" fill="#000000" text-anchor="middle">Diagnostic &amp; Ops Portal</text>

  <!-- External Entity: Workshop Admin & Mechanics -->
  <rect x="620" y="90" width="180" height="80" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
  <text x="710" y="125" font-size="12" font-weight="bold" fill="#000000" text-anchor="middle">WORKSHOP STAFF</text>
  <text x="710" y="145" font-size="10" fill="#000000" text-anchor="middle">(Admin &amp; Mechanics)</text>

  <!-- Flows between Customer and System -->
  <line x1="230" y1="110" x2="350" y2="110" stroke="#000000" stroke-width="1.5"/>
  <polygon points="350,110 342,106 342,114" fill="#000000"/>
  <text x="290" y="102" font-size="8.5" fill="#000000" text-anchor="middle">Symptom &amp; Booking Details</text>

  <line x1="350" y1="145" x2="230" y2="145" stroke="#000000" stroke-width="1.5"/>
  <polygon points="230,145 238,141 238,149" fill="#000000"/>
  <text x="290" y="160" font-size="8.5" fill="#000000" text-anchor="middle">AI Diagnosis, Booking Code, Invoice</text>

  <!-- Flows between System and Staff -->
  <line x1="495" y1="110" x2="620" y2="110" stroke="#000000" stroke-width="1.5"/>
  <polygon points="620,110 612,106 612,114" fill="#000000"/>
  <text x="560" y="102" font-size="8.5" fill="#000000" text-anchor="middle">Job Card Alerts, Bay Workload</text>

  <line x1="620" y1="145" x2="495" y2="145" stroke="#000000" stroke-width="1.5"/>
  <polygon points="495,145 503,141 503,149" fill="#000000"/>
  <text x="560" y="160" font-size="8.5" fill="#000000" text-anchor="middle">Mechanic Dispatch, Repair Status</text>

  <!-- D1: Data Store (Bottom) -->
  <line x1="425" y1="200" x2="425" y2="280" stroke="#000000" stroke-width="1.5"/>
  <polygon points="425,280 421,272 429,272" fill="#000000"/>
  <text x="435" y="245" font-size="8.5" fill="#000000">Write / Update State</text>

  <line x1="400" y1="280" x2="400" y2="200" stroke="#000000" stroke-width="1.5"/>
  <polygon points="400,200 396,208 404,208" fill="#000000"/>
  <text x="330" y="245" font-size="8.5" fill="#000000">Read Records</text>

  <rect x="275" y="285" width="300" height="50" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
  <line x1="330" y1="285" x2="330" y2="335" stroke="#000000" stroke-width="1.5"/>
  <text x="302" y="315" font-size="11" font-weight="bold" fill="#000000" text-anchor="middle">D1</text>
  <text x="430" y="315" font-size="11" font-weight="bold" fill="#000000" text-anchor="middle">Local JSON Database (bikecare-db.json)</text>

  <!-- External AI API Entity (Bottom Left) -->
  <rect x="50" y="280" width="180" height="60" fill="#ffffff" stroke="#000000" stroke-width="1.5"/>
  <text x="140" y="305" font-size="11" font-weight="bold" fill="#000000" text-anchor="middle">GOOGLE GEMINI AI API</text>
  <text x="140" y="323" font-size="9" fill="#000000" text-anchor="middle">(Cloud LLM Diagnostic Service)</text>

  <line x1="230" y1="305" x2="275" y2="305" stroke="#000000" stroke-width="1.5"/>
  <polygon points="275,305 267,301 267,309" fill="#000000"/>
  <line x1="230" y1="315" x2="360" y2="180" stroke="#000000" stroke-width="1.2" stroke-dasharray="3,3"/>

  <!-- Legend -->
  <rect x="50" y="380" width="750" height="75" fill="#ffffff" stroke="#000000" stroke-width="1"/>
  <text x="70" y="405" font-size="10" font-weight="bold" fill="#000000">DFD Gane &amp; Sarson Notation Summary:</text>
  <text x="70" y="425" font-size="9" fill="#000000">• Square Box: External Entities (Customer, Workshop Staff, Cloud AI API)</text>
  <text x="70" y="443" font-size="9" fill="#000000">• Circle: Central Transformation Process (0.0 BikeCare AI Portal)</text>
  <text x="440" y="425" font-size="9" fill="#000000">• Open-ended Rectangle: D1 Data Store (JSON persistence)</text>
  <text x="440" y="443" font-size="9" fill="#000000">• Directed Arrow: Dynamic data packet flows</text>
</svg>`;

// 2. Service Booking Configurator UI
const bookingSvg = `<svg width="850" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; font-family:'Segoe UI', Arial, sans-serif;">
  <!-- Mock Browser Bar -->
  <rect width="850" height="35" fill="#1e293b"/>
  <circle cx="20" cy="18" r="5" fill="#ef4444"/>
  <circle cx="36" cy="18" r="5" fill="#f59e0b"/>
  <circle cx="52" cy="18" r="5" fill="#10b981"/>
  <rect x="80" y="8" width="450" height="20" rx="4" fill="#0f172a"/>
  <text x="95" y="22" font-size="10.5" fill="#94a3b8">https://bikecare.local/#booking - Doorstep Pickup Booking</text>

  <!-- Header -->
  <text x="425" y="75" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">Book Doorstep Motorcycle Service</text>
  <text x="425" y="95" font-size="11" fill="#94a3b8" text-anchor="middle">Free doorstep pickup and contactless drop across Mumbai metropolitan region</text>

  <!-- Left Form Card -->
  <rect x="50" y="115" width="460" height="330" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
  <text x="75" y="145" font-size="13" font-weight="bold" fill="#38bdf8">1. Vehicle &amp; Rider Details</text>
  
  <rect x="75" y="160" width="195" height="36" rx="4" fill="#0f172a" stroke="#475569"/>
  <text x="85" y="182" font-size="10.5" fill="#e2e8f0">Yamaha MT-15 (155cc)</text>

  <rect x="290" y="160" width="195" height="36" rx="4" fill="#0f172a" stroke="#475569"/>
  <text x="300" y="182" font-size="10.5" fill="#e2e8f0">Year: 2023 | 14,200 km</text>

  <text x="75" y="220" font-size="13" font-weight="bold" fill="#38bdf8">2. Contact &amp; Pickup Address</text>
  <rect x="75" y="235" width="195" height="36" rx="4" fill="#0f172a" stroke="#475569"/>
  <text x="85" y="257" font-size="10.5" fill="#e2e8f0">Samir Uttam Naukudkar</text>

  <rect x="290" y="235" width="195" height="36" rx="4" fill="#0f172a" stroke="#475569"/>
  <text x="300" y="257" font-size="10.5" fill="#e2e8f0">+91 98765 43210</text>

  <rect x="75" y="285" width="410" height="42" rx="4" fill="#0f172a" stroke="#475569"/>
  <text x="85" y="310" font-size="10.5" fill="#e2e8f0">Flat 402, Goregaon West, Mumbai 400104</text>

  <rect x="75" y="345" width="410" height="36" rx="4" fill="#0f172a" stroke="#475569"/>
  <text x="85" y="367" font-size="10.5" fill="#94a3b8">Special Instructions: Check front brake lever sponginess</text>

  <rect x="75" y="395" width="410" height="38" rx="6" fill="#0284c7"/>
  <text x="280" y="419" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Confirm &amp; Generate Job Card (₹1,499) ➔</text>

  <!-- Right Package Summary Card -->
  <rect x="540" y="115" width="260" height="330" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
  <text x="670" y="145" font-size="13" font-weight="bold" fill="#10b981" text-anchor="middle">Selected Package</text>
  <rect x="560" y="160" width="220" height="60" rx="6" fill="#0f172a" stroke="#059669"/>
  <text x="670" y="183" font-size="12" font-weight="bold" fill="#34d399" text-anchor="middle">Master Overhaul Package</text>
  <text x="670" y="205" font-size="14" font-weight="bold" fill="#ffffff" text-anchor="middle">₹1,499</text>

  <text x="560" y="245" font-size="10.5" fill="#94a3b8">✓ Full Synthetic Engine Oil Replacement</text>
  <text x="560" y="268" font-size="10.5" fill="#94a3b8">✓ Brake Caliper Cleaning &amp; Pad Dressing</text>
  <text x="560" y="291" font-size="10.5" fill="#94a3b8">✓ Chain Tensioning &amp; High-Pressure Lube</text>
  <text x="560" y="314" font-size="10.5" fill="#94a3b8">✓ Free 24-Point Comprehensive Checkup</text>
  <text x="560" y="337" font-size="10.5" fill="#94a3b8">✓ Road Test &amp; Foam Wash Included</text>

  <rect x="560" y="360" width="220" height="65" rx="6" fill="#0f172a" stroke="#334155"/>
  <text x="570" y="380" font-size="10" font-weight="bold" fill="#f59e0b">Selected Add-on:</text>
  <text x="570" y="398" font-size="10" fill="#e2e8f0">+ Teflon Body Shield (+₹349)</text>
  <text x="570" y="415" font-size="10.5" font-weight="bold" fill="#38bdf8">Total Estimated: ₹1,848</text>
</svg>`;

// 3. Service Packages Catalog UI
const servicesSvg = `<svg width="850" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; font-family:'Segoe UI', Arial, sans-serif;">
  <rect width="850" height="35" fill="#1e293b"/>
  <circle cx="20" cy="18" r="5" fill="#ef4444"/><circle cx="36" cy="18" r="5" fill="#f59e0b"/><circle cx="52" cy="18" r="5" fill="#10b981"/>
  <text x="80" y="22" font-size="10.5" fill="#94a3b8">https://bikecare.local/#packages - Standardized Maintenance Catalog</text>

  <text x="425" y="75" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">Standardized Transparent Service Packages</text>
  <text x="425" y="95" font-size="11" fill="#94a3b8" text-anchor="middle">Fixed-price motorcycle care with zero hidden costs, premium Motul lubricants, and certified warranty</text>

  <!-- Package 1: Express Tune-Up -->
  <rect x="50" y="120" width="225" height="325" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
  <text x="162" y="150" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="middle">Express Tune-Up</text>
  <text x="162" y="172" font-size="11" fill="#94a3b8" text-anchor="middle">Ideal for 3,000 km routine care</text>
  <text x="162" y="205" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">₹499</text>
  <line x1="70" y1="220" x2="255" y2="220" stroke="#334155"/>
  <text x="70" y="245" font-size="10" fill="#cbd5e1">• Engine Oil Top-Up &amp; Filter Clean</text>
  <text x="70" y="270" font-size="10" fill="#cbd5e1">• Drive Chain Lubrication</text>
  <text x="70" y="295" font-size="10" fill="#cbd5e1">• Clutch &amp; Throttle Free-Play Setup</text>
  <text x="70" y="320" font-size="10" fill="#cbd5e1">• Brake Inspection &amp; Adjustment</text>
  <text x="70" y="345" font-size="10" fill="#cbd5e1">• Tire Pressure Check &amp; Foam Wash</text>
  <rect x="70" y="385" width="185" height="36" rx="4" fill="#0284c7"/>
  <text x="162" y="408" font-size="11.5" font-weight="bold" fill="#ffffff" text-anchor="middle">Select Express</text>

  <!-- Package 2: Master Overhaul (Featured) -->
  <rect x="305" y="110" width="240" height="345" rx="8" fill="#1e293b" stroke="#0284c7" stroke-width="2.5"/>
  <rect x="375" y="110" width="100" height="20" rx="0 0 4 4" fill="#0284c7"/>
  <text x="425" y="124" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">MOST POPULAR</text>
  <text x="425" y="155" font-size="15" font-weight="bold" fill="#38bdf8" text-anchor="middle">Master Overhaul</text>
  <text x="425" y="175" font-size="11" fill="#94a3b8" text-anchor="middle">Complete 10,000 km overhaul</text>
  <text x="425" y="210" font-size="24" font-weight="bold" fill="#ffffff" text-anchor="middle">₹1,499</text>
  <line x1="325" y1="225" x2="525" y2="225" stroke="#334155"/>
  <text x="325" y="250" font-size="10" fill="#cbd5e1">• 100% Synthetic Oil Replacement</text>
  <text x="325" y="275" font-size="10" fill="#cbd5e1">• Spark Plug &amp; Air Filter Replacement</text>
  <text x="325" y="300" font-size="10" fill="#cbd5e1">• Hydraulic Brake Bleed &amp; Fluid Flush</text>
  <text x="325" y="325" font-size="10" fill="#cbd5e1">• Carburetor / FI Throttle Body Clean</text>
  <text x="325" y="350" font-size="10" fill="#cbd5e1">• Electrical Health &amp; Battery Test</text>
  <text x="325" y="375" font-size="10" fill="#cbd5e1">• High-Gloss Teflon Polishing</text>
  <rect x="325" y="400" width="200" height="36" rx="4" fill="#0284c7"/>
  <text x="425" y="423" font-size="11.5" font-weight="bold" fill="#ffffff" text-anchor="middle">Book Master Overhaul</text>

  <!-- Package 3: EV Power Shield -->
  <rect x="575" y="120" width="225" height="325" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
  <text x="687" y="150" font-size="14" font-weight="bold" fill="#10b981" text-anchor="middle">EV Power Shield</text>
  <text x="687" y="172" font-size="11" fill="#94a3b8" text-anchor="middle">Ather, Ola &amp; TVS iQube care</text>
  <text x="687" y="205" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">₹899</text>
  <line x1="595" y1="220" x2="780" y2="220" stroke="#334155"/>
  <text x="595" y="245" font-size="10" fill="#cbd5e1">• High-Voltage Harness Audit</text>
  <text x="595" y="270" font-size="10" fill="#cbd5e1">• Hub Motor Bearing Lubrication</text>
  <text x="595" y="295" font-size="10" fill="#cbd5e1">• Regen Braking Caliper Service</text>
  <text x="595" y="320" font-size="10" fill="#cbd5e1">• BMS Cell Balancing Diagnostics</text>
  <text x="595" y="345" font-size="10" fill="#cbd5e1">• Firmware Version Inspection</text>
  <rect x="595" y="385" width="185" height="36" rx="4" fill="#059669"/>
  <text x="687" y="408" font-size="11.5" font-weight="bold" fill="#ffffff" text-anchor="middle">Select EV Shield</text>
</svg>`;

// 4. Customer Review & Star Rating Submission UI
const reviewSvg = `<svg width="850" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; font-family:'Segoe UI', Arial, sans-serif;">
  <rect width="850" height="35" fill="#1e293b"/>
  <circle cx="20" cy="18" r="5" fill="#ef4444"/><circle cx="36" cy="18" r="5" fill="#f59e0b"/><circle cx="52" cy="18" r="5" fill="#10b981"/>
  <text x="80" y="22" font-size="10.5" fill="#94a3b8">https://bikecare.local/#review - Verified Customer Feedback Pipeline</text>

  <text x="425" y="75" font-size="18" font-weight="bold" fill="#ffffff" text-anchor="middle">Customer Satisfaction &amp; Service Rating</text>
  <text x="425" y="95" font-size="11" fill="#94a3b8" text-anchor="middle">Transparent feedback looped directly to technician performance metrics</text>

  <!-- Review Modal / Card -->
  <rect x="180" y="115" width="490" height="340" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
  <text x="425" y="145" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="middle">How was your service experience for BK-8492?</text>
  <text x="425" y="165" font-size="11" fill="#94a3b8" text-anchor="middle">Yamaha MT-15 • Master Overhaul • Serviced by Priya Sharma</text>

  <!-- Star Rating -->
  <g transform="translate(315, 180)">
    <text x="0" y="30" font-size="32" fill="#eab308">★</text>
    <text x="45" y="30" font-size="32" fill="#eab308">★</text>
    <text x="90" y="30" font-size="32" fill="#eab308">★</text>
    <text x="135" y="30" font-size="32" fill="#eab308">★</text>
    <text x="180" y="30" font-size="32" fill="#eab308">★</text>
  </g>
  <text x="425" y="235" font-size="11" font-weight="bold" fill="#eab308" text-anchor="middle">5.0 / 5.0 - Excellent Experience</text>

  <!-- Tags -->
  <text x="210" y="265" font-size="11" font-weight="bold" fill="#cbd5e1">What did you love most?</text>
  <rect x="210" y="275" width="95" height="26" rx="13" fill="#0284c7"/>
  <text x="257" y="292" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">⚡ Quick Turnaround</text>

  <rect x="315" y="275" width="115" height="26" rx="13" fill="#0284c7"/>
  <text x="372" y="292" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">🔍 Transparent Pricing</text>

  <rect x="440" y="275" width="105" height="26" rx="13" fill="#0284c7"/>
  <text x="492" y="292" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">🛠️ Expert Mechanic</text>

  <rect x="555" y="275" width="95" height="26" rx="13" fill="#0284c7"/>
  <text x="602" y="292" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">✨ Clean Drop-off</text>

  <!-- Feedback Text Box -->
  <rect x="210" y="315" width="430" height="50" rx="4" fill="#0f172a" stroke="#475569"/>
  <text x="220" y="335" font-size="10" fill="#e2e8f0">"The AI sound diagnostic correctly spotted the cam chain rattle before I even opened the</text>
  <text x="220" y="352" font-size="10" fill="#e2e8f0">engine! Priya adjusted the tensioner and bike rides like new. Very impressed!"</text>

  <!-- Submit Button -->
  <rect x="210" y="380" width="430" height="38" rx="6" fill="#10b981"/>
  <text x="425" y="404" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle">Submit Review &amp; Post Public Feedback ✓</text>
</svg>`;

async function run() {
  await saveSvg('fig_4_4_dfd.png', dfdSvg, 850);
  await saveSvg('fig_5_1_3_booking.png', bookingSvg, 850);
  await saveSvg('fig_5_1_5_services.png', servicesSvg, 850);
  await saveSvg('fig_5_1_6_review.png', reviewSvg, 850);
  console.log('All extra figures saved successfully!');
}

run().catch(console.error);
