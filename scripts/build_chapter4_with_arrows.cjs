const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.resolve(__dirname, '../assets/figures');

async function renderPng(name, svg, width = 800) {
  const target = path.join(outDir, name);
  await sharp(Buffer.from(svg.trim())).resize(width).png().toFile(target);
  console.log('✓ Rendered with arrows:', name);
}

// -------------------------------------------------------------
// Figure 4.1: Frontend Architecture with Explicit Directional Arrows
// -------------------------------------------------------------
function getFrontendArchSvg() {
  return `<svg width="850" height="620" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Arial, sans-serif;">
    <defs>
      <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1E40AF"/>
        <stop offset="100%" stop-color="#3B82F6"/>
      </linearGradient>
      <marker id="arr-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8B5CF6"/>
      </marker>
      <marker id="arr-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563EB"/>
      </marker>
      <marker id="arr-cyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284C7"/>
      </marker>
      <marker id="arr-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10B981"/>
      </marker>
    </defs>

    <!-- Top Users Badge -->
    <rect x="250" y="15" width="350" height="42" rx="20" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="1.5"/>
    <text x="425" y="41" fill="#5B21B6" font-size="13" font-weight="bold" text-anchor="middle">👥 USERS (Riders / Mechanics / Admins)</text>

    <!-- Arrow 1: Users down to Title Banner -->
    <line x1="425" y1="57" x2="425" y2="76" stroke="#8B5CF6" stroke-width="2.5" marker-end="url(#arr-purple)"/>

    <!-- App Title Banner -->
    <rect x="50" y="78" width="750" height="44" rx="6" fill="url(#grad-blue)"/>
    <text x="425" y="105" fill="#ffffff" font-size="14.5" font-weight="bold" text-anchor="middle">BikeCare AI – Frontend Single-Page Application (React 19 + Vite)</text>

    <!-- Downward Branching Arrows from Banner to Row 1 Feature Cards -->
    <line x1="135" y1="122" x2="135" y2="140" stroke="#2563EB" stroke-width="2" marker-end="url(#arr-blue)"/>
    <line x1="325" y1="122" x2="325" y2="140" stroke="#2563EB" stroke-width="2" marker-end="url(#arr-blue)"/>
    <line x1="515" y1="122" x2="515" y2="140" stroke="#2563EB" stroke-width="2" marker-end="url(#arr-blue)"/>
    <line x1="710" y1="122" x2="710" y2="140" stroke="#2563EB" stroke-width="2" marker-end="url(#arr-blue)"/>

    <!-- Row 1: 4 Cards -->
    <!-- Card 1: Auth -->
    <rect x="50" y="142" width="170" height="105" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
    <rect x="50" y="142" width="170" height="28" rx="8 8 0 0" fill="#3B82F6"/>
    <text x="135" y="161" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🔒 Admin Auth Gate</text>
    <text x="65" y="185" font-size="9.5" fill="#1E3A8A">• Confidential /admin</text>
    <text x="65" y="203" font-size="9.5" fill="#1E3A8A">• Passcode PIN Check</text>
    <text x="65" y="221" font-size="9.5" fill="#1E3A8A">• Shortcut: Ctrl+Shift+A</text>

    <!-- Card 2: AI Diagnostic -->
    <rect x="240" y="142" width="170" height="105" rx="8" fill="#FDF2F8" stroke="#EC4899" stroke-width="1.5"/>
    <rect x="240" y="142" width="170" height="28" rx="8 8 0 0" fill="#EC4899"/>
    <text x="325" y="161" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🤖 AI Sound Scanner</text>
    <text x="255" y="185" font-size="9.5" fill="#831843">• Audio Noise Patterns</text>
    <text x="255" y="203" font-size="9.5" fill="#831843">• Root-Cause Estimator</text>
    <text x="255" y="221" font-size="9.5" fill="#831843">• DIY Safety Advice</text>

    <!-- Card 3: Packages -->
    <rect x="430" y="142" width="170" height="105" rx="8" fill="#FFFBEB" stroke="#F59E0B" stroke-width="1.5"/>
    <rect x="430" y="142" width="170" height="28" rx="8 8 0 0" fill="#F59E0B"/>
    <text x="515" y="161" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">📦 Service Packages</text>
    <text x="445" y="185" font-size="9.5" fill="#78350F">• Express Tune-Up</text>
    <text x="445" y="203" font-size="9.5" fill="#78350F">• Master Overhaul</text>
    <text x="445" y="221" font-size="9.5" fill="#78350F">• EV Power Shield</text>

    <!-- Card 4: Booking Engine -->
    <rect x="620" y="142" width="180" height="105" rx="8" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
    <rect x="620" y="142" width="180" height="28" rx="8 8 0 0" fill="#10B981"/>
    <text x="710" y="161" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🚚 Doorstep Booking</text>
    <text x="635" y="185" font-size="9.5" fill="#064E3B">• Hydraulic Van Pickup</text>
    <text x="635" y="203" font-size="9.5" fill="#064E3B">• Time Slot Selector</text>
    <text x="635" y="221" font-size="9.5" fill="#064E3B">• Instant BK Code</text>

    <!-- Connecting Arrows from Row 1 to Row 2 -->
    <line x1="135" y1="247" x2="135" y2="270" stroke="#3B82F6" stroke-width="2" marker-end="url(#arr-blue)"/>
    <line x1="325" y1="247" x2="325" y2="270" stroke="#EC4899" stroke-width="2" marker-end="url(#arr-blue)"/>
    <line x1="515" y1="247" x2="515" y2="270" stroke="#F59E0B" stroke-width="2" marker-end="url(#arr-blue)"/>
    <line x1="710" y1="247" x2="710" y2="270" stroke="#10B981" stroke-width="2" marker-end="url(#arr-blue)"/>

    <!-- Row 2: 4 Cards -->
    <!-- Card 5: Live Tracker -->
    <rect x="50" y="272" width="170" height="105" rx="8" fill="#F0FDF4" stroke="#22C55E" stroke-width="1.5"/>
    <rect x="50" y="272" width="170" height="28" rx="8 8 0 0" fill="#22C55E"/>
    <text x="135" y="291" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">📡 Live Job Tracker</text>
    <text x="65" y="315" font-size="9.5" fill="#14532D">• Milestone Timeline</text>
    <text x="65" y="333" font-size="9.5" fill="#14532D">• Mechanic Bay Badge</text>
    <text x="65" y="351" font-size="9.5" fill="#14532D">• Real-Time Updates</text>

    <!-- Card 6: Customer Reviews -->
    <rect x="240" y="272" width="170" height="105" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <rect x="240" y="272" width="170" height="28" rx="8 8 0 0" fill="#D97706"/>
    <text x="325" y="291" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">⭐ 5-Star Reviews</text>
    <text x="255" y="315" font-size="9.5" fill="#78350F">• Rating Collection (1-5)</text>
    <text x="255" y="333" font-size="9.5" fill="#78350F">• Verified Badges</text>
    <text x="255" y="351" font-size="9.5" fill="#78350F">• Review Auditing</text>

    <!-- Card 7: Admin Dispatch -->
    <rect x="430" y="272" width="170" height="105" rx="8" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/>
    <rect x="430" y="272" width="170" height="28" rx="8 8 0 0" fill="#7C3AED"/>
    <text x="515" y="291" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🛠️ Dispatch Board</text>
    <text x="445" y="315" font-size="9.5" fill="#4C1D95">• Mechanic Assignments</text>
    <text x="445" y="333" font-size="9.5" fill="#4C1D95">• State Progression</text>
    <text x="445" y="351" font-size="9.5" fill="#4C1D95">• Parts Billing Editor</text>

    <!-- Card 8: KPI Stats -->
    <rect x="620" y="272" width="180" height="105" rx="8" fill="#F1F5F9" stroke="#475569" stroke-width="1.5"/>
    <rect x="620" y="272" width="180" height="28" rx="8 8 0 0" fill="#475569"/>
    <text x="710" y="291" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">📊 Workshop KPIs</text>
    <text x="635" y="315" font-size="9.5" fill="#0F172A">• Revenue Summary</text>
    <text x="635" y="333" font-size="9.5" fill="#0F172A">• Active Bays Count</text>
    <text x="635" y="351" font-size="9.5" fill="#0F172A">• AI Diagnostic Logs</text>

    <!-- Downward Arrows into Shared UI Components -->
    <line x1="135" y1="377" x2="250" y2="415" stroke="#0284C7" stroke-width="2" marker-end="url(#arr-cyan)"/>
    <line x1="325" y1="377" x2="380" y2="415" stroke="#0284C7" stroke-width="2" marker-end="url(#arr-cyan)"/>
    <line x1="515" y1="377" x2="470" y2="415" stroke="#0284C7" stroke-width="2" marker-end="url(#arr-cyan)"/>
    <line x1="710" y1="377" x2="600" y2="415" stroke="#0284C7" stroke-width="2" marker-end="url(#arr-cyan)"/>

    <!-- Shared UI Components -->
    <rect x="50" y="418" width="750" height="50" rx="6" fill="#0284C7"/>
    <text x="425" y="438" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Shared UI Components (Tailwind CSS 4 + Lucide Icons)</text>
    <text x="425" y="456" fill="#E0F2FE" font-size="10" text-anchor="middle">Navbar | Modal Dialogs | Status Indicators | Star Picker | Input Fields | Progress Stepper</text>

    <!-- Arrow from Shared UI to Responsive Layer -->
    <line x1="425" y1="468" x2="425" y2="493" stroke="#10B981" stroke-width="2.5" marker-end="url(#arr-green)"/>

    <!-- Responsive UI Layer -->
    <rect x="50" y="495" width="750" height="42" rx="6" fill="#10B981"/>
    <text x="425" y="521" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">📱 Responsive UI – Optimized for Desktop, Tablet &amp; Mobile Web Browsers</text>
  </svg>`;
}

