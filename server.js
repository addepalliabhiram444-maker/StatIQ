import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE_PATH = path.resolve('./database.json');

app.use(cors());
app.use(express.json());

// ================================================================
// CONSTANTS
// ================================================================
const DESIGNATED_ADMIN_EMAIL    = "addepalliabhiram444@gmail.com";
const DESIGNATED_ADMIN_PASSWORD = "Abhiram@2007";

// ================================================================
// INITIAL DATABASE SEED
// ================================================================
const INITIAL_DATABASE_SEED = {
  version: "2.0.0",
  lastUpdated: new Date().toISOString(),
  designatedAdminEmail: DESIGNATED_ADMIN_EMAIL,

  // ---- USERS ----
  users: [
    {
      id: "emp_10928",
      email: "rajesh.sharma@mospi.gov.in",
      name: "Dr. Rajesh V. Sharma",
      designation: "Senior Statistical Officer (SSO)",
      department: "National Sample Survey Office (NSO FOD - North Zone)",
      cadre: "Subordinate Statistical Service (SSS)",
      empId: "MoSPI-SSS-2018-941",
      roleId: "sso",
      isAdmin: false,
      smartLearningScore: 845,
      maxScore: 1000,
      streakDays: 14,
      learningHoursThisMonth: 28.5,
      coursesCompleted: 12,
      quizzesTaken: 34,
      badgesEarned: 8,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      currentSkills: {
        "National Accounts & GDP": 62,
        "Sample Survey Design": 88,
        "Price Statistics (CPI/WPI)": 74,
        "R/Python Statistical Analytics": 58,
        "Time Series & Forecasting": 64,
        "AI & Automation in Surveys": 45,
        "Data Governance & Ethics": 82
      }
    },
    {
      id: "emp_20192",
      email: "priya.sundaram@mospi.gov.in",
      name: "Priya Sundaram",
      designation: "Assistant Director (ISS)",
      department: "National Accounts Division (NAD)",
      cadre: "Indian Statistical Service (ISS)",
      empId: "MoSPI-ISS-2015-201",
      roleId: "iss_officer",
      isAdmin: false,
      smartLearningScore: 985,
      maxScore: 1000,
      streakDays: 32,
      learningHoursThisMonth: 52.0,
      coursesCompleted: 28,
      quizzesTaken: 72,
      badgesEarned: 18,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      currentSkills: {
        "National Accounts & GDP": 94,
        "Sample Survey Design": 92,
        "Price Statistics (CPI/WPI)": 90,
        "R/Python Statistical Analytics": 88,
        "Time Series & Forecasting": 91,
        "AI & Automation in Surveys": 85,
        "Data Governance & Ethics": 97
      }
    },
    {
      id: "emp_30441",
      email: "amitabh.banerjee@mospi.gov.in",
      name: "Amitabh Banerjee",
      designation: "Statistical Officer (SO)",
      department: "Price Statistics Division (PSD)",
      cadre: "Subordinate Statistical Service (SSS)",
      empId: "MoSPI-SSS-2019-338",
      roleId: "jso",
      isAdmin: false,
      smartLearningScore: 830,
      maxScore: 1000,
      streakDays: 21,
      learningHoursThisMonth: 31.0,
      coursesCompleted: 15,
      quizzesTaken: 41,
      badgesEarned: 9,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      currentSkills: {
        "National Accounts & GDP": 60,
        "Sample Survey Design": 74,
        "Price Statistics (CPI/WPI)": 88,
        "R/Python Statistical Analytics": 63,
        "Time Series & Forecasting": 68,
        "AI & Automation in Surveys": 51,
        "Data Governance & Ethics": 79
      }
    },
    {
      id: "emp_40821",
      email: "kavita.reddy@des.telangana.gov.in",
      name: "Kavita Reddy",
      designation: "Junior Statistical Officer (JSO)",
      department: "State DES Telangana",
      cadre: "State DES Cadre",
      empId: "DES-TS-2021-114",
      roleId: "des_analyst",
      isAdmin: false,
      smartLearningScore: 815,
      maxScore: 1000,
      streakDays: 19,
      learningHoursThisMonth: 24.0,
      coursesCompleted: 10,
      quizzesTaken: 29,
      badgesEarned: 6,
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&q=80",
      currentSkills: {
        "National Accounts & GDP": 68,
        "Sample Survey Design": 72,
        "Price Statistics (CPI/WPI)": 71,
        "R/Python Statistical Analytics": 64,
        "Time Series & Forecasting": 58,
        "AI & Automation in Surveys": 55,
        "Data Governance & Ethics": 77
      }
    },
    {
      id: "emp_51204",
      email: "sanjay.joshi@mospi.gov.in",
      name: "Sanjay Kumar Joshi",
      designation: "Senior Statistical Officer (SSO)",
      department: "Economic Statistics Division (ESD)",
      cadre: "Subordinate Statistical Service (SSS)",
      empId: "MoSPI-SSS-2017-502",
      roleId: "sso",
      isAdmin: false,
      smartLearningScore: 790,
      maxScore: 1000,
      streakDays: 11,
      learningHoursThisMonth: 18.0,
      coursesCompleted: 9,
      quizzesTaken: 22,
      badgesEarned: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      currentSkills: {
        "National Accounts & GDP": 71,
        "Sample Survey Design": 82,
        "Price Statistics (CPI/WPI)": 69,
        "R/Python Statistical Analytics": 60,
        "Time Series & Forecasting": 75,
        "AI & Automation in Surveys": 48,
        "Data Governance & Ethics": 80
      }
    },
    {
      id: "admin_101",
      email: DESIGNATED_ADMIN_EMAIL,
      name: "Abhiram Addepalli (Director General)",
      designation: "Director General & Platform Administrator",
      department: "Ministry of Statistics & Programme Implementation (HQ)",
      cadre: "Indian Statistical Service (ISS / Executive Admin)",
      empId: "MoSPI-ADMIN-2026-001",
      roleId: "iss_officer",
      isAdmin: true,
      smartLearningScore: 995,
      maxScore: 1000,
      streakDays: 45,
      learningHoursThisMonth: 60.0,
      coursesCompleted: 30,
      quizzesTaken: 72,
      badgesEarned: 20,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      currentSkills: {
        "National Accounts & GDP": 95,
        "Sample Survey Design": 98,
        "Price Statistics (CPI/WPI)": 92,
        "R/Python Statistical Analytics": 90,
        "Time Series & Forecasting": 94,
        "AI & Automation in Surveys": 88,
        "Data Governance & Ethics": 99
      }
    }
  ],

  // ---- BENCHMARK ROLES ----
  benchmarkRoles: {
    iss_officer: {
      title: "Indian Statistical Service (ISS) Officer",
      benchmarks: {
        "National Accounts & GDP": 90,
        "Sample Survey Design": 95,
        "Price Statistics (CPI/WPI)": 85,
        "R/Python Statistical Analytics": 80,
        "Time Series & Forecasting": 85,
        "AI & Automation in Surveys": 75,
        "Data Governance & Ethics": 90
      }
    },
    sso: {
      title: "Senior Statistical Officer (SSO - NSO FOD)",
      benchmarks: {
        "National Accounts & GDP": 70,
        "Sample Survey Design": 90,
        "Price Statistics (CPI/WPI)": 80,
        "R/Python Statistical Analytics": 75,
        "Time Series & Forecasting": 70,
        "AI & Automation in Surveys": 80,
        "Data Governance & Ethics": 85
      }
    },
    jso: {
      title: "Junior Statistical Officer (JSO)",
      benchmarks: {
        "National Accounts & GDP": 60,
        "Sample Survey Design": 80,
        "Price Statistics (CPI/WPI)": 75,
        "R/Python Statistical Analytics": 65,
        "Time Series & Forecasting": 60,
        "AI & Automation in Surveys": 70,
        "Data Governance & Ethics": 75
      }
    },
    des_analyst: {
      title: "State Directorate of Economics & Statistics (DES) Analyst",
      benchmarks: {
        "National Accounts & GDP": 75,
        "Sample Survey Design": 75,
        "Price Statistics (CPI/WPI)": 70,
        "R/Python Statistical Analytics": 70,
        "Time Series & Forecasting": 65,
        "AI & Automation in Surveys": 65,
        "Data Governance & Ethics": 80
      }
    }
  },

  // ---- COURSES ----
  courses: [
    {
      id: "course_1",
      title: "Advanced GDP & GVA Estimation Methodologies (SNA 2008 / 2025 Standard)",
      category: "National Accounts",
      level: "Advanced",
      duration: "12 Hours",
      modulesCount: 8,
      enrolledCount: 1420,
      rating: 4.9,
      provider: "NSO Training Division & ISI Kolkata",
      skillsAddressed: ["National Accounts & GDP", "Time Series & Forecasting"],
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      description: "In-depth training on gross value added estimation across agriculture, manufacturing, and informal services sectors in accordance with System of National Accounts.",
      createdAt: new Date("2026-01-10").toISOString()
    },
    {
      id: "course_2",
      title: "Python & R for Large Scale Sample Survey Data Processing",
      category: "Data Science & Statistics",
      level: "Intermediate",
      duration: "18 Hours",
      modulesCount: 12,
      enrolledCount: 2850,
      rating: 4.8,
      provider: "MoSPI AI & Digital Cell",
      skillsAddressed: ["R/Python Statistical Analytics", "AI & Automation in Surveys"],
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
      description: "Automating validation checks, unit level file extractions, and sampling weights estimation using Python pandas, SciPy, and R Survey packages.",
      createdAt: new Date("2026-02-01").toISOString()
    },
    {
      id: "course_3",
      title: "Consumer Price Index (CPI) Basket Rebase & Price Collection Audits",
      category: "Price Statistics",
      level: "Intermediate",
      duration: "10 Hours",
      modulesCount: 6,
      enrolledCount: 1980,
      rating: 4.7,
      provider: "Price Statistics Division (PSD)",
      skillsAddressed: ["Price Statistics (CPI/WPI)"],
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
      description: "Methodologies for web scraping e-commerce prices, geotagging market surveys, and chained Laspeyres index formulation.",
      createdAt: new Date("2026-02-15").toISOString()
    },
    {
      id: "course_4",
      title: "Computer Assisted Personal Interviewing (CAPI) & Field Automation",
      category: "Field Operations",
      level: "Beginner to Intermediate",
      duration: "8 Hours",
      modulesCount: 5,
      enrolledCount: 3410,
      rating: 4.9,
      provider: "NSO Field Operations Division",
      skillsAddressed: ["AI & Automation in Surveys", "Sample Survey Design"],
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      description: "Utilizing tablet-based CAPI tools, automated skip logic verification, GPS spatial validation, and real-time supervisor field sync.",
      createdAt: new Date("2026-03-01").toISOString()
    },
    {
      id: "course_5",
      title: "Time Series Econometrics & Seasonal Adjustments for Economic Indicators",
      category: "Economic Analytics",
      level: "Advanced",
      duration: "15 Hours",
      modulesCount: 9,
      enrolledCount: 950,
      rating: 4.9,
      provider: "Indian Statistical Institute (ISI Delhi)",
      skillsAddressed: ["Time Series & Forecasting", "R/Python Statistical Analytics"],
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      description: "X-13ARIMA-SEATS implementation, structural break detection in IIP/CPI data, and ARIMA modeling for quarterly GDP projections.",
      createdAt: new Date("2026-03-15").toISOString()
    },
    {
      id: "course_6",
      title: "Data Ethics, Cyber Security & Personal Data Protection Act (DPDP) in MoSPI",
      category: "Governance & Compliance",
      level: "Mandatory Core",
      duration: "6 Hours",
      modulesCount: 4,
      enrolledCount: 4500,
      rating: 4.6,
      provider: "Government of India iGOT Karmayogi",
      skillsAddressed: ["Data Governance & Ethics"],
      thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
      description: "Ensuring confidentiality of microdata, anonymization protocol standards, and statutory provisions under the Collection of Statistics Act.",
      createdAt: new Date("2026-04-01").toISOString()
    }
  ],

  // ---- MENTORS ----
  mentors: [
    {
      id: "m_1",
      name: "Shri Alok Kumar, ISS",
      role: "Additional Director General (NAD, MoSPI)",
      expertise: "National Accounts & Macroeconomic Modeling",
      experience: "24 Years in ISS",
      availableSlots: ["Tomorrow 4:00 PM", "Thursday 11:00 AM"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      sessionsCompleted: 142
    },
    {
      id: "m_2",
      name: "Dr. Sunita Pattanaik",
      role: "Professor of Econometrics, ISI Kolkata",
      expertise: "Survey Sampling & Small Area Estimation",
      experience: "19 Years Academic & Consulting",
      availableSlots: ["Wednesday 2:30 PM", "Friday 5:00 PM"],
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      sessionsCompleted: 98
    },
    {
      id: "m_3",
      name: "Shri Vikrant Saxena, ISS",
      role: "Director (Price Statistics Division)",
      expertise: "CPI/WPI Rebase & High-Frequency Indicators",
      experience: "16 Years in ISS",
      availableSlots: ["Today 6:00 PM", "Thursday 3:00 PM"],
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      sessionsCompleted: 210
    }
  ],

  // ---- BADGES ----
  badges: [
    {
      id: "b_1",
      title: "Survey Methodology Master",
      category: "Expertise",
      icon: "Award",
      earnedDate: "14 Aug 2026",
      description: "Completed 5 advanced modules on NSO Sampling Frameworks with >90% quiz accuracy.",
      awardedTo: "emp_10928"
    },
    {
      id: "b_2",
      title: "14-Day Upskilling Streak",
      category: "Consistency",
      icon: "Zap",
      earnedDate: "02 Sep 2026",
      description: "Maintained daily active learning on StatIQ platform for 14 consecutive days.",
      awardedTo: "emp_10928"
    },
    {
      id: "b_3",
      title: "National Accounts Specialist",
      category: "Domain",
      icon: "TrendingUp",
      earnedDate: "20 Jul 2026",
      description: "Passed National Accounts GVA Estimation AI Viva Voce with Distinction.",
      awardedTo: "emp_10928"
    },
    {
      id: "b_4",
      title: "Python Data Pioneer",
      category: "Technology",
      icon: "Code",
      earnedDate: "10 Jun 2026",
      description: "Automated 3 microdata validation routines using StatIQ Python sandbox.",
      awardedTo: "emp_10928"
    }
  ],

  // ---- CERTIFICATES ----
  certificates: [
    {
      id: "cert_1",
      courseId: "course_1",
      courseTitle: "Advanced GDP & GVA Estimation Methodologies",
      userId: "emp_10928",
      userName: "Dr. Rajesh V. Sharma",
      issueDate: "20 Aug 2026",
      grade: "Distinction",
      score: 94,
      certNo: "STATIQ-2026-GDP-10928",
      issuedBy: "Ministry of Statistics & Programme Implementation (MoSPI)"
    },
    {
      id: "cert_2",
      courseId: "course_3",
      courseTitle: "Consumer Price Index (CPI) Basket Rebase & Price Collection Audits",
      userId: "emp_10928",
      userName: "Dr. Rajesh V. Sharma",
      issueDate: "05 Sep 2026",
      grade: "Pass",
      score: 79,
      certNo: "STATIQ-2026-CPI-10928",
      issuedBy: "Price Statistics Division (PSD), MoSPI"
    }
  ],

  // ---- LEADERBOARD ----
  leaderboard: [
    { rank: 1, userId: "emp_20192", name: "Priya Sundaram", department: "NAD - National Accounts", score: 985, streak: 32, badge: "Master Analyst" },
    { rank: 2, userId: "emp_10928", name: "Dr. Rajesh V. Sharma", department: "NSO FOD - North", score: 845, streak: 14, badge: "Survey Master" },
    { rank: 3, userId: "emp_30441", name: "Amitabh Banerjee", department: "Price Statistics Division", score: 830, streak: 21, badge: "CPI Specialist" },
    { rank: 4, userId: "emp_40821", name: "Kavita Reddy", department: "State DES Telangana", score: 815, streak: 19, badge: "Data Pioneer" },
    { rank: 5, userId: "emp_51204", name: "Sanjay Kumar Joshi", department: "Economic Statistics Division", score: 790, streak: 11, badge: "Rising Officer" }
  ],

  // ---- QUIZ LOGS ----
  quizLogs: [],

  // ---- VIVA EVALUATIONS ----
  vivaEvaluations: [],

  // ---- MENTOR BOOKINGS ----
  mentorBookings: [],

  // ---- FEEDBACK ----
  feedback: [
    {
      id: "fb_1",
      userId: "emp_10928",
      officer: "Dr. Rajesh V. Sharma (SSO)",
      course: "Advanced GDP & GVA Estimation",
      rating: 5,
      nps: 9,
      comment: "The AI Quiz generated from page 14 of the National Accounts manual was exceptionally accurate for base year rebase preparation.",
      createdAt: "2026-08-21T10:00:00Z"
    },
    {
      id: "fb_2",
      userId: "emp_20192",
      officer: "Priya Sundaram (AD)",
      course: "Python for Large Scale Sample Surveys",
      rating: 5,
      nps: 10,
      comment: "Hands-on Pandas unit level microdata cleaning snippets saved me 3 hours of manual formula checking.",
      createdAt: "2026-09-01T14:30:00Z"
    },
    {
      id: "fb_3",
      userId: "emp_30441",
      officer: "Amitabh Banerjee (SO)",
      course: "Consumer Price Index WebScraping",
      rating: 4,
      nps: 8,
      comment: "Very good module on promotional price variance filtering. Recommend adding more e-commerce API examples.",
      createdAt: "2026-09-03T09:15:00Z"
    }
  ],

  // ---- PREDICTIVE SKILL DEMAND ----
  predictiveDemand: [
    { skill: "AI & ML in Microdata Audits", currentSupply: 32, projectedDemand2027: 88 },
    { skill: "Python for Survey Processing", currentSupply: 54, projectedDemand2027: 92 },
    { skill: "Geospatial GIS Statistics", currentSupply: 41, projectedDemand2027: 85 },
    { skill: "Big Data & GST Analysis", currentSupply: 48, projectedDemand2027: 95 },
    { skill: "Time Series X-13ARIMA", currentSupply: 62, projectedDemand2027: 78 }
  ],

  // ---- DEPARTMENT BREAKDOWN ----
  departmentBreakdown: [
    { name: "NAD (National Accounts)", active: 2150, completionRate: 88, skillScore: 84 },
    { name: "NSO FOD (Field Ops)", active: 6420, completionRate: 82, skillScore: 78 },
    { name: "PSD (Price Statistics)", active: 1850, completionRate: 91, skillScore: 86 },
    { name: "ESD (Economic Stats)", active: 1410, completionRate: 85, skillScore: 81 },
    { name: "State DES Units", active: 1060, completionRate: 74, skillScore: 71 }
  ]
};

// ================================================================
// PERSISTENT DATABASE ENGINE
// ================================================================
function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const raw = fs.readFileSync(DB_FILE_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      // Migrate old db to new schema if version mismatch
      if (!parsed.mentors || !parsed.feedback || !parsed.leaderboard || !parsed.certificates) {
        console.log("⚙️  Migrating database to v2.0 schema...");
        const merged = { ...INITIAL_DATABASE_SEED, ...parsed,
          mentors: INITIAL_DATABASE_SEED.mentors,
          feedback: INITIAL_DATABASE_SEED.feedback,
          leaderboard: INITIAL_DATABASE_SEED.leaderboard,
          certificates: INITIAL_DATABASE_SEED.certificates,
          predictiveDemand: INITIAL_DATABASE_SEED.predictiveDemand,
          departmentBreakdown: INITIAL_DATABASE_SEED.departmentBreakdown,
          version: "2.0.0"
        };
        saveDatabase(merged);
        return merged;
      }
      return parsed;
    }
  } catch (err) {
    console.error("⚠️  Error reading database.json, re-seeding:", err.message);
  }
  saveDatabase(INITIAL_DATABASE_SEED);
  return { ...INITIAL_DATABASE_SEED };
}

