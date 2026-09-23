export type AttendanceStatus = 'P' | 'A' | 'L' | 'HD';

export type ExamType = 'UT-1' | 'UT-2' | 'Mid-Term' | 'Final';

export interface StudentMarks {
  math: number;
  science: number;
  english: number;
  socialScience?: number;
  hindi?: number;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
  classId: '10-A' | '10-B' | '9-A';
  guardianName: string;
  guardianRelation: 'Father' | 'Mother' | 'Guardian';
  phone: string;
  avatarUrl: string;
  attendancePercentage: number;
  todayStatus: AttendanceStatus;
  note?: string;
  marks: Record<ExamType, StudentMarks>;
  isDefaulter?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  qualification: string;
  designation: string;
  subject: string;
  status: 'In Campus' | 'On Duty (Exam)' | 'On Leave';
  checkInTime: string;
  checkOutTime: string;
  leaveBalance: {
    cl: number;
    sl: number;
    el: number;
  };
  avatarUrl: string;
  phone: string;
  email: string;
}

export type ChapterStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface Chapter {
  id: string;
  unitNumber: number;
  name: string;
  subject: string;
  classId: '10-A' | '10-B' | '9-A';
  allottedPeriods: number;
  completedPeriods: number;
  status: ChapterStatus;
  completionDate?: string;
  scheduledDate?: string;
  notes?: string;
  homework?: string;
}

export interface AdministrativeAlert {
  id: string;
  type: 'attendance' | 'syllabus';
  title: string;
  subtitle: string;
  description: string;
  studentId?: string;
  studentName?: string;
  studentRoll?: string;
  studentClass?: string;
  attendancePct?: number;
  phone?: string;
  avatarUrl?: string;
  daysPending?: number;
  teacherName?: string;
  severity: 'critical' | 'warning';
}

export type ActiveTab = 'dashboard' | 'attendance' | 'syllabus' | 'exams' | 'sync' | 'students' | 'teachers' | 'reports';

export interface ColumnMapping {
  colLetter: string;
  sheetHeader: string;
  mappedField: string;
}
