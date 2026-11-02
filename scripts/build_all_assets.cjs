const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.resolve(__dirname, '../assets/figures');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function renderPng(name, svg, width = 750) {
  const target = path.join(outDir, name);
  await sharp(Buffer.from(svg.trim())).resize(width).png().toFile(target);
  console.log('✓ Rendered:', name);
}

// 1. Fig 2.1 WBS
const svg21 = `<svg width="850" height="420" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Segoe UI', Arial, sans-serif;">
  <rect x="275" y="15" width="300" height="45" rx="6" fill="#2563EB" stroke="#1D4ED8" stroke-width="2"/>
  <text x="425" y="42" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">BikeCare AI Portal Project</text>
  <line x1="425" y1="60" x2="425" y2="90" stroke="#64748B" stroke-width="2"/>
  <line x1="80" y1="90" x2="770" y2="90" stroke="#64748B" stroke-width="2"/>

  <!-- Col 1 -->
  <line x1="80" y1="90" x2="80" y2="120" stroke="#64748B" stroke-width="2"/>
  <rect x="20" y="120" width="120" height="38" rx="4" fill="#10B981"/><text x="80" y="144" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">1. Planning</text>
  <rect x="20" y="170" width="120" height="26" fill="#ECFDF5" stroke="#A7F3D0"/><text x="80" y="187" font-size="9" fill="#065F46" text-anchor="middle">Problem Definition</text>
  <rect x="20" y="205" width="120" height="26" fill="#ECFDF5" stroke="#A7F3D0"/><text x="80" y="222" font-size="9" fill="#065F46" text-anchor="middle">Feasibility Study</text>
  <rect x="20" y="240" width="120" height="26" fill="#ECFDF5" stroke="#A7F3D0"/><text x="80" y="257" font-size="9" fill="#065F46" text-anchor="middle">SDLC Selection</text>

  <!-- Col 2 -->
  <line x1="215" y1="90" x2="215" y2="120" stroke="#64748B" stroke-width="2"/>
  <rect x="155" y="120" width="120" height="38" rx="4" fill="#F59E0B"/><text x="215" y="144" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">2. System Design</text>
  <rect x="155" y="170" width="120" height="26" fill="#FFFBEB" stroke="#FDE68A"/><text x="215" y="187" font-size="9" fill="#92400E" text-anchor="middle">Architecture</text>
  <rect x="155" y="205" width="120" height="26" fill="#FFFBEB" stroke="#FDE68A"/><text x="215" y="222" font-size="9" fill="#92400E" text-anchor="middle">StarUML Models</text>
  <rect x="155" y="240" width="120" height="26" fill="#FFFBEB" stroke="#FDE68A"/><text x="215" y="257" font-size="9" fill="#92400E" text-anchor="middle">Data Schema</text>

  <!-- Col 3 -->
  <line x1="355" y1="90" x2="355" y2="120" stroke="#64748B" stroke-width="2"/>
  <rect x="295" y="120" width="120" height="38" rx="4" fill="#6366F1"/><text x="355" y="144" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">3. Development</text>
  <rect x="295" y="170" width="120" height="26" fill="#EEF2FF" stroke="#C7D2FE"/><text x="355" y="187" font-size="9" fill="#3730A3" text-anchor="middle">Frontend (React)</text>
  <rect x="295" y="205" width="120" height="26" fill="#EEF2FF" stroke="#C7D2FE"/><text x="355" y="222" font-size="9" fill="#3730A3" text-anchor="middle">Express / Flask</text>
  <rect x="295" y="240" width="120" height="26" fill="#EEF2FF" stroke="#C7D2FE"/><text x="355" y="257" font-size="9" fill="#3730A3" text-anchor="middle">Gemini AI Model</text>

  <!-- Col 4 -->
  <line x1="495" y1="90" x2="495" y2="120" stroke="#64748B" stroke-width="2"/>
  <rect x="435" y="120" width="120" height="38" rx="4" fill="#EC4899"/><text x="495" y="144" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">4. Testing &amp; QA</text>
  <rect x="435" y="170" width="120" height="26" fill="#FDF2F8" stroke="#FBCFE8"/><text x="495" y="187" font-size="9" fill="#831843" text-anchor="middle">Unit Testing</text>
  <rect x="435" y="205" width="120" height="26" fill="#FDF2F8" stroke="#FBCFE8"/><text x="495" y="222" font-size="9" fill="#831843" text-anchor="middle">Black-Box Tests</text>
  <rect x="435" y="240" width="120" height="26" fill="#FDF2F8" stroke="#FBCFE8"/><text x="495" y="257" font-size="9" fill="#831843" text-anchor="middle">Selenium IDE</text>

  <!-- Col 5 -->
  <line x1="635" y1="90" x2="635" y2="120" stroke="#64748B" stroke-width="2"/>
  <rect x="575" y="120" width="120" height="38" rx="4" fill="#8B5CF6"/><text x="635" y="144" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">5. Admin Portal</text>
  <rect x="575" y="170" width="120" height="26" fill="#F5F3FF" stroke="#DDD6FE"/><text x="635" y="187" font-size="9" fill="#5B21B6" text-anchor="middle">/admin Route</text>
  <rect x="575" y="205" width="120" height="26" fill="#F5F3FF" stroke="#DDD6FE"/><text x="635" y="222" font-size="9" fill="#5B21B6" text-anchor="middle">Mechanic Bays</text>
  <rect x="575" y="240" width="120" height="26" fill="#F5F3FF" stroke="#DDD6FE"/><text x="635" y="257" font-size="9" fill="#5B21B6" text-anchor="middle">Revenue Audit</text>

  <!-- Col 6 -->
  <line x1="770" y1="90" x2="770" y2="120" stroke="#64748B" stroke-width="2"/>
  <rect x="710" y="120" width="120" height="38" rx="4" fill="#EF4444"/><text x="770" y="144" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">6. Deployment</text>
  <rect x="710" y="170" width="120" height="26" fill="#FEF2F2" stroke="#FECACA"/><text x="770" y="187" font-size="9" fill="#991B1B" text-anchor="middle">Cloud Hosting</text>
  <rect x="710" y="205" width="120" height="26" fill="#FEF2F2" stroke="#FECACA"/><text x="770" y="222" font-size="9" fill="#991B1B" text-anchor="middle">Git Repo</text>
  <rect x="710" y="240" width="120" height="26" fill="#FEF2F2" stroke="#FECACA"/><text x="770" y="257" font-size="9" fill="#991B1B" text-anchor="middle">Project Report</text>
</svg>`;