function saveDatabase(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error("❌ Error saving database.json:", err.message);
  }
}

let db = loadDatabase();

// Recompute leaderboard ranks from live user scores
function rebuildLeaderboard() {
  const sorted = db.users
    .filter(u => !u.isAdmin)
    .sort((a, b) => b.smartLearningScore - a.smartLearningScore)
    .map((u, idx) => ({
      rank: idx + 1,
      userId: u.id,
      name: u.name,
      department: u.department,
      score: u.smartLearningScore,
      streak: u.streakDays,
      badge: ["Master Analyst", "Survey Master", "CPI Specialist", "Data Pioneer", "Rising Officer"][idx] || "Star Officer"
    }));
  db.leaderboard = sorted;
}

// ================================================================
// ── HEALTH & STATUS ──────────────────────────────────────────────
// ================================================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: "StatIQ AI Competency Engine Backend Server v2.0",
    database: "Connected & Synced (database.json)",
    singleAdminPolicy: true,
    designatedAdmin: db.designatedAdminEmail,
    version: db.version,
    hackathon: 'SIH26101',
    timestamp: new Date(),
    endpoints: {
      auth: ["/api/auth/login", "/api/auth/validate-admin"],
      users: ["/api/users", "/api/users/:id", "/api/users/:id/skills"],
      courses: ["/api/courses", "/api/courses/:id", "/api/courses/create", "/api/courses/:id/delete"],
      quiz: ["/api/quiz/submit-score", "/api/quiz/logs", "/api/quiz/logs/:userId"],
      viva: ["/api/viva/submit", "/api/viva/evaluations"],
      competency: ["/api/competency/calculate-gap", "/api/competency/roadmap/:roleId"],
      mentors: ["/api/mentors", "/api/mentors/book"],
      badges: ["/api/badges/:userId", "/api/badges/award"],
      certificates: ["/api/certificates/:userId"],
      leaderboard: ["/api/leaderboard"],
      feedback: ["/api/feedback", "/api/feedback/submit"],
      admin: ["/api/admin/dashboard-stats", "/api/admin/department-analytics", "/api/admin/skill-forecast", "/api/admin/employees"],
      reports: ["/api/reports/generate-executive-report"]
    }
  });
});

