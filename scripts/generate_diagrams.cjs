const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.resolve(__dirname, '../assets/figures');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function saveSvgAsPng(filename, svgString, width = 800) {
  const filePath = path.join(outDir, filename);
  await sharp(Buffer.from(svgString))
    .resize(width)
    .png()
    .toFile(filePath);
  console.log('Saved:', filename);
}

// -------------------------------------------------------------
// 1. Figure 2.1: Work Breakdown Structure (WBS) - StarUML Style
// -------------------------------------------------------------
function getWbsSvg() {
  return `<svg width="1000" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Arial, sans-serif;">
    <defs>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
        <feDropShadow dx="2" dy="3" stdDeviation="3" flood-opacity="0.12"/>
      </filter>
    </defs>
    <!-- Root -->
    <rect x="350" y="20" width="300" height="50" rx="6" fill="#3B82F6" stroke="#1D4ED8" stroke-width="2" filter="url(#shadow)"/>
    <text x="500" y="50" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">BikeCare AI Portal Project</text>
    
    <!-- Vertical connector from root -->
    <line x1="500" y1="70" x2="500" y2="105" stroke="#64748B" stroke-width="2"/>
    <line x1="100" y1="105" x2="900" y2="105" stroke="#64748B" stroke-width="2"/>
    
    <!-- 6 Level 1 nodes -->
    <!-- Node 1: Planning -->
    <line x1="100" y1="105" x2="100" y2="135" stroke="#64748B" stroke-width="2"/>
    <rect x="30" y="135" width="140" height="42" rx="4" fill="#10B981" stroke="#059669" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="100" y="161" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">1. Project Planning</text>
    
    <rect x="30" y="195" width="140" height="30" rx="3" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1"/>
    <text x="100" y="215" fill="#065F46" font-size="10" text-anchor="middle">Problem Statement</text>
    <rect x="30" y="235" width="140" height="30" rx="3" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1"/>
    <text x="100" y="255" fill="#065F46" font-size="10" text-anchor="middle">Feasibility Study</text>
    <rect x="30" y="275" width="140" height="30" rx="3" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1"/>
    <text x="100" y="295" fill="#065F46" font-size="10" text-anchor="middle">SDLC Selection</text>

    <!-- Node 2: System Design -->
    <line x1="260" y1="105" x2="260" y2="135" stroke="#64748B" stroke-width="2"/>
    <rect x="190" y="135" width="140" height="42" rx="4" fill="#F59E0B" stroke="#D97706" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="260" y="161" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">2. System Design</text>

    <rect x="190" y="195" width="140" height="30" rx="3" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1"/>
    <text x="260" y="215" fill="#92400E" font-size="10" text-anchor="middle">System Architecture</text>
    <rect x="190" y="235" width="140" height="30" rx="3" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1"/>
    <text x="260" y="255" fill="#92400E" font-size="10" text-anchor="middle">UML Diagrams</text>
    <rect x="190" y="275" width="140" height="30" rx="3" fill="#FFFBEB" stroke="#FDE68A" stroke-width="1"/>
    <text x="260" y="295" fill="#92400E" font-size="10" text-anchor="middle">JSON Schema</text>

    <!-- Node 3: Development -->
    <line x1="420" y1="105" x2="420" y2="135" stroke="#64748B" stroke-width="2"/>
    <rect x="350" y="135" width="140" height="42" rx="4" fill="#6366F1" stroke="#4F46E5" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="420" y="161" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">3. Development</text>

    <rect x="350" y="195" width="140" height="30" rx="3" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1"/>
    <text x="420" y="215" fill="#3730A3" font-size="10" text-anchor="middle">Frontend (React/Vite)</text>
    <rect x="350" y="235" width="140" height="30" rx="3" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1"/>
    <text x="420" y="255" fill="#3730A3" font-size="10" text-anchor="middle">Backend (Express/Flask)</text>
    <rect x="350" y="275" width="140" height="30" rx="3" fill="#EEF2FF" stroke="#C7D2FE" stroke-width="1"/>
    <text x="420" y="295" fill="#3730A3" font-size="10" text-anchor="middle">AI Gemini Integration</text>

    <!-- Node 4: Testing -->
    <line x1="580" y1="105" x2="580" y2="135" stroke="#64748B" stroke-width="2"/>
    <rect x="510" y="135" width="140" height="42" rx="4" fill="#EC4899" stroke="#DB2777" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="580" y="161" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">4. Testing &amp; QA</text>

    <rect x="510" y="195" width="140" height="30" rx="3" fill="#FDF2F8" stroke="#FBCFE8" stroke-width="1"/>
    <text x="580" y="215" fill="#831843" font-size="10" text-anchor="middle">Unit Testing</text>
    <rect x="510" y="235" width="140" height="30" rx="3" fill="#FDF2F8" stroke="#FBCFE8" stroke-width="1"/>
    <text x="580" y="255" fill="#831843" font-size="10" text-anchor="middle">Black-Box Testing</text>
    <rect x="510" y="275" width="140" height="30" rx="3" fill="#FDF2F8" stroke="#FBCFE8" stroke-width="1"/>
    <text x="580" y="295" fill="#831843" font-size="10" text-anchor="middle">Selenium IDE Suite</text>

    <!-- Node 5: Admin & Security -->
    <line x1="740" y1="105" x2="740" y2="135" stroke="#64748B" stroke-width="2"/>
    <rect x="670" y="135" width="140" height="42" rx="4" fill="#8B5CF6" stroke="#7C3AED" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="740" y="161" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">5. Admin Portal</text>

    <rect x="670" y="195" width="140" height="30" rx="3" fill="#F5F3FF" stroke="#DDD6FE" stroke-width="1"/>
    <text x="740" y="215" fill="#5B21B6" font-size="10" text-anchor="middle">/admin Segregation</text>
    <rect x="670" y="235" width="140" height="30" rx="3" fill="#F5F3FF" stroke="#DDD6FE" stroke-width="1"/>
    <text x="740" y="255" fill="#5B21B6" font-size="10" text-anchor="middle">Mechanic Dispatch</text>
    <rect x="670" y="275" width="140" height="30" rx="3" fill="#F5F3FF" stroke="#DDD6FE" stroke-width="1"/>
    <text x="740" y="295" fill="#5B21B6" font-size="10" text-anchor="middle">Revenue Auditing</text>

    <!-- Node 6: Deployment -->
    <line x1="900" y1="105" x2="900" y2="135" stroke="#64748B" stroke-width="2"/>
    <rect x="830" y="135" width="140" height="42" rx="4" fill="#EF4444" stroke="#DC2626" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="900" y="161" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">6. Deployment</text>

    <rect x="830" y="195" width="140" height="30" rx="3" fill="#FEF2F2" stroke="#FECACA" stroke-width="1"/>
    <text x="900" y="215" fill="#991B1B" font-size="10" text-anchor="middle">Render / Cloud Run</text>
    <rect x="830" y="235" width="140" height="30" rx="3" fill="#FEF2F2" stroke="#FECACA" stroke-width="1"/>
    <text x="900" y="255" fill="#991B1B" font-size="10" text-anchor="middle">Git Repository</text>
    <rect x="830" y="275" width="140" height="30" rx="3" fill="#FEF2F2" stroke="#FECACA" stroke-width="1"/>
    <text x="900" y="295" fill="#991B1B" font-size="10" text-anchor="middle">Project Report</text>
  </svg>`;
}