// 2. Fig 2.2 Gantt Chart
const svg22 = `<svg width="850" height="340" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Segoe UI', Arial, sans-serif;">
  <text x="425" y="28" font-size="15" font-weight="bold" text-anchor="middle" fill="#0F172A">BikeCare AI – Project Timeline (Gantt Chart: 1 July – 30 September)</text>
  <rect x="40" y="45" width="770" height="28" fill="#F1F5F9" rx="3"/>
  <text x="140" y="63" font-size="11" font-weight="bold" fill="#334155">Task / Activity</text>
  <text x="350" y="63" font-size="10.5" font-weight="bold" fill="#334155">Jul 1-14</text>
  <text x="425" y="63" font-size="10.5" font-weight="bold" fill="#334155">Jul 15-28</text>
  <text x="500" y="63" font-size="10.5" font-weight="bold" fill="#334155">Jul 29-Aug 11</text>
  <text x="580" y="63" font-size="10.5" font-weight="bold" fill="#334155">Aug 12-25</text>
  <text x="655" y="63" font-size="10.5" font-weight="bold" fill="#334155">Aug 26-Sep 8</text>
  <text x="735" y="63" font-size="10.5" font-weight="bold" fill="#334155">Sep 9-30</text>

  <!-- Grid lines -->
  <line x1="330" y1="45" x2="330" y2="320" stroke="#E2E8F0"/>
  <line x1="410" y1="45" x2="410" y2="320" stroke="#E2E8F0"/>
  <line x1="485" y1="45" x2="485" y2="320" stroke="#E2E8F0"/>
  <line x1="565" y1="45" x2="565" y2="320" stroke="#E2E8F0"/>
  <line x1="640" y1="45" x2="640" y2="320" stroke="#E2E8F0"/>
  <line x1="720" y1="45" x2="720" y2="320" stroke="#E2E8F0"/>

  <text x="50" y="100" font-size="10.5" fill="#1E293B">1. Requirement &amp; Planning</text>
  <rect x="340" y="86" width="65" height="20" rx="3" fill="#2563EB"/>

  <text x="50" y="135" font-size="10.5" fill="#1E293B">2. System Design &amp; UML</text>
  <rect x="415" y="121" width="65" height="20" rx="3" fill="#10B981"/>

  <text x="50" y="170" font-size="10.5" fill="#1E293B">3. Backend &amp; DB Development</text>
  <rect x="490" y="156" width="70" height="20" rx="3" fill="#F59E0B"/>

  <text x="50" y="205" font-size="10.5" fill="#1E293B">4. AI Diagnostic Module</text>
  <rect x="568" y="191" width="68" height="20" rx="3" fill="#EC4899"/>

  <text x="50" y="240" font-size="10.5" fill="#1E293B">5. Frontend / Portal UI</text>
  <rect x="643" y="226" width="72" height="20" rx="3" fill="#8B5CF6"/>

  <text x="50" y="275" font-size="10.5" fill="#1E293B">6. Testing &amp; Bug Fixing</text>
  <rect x="723" y="261" width="40" height="20" rx="3" fill="#06B6D4"/>

  <text x="50" y="310" font-size="10.5" fill="#1E293B">7. Deployment &amp; Report</text>
  <rect x="765" y="296" width="40" height="20" rx="3" fill="#EF4444"/>
</svg>`;

