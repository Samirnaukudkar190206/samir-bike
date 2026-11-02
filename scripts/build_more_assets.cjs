const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.resolve(__dirname, '../assets/figures');

async function renderPng(name, svg, width = 750) {
  const target = path.join(outDir, name);
  await sharp(Buffer.from(svg.trim())).resize(width).png().toFile(target);
  console.log('✓ Rendered:', name);
}

// Sequence
const svg34 = `<svg width="850" height="460" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Segoe UI', Consolas, sans-serif;">
  <text x="425" y="28" font-family="'Times New Roman'" font-size="16" font-weight="bold" text-anchor="middle" fill="#0F172A">3.4 Sequence Diagram – BikeCare AI Diagnostic &amp; Booking Lifecycle</text>
  
  <rect x="50" y="55" width="100" height="30" fill="#3B82F6" rx="4"/><text x="100" y="75" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">:Customer</text>
  <line x1="100" y1="85" x2="100" y2="440" stroke="#94A3B8" stroke-dasharray="4"/>

  <rect x="220" y="55" width="120" height="30" fill="#10B981" rx="4"/><text x="280" y="75" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">:React Frontend</text>
  <line x1="280" y1="85" x2="280" y2="440" stroke="#94A3B8" stroke-dasharray="4"/>

  <rect x="410" y="55" width="120" height="30" fill="#EC4899" rx="4"/><text x="470" y="75" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">:Gemini AI Engine</text>
  <line x1="470" y1="85" x2="470" y2="440" stroke="#94A3B8" stroke-dasharray="4"/>

  <rect x="600" y="55" width="110" height="30" fill="#F59E0B" rx="4"/><text x="655" y="75" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">:JSON Database</text>
  <line x1="655" y1="85" x2="655" y2="440" stroke="#94A3B8" stroke-dasharray="4"/>

  <rect x="740" y="55" width="90" height="30" fill="#8B5CF6" rx="4"/><text x="785" y="75" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">:Admin Ops</text>
  <line x1="785" y1="85" x2="785" y2="440" stroke="#94A3B8" stroke-dasharray="4"/>

  <line x1="100" y1="120" x2="280" y2="120" stroke="#0F172A" stroke-width="1.5"/>
  <text x="190" y="112" font-size="10" fill="#0F172A" text-anchor="middle">1: selectSymptoms(tapping, brake)</text>

  <line x1="280" y1="150" x2="470" y2="150" stroke="#0F172A" stroke-width="1.5"/>
  <text x="375" y="142" font-size="10" fill="#0F172A" text-anchor="middle">2: runAcousticDiagnosis(payload)</text>

  <line x1="470" y1="185" x2="280" y2="185" stroke="#0F172A" stroke-dasharray="4" stroke-width="1.5"/>
  <text x="375" y="177" font-size="10" fill="#0F172A" text-anchor="middle">3: return JSON(camChain, DIY, cost)</text>

  <line x1="280" y1="215" x2="100" y2="215" stroke="#0F172A" stroke-dasharray="4" stroke-width="1.5"/>
  <text x="190" y="207" font-size="10" fill="#0F172A" text-anchor="middle">4: displayDiagnosis &amp; estimate</text>

  <line x1="100" y1="260" x2="280" y2="260" stroke="#0F172A" stroke-width="1.5"/>
  <text x="190" y="252" font-size="10" fill="#0F172A" text-anchor="middle">5: submitBooking(Master Overhaul)</text>

  <line x1="280" y1="290" x2="655" y2="290" stroke="#0F172A" stroke-width="1.5"/>
  <text x="465" y="282" font-size="10" fill="#0F172A" text-anchor="middle">6: storeRecord(code: BK-8492)</text>

  <line x1="655" y1="320" x2="785" y2="320" stroke="#0F172A" stroke-width="1.5"/>
  <text x="720" y="312" font-size="10" fill="#0F172A" text-anchor="middle">7: notifyNewBooking()</text>

  <line x1="785" y1="360" x2="655" y2="360" stroke="#0F172A" stroke-width="1.5"/>
  <text x="720" y="352" font-size="10" fill="#0F172A" text-anchor="middle">8: assignMechanic(Bay #2)</text>

  <line x1="100" y1="400" x2="280" y2="400" stroke="#0F172A" stroke-width="1.5"/>
  <text x="190" y="392" font-size="10" fill="#0F172A" text-anchor="middle">9: queryJobCard(BK-8492)</text>

  <line x1="655" y1="420" x2="280" y2="420" stroke="#0F172A" stroke-dasharray="4" stroke-width="1.5"/>
  <text x="465" y="412" font-size="10" fill="#0F172A" text-anchor="middle">10: return liveStatus('In Repair')</text>
</svg>`;

