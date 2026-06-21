// ============================================================
// COMPREHENSIVE MOCK DATA – School Management System
// ============================================================

export type UserRole = "admin" | "teacher" | "student" | "parent";

// ─── KPIs ────────────────────────────────────────────────────
export const adminKPIs = {
  totalStudents:  1428,
  totalTeachers:  92,
  activeClasses:  38,
  attendanceRate: 94.2,
  feeCollected:   862000,
  feePending:     138000,
  feePercent:     86,
  pendingFees:    45,
  examsPassed:    1180,
  examsTotal:     1250,
};

// ─── Attendance Trends ────────────────────────────────────────
export const attendanceTrend = [
  { day: "Mon", present: 96, absent: 4  },
  { day: "Tue", present: 93, absent: 7  },
  { day: "Wed", present: 97, absent: 3  },
  { day: "Thu", present: 91, absent: 9  },
  { day: "Fri", present: 94, absent: 6  },
  { day: "Sat", present: 88, absent: 12 },
];

// ─── Monthly Fee Collection ───────────────────────────────────
export const feeMonthly = [
  { month: "Jul", collected: 95000,  pending: 12000 },
  { month: "Aug", collected: 102000, pending: 9500  },
  { month: "Sep", collected: 98000,  pending: 14000 },
  { month: "Oct", collected: 110000, pending: 8000  },
  { month: "Nov", collected: 87000,  pending: 19000 },
  { month: "Dec", collected: 115000, pending: 6500  },
];

// ─── Exam Performance ─────────────────────────────────────────
export const examPerformance = [
  { subject: "Math",    avg: 72, highest: 98, lowest: 42 },
  { subject: "Physics", avg: 68, highest: 95, lowest: 38 },
  { subject: "English", avg: 79, highest: 99, lowest: 55 },
  { subject: "History", avg: 74, highest: 96, lowest: 48 },
  { subject: "Bio",     avg: 81, highest: 100,lowest: 60 },
  { subject: "Chem",    avg: 66, highest: 94, lowest: 35 },
];

// ─── Recent Activities ────────────────────────────────────────
export const recentActivities = [
  { id: 1, type: "student",    text: "New student Priya Sharma enrolled in Grade 9B",       time: "5 min ago"  },
  { id: 2, type: "fee",        text: "Fee payment of $1,200 received from Alex Johnson",     time: "18 min ago" },
  { id: 3, type: "exam",       text: "Mid-term exam schedule published for Grades 10–12",    time: "1 hr ago"   },
  { id: 4, type: "attendance", text: "Attendance marked – Grade 10A: 98% present",           time: "2 hr ago"   },
  { id: 5, type: "notice",     text: "Notice sent: Annual Sports Day – Oct 28",              time: "3 hr ago"   },
  { id: 6, type: "teacher",    text: "Teacher Mr. Paul added to Physics department",         time: "Yesterday"  },
];

// ─── Students ─────────────────────────────────────────────────
export interface Student {
  id: string;
  name: string;
  gender: string;
  grade: string;
  section: string;
  rollNo: string;
  parent: string;
  contact: string;
  email: string;
  attendance: number;
  fees: "Paid" | "Pending" | "Overdue";
  dob: string;
  address: string;
  joined: string;
  avatar: string;
}