app.get('/api/db/status', (req, res) => {
  res.json({
    status: 'online',
    driver: 'File-backed Persistent JSON Database Engine v2.0',
    dbFilePath: DB_FILE_PATH,
    version: db.version,
    lastUpdated: db.lastUpdated,
    recordCounts: {
      users: db.users.length,
      courses: db.courses.length,
      mentors: db.mentors.length,
      badges: db.badges.length,
      certificates: db.certificates.length,
      leaderboard: db.leaderboard.length,
      quizLogs: db.quizLogs.length,
      vivaEvaluations: db.vivaEvaluations.length,
      mentorBookings: db.mentorBookings.length,
      feedback: db.feedback.length
    },
    singleAdminPolicy: {
      active: true,
      designatedAdminEmail: db.designatedAdminEmail
    }
  });
});

// ================================================================
// ── AUTH ─────────────────────────────────────────────────────────
// ================================================================

// POST /api/auth/login  — validates credentials for employee or admin
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  const reqEmail = (email || '').trim().toLowerCase();

  if (role === 'admin') {
    const emailOk    = reqEmail === DESIGNATED_ADMIN_EMAIL.toLowerCase();
    const passwordOk = password === DESIGNATED_ADMIN_PASSWORD;

    if (!emailOk || !passwordOk) {
      return res.status(403).json({
        success: false,
        message: `ACCESS DENIED: Admin Portal strictly requires email '${DESIGNATED_ADMIN_EMAIL}' and password '${DESIGNATED_ADMIN_PASSWORD}'. Any other credentials are rejected.`
      });
    }
    const adminUser = db.users.find(u => u.isAdmin);
    return res.json({ success: true, message: "Admin authenticated successfully.", role: 'admin', user: adminUser });
  }

  // Employee login — any registered employee
  const empUser = db.users.find(u => !u.isAdmin) || db.users[0];
  res.json({ success: true, message: "Statistical Officer authenticated successfully.", role: 'employee', user: empUser });
});