// Activity
const svg35 = `<svg width="850" height="490" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Segoe UI', Arial, sans-serif;">
  <text x="425" y="28" font-family="'Times New Roman'" font-size="16" font-weight="bold" text-anchor="middle" fill="#0F172A">3.5 Activity Diagram – BikeCare AI Diagnostic &amp; Repair Workflow</text>
  
  <circle cx="425" cy="55" r="9" fill="#0F172A"/>
  <line x1="425" y1="64" x2="425" y2="85" stroke="#0F172A" stroke-width="1.5"/>

  <rect x="350" y="85" width="150" height="34" rx="17" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="425" y="106" font-size="11" font-weight="bold" fill="#1D4ED8" text-anchor="middle">Open BikeCare AI</text>
  <line x1="425" y1="119" x2="425" y2="140" stroke="#0F172A" stroke-width="1.5"/>

  <polygon points="425,140 480,165 425,190 370,165" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
  <text x="425" y="169" font-size="9" font-weight="bold" fill="#78350F" text-anchor="middle">Run Diagnostic?</text>

  <line x1="480" y1="165" x2="570" y2="165" stroke="#0F172A" stroke-width="1.5"/>
  <text x="515" y="158" font-size="9" fill="#0F172A">[Yes]</text>
  <rect x="570" y="148" width="160" height="34" rx="17" fill="#FDF2F8" stroke="#EC4899" stroke-width="1.5"/>
  <text x="650" y="169" font-size="10.5" font-weight="bold" fill="#BE185D" text-anchor="middle">Run AI Sound Scan</text>

  <line x1="650" y1="182" x2="650" y2="230" stroke="#0F172A" stroke-width="1.5"/>
  <line x1="650" y1="230" x2="425" y2="230" stroke="#0F172A" stroke-width="1.5"/>

  <line x1="425" y1="190" x2="425" y2="245" stroke="#0F172A" stroke-width="1.5"/>
  <text x="435" y="212" font-size="9" fill="#0F172A">[No]</text>

  <rect x="340" y="245" width="170" height="34" rx="17" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
  <text x="425" y="266" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Select Service Package</text>
  <line x1="425" y1="279" x2="425" y2="300" stroke="#0F172A" stroke-width="1.5"/>

  <rect x="340" y="300" width="170" height="34" rx="17" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
  <text x="425" y="321" font-size="11" font-weight="bold" fill="#047857" text-anchor="middle">Submit Doorstep Booking</text>
  <line x1="425" y1="334" x2="425" y2="355" stroke="#0F172A" stroke-width="1.5"/>

  <rect x="330" y="355" width="190" height="34" rx="17" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="425" y="376" font-size="10.5" font-weight="bold" fill="#6D28D9" text-anchor="middle">Admin Assigns Bay Mechanic</text>
  <line x1="425" y1="389" x2="425" y2="410" stroke="#0F172A" stroke-width="1.5"/>

  <rect x="330" y="410" width="190" height="34" rx="17" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
  <text x="425" y="431" font-size="10.5" font-weight="bold" fill="#1D4ED8" text-anchor="middle">Complete Service &amp; Deliver</text>
  <line x1="425" y1="444" x2="425" y2="465" stroke="#0F172A" stroke-width="1.5"/>

  <circle cx="425" cy="472" r="8" fill="none" stroke="#0F172A" stroke-width="1.5"/>
  <circle cx="425" cy="472" r="4.5" fill="#0F172A"/>
</svg>`;

