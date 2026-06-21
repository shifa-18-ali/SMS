// Multi-Tenant Mock Database
export interface School {
  id: string;
  name: string;
  plan: "Pro" | "Enterprise" | "Basic";
  status: "Active" | "Suspended";
  students: number;
  teachers: number;
  revenue: number;
  joinedDate: string;
}

export const schools: School[] = [
  { id: "S-001", name: "EduNexus International", plan: "Enterprise", status: "Active", students: 1250, teachers: 85, revenue: 12500, joinedDate: "2023-01-15" },
  { id: "S-002", name: "Greenwood High School",  plan: "Pro",        status: "Active", students: 850,  teachers: 60, revenue: 8500,  joinedDate: "2023-04-22" },
  { id: "S-003", name: "Pioneer Academy",        plan: "Basic",      status: "Active", students: 420,  teachers: 35, revenue: 4200,  joinedDate: "2024-02-10" },
];

export const platformKPIs = {
  totalSchools: 3,
  activeStudents: 2520,
  activeTeachers: 180,
  monthlyMRR: 25200,
};

// Tenant Scoped Data
// For demo purposes, we will assign most of the existing robust mock data to "S-001" (EduNexus)
// and provide smaller subsets for "S-002" (Greenwood) to prove isolation.

export const students = [
  // S-001
  { schoolId: "S-001", id: "STU001", name: "Alex Johnson",   grade: "10", section: "A", avatar: "AJ", parent: "Robert Johnson",  contact: "555-0101", email: "robert.j@example.com", attendance: 96, fees: "Paid", gender: "Male" },
  { schoolId: "S-001", id: "STU002", name: "Emma Smith",     grade: "10", section: "A", avatar: "ES", parent: "Michael Smith",   contact: "555-0102", email: "michael.s@example.com", attendance: 92, fees: "Pending", gender: "Female" },
  { schoolId: "S-001", id: "STU003", name: "Liam Williams",  grade: "9",  section: "B", avatar: "LW", parent: "David Williams",  contact: "555-0103", email: "david.w@example.com", attendance: 88, fees: "Overdue", gender: "Male" },
  { schoolId: "S-001", id: "STU004", name: "Olivia Brown",   grade: "11", section: "A", avatar: "OB", parent: "James Brown",     contact: "555-0104", email: "james.b@example.com", attendance: 98, fees: "Paid", gender: "Female" },
  { schoolId: "S-001", id: "STU005", name: "Noah Jones",     grade: "12", section: "C", avatar: "NJ", parent: "William Jones",   contact: "555-0105", email: "william.j@example.com", attendance: 85, fees: "Pending", gender: "Male" },
  // S-002
  { schoolId: "S-002", id: "GW-001", name: "Mia Taylor",     grade: "8",  section: "A", avatar: "MT", parent: "John Taylor",     contact: "555-0201", email: "john.t@example.com", attendance: 99, fees: "Paid", gender: "Female" },
  { schoolId: "S-002", id: "GW-002", name: "Ethan Davis",    grade: "8",  section: "B", avatar: "ED", parent: "Sarah Davis",     contact: "555-0202", email: "sarah.d@example.com", attendance: 91, fees: "Paid", gender: "Male" },
];

export const teachers = [
  // S-001
  { schoolId: "S-001", id: "TCH001", name: "Sarah Jenkins",   department: "Science",    subject: "Physics",     classes: ["10A", "11B", "12A"], qualification: "M.Sc. Physics",  experience: "8 Years", email: "sarah.j@edunexus.edu", contact: "555-0201", status: "Active", avatar: "SJ" },
  { schoolId: "S-001", id: "TCH002", name: "Michael Chang",   department: "Technology", subject: "Comp Science",classes: ["9A", "10B", "12C"],  qualification: "M.Tech CS",      experience: "5 Years", email: "michael.c@edunexus.edu", contact: "555-0202", status: "Active", avatar: "MC" },
  { schoolId: "S-001", id: "TCH003", name: "Emily Rodriguez", department: "Arts",       subject: "Literature",  classes: ["8A", "9B", "11A"],   qualification: "M.A. English",   experience: "12 Years",email: "emily.r@edunexus.edu", contact: "555-0203", status: "On Leave", avatar: "ER" },
  // S-002
  { schoolId: "S-002", id: "TCH004", name: "David Wilson",    department: "Humanities", subject: "History",     classes: ["8A", "8B"],          qualification: "M.A. History",   experience: "3 Years", email: "david.w@greenwood.edu", contact: "555-0301", status: "Active", avatar: "DW" },
];