// -------------------------------------------------------------
// Figure 4.2: Backend Architecture with Directional Flow Arrows
// -------------------------------------------------------------
function getBackendArchSvg() {
  return `<svg width="850" height="580" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Arial, sans-serif;">
    <defs>
      <marker id="arr-pink" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#F43F5E"/>
      </marker>
      <marker id="arr-indigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366F1"/>
      </marker>
      <marker id="arr-dark" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#1E293B"/>
      </marker>
      <marker id="arr-cloud" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#BE185D"/>
      </marker>
    </defs>

    <!-- Top Frontend Card -->
    <rect x="200" y="15" width="450" height="38" rx="6" fill="#F43F5E"/>
    <text x="425" y="39" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">CLIENT / FRONTEND (React SPA – Port 3000)</text>

    <!-- Arrow 1: Frontend down to Server -->
    <line x1="425" y1="53" x2="425" y2="78" stroke="#F43F5E" stroke-width="2.5" marker-end="url(#arr-indigo)"/>
    <text x="475" y="68" font-size="9.5" font-weight="bold" fill="#64748B">JSON / REST APIs ➔</text>

    <!-- Dual Backend Server Core -->
    <rect x="150" y="80" width="550" height="55" rx="8" fill="#6366F1"/>
    <text x="425" y="104" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">BACKEND APPLICATION SERVER LAYER</text>
    <text x="425" y="122" fill="#E0E7FF" font-size="10.5" text-anchor="middle">Node.js Express (server.ts)  OR  Native Python Flask (app.py)</text>

    <!-- Branching Arrows from Server Core into Micro-modules -->
    <line x1="250" y1="135" x2="180" y2="158" stroke="#6366F1" stroke-width="2" marker-end="url(#arr-indigo)"/>
    <line x1="425" y1="135" x2="425" y2="158" stroke="#6366F1" stroke-width="2" marker-end="url(#arr-indigo)"/>
    <line x1="600" y1="135" x2="670" y2="158" stroke="#6366F1" stroke-width="2" marker-end="url(#arr-indigo)"/>

    <!-- Micro-modules -->
    <!-- Left Column -->
    <rect x="70" y="160" width="220" height="75" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
    <text x="180" y="183" font-size="12" font-weight="bold" fill="#1D4ED8" text-anchor="middle">🔑 Auth &amp; Route Guard</text>
    <text x="90" y="205" font-size="9.5" fill="#1E3A8A">• Admin PIN Verification</text>
    <text x="90" y="221" font-size="9.5" fill="#1E3A8A">• Secret Route Isolation (/admin)</text>

    <line x1="180" y1="235" x2="180" y2="250" stroke="#3B82F6" stroke-width="1.5" marker-end="url(#arr-indigo)"/>

    <rect x="70" y="252" width="220" height="75" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
    <text x="180" y="275" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">📋 Booking Controller</text>
    <text x="90" y="297" font-size="9.5" fill="#064E3B">• Unique Code Generation</text>
    <text x="90" y="313" font-size="9.5" fill="#064E3B">• Doorstep Slot Validation</text>

    <!-- Center AI Engine -->
    <rect x="315" y="160" width="220" height="167" rx="6" fill="#FDF2F8" stroke="#EC4899" stroke-width="1.5"/>
    <text x="425" y="185" font-size="12" font-weight="bold" fill="#BE185D" text-anchor="middle">🧠 Google Gemini AI Engine</text>
    <text x="330" y="208" font-size="9.5" fill="#831843">• Gemini 2.5/3.8 Flash SDK</text>
    <text x="330" y="228" font-size="9.5" fill="#831843">• Acoustic Pattern Matching</text>
    <text x="330" y="248" font-size="9.5" fill="#831843">• JSON Response Parsing</text>
    <text x="330" y="268" font-size="9.5" fill="#831843">• Rule-Based Fallback Engine</text>
    <text x="330" y="288" font-size="9.5" fill="#831843">• DIY Safety Instruction Set</text>
    <text x="330" y="308" font-size="9.5" fill="#831843">• Estimated Budget Calculator</text>

    <!-- Right Column -->
    <rect x="560" y="160" width="220" height="75" rx="6" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/>
    <text x="670" y="183" font-size="12" font-weight="bold" fill="#6D28D9" text-anchor="middle">🛠️ Dispatch Operations</text>
    <text x="580" y="205" font-size="9.5" fill="#4C1D95">• Bay Mechanic Assignment</text>
    <text x="580" y="221" font-size="9.5" fill="#4C1D95">• Milestone State Transition</text>

    <line x1="670" y1="235" x2="670" y2="250" stroke="#7C3AED" stroke-width="1.5" marker-end="url(#arr-indigo)"/>

    <rect x="560" y="252" width="220" height="75" rx="6" fill="#FFFBEB" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="670" y="275" font-size="12" font-weight="bold" fill="#B45309" text-anchor="middle">⭐ Feedback &amp; Metrics</text>
    <text x="580" y="297" font-size="9.5" fill="#78350F">• 1-5 Star Aggregator</text>
    <text x="580" y="313" font-size="9.5" fill="#78350F">• Revenue &amp; Workload Analytics</text>

    <!-- Arrows from Micro-modules down to Database Layer -->
    <line x1="180" y1="327" x2="220" y2="385" stroke="#1E293B" stroke-width="2" marker-end="url(#arr-dark)"/>
    <line x1="425" y1="327" x2="425" y2="385" stroke="#1E293B" stroke-width="2.5" marker-end="url(#arr-dark)"/>
    <line x1="670" y1="327" x2="630" y2="385" stroke="#1E293B" stroke-width="2" marker-end="url(#arr-dark)"/>
    <text x="470" y="360" font-size="10" font-weight="bold" fill="#475569">CRUD / File Sync ➔</text>

    <!-- Database Layer -->
    <rect x="50" y="388" width="750" height="155" rx="8" fill="#1E293B"/>
    <text x="425" y="413" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">LOCAL JSON PERSISTENCE DATABASE (./data/bikecare-db.json)</text>

    <!-- Tables inside DB -->
    <rect x="70" y="430" width="125" height="95" rx="4" fill="#334155"/>
    <text x="132" y="450" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">bookings</text>
    <text x="80" y="470" fill="#94A3B8" font-size="9">bookingCode [UNIQ]</text>
    <text x="80" y="485" fill="#94A3B8" font-size="9">status, totalCost</text>
    <text x="80" y="500" fill="#94A3B8" font-size="9">assignedMechanic</text>
    <text x="80" y="515" fill="#94A3B8" font-size="9">createdAt timestamp</text>

    <rect x="215" y="430" width="125" height="95" rx="4" fill="#334155"/>
    <text x="277" y="450" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">services</text>
    <text x="225" y="470" fill="#94A3B8" font-size="9">packageId [PK]</text>
    <text x="225" y="485" fill="#94A3B8" font-size="9">name, price</text>
    <text x="225" y="500" fill="#94A3B8" font-size="9">features list</text>
    <text x="225" y="515" fill="#94A3B8" font-size="9">popular flag</text>

    <rect x="360" y="430" width="125" height="95" rx="4" fill="#334155"/>
    <text x="422" y="450" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">mechanics</text>
    <text x="370" y="470" fill="#94A3B8" font-size="9">name [PK]</text>
    <text x="370" y="485" fill="#94A3B8" font-size="9">specialty</text>
    <text x="370" y="500" fill="#94A3B8" font-size="9">bayNumber</text>
    <text x="370" y="515" fill="#94A3B8" font-size="9">activeJobsCount</text>

    <rect x="505" y="430" width="125" height="95" rx="4" fill="#334155"/>
    <text x="567" y="450" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">aiQueries</text>
    <text x="515" y="470" fill="#94A3B8" font-size="9">bikeModel, year</text>
    <text x="515" y="485" fill="#94A3B8" font-size="9">symptoms array</text>
    <text x="515" y="500" fill="#94A3B8" font-size="9">predictedIssue</text>
    <text x="515" y="515" fill="#94A3B8" font-size="9">confidenceScore</text>

    <rect x="650" y="430" width="130" height="95" rx="4" fill="#334155"/>
    <text x="715" y="450" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">feedback</text>
    <text x="660" y="470" fill="#94A3B8" font-size="9">bookingCode [FK]</text>
    <text x="660" y="485" fill="#94A3B8" font-size="9">rating (1-5)</text>
    <text x="660" y="500" fill="#94A3B8" font-size="9">comment, date</text>
    <text x="660" y="515" fill="#94A3B8" font-size="9">feedbackTags</text>
  </svg>`;
}