export const students: Student[] = [
  { id:"STU001", name:"Alex Johnson",    gender:"Male",   grade:"10", section:"A", rollNo:"10A01", parent:"Robert Johnson",  contact:"555-0101", email:"alex.j@student.edu",    attendance:98, fees:"Paid",    dob:"2009-03-14", address:"12 Oak St, Springfield",    joined:"2021-06-01", avatar:"AJ" },
  { id:"STU002", name:"Priya Sharma",    gender:"Female", grade:"9",  section:"B", rollNo:"9B02",  parent:"Raj Sharma",      contact:"555-0102", email:"priya.s@student.edu",   attendance:92, fees:"Pending", dob:"2010-07-22", address:"45 Maple Ave, Riverside",   joined:"2022-06-01", avatar:"PS" },
  { id:"STU003", name:"James Smith",     gender:"Male",   grade:"12", section:"C", rollNo:"12C03", parent:"David Smith",     contact:"555-0103", email:"james.s@student.edu",   attendance:85, fees:"Overdue", dob:"2007-01-08", address:"88 Pine Rd, Lakewood",      joined:"2019-06-01", avatar:"JS" },
  { id:"STU004", name:"Linda Lee",       gender:"Female", grade:"8",  section:"A", rollNo:"8A04",  parent:"Kevin Lee",       contact:"555-0104", email:"linda.l@student.edu",   attendance:99, fees:"Paid",    dob:"2011-11-30", address:"3 Elm Blvd, Hillcrest",     joined:"2023-06-01", avatar:"LL" },
  { id:"STU005", name:"Michael Chen",    gender:"Male",   grade:"11", section:"B", rollNo:"11B05", parent:"Wei Chen",        contact:"555-0105", email:"michael.c@student.edu", attendance:95, fees:"Paid",    dob:"2008-05-17", address:"67 Cedar Ln, Westview",     joined:"2020-06-01", avatar:"MC" },
  { id:"STU006", name:"Sofia Martinez",  gender:"Female", grade:"10", section:"B", rollNo:"10B06", parent:"Carlos Martinez", contact:"555-0106", email:"sofia.m@student.edu",   attendance:91, fees:"Pending", dob:"2009-09-03", address:"21 Birch St, Northgate",    joined:"2021-06-01", avatar:"SM" },
  { id:"STU007", name:"Ethan Williams",  gender:"Male",   grade:"9",  section:"A", rollNo:"9A07",  parent:"Mark Williams",   contact:"555-0107", email:"ethan.w@student.edu",   attendance:88, fees:"Paid",    dob:"2010-12-19", address:"55 Walnut Dr, Eastpark",    joined:"2022-06-01", avatar:"EW" },
  { id:"STU008", name:"Aisha Patel",     gender:"Female", grade:"11", section:"A", rollNo:"11A08", parent:"Anita Patel",     contact:"555-0108", email:"aisha.p@student.edu",   attendance:97, fees:"Paid",    dob:"2008-02-25", address:"9 Rosewood Ave, Southbury", joined:"2020-06-01", avatar:"AP" },
];

// ─── Teachers ─────────────────────────────────────────────────
export interface Teacher {
  id: string;
  name: string;
  gender: string;
  subject: string;
  department: string;
  email: string;
  contact: string;
  experience: string;
  classes: string[];
  joined: string;
  qualification: string;
  status: "Active" | "On Leave";
  avatar: string;
}

export const teachers: Teacher[] = [
  { id:"TCH001", name:"Dr. Sarah Jenkins",  gender:"Female", subject:"Mathematics",         department:"Science",      email:"sarah.j@school.edu",   contact:"555-1001", experience:"8 yrs",  classes:["10A","10B","11A"], joined:"2016-08-01", qualification:"Ph.D Mathematics",   status:"Active",   avatar:"SJ" },
  { id:"TCH002", name:"Mr. Mark Ruffalo",   gender:"Male",   subject:"Physics",             department:"Science",      email:"mark.r@school.edu",    contact:"555-1002", experience:"5 yrs",  classes:["11A","11B","12A"], joined:"2019-08-01", qualification:"M.Sc Physics",        status:"Active",   avatar:"MR" },
  { id:"TCH003", name:"Mrs. Emma Watson",   gender:"Female", subject:"English Literature",  department:"Arts",         email:"emma.w@school.edu",    contact:"555-1003", experience:"12 yrs", classes:["9A","9B","10A"],   joined:"2012-08-01", qualification:"M.A English Lit",     status:"Active",   avatar:"EW" },
  { id:"TCH004", name:"Mr. John Davis",     gender:"Male",   subject:"Chemistry",           department:"Science",      email:"john.d@school.edu",    contact:"555-1004", experience:"7 yrs",  classes:["10B","11A","12B"], joined:"2017-08-01", qualification:"M.Sc Chemistry",      status:"Active",   avatar:"JD" },
  { id:"TCH005", name:"Ms. Priya Nair",     gender:"Female", subject:"History",             department:"Humanities",   email:"priya.n@school.edu",   contact:"555-1005", experience:"4 yrs",  classes:["8A","8B","9A"],    joined:"2020-08-01", qualification:"M.A History",         status:"On Leave", avatar:"PN" },
  { id:"TCH006", name:"Mr. Alan Turing",    gender:"Male",   subject:"Computer Science",    department:"Technology",   email:"alan.t@school.edu",    contact:"555-1006", experience:"10 yrs", classes:["11B","12A","12B"], joined:"2014-08-01", qualification:"M.Tech CS",           status:"Active",   avatar:"AT" },
];