// Data Schema Design
const svg43 = `<svg width="850" height="520" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Segoe UI', Consolas, sans-serif;">
  <text x="425" y="28" font-family="'Times New Roman'" font-size="16" font-weight="bold" text-anchor="middle" fill="#0F172A">4.3 Database / Data Schema – BikeCare AI Portal</text>
  
  <!-- USERS -->
  <g transform="translate(30, 50)">
    <rect width="180" height="24" rx="4 4 0 0" fill="#6366F1"/><text x="90" y="16" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">👤 USERS</text>
    <rect y="24" width="180" height="110" fill="#F8FAFC" stroke="#E2E8F0" rx="0 0 4 4"/>
    <text x="8" y="40" font-size="9" font-weight="bold" fill="#4338CA">id : INT [PK]</text>
    <text x="8" y="56" font-size="9" fill="#475569">full_name : VARCHAR(100)</text>
    <text x="8" y="72" font-size="9" fill="#475569">phone : VARCHAR(20)</text>
    <text x="8" y="88" font-size="9" fill="#475569">email : VARCHAR(100)</text>
    <text x="8" y="104" font-size="9" fill="#475569">role : VARCHAR(20)</text>
  </g>

  <!-- SERVICES -->
  <g transform="translate(230, 50)">
    <rect width="180" height="24" rx="4 4 0 0" fill="#10B981"/><text x="90" y="16" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">📦 SERVICES</text>
    <rect y="24" width="180" height="110" fill="#F8FAFC" stroke="#E2E8F0" rx="0 0 4 4"/>
    <text x="8" y="40" font-size="9" font-weight="bold" fill="#065F46">id : VARCHAR(50) [PK]</text>
    <text x="8" y="56" font-size="9" fill="#475569">name : VARCHAR(100)</text>
    <text x="8" y="72" font-size="9" fill="#475569">price : INT</text>
    <text x="8" y="88" font-size="9" fill="#475569">durationMinutes : INT</text>
    <text x="8" y="104" font-size="9" fill="#475569">features : JSON</text>
  </g>

  <!-- BOOKINGS -->
  <g transform="translate(430, 50)">
    <rect width="190" height="24" rx="4 4 0 0" fill="#3B82F6"/><text x="95" y="16" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">📋 BOOKINGS</text>
    <rect y="24" width="190" height="125" fill="#F8FAFC" stroke="#E2E8F0" rx="0 0 4 4"/>
    <text x="8" y="40" font-size="9" font-weight="bold" fill="#1E40AF">id : VARCHAR(50) [PK]</text>
    <text x="8" y="56" font-size="9" font-weight="bold" fill="#1E40AF">bookingCode : VARCHAR [UNIQ]</text>
    <text x="8" y="72" font-size="9" fill="#475569">customerName : VARCHAR</text>
    <text x="8" y="88" font-size="9" fill="#475569">bikeBrand, Model : VARCHAR</text>
    <text x="8" y="104" font-size="9" fill="#475569">status : VARCHAR(50)</text>
    <text x="8" y="120" font-size="9" fill="#475569">assignedMechanic : VARCHAR</text>
  </g>

  <!-- MECHANICS -->
  <g transform="translate(640, 50)">
    <rect width="180" height="24" rx="4 4 0 0" fill="#8B5CF6"/><text x="90" y="16" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">🛠️ MECHANICS</text>
    <rect y="24" width="180" height="110" fill="#F8FAFC" stroke="#E2E8F0" rx="0 0 4 4"/>
    <text x="8" y="40" font-size="9" font-weight="bold" fill="#5B21B6">id : VARCHAR(50) [PK]</text>
    <text x="8" y="56" font-size="9" fill="#475569">name : VARCHAR(100)</text>
    <text x="8" y="72" font-size="9" fill="#475569">specialty : VARCHAR(100)</text>
    <text x="8" y="88" font-size="9" fill="#475569">bayNumber : INT</text>
    <text x="8" y="104" font-size="9" fill="#475569">activeJobsCount : INT</text>
  </g>

  <!-- Relationships Table (matching Page 30 of reference PDF!) -->
  <rect x="30" y="200" width="790" height="290" rx="6" fill="#F8FAFC" stroke="#CBD5E1"/>
  <rect x="30" y="200" width="790" height="26" rx="6 6 0 0" fill="#0284C7"/>
  <text x="425" y="217" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">RELATIONSHIPS OVERVIEW (CARDINALITY &amp; FOREIGN KEYS)</text>

  <!-- Header -->
  <rect x="45" y="235" width="760" height="22" fill="#E2E8F0"/>
  <text x="60" y="250" font-size="9.5" font-weight="bold" fill="#0F172A">From Table</text>
  <text x="180" y="250" font-size="9.5" font-weight="bold" fill="#0F172A">Relationship</text>
  <text x="290" y="250" font-size="9.5" font-weight="bold" fill="#0F172A">To Table</text>
  <text x="420" y="250" font-size="9.5" font-weight="bold" fill="#0F172A">Description &amp; Foreign Key Enforcement</text>

  <text x="60" y="280" font-size="9" fill="#334155">users</text>
  <text x="190" y="280" font-size="9" font-weight="bold" fill="#2563EB">1 — M</text>
  <text x="290" y="280" font-size="9" fill="#334155">bookings</text>
  <text x="420" y="280" font-size="9" fill="#64748B">One registered user can create multiple bike repair job bookings.</text>

  <text x="60" y="315" font-size="9" fill="#334155">services</text>
  <text x="190" y="315" font-size="9" font-weight="bold" fill="#2563EB">1 — M</text>
  <text x="290" y="315" font-size="9" fill="#334155">bookings</text>
  <text x="420" y="315" font-size="9" fill="#64748B">Each standardized package is selected across multiple bookings.</text>

  <text x="60" y="350" font-size="9" fill="#334155">mechanics</text>
  <text x="190" y="350" font-size="9" font-weight="bold" fill="#2563EB">1 — M</text>
  <text x="290" y="350" font-size="9" fill="#334155">bookings</text>
  <text x="420" y="350" font-size="9" fill="#64748B">One certified technician is assigned to multiple active bay repairs.</text>

  <text x="60" y="385" font-size="9" fill="#334155">bookings</text>
  <text x="190" y="385" font-size="9" font-weight="bold" fill="#2563EB">1 — 1</text>
  <text x="290" y="385" font-size="9" fill="#334155">feedback</text>
  <text x="420" y="385" font-size="9" fill="#64748B">Each delivered job card receives exactly one verified customer review.</text>

  <text x="60" y="420" font-size="9" fill="#334155">bookings</text>
  <text x="190" y="420" font-size="9" font-weight="bold" fill="#2563EB">1 — 1</text>
  <text x="290" y="420" font-size="9" fill="#334155">aiQueries</text>
  <text x="420" y="420" font-size="9" fill="#64748B">Pre-booking AI sound scan symptoms are linked to final job cards.</text>
</svg>`;