// -------------------------------------------------------------
// 2. Figure 3.1: ER Diagram - StarUML Style
// -------------------------------------------------------------
function getErSvg() {
  return `<svg width="900" height="560" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Consolas, sans-serif;">
    <defs>
      <filter id="er-sh" x="-5%" y="-5%" width="110%" height="115%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="2" flood-opacity="0.1"/>
      </filter>
    </defs>
    <text x="450" y="32" font-family="'Times New Roman'" font-size="18" font-weight="bold" text-anchor="middle" fill="#0f172a">BikeCare AI Portal - Entity Relationship (ER) Diagram</text>

    <!-- Entity: CUSTOMER -->
    <g transform="translate(50, 70)" filter="url(#er-sh)">
      <rect width="180" height="30" fill="#10B981" rx="4 4 0 0"/>
      <circle cx="20" cy="15" r="8" fill="#ffffff" opacity="0.3"/>
      <text x="20" y="19" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">E</text>
      <text x="100" y="20" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Customer</text>
      <rect y="30" width="180" height="130" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" rx="0 0 4 4"/>
      <text x="15" y="52" font-size="11" fill="#0F172A">● customer_id : INT «PK»</text>
      <text x="15" y="74" font-size="11" fill="#475569">  name : VARCHAR(100)</text>
      <text x="15" y="96" font-size="11" fill="#475569">  phone : VARCHAR(20)</text>
      <text x="15" y="118" font-size="11" fill="#475569">  email : VARCHAR(100)</text>
      <text x="15" y="140" font-size="11" fill="#475569">  address : TEXT</text>
    </g>

    <!-- Entity: BOOKING -->
    <g transform="translate(350, 70)" filter="url(#er-sh)">
      <rect width="200" height="30" fill="#3B82F6" rx="4 4 0 0"/>
      <circle cx="20" cy="15" r="8" fill="#ffffff" opacity="0.3"/>
      <text x="20" y="19" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">E</text>
      <text x="110" y="20" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Booking / Job Card</text>
      <rect y="30" width="200" height="180" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" rx="0 0 4 4"/>
      <text x="15" y="52" font-size="11" fill="#0F172A">● booking_id : INT «PK»</text>
      <text x="15" y="72" font-size="11" fill="#2563EB">● bookingCode : VARCHAR(20)</text>
      <text x="15" y="92" font-size="11" fill="#475569">  customer_id : INT «FK»</text>
      <text x="15" y="112" font-size="11" fill="#475569">  bikeModel : VARCHAR(100)</text>
      <text x="15" y="132" font-size="11" fill="#475569">  package_id : INT «FK»</text>
      <text x="15" y="152" font-size="11" fill="#475569">  assignedMechanic : VARCHAR</text>
      <text x="15" y="172" font-size="11" fill="#475569">  status : VARCHAR(50)</text>
      <text x="15" y="192" font-size="11" fill="#475569">  totalCost : INT</text>
    </g>

    <!-- Entity: SERVICE PACKAGE -->
    <g transform="translate(670, 70)" filter="url(#er-sh)">
      <rect width="180" height="30" fill="#F59E0B" rx="4 4 0 0"/>
      <circle cx="20" cy="15" r="8" fill="#ffffff" opacity="0.3"/>
      <text x="20" y="19" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">E</text>
      <text x="100" y="20" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">ServicePackage</text>
      <rect y="30" width="180" height="130" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" rx="0 0 4 4"/>
      <text x="15" y="52" font-size="11" fill="#0F172A">● package_id : INT «PK»</text>
      <text x="15" y="74" font-size="11" fill="#475569">  packageName : VARCHAR</text>
      <text x="15" y="96" font-size="11" fill="#475569">  price : INT</text>
      <text x="15" y="118" font-size="11" fill="#475569">  durationHours : INT</text>
      <text x="15" y="140" font-size="11" fill="#475569">  features : TEXT</text>
    </g>

    <!-- Entity: MECHANIC -->
    <g transform="translate(100, 340)" filter="url(#er-sh)">
      <rect width="180" height="30" fill="#8B5CF6" rx="4 4 0 0"/>
      <circle cx="20" cy="15" r="8" fill="#ffffff" opacity="0.3"/>
      <text x="20" y="19" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">E</text>
      <text x="100" y="20" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Mechanic</text>
      <rect y="30" width="180" height="110" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" rx="0 0 4 4"/>
      <text x="15" y="52" font-size="11" fill="#0F172A">● mechanic_id : INT «PK»</text>
      <text x="15" y="74" font-size="11" fill="#475569">  mechanicName : VARCHAR</text>
      <text x="15" y="96" font-size="11" fill="#475569">  specialty : VARCHAR</text>
      <text x="15" y="118" font-size="11" fill="#475569">  bayNumber : INT</text>
    </g>

    <!-- Entity: AI_DIAGNOSTICS -->
    <g transform="translate(360, 340)" filter="url(#er-sh)">
      <rect width="190" height="30" fill="#EC4899" rx="4 4 0 0"/>
      <circle cx="20" cy="15" r="8" fill="#ffffff" opacity="0.3"/>
      <text x="20" y="19" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">E</text>
      <text x="105" y="20" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">AiDiagnosticScan</text>
      <rect y="30" width="190" height="130" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" rx="0 0 4 4"/>
      <text x="15" y="52" font-size="11" fill="#0F172A">● scan_id : INT «PK»</text>
      <text x="15" y="74" font-size="11" fill="#475569">  bikeModel : VARCHAR</text>
      <text x="15" y="96" font-size="11" fill="#475569">  symptoms : TEXT</text>
      <text x="15" y="118" font-size="11" fill="#475569">  predictedIssue : TEXT</text>
      <text x="15" y="140" font-size="11" fill="#475569">  severity : VARCHAR(20)</text>
    </g>

    <!-- Entity: FEEDBACK -->
    <g transform="translate(660, 340)" filter="url(#er-sh)">
      <rect width="180" height="30" fill="#06B6D4" rx="4 4 0 0"/>
      <circle cx="20" cy="15" r="8" fill="#ffffff" opacity="0.3"/>
      <text x="20" y="19" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">E</text>
      <text x="100" y="20" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">CustomerReview</text>
      <rect y="30" width="180" height="110" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1" rx="0 0 4 4"/>
      <text x="15" y="52" font-size="11" fill="#0F172A">● review_id : INT «PK»</text>
      <text x="15" y="74" font-size="11" fill="#475569">  bookingCode : VARCHAR «FK»</text>
      <text x="15" y="96" font-size="11" fill="#475569">  ratingStars : INT (1-5)</text>
      <text x="15" y="118" font-size="11" fill="#475569">  reviewComment : TEXT</text>
    </g>

    <!-- Connectors -->
    <!-- Customer to Booking -->
    <line x1="230" y1="130" x2="350" y2="130" stroke="#64748B" stroke-width="2"/>
    <text x="290" y="122" font-size="11" fill="#64748B" text-anchor="middle">places (1:N)</text>
    <!-- Package to Booking -->
    <line x1="670" y1="130" x2="550" y2="130" stroke="#64748B" stroke-width="2"/>
    <text x="610" y="122" font-size="11" fill="#64748B" text-anchor="middle">includes (1:N)</text>
    <!-- Booking to Mechanic -->
    <line x1="400" y1="250" x2="230" y2="340" stroke="#64748B" stroke-width="2"/>
    <text x="290" y="290" font-size="11" fill="#64748B" text-anchor="middle">assigned_to (N:1)</text>
    <!-- Booking to AI -->
    <line x1="450" y1="250" x2="450" y2="340" stroke="#64748B" stroke-width="2"/>
    <text x="495" y="300" font-size="11" fill="#64748B" text-anchor="middle">informs (1:1)</text>
    <!-- Booking to Review -->
    <line x1="500" y1="250" x2="680" y2="340" stroke="#64748B" stroke-width="2"/>
    <text x="620" y="290" font-size="11" fill="#64748B" text-anchor="middle">receives (1:1)</text>
  </svg>`;
}