// ─── Classes & Sections ───────────────────────────────────────
export const classes = [
  { id:"CLS01", grade:"Grade 8",  sections:["A","B"],      students:72,  classTeacher:"Mrs. Emma Watson",    subjects:["English","Math","Science","History","PE"] },
  { id:"CLS02", grade:"Grade 9",  sections:["A","B"],      students:80,  classTeacher:"Ms. Priya Nair",      subjects:["English","Math","Physics","Chemistry","History"] },
  { id:"CLS03", grade:"Grade 10", sections:["A","B","C"],  students:115, classTeacher:"Dr. Sarah Jenkins",   subjects:["English","Math","Physics","Chemistry","Biology","CS"] },
  { id:"CLS04", grade:"Grade 11", sections:["A","B"],      students:86,  classTeacher:"Mr. Mark Ruffalo",    subjects:["English","Math","Physics","Chemistry","Biology"] },
  { id:"CLS05", grade:"Grade 12", sections:["A","B"],      students:78,  classTeacher:"Mr. Alan Turing",     subjects:["English","Math","CS","Physics","Economics"] },
];

// ─── Subjects ─────────────────────────────────────────────────
export const subjects = [
  { id:"SUB01", name:"Mathematics",         code:"MATH", department:"Science",    grades:["8","9","10","11","12"], teacher:"Dr. Sarah Jenkins",  periods:6 },
  { id:"SUB02", name:"Physics",             code:"PHY",  department:"Science",    grades:["9","10","11","12"],     teacher:"Mr. Mark Ruffalo",   periods:5 },
  { id:"SUB03", name:"English Literature",  code:"ENG",  department:"Arts",       grades:["8","9","10","11","12"], teacher:"Mrs. Emma Watson",   periods:5 },
  { id:"SUB04", name:"Chemistry",           code:"CHEM", department:"Science",    grades:["9","10","11","12"],     teacher:"Mr. John Davis",     periods:5 },
  { id:"SUB05", name:"History",             code:"HIST", department:"Humanities", grades:["8","9","10"],           teacher:"Ms. Priya Nair",     periods:4 },
  { id:"SUB06", name:"Computer Science",    code:"CS",   department:"Technology", grades:["11","12"],              teacher:"Mr. Alan Turing",    periods:4 },
  { id:"SUB07", name:"Biology",             code:"BIO",  department:"Science",    grades:["10","11","12"],         teacher:"Mr. John Davis",     periods:5 },
];

// ─── Attendance Records ───────────────────────────────────────
export const attendanceRecords = [
  { id:1, studentId:"STU001", name:"Alex Johnson",   class:"10A", date:"2026-06-19", status:"Present" as const },
  { id:2, studentId:"STU002", name:"Priya Sharma",   class:"9B",  date:"2026-06-19", status:"Absent"  as const },
  { id:3, studentId:"STU003", name:"James Smith",    class:"12C", date:"2026-06-19", status:"Present" as const },
  { id:4, studentId:"STU004", name:"Linda Lee",      class:"8A",  date:"2026-06-19", status:"Present" as const },
  { id:5, studentId:"STU005", name:"Michael Chen",   class:"11B", date:"2026-06-19", status:"Late"    as const },
  { id:6, studentId:"STU006", name:"Sofia Martinez", class:"10B", date:"2026-06-19", status:"Present" as const },
  { id:7, studentId:"STU007", name:"Ethan Williams", class:"9A",  date:"2026-06-19", status:"Absent"  as const },
  { id:8, studentId:"STU008", name:"Aisha Patel",    class:"11A", date:"2026-06-19", status:"Present" as const },
];

// ─── Exams ────────────────────────────────────────────────────
export const exams = [
  { id:"EXM001", name:"Unit Test – Mathematics",     class:"10A", subject:"Mathematics",        date:"2026-07-05", duration:"2 hrs",  totalMarks:100, status:"Upcoming" as const },
  { id:"EXM002", name:"Mid-Term – Physics",           class:"11A", subject:"Physics",            date:"2026-07-12", duration:"2.5 hrs",totalMarks:100, status:"Upcoming" as const },
  { id:"EXM003", name:"Monthly Test – English",       class:"9B",  subject:"English Literature", date:"2026-06-25", duration:"1.5 hrs",totalMarks:50,  status:"Upcoming" as const },
  { id:"EXM004", name:"Final Exam – Chemistry",       class:"12A", subject:"Chemistry",          date:"2026-05-20", duration:"3 hrs",  totalMarks:100, status:"Completed" as const },
  { id:"EXM005", name:"Annual Exam – Mathematics",    class:"10B", subject:"Mathematics",        date:"2026-05-18", duration:"3 hrs",  totalMarks:100, status:"Completed" as const },
];