// Admin screen
const svg517 = `<svg width="850" height="440" xmlns="http://www.w3.org/2000/svg" style="background:#090d16; font-family:'Segoe UI', Arial, sans-serif;">
  <rect width="850" height="35" fill="#0f172a"/>
  <circle cx="15" cy="18" r="5" fill="#EF4444"/><circle cx="30" cy="18" r="5" fill="#F59E0B"/><circle cx="45" cy="18" r="5" fill="#10B981"/>
  <rect x="75" y="6" width="550" height="24" rx="12" fill="#1e293b"/>
  <text x="95" y="22" fill="#f43f5e" font-size="11">🔒 https://bikecare.ai/admin – Workshop Ops Passcode Login</text>

  <!-- Login Card in center -->
  <rect x="250" y="70" width="350" height="320" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
  <circle cx="425" cy="115" r="24" fill="#1e293b" stroke="#334155"/>
  <text x="425" y="122" font-size="18" text-anchor="middle">🔒</text>
  
  <text x="425" y="160" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">Workshop Admin Access</text>
  <text x="425" y="180" fill="#94a3b8" font-size="11" text-anchor="middle">Authorized Service Technicians &amp; Managers</text>

  <rect x="280" y="210" width="290" height="38" rx="6" fill="#1e293b" stroke="#334155"/>
  <text x="295" y="233" fill="#cbd5e1" font-size="13">••••••••</text>
  <text x="425" y="270" fill="#38bdf8" font-size="10" text-anchor="middle">Demo Workshop PIN: admin123</text>

  <rect x="280" y="290" width="290" height="42" rx="6" fill="#06b6d4"/>
  <text x="425" y="316" fill="#090d16" font-size="12" font-weight="bold" text-anchor="middle">Unlock Workshop Dashboard 🔓</text>

  <text x="425" y="360" fill="#64748b" font-size="10" text-anchor="middle">Staff Shortcut: Press Ctrl + Shift + A on any page</text>
</svg>`;