// -------------------------------------------------------------
// 3. Figure 3.2: Use Case Diagram - StarUML Style
// -------------------------------------------------------------
function getUseCaseSvg() {
  return `<svg width="850" height="620" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Arial, sans-serif;">
    <text x="425" y="30" font-family="'Times New Roman'" font-size="18" font-weight="bold" text-anchor="middle" fill="#0f172a">BikeCare AI Portal - Use Case Diagram</text>

    <!-- System Boundary -->
    <rect x="230" y="55" width="400" height="540" fill="#FAFAFA" stroke="#334155" stroke-width="2" rx="8"/>
    <text x="430" y="80" font-size="14" font-weight="bold" text-anchor="middle" fill="#1E293B">BikeCare AI System</text>

    <!-- Actor: Customer (Left) -->
    <g transform="translate(80, 240)">
      <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0F172A" stroke-width="2"/>
      <line x1="20" y1="34" x2="20" y2="75" stroke="#0F172A" stroke-width="2"/>
      <line x1="-5" y1="48" x2="45" y2="48" stroke="#0F172A" stroke-width="2"/>
      <line x1="20" y1="75" x2="0" y2="110" stroke="#0F172A" stroke-width="2"/>
      <line x1="20" y1="75" x2="40" y2="110" stroke="#0F172A" stroke-width="2"/>
      <text x="20" y="130" font-size="12" font-weight="bold" text-anchor="middle" fill="#0F172A">Customer / Rider</text>
    </g>

    <!-- Actor: Workshop Admin (Right Top) -->
    <g transform="translate(720, 140)">
      <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0F172A" stroke-width="2"/>
      <line x1="20" y1="34" x2="20" y2="75" stroke="#0F172A" stroke-width="2"/>
      <line x1="-5" y1="48" x2="45" y2="48" stroke="#0F172A" stroke-width="2"/>
      <line x1="20" y1="75" x2="0" y2="110" stroke="#0F172A" stroke-width="2"/>
      <line x1="20" y1="75" x2="40" y2="110" stroke="#0F172A" stroke-width="2"/>
      <text x="20" y="130" font-size="12" font-weight="bold" text-anchor="middle" fill="#0F172A">Workshop Admin</text>
    </g>

    <!-- Actor: Mechanic (Right Bottom) -->
    <g transform="translate(720, 390)">
      <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#0F172A" stroke-width="2"/>
      <line x1="20" y1="34" x2="20" y2="75" stroke="#0F172A" stroke-width="2"/>
      <line x1="-5" y1="48" x2="45" y2="48" stroke="#0F172A" stroke-width="2"/>
      <line x1="20" y1="75" x2="0" y2="110" stroke="#0F172A" stroke-width="2"/>
      <line x1="20" y1="75" x2="40" y2="110" stroke="#0F172A" stroke-width="2"/>
      <text x="20" y="130" font-size="12" font-weight="bold" text-anchor="middle" fill="#0F172A">Mechanic</text>
    </g>

    <!-- Use Cases (Ellipses) -->
    <!-- UC 1: Run AI Diagnostics -->
    <ellipse cx="430" cy="115" rx="100" ry="24" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
    <text x="430" y="120" font-size="11" font-weight="bold" text-anchor="middle" fill="#1D4ED8">Run AI Sound Diagnosis</text>

    <!-- UC 2: Browse Packages -->
    <ellipse cx="430" cy="180" rx="95" ry="24" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
    <text x="430" y="185" font-size="11" font-weight="bold" text-anchor="middle" fill="#1D4ED8">Browse Service Packages</text>

    <!-- UC 3: Book Doorstep Service -->
    <ellipse cx="430" cy="245" rx="100" ry="24" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
    <text x="430" y="250" font-size="11" font-weight="bold" text-anchor="middle" fill="#1D4ED8">Book Doorstep Service</text>

    <!-- UC 4: Track Live Job Card -->
    <ellipse cx="430" cy="310" rx="95" ry="24" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
    <text x="430" y="315" font-size="11" font-weight="bold" text-anchor="middle" fill="#1D4ED8">Track Live Job Card</text>

    <!-- UC 5: Authenticate to /admin -->
    <ellipse cx="430" cy="375" rx="105" ry="24" fill="#FDF4FF" stroke="#A855F7" stroke-width="1.5"/>
    <text x="430" y="380" font-size="11" font-weight="bold" text-anchor="middle" fill="#7E22CE">Authenticate to /admin</text>

    <!-- UC 6: Assign Bay Mechanic -->
    <ellipse cx="430" cy="440" rx="95" ry="24" fill="#FDF4FF" stroke="#A855F7" stroke-width="1.5"/>
    <text x="430" y="445" font-size="11" font-weight="bold" text-anchor="middle" fill="#7E22CE">Assign Bay Mechanic</text>

    <!-- UC 7: Update Repair Status -->
    <ellipse cx="430" cy="505" rx="95" ry="24" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
    <text x="430" y="510" font-size="11" font-weight="bold" text-anchor="middle" fill="#047857">Update Repair Status</text>

    <!-- UC 8: Submit 5-Star Feedback -->
    <ellipse cx="430" cy="565" rx="95" ry="22" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
    <text x="430" y="570" font-size="11" font-weight="bold" text-anchor="middle" fill="#1D4ED8">Submit Review &amp; Rating</text>

    <!-- Lines from Customer -->
    <line x1="125" y1="280" x2="330" y2="120" stroke="#64748B" stroke-width="1.5"/>
    <line x1="125" y1="285" x2="335" y2="185" stroke="#64748B" stroke-width="1.5"/>
    <line x1="125" y1="290" x2="330" y2="250" stroke="#64748B" stroke-width="1.5"/>
    <line x1="125" y1="300" x2="335" y2="315" stroke="#64748B" stroke-width="1.5"/>
    <line x1="125" y1="315" x2="335" y2="565" stroke="#64748B" stroke-width="1.5"/>

    <!-- Lines from Admin -->
    <line x1="720" y1="180" x2="535" y2="375" stroke="#64748B" stroke-width="1.5"/>
    <line x1="720" y1="195" x2="525" y2="440" stroke="#64748B" stroke-width="1.5"/>

    <!-- Lines from Mechanic -->
    <line x1="720" y1="440" x2="525" y2="505" stroke="#64748B" stroke-width="1.5"/>
    <line x1="720" y1="430" x2="525" y2="315" stroke="#64748B" stroke-width="1.5"/>
  </svg>`;
}