// POST /api/auth/validate-admin — quick admin credential check
app.post('/api/auth/validate-admin', (req, res) => {
  const { email, password } = req.body;
  const valid = (email || '').trim().toLowerCase() === DESIGNATED_ADMIN_EMAIL.toLowerCase()
    && password === DESIGNATED_ADMIN_PASSWORD;
  res.json({ valid, designatedAdminEmail: DESIGNATED_ADMIN_EMAIL });
});

// ================================================================
// ── USERS ────────────────────────────────────────────────────────
// ================================================================

// GET /api/users — all non-admin employees
app.get('/api/users', (req, res) => {
  const employees = db.users.filter(u => !u.isAdmin);
  res.json({ success: true, count: employees.length, users: employees });
});

// GET /api/users/:id — single user profile
app.get('/api/users/:id', (req, res) => {
  const user = db.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found." });
  res.json({ success: true, user });
});

// PATCH /api/users/:id/skills — update a user's skill scores
app.patch('/api/users/:id/skills', (req, res) => {
  const user = db.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ success: false, message: "User not found." });
  const { skills } = req.body;
  user.currentSkills = { ...user.currentSkills, ...skills };
  saveDatabase(db);
  rebuildLeaderboard();
  res.json({ success: true, message: "Skills updated successfully.", currentSkills: user.currentSkills });
});

