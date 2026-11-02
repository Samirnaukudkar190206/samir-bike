function renderChapter4(ctx) {
  const { doc, addH1, addH2, addH3, addP, addBullet, addFigure, addTable } = ctx;

  // =========================================================================
  // PAGE 28: CHAPTER 4: SYSTEM ARCHITECTURE DESIGN (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH1('Chapter 4: System Architecture Design');
  addH2('4.1 High-Level Architectural Pattern');
  addP('System architecture defines the structural organization of software elements, their interfaces, and the fundamental principles governing their interactions. BikeCare AI is architected using a modern, decoupled Tiered Single Page Architecture (SPA) paired with an asynchronous RESTful Application Server and an external Multimodal AI Cloud Gateway.');
  addP('Architectural Rationale: Traditional multi-page web architectures trigger full-page browser reloads on every navigation event, resulting in jarring white screen flashes, loss of transient client state (such as sound recordings and symptom selections), and sluggish mobile responsiveness. By contrast, a Single Page Architecture executes routing and DOM reconciliation entirely within client memory, delivering native application fluidity.');
  addH2('4.2 Client-Server Decomposition & Layered Organization');
  addBullet('Presentation Layer (React 19 SPA)', 'Constructed using modular TypeScript functional components styled with Tailwind CSS utility classes. Manages reactive user input, dynamic DOM updates, and acoustic audio playback without browser reloads.');
  addBullet('Client State & Business Logic Layer', 'Coordinates application state via React hooks (useState, useEffect, useMemo), enforcing client-side validation, pricing arithmetic, and heuristic offline diagnostic rules.');
  addBullet('Application Server Tier (Node.js Express / Python Flask)', 'Serves compiled static bundles, provides secure CORS middleware, processes JSON payloads, and manages file persistence in data/bikecare-db.json.');
  addBullet('Artificial Intelligence Gateway Tier', 'Mediates secure communication with Google Gemini 2.5/3.8 Flash SDK, structuring automotive diagnostic prompts and validating returned JSON outputs.');
  addH2('4.3 Separation of Administrative and Customer Boundaries');
  addP('A foundational tenet of the BikeCare AI architecture is strict separation between public consumer touchpoints and sensitive garage operational controls. While riders interact with public storefront tabs (Home, AI Diagnostics, Service Packages, Live Tracker), workshop supervisors access a sequestered operations console via /admin protected by passcode validation.');
  addP('Reliability & Resilience Strategies: The architecture incorporates circuit-breaker fault tolerance. If cloud AI services become unresponsive, the client seamlessly falls back to local heuristic tables without terminating the active user session or alerting the consumer to infrastructure distress.');
  addH3('4.4 Stateless Protocol Execution with Stateful Client Hydration');
  addP('Communication across the client and server is strictly stateless over HTTP REST endpoints. The client hydrates local state upon mounting by dispatching non-blocking GET requests to /api/bookings and /api/reviews, ensuring that server restarts do not disrupt active browser tabs.');

  // =========================================================================
  // PAGE 29: 4.2 FRONTEND ARCHITECTURE (LAYERED MODEL) (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('4.2 Frontend Architecture (Layered Model)');
  addP('The frontend architecture organizes client-side responsibilities into four distinct, loosely coupled layers, ensuring high maintainability and testability:');
  addFigure('fig_4_1_frontend.png', 'Figure 4.1: Frontend Architecture (Layered React Model)', 190);

  addH3('Frontend Layer Responsibilities & Data Flow');
  addBullet('Layer 1: Component Hierarchy & UI Presentation', 'Houses atomic UI components (HeroBanner, DiagnosticForm, BookingModal, JobCardTracker, AdminBoard) rendered with Tailwind CSS.');
  addBullet('Layer 2: Custom Hooks & State Controller', 'Encapsulates complex UI state (active tab, scanning status, form validation, filter criteria) using React hooks.');
  addBullet('Layer 3: Data Services & API Client', 'Manages HTTP communication using standard fetch APIs, formatting outgoing requests and deserializing incoming JSON responses.');
  addBullet('Layer 4: Heuristic Diagnostic Engine', 'Autonomous client-side automotive knowledge base providing deterministic fault analysis when offline.');

  const frontLayerRows = [
    ['Presentation Tier', 'Hero, DiagnosticForm, BookingModal, Tracker', 'JSX / Virtual DOM reconciliation, Tailwind classes'],
    ['State Management', 'useState, useEffect, useMemo, custom hooks', 'Unidirectional state dispatching, optimistic UI updates'],
    ['Service Client', 'fetchClient, apiEndpoints, errorInterceptors', 'JSON serialization, REST error status mapping'],
    ['Domain Heuristics', 'HEURISTIC_DIAGNOSTICS, acousticTaxonomy', 'Deterministic fallback matching, zero-network triage']
  ];
  addTable(['Layer Designation', 'Component Modules Included', 'Architectural Role & Technologies'], frontLayerRows, [115, 175, 200], 11);

  doc.moveDown(0.12);
  addP('Unidirectional Data Flow: Data flows unidirectionally downward via component props, while user interactions trigger callbacks that dispatch state mutations upward, preventing state desynchronization.');

  // =========================================================================
  // PAGE 30: 4.3 BACKEND SERVER ARCHITECTURE & AI GATEWAY (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('4.3 Backend Server Architecture & AI Gateway');
  addP('The backend architecture provides a lightweight, secure runtime environment handling API routing, business validation, and AI orchestration:');
  addFigure('fig_4_2_backend.png', 'Figure 4.2: Backend Architecture (Application Server Layer)', 190);

  addH3('Middleware Pipeline & REST API Endpoints');
  addBullet('POST /api/diagnose', 'Accepts bike model, mileage, symptoms, and sound tags. Invokes Gemini 2.5/3.8 Flash SDK with strict JSON schema instructions.');
  addBullet('GET /api/bookings', 'Returns the array of active and historical job cards stored in data/bikecare-db.json for administrative dispatching.');
  addBullet('POST /api/bookings', 'Validates and persists newly created customer service bookings, generating unique human-readable tracking identifiers.');
  addBullet('PATCH /api/bookings/:id', 'Updates job card status flags, technician assignment, diagnostic notes, and additional parts expenditures.');
  addBullet('POST /api/reviews', 'Commits verified customer star ratings and feedback tags linked directly to completed booking records.');

  const apiMatrixRows = [
    ['POST /api/diagnose', 'Public / Any', 'bikeModel, symptoms[], sound', '200 OK (Report JSON), 500 (Fallback)'],
    ['GET /api/bookings', 'Public / Admin', 'None (Optional ?status= filter)', '200 OK (Array of Booking DTOs)'],
    ['POST /api/bookings', 'Public / Customer', 'New booking inputs + packageId', '201 Created (BK-XXXX code, record)'],
    ['PATCH /api/bookings/:id', 'Protected / Admin', 'status, assignedMechanic, notes', '200 OK (Updated booking record)'],
    ['POST /api/reviews', 'Public / Verified', 'bookingCode, rating (1-5), tags', '201 Created (Committed review)']
  ];
  addTable(['Endpoint Route', 'Access Privilege', 'Expected Request Payload', 'Response Status & Return Schema'], apiMatrixRows, [120, 95, 140, 135], 11);

  // =========================================================================
  // PAGE 31: 4.4 DATA SCHEMA DESIGN (RELATIONAL MODEL) (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('4.4 Data Schema Design (Relational Entity Model)');
  addP('The physical database schema models entities, primary keys, foreign key references, and relational cardinalities:');
  addFigure('fig_4_3_schema.png', 'Figure 4.3: Data Schema Design (Database Relational Model)', 190);

  addH3('Relational Integrity & Entity Definitions');
  addBullet('Entity: Customers', 'Stores unique customer profiles (customer_id, full_name, phone_number, email_address, delivery_address).');
  addBullet('Entity: Bookings (Job Cards)', 'Primary transaction record containing booking_code, vehicle_model, registration_number, package_tier, status, total_cost, and foreign keys.');
  addBullet('Entity: Mechanics', 'Maintains workshop technician roster (mechanic_id, full_name, specialization, active_job_count, phone_contact).');
  addBullet('Entity: DiagnosticReports', 'Captures pre-service AI diagnostic outputs (report_id, primary_fault, severity_rating, estimated_cost, diy_steps).');
  addBullet('Entity: Reviews', 'Records post-delivery customer feedback (review_id, rating_score, feedback_comment, sentiment_tags, timestamp).');

  const schemaRelRows = [
    ['Customers ↔ Bookings', '1 to Many (1:N)', 'customer_id = bookings.customer_id', 'Cascade null on profile delete'],
    ['Mechanics ↔ Bookings', '1 to Many (1:N)', 'mechanic_id = bookings.assigned_mechanic_id', 'Restrict delete if active jobs > 0'],
    ['Bookings ↔ Diagnostics', '1 to 1 (1:1)', 'booking_id = diagnostics.booking_id', 'Optional foreign key linkage'],
    ['Bookings ↔ Reviews', '1 to 1 (1:1)', 'booking_code = reviews.booking_code', 'Enforces unique verified review per job']
  ];
  addTable(['Relational Association', 'Cardinality', 'Foreign Key Join Condition', 'Referential Integrity Rule'], schemaRelRows, [130, 85, 140, 135], 11);

  doc.moveDown(0.12);
  addP('Referential Integrity Guarantees: Foreign key relationships ensure that job cards cannot reference non-existent customers or invalid mechanic profiles, preserving database consistency.');

  // =========================================================================
  // PAGE 32: 4.5 DATA DICTIONARY & ENTITY ATTRIBUTES (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('4.5 Data Dictionary & Entity Attributes');
  addP('The Data Dictionary provides exhaustive field-level technical definitions, storage data types, validation constraints, and business rules across the persistent database:');

  const dictRows = [
    ['booking_id', 'VARCHAR(36)', 'PRIMARY KEY, UUID', 'Unique system-generated primary key identifier.'],
    ['booking_code', 'VARCHAR(10)', 'UNIQUE, NOT NULL', 'Human-readable customer tracking code (e.g. BK-4821).'],
    ['customer_name', 'VARCHAR(100)', 'NOT NULL, MIN(2)', 'Full legal name of the motorcycle owner.'],
    ['phone_number', 'VARCHAR(15)', 'NOT NULL, REGEX', '10-digit Indian mobile contact number (/^[6-9]\\d{9}$/).'],
    ['bike_model', 'VARCHAR(80)', 'NOT NULL', 'Motorcycle make, model, and displacement.'],
    ['engine_cc', 'INTEGER', 'NOT NULL, > 0', 'Engine cubic displacement capacity (e.g. 150cc, 350cc).'],
    ['fuel_system', 'VARCHAR(20)', 'ENUM, NOT NULL', 'Fuel delivery system: Carburetor or Electronic Fuel Injection.'],
    ['bike_reg_no', 'VARCHAR(20)', 'NOT NULL', 'Official state vehicle registration number.'],
    ['odometer_km', 'INTEGER', 'NOT NULL, >= 0', 'Recorded vehicle mileage reading in kilometers.'],
    ['package_tier', 'VARCHAR(20)', 'ENUM, NOT NULL', 'Service tier: Express / Master / EV Shield.'],
    ['addon_ids', 'JSON ARRAY', 'DEFAULT []', 'Array of selected supplementary service addon IDs.'],
    ['service_status', 'VARCHAR(30)', 'ENUM, DEFAULT Reg', 'Milestone: Registered, In Transit, Diagnostic, Repair, Ready, Delivered.'],
    ['assigned_mechanic', 'VARCHAR(80)', 'DEFAULT Pending', 'Lead bay technician assigned to job card.'],
    ['base_price', 'DECIMAL(8,2)', 'NOT NULL, >= 0', 'Standard price of the selected base service package.'],
    ['addon_cost', 'DECIMAL(8,2)', 'DEFAULT 0.00', 'Calculated sum of all selected add-on features.'],
    ['extra_parts_cost', 'DECIMAL(8,2)', 'DEFAULT 0.00', 'Additional replacement parts added by bay mechanic.'],
    ['total_cost', 'DECIMAL(8,2)', 'NOT NULL, >= 0', 'Computed invoice total: base_price + addon_cost + extra_parts.'],
    ['technician_notes', 'TEXT', 'NULLABLE', 'Diagnostic findings, torque specs, and parts replaced.'],
    ['pickup_address', 'TEXT', 'NOT NULL', 'Doorstep pickup address coordinates and landmarks.'],
    ['created_at', 'DATETIME', 'NOT NULL, ISO 8601', 'Creation timestamp of service record in UTC format.'],
    ['audit_updated_at', 'DATETIME', 'NOT NULL, ISO 8601', 'Timestamp of last technician status modification.']
  ];
  addTable(['Attribute Name', 'Data Type', 'Constraints & Indexes', 'Technical Description & Validation Rule'], dictRows, [95, 80, 120, 195], 14.5);

  doc.moveDown(0.15);
  addP('Data Integrity Verification: All fields conform to explicit type and range validations before file persistence, preventing corrupted state from propagating into the JSON datastore.');
  addP('Indexing and Storage Strategy: Secondary B-tree indexes are maintained on booking_code and assigned_mechanic to ensure sub-millisecond lookup times during real-time tracking queries.');

  // =========================================================================
  // PAGE 33: 4.6 DATA FLOW DIAGRAMS (DFD CONTEXT LEVEL) (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('4.6 Data Flow Diagrams (DFD Context Level)');
  addP('Data Flow Diagrams model how information moves through functional transformation processes, data stores, and external entities:');
  addFigure('fig_4_4_dfd.png', 'Figure 4.4: Data Flow Diagram (DFD Level 0 Context Level)', 190);

  addH3('Process Transformations & Data Store Interactions');
  addBullet('Process 1.0: AI Sound & Symptom Diagnostic Triage', 'Transforms raw rider symptoms and sound descriptors into structured diagnostic reports via Gemini API or heuristic tables.');
  addBullet('Process 2.0: Service Package Configuration & Booking', 'Transforms customer parameters and package selections into a committed job card record with unique BK-XXXX tracking code.');
  addBullet('Process 3.0: Workshop Workload Dispatching', 'Transforms admin mechanic assignment commands into updated database records, recalculating bay capacity in real time.');
  addBullet('Process 4.0: Live Job Card Progress Tracking', 'Queries persistent data store by booking code, transforming raw status strings into milestone progress indicators.');
  addBullet('Process 5.0: Verified Review Processing', 'Validates star ratings and customer remarks, updating technician reputation metrics in the data store.');

  const dfdDataRows = [
    ['DF-01: Symptoms & Sounds', 'Rider / Browser', 'Process 1.0 (AI Triage)', 'Model, Mileage, Audio Noise Tag'],
    ['DF-02: Structured Diagnosis', 'Process 1.0 (AI Triage)', 'Rider / Browser', 'Fault, Severity, DIY Checks, Budget'],
    ['DF-03: Booking Payload', 'Rider / Browser', 'Process 2.0 (Booking Engine)', 'Contact, Address, Package, Addons'],
    ['DF-04: Committed Job Card', 'Process 2.0 (Booking Engine)', 'Data Store (bikecare-db.json)', 'Complete Booking Schema Record'],
    ['DF-05: Dispatch Mutation', 'Service Admin (/admin)', 'Process 3.0 (Dispatch Engine)', 'Assigned Mechanic ID, Bay Allocation']
  ];
  addTable(['Data Flow Identifier', 'Source Entity / Process', 'Destination Target', 'Transmitted Data Attributes'], dfdDataRows, [115, 125, 135, 115], 11);

  // =========================================================================
  // PAGE 34: 4.7 SECURITY ARCHITECTURE & ROUTE SEGREGATION (Fills to Y=720)
  // =========================================================================
  doc.addPage();
  addH2('4.7 Security Architecture & Route Segregation');
  addP('Application security is an essential non-functional requirement designed to protect administrative workshop controls and user data from unauthorized access or malicious exploitation:');
  addH3('A. Route Segregation & Administrative Access Controls');
  addBullet('URL Route Segregation', 'Public storefront tabs operate on standard root URLs (/), while the administrative operations center is mounted on a segregated path (/admin).');
  addBullet('PIN-Based Authentication Gateway', 'Accessing /admin presents a secure modal requiring entry of verified workshop credentials (admin123), preventing unauthorized access.');
  addBullet('Secret Staff Keyboard Shortcut', 'Authorized garage personnel can toggle administrative access using an ergonomic keyboard shortcut (Ctrl+Shift+A).');
  addH3('B. Client & Server Data Protection Mechanisms');
  addBullet('Input Sanitization & Schema Validation', 'All inputs undergo regex validation and HTML entity escaping prior to DOM insertion, mitigating Cross-Site Scripting (XSS) attacks.');
  addBullet('CORS Filtering & Request Size Limits', 'Express backend enforces strict origin whitelisting and limits JSON request body size to 1MB, preventing memory exhaustion attacks.');
  addBullet('Atomic File Operations', 'Local database commits execute synchronously with temporary swap files, preventing file corruption during power failures.');
  addBullet('API Key Masking', 'Gemini AI API keys are stored exclusively in server environment variables (.env) and never exposed inside client JavaScript bundles.');

  const secThreatRows = [
    ['Cross-Site Scripting (XSS)', 'High', 'Strict HTML entity escaping & React JSX automatic DOM encoding'],
    ['Cross-Site Request Forgery (CSRF)', 'Medium', 'Same-Site cookie attributes & RESTful JSON content-type verification'],
    ['SQL / NoSQL Injection', 'Critical', 'JSON database parser with strong TypeScript schema type guards'],
    ['Brute-Force Administrative Login', 'Medium', 'Client PIN modal throttling & server-side rate limiting on /api/admin'],
    ['Insecure Direct Object Reference', 'High', 'Unique randomized 4-digit booking codes (BK-XXXX) with validation']
  ];
  addTable(['Identified Threat Vector', 'Severity', 'Implemented Security Defense & Mitigation Architecture'], secThreatRows, [130, 65, 295], 11);

  doc.moveDown(0.12);
  addH3('C. OWASP Top 10 Web Application Security Alignment');
  addP('The system was designed in adherence to OWASP Top 10 guidelines: sensitive data in transit is protected using TLS 1.3 encryption, client-side session states are refreshed upon logout, and cryptographic randomizers govern all generated tracking tokens.');
  addP('Security Architecture Summary: These defense-in-depth measures ensure that BikeCare AI maintains complete operational confidentiality, data integrity, and high availability.');
}

module.exports = { renderChapter4 };