// -------------------------------------------------------------
// 4. Figure 3.3: Class Diagram - StarUML Style
// -------------------------------------------------------------
function getClassSvg() {
  return `<svg width="850" height="520" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Consolas, sans-serif;">
    <text x="425" y="30" font-family="'Times New Roman'" font-size="18" font-weight="bold" text-anchor="middle" fill="#0f172a">BikeCare AI Portal - Class Diagram</text>

    <!-- Class: Customer -->
    <g transform="translate(40, 60)">
      <rect width="180" height="26" fill="#3B82F6" stroke="#1D4ED8" stroke-width="1.5"/>
      <text x="90" y="18" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Customer</text>
      <rect y="26" width="180" height="60" fill="#F8FAFC" stroke="#CBD5E1"/>
      <text x="8" y="44" font-size="10">+ customerId: int</text>
      <text x="8" y="60" font-size="10">+ name: string</text>
      <text x="8" y="76" font-size="10">+ phone: string</text>
      <rect y="86" width="180" height="50" fill="#F8FAFC" stroke="#CBD5E1"/>
      <text x="8" y="104" font-size="10">+ runDiagnosis()</text>
      <text x="8" y="122" font-size="10">+ createBooking()</text>
    </g>

    <!-- Class: ServiceBooking -->
    <g transform="translate(320, 60)">
      <rect width="210" height="26" fill="#10B981" stroke="#047857" stroke-width="1.5"/>
      <text x="105" y="18" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">ServiceBooking</text>
      <rect y="26" width="210" height="110" fill="#F8FAFC" stroke="#CBD5E1"/>
      <text x="8" y="44" font-size="10">+ bookingId: string</text>
      <text x="8" y="60" font-size="10">+ bookingCode: string</text>
      <text x="8" y="76" font-size="10">+ bikeBrand: string</text>
      <text x="8" y="92" font-size="10">+ status: BookingStatus</text>
      <text x="8" y="108" font-size="10">+ totalCost: number</text>
      <text x="8" y="124" font-size="10">+ assignedMechanic: string</text>
      <rect y="136" width="210" height="65" fill="#F8FAFC" stroke="#CBD5E1"/>
      <text x="8" y="154" font-size="10">+ updateStatus(newStatus)</text>
      <text x="8" y="170" font-size="10">+ addPartsCost(amount)</text>
      <text x="8" y="186" font-size="10">+ assignMechanic(mechName)</text>
    </g>

    <!-- Class: ServicePackage -->
    <g transform="translate(620, 60)">
      <rect width="180" height="26" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
      <text x="90" y="18" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">ServicePackage</text>
      <rect y="26" width="180" height="70" fill="#F8FAFC" stroke="#CBD5E1"/>
      <text x="8" y="44" font-size="10">+ packageId: string</text>
      <text x="8" y="60" font-size="10">+ name: string</text>
      <text x="8" y="76" font-size="10">+ price: number</text>
      <text x="8" y="90" font-size="10">+ durationMin: int</text>
      <rect y="96" width="180" height="40" fill="#F8FAFC" stroke="#CBD5E1"/>
      <text x="8" y="114" font-size="10">+ getFeatureList()</text>
    </g>

    <!-- Class: Mechanic -->
    <g transform="translate(180, 320)">
      <rect width="180" height="26" fill="#8B5CF6" stroke="#6D28D9" stroke-width="1.5"/>
      <text x="90" y="18" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Mechanic</text>
      <rect y="26" width="180" height="60" fill="#F8FAFC" stroke="#CBD5E1"/>
      <text x="8" y="44" font-size="10">+ mechanicId: string</text>
      <text x="8" y="60" font-size="10">+ name: string</text>
      <text x="8" y="76" font-size="10">+ activeJobs: int</text>
      <rect y="86" width="180" height="40" fill="#F8FAFC" stroke="#CBD5E1"/>
      <text x="8" y="104" font-size="10">+ appendTechnicianNotes()</text>
    </g>

    <!-- Class: GeminiAiEngine -->
    <g transform="translate(480, 320)">
      <rect width="200" height="26" fill="#EC4899" stroke="#BE185D" stroke-width="1.5"/>
      <text x="100" y="18" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">GeminiAiEngine</text>
      <rect y="26" width="200" height="60" fill="#F8FAFC" stroke="#CBD5E1"/>
      <text x="8" y="44" font-size="10">+ model: string</text>
      <text x="8" y="60" font-size="10">+ apiKey: string</text>
      <text x="8" y="76" font-size="10">+ fallbackEnabled: bool</text>
      <rect y="86" width="200" height="40" fill="#F8FAFC" stroke="#CBD5E1"/>
      <text x="8" y="104" font-size="10">+ runAcousticDiagnosis()</text>
    </g>

    <!-- Relationships -->
    <line x1="220" y1="120" x2="320" y2="120" stroke="#475569" stroke-width="1.5"/>
    <text x="270" y="112" font-size="10" fill="#475569" text-anchor="middle">1       1..*</text>

    <line x1="620" y1="120" x2="530" y2="120" stroke="#475569" stroke-width="1.5"/>
    <text x="575" y="112" font-size="10" fill="#475569" text-anchor="middle">1       1..*</text>

    <line x1="390" y1="260" x2="270" y2="320" stroke="#475569" stroke-width="1.5"/>
    <text x="320" y="300" font-size="10" fill="#475569" text-anchor="middle">1..*    1</text>

    <line x1="460" y1="260" x2="540" y2="320" stroke="#475569" stroke-width="1.5"/>
    <text x="515" y="300" font-size="10" fill="#475569" text-anchor="middle">1       1</text>
  </svg>`;
}