// ================================================================
// ── COURSES ──────────────────────────────────────────────────────
// ================================================================

// GET /api/courses — all courses
app.get('/api/courses', (req, res) => {
  const { category } = req.query;
  let courses = db.courses;
  if (category) courses = courses.filter(c => c.category.toLowerCase() === category.toLowerCase());
  res.json({ success: true, count: courses.length, courses });
});

// GET /api/courses/:id — single course
app.get('/api/courses/:id', (req, res) => {
  const course = db.courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ success: false, message: "Course not found." });
  res.json({ success: true, course });
});

// POST /api/courses/create — admin adds a new course
app.post('/api/courses/create', (req, res) => {
  const { title, category, duration, provider, description, level, skillsAddressed } = req.body;
  if (!title) return res.status(400).json({ success: false, message: "Course title is required." });

  const newCourse = {
    id: `course_${Date.now()}`,
    title,
    category: category || "National Accounts",
    level: level || "Intermediate",
    duration: duration || "8 Hours",
    modulesCount: 6,
    enrolledCount: 0,
    rating: 5.0,
    provider: provider || "MoSPI Training Division",
    skillsAddressed: skillsAddressed || ["National Accounts & GDP"],
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
    description: description || "",
    createdAt: new Date().toISOString()
  };

  db.courses.unshift(newCourse);
  saveDatabase(db);
  res.status(201).json({ success: true, message: "Course published to MoSPI cadre successfully.", course: newCourse });
});

// DELETE /api/courses/:id — admin deletes a course
app.delete('/api/courses/:id', (req, res) => {
  const idx = db.courses.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: "Course not found." });
  const removed = db.courses.splice(idx, 1)[0];
  saveDatabase(db);
  res.json({ success: true, message: `Course '${removed.title}' deleted successfully.` });
});

// PATCH /api/courses/:id — admin updates a course
app.patch('/api/courses/:id', (req, res) => {
  const course = db.courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ success: false, message: "Course not found." });
  const { title, category, duration, provider, description, level } = req.body;
  if (title) course.title = title;
  if (category) course.category = category;
  if (duration) course.duration = duration;
  if (provider) course.provider = provider;
  if (description) course.description = description;
  if (level) course.level = level;
  saveDatabase(db);
  res.json({ success: true, message: "Course updated.", course });
});

// ================================================================
// ── COMPETENCY ENGINE ────────────────────────────────────────────
// ================================================================

// POST /api/competency/calculate-gap — calculates skill gap for a user & role
app.post('/api/competency/calculate-gap', (req, res) => {
  const { userId, userSkills, roleId } = req.body;
  let skills = userSkills;

  if (userId && !skills) {
    const user = db.users.find(u => u.id === userId);
    if (user) skills = user.currentSkills;
  }

  const roleData = db.benchmarkRoles[roleId] || db.benchmarkRoles.sso;
  const benchmarks = roleData.benchmarks;
  const gaps = {};
  let totalGap = 0;
  let criticalCount = 0;
  let count = 0;

  for (const [skill, bench] of Object.entries(benchmarks)) {
    const current = skills ? (skills[skill] || 50) : 50;
    const gap = Math.max(0, bench - current);
    const status = gap === 0 ? "Mastered" : gap <= 10 ? "Minor Gap" : gap <= 25 ? "Moderate Gap" : "Critical Gap";
    if (status === "Critical Gap") criticalCount++;
    gaps[skill] = { current, benchmark: bench, gap, status };
    totalGap += gap;
    count++;
  }

  res.json({
    success: true,
    roleId,
    roleTitle: roleData.title,
    averageGap: +(totalGap / count).toFixed(1),
    criticalGapCount: criticalCount,
    overallReadiness: +(100 - (totalGap / count)).toFixed(1),
    gaps
  });
});

// GET /api/competency/roadmap/:roleId — returns learning roadmap for a role
app.get('/api/competency/roadmap/:roleId', (req, res) => {
  const roleId = req.params.roleId;
  const roleData = db.benchmarkRoles[roleId] || db.benchmarkRoles.sso;

  const roadmap = [
    {
      phase: 1,
      title: "Foundation Modules",
      duration: "4 Weeks",
      courses: db.courses.filter(c => c.level === "Beginner to Intermediate").slice(0, 2).map(c => c.id),
      skills: ["Sample Survey Design", "Data Governance & Ethics"]
    },
    {
      phase: 2,
      title: "Core Statistical Domain",
      duration: "6 Weeks",
      courses: db.courses.filter(c => c.level === "Intermediate").slice(0, 2).map(c => c.id),
      skills: ["National Accounts & GDP", "Price Statistics (CPI/WPI)"]
    },
    {
      phase: 3,
      title: "Advanced Analytics & AI",
      duration: "8 Weeks",
      courses: db.courses.filter(c => c.level === "Advanced").slice(0, 2).map(c => c.id),
      skills: ["R/Python Statistical Analytics", "AI & Automation in Surveys", "Time Series & Forecasting"]
    }
  ];

  res.json({ success: true, roleId, roleTitle: roleData.title, roadmap });
});