export const classes = [
  // S-001
  { schoolId: "S-001", id: "CLS001", grade: "Grade 8",  sections: ["A", "B", "C"], students: 120, classTeacher: "Emily Rodriguez", subjects: ["Math", "Science", "English", "History"] },
  { schoolId: "S-001", id: "CLS002", grade: "Grade 9",  sections: ["A", "B"],      students: 85,  classTeacher: "Michael Chang",   subjects: ["Math", "Physics", "English", "CS"] },
  { schoolId: "S-001", id: "CLS003", grade: "Grade 10", sections: ["A", "B", "C"], students: 140, classTeacher: "Sarah Jenkins",   subjects: ["Math", "Physics", "Chemistry", "English"] },
  // S-002
  { schoolId: "S-002", id: "CLS004", grade: "Grade 8",  sections: ["A", "B"],      students: 60,  classTeacher: "David Wilson",    subjects: ["Math", "Science", "English", "History"] },
];

export const subjects = [
  // S-001
  { schoolId: "S-001", id: "SUB001", name: "Advanced Physics",  code: "PHY-301", department: "Science",    teacher: "Sarah Jenkins", grades: ["11", "12"], periods: 6 },
  { schoolId: "S-001", id: "SUB002", name: "Computer Science",  code: "CSC-101", department: "Technology", teacher: "Michael Chang", grades: ["9", "10"],  periods: 4 },
  { schoolId: "S-001", id: "SUB003", name: "World Literature",  code: "ENG-201", department: "Arts",       teacher: "Emily Rodriguez",grades: ["8", "9", "10"], periods: 5 },
  // S-002
  { schoolId: "S-002", id: "SUB004", name: "World History",     code: "HIS-101", department: "Humanities", teacher: "David Wilson",  grades: ["8"], periods: 4 },
];

export const attendanceRecords = [
  // S-001
  { schoolId: "S-001", studentId: "STU001", name: "Alex Johnson",  status: "Present" },
  { schoolId: "S-001", studentId: "STU002", name: "Emma Smith",    status: "Present" },
  { schoolId: "S-001", studentId: "STU003", name: "Liam Williams", status: "Absent" },
  { schoolId: "S-001", studentId: "STU004", name: "Olivia Brown",  status: "Late" },
  // S-002
  { schoolId: "S-002", studentId: "GW-001", name: "Mia Taylor",    status: "Present" },
  { schoolId: "S-002", studentId: "GW-002", name: "Ethan Davis",   status: "Present" },
];

export const assignments = [
  // S-001
  { schoolId: "S-001", id: "A001", title: "Physics Lab Report 3", subject: "Physics",      class: "10A", dueDate: "Jun 22, 2026", status: "Active",    submissions: 24, total: 30, assignedBy: "Sarah Jenkins" },
  { schoolId: "S-001", id: "A002", title: "React Components",     subject: "Comp Science", class: "12C", dueDate: "Jun 25, 2026", status: "Active",    submissions: 5,  total: 25, assignedBy: "Michael Chang" },
  { schoolId: "S-001", id: "A003", title: "Shakespeare Essay",    subject: "Literature",   class: "9B",  dueDate: "Jun 18, 2026", status: "Overdue",   submissions: 28, total: 30, assignedBy: "Emily Rodriguez" },
  // S-002
  { schoolId: "S-002", id: "A004", title: "World War II Essay",   subject: "History",      class: "8A",  dueDate: "Jun 24, 2026", status: "Active",    submissions: 10, total: 30, assignedBy: "David Wilson" },
];

export const exams = [
  // S-001
  { schoolId: "S-001", id: "E001", name: "Mid-Term Assessment", subject: "Physics",     class: "10A", date: "Jul 10, 2026", duration: "2 Hours", totalMarks: 100, status: "Upcoming" },
  { schoolId: "S-001", id: "E002", name: "Weekly Quiz 4",       subject: "Comp Science",class: "12C", date: "Jun 28, 2026", duration: "45 Mins", totalMarks: 20,  status: "Upcoming" },
  { schoolId: "S-001", id: "E003", name: "Final Essay Exam",    subject: "Literature",  class: "11A", date: "Jun 15, 2026", duration: "3 Hours", totalMarks: 100, status: "Completed" },
  // S-002
  { schoolId: "S-002", id: "E004", name: "History Mid-Term",    subject: "History",     class: "8A",  date: "Jul 12, 2026", duration: "2 Hours", totalMarks: 100, status: "Upcoming" },
];