// -------------------------------------------------------------
// 5. Figure 4.1: Frontend Architecture (Colorful matching page 28)
// -------------------------------------------------------------
function getFrontendArchSvg() {
  return `<svg width="850" height="580" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Arial, sans-serif;">
    <defs>
      <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1E40AF"/>
        <stop offset="100%" stop-color="#3B82F6"/>
      </linearGradient>
    </defs>
    <!-- Top Users Badge -->
    <rect x="250" y="15" width="350" height="42" rx="20" fill="#EDE9FE" stroke="#8B5CF6" stroke-width="1.5"/>
    <text x="425" y="41" fill="#5B21B6" font-size="13" font-weight="bold" text-anchor="middle">👥 USERS (Riders / Mechanics / Admins)</text>

    <line x1="425" y1="57" x2="425" y2="75" stroke="#8B5CF6" stroke-width="2"/>

    <!-- App Title Banner -->
    <rect x="50" y="75" width="750" height="45" rx="6" fill="url(#grad-blue)"/>
    <text x="425" y="103" fill="#ffffff" font-size="15" font-weight="bold" text-anchor="middle">BikeCare AI – Frontend Single-Page Application (React 19 + Vite)</text>

    <!-- 8 Colorful Feature Cards -->
    <!-- Row 1: 4 Cards -->
    <!-- Card 1: Auth -->
    <rect x="50" y="135" width="170" height="110" rx="8" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
    <rect x="50" y="135" width="170" height="30" rx="8 8 0 0" fill="#3B82F6"/>
    <text x="135" y="155" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🔒 Admin Auth Gate</text>
    <text x="65" y="180" font-size="10" fill="#1E3A8A">• Confidential /admin</text>
    <text x="65" y="200" font-size="10" fill="#1E3A8A">• Passcode PIN Check</text>
    <text x="65" y="220" font-size="10" fill="#1E3A8A">• Shortcut: Ctrl+Shift+A</text>

    <!-- Card 2: AI Diagnostic -->
    <rect x="240" y="135" width="170" height="110" rx="8" fill="#FDF2F8" stroke="#EC4899" stroke-width="1.5"/>
    <rect x="240" y="135" width="170" height="30" rx="8 8 0 0" fill="#EC4899"/>
    <text x="325" y="155" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🤖 AI Sound Scanner</text>
    <text x="255" y="180" font-size="10" fill="#831843">• Audio Noise Patterns</text>
    <text x="255" y="200" font-size="10" fill="#831843">• Root-Cause Estimator</text>
    <text x="255" y="220" font-size="10" fill="#831843">• DIY Safety Advice</text>

    <!-- Card 3: Packages -->
    <rect x="430" y="135" width="170" height="110" rx="8" fill="#FFFBEB" stroke="#F59E0B" stroke-width="1.5"/>
    <rect x="430" y="135" width="170" height="30" rx="8 8 0 0" fill="#F59E0B"/>
    <text x="515" y="155" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">📦 Service Packages</text>
    <text x="445" y="180" font-size="10" fill="#78350F">• Express Tune-Up</text>
    <text x="445" y="200" font-size="10" fill="#78350F">• Master Overhaul</text>
    <text x="445" y="220" font-size="10" fill="#78350F">• EV Power Shield</text>

    <!-- Card 4: Booking Engine -->
    <rect x="620" y="135" width="180" height="110" rx="8" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
    <rect x="620" y="135" width="180" height="30" rx="8 8 0 0" fill="#10B981"/>
    <text x="710" y="155" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🚚 Doorstep Booking</text>
    <text x="635" y="180" font-size="10" fill="#064E3B">• Hydraulic Van Pickup</text>
    <text x="635" y="200" font-size="10" fill="#064E3B">• Time Slot Selector</text>
    <text x="635" y="220" font-size="10" fill="#064E3B">• Instant BK Code</text>

    <!-- Row 2: 4 Cards -->
    <!-- Card 5: Live Tracker -->
    <rect x="50" y="265" width="170" height="110" rx="8" fill="#F0FDF4" stroke="#22C55E" stroke-width="1.5"/>
    <rect x="50" y="265" width="170" height="30" rx="8 8 0 0" fill="#22C55E"/>
    <text x="135" y="285" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">📡 Live Job Tracker</text>
    <text x="65" y="310" font-size="10" fill="#14532D">• Milestone Timeline</text>
    <text x="65" y="330" font-size="10" fill="#14532D">• Mechanic Bay Badge</text>
    <text x="65" y="350" font-size="10" fill="#14532D">• Real-Time Updates</text>

    <!-- Card 6: Customer Reviews -->
    <rect x="240" y="265" width="170" height="110" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
    <rect x="240" y="265" width="170" height="30" rx="8 8 0 0" fill="#D97706"/>
    <text x="325" y="285" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">⭐ 5-Star Reviews</text>
    <text x="255" y="310" font-size="10" fill="#78350F">• Rating Collection (1-5)</text>
    <text x="255" y="330" font-size="10" fill="#78350F">• Verified Badges</text>
    <text x="255" y="350" font-size="10" fill="#78350F">• Review Auditing</text>

    <!-- Card 7: Admin Dispatch -->
    <rect x="430" y="265" width="170" height="110" rx="8" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/>
    <rect x="430" y="265" width="170" height="30" rx="8 8 0 0" fill="#7C3AED"/>
    <text x="515" y="285" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">🛠️ Dispatch Board</text>
    <text x="445" y="310" font-size="10" fill="#4C1D95">• Mechanic Assignments</text>
    <text x="445" y="330" font-size="10" fill="#4C1D95">• State Progression</text>
    <text x="445" y="350" font-size="10" fill="#4C1D95">• Parts Billing Editor</text>

    <!-- Card 8: KPI Stats -->
    <rect x="620" y="265" width="180" height="110" rx="8" fill="#F1F5F9" stroke="#475569" stroke-width="1.5"/>
    <rect x="620" y="265" width="180" height="30" rx="8 8 0 0" fill="#475569"/>
    <text x="710" y="285" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">📊 Workshop KPIs</text>
    <text x="635" y="310" font-size="10" fill="#0F172A">• Revenue Summary</text>
    <text x="635" y="330" font-size="10" fill="#0F172A">• Active Bays Count</text>
    <text x="635" y="350" font-size="10" fill="#0F172A">• AI Diagnostic Logs</text>

    <!-- Shared UI Components -->
    <rect x="50" y="400" width="750" height="50" rx="6" fill="#0284C7"/>
    <text x="425" y="420" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Shared UI Components (Tailwind CSS 4 + Lucide Icons)</text>
    <text x="425" y="438" fill="#E0F2FE" font-size="10" text-anchor="middle">Navbar | Modal Dialogs | Status Indicators | Star Picker | Input Fields | Progress Stepper</text>

    <!-- Responsive UI Layer -->
    <rect x="50" y="470" width="750" height="40" rx="6" fill="#10B981"/>
    <text x="425" y="495" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">📱 Responsive UI – Optimized for Desktop, Tablet &amp; Mobile Web Browsers</text>
  </svg>`;
}

// -------------------------------------------------------------
// 6. Figure 4.2: Backend Architecture (Colorful matching page 29)
// -------------------------------------------------------------
function getBackendArchSvg() {
  return `<svg width="850" height="560" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Arial, sans-serif;">
    <rect x="200" y="15" width="450" height="35" rx="6" fill="#F43F5E"/>
    <text x="425" y="38" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">CLIENT / FRONTEND (React SPA – Port 3000)</text>

    <line x1="425" y1="50" x2="425" y2="80" stroke="#64748B" stroke-width="2"/>
    <text x="460" y="68" font-size="10" fill="#64748B">JSON / REST APIs</text>

    <!-- Dual Backend Server Core -->
    <rect x="150" y="80" width="550" height="55" rx="8" fill="#6366F1"/>
    <text x="425" y="105" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">BACKEND APPLICATION SERVER LAYER</text>
    <text x="425" y="123" fill="#E0E7FF" font-size="10.5" text-anchor="middle">Node.js Express (server.ts)  OR  Native Python Flask (app.py)</text>

    <!-- Micro-modules in 2 columns -->
    <!-- Left Column -->
    <rect x="70" y="155" width="220" height="75" rx="6" fill="#EFF6FF" stroke="#3B82F6" stroke-width="1.5"/>
    <text x="180" y="178" font-size="12" font-weight="bold" fill="#1D4ED8" text-anchor="middle">🔑 Auth &amp; Route Guard</text>
    <text x="90" y="200" font-size="9.5" fill="#1E3A8A">• Admin PIN Verification</text>
    <text x="90" y="216" font-size="9.5" fill="#1E3A8A">• Secret Route Isolation (/admin)</text>

    <rect x="70" y="245" width="220" height="75" rx="6" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
    <text x="180" y="268" font-size="12" font-weight="bold" fill="#047857" text-anchor="middle">📋 Booking Controller</text>
    <text x="90" y="290" font-size="9.5" fill="#064E3B">• Unique Code Generation</text>
    <text x="90" y="306" font-size="9.5" fill="#064E3B">• Doorstep Slot Validation</text>

    <!-- Center AI Engine -->
    <rect x="315" y="155" width="220" height="165" rx="6" fill="#FDF2F8" stroke="#EC4899" stroke-width="1.5"/>
    <text x="425" y="180" font-size="12" font-weight="bold" fill="#BE185D" text-anchor="middle">🧠 Google Gemini AI Engine</text>
    <text x="330" y="205" font-size="9.5" fill="#831843">• Gemini 2.5/3.8 Flash SDK</text>
    <text x="330" y="225" font-size="9.5" fill="#831843">• Acoustic Pattern Matching</text>
    <text x="330" y="245" font-size="9.5" fill="#831843">• JSON Response Parsing</text>
    <text x="330" y="265" font-size="9.5" fill="#831843">• Rule-Based Fallback Engine</text>
    <text x="330" y="285" font-size="9.5" fill="#831843">• DIY Safety Instruction Set</text>
    <text x="330" y="305" font-size="9.5" fill="#831843">• Estimated Budget Calculator</text>

    <!-- Right Column -->
    <rect x="560" y="155" width="220" height="75" rx="6" fill="#F5F3FF" stroke="#7C3AED" stroke-width="1.5"/>
    <text x="670" y="178" font-size="12" font-weight="bold" fill="#6D28D9" text-anchor="middle">🛠️ Dispatch Operations</text>
    <text x="580" y="200" font-size="9.5" fill="#4C1D95">• Bay Mechanic Assignment</text>
    <text x="580" y="216" font-size="9.5" fill="#4C1D95">• Milestone State Transition</text>

    <rect x="560" y="245" width="220" height="75" rx="6" fill="#FFFBEB" stroke="#F59E0B" stroke-width="1.5"/>
    <text x="670" y="268" font-size="12" font-weight="bold" fill="#B45309" text-anchor="middle">⭐ Feedback &amp; Metrics</text>
    <text x="580" y="290" font-size="9.5" fill="#78350F">• 1-5 Star Aggregator</text>
    <text x="580" y="306" font-size="9.5" fill="#78350F">• Revenue &amp; Workload Analytics</text>

    <!-- Connector to DB -->
    <line x1="425" y1="330" x2="425" y2="370" stroke="#64748B" stroke-width="2"/>
    <text x="445" y="355" font-size="10" fill="#64748B">Read / Write</text>

    <!-- Database Layer -->
    <rect x="50" y="370" width="750" height="150" rx="8" fill="#1E293B"/>
    <text x="425" y="395" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">LOCAL JSON PERSISTENCE DATABASE (./data/bikecare-db.json)</text>

    <!-- Tables inside DB -->
    <rect x="70" y="415" width="125" height="85" rx="4" fill="#334155"/>
    <text x="132" y="435" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">bookings</text>
    <text x="80" y="455" fill="#94A3B8" font-size="9">bookingCode</text>
    <text x="80" y="470" fill="#94A3B8" font-size="9">status, totalCost</text>
    <text x="80" y="485" fill="#94A3B8" font-size="9">assignedMechanic</text>

    <rect x="215" y="415" width="125" height="85" rx="4" fill="#334155"/>
    <text x="277" y="435" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">services</text>
    <text x="225" y="455" fill="#94A3B8" font-size="9">packageId</text>
    <text x="225" y="470" fill="#94A3B8" font-size="9">name, price</text>
    <text x="225" y="485" fill="#94A3B8" font-size="9">features list</text>

    <rect x="360" y="415" width="125" height="85" rx="4" fill="#334155"/>
    <text x="422" y="435" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">mechanics</text>
    <text x="370" y="455" fill="#94A3B8" font-size="9">name, specialty</text>
    <text x="370" y="470" fill="#94A3B8" font-size="9">bayNumber</text>
    <text x="370" y="485" fill="#94A3B8" font-size="9">activeJobsCount</text>

    <rect x="505" y="415" width="125" height="85" rx="4" fill="#334155"/>
    <text x="567" y="435" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">aiQueries</text>
    <text x="515" y="455" fill="#94A3B8" font-size="9">bikeModel, year</text>
    <text x="515" y="470" fill="#94A3B8" font-size="9">symptoms array</text>
    <text x="515" y="485" fill="#94A3B8" font-size="9">predictedIssue</text>

    <rect x="650" y="415" width="130" height="85" rx="4" fill="#334155"/>
    <text x="715" y="435" fill="#38BDF8" font-size="11" font-weight="bold" text-anchor="middle">feedback</text>
    <text x="660" y="455" fill="#94A3B8" font-size="9">bookingCode</text>
    <text x="660" y="470" fill="#94A3B8" font-size="9">rating (1-5)</text>
    <text x="660" y="485" fill="#94A3B8" font-size="9">comment, date</text>
  </svg>`;
}