// 3. Fig 3.6 Deployment Diagram - StarUML Style
const svg36 = `<svg width="850" height="420" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Segoe UI', Consolas, sans-serif;">
  <text x="425" y="28" font-family="'Times New Roman'" font-size="16" font-weight="bold" text-anchor="middle" fill="#0F172A">3.6 Deployment Diagram – BikeCare AI Portal</text>

  <!-- Node 1: Client Browser -->
  <g transform="translate(50, 70)">
    <polygon points="0,20 20,0 200,0 200,120 180,140 0,140" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5"/>
    <line x1="0" y1="20" x2="180" y2="20" stroke="#64748B" stroke-width="1.5"/>
    <line x1="180" y1="20" x2="200" y2="0" stroke="#64748B" stroke-width="1.5"/>
    <line x1="180" y1="20" x2="180" y2="140" stroke="#64748B" stroke-width="1.5"/>
    <text x="90" y="45" font-size="11" font-weight="bold" fill="#0F172A" text-anchor="middle">«device»</text>
    <text x="90" y="62" font-size="11" font-weight="bold" fill="#0F172A" text-anchor="middle">Client Workstation</text>
    <rect x="15" y="75" width="150" height="45" rx="3" fill="#EFF6FF" stroke="#3B82F6"/>
    <text x="90" y="94" font-size="9.5" fill="#1D4ED8" text-anchor="middle">«artifact»</text>
    <text x="90" y="108" font-size="9.5" font-weight="bold" fill="#1D4ED8" text-anchor="middle">Web Browser (React SPA)</text>
  </g>

  <!-- Node 2: Web / App Server -->
  <g transform="translate(320, 70)">
    <polygon points="0,20 20,0 230,0 230,170 210,190 0,190" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5"/>
    <line x1="0" y1="20" x2="210" y2="20" stroke="#64748B" stroke-width="1.5"/>
    <line x1="210" y1="20" x2="230" y2="0" stroke="#64748B" stroke-width="1.5"/>
    <line x1="210" y1="20" x2="210" y2="190" stroke="#64748B" stroke-width="1.5"/>
    <text x="105" y="45" font-size="11" font-weight="bold" fill="#0F172A" text-anchor="middle">«executionEnvironment»</text>
    <text x="105" y="62" font-size="11" font-weight="bold" fill="#0F172A" text-anchor="middle">Application Server (Port 3000)</text>
    <rect x="15" y="75" width="180" height="45" rx="3" fill="#EEF2FF" stroke="#6366F1"/>
    <text x="105" y="94" font-size="9" fill="#3730A3" text-anchor="middle">«executionEnvironment»</text>
    <text x="105" y="108" font-size="9.5" font-weight="bold" fill="#3730A3" text-anchor="middle">Node.js Express / Python Flask</text>
    <rect x="15" y="130" width="180" height="45" rx="3" fill="#FDF2F8" stroke="#EC4899"/>
    <text x="105" y="149" font-size="9" fill="#831843" text-anchor="middle">«component»</text>
    <text x="105" y="163" font-size="9.5" font-weight="bold" fill="#831843" text-anchor="middle">AI Diagnostic Engine</text>
  </g>

  <!-- Node 3: Database Server -->
  <g transform="translate(600, 70)">
    <polygon points="0,20 20,0 200,0 200,120 180,140 0,140" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5"/>
    <line x1="0" y1="20" x2="180" y2="20" stroke="#64748B" stroke-width="1.5"/>
    <line x1="180" y1="20" x2="200" y2="0" stroke="#64748B" stroke-width="1.5"/>
    <line x1="180" y1="20" x2="180" y2="140" stroke="#64748B" stroke-width="1.5"/>
    <text x="90" y="45" font-size="11" font-weight="bold" fill="#0F172A" text-anchor="middle">«database»</text>
    <text x="90" y="62" font-size="11" font-weight="bold" fill="#0F172A" text-anchor="middle">Data Storage Node</text>
    <rect x="15" y="75" width="150" height="45" rx="3" fill="#FEF3C7" stroke="#D97706"/>
    <text x="90" y="94" font-size="9" fill="#78350F" text-anchor="middle">«file»</text>
    <text x="90" y="108" font-size="9.5" font-weight="bold" fill="#78350F" text-anchor="middle">data/bikecare-db.json</text>
  </g>

  <!-- Node 4: External Gemini Cloud -->
  <g transform="translate(320, 290)">
    <polygon points="0,20 20,0 230,0 230,90 210,110 0,110" fill="#F8FAFC" stroke="#64748B" stroke-width="1.5"/>
    <line x1="0" y1="20" x2="210" y2="20" stroke="#64748B" stroke-width="1.5"/>
    <line x1="210" y1="20" x2="230" y2="0" stroke="#64748B" stroke-width="1.5"/>
    <line x1="210" y1="20" x2="210" y2="110" stroke="#64748B" stroke-width="1.5"/>
    <text x="105" y="45" font-size="11" font-weight="bold" fill="#0F172A" text-anchor="middle">«cloudService»</text>
    <text x="105" y="62" font-size="11" font-weight="bold" fill="#0F172A" text-anchor="middle">Google AI Studio</text>
    <text x="105" y="85" font-size="9.5" fill="#475569" text-anchor="middle">Gemini 2.5 / 3.8 Flash API</text>
  </g>

  <!-- Connectors -->
  <line x1="230" y1="130" x2="320" y2="130" stroke="#0F172A" stroke-width="1.5"/>
  <text x="275" y="122" font-size="9" fill="#64748B" text-anchor="middle">«HTTPS»</text>

  <line x1="530" y1="130" x2="600" y2="130" stroke="#0F172A" stroke-width="1.5"/>
  <text x="565" y="122" font-size="9" fill="#64748B" text-anchor="middle">«FS / JSON»</text>

  <line x1="425" y1="240" x2="425" y2="290" stroke="#0F172A" stroke-width="1.5"/>
  <text x="475" y="268" font-size="9" fill="#64748B" text-anchor="middle">«REST / gRPC»</text>
</svg>`;