export const results = [
  // S-001
  { schoolId: "S-001", id: "R001", name: "Alex Johnson",  subject: "Physics",     examName: "Term 1 Final", marks: 92, total: 100, grade: "A+", status: "Pass" },
  { schoolId: "S-001", id: "R002", name: "Emma Smith",    subject: "Physics",     examName: "Term 1 Final", marks: 78, total: 100, grade: "B",  status: "Pass" },
  { schoolId: "S-001", id: "R003", name: "Liam Williams", subject: "Literature",  examName: "Term 1 Final", marks: 45, total: 100, grade: "D",  status: "Fail" },
  // S-002
  { schoolId: "S-002", id: "R004", name: "Mia Taylor",    subject: "History",     examName: "Term 1 Final", marks: 95, total: 100, grade: "A+", status: "Pass" },
];

export const feeTransactions = [
  // S-001
  { schoolId: "S-001", id: "F001", name: "Alex Johnson",  class: "10A", amount: 1200, dueDate: "Jun 01, 2026", paidDate: "May 28, 2026", method: "Credit Card", status: "Paid" },
  { schoolId: "S-001", id: "F002", name: "Emma Smith",    class: "10A", amount: 1200, dueDate: "Jun 01, 2026", paidDate: null,           method: "—",           status: "Pending" },
  { schoolId: "S-001", id: "F003", name: "Liam Williams", class: "9B",  amount: 1100, dueDate: "May 01, 2026", paidDate: null,           method: "—",           status: "Overdue" },
  { schoolId: "S-001", id: "F004", name: "Olivia Brown",  class: "11A", amount: 1500, dueDate: "Jun 01, 2026", paidDate: "Jun 02, 2026", method: "Bank Transfer",status: "Paid" },
  // S-002
  { schoolId: "S-002", id: "F005", name: "Mia Taylor",    class: "8A",  amount: 800,  dueDate: "Jun 01, 2026", paidDate: "May 29, 2026", method: "Credit Card", status: "Paid" },
];

export const notices = [
  // S-001
  { schoolId: "S-001", id: "N001", title: "Summer Break Announcement",     type: "Holiday",  priority: "Medium", date: "Jun 18, 2026", audience: "All Users", author: "Admin", body: "The school will remain closed for summer break from July 1st to August 15th." },
  { schoolId: "S-001", id: "N002", title: "Fee Submission Deadline",       type: "Finance",  priority: "High",   date: "Jun 15, 2026", audience: "Parents",   author: "Finance", body: "Please ensure all pending Q3 fees are cleared by June 30th to avoid late penalties." },
  { schoolId: "S-001", id: "N003", title: "Science Fair 2026 Registration",type: "Event",    priority: "Low",    date: "Jun 10, 2026", audience: "Students",  author: "Science Dept", body: "Students interested in participating in the Annual Science Fair must register by June 25th." },
  // S-002
  { schoolId: "S-002", id: "N004", title: "Parent-Teacher Meeting",        type: "Event",    priority: "High",   date: "Jun 19, 2026", audience: "Parents",   author: "Admin", body: "PTM for Grade 8 will be held this Friday in the Main Hall." },
];

// Recharts Data Series
export const attendanceTrend = [
  { schoolId: "S-001", day: "Mon", present: 95, absent: 5 },
  { schoolId: "S-001", day: "Tue", present: 93, absent: 7 },
  { schoolId: "S-001", day: "Wed", present: 96, absent: 4 },
  { schoolId: "S-001", day: "Thu", present: 92, absent: 8 },
  { schoolId: "S-001", day: "Fri", present: 89, absent: 11 },
  { schoolId: "S-002", day: "Mon", present: 99, absent: 1 },
  { schoolId: "S-002", day: "Tue", present: 98, absent: 2 },
  { schoolId: "S-002", day: "Wed", present: 97, absent: 3 },
  { schoolId: "S-002", day: "Thu", present: 99, absent: 1 },
  { schoolId: "S-002", day: "Fri", present: 96, absent: 4 },
];