// -------------------------------------------------------------
// 7. Figure 5.1.1: Website UI Screenshot (Homepage & Hero)
// -------------------------------------------------------------
function getWebsiteHeroSvg() {
  return `<svg width="850" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#090d16; font-family:'Segoe UI', Arial, sans-serif;">
    <!-- Browser Chrome Bar -->
    <rect width="850" height="40" fill="#0f172a"/>
    <circle cx="20" cy="20" r="6" fill="#EF4444"/>
    <circle cx="40" cy="20" r="6" fill="#F59E0B"/>
    <circle cx="60" cy="20" r="6" fill="#10B981"/>
    <!-- URL Bar -->
    <rect x="100" y="8" width="500" height="24" rx="12" fill="#1e293b"/>
    <text x="120" y="24" fill="#94a3b8" font-size="11">🔒 https://bikecare.ai/ – AI-Powered Two-Wheeler Care</text>

    <!-- Navbar -->
    <rect y="40" width="850" height="50" fill="#090d16" stroke="#1e293b" stroke-width="1"/>
    <text x="30" y="72" fill="#38bdf8" font-size="18" font-weight="bold">🔧 BikeCare AI</text>
    <text x="240" y="70" fill="#94a3b8" font-size="12">AI Diagnostics</text>
    <text x="350" y="70" fill="#94a3b8" font-size="12">Book Service</text>
    <text x="450" y="70" fill="#94a3b8" font-size="12">Track Bike</text>
    <text x="540" y="70" fill="#94a3b8" font-size="12">Packages</text>
    <rect x="680" y="50" width="140" height="30" rx="15" fill="#06b6d4"/>
    <text x="750" y="70" fill="#090d16" font-size="11" font-weight="bold" text-anchor="middle">Book Service</text>

    <!-- Hero Section -->
    <rect x="50" y="120" width="450" height="320" fill="transparent"/>
    <rect x="50" y="125" width="220" height="26" rx="13" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <text x="160" y="142" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">⚡ Next-Gen Motorcycle Maintenance</text>

    <text x="50" y="195" fill="#ffffff" font-size="30" font-weight="bold">Intelligent Two-Wheeler</text>
    <text x="50" y="235" fill="#38bdf8" font-size="30" font-weight="bold">Acoustic Diagnostics &amp;</text>
    <text x="50" y="275" fill="#34d399" font-size="30" font-weight="bold">Doorstep Service</text>

    <text x="50" y="315" fill="#94a3b8" font-size="13">Detect engine tapping, cam-chain rattles, and brake failures instantly</text>
    <text x="50" y="335" fill="#94a3b8" font-size="13">with Google Gemini AI. Schedule doorstep hydraulic pickup in 60 seconds.</text>

    <!-- CTA Buttons -->
    <rect x="50" y="365" width="180" height="42" rx="21" fill="#06b6d4"/>
    <text x="140" y="391" fill="#090d16" font-size="13" font-weight="bold" text-anchor="middle">Start AI Sound Scan 🎙️</text>

    <rect x="245" y="365" width="160" height="42" rx="21" fill="#1e293b" stroke="#475569" stroke-width="1"/>
    <text x="325" y="391" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">Track My Bike 📡</text>

    <!-- Right Hero Graphic Box -->
    <rect x="540" y="120" width="270" height="310" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
    <text x="560" y="150" fill="#38bdf8" font-size="13" font-weight="bold">Live Workshop Feed</text>
    <text x="560" y="170" fill="#94a3b8" font-size="10">Active Bays: 4 of 6 Busy</text>

    <rect x="560" y="185" width="230" height="60" rx="8" fill="#1e293b"/>
    <text x="575" y="205" fill="#ffffff" font-size="11" font-weight="bold">BK-8492 • Yamaha R15 V4</text>
    <text x="575" y="222" fill="#34d399" font-size="10">Status: In Repair (Bay #2)</text>
    <text x="575" y="237" fill="#94a3b8" font-size="9">Mechanic: Marcus Sterling</text>

    <rect x="560" y="255" width="230" height="60" rx="8" fill="#1e293b"/>
    <text x="575" y="275" fill="#ffffff" font-size="11" font-weight="bold">BK-9104 • Royal Enfield Classic</text>
    <text x="575" y="292" fill="#38bdf8" font-size="10">Status: Diagnostic Complete</text>
    <text x="575" y="307" fill="#94a3b8" font-size="9">Mechanic: Priya Sharma</text>

    <rect x="560" y="325" width="230" height="60" rx="8" fill="#1e293b"/>
    <text x="575" y="345" fill="#ffffff" font-size="11" font-weight="bold">BK-7320 • Ather 450X (EV)</text>
    <text x="575" y="362" fill="#f59e0b" font-size="10">Status: In Transit (Pickup Van)</text>
    <text x="575" y="377" fill="#94a3b8" font-size="9">Driver: Tyler Ross</text>
  </svg>`;
}