// -------------------------------------------------------------
// Figure 4.3: Data Schema Design with Relational Linking Arrows (Monochrome / No Colors)
// -------------------------------------------------------------
function getDataSchemaSvg() {
  return `<svg width="850" height="540" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Consolas, sans-serif;">
    <defs>
      <marker id="arr-rel-black" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#000000"/>
      </marker>
    </defs>
    <text x="425" y="28" font-family="'Times New Roman'" font-size="16" font-weight="bold" text-anchor="middle" fill="#000000">4.3 Database / Data Schema – BikeCare AI Portal</text>
    
    <!-- Table 1: USERS -->
    <g transform="translate(30, 50)">
      <rect width="180" height="24" fill="#ffffff" stroke="#000000" stroke-width="1.2"/>
      <text x="90" y="16" fill="#000000" font-size="10" font-weight="bold" text-anchor="middle">USERS</text>
      <rect y="24" width="180" height="110" fill="#ffffff" stroke="#000000" stroke-width="1.2"/>
      <text x="8" y="40" font-size="9" font-weight="bold" fill="#000000">id : INT [PK]</text>
      <text x="8" y="56" font-size="9" fill="#000000">full_name : VARCHAR(100)</text>
      <text x="8" y="72" font-size="9" fill="#000000">phone : VARCHAR(20)</text>
      <text x="8" y="88" font-size="9" fill="#000000">email : VARCHAR(100)</text>
      <text x="8" y="104" font-size="9" fill="#000000">role : VARCHAR(20)</text>
    </g>

    <!-- Table 2: SERVICES -->
    <g transform="translate(230, 50)">
      <rect width="180" height="24" fill="#ffffff" stroke="#000000" stroke-width="1.2"/>
      <text x="90" y="16" fill="#000000" font-size="10" font-weight="bold" text-anchor="middle">SERVICES</text>
      <rect y="24" width="180" height="110" fill="#ffffff" stroke="#000000" stroke-width="1.2"/>
      <text x="8" y="40" font-size="9" font-weight="bold" fill="#000000">id : VARCHAR(50) [PK]</text>
      <text x="8" y="56" font-size="9" fill="#000000">name : VARCHAR(100)</text>
      <text x="8" y="72" font-size="9" fill="#000000">price : INT</text>
      <text x="8" y="88" font-size="9" fill="#000000">durationMinutes : INT</text>
      <text x="8" y="104" font-size="9" fill="#000000">features : JSON</text>
    </g>

    <!-- Table 3: BOOKINGS (Center Hub) -->
    <g transform="translate(430, 50)">
      <rect width="190" height="24" fill="#ffffff" stroke="#000000" stroke-width="1.2"/>
      <text x="95" y="16" fill="#000000" font-size="10" font-weight="bold" text-anchor="middle">BOOKINGS</text>
      <rect y="24" width="190" height="125" fill="#ffffff" stroke="#000000" stroke-width="1.2"/>
      <text x="8" y="40" font-size="9" font-weight="bold" fill="#000000">id : VARCHAR(50) [PK]</text>
      <text x="8" y="56" font-size="9" font-weight="bold" fill="#000000">bookingCode : VARCHAR [UNIQ]</text>
      <text x="8" y="72" font-size="9" fill="#000000">customerName : VARCHAR</text>
      <text x="8" y="88" font-size="9" fill="#000000">bikeBrand, Model : VARCHAR</text>
      <text x="8" y="104" font-size="9" fill="#000000">status : VARCHAR(50)</text>
      <text x="8" y="120" font-size="9" fill="#000000">assignedMechanic : VARCHAR</text>
    </g>

    <!-- Table 4: MECHANICS -->
    <g transform="translate(640, 50)">
      <rect width="180" height="24" fill="#ffffff" stroke="#000000" stroke-width="1.2"/>
      <text x="90" y="16" fill="#000000" font-size="10" font-weight="bold" text-anchor="middle">MECHANICS</text>
      <rect y="24" width="180" height="110" fill="#ffffff" stroke="#000000" stroke-width="1.2"/>
      <text x="8" y="40" font-size="9" font-weight="bold" fill="#000000">id : VARCHAR(50) [PK]</text>
      <text x="8" y="56" font-size="9" fill="#000000">name : VARCHAR(100)</text>
      <text x="8" y="72" font-size="9" fill="#000000">specialty : VARCHAR(100)</text>
      <text x="8" y="88" font-size="9" fill="#000000">bayNumber : INT</text>
      <text x="8" y="104" font-size="9" fill="#000000">activeJobsCount : INT</text>
    </g>

    <!-- Relational Arrows Between Tables -->
    <line x1="410" y1="95" x2="428" y2="95" stroke="#000000" stroke-width="2" marker-end="url(#arr-rel-black)"/>
    <line x1="640" y1="95" x2="622" y2="95" stroke="#000000" stroke-width="2" marker-end="url(#arr-rel-black)"/>

    <!-- Bottom Relationships Overview Table: No colors, solid black borders -->
    <rect x="30" y="200" width="790" height="310" fill="#ffffff" stroke="#000000" stroke-width="1.2"/>
    <rect x="30" y="200" width="790" height="26" fill="#ffffff" stroke="#000000" stroke-width="1.2"/>
    <text x="425" y="217" fill="#000000" font-size="11" font-weight="bold" text-anchor="middle">RELATIONSHIPS OVERVIEW (CARDINALITY &amp; FOREIGN KEY SPECIFICATIONS)</text>

    <!-- Header Row -->
    <rect x="30" y="226" width="790" height="24" fill="#ffffff" stroke="#000000" stroke-width="1"/>
    <line x1="150" y1="226" x2="150" y2="510" stroke="#000000" stroke-width="1"/>
    <line x1="270" y1="226" x2="270" y2="510" stroke="#000000" stroke-width="1"/>
    <line x1="390" y1="226" x2="390" y2="510" stroke="#000000" stroke-width="1"/>

    <text x="90" y="242" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">From Table</text>
    <text x="210" y="242" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">Cardinality</text>
    <text x="330" y="242" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">To Table</text>
    <text x="410" y="242" font-size="9.5" font-weight="bold" fill="#000000">Description &amp; Foreign Key Enforcement</text>

    <!-- Row 1 -->
    <line x1="30" y1="282" x2="820" y2="282" stroke="#000000" stroke-width="1"/>
    <text x="90" y="270" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">users</text>
    <text x="210" y="270" font-size="10.5" font-weight="bold" fill="#000000" text-anchor="middle">1 ────► M</text>
    <text x="330" y="270" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">bookings</text>
    <text x="410" y="270" font-size="9" fill="#000000">One registered user can create multiple bike repair job bookings.</text>

    <!-- Row 2 -->
    <line x1="30" y1="338" x2="820" y2="338" stroke="#000000" stroke-width="1"/>
    <text x="90" y="316" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">services</text>
    <text x="210" y="316" font-size="10.5" font-weight="bold" fill="#000000" text-anchor="middle">1 ────► M</text>
    <text x="330" y="316" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">bookings</text>
    <text x="410" y="316" font-size="9" fill="#000000">Each standardized package is selected across multiple bookings (FK: packageId).</text>

    <!-- Row 3 -->
    <line x1="30" y1="394" x2="820" y2="394" stroke="#000000" stroke-width="1"/>
    <text x="90" y="372" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">mechanics</text>
    <text x="210" y="372" font-size="10.5" font-weight="bold" fill="#000000" text-anchor="middle">1 ────► M</text>
    <text x="330" y="372" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">bookings</text>
    <text x="410" y="372" font-size="9" fill="#000000">One certified technician is assigned to multiple active bay repairs.</text>

    <!-- Row 4 -->
    <line x1="30" y1="450" x2="820" y2="450" stroke="#000000" stroke-width="1"/>
    <text x="90" y="428" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">bookings</text>
    <text x="210" y="428" font-size="10.5" font-weight="bold" fill="#000000" text-anchor="middle">1 ────► 1</text>
    <text x="330" y="428" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">feedback</text>
    <text x="410" y="428" font-size="9" fill="#000000">Each delivered job card receives exactly one verified customer review.</text>

    <!-- Row 5 -->
    <text x="90" y="484" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">bookings</text>
    <text x="210" y="484" font-size="10.5" font-weight="bold" fill="#000000" text-anchor="middle">1 ────► 1</text>
    <text x="330" y="484" font-size="9.5" font-weight="bold" fill="#000000" text-anchor="middle">aiQueries</text>
    <text x="410" y="484" font-size="9" fill="#000000">Pre-booking AI sound scan symptoms are linked to final job cards.</text>
  </svg>`;
}

async function run() {
  await renderPng('fig_4_1_frontend_arch.png', getFrontendArchSvg(), 800);
  await renderPng('fig_4_2_backend_arch.png', getBackendArchSvg(), 800);
  await renderPng('fig_4_3_data_schema.png', getDataSchemaSvg(), 800);
  console.log('Chapter 4 diagrams with arrows rendered!');
}

run().catch(console.error);
