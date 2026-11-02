const fs = require('fs');
const path = require('path');

function renderPrelims(ctx) {
  const { doc, addTitle, addH1, addH2, addH3, addP, addBullet, addTable, FONT_REG, FONT_BOLD, FONT_ITALIC, contentWidth, pageWidth } = ctx;

  // =========================================================================
  // PAGE 1: TITLE / COVER PAGE
  // =========================================================================
  doc.addPage();
  doc.moveDown(1.0);
  addTitle('AI-BASED TWO-WHEELER DIAGNOSTIC AND\nWORKSHOP MANAGEMENT PORTAL', 15.5);
  addP('(BIKECARE AI)', { font: FONT_BOLD, align: 'center', size: 13, moveDown: 1.0 });

  addP('A Project Report Submitted in partial fulfillment of the requirements\nfor the award of the Degree of', { font: FONT_REG, align: 'center', size: 10.5, moveDown: 0.4 });
  addP('Bachelor of Science in Computer Science\n(T.Y. B.Sc. CS – Semester VI)', { font: FONT_BOLD, align: 'center', size: 12, moveDown: 1.0 });

  addP('Submitted By', { font: FONT_REG, align: 'center', size: 10, moveDown: 0.3 });
  addP('SAMIR UTTAM NAUKUDKAR', { font: FONT_BOLD, align: 'center', size: 13.5 });
  addP('Roll No: 55   |   Seat No: CS-2026-055', { font: FONT_BOLD, align: 'center', size: 10.5, moveDown: 1.0 });

  addP('Under the Guidance of', { font: FONT_REG, align: 'center', size: 10, moveDown: 0.3 });
  addP('Prof. Vaishali Desai', { font: FONT_BOLD, align: 'center', size: 12 });
  addP('Assistant Professor, Department of Computer Science', { font: FONT_ITALIC, align: 'center', size: 10, moveDown: 1.0 });

  // Official College Emblem
  const collegeLogoPath = path.resolve(__dirname, '../../assets/logos/universal_emblem.png');
  if (fs.existsSync(collegeLogoPath)) {
    const logoWidth = 95;
    const logoX = (pageWidth - logoWidth) / 2;
    doc.image(collegeLogoPath, logoX, doc.y, { width: logoWidth });
    doc.y += logoWidth + 16;
  }

  addP('DEPARTMENT OF COMPUTER SCIENCE', { font: FONT_BOLD, align: 'center', size: 11.5 });
  addP('LORD UNIVERSAL COLLEGE', { font: FONT_BOLD, align: 'center', size: 14.5 });
  addP('(Affiliated to the University of Mumbai)', { font: FONT_ITALIC, align: 'center', size: 10 });
  addP('Topiwala Marg, Off Station Road, Goregaon (West), Mumbai – 400104', { font: FONT_REG, align: 'center', size: 9.5 });
  addP('Academic Year: 2026 – 2027', { font: FONT_BOLD, align: 'center', size: 11, moveDown: 0 });

  // =========================================================================
  // PAGE 2: OFFICIAL COLLEGE CERTIFICATE
  // =========================================================================
  doc.addPage();
  doc.moveDown(0.8);
  addP('LORD UNIVERSAL COLLEGE', { font: FONT_BOLD, align: 'center', size: 15 });
  addP('DEPARTMENT OF COMPUTER SCIENCE', { font: FONT_BOLD, align: 'center', size: 11.5 });
  addP('Topiwala Marg, Off Station Road, Goregaon (West), Mumbai – 400104\n(Affiliated to the University of Mumbai)', { font: FONT_ITALIC, align: 'center', size: 9.5, moveDown: 1.2 });

  addTitle('CERTIFICATE', 14);
  doc.moveDown(1.0);

  addP('This is to certify that the project entitled "AI-BASED TWO-WHEELER DIAGNOSTIC AND WORKSHOP MANAGEMENT PORTAL (BIKECARE AI)" is a bona fide work of Mr. SAMIR UTTAM NAUKUDKAR (Roll No: 55, Seat No: CS-2026-055) submitted to the University of Mumbai in partial fulfillment of the requirements for the award of the Degree of Bachelor of Science in Computer Science (Semester VI) during the academic year 2026–2027.', {
    font: FONT_REG,
    size: 11,
    lineGap: 4,
    align: 'justify',
    moveDown: 4.0
  });

  const sigY = doc.y;
  // Signature Grid
  doc.font(FONT_BOLD).fontSize(9.5);
  doc.text('__________________________', 52, sigY);
  doc.text('Prof. Vaishali Desai', 52, sigY + 14);
  doc.font(FONT_REG).fontSize(8.5);
  doc.text('Project Guide', 52, sigY + 26);
  doc.text('Department of Computer Science', 52, sigY + 38);

  doc.font(FONT_BOLD).fontSize(9.5);
  doc.text('__________________________', 330, sigY);
  doc.text('Head of Department', 330, sigY + 14);
  doc.font(FONT_REG).fontSize(8.5);
  doc.text('Department of Computer Science', 330, sigY + 26);
  doc.text('Lord Universal College', 330, sigY + 38);

  const sigY2 = sigY + 80;
  doc.font(FONT_BOLD).fontSize(9.5);
  doc.text('__________________________', 52, sigY2);
  doc.text('External Examiner', 52, sigY2 + 14);
  doc.font(FONT_REG).fontSize(8.5);
  doc.text('University of Mumbai', 52, sigY2 + 26);

  doc.font(FONT_BOLD).fontSize(9.5);
  doc.text('__________________________', 330, sigY2);
  doc.text('Dr. J. K. Sangle', 330, sigY2 + 14);
  doc.font(FONT_REG).fontSize(8.5);
  doc.text('Principal', 330, sigY2 + 26);
  doc.text('Lord Universal College, Mumbai', 330, sigY2 + 38);

  // =========================================================================
  // PAGE 3: CANDIDATE DECLARATION
  // =========================================================================
  doc.addPage();
  doc.moveDown(0.8);
  addTitle('DECLARATION', 14);
  doc.moveDown(1.2);

  addP('I, Mr. SAMIR UTTAM NAUKUDKAR, student of Lord Universal College studying in T.Y. B.Sc. Computer Science (Semester VI), hereby declare that I have completed the major project entitled "AI-BASED TWO-WHEELER DIAGNOSTIC AND WORKSHOP MANAGEMENT PORTAL (BIKECARE AI)" during the academic year 2026–2027.', {
    font: FONT_REG,
    size: 11,
    lineGap: 4,
    align: 'justify',
    moveDown: 1.0
  });

  addP('The information submitted is authentic and true to the best of my knowledge. The work presented in this project report is original, and the software implementation emerged from the architecture design, algorithms, and development carried out under the guidance of Prof. Vaishali Desai.', {
    font: FONT_REG,
    size: 11,
    lineGap: 4,
    align: 'justify',
    moveDown: 1.0
  });

  addP('I further declare that this project report or any part thereof has not been previously submitted to any other university or institute for the award of any degree, diploma, or other academic distinction.', {
    font: FONT_REG,
    size: 11,
    lineGap: 4,
    align: 'justify',
    moveDown: 3.5
  });

  const declY = doc.y;
  doc.font(FONT_REG).fontSize(9.5);
  doc.text('Date: 30 September 2026', 52, declY);
  doc.text('Place: Mumbai', 52, declY + 16);

  doc.text('__________________________', 330, declY);
  doc.font(FONT_BOLD).fontSize(10).text('(SAMIR UTTAM NAUKUDKAR)', 330, declY + 14);
  doc.font(FONT_REG).fontSize(9.5);
  doc.text('Roll No: 55   |   Seat No: CS-2026-055', 330, declY + 28);
  doc.text('T.Y. B.Sc. (Computer Science), Sem-VI', 330, declY + 42);
  doc.text('Department of Computer Science', 330, declY + 56);
  doc.text('Lord Universal College, Mumbai', 330, declY + 70);

  // =========================================================================
  // PAGE 4: ACKNOWLEDGEMENT & ABSTRACT (Deep, technical, fully populated to Y=730)
  // =========================================================================
  doc.addPage();
  addTitle('ACKNOWLEDGEMENT', 13.5);
  addP('I wish to express my deepest gratitude to our respected Principal, Dr. J. K. Sangle, for his inspiring leadership, visionary academic support, and for providing premier laboratory facilities and computational resources at Lord Universal College that made the successful execution of this major project possible.', { lineGap: 3, moveDown: 0.25 });
  addP('I owe a profound debt of intellectual gratitude to my esteemed Project Guide, Prof. Vaishali Desai, Assistant Professor, Department of Computer Science. Her insightful critique, relentless standard for architectural excellence, and continuous encouragement guided every milestone of the Software Development Life Cycle—from initial acoustic signal modeling and state machine validation to multimodal LLM integration and automated testing.', { lineGap: 3, moveDown: 0.25 });
  addP('I also extend my sincere appreciation to the faculty members of the Department of Computer Science for imparting foundational knowledge in distributed systems, database architectures, and software engineering. Special thanks are due to the laboratory technical staff, my fellow students, and my beloved family, whose steadfast moral support and patience sustained me throughout this demanding engineering endeavor.', { lineGap: 3, moveDown: 0.4 });

  addTitle('EXECUTIVE ABSTRACT', 13.5);
  addP('Two-wheelers (motorcycles, scooters, and light electric mopeds) constitute the backbone of personal daily mobility across emerging economies, with over 250 million registered vehicles in India alone. However, the after-sales maintenance ecosystem remains critically fragmented, plagued by asymmetric diagnostic information, subjective acoustic guesswork by uncertified neighborhood mechanics, arbitrary billing structures, and paper-based workshop management. BikeCare AI is architected and implemented to resolve these systemic industry bottlenecks.', { lineGap: 3, moveDown: 0.25 });
  addP('The platform implements a high-performance full-stack web architecture integrating React 19, TypeScript, Vite, Tailwind CSS, Express Node.js, and Python Flask. At its computational core is an acoustic and multimodal diagnostic inference engine leveraging Google Gemini 2.5/3.8 Flash SDK. The engine analyzes motorcycle model specifications, mileage wear factors, rider symptoms, and nuanced acoustic sound descriptors (such as cam chain rattling, brake rotor squealing, and carburetor misfires) to synthesize structured JSON diagnostic reports complete with fault severity indicators, step-by-step DIY safety checks, and estimated repair budget ranges within 2.5 seconds.', { lineGap: 3, moveDown: 0.25 });
  addP('To bridge digital triage with physical remediation, the portal coordinates doorstep pickup bookings, dynamic package cost calculators, live job card tracking via unique human-readable booking codes (BK-XXXX), and an isolated administrative dispatch console (/admin) featuring mechanic bay balancing. Complete deterministic heuristic rule engines guarantee 100% diagnostic triage availability even during cloud network or API outages.', { lineGap: 3, moveDown: 0.3 });
  addP('Keywords: Multimodal AI Diagnostics, Gemini Flash SDK, Workshop Dispatching, Digital Job Cards, Route Segregation, Automated Testing, Single Page Architecture, Two-Wheeler Maintenance.', { font: FONT_BOLD, size: 8.5 });

  // =========================================================================
  // PAGE 5: TABLE OF CONTENTS (Fits cleanly on single page without overflow)
  // =========================================================================
  doc.addPage();
  addTitle('TABLE OF CONTENTS', 14);
  const tocRows = [
    ['Chapter 1: Introduction & Problem Context', '7'],
    ['   1.1 Project Overview & Automotive Landscape', '7'],
    ['   1.2 Socio-Economic Impact of Two-Wheelers in Urban Mobility', '7'],
    ['   1.3 Problem Statement & Asymmetric Information Gaps', '8'],
    ['   1.4 Need for an Integrated Full-Stack Web Solution', '8'],
    ['   1.5 Project Objectives & Guiding Principles', '9'],
    ['   1.6 Project Scope (In-Scope & Out-of-Scope Deliverables)', '10'],
    ['   1.7 Stakeholder Role & Responsibility Matrix', '11'],
    ['   1.8 Feasibility Study & MoSCoW Prioritization Matrix', '12'],
    ['Chapter 2: SDLC Planning & Project Management', '13'],
    ['   2.1 Waterfall Lifecycle Model & Phase Transitions', '13'],
    ['   2.2 Work Breakdown Structure (WBS Decomposition)', '14'],
    ['   2.3 Project Milestones, Sprints & Deliverables', '15'],
    ['   2.4 Project Timeline & Gantt Chart Milestones', '16'],
    ['   2.5 Resource Allocation & Risk Assessment Matrix', '17'],
    ['Chapter 3: System Modeling & StarUML Diagrams', '18'],
    ['   3.1 Overview of Unified Modeling Language (UML)', '18'],
    ['   3.2 StarUML Entity-Relationship (ER) Diagram', '19'],
    ['   3.3 StarUML Use Case Diagram & Actor Matrix', '20'],
    ['   3.4 Detailed Use Case Specification: AI Diagnostic Triage', '21'],
    ['   3.5 Detailed Use Case Specification: Workshop Job Dispatch', '22'],
    ['   3.6 StarUML Class Diagram & Domain Model', '23'],
    ['   3.7 Class Responsibility & Collaborator (CRC) Analysis', '24'],
    ['   3.8 StarUML Sequence Diagram & Message Lifecycles', '25'],
    ['   3.9 StarUML Activity Diagram & State Machine Flow', '26'],
    ['   3.10 StarUML Deployment Diagram & Infrastructure Nodes', '27'],
    ['Chapter 4: System Architecture Design', '28'],
    ['   4.1 High-Level Tiered Single Page Architecture', '28'],
    ['   4.2 Frontend Architecture (Layered React Model)', '29'],
    ['   4.3 Backend Server Architecture & AI Gateway', '30'],
    ['   4.4 Data Schema Design (Relational Entity Model)', '31'],
    ['   4.5 Data Dictionary & Column Specification Table', '32'],
    ['   4.6 Data Flow Diagrams (DFD Level 0 Context Level)', '33'],
    ['   4.7 Security Architecture, Route Guards & RBAC', '34'],
    ['Chapter 5: Implementation & Code Walkthrough', '35'],
    ['   5.1 Technology Stack & Development Toolchain', '35'],
    ['   5.2 Customer Storefront & Route Guard Controller', '36'],
    ['   5.3 AI Sound & Noise Diagnostic Scanner UI', '37'],
    ['   5.4 Doorstep Booking & Package Configurator', '38'],
    ['   5.5 Live Digital Job Card Tracking Console', '39'],
    ['   5.6 Standardized Service Packages & Pricing Catalog', '40'],
    ['   5.7 Customer Review & Star Rating Submission Pipeline', '41'],
    ['   5.8 Workshop Operations Admin Console (/admin)', '42'],
    ['   5.9 Local JSON Database Engine & File Persistence', '43'],
    ['   5.10 Gemini AI Integration & Heuristic Fallbacks', '44'],
    ['Chapter 6: Integration & System Testing', '45'],
    ['   6.1 Testing Methodology & Quality Assurance', '45'],
    ['   6.2 Unit Testing Execution Matrix & Selenium Suite', '46'],
    ['   6.3 Black-Box & Boundary Value Testing Analysis', '47'],
    ['   6.4 Comprehensive System Test Suite (TC01–TC15)', '48'],
    ['Chapter 7: Conclusion & Future Scope', '49'],
    ['   7.1 Project Summary & Core Deliverables Achieved', '49'],
    ['   7.2 Limitations, Future Enhancements & References', '50']
  ];
  addTable(['Contents / Chapters & Sections', 'Page No.'], tocRows, [405, 80], 11.5);

  // =========================================================================
  // PAGE 6: LIST OF FIGURES, TABLES & ABBREVIATIONS (Fills to Y=730)
  // =========================================================================
  doc.addPage();
  addH2('List of Figures');
  const figList = [
    ['Figure 2.1', 'Work Breakdown Structure (WBS Decomposition)', '14'],
    ['Figure 2.2', 'Project Timeline (Gantt Chart Milestones)', '16'],
    ['Figure 3.1', 'StarUML Entity-Relationship (ER) Diagram', '19'],
    ['Figure 3.2', 'StarUML Use Case Diagram & Actor Boundaries', '20'],
    ['Figure 3.3', 'StarUML Class Diagram & Domain Model', '23'],
    ['Figure 3.4', 'StarUML Sequence Diagram & Message Flow', '25'],
    ['Figure 3.5', 'StarUML Activity Diagram & Workflow Logic', '26'],
    ['Figure 3.6', 'StarUML Deployment Diagram & Hardware Nodes', '27'],
    ['Figure 4.1', 'Frontend Architecture (Layered React Model)', '29'],
    ['Figure 4.2', 'Backend Architecture (Application Server Layer)', '30'],
    ['Figure 4.3', 'Data Schema Design (Database Relational Model)', '31'],
    ['Figure 4.4', 'Data Flow Diagram (DFD Level 0 Context Level)', '33'],
    ['Figure 5.1.1', 'BikeCare AI Customer Storefront & Hero UI', '36'],
    ['Figure 5.1.2', 'AI Sound & Noise Diagnostic Scanner UI', '37'],
    ['Figure 5.1.3', 'Doorstep Booking & Package Configurator UI', '38'],
    ['Figure 5.1.4', 'Live Digital Job Card Tracking Console', '39'],
    ['Figure 5.1.5', 'Standardized Service Packages Catalog UI', '40'],
    ['Figure 5.1.6', 'Customer Review & Star Rating Submission UI', '41'],
    ['Figure 5.1.7', 'Workshop Operations Admin Console (/admin)', '42'],
    ['Figure 5.2.1', 'Local JSON Database Schema in data/bikecare-db.json', '43'],
    ['Figure 6.1.1', 'Selenium IDE – Unit Diagnostic Test Execution', '46'],
    ['Figure 6.1.2', 'Selenium IDE – Doorstep Booking Test Execution', '47']
  ];
  addTable(['Figure No.', 'Figure Title & Description', 'Page No.'], figList, [75, 335, 75], 10);

  doc.moveDown(0.15);
  addH2('List of Tables');
  const tblList = [
    ['Table 1.1', 'Stakeholder Role & Responsibility Matrix', '11'],
    ['Table 1.2', 'Economic Feasibility & Cost Estimation', '12'],
    ['Table 1.3', 'Requirement Prioritization (MoSCoW Matrix)', '12'],
    ['Table 2.1', 'Project Schedule & Gantt Milestones', '16'],
    ['Table 2.2', 'Risk Assessment & Mitigation Matrix', '17'],
    ['Table 4.1', 'Database Entity Schema Definition', '32'],
    ['Table 6.1', 'Unit Testing Execution Matrix', '46'],
    ['Table 6.2', 'Black-Box & Boundary Testing Matrix', '47'],
    ['Table 6.4', 'Comprehensive System Test Suite (TC01–TC15)', '48']
  ];
  addTable(['Table No.', 'Table Title & Description', 'Page No.'], tblList, [75, 335, 75], 10);

  doc.moveDown(0.15);
  addH2('List of Abbreviations & Acronyms');
  const abbrRows = [
    ['AI / LLM', 'Artificial Intelligence / Large Language Model', 'SPA', 'Single Page Application (React)'],
    ['SDK', 'Software Development Kit (Google GenAI)', 'REST', 'Representational State Transfer (HTTP)'],
    ['RBAC', 'Role-Based Access Control', 'DFD', 'Data Flow Diagram'],
    ['ERD', 'Entity-Relationship Diagram', 'WBS', 'Work Breakdown Structure'],
    ['OBD / CAN', 'On-Board Diagnostics / Controller Area Network', 'JSON', 'JavaScript Object Notation']
  ];
  addTable(['Acronym', 'Definition / Expansion', 'Acronym', 'Definition / Expansion'], abbrRows, [75, 170, 75, 170], 10);
}

module.exports = { renderPrelims };