// ─── Results ──────────────────────────────────────────────────
export const results = [
  { id:"RES001", studentId:"STU001", name:"Alex Johnson",   subject:"Mathematics", examName:"Annual Exam",  marks:88, total:100, grade:"A",  status:"Pass" as const },
  { id:"RES002", studentId:"STU002", name:"Priya Sharma",   subject:"English",     examName:"Annual Exam",  marks:92, total:100, grade:"A+", status:"Pass" as const },
  { id:"RES003", studentId:"STU003", name:"James Smith",    subject:"Chemistry",   examName:"Final Exam",   marks:61, total:100, grade:"B",  status:"Pass" as const },
  { id:"RES004", studentId:"STU004", name:"Linda Lee",      subject:"Physics",     examName:"Mid-Term",     marks:95, total:100, grade:"A+", status:"Pass" as const },
  { id:"RES005", studentId:"STU005", name:"Michael Chen",   subject:"CS",          examName:"Unit Test",    marks:78, total:100, grade:"B+", status:"Pass" as const },
  { id:"RES006", studentId:"STU006", name:"Sofia Martinez", subject:"History",     examName:"Annual Exam",  marks:45, total:100, grade:"D",  status:"Fail" as const },
];

// ─── Assignments ──────────────────────────────────────────────
export const assignments = [
  { id:"ASG001", title:"Quadratic Equations Worksheet",    subject:"Mathematics", class:"10A", dueDate:"2026-06-25", assignedBy:"Dr. Sarah Jenkins",  status:"Active"   as const, submissions:24, total:30 },
  { id:"ASG002", title:"Essay: Shakespeare's Influence",   subject:"English",     class:"9B",  dueDate:"2026-06-22", assignedBy:"Mrs. Emma Watson",    status:"Active"   as const, submissions:18, total:28 },
  { id:"ASG003", title:"Lab Report – Acid Base Reactions", subject:"Chemistry",   class:"11A", dueDate:"2026-06-20", assignedBy:"Mr. John Davis",      status:"Overdue"  as const, submissions:30, total:32 },
  { id:"ASG004", title:"WWII – Cause & Effect Analysis",   subject:"History",     class:"9A",  dueDate:"2026-06-18", assignedBy:"Ms. Priya Nair",      status:"Completed"as const, submissions:28, total:28 },
  { id:"ASG005", title:"Python: Sorting Algorithms",       subject:"CS",          class:"12B", dueDate:"2026-06-28", assignedBy:"Mr. Alan Turing",     status:"Active"   as const, submissions:10, total:25 },
];

// ─── Fees ─────────────────────────────────────────────────────
export const feeTransactions = [
  { id:"TRX001", studentId:"STU001", name:"Alex Johnson",   class:"10A", amount:1200, dueDate:"2026-06-30", paidDate:"2026-06-10", method:"Card",          status:"Paid"    as const },
  { id:"TRX002", studentId:"STU002", name:"Priya Sharma",   class:"9B",  amount:1100, dueDate:"2026-06-30", paidDate:null,          method:"Bank Transfer",  status:"Pending" as const },
  { id:"TRX003", studentId:"STU003", name:"James Smith",    class:"12C", amount:1400, dueDate:"2026-05-31", paidDate:null,          method:"Cash",           status:"Overdue" as const },
  { id:"TRX004", studentId:"STU004", name:"Linda Lee",      class:"8A",  amount:900,  dueDate:"2026-06-30", paidDate:"2026-06-05", method:"Online",         status:"Paid"    as const },
  { id:"TRX005", studentId:"STU005", name:"Michael Chen",   class:"11B", amount:1300, dueDate:"2026-06-30", paidDate:"2026-06-15", method:"Card",           status:"Paid"    as const },
  { id:"TRX006", studentId:"STU006", name:"Sofia Martinez", class:"10B", amount:1200, dueDate:"2026-06-30", paidDate:null,          method:"-",              status:"Pending" as const },
];