// 4. Fig 5.1.2 Diagnostics UI
const svg512 = `<svg width="850" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#090d16; font-family:'Segoe UI', Arial, sans-serif;">
  <rect width="850" height="40" fill="#0f172a"/>
  <circle cx="20" cy="20" r="6" fill="#EF4444"/><circle cx="40" cy="20" r="6" fill="#F59E0B"/><circle cx="60" cy="20" r="6" fill="#10B981"/>
  <rect x="100" y="8" width="500" height="24" rx="12" fill="#1e293b"/>
  <text x="120" y="24" fill="#94a3b8" font-size="11">🔒 https://bikecare.ai/?tab=diagnostics</text>

  <rect x="50" y="60" width="750" height="395" rx="12" fill="#0f172a" stroke="#1e293b"/>
  <text x="80" y="95" fill="#ffffff" font-size="20" font-weight="bold">🎙️ AI Sound &amp; Noise Diagnostic Scanner</text>
  <text x="80" y="115" fill="#38bdf8" font-size="12">Multimodal Acoustic Inspection Powered by Google Gemini AI</text>

  <!-- Left Inputs -->
  <rect x="80" y="135" width="310" height="290" rx="8" fill="#1e293b"/>
  <text x="95" y="160" fill="#94a3b8" font-size="10.5">Motorcycle Brand &amp; Model</text>
  <rect x="95" y="170" width="280" height="30" rx="4" fill="#0f172a" stroke="#334155"/>
  <text x="105" y="190" fill="#ffffff" font-size="11">Yamaha R15 V4 (2023) - 18,500 km</text>

  <text x="95" y="220" fill="#94a3b8" font-size="10.5">Observed Mechanical Symptoms</text>
  <rect x="95" y="230" width="130" height="24" rx="12" fill="#0284c7"/><text x="160" y="246" fill="#fff" font-size="9.5" text-anchor="middle">✓ Metallic Ticking</text>
  <rect x="235" y="230" width="130" height="24" rx="12" fill="#0284c7"/><text x="300" y="246" fill="#fff" font-size="9.5" text-anchor="middle">✓ Spongy Brake</text>

  <text x="95" y="275" fill="#94a3b8" font-size="10.5">Sound Description (Rattling / Whining)</text>
  <rect x="95" y="285" width="280" height="50" rx="4" fill="#0f172a" stroke="#334155"/>
  <text x="105" y="305" fill="#ffffff" font-size="10">Rapid metallic clatter on right side when cold;</text>
  <text x="105" y="322" fill="#ffffff" font-size="10">disappears when clutch lever is depressed.</text>

  <rect x="95" y="355" width="280" height="38" rx="19" fill="#06b6d4"/>
  <text x="235" y="379" fill="#090d16" font-size="12" font-weight="bold" text-anchor="middle">Run Full AI Health Scan 🔍</text>

  <!-- Right AI Result -->
  <rect x="420" y="135" width="350" height="290" rx="8" fill="#1e293b" stroke="#0284c7"/>
  <text x="440" y="165" fill="#38bdf8" font-size="14" font-weight="bold">Diagnostic Assessment Result</text>
  <text x="440" y="195" fill="#ffffff" font-size="12" font-weight="bold">Primary Issue: Cam Timing Chain Slack</text>
  <text x="440" y="215" fill="#f59e0b" font-size="11">Severity Level: Moderate Warning (89% Confidence)</text>

  <text x="440" y="245" fill="#38bdf8" font-size="11" font-weight="bold">Root Cause Analysis:</text>
  <text x="440" y="263" fill="#cbd5e1" font-size="10">• Hydraulic cam-chain tensioner ratchet teeth worn.</text>
  <text x="440" y="280" fill="#cbd5e1" font-size="10">• Chain guide rubber damper crystallized due to heat.</text>

  <text x="440" y="308" fill="#34d399" font-size="11" font-weight="bold">Actionable DIY Check:</text>
  <text x="440" y="326" fill="#cbd5e1" font-size="10">Do not exceed 6,000 RPM. Schedule Master Overhaul.</text>

  <rect x="440" y="355" width="310" height="45" rx="6" fill="#0f172a"/>
  <text x="455" y="375" fill="#ffffff" font-size="11" font-weight="bold">Estimated Repair Range: ₹850 – ₹1,200</text>
  <text x="455" y="392" fill="#38bdf8" font-size="9.5">Recommended Package: Master Overhaul (Bay #2)</text>
</svg>`;