// ================================================================
// ── QUIZ ─────────────────────────────────────────────────────────
// ================================================================

// POST /api/quiz/submit-score — log a quiz result & update user score
app.post('/api/quiz/submit-score', (req, res) => {
  const { userId, score, total, docTitle, courseId } = req.body;
  const user = db.users.find(u => u.id === userId) || db.users.find(u => !u.isAdmin);
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  const points = pct >= 80 ? 60 : pct >= 60 ? 40 : 20;

  user.smartLearningScore = Math.min(1000, user.smartLearningScore + points);
  user.quizzesTaken = (user.quizzesTaken || 0) + 1;

  const logEntry = {
    id: `quiz_${Date.now()}`,
    userId: user.id,
    userName: user.name,
    docTitle: docTitle || "MoSPI Guideline Assessment",
    courseId: courseId || null,
    score,
    total,
    percentage: pct,
    pointsAwarded: points,
    timestamp: new Date().toISOString()
  };
  db.quizLogs.push(logEntry);
  saveDatabase(db);
  rebuildLeaderboard();

  res.json({
    success: true,
    message: "Quiz score submitted and persisted to database.",
    updatedScore: user.smartLearningScore,
    quizzesTaken: user.quizzesTaken,
    pointsAwarded: points,
    percentage: pct,
    quizLog: logEntry
  });
});

// GET /api/quiz/logs — all quiz logs (admin)
app.get('/api/quiz/logs', (req, res) => {
  res.json({ success: true, count: db.quizLogs.length, logs: db.quizLogs });
});

// GET /api/quiz/logs/:userId — quiz logs for a specific user
app.get('/api/quiz/logs/:userId', (req, res) => {
  const logs = db.quizLogs.filter(l => l.userId === req.params.userId);
  res.json({ success: true, count: logs.length, logs });
});

// ================================================================
// ── VIVA / AI INTERVIEW ──────────────────────────────────────────
// ================================================================

// POST /api/viva/submit — log a viva evaluation
app.post('/api/viva/submit', (req, res) => {
  const { userId, scenario, transcript, score, feedback } = req.body;
  const user = db.users.find(u => u.id === userId) || db.users.find(u => !u.isAdmin);

  const points = 50;
  user.smartLearningScore = Math.min(1000, user.smartLearningScore + points);

  const evaluation = {
    id: `viva_${Date.now()}`,
    userId: user.id,
    userName: user.name,
    scenario: scenario || "NSO General Viva",
    transcript: transcript || "",
    score: score || 0,
    feedback: feedback || "Competent performance observed.",
    pointsAwarded: points,
    timestamp: new Date().toISOString()
  };
  db.vivaEvaluations.push(evaluation);
  saveDatabase(db);
  rebuildLeaderboard();

  res.json({
    success: true,
    message: "Viva evaluation recorded successfully.",
    evaluation,
    updatedScore: user.smartLearningScore,
    pointsAwarded: points
  });
});

// GET /api/viva/evaluations — all viva records (admin)
app.get('/api/viva/evaluations', (req, res) => {
  res.json({ success: true, count: db.vivaEvaluations.length, evaluations: db.vivaEvaluations });
});

// GET /api/viva/evaluations/:userId — viva records for a user
app.get('/api/viva/evaluations/:userId', (req, res) => {
  const evals = db.vivaEvaluations.filter(e => e.userId === req.params.userId);
  res.json({ success: true, count: evals.length, evaluations: evals });
});

// ================================================================
// ── MENTORS ──────────────────────────────────────────────────────
// ================================================================

// GET /api/mentors — all mentors
app.get('/api/mentors', (req, res) => {
  res.json({ success: true, count: db.mentors.length, mentors: db.mentors });
});

// POST /api/mentors/book — book a mentor session
app.post('/api/mentors/book', (req, res) => {
  const { userId, mentorId, slot, topic } = req.body;
  const mentor = db.mentors.find(m => m.id === mentorId);
  if (!mentor) return res.status(404).json({ success: false, message: "Mentor not found." });
  const user = db.users.find(u => u.id === userId) || db.users[0];

  const booking = {
    id: `booking_${Date.now()}`,
    userId: user.id,
    userName: user.name,
    mentorId,
    mentorName: mentor.name,
    slot: slot || mentor.availableSlots[0],
    topic: topic || mentor.expertise,
    status: "Confirmed",
    timestamp: new Date().toISOString()
  };
  db.mentorBookings.push(booking);
  saveDatabase(db);

  res.status(201).json({
    success: true,
    message: `Mentor session with ${mentor.name} booked for ${booking.slot}.`,
    booking
  });
});

// GET /api/mentors/bookings/:userId — user's bookings
app.get('/api/mentors/bookings/:userId', (req, res) => {
  const bookings = db.mentorBookings.filter(b => b.userId === req.params.userId);
  res.json({ success: true, count: bookings.length, bookings });
});

// ================================================================
// ── BADGES ───────────────────────────────────────────────────────
// ================================================================

// GET /api/badges/:userId — badges earned by a user
app.get('/api/badges/:userId', (req, res) => {
  const userBadges = db.badges.filter(b => b.awardedTo === req.params.userId);
  res.json({ success: true, count: userBadges.length, badges: userBadges });
});

// GET /api/badges — all badges (admin)
app.get('/api/badges', (req, res) => {
  res.json({ success: true, count: db.badges.length, badges: db.badges });
});

// POST /api/badges/award — award a badge to a user
app.post('/api/badges/award', (req, res) => {
  const { userId, title, category, description } = req.body;
  const user = db.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ success: false, message: "User not found." });

  const badge = {
    id: `badge_${Date.now()}`,
    title: title || "Achievement Badge",
    category: category || "Expertise",
    icon: "Award",
    earnedDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    description: description || "Special achievement awarded by StatIQ AI.",
    awardedTo: userId
  };
  db.badges.push(badge);
  user.badgesEarned = (user.badgesEarned || 0) + 1;
  saveDatabase(db);

  res.status(201).json({ success: true, message: "Badge awarded successfully.", badge });
});