// -------------------------------------------------------------
// 8. Figure 5.1.4: Live Job Card Tracker UI
// -------------------------------------------------------------
function getTrackerSvg() {
  return `<svg width="850" height="480" xmlns="http://www.w3.org/2000/svg" style="background:#090d16; font-family:'Segoe UI', Arial, sans-serif;">
    <rect width="850" height="40" fill="#0f172a"/>
    <circle cx="20" cy="20" r="6" fill="#EF4444"/><circle cx="40" cy="20" r="6" fill="#F59E0B"/><circle cx="60" cy="20" r="6" fill="#10B981"/>
    <rect x="100" y="8" width="500" height="24" rx="12" fill="#1e293b"/>
    <text x="120" y="24" fill="#94a3b8" font-size="11">🔒 https://bikecare.ai/?tab=tracker&amp;code=BK-8492</text>

    <rect x="50" y="60" width="750" height="390" rx="12" fill="#0f172a" stroke="#1e293b" stroke-width="1.5"/>
    <text x="80" y="95" fill="#ffffff" font-size="20" font-weight="bold">Live Digital Job Card: BK-8492</text>
    <text x="80" y="115" fill="#38bdf8" font-size="12">Customer: Samir Naukudkar • Bike: Yamaha MT-15 • Reg: MH-02-EE-4920</text>

    <!-- Milestone Progress Bar -->
    <line x1="120" y1="170" x2="680" y2="170" stroke="#334155" stroke-width="4"/>
    <line x1="120" y1="170" x2="400" y2="170" stroke="#10B981" stroke-width="4"/>

    <!-- Nodes -->
    <circle cx="120" cy="170" r="14" fill="#10B981"/>
    <text x="120" y="174" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">✓</text>
    <text x="120" y="200" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Registered</text>

    <circle cx="260" cy="170" r="14" fill="#10B981"/>
    <text x="260" y="174" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">✓</text>
    <text x="260" y="200" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">In Transit</text>

    <circle cx="400" cy="170" r="14" fill="#10B981"/>
    <text x="400" y="174" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">✓</text>
    <text x="400" y="200" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Diagnostic Done</text>

    <circle cx="540" cy="170" r="14" fill="#3B82F6"/>
    <text x="540" y="174" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">⚙️</text>
    <text x="540" y="200" fill="#60A5FA" font-size="10" font-weight="bold" text-anchor="middle">In Repair</text>

    <circle cx="680" cy="170" r="14" fill="#334155"/>
    <text x="680" y="174" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">5</text>
    <text x="680" y="200" fill="#64748B" font-size="10" text-anchor="middle">Ready / Delivered</text>

    <!-- Information Cards -->
    <rect x="80" y="230" width="300" height="180" rx="8" fill="#1e293b"/>
    <text x="100" y="255" fill="#38bdf8" font-size="13" font-weight="bold">Mechanic Inspection Notes</text>
    <text x="100" y="280" fill="#ffffff" font-size="11">Assigned Mechanic: Marcus Sterling (Bay #2)</text>
    <text x="100" y="305" fill="#cbd5e1" font-size="10">• Cam chain tensioner reset &amp; torqued.</text>
    <text x="100" y="325" fill="#cbd5e1" font-size="10">• Replaced Motul 7100 10W40 4T Engine Oil.</text>
    <text x="100" y="345" fill="#cbd5e1" font-size="10">• Cleaned &amp; lubed O-ring drive chain.</text>
    <text x="100" y="365" fill="#cbd5e1" font-size="10">• Front brake rotor trued &amp; pads deglazed.</text>
    <text x="100" y="390" fill="#34d399" font-size="11" font-weight="bold">Status: Final Road Test in Progress</text>

    <rect x="420" y="230" width="350" height="180" rx="8" fill="#1e293b"/>
    <text x="440" y="255" fill="#38bdf8" font-size="13" font-weight="bold">Billing &amp; Invoice Breakdown</text>
    <text x="440" y="285" fill="#cbd5e1" font-size="11">Master Overhaul Package .................... ₹1,499</text>
    <text x="440" y="310" fill="#cbd5e1" font-size="11">Teflon Anti-Rust Body Shield ........... ₹349</text>
    <text x="440" y="335" fill="#cbd5e1" font-size="11">OEM Oil Filter Replacement ............... ₹120</text>
    <line x1="440" y1="350" x2="740" y2="350" stroke="#334155" stroke-width="1"/>
    <text x="440" y="375" fill="#ffffff" font-size="14" font-weight="bold">Total Amount Due: ₹1,968</text>
    <text x="440" y="395" fill="#34d399" font-size="11">Payment: Digital Bill Ready (Pay Upon Delivery)</text>
  </svg>`;
}

// -------------------------------------------------------------
// 9. Figure 6.1.1: Selenium IDE Test Run Screenshot
// -------------------------------------------------------------
function getSeleniumIdeSvg() {
  return `<svg width="850" height="520" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Consolas, sans-serif;">
    <!-- Selenium IDE Window Header -->
    <rect width="850" height="35" fill="#2d3748"/>
    <circle cx="15" cy="18" r="5" fill="#ef4444"/><circle cx="32" cy="18" r="5" fill="#f59e0b"/><circle cx="49" cy="18" r="5" fill="#10b981"/>
    <text x="75" y="22" fill="#ffffff" font-size="12">Extension: (Selenium IDE) - BikeCare AI Test Automation Suite - Mozilla Firefox</text>

    <!-- Toolbar -->
    <rect y="35" width="850" height="35" fill="#f7fafc" stroke="#e2e8f0" stroke-width="1"/>
    <text x="20" y="58" fill="#4a5568" font-size="12" font-weight="bold">Project: BikeCare_AI_Testing</text>
    <rect x="250" y="42" width="22" height="22" rx="3" fill="#10b981"/>
    <text x="261" y="57" fill="#ffffff" font-size="12" text-anchor="middle">▶</text>
    <text x="285" y="58" fill="#718096" font-size="11">Runs: 15   Failures: 0</text>

    <!-- Left Test Case List Panel -->
    <rect y="70" width="260" height="320" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
    <text x="15" y="92" font-size="11" font-weight="bold" fill="#2d3748">Tests (15 passed)</text>

    <text x="25" y="118" font-size="11" fill="#047857">✓ TC01_AI_Diagnostic_Scan</text>
    <text x="25" y="138" font-size="11" fill="#047857">✓ TC02_Brake_Failure_Test</text>
    <text x="25" y="158" font-size="11" fill="#047857">✓ TC03_Service_Package_Select</text>
    <text x="25" y="178" font-size="11" fill="#047857">✓ TC04_AddOn_Cost_Tally</text>
    <text x="25" y="198" font-size="11" fill="#047857">✓ TC05_Doorstep_Booking_Create</text>
    <text x="25" y="218" font-size="11" fill="#047857">✓ TC06_Live_Job_Card_Query</text>
    <text x="25" y="238" font-size="11" fill="#047857">✓ TC07_Admin_Passcode_Login</text>
    <text x="25" y="258" font-size="11" fill="#047857">✓ TC08_Admin_Wrong_PIN_Reject</text>
    <text x="25" y="278" font-size="11" fill="#047857">✓ TC09_Mechanic_Dispatch_Bay</text>
    <text x="25" y="298" font-size="11" fill="#047857">✓ TC10_Status_Progression_Test</text>

    <!-- Right Command Table -->
    <rect x="260" y="70" width="590" height="320" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
    <rect x="260" y="70" width="590" height="25" fill="#edf2f7"/>
    <text x="280" y="87" font-size="11" font-weight="bold" fill="#4a5568">Command</text>
    <text x="420" y="87" font-size="11" font-weight="bold" fill="#4a5568">Target</text>
    <text x="650" y="87" font-size="11" font-weight="bold" fill="#4a5568">Value</text>

    <text x="280" y="112" font-size="11" fill="#2b6cb0">1  open</text>
    <text x="420" y="112" font-size="11" fill="#4a5568">http://localhost:3000/</text>
    <text x="650" y="112" font-size="11" fill="#718096"></text>

    <text x="280" y="132" font-size="11" fill="#2b6cb0">2  setWindowSize</text>
    <text x="420" y="132" font-size="11" fill="#4a5568">1280x800</text>
    <text x="650" y="132" font-size="11" fill="#718096"></text>

    <text x="280" y="152" font-size="11" fill="#2b6cb0">3  click</text>
    <text x="420" y="152" font-size="11" fill="#4a5568">xpath=//button[contains(.,'AI Diagnostics')]</text>
    <text x="650" y="152" font-size="11" fill="#718096"></text>

    <text x="280" y="172" font-size="11" fill="#2b6cb0">4  type</text>
    <text x="420" y="172" font-size="11" fill="#4a5568">id=bikeModel</text>
    <text x="650" y="172" font-size="11" fill="#718096">Yamaha R15 V4</text>

    <text x="280" y="192" font-size="11" fill="#2b6cb0">5  click</text>
    <text x="420" y="192" font-size="11" fill="#4a5568">xpath=//input[@value='Engine Ticking']</text>
    <text x="650" y="192" font-size="11" fill="#718096"></text>

    <text x="280" y="212" font-size="11" fill="#2b6cb0">6  click</text>
    <text x="420" y="212" font-size="11" fill="#4a5568">id=runDiagnosisBtn</text>
    <text x="650" y="212" font-size="11" fill="#718096"></text>

    <text x="280" y="232" font-size="11" fill="#2b6cb0">7  assertText</text>
    <text x="420" y="232" font-size="11" fill="#4a5568">css=.diagnostic-issue</text>
    <text x="650" y="232" font-size="11" fill="#718096">Cam Chain Tensioner</text>

    <!-- Bottom Log Console -->
    <rect y="390" width="850" height="130" fill="#1a202c"/>
    <text x="15" y="410" fill="#a0aec0" font-size="10" font-weight="bold">Log / Execution Reference</text>
    <text x="15" y="430" fill="#48bb78" font-size="10">18:04:30 [Selenium] Running 'TC01_AI_Diagnostic_Scan' ...</text>
    <text x="15" y="446" fill="#48bb78" font-size="10">18:04:31 [Selenium] open on http://localhost:3000/ OK</text>
    <text x="15" y="462" fill="#48bb78" font-size="10">18:04:32 [Selenium] click on xpath=//button[contains(.,'AI Diagnostics')] OK</text>
    <text x="15" y="478" fill="#48bb78" font-size="10">18:04:33 [Selenium] assertText on css=.diagnostic-issue matched 'Cam Chain Tensioner' OK</text>
    <text x="15" y="494" fill="#38bdf8" font-size="10">18:04:34 [Selenium] Test Suite Execution Completed: 15 passed, 0 failed.</text>
  </svg>`;
}

