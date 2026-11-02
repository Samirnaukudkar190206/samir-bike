function renderChapter3(ctx) {
  const { doc, addH1, addH2, addH3, addP, addBullet, addFigure, addTable } = ctx;

  // =========================================================================
  // PAGE 18: CHAPTER 3: SYSTEM MODELING & UML OVERVIEW (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH1('Chapter 3: System Modeling & StarUML Diagrams');
  addH2('3.1 Overview of Unified Modeling Language (UML)');
  addP('Visual modeling serves as the indispensable blueprint of modern software engineering. By employing the Unified Modeling Language (OMG UML 2.5 standard), complex distributed architectures, object interactions, behavioral states, and physical deployment topologies can be modeled rigorously before writing executable code.');
  addP('In BikeCare AI, system modeling was conducted using StarUML 6.0, an industry-standard visual modeling platform. The modeling suite encompasses two foundational perspectives:');
  addBullet('1. Structural Modeling', 'Captures the static configuration of the system, including data entities, relational cardinalities, object-oriented class hierarchies, component boundaries, and physical execution nodes (ER Diagram, Class Diagram, Deployment Diagram).');
  addBullet('2. Behavioral & Dynamic Modeling', 'Captures runtime interactions, event sequencing, actor boundaries, and state transitions across asynchronous client-server lifecycles (Use Case Diagram, Sequence Diagram, Activity Diagram).');
  addH2('3.2 The "4+1" Architectural View Model');
  addP('To ensure that every stakeholder perspective is rigorously addressed, system modeling adheres to Philippe Kruchten\'s renowned "4+1" Architectural View Model:');
  addBullet('Use Case View (+1)', 'Captures end-user functionality and system boundaries from the perspective of motorcycle riders and workshop staff.');
  addBullet('Logical View', 'Models domain abstractions, class hierarchies, and object collaborations via StarUML Class and CRC representations.');
  addBullet('Process View', 'Captures concurrency, asynchronous message dispatching, and state machine lifecycles via Sequence and Activity diagrams.');
  addBullet('Development View', 'Organizes software package hierarchies, TypeScript interfaces, and modular component boundaries.');
  addBullet('Physical View', 'Maps software runtime artifacts onto execution hardware nodes and communication protocols via the Deployment diagram.');
  addH3('3.3 System Actors and Boundary Definition');
  addBullet('Customer / Motorcycle Rider (Primary External Actor)', 'Interacts through web browsers to submit mechanical symptoms, receive acoustic triage reports, select maintenance packages, and inspect live job card progress.');
  addBullet('Workshop Bay Mechanic (Internal Operational Actor)', 'Interacts with active job cards to record physical vehicle inspection notes, register extra parts, and transition job card status flags.');
  addBullet('Workshop Service Admin (Privileged Internal Actor)', 'Operates the /admin operations console to oversee workshop gross revenue, monitor bay capacity, and assign incoming bookings to mechanics.');
  addBullet('Google Gemini AI (External Service Actor)', 'Autonomous multimodal reasoning cloud service executing natural language parsing and acoustic frequency fault matching via RESTful JSON APIs.');

  // =========================================================================
  // PAGE 19: 3.2 STARUML ENTITY-RELATIONSHIP (ER) DIAGRAM (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('3.2 StarUML Entity-Relationship (ER) Diagram');
  addP('The Entity-Relationship model conceptualizes the persistent data domain, defining entity collections, primary keys, and foreign key relationships across five core domain entities:');
  addFigure('fig_3_1_er.png', 'Figure 3.1: StarUML Entity-Relationship (ER) Diagram', 200);

  addH3('Relational Cardinality & Normalization Analysis');
  addBullet('Customer to Bookings (1 : N)', 'A single motorcycle customer can initiate multiple service bookings across their vehicle ownership lifecycle, while each booking belongs strictly to one customer profile.');
  addBullet('Booking to Mechanic (N : 1)', 'Multiple active service bookings can be assigned to a single certified workshop mechanic (Marcus, Priya, Tyler, Sofia), while each job card has exactly one lead technician.');
  addBullet('Booking to Diagnostic Report (1 : 1)', 'Each service booking optionally associates with one AI acoustic diagnostic report, transferring identified mechanical faults into the initial repair order.');
  addBullet('Booking to Customer Review (1 : 1)', 'Upon vehicle delivery, each booking allows exactly one verified 1-to-5 star rating and feedback tag entry.');

  const erRows = [
    ['Customers', 'customer_id (PK)', 'phone_number, full_name, email, address', '1 : N with Bookings'],
    ['Bookings', 'booking_id (PK), booking_code', 'bike_model, reg_no, package_tier, status, cost', 'N : 1 Mechanic, 1 : 1 Review'],
    ['Mechanics', 'mechanic_id (PK)', 'name, specialization, active_jobs, phone', '1 : N with Bookings'],
    ['Diagnostics', 'report_id (PK)', 'fault, severity, diy_checks, estimated_budget', '1 : 1 with Bookings'],
    ['Reviews', 'review_id (PK)', 'booking_code (FK), rating, comment, tags', '1 : 1 with Bookings']
  ];
  addTable(['Entity Collection', 'Primary / Unique Key', 'Core Attributes & Telemetry Fields', 'Cardinality Mapping'], erRows, [95, 110, 185, 100], 11);

  doc.moveDown(0.12);
  addP('Database Normalization: The relational schema adheres strictly to Third Normal Form (3NF). All transitive and partial dependencies have been eliminated, ensuring atomic column definitions, distinct primary keys, and guaranteed referential integrity.');

  // =========================================================================
  // PAGE 20: 3.3 STARUML USE CASE DIAGRAM & ACTOR MATRIX (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('3.3 StarUML Use Case Diagram & Actor Matrix');
  addP('The Use Case model formally demarcates functional system boundaries, mapping primary and secondary actors to specific operational transactions:');
  addFigure('fig_3_2_usecase.png', 'Figure 3.2: StarUML Use Case Diagram & System Boundaries', 200);

  addH3('Core Use Case Catalog & Relationship Semantics');
  addBullet('UC-01: Run AI Sound & Symptom Diagnostic Scan', 'Primary Actor: Rider. Evaluates symptoms and sound tags via Gemini API, with <<extend>> relationship to Heuristic Fallback Engine upon network failure.');
  addBullet('UC-02: Book Doorstep Service Package', 'Primary Actor: Rider. Captures bike specifications, address, and selected maintenance tiers, with <<include>> Calculate Package & Addon Pricing.');
  addBullet('UC-03: Track Live Job Card Milestones', 'Primary Actor: Rider. Queries live database by booking code (BK-XXXX) to inspect current status and technician findings.');
  addBullet('UC-04: Dispatch Mechanic to Job Card', 'Primary Actor: Service Admin. Assigns available certified mechanics through the /admin operations console.');
  addBullet('UC-05: Update Job Card Status & Add Parts', 'Primary Actor: Bay Mechanic. Modifies repair milestones and appends extra replacement parts costs.');
  addBullet('UC-06: Submit Verified Feedback Review', 'Primary Actor: Rider. Submits star ratings and feedback tags for completed bookings.');

  const ucActorRows = [
    ['Customer / Rider', 'UC-01 (Run Diagnostics), UC-02 (Book Package), UC-03 (Track Progress), UC-06 (Review)'],
    ['Bay Mechanic', 'UC-05 (Update Job Card Status), UC-05.1 (Append Technician Diagnostic Notes & Extra Parts)'],
    ['Service Admin', 'UC-04 (Dispatch Mechanic), UC-04.1 (Monitor Workshop Revenue), UC-04.2 (Manage Bays)'],
    ['Gemini AI Service', 'UC-01.1 (Parse Symptoms & Noise Frequencies), UC-01.2 (Synthesize JSON Triage Schema)']
  ];
  addTable(['Actor Name & Role', 'Associated Functional Use Cases (Direct & Included)'], ucActorRows, [140, 350], 12);

  // =========================================================================
  // PAGE 21: 3.4 DETAILED USE CASE SPECIFICATION: AI DIAGNOSTICS (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('3.4 Detailed Use Case Specification: AI Diagnostic Triage');
  addP('This formal use case specification defines the operational flow, preconditions, postconditions, and exception branches for UC-01 (Run AI Diagnostic Scan):');

  const uc01Rows = [
    ['Use Case ID & Title', 'UC-01: Run Multimodal AI Acoustic & Symptom Diagnostic Scan'],
    ['Primary Actor', 'Customer / Motorcycle Rider (via web browser)'],
    ['Secondary Actor', 'Google Gemini 2.5/3.8 Flash AI Model (Cloud API) / Heuristic Rule Engine'],
    ['Preconditions', '1. User has opened the BikeCare AI web application.\n2. User has navigated to the "AI Diagnostics" tab.'],
    ['Trigger', 'User clicks the "Run AI Diagnostic Scan" action button.'],
    ['Main Success Scenario (Normal Flow)', '1. System presents input form for bike model, mileage, symptoms, and sound selector.\n2. User selects motorcycle parameters and descriptive sound tags.\n3. User submits diagnostic request.\n4. Client validates inputs and transmits JSON payload to /api/diagnose.\n5. Server invokes Gemini Flash API with structured automotive prompt.\n6. Gemini returns JSON payload specifying fault, severity, DIY checks, and budget.\n7. Server returns validated report to client; UI renders high-contrast diagnostic card.'],
    ['Alternative Flow 1 (Network Failure)', '5a. Gemini API times out (>3000ms) or returns HTTP 500 error.\n5b. Server / client triggers autonomous heuristic rule engine.\n5c. Deterministic lookup table synthesizes diagnosis based on symptom keywords.\n5d. System displays diagnostic card with fallback confidence rating.'],
    ['Alternative Flow 2 (Incomplete Inputs)', '3a. User submits form without selecting symptoms or sound descriptors.\n3b. Client validation highlights missing fields with high-contrast warning.'],
    ['Security & Rate Limiting Rules', 'Client throttles scan submissions to maximum 10 requests per minute to prevent API quota exhaustion.'],
    ['Safety Classification Thresholds', 'Faults flagged as "Severe" (e.g. brake failure, fuel line leak) trigger red warning banners advising against riding.'],
    ['Postconditions', 'Diagnostic report displayed on screen; user given direct button to book service package.']
  ];
  addTable(['Specification Field', 'Operational Description & System Behavior'], uc01Rows, [140, 345], 16);

  doc.moveDown(0.15);
  addP('Non-Functional Requirements for UC-01: Inference latency must be <2500ms over 4G connections. The system must render accessible WCAG 2.1 AA color contrast for all severity indicators (Green=Low, Amber=Moderate, Red=Severe).');
  addP('Traceability to Safety Standards: Automotive diagnostics must comply with ISO 26262 functional safety triage guidelines by strictly demarcating advisory predictions from verified mechanical interventions.');

  // =========================================================================
  // PAGE 22: 3.5 DETAILED USE CASE SPECIFICATION: DISPATCH & TRACKING (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('3.5 Detailed Use Case Specification: Job Dispatch & Tracking');
  addP('This section details the operational specifications for UC-02 (Doorstep Booking), UC-03 (Live Tracking), and UC-04 (Admin Mechanic Dispatching):');

  const uc02Rows = [
    ['Use Case ID', 'UC-02: Book Doorstep Service Package'],
    ['Primary Actor', 'Customer / Rider'],
    ['Preconditions', 'User has selected a service package (Express, Master, EV Shield).'],
    ['Main Flow', '1. User selects service package and optional add-ons.\n2. User inputs name, phone, address, bike registration, and preferred date.\n3. System computes mathematical total and generates unique code (BK-XXXX).\n4. System persists booking to data/bikecare-db.json with status "Registered".\n5. UI redirects user to Live Tracker tab displaying the new booking card.'],
    ['Exception Flow', 'Phone number validation fails (non-10-digit). Form highlights field in red.']
  ];
  addTable(['Field', 'Operational Description for UC-02'], uc02Rows, [110, 375], 12);

  doc.moveDown(0.12);
  const uc03Rows = [
    ['Use Case ID', 'UC-03: Track Live Job Card Milestones'],
    ['Primary Actor', 'Customer / Rider'],
    ['Main Flow', '1. User enters booking code (BK-XXXX) into tracker input field.\n2. System queries database and returns active repair milestone state.\n3. UI renders 6-step progress timeline, technician notes, and invoice total.']
  ];
  addTable(['Field', 'Operational Description for UC-03'], uc03Rows, [110, 375], 12);

  doc.moveDown(0.12);
  const uc04Rows = [
    ['Use Case ID', 'UC-04: Dispatch Mechanic to Job Card'],
    ['Primary Actor', 'Workshop Service Admin (/admin portal)'],
    ['Preconditions', 'Admin is authenticated via security PIN (admin123).'],
    ['Main Flow', '1. Admin views incoming bookings on the Admin Dispatch Board.\n2. Admin inspects mechanic bay occupancy counters.\n3. Admin selects an available mechanic (Marcus, Priya, Tyler, Sofia).\n4. Admin clicks "Assign Mechanic" button.\n5. Backend updates assignedMechanic attribute in database.\n6. UI refreshes mechanic workload badge and reflects assignment in real-time.']
  ];
  addTable(['Field', 'Operational Description for UC-04'], uc04Rows, [110, 375], 12);

  doc.moveDown(0.12);
  addP('Business Rule Invariants: A booking code cannot be reassigned once generated. Status transitions must follow sequential progression; a job cannot transition directly from "Registered" to "Delivered" without intermediate mechanic milestones.');

  // =========================================================================
  // PAGE 23: 3.6 STARUML CLASS DIAGRAM & DOMAIN MODEL (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('3.6 StarUML Class Diagram & Domain Model');
  addP('The Class Diagram articulates the object-oriented structure of the BikeCare AI platform, defining class attributes, method signatures, access modifiers, and associations:');
  addFigure('fig_3_3_class.png', 'Figure 3.3: StarUML Class Diagram & Object-Oriented Domain Model', 200);

  addH3('Object-Oriented Design Patterns & Architectural Roles');
  addBullet('Singleton Pattern (DatabaseManager)', 'Enforces a single centralized point of read/write access to data/bikecare-db.json, eliminating concurrent file access race conditions.');
  addBullet('Factory Method Pattern (DiagnosticReportFactory)', 'Instantiates either a GeminiAiReport or a HeuristicReport depending on cloud network availability, shielding client UI components from API errors.');
  addBullet('Observer Pattern (BookingStateSubject)', 'Notifies active tracking views and administrative dispatch boards whenever a booking status or technician note changes.');
  addBullet('Data Transfer Object (DTO) Layer', 'Standardizes JSON transmission payloads between client React hooks and server Express controllers, enforcing strict TypeScript interface compliance.');

  const classTaxonomyRows = [
    ['BookingEntity', 'id, code, customerName, phone, status, cost', 'create(), updateStatus(), assignMechanic()'],
    ['DiagnosticService', 'apiKey, timeoutMs, activeModel', 'analyzeAcoustics(), invokeGemini(), getHeuristic()'],
    ['AdminController', 'sessionToken, authPin, activeFilter', 'authenticate(), dispatchJob(), getFinancialKpi()'],
    ['DatabaseManager', 'filePath, mutexLock, cachedSchema', 'read(), write(), atomicCommit(), createBackup()']
  ];
  addTable(['Class Name', 'Encapsulated Attributes', 'Public Methods & Behaviors'], classTaxonomyRows, [130, 185, 175], 10);

  // =========================================================================
  // PAGE 24: 3.7 CLASS RESPONSIBILITY & COLLABORATOR (CRC) ANALYSIS (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('3.7 Class Responsibility & Collaborator (CRC) Analysis');
  addP('Class Responsibility and Collaborator (CRC) modeling refines object-oriented boundaries by isolating what each class knows, what it does, and who it collaborates with:');

  const crcRows = [
    ['DiagnosticController', '• Receives diagnostic HTTP POST requests.\n• Validates bike model and symptom arrays.\n• Dispatches request to GeminiService or HeuristicService.\n• Emits structured JSON diagnostic report.', 'GeminiService,\nHeuristicEngine,\nLoggerService'],
    ['BookingManager', '• Generates unique human-readable booking code.\n• Computes package base price and add-on sum.\n• Persists booking record with status "Registered".\n• Queries active bookings by code or status filter.', 'DatabaseManager,\nValidationEngine,\nNotificationGateway'],
    ['AdminDispatcher', '• Verifies administrative session credentials.\n• Computes workshop KPIs (revenue, active bays).\n• Assigns qualified mechanics based on workload.\n• Updates repair status and technician notes.', 'BookingManager,\nMechanicRegistry,\nAuditLogger'],
    ['ReviewAggregator', '• Validates customer feedback submission.\n• Calculates average rating per technician.\n• Aggregates common customer feedback tags.', 'BookingManager,\nDatabaseManager'],
    ['DatabaseManager', '• Synchronously reads from data/bikecare-db.json.\n• Executes atomic commits via temporary swap files.\n• Creates automated hourly schema snapshot backups.', 'FileSystem,\nSchemaValidator'],
    ['HeuristicEngine', '• Maps acoustic sounds to mechanical fault taxonomy.\n• Synthesizes deterministic repair budgets & DIY steps.\n• Operates with zero network latency (<50ms).', 'DiagnosticController,\nAcousticKnowledgeBase']
  ];
  addTable(['Class Name & Layer', 'Core Responsibilities (Methods & Logic)', 'Collaborators'], crcRows, [125, 260, 100], 22);

  doc.moveDown(0.15);
  addH3('CRC Coupling and Cohesion Evaluation');
  addP('High Cohesion: Each domain class encapsulates a single, tightly defined responsibility. The DiagnosticController concerns itself exclusively with symptom triage and never directly mutates booking records.');
  addP('Loose Coupling: Domain entities interact via interface abstractions and DTO contracts. For example, BookingManager communicates with DatabaseManager through generic read/write signatures without coupling to physical file storage details.');
  addP('Encapsulation Guarantees: All internal state variables (such as mutex locks and API keys) are declared private, exposed only via validated accessor methods.');

  // =========================================================================
  // PAGE 25: 3.8 STARUML SEQUENCE DIAGRAM & LIFECYCLES (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('3.8 StarUML Sequence Diagram & Lifecycles');
  addP('The Sequence Diagram depicts the chronological message exchange across system lifecycles during a complete AI diagnostic and booking workflow:');
  addFigure('fig_3_4_sequence.png', 'Figure 3.4: StarUML Sequence Diagram (Diagnostic & Booking Lifecycle)', 200);

  addH3('Chronological Message Exchange Narrative');
  addBullet('Step 1: Input Submission', 'The Rider enters symptoms and sound descriptors on the React SPA, which dispatches a POST request to Express Server (/api/diagnose).');
  addBullet('Step 2: AI Gateway Dispatch', 'Express formats an automotive system prompt and executes an asynchronous call to Google Gemini 2.5/3.8 Flash SDK.');
  addBullet('Step 3: Response Synthesis & Fallback', 'Gemini returns structured JSON triage data. If timeout occurs (>3000ms), Express invokes HeuristicEngine to guarantee immediate response.');
  addBullet('Step 4: Package Selection & Booking', 'Rider selects a maintenance tier. Client calculates total cost and dispatches POST /api/bookings to commit the job card.');
  addBullet('Step 5: Database Commit & Confirmation', 'DatabaseManager commits record to data/bikecare-db.json and returns BK-XXXX code to UI.');

  const seqMsgRows = [
    ['1. POST /api/diagnose', 'Client React SPA → Express Server', 'Asynchronous HTTP Fetch', 'Symptoms, Model, Sound'],
    ['2. generateContent()', 'Express Server → Gemini Flash API', 'Asynchronous HTTPS TLS', 'Prompt + JSON MimeType'],
    ['3. return report JSON', 'Gemini Flash API → Express Server', 'Synchronous Response', 'Fault, Severity, DIY Steps'],
    ['4. POST /api/bookings', 'Client React SPA → Express Server', 'Asynchronous HTTP Fetch', 'Booking DTO + Addons'],
    ['5. atomicWrite()', 'Express Server → File System', 'Synchronous Atomic File', 'Committed Database Schema']
  ];
  addTable(['Sequence Message', 'Sender → Receiver Lifeline', 'Communication Type', 'Payload Data Contract'], seqMsgRows, [110, 155, 115, 110], 10);

  // =========================================================================
  // PAGE 26: 3.9 STARUML ACTIVITY DIAGRAM & STATE MACHINE (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('3.9 StarUML Activity Diagram & State Machine');
  addP('The Activity Diagram models procedural logic flow, conditional decision diamonds, and concurrent fork/join pathways across the service lifecycle:');
  addFigure('fig_3_5_activity.png', 'Figure 3.5: StarUML Activity Diagram (Workshop Operational Workflow)', 200);

  addH3('State Machine Invariants & Transition Rules');
  addBullet('State 1: Registered', 'Initial state following doorstep booking creation. Booking code is generated; mechanic is unassigned.');
  addBullet('State 2: In Transit', 'Pickup technician dispatched to customer location. Vehicle is en route to physical garage.');
  addBullet('State 3: Diagnostic Complete', 'Bay mechanic completes physical teardown, verifies AI pre-scan findings, and logs extra parts.');
  addBullet('State 4: In Repair', 'Active mechanical servicing in progress (valve tuning, oil flush, electrical troubleshooting).');
  addBullet('State 5: Ready for Delivery', 'Repairs finished, final quality audit passed, and vehicle washed. Rider notified.');
  addBullet('State 6: Delivered', 'Vehicle returned to customer. Invoice validated; verified feedback review card unlocked.');

  const stateMatrixRows = [
    ['Registered', 'Doorstep pickup truck dispatched', 'Assigned mechanic verified', 'In Transit'],
    ['In Transit', 'Vehicle arrives at workshop bay', 'Check-in inspection passed', 'Diagnostic Complete'],
    ['Diagnostic Complete', 'Bay mechanic confirms parts', 'Customer invoice approved', 'In Repair'],
    ['In Repair', 'Mechanical overhaul completed', 'Quality test ride passed', 'Ready for Delivery'],
    ['Ready for Delivery', 'Vehicle handed over to customer', 'Digital receipt validated', 'Delivered']
  ];
  addTable(['Current State', 'Triggering Business Event', 'Guard Condition Invariant', 'Target Next State'], stateMatrixRows, [110, 140, 130, 110], 10);

  // =========================================================================
  // PAGE 27: 3.10 STARUML DEPLOYMENT DIAGRAM & INFRASTRUCTURE (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('3.10 StarUML Deployment Diagram & Infrastructure');
  addP('The Deployment Diagram models the physical and execution environment, illustrating node hardware, communication protocols, and runtime artifacts:');
  addFigure('fig_3_6_deployment.png', 'Figure 3.6: StarUML Deployment Diagram & Infrastructure Nodes', 200);

  addH3('Infrastructure Tier Specifications & Communication Protocols');
  addBullet('Client Device Tier (Web Browser Node)', 'Executes React 19 SPA inside Chromium / WebKit engines. Communicates via HTTPS / WSS protocols over port 443.');
  addBullet('Application Server Tier (Node.js / Express Node)', 'Hosts RESTful API endpoints, static assets, and local JSON database file. Listens on internal port 3000.');
  addBullet('Artificial Intelligence Gateway Tier (Google Cloud Platform)', 'Hosts Gemini 2.5/3.8 Flash model inference servers. Reached via secure TLS REST API calls.');
  addBullet('Persistent Storage Tier (Filesystem Volume Node)', 'Self-contained JSON data store mounted at data/bikecare-db.json with automated backup sync.');

  const deploySpecRows = [
    ['Client Browser Node', 'HTML5 / ECMAScript 2022', 'React 19 SPA Bundle, CSS, WebAudio', 'HTTPS :443'],
    ['Express Server Node', 'Node.js v20 LTS Runtime', 'server.ts, Express Middleware, REST APIs', 'HTTP :3000 / Internal'],
    ['Google Cloud Node', 'Google AI Studio Infrastructure', 'Gemini 2.5/3.8 Flash LLM Inference', 'REST / TLS gRPC'],
    ['File Storage Node', 'POSIX Linux Filesystem', 'data/bikecare-db.json Atomic Data Store', 'Direct File I/O']
  ];
  addTable(['Physical Execution Node', 'Runtime Environment', 'Deployed Software Artifacts', 'Protocol & Port'], deploySpecRows, [115, 125, 155, 95], 10);

  doc.moveDown(0.12);
  addP('Deployment Architecture Summary: The decoupled node topology ensures horizontal scalability, zero-install customer access, and high computational efficiency.');
}

module.exports = { renderChapter3 };