// 5. Fig 5.2.1 Database Structure
const svg521 = `<svg width="850" height="420" xmlns="http://www.w3.org/2000/svg" style="background:#090d16; font-family:'Segoe UI', Consolas, sans-serif;">
  <rect width="850" height="40" fill="#0f172a"/>
  <circle cx="20" cy="20" r="6" fill="#EF4444"/><circle cx="40" cy="20" r="6" fill="#F59E0B"/><circle cx="60" cy="20" r="6" fill="#10B981"/>
  <rect x="100" y="8" width="500" height="24" rx="12" fill="#1e293b"/>
  <text x="120" y="24" fill="#94a3b8" font-size="11">JSON Database Explorer – ./data/bikecare-db.json</text>

  <rect x="40" y="60" width="770" height="330" rx="8" fill="#0f172a" stroke="#1e293b"/>
  <text x="60" y="90" fill="#38bdf8" font-size="12" font-weight="bold">// Database Collections Status (Persistent Storage)</text>

  <text x="60" y="120" fill="#94a3b8" font-size="11">{</text>
  <text x="80" y="140" fill="#60a5fa" font-size="11">"services"</text><text x="160" y="140" fill="#cbd5e1" font-size="11">: [ 4 standardized packages with pricing, duration, features ],</text>

  <text x="80" y="165" fill="#60a5fa" font-size="11">"bookings"</text><text x="160" y="165" fill="#cbd5e1" font-size="11">: [</text>
  <text x="100" y="185" fill="#cbd5e1" font-size="10.5">{ "id": "b-8492", "bookingCode": "BK-8492", "customerName": "Samir Naukudkar",</text>
  <text x="115" y="202" fill="#cbd5e1" font-size="10.5">"bikeModel": "Yamaha MT-15", "status": "In Repair", "totalCost": 1848,</text>
  <text x="115" y="219" fill="#cbd5e1" font-size="10.5">"assignedMechanic": "Marcus Sterling", "createdAt": "2026-09-25T10:14:00Z" },</text>
  <text x="100" y="238" fill="#cbd5e1" font-size="10.5">{ "id": "b-9104", "bookingCode": "BK-9104", "customerName": "Rohan Varma",</text>
  <text x="115" y="255" fill="#cbd5e1" font-size="10.5">"bikeModel": "Royal Enfield 350", "status": "Diagnostic Done", "totalCost": 1499 }</text>
  <text x="80" y="275" fill="#cbd5e1" font-size="11">],</text>

  <text x="80" y="300" fill="#60a5fa" font-size="11">"mechanics"</text><text x="165" y="300" fill="#cbd5e1" font-size="11">: [ 4 certified technicians: Marcus (Bay 2), Priya (Bay 1), Tyler, Sofia ],</text>
  <text x="80" y="325" fill="#60a5fa" font-size="11">"aiQueries"</text><text x="165" y="325" fill="#cbd5e1" font-size="11">: [ 142 logged sound scans with diagnostic accuracy logs ],</text>
  <text x="80" y="350" fill="#60a5fa" font-size="11">"feedback"</text><text x="165" y="350" fill="#cbd5e1" font-size="11">: [ 38 customer reviews, average 4.9 stars, verified ratings ]</text>
  <text x="60" y="375" fill="#94a3b8" font-size="11">}</text>
</svg>`;

async function main() {
  await renderPng('fig_2_1_wbs.png', svg21, 800);
  await renderPng('fig_2_2_gantt.png', svg22, 800);
  await renderPng('fig_3_6_deployment.png', svg36, 800);
  await renderPng('fig_5_1_2_diagnostics.png', svg512, 800);
  await renderPng('fig_5_2_1_database.png', svg521, 800);
  console.log('Batch complete!');
}

main().catch(console.error);