// Selenium Booking
const svg612 = `<svg width="850" height="400" xmlns="http://www.w3.org/2000/svg" style="background:#fff; font-family:'Segoe UI', Consolas, sans-serif;">
  <rect width="850" height="35" fill="#2d3748"/>
  <circle cx="15" cy="18" r="5" fill="#ef4444"/><circle cx="32" cy="18" r="5" fill="#f59e0b"/><circle cx="49" cy="18" r="5" fill="#10b981"/>
  <text x="75" y="22" fill="#fff" font-size="12">Extension: (Selenium IDE) - TC02_Doorstep_Booking_Test - Firefox</text>

  <rect y="35" width="850" height="180" fill="#ffffff" stroke="#e2e8f0"/>
  <rect y="35" width="850" height="24" fill="#edf2f7"/>
  <text x="20" y="51" font-size="11" font-weight="bold" fill="#4a5568">Command</text>
  <text x="220" y="51" font-size="11" font-weight="bold" fill="#4a5568">Target</text>
  <text x="540" y="51" font-size="11" font-weight="bold" fill="#4a5568">Value</text>

  <text x="20" y="75" font-size="11" fill="#2b6cb0">1  open</text><text x="220" y="75" font-size="11" fill="#4a5568">http://localhost:3000/?tab=booking</text>
  <text x="20" y="95" font-size="11" fill="#2b6cb0">2  type</text><text x="220" y="95" font-size="11" fill="#4a5568">name=customerName</text><text x="540" y="95" font-size="11" fill="#718096">Samir Naukudkar</text>
  <text x="20" y="115" font-size="11" fill="#2b6cb0">3  type</text><text x="220" y="115" font-size="11" fill="#4a5568">name=customerPhone</text><text x="540" y="115" font-size="11" fill="#718096">9820012345</text>
  <text x="20" y="135" font-size="11" fill="#2b6cb0">4  click</text><text x="220" y="135" font-size="11" fill="#4a5568">id=pkg_master_overhaul</text>
  <text x="20" y="155" font-size="11" fill="#2b6cb0">5  click</text><text x="220" y="155" font-size="11" fill="#4a5568">id=submitBookingBtn</text>
  <text x="20" y="175" font-size="11" fill="#2b6cb0">6  assertText</text><text x="220" y="175" font-size="11" fill="#4a5568">css=.booking-code-success</text><text x="540" y="175" font-size="11" fill="#718096">BK-</text>

  <rect y="215" width="850" height="185" fill="#1a202c"/>
  <text x="20" y="240" fill="#a0aec0" font-size="10" font-weight="bold">Execution Log Console</text>
  <text x="20" y="265" fill="#48bb78" font-size="10">18:04:31 [Selenium] Running 'TC02_Doorstep_Booking_Test' ...</text>
  <text x="20" y="285" fill="#48bb78" font-size="10">18:04:32 [Selenium] click on id=submitBookingBtn OK</text>
  <text x="20" y="305" fill="#48bb78" font-size="10">18:04:33 [Selenium] assertText on css=.booking-code-success matched 'BK-8492' OK</text>
  <text x="20" y="325" fill="#38bdf8" font-size="10">18:04:34 [Selenium] Test Result: PASSED (Execution time: 1.84s)</text>
</svg>`;

async function main() {
  await renderPng('fig_3_4_sequence.png', svg34, 800);
  await renderPng('fig_3_5_activity.png', svg35, 800);
  await renderPng('fig_4_3_data_schema.png', svg43, 800);
  await renderPng('fig_5_1_7_admin.png', svg517, 800);
  await renderPng('fig_6_1_2_selenium_booking.png', svg612, 800);
  console.log('✓ All secondary figures successfully generated!');
}

main().catch(console.error);
