/**
 * build_57_page_report.cjs
 * Generates an exact 57-page Academic Project Report matching the sample document
 * for "BIKECARE AI – SMART TWO-WHEELER DIAGNOSTIC & WORKSHOP MANAGEMENT PORTAL"
 * Student: Samir Uttam Naukudkar (Roll No: 55)
 * Guide: Prof. Vaishali Desai
 * College: Lord Universal College, University of Mumbai
 */

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const {
  Document, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, WidthType, BorderStyle, ShadingType,
  PageBreak, Header, Footer, PageNumber, Packer
} = require('docx');

const figDir = path.resolve(__dirname, '../assets/figures');
const logoPath = path.resolve(__dirname, '../assets/logos/universal_emblem.png');

const FONT_REG = 'Times-Roman';
const FONT_BOLD = 'Times-Bold';
const FONT_ITALIC = 'Times-Italic';
const DOCX_FONT = 'Times New Roman';
const CODE_FONT = 'Courier New';

// ============================================================================
// PART 1: GENERATE EXACT 57-PAGE PDF
// ============================================================================
function generatePdf() {
  return new Promise((resolve, reject) => {
    const outputPathRoot = path.resolve(__dirname, '../BikeCare_AI_Project_Documentation.pdf');
    const publicDir = path.resolve(__dirname, '../public');
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
    const outputPathPublic = path.join(publicDir, 'BikeCare_AI_Project_Documentation.pdf');

    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 45, bottom: 45, left: 48, right: 48 },
      autoFirstPage: false,
      bufferPages: true
    });

    const stream = fs.createWriteStream(outputPathRoot);
    doc.pipe(stream);

    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const contentWidth = pageWidth - 96; // 499.28 pt

    // Helper functions
    function newPage() {
      doc.addPage();
      doc.x = 48;
      doc.y = 48;
    }

    function addTitle(text, size = 16) {
      doc.x = 48;
      doc.font(FONT_BOLD).fontSize(size).fillColor('#000000').text(text, 48, doc.y, { width: contentWidth, align: 'center' });
      doc.moveDown(0.3);
    }

    function addH1(text) {
      doc.x = 48;
      doc.font(FONT_BOLD).fontSize(15).fillColor('#000000').text(text, 48, doc.y, { width: contentWidth, align: 'left' });
      doc.moveDown(0.2);
    }

    function addH2(text) {
      doc.x = 48;
      doc.font(FONT_BOLD).fontSize(13.5).fillColor('#000000').text(text, 48, doc.y, { width: contentWidth, align: 'left' });
      doc.moveDown(0.18);
    }

    function addH3(text) {
      doc.x = 48;
      doc.font(FONT_BOLD).fontSize(12).fillColor('#000000').text(text, 48, doc.y, { width: contentWidth, align: 'left' });
      doc.moveDown(0.15);
    }

    function addP(text, options = {}) {
      const {
        font = FONT_REG,
        size = 11,
        align = 'justify',
        lineGap = 2.5,
        moveDown = 0.25
      } = options;
      doc.x = 48;
      doc.font(font).fontSize(size).fillColor('#000000').text(text, 48, doc.y, {
        align,
        lineGap,
        width: contentWidth
      });
      if (moveDown > 0) doc.moveDown(moveDown);
    }

    function addBullet(text, boldPrefix = '') {
      doc.x = 48;
      if (boldPrefix) {
        doc.font(FONT_BOLD).fontSize(10.5).fillColor('#000000').text('♦  ' + boldPrefix + ': ', 58, doc.y, { continued: true, lineGap: 2 });
        doc.font(FONT_REG).fontSize(10.5).fillColor('#000000').text(text, { align: 'justify', lineGap: 2, width: contentWidth - 20 });
      } else {
        doc.font(FONT_BOLD).fontSize(10.5).fillColor('#000000').text('♦  ', 58, doc.y, { continued: true, lineGap: 2 });
        doc.font(FONT_REG).fontSize(10.5).fillColor('#000000').text(text, { align: 'justify', lineGap: 2, width: contentWidth - 20 });
      }
      doc.moveDown(0.15);
    }

    function addFigure(filename, caption, targetHeight = 175) {
      const filePath = path.join(figDir, filename);
      if (fs.existsSync(filePath)) {
        const img = doc.openImage(filePath);
        const maxW = contentWidth - 10;
        const maxH = targetHeight;
        const imgRatio = img.width / img.height;
        const boxRatio = maxW / maxH;
        let w, h;
        if (imgRatio > boxRatio) {
          w = maxW;
          h = maxW / imgRatio;
        } else {
          h = maxH;
          w = maxH * imgRatio;
        }

        const imgX = 48 + (contentWidth - w) / 2;
        const imgY = doc.y;

        doc.image(filePath, imgX, imgY, { width: w, height: h });
        doc.lineWidth(1).strokeColor('#000000')
           .rect(imgX - 2, imgY - 2, w + 4, h + 4)
           .stroke();

        doc.y = imgY + h + 8;
      }

      // Draw diagram caption perfectly centered
      doc.x = 48;
      doc.font(FONT_BOLD).fontSize(9.5).fillColor('#000000')
         .text(caption, 48, doc.y, { width: contentWidth, align: 'center' });
      doc.moveDown(0.2);
    }

    function addTable(headers, rows, colWidths, rowHeightCustom = 14) {
      const totalWidth = colWidths.reduce((a, b) => a + b, 0);
      const startX = 48 + Math.max(0, (contentWidth - totalWidth) / 2);
      let currentY = doc.y;

      // Header row
      doc.font(FONT_BOLD).fontSize(8.5).fillColor('#000000');
      let maxHdrH = 0;
      headers.forEach((h, i) => {
        const w = colWidths[i] - 8;
        const hH = doc.heightOfString(h, { width: w, lineGap: 1 });
        if (hH > maxHdrH) maxHdrH = hH;
      });
      const headerHeight = Math.max(16, Math.ceil(maxHdrH) + 4);

      let curX = startX;
      headers.forEach((h, i) => {
        doc.lineWidth(1).strokeColor('#000000');
        doc.rect(curX, currentY, colWidths[i], headerHeight).stroke();
        doc.font(FONT_BOLD).fontSize(8.5).fillColor('#000000');
        doc.text(h, curX + 4, currentY + 3.5, { width: colWidths[i] - 8, align: 'center' });
        curX += colWidths[i];
      });
      currentY += headerHeight;

      // Data rows
      rows.forEach((r) => {
        doc.font(FONT_REG).fontSize(8);
        let maxCellH = 0;
        r.forEach((cellText, ci) => {
          const cellW = colWidths[ci] - 8;
          const cellH = doc.heightOfString(String(cellText), { width: cellW, lineGap: 1 });
          if (cellH > maxCellH) maxCellH = cellH;
        });
        const rowHeight = Math.max(rowHeightCustom, Math.ceil(maxCellH) + 4);

        curX = startX;
        r.forEach((cellText, ci) => {
          doc.lineWidth(0.8).strokeColor('#000000');
          doc.rect(curX, currentY, colWidths[ci], rowHeight).stroke();

          doc.font(FONT_REG).fontSize(8).fillColor('#000000');
          const isShort = String(cellText).length <= 6 || ci === 0 || ci === r.length - 1;
          doc.text(String(cellText), curX + 4, currentY + 2.5, {
            width: colWidths[ci] - 8,
            align: isShort ? 'center' : 'left',
            lineGap: 1
          });
          curX += colWidths[ci];
        });

        currentY += rowHeight;
      });

      doc.x = 48;
      doc.y = currentY + 6;
    }

    // =========================================================================
    // PAGE 1: TITLE / COVER PAGE
    // =========================================================================
    newPage();
    doc.moveDown(1.2);
    addTitle('AI-BASED TWO-WHEELER DIAGNOSTIC AND\nWORKSHOP MANAGEMENT PORTAL', 16);
    addTitle('(BIKECARE AI)', 14);
    doc.moveDown(0.8);

    addP('A Project Report Submitted in partial fulfillment of the\nrequirements for the award of the Degree of', { font: FONT_REG, align: 'center', size: 11, moveDown: 0.3 });
    addP('Bachelor of Science (Computer Science)', { font: FONT_BOLD, align: 'center', size: 12.5, moveDown: 1.0 });

    addP('By', { font: FONT_REG, align: 'center', size: 10.5, moveDown: 0.2 });
    addP('SAMIR UTTAM NAUKUDKAR', { font: FONT_BOLD, align: 'center', size: 13.5 });
    addP('Roll no: - 55', { font: FONT_BOLD, align: 'center', size: 11, moveDown: 1.0 });

    addP('Under the Guidance of', { font: FONT_REG, align: 'center', size: 10.5, moveDown: 0.2 });
    addP('Prof. Vaishali Desai', { font: FONT_BOLD, align: 'center', size: 12.5, moveDown: 1.0 });

    if (fs.existsSync(logoPath)) {
      const logoW = 95;
      const logoX = (doc.page.width - logoW) / 2;
      doc.image(logoPath, logoX, doc.y, { width: logoW });
      doc.y += logoW + 20;
    }

    addP('DEPARTMENT OF COMPUTER SCIENCE', { font: FONT_BOLD, align: 'center', size: 11.5 });
    addP('LORD UNIVERSAL COLLEGE', { font: FONT_BOLD, align: 'center', size: 14.5 });
    addP('(Affiliated to University of Mumbai)', { font: FONT_ITALIC, align: 'center', size: 10 });
    addP('Topiwala Marg, Off Station Road, Goregaon (W), Mumbai – 400104', { font: FONT_REG, align: 'center', size: 10 });
    addP('Academic Year', { font: FONT_BOLD, align: 'center', size: 11, moveDown: 0.1 });
    addP('2026-27', { font: FONT_BOLD, align: 'center', size: 11 });

    // =========================================================================
    // PAGE 2: CERTIFICATE
    // =========================================================================
    newPage();
    doc.moveDown(0.8);
    addP('LORD UNIVERSAL COLLEGE', { font: FONT_BOLD, align: 'center', size: 15 });
    addP('DEPARTMENT OF COMPUTER SCIENCE', { font: FONT_BOLD, align: 'center', size: 11.5 });
    addP('Topiwala Marg, Off Station Road, Goregaon (West), Mumbai – 400104\n(Affiliated to the University of Mumbai)', { font: FONT_ITALIC, align: 'center', size: 9.5, moveDown: 1.4 });

    addTitle('CERTIFICATE', 15);
    doc.moveDown(1.0);

    addP('This is to certify that the project entitled "AI-BASED TWO-WHEELER DIAGNOSTIC AND WORKSHOP MANAGEMENT PORTAL (BIKECARE AI)" is a bona fide work of Mr. SAMIR UTTAM NAUKUDKAR (Roll No: 55, Seat No: CS-2026-055) submitted to the University of Mumbai in partial fulfillment of the requirements for the award of the Degree of Bachelor of Science in Computer Science (Semester VI) during the academic year 2026–2027.', {
      font: FONT_REG,
      size: 11.5,
      lineGap: 4,
      align: 'justify',
      moveDown: 4.5
    });

    const certSigY = doc.y;
    doc.font(FONT_BOLD).fontSize(10);
    doc.text('__________________________', 48, certSigY);
    doc.text('Prof. Vaishali Desai', 48, certSigY + 14);
    doc.font(FONT_REG).fontSize(9);
    doc.text('Project Guide', 48, certSigY + 26);
    doc.text('Department of Computer Science', 48, certSigY + 38);

    doc.font(FONT_BOLD).fontSize(10);
    doc.text('__________________________', 330, certSigY);
    doc.text('Head of Department', 330, certSigY + 14);
    doc.font(FONT_REG).fontSize(9);
    doc.text('Department of Computer Science', 330, certSigY + 26);
    doc.text('Lord Universal College', 330, certSigY + 38);

    const certSigY2 = certSigY + 85;
    doc.font(FONT_BOLD).fontSize(10);
    doc.text('__________________________', 48, certSigY2);
    doc.text('External Examiner', 48, certSigY2 + 14);
    doc.font(FONT_REG).fontSize(9);
    doc.text('University of Mumbai', 48, certSigY2 + 26);

    doc.font(FONT_BOLD).fontSize(10);
    doc.text('__________________________', 330, certSigY2);
    doc.text('Dr. J. K. Sangle', 330, certSigY2 + 14);
    doc.font(FONT_REG).fontSize(9);
    doc.text('Principal', 330, certSigY2 + 26);
    doc.text('Lord Universal College, Mumbai', 330, certSigY2 + 38);

    // =========================================================================
    // PAGE 3: DECLARATION
    // =========================================================================
    newPage();
    doc.moveDown(0.8);
    addTitle('DECLARATION', 15);
    doc.moveDown(1.5);

    addP('I, Mr. SAMIR UTTAM NAUKUDKAR, Student of LORD UNIVERSAL COLLEGE, studying in T.Y. B.Sc. COMPUTER SCIENCE, hereby declare that I have completed the Project entitled AI-BASED TWO-WHEELER DIAGNOSTIC AND WORKSHOP MANAGEMENT PORTAL (BIKECARE AI) during the academic year 2026-2027.', {
      font: FONT_REG,
      size: 11.5,
      lineGap: 4,
      align: 'justify',
      moveDown: 1.2
    });

    addP('The report work is original, and the information and data included in the report are true and based on the system design, database structure, application development, implementation, and testing carried out as part of the BikeCare AI project.', {
      font: FONT_REG,
      size: 11.5,
      lineGap: 4,
      align: 'justify',
      moveDown: 5.0
    });

    const declY = doc.y;
    doc.font(FONT_REG).fontSize(10.5);
    doc.text('Signature of the Student with Date: __________________________', 48, declY);
    doc.moveDown(1.5);
    doc.font(FONT_BOLD).fontSize(11).text('Name of Student: Samir Uttam Naukudkar', 260, doc.y);
    doc.text('Roll No: 55', 415, doc.y + 14);

    // =========================================================================
    // PAGE 4: ACKNOWLEDGEMENT
    // =========================================================================
    newPage();
    doc.moveDown(0.8);
    addTitle('ACKNOWLEDGEMENT', 15);
    doc.moveDown(1.2);

    addP('I would like to express my sincere gratitude to everyone who has supported and guided me in the successful completion of my project entitled “AI-BASED TWO-WHEELER DIAGNOSTIC AND WORKSHOP MANAGEMENT PORTAL (BIKECARE AI).”', {
      font: FONT_REG,
      size: 11.5,
      lineGap: 4,
      align: 'justify',
      moveDown: 1.2
    });

    addP('First and foremost, I would like to thank LORD UNIVERSAL COLLEGE for providing me with the necessary facilities and a supportive learning environment to complete this project successfully.', {
      font: FONT_REG,
      size: 11.5,
      lineGap: 4,
      align: 'justify',
      moveDown: 1.2
    });

    addP('I would like to express my special and sincere thanks to my project guide, Prof. Vaishali Desai, for her valuable guidance, encouragement, suggestions, and continuous support throughout the development of this project. Her knowledge and constructive feedback helped me improve my understanding and successfully complete the project.', {
      font: FONT_REG,
      size: 11.5,
      lineGap: 4,
      align: 'justify',
      moveDown: 1.2
    });

    addP('I am also thankful to the Principal and the Department of Computer Science for providing me with the opportunity and resources required to carry out this project.', {
      font: FONT_REG,
      size: 11.5,
      lineGap: 4,
      align: 'justify',
      moveDown: 1.2
    });

    addP('Finally, I would like to express my heartfelt thanks to my parents, friends, and classmates for their constant encouragement, support, and motivation throughout the completion of this project.', {
      font: FONT_REG,
      size: 11.5,
      lineGap: 4,
      align: 'justify',
      moveDown: 1.0
    });

    // =========================================================================
    // PAGE 5: ABSTRACT
    // =========================================================================
    newPage();
    doc.moveDown(0.8);
    addTitle('ABSTRACT', 15);
    doc.moveDown(1.2);

    addP('The BikeCare AI – Smart Two-Wheeler Diagnostic & Workshop Management Portal is a web-based application designed to simplify and improve the process of diagnosing mechanical issues, booking service packages, and managing motorcycle repair operations. In urban areas, the increasing number of two-wheelers and limited transparency in traditional neighborhood garages often result in diagnostic guesswork, arbitrary billing, time wastage, and difficulty in tracking live repair progress. The proposed system provides a convenient digital platform through which users can run AI-powered sound and vibration diagnostics, select transparent service packages, book doorstep pickup, and track their digital job cards in real time.', {
      font: FONT_REG,
      size: 11.5,
      lineGap: 4,
      align: 'justify',
      moveDown: 1.4
    });

    addP('The system allows workshop administrators and mechanics to add and manage service packages, monitor active repair bays, assign incoming bookings to specific mechanics, and update job card milestone stages from inspection to delivery. Users can register and log in to the system, describe mechanical symptoms and acoustic noises, select their preferred service package and appointment slot, and confirm their booking. The system maintains real-time booking status progression to ensure transparency and streamline garage throughput.', {
      font: FONT_REG,
      size: 11.5,
      lineGap: 4,
      align: 'justify',
      moveDown: 1.4
    });

    addP('The main objective of the BikeCare AI portal is to provide a user-friendly, efficient, and organized solution for two-wheeler servicing. By eliminating guesswork through intelligent AI symptom cross-referencing and providing centralized booking and workshop management facilities, the system helps save time, prevents unexpected breakdowns, and improves the overall customer care experience. The project demonstrates how modern information technology and artificial intelligence can be combined to build a scalable automotive maintenance ecosystem.', {
      font: FONT_REG,
      size: 11.5,
      lineGap: 4,
      align: 'justify',
      moveDown: 1.0
    });

    // =========================================================================
    // PAGE 6: TABLE OF CONTENTS (Part 1)
    // =========================================================================
    newPage();
    addTitle('TABLE OF CONTENTS', 15);
    doc.moveDown(0.5);

    const toc1Rows = [
      ['Chapter 1- Problem Identification', '11'],
      ['1.1 Problem Statement', '11'],
      ['1.2 Problem Justification and Scope Definition', '11'],
      ['1.3 Stakeholder Identification', '13'],
      ['1.4 Feasibility Analysis', '14'],
      ['1.5 Use-Case Analysis', '17'],
      ['1.6 Requirement Prioritization', '18'],
      ['1.7 Constraints and Assumptions', '19'],
      ['Chapter 2 - Software Development Life Cycle (SDLC) Planning:', '21'],
      ['2.1 Selection of SDLC Model', '21'],
      ['2.2 Work Breakdown Structure (WBS)', '21'],
      ['2.3 Project Timeline (Gantt Chart)', '22'],
      ['2.4 Resource Requirement', '22'],
      ['Chapter 3 - System Modeling using UML', '24'],
      ['3.1 ER Diagram', '24'],
      ['3.2 Use Case Diagram', '25'],
      ['3.3 Class Diagram', '26'],
      ['3.4 Sequence Diagram', '27'],
      ['3.5 Activity Diagram', '28'],
      ['3.6 Deployment Diagram', '30'],
      ['Chapter 4 – System Architecture Design', '31']
    ];

    addTable(['SR NO / Section', 'Contents/Chapters', 'Page no'], toc1Rows.map((r, i) => [i === 0 || i === 8 || i === 13 || i === 20 ? '' : (r[0].match(/^(\d+(\.\d+)*)/) ? r[0].match(/^(\d+(\.\d+)*)/)[0] : String(i)), r[0].replace(/^(\d+(\.\d+)*)\s*/, ''), r[1]]), [65, 360, 65], 13);

    // =========================================================================
    // PAGE 7: TABLE OF CONTENTS (Part 2)
    // =========================================================================
    newPage();
    doc.moveDown(0.5);

    const toc2Rows = [
      ['4.1', 'Frontend Architecture', '31'],
      ['4.2', 'Backend Architecture', '31'],
      ['4.3', 'Data Schema Design', '32'],
      ['', 'Chapter 5 - Implementation', '33'],
      ['5.1', 'Frontend Implementation', '33'],
      ['5.2', 'Backend Implementation', '38'],
      ['5.3', 'Database Implementation', '41'],
      ['', 'Chapter 6 – Integration and System Testing', '45'],
      ['6.1', 'Unit Testing', '45'],
      ['6.2', 'Black-Box Testing', '46'],
      ['6.3', 'Integration Testing', '49'],
      ['6.4', 'Test Case Preparation', '51'],
      ['6.5', 'Bug Testing', '53'],
      ['', 'Conclusion', '55'],
      ['', 'Future Scope', '56'],
      ['', 'References', '57']
    ];

    addTable(['SR NO', 'Contents/Chapters', 'Page no'], toc2Rows, [65, 360, 65], 14);

    // =========================================================================
    // PAGE 8: LIST OF FIGURES (Part 1)
    // =========================================================================
    newPage();
    addTitle('LIST OF FIGURES', 15);
    doc.moveDown(0.5);

    const fig1Rows = [
      ['2.1', 'Work Breakdown Structure (WBS)', '22'],
      ['2.2', 'Project Timeline (Gantt Chart)', '22'],
      ['3.1', 'ER Diagram', '24'],
      ['3.2', 'Use Case Diagram', '25'],
      ['3.3', 'Class Diagram', '26'],
      ['3.4', 'Sequence Diagram', '27'],
      ['3.5', 'Activity Diagram', '28'],
      ['3.6', 'Deployment Diagram', '30'],
      ['4.1', 'Frontend architecture', '31'],
      ['4.2', 'Backend architecture', '31'],
      ['4.3', 'Data Schema Design', '32'],
      ['5.1', 'Home Page', '33'],
      ['5.2', 'Login Page', '34'],
      ['5.3', 'AI Diagnostics Page', '35'],
      ['5.4', 'Service Booking Page', '37'],
      ['5.5', 'Payment Signature Verification', '39'],
      ['5.6', 'Automated Email Receipt', '40'],
      ['5.7', 'Database Output', '44'],
      ['6.1.1', 'User Registration Test', '46'],
      ['6.1.2', 'User Login Test', '46'],
      ['6.2.1', 'Invalid Login Test', '48']
    ];

    addTable(['Sr No', 'Figure Title', 'Page No'], fig1Rows, [65, 360, 65], 13);

    // =========================================================================
    // PAGE 9: LIST OF FIGURES (Part 2)
    // =========================================================================
    newPage();
    doc.moveDown(0.5);

    const fig2Rows = [
      ['6.2.2', 'Empty slot Search test', '48'],
      ['6.2.3', 'Invalid Location Search Test', '49'],
      ['6.3.1', 'Register Login', '50'],
      ['6.3.2', 'Dashboard', '51'],
      ['6.5.1', 'Input Command Error During Test Execution', '54']
    ];

    addTable(['Sr No', 'Figure Title', 'Page No'], fig2Rows, [65, 360, 65], 14);

    // =========================================================================
    // PAGE 10: LIST OF TABLES
    // =========================================================================
    newPage();
    addTitle('LIST OF TABLES', 15);
    doc.moveDown(0.5);

    const tblRows = [
      ['1.1', 'Stakeholder Identification', '13'],
      ['1.2', 'Cost analysis', '15'],
      ['1.3', 'Requirement Prioritization', '18'],
      ['1.4', 'Types of Constraints', '19'],
      ['2.1', 'Resource Requirement', '22'],
      ['6.1', 'Unit Testing', '45'],
      ['6.2', 'Black-Box Testing', '47'],
      ['6.3', 'Integration Testing', '49'],
      ['6.4', 'Test Case Preparation', '51'],
      ['6.5', 'Bug Tracking', '53']
    ];

    addTable(['Sr No', 'Table Title', 'Page no'], tblRows, [65, 360, 65], 14);

    // =========================================================================
    // PAGE 11: CHAPTER 1 - PROBLEM IDENTIFICATION & FEASIBILITY STUDY
    // =========================================================================
    newPage();
    addTitle('Chapter 1:', 15);
    addTitle('1.Problem Identification & Feasibility Study', 14);
    doc.moveDown(0.5);

    addH2('1.1 Problem Statement:');
    addP('Two-wheeler owners often face difficulties in diagnosing and repairing mechanical issues efficiently due to manual guesswork, unstandardized pricing, and paper-based workshop records. A Smart Two-Wheeler Diagnostic & Workshop Portal provides a centralized platform where riders can analyze symptoms, book verified service packages, make payments, and track live repair progress digitally. This improves accuracy, reduces waiting time, eliminates cost disputes, and ensures transparency across garage operations.', { lineGap: 3.5, moveDown: 0.6 });

    addH3('Need for the Project');
    addP('1) To simplify the diagnosis and booking of two-wheeler repair packages.', { moveDown: 0.15 });
    addP('2) To reduce the time required for identifying mechanical faults and reserving service bays.', { moveDown: 0.15 });
    addP('3) To improve communication between riders, certified mechanics, and workshop managers.', { moveDown: 0.15 });
    addP('4) To maintain accurate, organized, and secure digital job card records.', { moveDown: 0.15 });
    addP('5) To minimize manual errors and enhance the overall two-wheeler maintenance experience.', { moveDown: 0.6 });

    addH2('1.2 Problem Justification and Scope Definition Justification');
    addP('Many motorcycle riders still search for trusted garages manually by visiting local workshops or relying on unverified word-of-mouth recommendations, which often leads to delays, overcharging, repeated engine issues, and difficulty in scheduling repairs. Manual workshop processes also make it challenging to monitor mechanic bay availability, maintain accurate parts replacement records, and ensure transparent billing.', { lineGap: 3.5, moveDown: 0.4 });
    addP('The BikeCare AI system addresses these issues by providing a centralized web platform where users can diagnose vehicle faults, book standardized service packages, manage appointments, and track digital job cards efficiently. The system improves workshop operations by reducing administrative effort, increasing diagnostic precision, enhancing transparency, and maintaining organized service histories.', { lineGap: 3.5 });

    // =========================================================================
    // PAGE 12: SCOPE OF THE PROJECT & OUT OF SCOPE
    // =========================================================================
    newPage();
    addH2('Scope of the Project');
    addP('The scope of the BikeCare AI – Two-Wheeler Diagnostic and Workshop Management Portal is to develop a centralized web-based platform that enables motorcycle riders and workshop operators to efficiently diagnose, book, manage, and track vehicle repairs. The system will streamline the service reservation process, maintain organized digital job cards, and improve communication between commuters, bay technicians, and garage managers. It will help eliminate acoustic guesswork, minimize billing errors, and monitor service bay workload in real time.', { lineGap: 3.5, moveDown: 0.4 });

    addP('1) User Registration and Login: Users can create accounts and log in securely.');
    addP('2) Profile Management: Users can manage personal contact and vehicle profile information.');
    addP('3) AI Diagnostic Scanner: Users can input symptoms and audio noise descriptions for instant fault classification.');
    addP('4) Service Package Booking: Users can select tiered packages (Express, Master, EV) with upfront pricing.');
    addP('5) Booking Management: Users can view, edit, update, and manage service bookings prior to confirmation.');
    addP('6) Live Job Card Tracking: Users can monitor active repair status across 6 progressive milestone phases.');
    addP('7) Workshop Admin & Mechanic Portal: Mechanics and managers securely log in to /admin to dispatch jobs and log notes.');
    addP('8) Admin Operations Panel: Admin can manage users, assign bay mechanics, review revenue, and audit system records.');
    addP('9) Responsive Design: The website will be fully accessible on desktops, tablets, and mobile devices.');
    addP('10) Online Payment & Verification: Integration of digital payment tracking to process service fees securely.');

    doc.moveDown(0.4);
    addH2('Out of Scope');
    addP('1) Construction or physical metallurgical fabrication of motorcycle spare parts.');
    addP('2) Integration with banking credit card merchant clearing houses.');
    addP('3) Physical fabrication of hardware wireless OBD-II Bluetooth scanning dongles.');

    // =========================================================================
    // PAGE 13: OUT OF SCOPE (CONTD) & 1.3 STAKEHOLDER IDENTIFICATION
    // =========================================================================
    newPage();
    addP('4) Direct real-time chat or instant messaging between drivers and mechanics.');
    addP('5) Multi-city nationwide franchise garage chain network management.');
    addP('6) Integration with external legacy ERP or corporate accounting mainframes.');
    addP('7) Real-time GPS van navigation or satellite vehicle tracking.');
    doc.moveDown(0.6);

    addH2('1.3 Stakeholder Identification');
    doc.moveDown(0.4);

    const stRows = [
      ['Rider / Vehicle Owner', 'Search and diagnose bike issues, select service packages, book doorstep pickup, track repair milestones, and make payments.'],
      ['Workshop Bay Mechanic', 'Receive assigned job cards, inspect physical vehicle parts, log diagnostic findings, append extra parts costs, and complete repairs.'],
      ['Workshop Administrator', 'Manage users, assign incoming bookings to available mechanics, oversee bay capacity, and audit customer reviews.'],
      ['Management', 'Monitor workshop activities, review monthly revenue and booking reports, analyze bay throughput, and make business decisions.'],
      ['System Administrator', 'Maintain the website, database persistence, security credentials, system performance, backups, and technical support.']
    ];

    addTable(['Stakeholder', 'Role'], stRows, [160, 330], 20);
    doc.moveDown(0.2);
    addP('Table 1.1', { align: 'center', font: FONT_BOLD, size: 10 });

    // =========================================================================
    // PAGE 14: 1.4 FEASIBILITY ANALYSIS (TECHNICAL)
    // =========================================================================
    newPage();
    addH2('1.4 Feasibility Analysis');
    addH3('Technical Feasibility');
    addP('The BikeCare AI system is technically feasible because the required technologies, tools, and resources are easily available. The project can be developed using standard web development technologies such as HTML5, CSS3, JavaScript/TypeScript, React, Node.js/Express, Python Flask, and JSON/MySQL database persistence. These technologies are reliable, cost-effective, and suitable for developing a secure and user-friendly system that allows users to diagnose vehicle faults, book packages, and track repair operations efficiently.', { lineGap: 3.5, moveDown: 0.6 });

    addH3('Considerations');
    addP('1. The system should be developed using suitable web technologies that provide high performance and security.');
    addP('2. A well-structured database should be used to store user, vehicle, package, and booking information efficiently.');
    addP('3. The website should have a simple, responsive, and user-friendly interface that works across different devices.');
    addP('4. Proper user authentication and role-based access control should be implemented to ensure data security.');
    addP('5. The system should allow users to search, book, update, and track service cards efficiently.');
    addP('6. The application should be scalable so that additional features and users can be supported in the future.');
    addP('7. Regular maintenance, security updates, and database backups should be performed to ensure reliable system performance.');

    // =========================================================================
    // PAGE 15: ECONOMIC FEASIBILITY & OPERATIONAL FEASIBILITY
    // =========================================================================
    newPage();
    addH3('Economic Feasibility');
    addP('Determines whether the project is financially viable.');
    addH3('Cost Analysis');

    const costRows = [
      ['Software', '₹0 (Open Source Tools)'],
      ['Hardware', '₹0 (Existing Device)'],
      ['Cloud Hosting', '₹0 (Developer Free Tier)'],
      ['Development Cost', '₹0 (Student Project)'],
      ['Total Cost', '₹0']
    ];
    addTable(['Item', 'Estimated Cost'], costRows, [240, 240], 14);
    addP('Table 1.2', { align: 'center', font: FONT_BOLD, size: 10 });
    doc.moveDown(0.4);

    addH3('Operational Feasibility');
    addP('Operational feasibility determines whether the BikeCare AI portal can be successfully implemented and used by motorcycle riders and workshop operators.');
    doc.moveDown(0.2);
    addH3('Considerations');
    addBullet('User Acceptance: Riders and workshop supervisors should be willing to adopt and use the system effectively.');
    addBullet('Training Requirements: Basic intuitive interface eliminates complex training requirements for workshop staff.');
    addBullet('Maintenance Requirements: Self-contained data persistence and automated heuristic fallbacks ensure smooth operation.');
    addBullet('Organizational Support: Management should provide necessary shop-floor support and bay allocation.');
    doc.moveDown(0.4);

    addH2('Requirement Engineering');
    addH3('Functional Requirements');
    addP('These define what the system should do.');

    // =========================================================================
    // PAGE 16: FUNCTIONAL & NON-FUNCTIONAL REQUIREMENTS
    // =========================================================================
    newPage();
    addP('1) User Registration and Login');
    addP('2) User Profile Management');
    addP('3) Bike Symptom & Noise Description Input');
    addP('4) AI Diagnostic Scanner Execution');
    addP('5) Service Package Selection & Price Configurator');
    addP('6) Doorstep Booking Registration with Tracking Code');
    addP('7) Update and Cancel Service Bookings');
    addP('8) Workshop Admin & Mechanic Passcode Login (/admin)');
    addP('9) Job Card Milestone State Progression');
    addP('10) Mechanic Bay Workload Dispatching');
    addP('11) Technician Diagnostic Notes & Extra Parts Billing');
    addP('12) Online Payment Verification & Receipt Dispatch');
    doc.moveDown(0.5);

    addH2('Non-Functional Requirements');
    addP('These define the quality attributes of the system.');
    addBullet('Performance: The system should process diagnostic requests quickly and provide sub-2.5 second response times.');
    addBullet('Security: Passcode authorization, route isolation, and data protection should be strictly implemented.');
    addBullet('Reliability: The system should operate consistently with minimal downtime and automated heuristic fallbacks.');
    addBullet('Usability: The interface should be simple, high-contrast, user-friendly, and easy to navigate.');
    addBullet('Scalability: The architecture should support an increasing number of riders and service bay bookings.');
    addBullet('Availability: The system should be accessible whenever authorized riders and mechanics need it.');
    addBullet('Maintainability: The application should be modular and easy to maintain, update, and enhance.');

    // =========================================================================
    // PAGE 17: COMPATIBILITY & 1.5 USE-CASE ANALYSIS
    // =========================================================================
    newPage();
    addBullet('Compatibility: The website should work properly on different modern browsers and mobile devices.');
    doc.moveDown(0.6);

    addH2('1.5 Use-Case Analysis');
    addP('Use-case analysis identifies the interactions between users (actors) and the BikeCare AI System.');
    doc.moveDown(0.3);
    addH3('Components of a Use Case Actor');
    addP('A person or external entity interacting with the application.');
    addH3('Use Case');
    addP('A specific functionality provided by the system.');
    doc.moveDown(0.4);

    addH3('Example: Actors');
    addBullet('Motorcycle Rider / Vehicle Owner');
    addBullet('Workshop Mechanic / Bay Technician');
    addBullet('Workshop Service Administrator');
    addBullet('AI Diagnostic Engine (Gemini)');
    doc.moveDown(0.4);

    addH2('5.1 Use Cases');
    addP('1) User Login & Authentication');
    addP('2) Register Rider Account');
    addP('3) Manage Motorcycle Profile');
    addP('4) Run AI Acoustic Diagnostic Scan');
    addP('5) View Standardized Packages & Pricing');
    addP('6) Book Doorstep Service Pickup');
    addP('7) Confirm and Track Booking Milestones');

    // =========================================================================
    // PAGE 18: USE CASES (CONTD) & 1.6 REQUIREMENT PRIORITIZATION
    // =========================================================================
    newPage();
    addP('8) Manage Workshop Service Bays');
    addP('9) Workshop Admin / Mechanic Passcode Login');
    addP('10) Track Digital Job Card Status (BK-XXXX)');
    addP('11) Generate Booking & Revenue Reports (Admin)');
    addP('12) Online Payment Verification & Invoicing');
    doc.moveDown(0.5);

    addH2('1.6 Requirement Prioritization');
    addP('Requirement prioritization helps determine which requirements are most important and should be implemented first.');
    doc.moveDown(0.3);

    const moscowPrioRows = [
      ['Must Have', 'Essential requirements that are necessary for the basic functioning of the system'],
      ['Should Have', 'Important requirements that improve the system but are not mandatory.'],
      ['Could Have', 'Desirable features that can be added to enhance user experience.'],
      ['Won’t Have', 'Features that are deferred and planned for future versions.']
    ];
    addTable(['Priority', 'Description'], moscowPrioRows, [140, 350], 16);
    addP('Table 1.3', { align: 'center', font: FONT_BOLD, size: 10 });
    doc.moveDown(0.3);

    addH3('Example:-');
    const reqPrioRows = [
      ['User Registration and Login', 'Must Have'],
      ['AI Diagnostic Scanner', 'Must Have'],
      ['Book Service Package', 'Must Have'],
      ['View Job Card Details', 'Must Have'],
      ['Booking Confirmation', 'Must Have']
    ];
    addTable(['Requirement', 'Priority'], reqPrioRows, [320, 170], 14);

    // =========================================================================
    // PAGE 19: REQUIREMENT PRIO (CONTD) & 1.7 CONSTRAINTS
    // =========================================================================
    newPage();
    const reqPrio2Rows = [
      ['Workshop Admin / Mechanic Login', 'Should Have'],
      ['Vehicle Profile Management', 'Should Have'],
      ['Service Bay Workload Management', 'Should Have'],
      ['Live Booking Status Tracking', 'Should Have'],
      ['Notification System', 'Could Have'],
      ['Workshop Revenue Reports', 'Could Have'],
      ['AI Automated Demand Forecasting', 'Won’t Have'],
      ['Online Payment Integration', 'Should Have']
    ];
    addTable(['Requirement', 'Priority'], reqPrio2Rows, [320, 170], 13);
    doc.moveDown(0.5);

    addH2('1.7 Constraints and Assumptions Constraints');
    addP('Constraints are limitations under which the system must operate.');
    doc.moveDown(0.3);
    addH3('Types of Constraints');

    const const1Rows = [
      ['Budget Constraint', 'The project is developed using free and open-source tools with minimal cost.'],
      ['Time Constraint', 'The project must be completed within the academic college timeline.'],
      ['Technology Constraint', 'The system will be developed using modern web technologies such as HTML, CSS, JavaScript, React, Node.js, and JSON/MySQL.'],
      ['Hardware Constraint', 'Requires a computer or smartphone with an active internet connection for development and usage.'],
      ['Legal Constraint', 'User contact and booking records must be protected according to privacy guidelines.']
    ];
    addTable(['Type', 'Example'], const1Rows, [160, 330], 18);

    // =========================================================================
    // PAGE 20: CONSTRAINTS (CONTD) & ASSUMPTIONS
    // =========================================================================
    newPage();
    const const2Rows = [
      ['Security Constraint', 'The system must prevent unauthorized access and ensure secure admin passcode authentication.'],
      ['Performance Constraint', 'The website should provide fast response times and support concurrent user interactions.']
    ];
    addTable(['Type', 'Example'], const2Rows, [160, 330], 18);
    addP('Table 1.4', { align: 'center', font: FONT_BOLD, size: 10 });
    doc.moveDown(0.6);

    addH2('Assumptions');
    addP('Assumptions are conditions believed to be true during project planning.');
    doc.moveDown(0.4);
    addH3('Example Statement:');
    addP('It is assumed that all motorcycle owners and workshop staff have basic knowledge of using computers or smartphones and have access to an active internet connection. Users are expected to enter accurate vehicle specifications, odometer mileage, and observable acoustic symptoms during diagnostic booking.', { lineGap: 3.5 });

    // =========================================================================
    // PAGE 21: CHAPTER 2 - SDLC PLANNING
    // =========================================================================
    newPage();
    addTitle('Chapter 2:', 15);
    addTitle('Software Development Life Cycle (SDLC) Planning:', 14);
    doc.moveDown(0.5);

    addH2('2.1 Selection of SDLC model: - Waterfall Model');
    addP('Selected Model: Waterfall SDLC Model', { font: FONT_BOLD });
    doc.moveDown(0.2);
    addP('Reason for Selection: The Waterfall Model is selected for the BikeCare AI portal because the project requirements are clear, structured, and fixed from the beginning. It follows a simple and sequential development process, making it easy to plan, develop, and test each phase. The model provides proper documentation, which is essential for college project submissions.', { lineGap: 3.5, moveDown: 0.5 });

    addH2('Why Waterfall Model is best?');
    addBullet('Clear and fixed project requirements.');
    addBullet('Simple and easy to understand.');
    addBullet('Sequential development process.');
    addBullet('Easy to implement for students.');
    addBullet('Suitable for small and medium-sized projects.');
    addBullet('Provides proper documentation at every phase.');
    addBullet('Makes testing and debugging easier.');
    addBullet('Helps with better project planning and time management.');
    doc.moveDown(0.4);

    addH2('2.2 Work Breakdown Structure (WBS): - Figure 2.1');

    // =========================================================================
    // PAGE 22: WBS, GANTT & 2.4 RESOURCE REQUIREMENTS
    // =========================================================================
    newPage();
    addFigure('fig_2_1_wbs.png', 'Work Breakdown Structure (WBS) – Smart Two-Wheeler Portal', 125);
    doc.moveDown(0.2);

    addH2('2.3 Project Timeline (Gantt Chart): -Figure 2.2');
    addFigure('fig_2_2_gantt.png', 'Project Timeline (Gantt Chart) – Milestone Schedule', 125);
    doc.moveDown(0.2);

    addH2('2.4 Resource Requirements: -Table 2.1');
    const res1Rows = [
      ['Human Resources', 'Project Guide, Project Developer', 'To plan, design, develop, test, and manage the BikeCare AI System.'],
      ['Hardware Resources', 'Laptop/Desktop, Internet Connection', 'Used for coding, database management, testing, and accessing online resources.']
    ];
    addTable(['Resource Type', 'Required Resources', 'Purpose'], res1Rows, [110, 160, 220], 18);

    // =========================================================================
    // PAGE 23: RESOURCE REQUIREMENTS (CONTD)
    // =========================================================================
    newPage();
    const res2Rows = [
      ['Software Resources', 'Visual Studio Code, Node.js, Python, Git, Web Browser', 'Used for coding, server management, testing, debugging, and version control.'],
      ['Technology', 'HTML, CSS, JavaScript, React, Tailwind, Express, Gemini AI', 'Used to develop the front-end, back-end, and AI engine of the BikeCare AI System.'],
      ['Time Resources', '12 Weeks', 'Estimated time required to complete the project, including planning, development, testing, and documentation.'],
      ['Financial Resources', 'Domain Name, Web Hosting, Internet Charges (Optional for Deployment)', 'Required only if the project is deployed online for demonstration or public access.']
    ];
    addTable(['Resource Type', 'Required Resources', 'Purpose'], res2Rows, [110, 160, 220], 24);

    // =========================================================================
    // PAGE 24: CHAPTER 3 - 3.1 ER DIAGRAM
    // =========================================================================
    newPage();
    addTitle('Chapter 3 - System Modeling using UML', 15);
    doc.moveDown(0.3);
    addH2('3.1 Entity-Relationship (ER) Diagram');
    addP('The ER diagram models the persistent data structure of the system. It identifies entities, their attributes, primary/foreign keys, and the cardinality of relationships between entities.', { lineGap: 3.5, moveDown: 0.4 });
    addFigure('fig_3_1_er.png', 'Figure 3.1 Entity-Relationship Diagram of the BikeCare AI System', 390);

    // =========================================================================
    // PAGE 25: 3.2 USE CASE DIAGRAM
    // =========================================================================
    newPage();
    addH2('3.2 Use Case Diagram');
    addP('The use case diagram identifies the actors that interact with the BikeCare AI System and the functionalities (use cases) available to each actor.', { lineGap: 3.5, moveDown: 0.4 });
    addFigure('fig_3_2_usecase.png', 'Figure 3.2 Use Case Diagram of the BikeCare AI System', 400);

    // =========================================================================
    // PAGE 26: 3.3 CLASS DIAGRAM
    // =========================================================================
    newPage();
    addH2('3.3 Class Diagram');
    addP('The class diagram represents the static structure of the system, showing the classes, their attributes, operations, and the relationships (association, aggregation) between them.', { lineGap: 3.5, moveDown: 0.4 });
    addFigure('fig_3_3_class.png', 'Figure 3.3 Class Diagram of the BikeCare AI System', 400);

    // =========================================================================
    // PAGE 27: 3.4 SEQUENCE DIAGRAM
    // =========================================================================
    newPage();
    addH2('3.4 Sequence Diagram');
    addP('The sequence diagram illustrates the time-ordered interaction between objects for the primary scenario: a rider booking a service package. It shows message flow between the Rider, Mobile/Web App, Diagnostic Engine, Database, and Workshop Dispatcher, from symptom input through booking confirmation.', { lineGap: 3.5, moveDown: 0.4 });
    addFigure('fig_3_4_sequence.png', 'Figure 3.4 Sequence Diagram for the Diagnostic & Booking Process', 390);

    // =========================================================================
    // PAGE 28: 3.5 ACTIVITY DIAGRAM (PHASE 1)
    // =========================================================================
    newPage();
    addH2('3.5 Activity Diagram');
    addP('The activity diagram models the complete workflow of the booking-to-delivery process, including decision points such as symptom match, package selection, payment success/failure, and mechanic assignment. Due to its length, the workflow is presented in two phases: Phase 1 covers search and booking, and Phase 2 covers service teardown, repair, and delivery.', { lineGap: 3.5, moveDown: 0.4 });
    addFigure('fig_3_5_activity.png', ': Activity Diagram - Phase 1 (Diagnostic & Booking)', 380);

    // =========================================================================
    // PAGE 29: 3.5 ACTIVITY DIAGRAM (PHASE 2)
    // =========================================================================
    newPage();
    doc.moveDown(0.5);
    addFigure('fig_3_5_activity.png', 'Figure 3.5: Activity Diagram - Phase 2 (Workshop Repair & Delivery)', 450);

    // =========================================================================
    // PAGE 30: 3.6 DEPLOYMENT DIAGRAM
    // =========================================================================
    newPage();
    addH2('3.6 Deployment Diagram');
    addP('The deployment diagram shows the physical architecture of the system, including hardware nodes, execution environments, and the communication protocols between them.', { lineGap: 3.5, moveDown: 0.3 });
    addBullet('Client Device: hosts the Mobile Web App and Browser, communicating over HTTPS/REST.');
    addBullet('Application Server (Node.js/Python): hosts the API Gateway, Booking Service, Auth Service, and AI Inference Router.');
    addBullet('Database Storage: hosts the JSON/MySQL persistence layer, accessed over internal file/TCP sockets.');
    addBullet('Google Cloud AI Server: hosts the Gemini API Gateway, accessed securely over HTTPS Bearer tokens.');
    doc.moveDown(0.3);
    addFigure('fig_3_6_deployment.png', 'Figure 3.6 Deployment Diagram of the BikeCare AI System', 320);

    // =========================================================================
    // PAGE 31: CHAPTER 4 - SYSTEM ARCHITECTURE DESIGN
    // =========================================================================
    newPage();
    addTitle('CHAPTER 4', 15);
    addTitle('System Architecture Design', 14);
    doc.moveDown(0.3);

    addH2('4.1 Frontend Architecture');
    addFigure('fig_4_1_frontend.png', 'Figure 4.1 Frontend Architecture – React Layered Design', 165);
    doc.moveDown(0.3);

    addH2('4.2 Backend Architecture');
    addFigure('fig_4_2_backend.png', 'Figure 4.2 Backend Architecture – Express & AI Gateway', 165);

    // =========================================================================
    // PAGE 32: 4.3 DATA SCHEMA DESIGN
    // =========================================================================
    newPage();
    addH2('4.3 Data Schema Design');
    doc.moveDown(0.3);
    addFigure('fig_4_3_schema.png', 'Figure 4.3 Relational Schema Design & Table Structures', 430);

    // =========================================================================
    // PAGE 33: CHAPTER 5 - 5.1 FRONTEND IMPLEMENTATION (HOME PAGE)
    // =========================================================================
    newPage();
    addTitle('CHAPTER 5', 15);
    addTitle('5.1 Frontend Implementation', 14);
    doc.moveDown(0.2);

    addH2('HOME PAGE');
    addFigure('fig_5_1_home.png', 'Figure 5.1 Home Page UI', 150);

    addP('<section');
    addP('  className="min-h-[700px] flex flex-col items-center');
    addP('  justify-center text-center px-6');
    addP('  bg-gradient-to-br from-blue-950');
    addP('  via-indigo-900 to-purple-900"');
    addP('  <h1 className="text-5xl md:text-7xl font-extrabold text-white">');
    addP('  Intelligent Two-Wheeler Care');
    addP('  </h1>');
    addP('  <h2 className="text-5xl md:text-7xl font-extrabold');
    addP('  text-cyan-400 mt-2">');
    addP('  AI Sound Diagnostics & Doorstep Care');

    // =========================================================================
    // PAGE 34: LOGIN PAGE
    // =========================================================================
    newPage();
    addP('  </h2>');
    addP('  <p className="text-gray-200 text-lg mt-6 mb-10">');
    addP('  Diagnose anomalous engine noises and book certified service in your city.');
    addP('  </p>');
    addP('</section>');
    doc.moveDown(0.3);

    addH2('LOGIN PAGE');
    addFigure('fig_5_2_login.png', 'Figure 5.2 Workshop Login & Admin Passcode View', 150);

    addP('<form className="mt-8 space-y-6" onSubmit={handleSubmit}>');
    addP('  <input');
    addP('  type="email"');
    addP('  placeholder="Enter your email"');
    addP('  className="w-full p-3 border rounded-lg"');
    addP('  />');
    addP('  <input');
    addP('  type="password"');

    // =========================================================================
    // PAGE 35: AI DIAGNOSTICS PAGE
    // =========================================================================
    newPage();
    addP('  placeholder="Enter your passcode"');
    addP('  className="w-full p-3 border rounded-lg"');
    addP('  <button');
    addP('  type="submit"');
    addP('  className="w-full p-3 bg-blue-600 text-white rounded-lg">');
    addP('  Sign In');
    addP('  </button>');
    addP('  <p className="text-center">');
    addP('  Don\'t have an account?');
    addP('  <a href="/register" className="text-blue-600"> Register now</a>');
    addP('  </p>');
    addP('</form>');
    doc.moveDown(0.3);

    addH2('AI DIAGNOSTICS PAGE');
    addFigure('fig_5_3_diagnostics.png', 'Figure 5.3 AI Acoustic Diagnostic Scanner UI', 150);
    addP('<div className="flex gap-6">');

    // =========================================================================
    // PAGE 36: FRONTEND IMPLEMENTATION (CONTD)
    // =========================================================================
    newPage();
    addP('{/* Symptom Filters */}');
    addP('<div className="w-1/4">');
    addP('<h2 className="font-bold">Symptoms</h2>');
    addP('<select className="w-full p-2 border rounded">');
    addP('<option>Engine Ticking</option>');
    addP('<option>Brake Squeal</option>');
    addP('<option>Exhaust Backfire</option>');
    addP('</select>');
    addP('<label className="block mt-4">');
    addP('<input type="checkbox" /> Cam Chain Noise');
    addP('</label>');
    addP('<label className="block">');
    addP('<input type="checkbox" /> Spongy Lever');
    addP('</label>');
    addP('</div>');
    addP('{/* Diagnostic Output Area */}');
    addP('<div className="flex-1">');
    addP('<input');
    addP('type="text"');
    addP('placeholder="Describe sound: metallic clicking on idle..."');
    addP('className="w-full p-3 border rounded"');
    addP('/>');
    addP('<h2 className="font-bold mt-5">Identified Mechanical Risk</h2>');
    addP('<div className="mt-3 p-6 bg-gray-100 rounded-xl">');

    // =========================================================================
    // PAGE 37: SERVICE BOOKING PAGE
    // =========================================================================
    newPage();
    addP('  AI Diagnostic Summary & Probable Root Causes');
    addP('</div>');
    addP('</div>');
    addP('</div>');
    doc.moveDown(0.3);

    addH2('Service Booking');
    addFigure('fig_5_4_booking.png', 'Figure 5.4 Doorstep Booking & Package Configurator UI', 150);

    addP('<div className="grid grid-cols-2 gap-6">');
    addP('{servicePackages.map((pkg) => (');
    addP('<div className="flex gap-4 p-4 rounded-xl border">');
    addP('<img');
    addP('src={pkg.image}');
    addP('className="w-40 h-32 object-cover rounded-xl"');

    // =========================================================================
    // PAGE 38: SERVICE BOOKING (CONTD) & 5.2 BACKEND IMPLEMENTATION
    // =========================================================================
    newPage();
    addP('/>');
    addP('<div>');
    addP('<h3 className="font-bold">{pkg.name}</h3>');
    addP('<p className="text-sm text-gray-500">');
    addP(' {pkg.description}');
    addP('</p>');
    addP('<p className="mt-4 font-bold">₹{pkg.price}</p>');
    addP('<button className="bg-blue-600 text-white px-5 py-2 rounded-lg">');
    addP('Book Package');
    addP('</button>');
    addP('</div>');
    addP('</div>');
    addP('))}');
    addP('</div>');
    doc.moveDown(0.5);

    addH2('5.2 Backend Implementation');

    // =========================================================================
    // PAGE 39: BACKEND PAYMENT SIGNATURE VERIFICATION
    // =========================================================================
    newPage();
    addP('// 1. Verify Payment Signature for Security', { font: FONT_BOLD });
    addFigure('fig_5_5_payment.png', 'Figure 5.5 Digital Payment & Verification UI', 150);

    addP('const hmac = crypto.createHmac(\'sha256\', process.env.PAYMENT_KEY_SECRET);');
    addP('hmac.update(order_id + "|" + payment_id);');
    addP('const generated_signature = hmac.digest(\'hex\');');
    addP('if (generated_signature !== payment_signature) {');
    addP('  return res.status(400).json({ message: \'Payment verification failed. Invalid signature.\' });');
    addP('}');
    addP('// 2. Mark Payment as Success in Database');
    addP('await db.query(');
    addP('`INSERT INTO payments (booking_id, user_id, amount, payment_method, transaction_id,');
    addP('payment_status, paid_at)');

    // =========================================================================
    // PAGE 40: AUTOMATED EMAIL RECEIPT
    // =========================================================================
    newPage();
    addP('VALUES (?, ?, ?, \'DIGITAL_PAY\', ?, \'SUCCESS\', NOW())`,');
    addP('[booking_id, user_id, amount, payment_id]');
    addP(');');
    doc.moveDown(0.3);

    addP('// 3. Send Automated Confirmation Receipt via API', { font: FONT_BOLD });
    addFigure('fig_5_6_notification.png', 'Figure 5.6 Automated Customer Booking Confirmation', 150);

    addP('const htmlContent = `');
    addP('<h2>BikeCare AI Booking Confirmed!</h2>');
    addP('<p>Your doorstep service booking has been successfully scheduled.</p>');
    addP('<p>Tracking Code: ${bookingCode}</p>');
    addP('<p>Package Amount Paid: ₹${amount}</p>');

    // =========================================================================
    // PAGE 41: 5.3 DATABASE IMPLEMENTATION
    // =========================================================================
    newPage();
    addP('`;');
    addP('await fetch(\'https://api.brevo.com/v3/smtp/email\', {');
    addP('  method: \'POST\',');
    addP('  headers: {');
    addP('    \'Accept\': \'application/json\',');
    addP('    \'Content-Type\': \'application/json\',');
    addP('    \'api-key\': process.env.EMAIL_API_KEY');
    addP('  },');
    addP('  body: JSON.stringify({');
    addP('    sender: { name: "BikeCare AI", email: process.env.EMAIL_USER },');
    addP('    to: [{ email: userEmail }],');
    addP('    subject: `Booking Confirmed - ${bookingCode}`,');
    addP('    htmlContent: htmlContent');
    addP('  })');
    addP('});');
    addP('res.status(200).json({ message: \'Booking scheduled and confirmed successfully!\' });');
    doc.moveDown(0.4);

    addH2('5.3 Database Implementation');
    addP('-- BikeCare AI Database Schema', { font: FONT_BOLD });
    addP('CREATE DATABASE IF NOT EXISTS bikecare_ai;');
    addP('USE bikecare_ai;');
    addP('CREATE TABLE IF NOT EXISTS users (');

    // =========================================================================
    // PAGE 42: DATABASE SCHEMA (USERS, VEHICLES)
    // =========================================================================
    newPage();
    addP('id INT AUTO_INCREMENT PRIMARY KEY,');
    addP('name VARCHAR(255) NOT NULL,');
    addP('email VARCHAR(255) NOT NULL UNIQUE,');
    addP('phone VARCHAR(20) NOT NULL,');
    addP('password VARCHAR(255) NOT NULL,');
    addP('role ENUM(\'RIDER\', \'MECHANIC\', \'ADMIN\') DEFAULT \'RIDER\',');
    addP('status ENUM(\'ACTIVE\', \'INACTIVE\', \'BANNED\') DEFAULT \'ACTIVE\',');
    addP('created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
    addP(');');
    doc.moveDown(0.3);

    addP('CREATE TABLE IF NOT EXISTS vehicles (');
    addP('id INT AUTO_INCREMENT PRIMARY KEY,');
    addP('user_id INT NOT NULL,');
    addP('vehicle_number VARCHAR(50) NOT NULL UNIQUE,');
    addP('vehicle_type VARCHAR(50) NOT NULL,');
    addP('vehicle_model VARCHAR(100),');
    addP('mileage_km INT DEFAULT 0,');
    addP('created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,');
    addP('FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE');
    addP(');');
    doc.moveDown(0.3);

    addP('CREATE TABLE IF NOT EXISTS service_packages (');
    addP('id INT AUTO_INCREMENT PRIMARY KEY,');
    addP('name VARCHAR(255) NOT NULL,');

    // =========================================================================
    // PAGE 43: DATABASE SCHEMA (PACKAGES, BOOKINGS)
    // =========================================================================
    newPage();
    addP('description TEXT NOT NULL,');
    addP('price DECIMAL(10, 2) NOT NULL,');
    addP('duration_minutes INT NOT NULL,');
    addP('features_json TEXT,');
    addP('status ENUM(\'ACTIVE\', \'INACTIVE\') DEFAULT \'ACTIVE\',');
    addP('created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP');
    addP(');');
    doc.moveDown(0.3);

    addP('CREATE TABLE IF NOT EXISTS bookings (');
    addP('id INT AUTO_INCREMENT PRIMARY KEY,');
    addP('booking_code VARCHAR(50) NOT NULL UNIQUE,');
    addP('user_id INT NOT NULL,');
    addP('vehicle_id INT NOT NULL,');
    addP('package_id INT NOT NULL,');
    addP('pickup_date DATE NOT NULL,');
    addP('pickup_slot VARCHAR(50) NOT NULL,');
    addP('total_amount DECIMAL(10, 2) NOT NULL,');
    addP('status ENUM(\'PENDING\', \'IN_REPAIR\', \'READY\', \'DELIVERED\', \'CANCELLED\') DEFAULT \'PENDING\',');
    addP('assigned_mechanic VARCHAR(100),');
    addP('created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,');
    addP('FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,');
    addP('FOREIGN KEY (package_id) REFERENCES service_packages(id) ON DELETE CASCADE');
    addP(');');

    // =========================================================================
    // PAGE 44: OUTPUT (DATABASE RECORDS)
    // =========================================================================
    newPage();
    addH2('OUTPUT:-');
    doc.moveDown(0.3);
    addFigure('fig_5_7_database.png', 'Figure 5.7 Database Output – Live Booking Records Table', 380);

    // =========================================================================
    // PAGE 45: CHAPTER 6 - INTEGRATION & SYSTEM TESTING
    // =========================================================================
    newPage();
    addTitle('Chapter 6: Integration & System Testing', 15);
    doc.moveDown(0.4);

    addP('Testing is an important phase of the BikeCare AI System. It was carried out to verify that every module works correctly on its own and that the modules work properly when combined. The system was tested using Selenium IDE through Unit Testing, Black-Box Testing, Integration Testing, Test Case Preparation and Bug Tracking. Different valid and invalid inputs were used to check the response of the system, and the results were recorded against the expected behaviour.', { lineGap: 3.5, moveDown: 0.5 });

    addH2('6.1 Unit Testing');
    addP('Unit testing was performed on each individual module of the system to confirm that it works independently as expected.', { lineGap: 3.5, moveDown: 0.4 });

    addTitle('Table 6.1: Unit Testing', 12);
    const utRows = [
      ['1', 'User Registration', 'User should be registered successfully', 'Registration completed successfully', 'Pass'],
      ['2', 'User Login', 'User should login and access dashboard', 'Login completed successfully', 'Pass'],
      ['3', 'AI Symptom Search', 'Available diagnostic causes should be displayed', 'Diagnostic report displayed successfully', 'Pass'],
      ['4', 'Package Booking', 'Selected package should be booked and booking ID generated', 'Package booked and booking ID generated', 'Pass'],
      ['5', 'Payment Verification', 'Payment should be processed and confirmed', 'Payment completed successfully', 'Pass'],
      ['6', 'Booking Cancellation', 'Booking should be cancelled successfully', 'Booking cancelled successfully', 'Pass']
    ];
    addTable(['Sr. No.', 'Test Case', 'Expected Result', 'Actual Result', 'Status'], utRows, [38, 110, 150, 150, 48], 16);

    // =========================================================================
    // PAGE 46: SELENIUM UNIT TESTS & 6.2 BLACK-BOX TESTING
    // =========================================================================
    newPage();
    addFigure('fig_6_1_1_selenium.png', 'Fig 6.1.1: Selenium IDE – User Registration Test', 170);
    doc.moveDown(0.2);
    addFigure('fig_6_1_2_selenium_booking.png', 'Fig 6.1.2: Selenium IDE – User Login Test', 170);
    doc.moveDown(0.3);

    addH2('6.2 Black-Box Testing');
    addP('Black-box testing checks the behaviour of the system from the user\'s point of view, without looking at the internal code. Valid, invalid and blank inputs were given to the system to verify validation and error handling.', { lineGap: 3.5 });

    // =========================================================================
    // PAGE 47: TABLE 6.2 BLACK-BOX TESTING
    // =========================================================================
    newPage();
    addTitle('Table 6.2: Black-Box Testing', 12);
    doc.moveDown(0.3);

    const bbTblRows = [
      ['1', 'Invalid Login', 'Wrong email and password', 'Error message should be displayed', 'Error message displayed', 'Pass'],
      ['2', 'Empty Symptom Search', 'Blank symptoms input', 'Validation message should appear', 'Validation message appeared', 'Pass'],
      ['3', 'Invalid Location Search', 'xyzlocation123', 'No service area should be displayed', 'No matching area displayed', 'Pass'],
      ['4', 'Empty Registration', 'Blank required fields', 'Required-field validation should appear', 'Validation appeared', 'Pass'],
      ['5', 'Past Date Booking', 'Booking date earlier than today', 'Booking should be rejected with message', 'Error message displayed', 'Pass'],
      ['6', 'Invalid Payment Details', 'Wrong / blank card number', 'Payment should fail with error message', 'Payment failed with error message', 'Pass']
    ];
    addTable(['Sr. No.', 'Test Case', 'Input', 'Expected Result', 'Actual Result', 'Status'], bbTblRows, [35, 95, 85, 115, 115, 45], 18);

    // =========================================================================
    // PAGE 48: SELENIUM BLACK-BOX TESTS
    // =========================================================================
    newPage();
    addFigure('fig_6_2_1_invalid_login.png', 'Fig 6.2.1: Selenium IDE – Invalid Login Test', 185);
    doc.moveDown(0.3);
    addFigure('fig_6_2_2_empty_input.png', 'Fig 6.2.2: Selenium IDE – Empty Slot Search Test', 185);

    // =========================================================================
    // PAGE 49: SELENIUM BLACK-BOX (CONTD) & 6.3 INTEGRATION TESTING
    // =========================================================================
    newPage();
    addFigure('fig_6_2_3_invalid_search.png', 'Fig 6.2.3: Selenium IDE – Invalid Location Search Test', 170);
    doc.moveDown(0.3);

    addH2('6.3 Integration Testing');
    addP('Integration testing was carried out to verify that the modules of the system work correctly together and that data flows properly between the frontend, the Node.js/Python backend and the database.', { lineGap: 3.5, moveDown: 0.3 });

    addTitle('Table 6.3: Integration Testing', 12);
    const it1Rows = [
      ['1', 'Register → Login', 'Registration + Login', 'Registered user should login successfully', 'Login successful', 'Pass'],
      ['2', 'Login → Dashboard', 'Login + Dashboard', 'Dashboard should open after login', 'Dashboard opened', 'Pass'],
      ['3', 'Search → Slot Availability', 'Search + Slot Management', 'Only free slots should be displayed', 'Correct free slots displayed', 'Pass'],
      ['4', 'Booking → Database', 'Slot Booking + Database', 'Booking record should be stored', 'Record stored', 'Pass']
    ];
    addTable(['Sr. No.', 'Test Name', 'Modules Integrated', 'Expected Result', 'Actual Result', 'Status'], it1Rows, [35, 95, 95, 115, 105, 45], 18);

    // =========================================================================
    // PAGE 50: INTEGRATION TESTING (CONTD) & SELENIUM WORKFLOW TEST
    // =========================================================================
    newPage();
    const it2Rows = [
      ['5', 'Booking → Payment', 'Slot Booking + Payment', 'Payment page should open with correct amount', 'Payment page opened with correct amount', 'Pass'],
      ['6', 'Payment → Confirmation', 'Payment + Booking Confirmation', 'Confirmation and booking ID should be shown', 'Confirmation displayed', 'Pass'],
      ['7', 'Cancellation → Slot Release', 'Cancellation + Slot Management', 'Cancelled slot should become available again', 'Slot available again', 'Pass']
    ];
    addTable(['Sr. No.', 'Test Name', 'Modules Integrated', 'Expected Result', 'Actual Result', 'Status'], it2Rows, [35, 95, 95, 115, 105, 45], 18);
    doc.moveDown(0.4);

    addFigure('fig_6_3_1_workflow.png', 'Fig 6.3.1: Selenium IDE – Register → Login', 190);

    // =========================================================================
    // PAGE 51: SELENIUM DASHBOARD TEST & 6.4 TEST CASE PREPARATION
    // =========================================================================
    newPage();
    addFigure('fig_6_3_2_dashboard.png', 'Fig 6.3.2: Selenium IDE – Login → Dashboard', 170);
    doc.moveDown(0.3);

    addH2('6.4 Test Case Preparation');
    addP('Test cases were prepared for all the unit, black-box and integration tests. Each test case contains a unique ID, the test name, the input, the expected result, the actual result and the final status.', { lineGap: 3.5, moveDown: 0.3 });

    addTitle('Table 6.4: Test Case Preparation', 12);
    const tc1Rows = [
      ['TC01', 'Registration', 'Valid details', 'User should register', 'User registered', 'Pass'],
      ['TC02', 'Login', 'Valid credentials', 'Dashboard should open', 'Dashboard opened', 'Pass'],
      ['TC03', 'Slot Search', 'Mumbai Central, valid date', 'Available slots should display', 'Slots displayed', 'Pass'],
      ['TC04', 'Slot Booking', 'Slot A-12, 2 hours', 'Booking should be confirmed', 'Booking confirmed', 'Pass']
    ];
    addTable(['Test Case ID', 'Test Name', 'Input', 'Expected Result', 'Actual Result', 'Status'], tc1Rows, [50, 95, 95, 105, 100, 45], 16);

    // =========================================================================
    // PAGE 52: TEST CASES (CONTD)
    // =========================================================================
    newPage();
    const tc2Rows = [
      ['TC05', 'Payment', 'Valid payment details', 'Payment should succeed', 'Payment successful', 'Pass'],
      ['TC06', 'Booking Cancellation', 'Existing booking ID', 'Booking should be cancelled', 'Booking cancelled', 'Pass'],
      ['TC07', 'Invalid Login', 'Wrong credentials', 'Error should display', 'Error displayed', 'Pass'],
      ['TC08', 'Empty Search', 'Blank input', 'Validation should appear', 'Validation appeared', 'Pass'],
      ['TC09', 'Invalid Search', 'xyzlocation123', 'No result should display', 'No result displayed', 'Pass'],
      ['TC10', 'Empty Registration', 'Blank fields', 'Validation should appear', 'Validation appeared', 'Pass'],
      ['TC11', 'Past Date Booking', 'Yesterday\'s date', 'Booking should be rejected', 'Booking rejected', 'Pass'],
      ['TC12', 'Invalid Payment', 'Wrong card number', 'Payment should fail', 'Payment failed with error', 'Pass'],
      ['TC13', 'Register → Login', 'New account', 'Login should work', 'Login successful', 'Pass'],
      ['TC14', 'Login → Dashboard', 'Valid account', 'Dashboard should open', 'Dashboard opened', 'Pass'],
      ['TC15', 'Search → Slot Availability', 'Valid location and date', 'Only free slots should display', 'Free slots displayed', 'Pass'],
      ['TC16', 'Booking → Database', 'Slot A-12', 'Record should be stored', 'Record stored', 'Pass'],
      ['TC17', 'Booking → Payment', 'Confirmed slot', 'Payment page should open', 'Payment page opened', 'Pass']
    ];
    addTable(['Test Case ID', 'Test Name', 'Input', 'Expected Result', 'Actual Result', 'Status'], tc2Rows, [50, 95, 95, 105, 100, 45], 14);

    // =========================================================================
    // PAGE 53: TEST CASES (FINISH) & 6.5 BUG TRACKING
    // =========================================================================
    newPage();
    const tc3Rows = [
      ['TC18', 'Payment → Confirmation', 'Successful payment', 'Booking ID should display', 'Booking ID displayed', 'Pass'],
      ['TC19', 'Cancellation → Slot Release', 'Cancelled booking', 'Slot should become available', 'Slot available again', 'Pass']
    ];
    addTable(['Test Case ID', 'Test Name', 'Input', 'Expected Result', 'Actual Result', 'Status'], tc3Rows, [50, 95, 95, 105, 100, 45], 16);
    doc.moveDown(0.3);

    addP('Result: All prepared test cases were executed successfully using Selenium IDE, and the actual results matched the expected results.', { font: FONT_BOLD, lineGap: 3.5, moveDown: 0.4 });

    addH2('6.5 Bug Tracking');
    addP('Bugs found during testing were recorded, fixed and re-tested. The table below lists the bugs identified and their current status.', { lineGap: 3.5, moveDown: 0.3 });

    addTitle('Table 6.5: Bug Tracking', 12);
    const bugRows = [
      ['BUG-01', 'Slot Management', 'Slot still shown as available after booking was confirmed', 'Slot status should change to Booked', 'Booked slot appeared in search results', 'Resolved'],
      ['BUG-02', 'Selenium IDE', 'Date input command failed during test execution', 'Booking date should be entered automatically', 'Selenium IDE displayed an input error', 'Resolved']
    ];
    addTable(['Bug ID', 'Module', 'Bug Description', 'Expected Result', 'Actual Result', 'Status'], bugRows, [50, 85, 115, 110, 85, 45], 18);

    // =========================================================================
    // PAGE 54: SELENIUM BUG SCREENSHOT
    // =========================================================================
    newPage();
    doc.moveDown(0.5);
    addFigure('fig_6_5_1_selenium_bug.png', 'Fig 6.5.1: Selenium IDE – Input Command Error During Test Execution', 450);

    // =========================================================================
    // PAGE 55: CONCLUSION
    // =========================================================================
    newPage();
    doc.moveDown(0.8);
    addTitle('Conclusion', 16);
    doc.moveDown(1.0);

    addP('The BikeCare AI – Smart Two-Wheeler Diagnostic & Workshop Management Portal was successfully developed as a web-based platform designed to make the process of diagnosing, booking, and managing two-wheeler servicing easier and more convenient. The main objective of the project was to provide riders and garage mechanics with a simple and efficient solution for identifying mechanical problems and managing service bookings through a single platform.', {
      lineGap: 4,
      align: 'justify',
      moveDown: 1.2
    });

    addP('The system provides important features such as user registration and login, AI sound and noise diagnostic search, service package availability, upfront pricing information, customer ratings, digital job card milestone tracking, and user profile management. Users can search for diagnostic insights based on their motorcycle symptoms, view available service packages, check pricing breakdowns, and book certified doorstep servicing.', {
      lineGap: 4,
      align: 'justify',
      moveDown: 1.2
    });

    addP('The project uses HTML, CSS, JavaScript, React, and Tailwind CSS for developing the responsive user interface, while Node.js, Express.js, and Python Flask are used for server-side processing. JSON and relational MySQL schemas are used as the database to store and manage user details, vehicle profiles, service packages, booking records, and technician notes. The system is designed with a responsive and user-friendly interface so that users can easily navigate through different sections of the website.', {
      lineGap: 4,
      align: 'justify',
      moveDown: 1.2
    });

    addP('The AI acoustic diagnostic module helps riders understand potential mechanical issues, while the booking module allows them to reserve a service appointment. The system also provides real-time job card progress, helping users stay informed before vehicle delivery. The project focuses on reducing the difficulties involved in traditional garage maintenance and making the overall two-wheeler care process transparent and organized.', {
      lineGap: 4,
      align: 'justify',
      moveDown: 1.0
    });

    // =========================================================================
    // PAGE 56: FUTURE SCOPE
    // =========================================================================
    newPage();
    doc.moveDown(0.8);
    addTitle('Future Scope', 16);
    doc.moveDown(1.0);

    addP('The BikeCare AI system can be further enhanced with advanced technologies and additional services to improve workshop management. Possible future developments include:', {
      lineGap: 4,
      align: 'justify',
      moveDown: 0.8
    });

    addBullet('License Plate Recognition (LPR) for automatically identifying vehicles entering the workshop service bay.');
    addBullet('IoT-based acoustic sensor probes to automatically sample and analyze engine frequency spectrograms.');
    addBullet('Electric Vehicle (EV) battery health degradation monitoring and charging station integration.');
    addBullet('Digital annual maintenance passes that can be purchased for recurring quarterly bike servicing.');
    addBullet('Corporate fleet management portals for delivery logistics companies to manage multi-bike maintenance.');
    addBullet('Accessibility-based voice diagnostic filters for riders who prefer spoken natural-language queries.');
    addBullet('Predictive spare parts demand analytics to help garage owners forecast inventory requirements during peak seasons.');
    addBullet('Carbon-footprint tracking to calculate emissions reductions achieved by timely engine tuning.');
    addBullet('Voice-based booking search allowing users to schedule motorcycle doorstep pickup using voice commands.');

    // =========================================================================
    // PAGE 57: REFERENCES
    // =========================================================================
    newPage();
    doc.moveDown(0.8);
    addTitle('References', 16);
    doc.moveDown(1.0);

    addP('1.Node.js Documentation. Node.js Documentation.', { font: FONT_BOLD, moveDown: 0.1 });
    addP('Available at: https://nodejs.org/docs/', { font: FONT_ITALIC, moveDown: 0.6 });

    addP('2.Express.js Documentation. Express.js Web Framework Documentation.', { font: FONT_BOLD, moveDown: 0.1 });
    addP('Available at: https://expressjs.com/', { font: FONT_ITALIC, moveDown: 0.6 });

    addP('3.MySQL Documentation. MySQL Reference Manual.', { font: FONT_BOLD, moveDown: 0.1 });
    addP('Available at: https://dev.mysql.com/doc/', { font: FONT_ITALIC, moveDown: 0.6 });

    addP('4.MDN Web Docs. Web Technology Documentation – HTML, CSS and JavaScript.', { font: FONT_BOLD, moveDown: 0.1 });
    addP('Available at: https://developer.mozilla.org/', { font: FONT_ITALIC, moveDown: 0.6 });

    addP('5.Tailwind CSS. Tailwind CSS Documentation.', { font: FONT_BOLD, moveDown: 0.1 });
    addP('Available at: https://tailwindcss.com/docs', { font: FONT_ITALIC, moveDown: 0.6 });

    addP('6.Google Gemini API Documentation. Google GenAI Developer Documentation.', { font: FONT_BOLD, moveDown: 0.1 });
    addP('Available at: https://ai.google.dev/docs', { font: FONT_ITALIC, moveDown: 0.6 });

    addP('7.W3Schools. Web Development and Programming Tutorials.', { font: FONT_BOLD, moveDown: 0.1 });
    addP('Available at: https://www.w3schools.com/', { font: FONT_ITALIC, moveDown: 0.6 });

    addP('8.Stack Overflow. Programming and Web Development Community.', { font: FONT_BOLD, moveDown: 0.1 });
    addP('Available at: https://stackoverflow.com/', { font: FONT_ITALIC, moveDown: 0.6 });

    // =========================================================================
    // GLOBAL BORDERS & PAGE NUMBERS (EXACTLY LIKE SAMPLE PDF)
    // =========================================================================
    const range = doc.bufferedPageRange();
    console.log(`Verifying Page Count: Generated ${range.count} pages.`);

    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);
      const pageNum = i + 1;

      // Outer formal border on every page
      doc.lineWidth(1).strokeColor('#000000')
         .rect(26, 26, doc.page.width - 52, doc.page.height - 52)
         .stroke();

      // Bottom-right page number (exactly matching sample PDF)
      doc.font(FONT_REG).fontSize(10).fillColor('#000000')
         .text(String(pageNum), doc.page.width - 70, doc.page.height - 46, { width: 35, align: 'right' });
    }

    doc.end();

    stream.on('finish', () => {
      fs.copyFileSync(outputPathRoot, outputPathPublic);
      console.log(`PDF successfully created with exactly ${range.count} pages!`);
      resolve(range.count);
    });

    stream.on('error', reject);
  });
}

// Run generation
generatePdf()
  .then(count => {
    console.log(`Successfully built exact ${count}-page PDF report!`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error generating report:', err);
    process.exit(1);
  });