// ================================================================
// ── CERTIFICATES ─────────────────────────────────────────────────
// ================================================================

// GET /api/certificates/:userId — all certificates for a user
app.get('/api/certificates/:userId', (req, res) => {
  const userCerts = db.certificates.filter(c => c.userId === req.params.userId);
  res.json({ success: true, count: userCerts.length, certificates: userCerts });
});

// POST /api/certificates/issue — issue a new certificate
app.post('/api/certificates/issue', (req, res) => {
  const { userId, courseId, grade, score } = req.body;
  const user = db.users.find(u => u.id === userId);
  const course = db.courses.find(c => c.id === courseId);
  if (!user || !course) return res.status(404).json({ success: false, message: "User or course not found." });

  const cert = {
    id: `cert_${Date.now()}`,
    courseId,
    courseTitle: course.title,
    userId,
    userName: user.name,
    issueDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    grade: grade || "Pass",
    score: score || 75,
    certNo: `STATIQ-2026-${courseId.toUpperCase()}-${userId.split('_')[1] || Date.now()}`,
    issuedBy: "Ministry of Statistics & Programme Implementation (MoSPI)"
  };
  db.certificates.push(cert);
  user.coursesCompleted = (user.coursesCompleted || 0) + 1;
  saveDatabase(db);

  res.status(201).json({ success: true, message: "Certificate issued successfully.", certificate: cert });
});

// ================================================================
// ── LEADERBOARD ──────────────────────────────────────────────────
// ================================================================

// GET /api/leaderboard — top 10 ranked employees
app.get('/api/leaderboard', (req, res) => {
  rebuildLeaderboard();
  saveDatabase(db);
  res.json({ success: true, season: "Q3 2026", count: db.leaderboard.length, leaderboard: db.leaderboard });
});

// ================================================================
// ── FEEDBACK ─────────────────────────────────────────────────────
// ================================================================

// GET /api/feedback — all feedback (admin)
app.get('/api/feedback', (req, res) => {
  const avgRating = db.feedback.length
    ? +(db.feedback.reduce((s, f) => s + f.rating, 0) / db.feedback.length).toFixed(1)
    : 4.8;
  const avgNps = db.feedback.length
    ? +(db.feedback.reduce((s, f) => s + (f.nps || 8), 0) / db.feedback.length * 10).toFixed(0)
    : 92;
  res.json({
    success: true,
    count: db.feedback.length,
    averageRating: avgRating,
    npsScore: +avgNps,
    feedback: db.feedback
  });
});

// POST /api/feedback/submit — employee submits course feedback
app.post('/api/feedback/submit', (req, res) => {
  const { userId, courseId, rating, nps, comment } = req.body;
  const user = db.users.find(u => u.id === userId);
  const course = db.courses.find(c => c.id === courseId);

  const fb = {
    id: `fb_${Date.now()}`,
    userId: userId || "anonymous",
    officer: user ? `${user.name} (${user.designation})` : "Anonymous Officer",
    course: course ? course.title : "General Platform Feedback",
    rating: rating || 5,
    nps: nps || 9,
    comment: comment || "",
    createdAt: new Date().toISOString()
  };
  db.feedback.push(fb);
  saveDatabase(db);

  res.status(201).json({ success: true, message: "Feedback submitted successfully. Thank you!", feedback: fb });
});

// ================================================================
// ── ADMIN ANALYTICS ──────────────────────────────────────────────
// ================================================================

// GET /api/admin/dashboard-stats — executive KPI overview
app.get('/api/admin/dashboard-stats', (req, res) => {
  rebuildLeaderboard();
  const totalQuizAttempts = db.quizLogs.length;
  const totalVivaAttempts = db.vivaEvaluations.length;
  const avgNps = db.feedback.length
    ? +(db.feedback.reduce((s, f) => s + (f.nps || 8), 0) / db.feedback.length * 10).toFixed(0)
    : 92;

  res.json({
    success: true,
    totalEmployees: 15420 + totalQuizAttempts,
    activeLearners: 12890 + Math.floor(totalQuizAttempts / 2),
    coursesCompletedThisQuarter: 8450 + db.courses.length,
    totalLearningHours: 142500 + (totalQuizAttempts * 2),
    avgCompetencyGain: "+26.4%",
    npsScore: avgNps,
    quizAttemptsTotal: totalQuizAttempts,
    vivaAttemptsTotal: totalVivaAttempts,
    coursesPublished: db.courses.length,
    mentorSessionsBooked: db.mentorBookings.length,
    departmentBreakdown: db.departmentBreakdown,
    recentActivity: [
      ...db.quizLogs.slice(-3).map(q => ({ type: "Quiz", user: q.userName, detail: q.docTitle, time: q.timestamp })),
      ...db.vivaEvaluations.slice(-2).map(v => ({ type: "Viva", user: v.userName, detail: v.scenario, time: v.timestamp }))
    ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5)
  });
});

// GET /api/admin/department-analytics — department-level breakdown
app.get('/api/admin/department-analytics', (req, res) => {
  res.json({
    success: true,
    departmentBreakdown: db.departmentBreakdown,
    totalDepartments: db.departmentBreakdown.length
  });
});

// GET /api/admin/skill-forecast — predictive skill demand data
app.get('/api/admin/skill-forecast', (req, res) => {
  res.json({
    success: true,
    forecastYear: 2027,
    source: "StatIQ AI Forecasting Engine (SIH26101)",
    predictiveDemand: db.predictiveDemand
  });
});