// ─── Notices ──────────────────────────────────────────────────
export const notices = [
  { id:1, title:"Annual Sports Day – Oct 28",              date:"2026-06-18", type:"Event",     audience:"All",     priority:"High",   body:"All students are required to participate in the Annual Sports Day on Oct 28. Practice sessions begin Oct 10.", author:"Dr. James Carter" },
  { id:2, title:"Q3 Fee Submission Deadline",              date:"2026-06-15", type:"Finance",   audience:"Parents", priority:"High",   body:"Last date to submit Q3 fees is June 30. A late fee of $50 will be charged thereafter.", author:"Finance Dept." },
  { id:3, title:"Mid-Term Examination Schedule Released",  date:"2026-06-12", type:"Academic",  audience:"All",     priority:"Medium", body:"Mid-term exams for Grades 9–12 will commence on July 12. Timetable is available on the portal.", author:"Academics Dept." },
  { id:4, title:"Parent-Teacher Meeting – June 28",        date:"2026-06-10", type:"Event",     audience:"Parents", priority:"Medium", body:"We invite all parents for the quarterly PTM on June 28, 2026, from 10 AM to 2 PM.", author:"Administration" },
  { id:5, title:"School Reopens – July 1 (Summer Break)",  date:"2026-06-01", type:"Holiday",   audience:"All",     priority:"Low",    body:"School will reopen after the summer break on July 1, 2026.", author:"Administration" },
];

// ─── Teacher Specific ─────────────────────────────────────────
export const teacherSchedule = [
  { period:"1st", time:"8:00 – 8:45",  subject:"Mathematics", class:"10A", room:"R-101" },
  { period:"2nd", time:"8:50 – 9:35",  subject:"Mathematics", class:"11A", room:"R-101" },
  { period:"3rd", time:"9:40 – 10:25", subject:"Free Period",  class:"-",   room:"-"     },
  { period:"4th", time:"10:30 – 11:15",subject:"Mathematics", class:"10B", room:"R-204" },
  { period:"5th", time:"11:20 – 12:05",subject:"Mathematics", class:"9A",  room:"R-102" },
  { period:"6th", time:"13:00 – 13:45",subject:"Mathematics", class:"12A", room:"R-301" },
];

export const pendingAssignmentsToGrade = [
  { id:"ASG001", title:"Quadratic Equations Worksheet", class:"10A", submitted:24, total:30, due:"Jun 25" },
  { id:"ASG002", title:"Calculus Problem Set",          class:"11A", submitted:30, total:32, due:"Jun 22" },
];

// ─── Student Specific ─────────────────────────────────────────
export const studentAttendanceSummary = {
  present: 48, absent: 2, late: 3, total: 53, percentage: 90.6,
};
export const studentResults = [
  { subject:"Mathematics",  marks:88, total:100, grade:"A",  percent:88 },
  { subject:"Physics",      marks:74, total:100, grade:"B+", percent:74 },
  { subject:"English",      marks:92, total:100, grade:"A+", percent:92 },
  { subject:"Chemistry",    marks:67, total:100, grade:"B",  percent:67 },
  { subject:"CS",           marks:95, total:100, grade:"A+", percent:95 },
];
export const studentAssignments = [
  { id:"ASG001", title:"Quadratic Equations Worksheet", subject:"Mathematics", dueDate:"Jun 25", status:"Submitted" as const },
  { id:"ASG002", title:"Python: Sorting Algorithms",    subject:"CS",          dueDate:"Jun 28", status:"Pending"   as const },
  { id:"ASG003", title:"Essay: Shakespeare's Influence",subject:"English",     dueDate:"Jun 22", status:"Submitted" as const },
];

// ─── Parent Specific ─────────────────────────────────────────
export const parentChildInfo = {
  name:"Alex Johnson", grade:"Grade 10", section:"A", rollNo:"10A01",
  classTeacher:"Dr. Sarah Jenkins",
  attendance:{ present:48, absent:2, percentage:96 },
  fees:{ status:"Paid" as const, amount:1200, dueDate:"Jun 30", paidDate:"Jun 10" },
  recentMarks:[
    { subject:"Math",    marks:88, total:100 },
    { subject:"Physics", marks:74, total:100 },
    { subject:"English", marks:92, total:100 },
  ],
};