export const feeMonthly = [
  { schoolId: "S-001", month: "Jan", collected: 45000, pending: 5000 },
  { schoolId: "S-001", month: "Feb", collected: 42000, pending: 8000 },
  { schoolId: "S-001", month: "Mar", collected: 48000, pending: 2000 },
  { schoolId: "S-001", month: "Apr", collected: 30000, pending: 20000 },
  { schoolId: "S-001", month: "May", collected: 50000, pending: 0 },
  { schoolId: "S-001", month: "Jun", collected: 15000, pending: 35000 },
  { schoolId: "S-002", month: "Jan", collected: 12000, pending: 1000 },
  { schoolId: "S-002", month: "Feb", collected: 11000, pending: 2000 },
  { schoolId: "S-002", month: "Mar", collected: 12500, pending: 500 },
  { schoolId: "S-002", month: "Apr", collected: 8000,  pending: 5000 },
  { schoolId: "S-002", month: "May", collected: 13000, pending: 0 },
  { schoolId: "S-002", month: "Jun", collected: 4000,  pending: 9000 },
];

export const examPerformance = [
  { schoolId: "S-001", subject: "Math",    avg: 75, highest: 98, lowest: 45 },
  { schoolId: "S-001", subject: "Physics", avg: 68, highest: 95, lowest: 32 },
  { schoolId: "S-001", subject: "English", avg: 82, highest: 96, lowest: 55 },
  { schoolId: "S-001", subject: "History", avg: 71, highest: 92, lowest: 40 },
  { schoolId: "S-001", subject: "Comp Sci",avg: 85, highest: 100, lowest: 60 },
  { schoolId: "S-002", subject: "Math",    avg: 80, highest: 99, lowest: 50 },
  { schoolId: "S-002", subject: "Science", avg: 82, highest: 98, lowest: 55 },
  { schoolId: "S-002", subject: "English", avg: 88, highest: 100, lowest: 65 },
];

export const adminKPIs = {
  "S-001": { totalStudents: 1250, totalTeachers: 85, attendanceRate: 94.2, feeCollected: 230000, feePending: 45000 },
  "S-002": { totalStudents: 850,  totalTeachers: 60, attendanceRate: 97.5, feeCollected: 85000,  feePending: 15000 },
};

// Portal specific mock data (Needs to be fetched dynamically in real life)
export const studentAttendanceSummary = { present: 142, absent: 5, late: 3, total: 150, percentage: 94.6 };
export const studentResults = [
  { subject: "Mathematics", marks: 88, grade: "A" },
  { subject: "Physics",     marks: 75, grade: "B+" },
  { subject: "Chemistry",   marks: 82, grade: "A-" },
  { subject: "English",     marks: 91, grade: "A+" },
  { subject: "History",     marks: 78, grade: "B" },
];
export const studentAssignments = [
  { id: "1", title: "Algebra Worksheet", subject: "Mathematics", dueDate: "Tomorrow", status: "Pending" },
  { id: "2", title: "Physics Lab Report", subject: "Physics",     dueDate: "Jun 22",  status: "Submitted" },
  { id: "3", title: "Hamlet Essay",      subject: "English",     dueDate: "Jun 25",  status: "Pending" },
];

export const parentChildInfo = {
  name: "Alex Johnson", grade: "10", section: "A", rollNo: "10A01", classTeacher: "Sarah Jenkins",
  attendance: { percentage: 94.6, present: 142, absent: 8 },
  fees: { status: "Pending", amount: 1200, dueDate: "Jun 01, 2026", paidDate: "" },
  recentMarks: [
    { subject: "Mathematics", marks: 88, total: 100 },
    { subject: "Physics",     marks: 75, total: 100 },
    { subject: "English",     marks: 91, total: 100 },
  ],
};

export const teacherSchedule = [
  { period: "1st", time: "08:00 AM", subject: "Physics", class: "10A", room: "Lab 3" },
  { period: "2nd", time: "09:00 AM", subject: "Physics", class: "11B", room: "Room 402" },
  { period: "3rd", time: "10:00 AM", subject: "Free Period", class: "-", room: "-" },
  { period: "4th", time: "11:00 AM", subject: "Physics", class: "12A", room: "Lab 3" },
];

export const pendingAssignmentsToGrade = [
  { id: "A1", title: "Newton's Laws Quiz", class: "10A", due: "Yesterday", submitted: 28, total: 30 },
  { id: "A2", title: "Lab Report: Pendulums", class: "11B", due: "Today", submitted: 15, total: 25 },
];