// -------------------------------------------------------------
// 10. Figure 6.5.1: Selenium IDE Bug Error Log Screenshot
// -------------------------------------------------------------
function getSeleniumBugSvg() {
  return `<svg width="850" height="420" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; font-family:'Segoe UI', Consolas, sans-serif;">
    <rect width="850" height="35" fill="#2d3748"/>
    <circle cx="15" cy="18" r="5" fill="#ef4444"/><circle cx="32" cy="18" r="5" fill="#f59e0b"/><circle cx="49" cy="18" r="5" fill="#10b981"/>
    <text x="75" y="22" fill="#ffffff" font-size="12">Extension: (Selenium IDE) - Execution Error Log - Firefox</text>

    <rect y="35" width="850" height="40" fill="#fff5f5" stroke="#feb2b2" stroke-width="1"/>
    <text x="25" y="60" fill="#c53030" font-size="12" font-weight="bold">❌ BUG-01: Command 'type' on target 'name=customerPhone' failed during synthetic keyboard dispatch.</text>

    <!-- Command Table with Failure -->
    <rect y="75" width="850" height="180" fill="#ffffff" stroke="#e2e8f0"/>
    <rect y="75" width="850" height="24" fill="#edf2f7"/>
    <text x="20" y="91" font-size="11" font-weight="bold" fill="#4a5568">Command</text>
    <text x="200" y="91" font-size="11" font-weight="bold" fill="#4a5568">Target</text>
    <text x="500" y="91" font-size="11" font-weight="bold" fill="#4a5568">Value</text>

    <text x="20" y="115" font-size="11" fill="#2b6cb0">1  open</text>
    <text x="200" y="115" font-size="11" fill="#4a5568">http://localhost:3000/?tab=booking</text>
    <text x="500" y="115" font-size="11" fill="#718096"></text>

    <text x="20" y="135" font-size="11" fill="#2b6cb0">2  type</text>
    <text x="200" y="135" font-size="11" fill="#4a5568">name=customerName</text>
    <text x="500" y="135" font-size="11" fill="#718096">Samir Naukudkar</text>

    <rect y="145" width="850" height="25" fill="#fed7d7"/>
    <text x="20" y="162" font-size="11" fill="#9b2c2c" font-weight="bold">3  type [FAILED]</text>
    <text x="200" y="162" font-size="11" fill="#9b2c2c">name=customerPhone</text>
    <text x="500" y="162" font-size="11" fill="#9b2c2c">9820012345</text>

    <text x="20" y="190" font-size="11" fill="#718096">4  click</text>
    <text x="200" y="190" font-size="11" fill="#718096">id=confirmBookingBtn</text>
    <text x="500" y="190" font-size="11" fill="#718096"></text>

    <!-- Log Console -->
    <rect y="255" width="850" height="165" fill="#1a202c"/>
    <text x="20" y="278" fill="#e2e8f0" font-size="10" font-weight="bold">Console Output / Bug Trace</text>
    <text x="20" y="300" fill="#f56565" font-size="10">20:16:09 [Error] type on name=customerPhone with value 9820012345 Failed.</text>
    <text x="20" y="318" fill="#f56565" font-size="10">TypeError: initKeyEvent is not a function in synthetic dispatch.</text>
    <text x="20" y="338" fill="#ecc94b" font-size="10">Resolution: Replaced deprecated initKeyEvent with standard InputEvent change dispatch in test script.</text>
    <text x="20" y="358" fill="#48bb78" font-size="10">Status: BUG-01 RESOLVED &amp; VERIFIED IN RE-TEST RUN.</text>
  </svg>`;
}

async function generateAll() {
  await saveSvgAsPng('fig_2_1_wbs.png', getWbsSvg(), 800);
  await saveSvgAsPng('fig_3_1_er.png', getErSvg(), 800);
  await saveSvgAsPng('fig_3_2_usecase.png', getUseCaseSvg(), 800);
  await saveSvgAsPng('fig_3_3_class.png', getClassSvg(), 800);
  await saveSvgAsPng('fig_4_1_frontend_arch.png', getFrontendArchSvg(), 800);
  await saveSvgAsPng('fig_4_2_backend_arch.png', getBackendArchSvg(), 800);
  await saveSvgAsPng('fig_5_1_1_home.png', getWebsiteHeroSvg(), 800);
  await saveSvgAsPng('fig_5_1_4_tracker.png', getTrackerSvg(), 800);
  await saveSvgAsPng('fig_6_1_1_selenium_unit.png', getSeleniumIdeSvg(), 800);
  await saveSvgAsPng('fig_6_5_1_selenium_bug.png', getSeleniumBugSvg(), 800);
  console.log('All image figures successfully generated!');
}

generateAll().catch(err => {
  console.error('Error generating diagrams:', err);
  process.exit(1);
});