// GET /api/admin/employees — full employee list with filters
app.get('/api/admin/employees', (req, res) => {
  const { dept, roleId, search } = req.query;
  let employees = db.users.filter(u => !u.isAdmin);

  if (dept) employees = employees.filter(u => u.department.toLowerCase().includes(dept.toLowerCase()));
  if (roleId) employees = employees.filter(u => u.roleId === roleId);
  if (search) employees = employees.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.department.toLowerCase().includes(search.toLowerCase())
  );

  res.json({
    success: true,
    count: employees.length,
    employees: employees.map(u => ({
      id: u.id,
      name: u.name,
      designation: u.designation,
      department: u.department,
      cadre: u.cadre,
      empId: u.empId,
      roleId: u.roleId,
      smartLearningScore: u.smartLearningScore,
      streakDays: u.streakDays,
      coursesCompleted: u.coursesCompleted,
      quizzesTaken: u.quizzesTaken,
      badgesEarned: u.badgesEarned,
      learningHoursThisMonth: u.learningHoursThisMonth,
      status: u.streakDays > 0 ? "Active" : "Pending Sync"
    }))
  });
});

// ================================================================
// ── EXECUTIVE REPORT ─────────────────────────────────────────────
// ================================================================

// POST /api/reports/generate-executive-report — AI-generated text report
app.post('/api/reports/generate-executive-report', (req, res) => {
  const quizTotal = db.quizLogs.length;
  const vivaTotal = db.vivaEvaluations.length;
  const avgNps = db.feedback.length
    ? +(db.feedback.reduce((s, f) => s + (f.nps || 8), 0) / db.feedback.length * 10).toFixed(0)
    : 92;

  const reportText = `
STATIQ AI — EXECUTIVE WORKFORCE COMPETENCY & UPSKILLING REPORT
═══════════════════════════════════════════════════════════════
Generated  : ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
Platform   : StatIQ AI Competency Intelligence Platform (SIH26101)
Issuing Authority : Ministry of Statistics & Programme Implementation (MoSPI)
Classification    : OFFICIAL — Ministry Internal Use Only

───────────────────────────────────────────────────────────────
1. EXECUTIVE SUMMARY
───────────────────────────────────────────────────────────────
Total Statistical Officers Onboarded  : ${(15420 + quizTotal).toLocaleString()}
Active Learning Engagement            : ${(12890 + quizTotal).toLocaleString()} (83.6% active rate)
Total Upskilling Hours Logged         : ${(142500 + quizTotal * 2).toLocaleString()} Hours
Platform NPS Score                    : ${avgNps} / 100
Average Competency Index Growth       : +26.4% across all statistical cadres
Total AI Quiz Attempts                : ${quizTotal.toLocaleString()}
Total AI Viva Voce Evaluations        : ${vivaTotal.toLocaleString()}
Total Courses Published               : ${db.courses.length}
Mentor Sessions Booked                : ${db.mentorBookings.length}

───────────────────────────────────────────────────────────────
2. DEPARTMENTAL COMPETENCY GAIN ANALYSIS
───────────────────────────────────────────────────────────────
${db.departmentBreakdown.map(d =>
  `  ${d.name.padEnd(38)} | ${d.completionRate}% Completion | Avg Skill: ${d.skillScore}/100 | Active: ${d.active.toLocaleString()}`
).join('\n')}

───────────────────────────────────────────────────────────────
3. PREDICTIVE SKILL DEMAND FORECAST (2026–2028)
───────────────────────────────────────────────────────────────
${db.predictiveDemand.map(p => {
  const deficit = p.projectedDemand2027 - p.currentSupply;
  return `  ${p.skill.padEnd(35)} | Current: ${p.currentSupply}% | Projected 2027: ${p.projectedDemand2027}% | DEFICIT: +${deficit}%`;
}).join('\n')}

───────────────────────────────────────────────────────────────
4. NATIONAL LEADERBOARD — TOP PERFORMERS (Q3 2026)
───────────────────────────────────────────────────────────────
${db.leaderboard.slice(0, 5).map(l =>
  `  #${l.rank}  ${l.name.padEnd(30)} | ${l.department.padEnd(32)} | ${l.score} pts | ${l.streak}-day streak`
).join('\n')}

───────────────────────────────────────────────────────────────
5. AI QUIZ & VIVA ASSESSMENT ANALYTICS
───────────────────────────────────────────────────────────────
Total Quiz Attempts             : ${quizTotal}
Total Viva Evaluations          : ${vivaTotal}
Average Quiz Score              : ${quizTotal > 0
  ? Math.round(db.quizLogs.reduce((s, l) => s + (l.percentage || 0), 0) / quizTotal)
  : 'N/A'} %
Platform Difficulty Calibration : 94% (Optimal)

───────────────────────────────────────────────────────────────
6. STRATEGIC RECOMMENDATIONS
───────────────────────────────────────────────────────────────
  1. URGENT: Launch targeted AI & ML upskilling cohorts for NSO FOD officers
     to address 56% projected deficit in AI Microdata capabilities by 2027.
  2. HIGH:   Mandate Python & R course completion for all SSS cadre officers
     below Grade B within next two quarters.
  3. MEDIUM: Expand Geospatial GIS Statistics curriculum across 5 more DES state units.
  4. ONGOING: Leverage StatIQ AI Viva Voce simulator for quarterly competency audits.

───────────────────────────────────────────────────────────────
CERTIFICATION
───────────────────────────────────────────────────────────────
This report is certified and generated by:
StatIQ AI Competency Engine v2.0 (SIH26101)
Admin: ${DESIGNATED_ADMIN_EMAIL}
Report ID: RPT-${Date.now()}
Timestamp: ${new Date().toISOString()}
  `.trim();

  res.json({ success: true, reportText, generatedAt: new Date().toISOString() });
});

// ================================================================
// START SERVER
// ================================================================
app.listen(PORT, () => {
  console.log(`\n✅ StatIQ AI Backend Server v2.0 running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${DB_FILE_PATH}`);
  console.log(`🔐 Single Admin Policy: ${DESIGNATED_ADMIN_EMAIL}`);
  console.log(`\n📌 Key Endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   GET  http://localhost:${PORT}/api/courses`);
  console.log(`   GET  http://localhost:${PORT}/api/leaderboard`);
  console.log(`   GET  http://localhost:${PORT}/api/admin/dashboard-stats`);
  console.log(`   POST http://localhost:${PORT}/api/reports/generate-executive-report\n`);
});
