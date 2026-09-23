import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Student, Teacher, Chapter, AdministrativeAlert, ActiveTab, AttendanceStatus, ExamType, StudentMarks } from '../types';
import { INITIAL_STUDENTS, INITIAL_TEACHERS, INITIAL_CHAPTERS, INITIAL_ALERTS } from '../data/initialData';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedClass: '10-A' | '10-B' | '9-A';
  setSelectedClass: (cls: '10-A' | '10-B' | '9-A') => void;
  selectedSubject: string;
  setSelectedSubject: (subj: string) => void;
  selectedExam: ExamType;
  setSelectedExam: (exam: ExamType) => void;
  students: Student[];
  teachers: Teacher[];
  chapters: Chapter[];
  alerts: AdministrativeAlert[];
  activeRole: 'Admin' | 'Principal' | 'Teacher';
  setActiveRole: (role: 'Admin' | 'Principal' | 'Teacher') => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  showApkModal: boolean;
  setShowApkModal: (show: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  updateStudentAttendance: (studentId: string, status: AttendanceStatus) => void;
  markAllPresent: (classId?: string) => void;
  updateStudentMarks: (studentId: string, exam: ExamType, subjectKey: keyof StudentMarks, score: number) => void;
  updateChapter: (chapterId: string, updates: Partial<Chapter>) => void;
  addNewChapter: (chap: Omit<Chapter, 'id'>) => void;
  isSyncing: boolean;
  lastSyncTime: string;
  isLiveSyncActive: boolean;
  setIsLiveSyncActive: (active: boolean) => void;
  sheetUrl: string;
  setSheetUrl: (url: string) => void;
  triggerManualSync: () => void;
  sendWhatsAppNotice: (phone: string, text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedClass, setSelectedClass] = useState<'10-A' | '10-B' | '9-A'>('10-A');
  const [selectedSubject, setSelectedSubject] = useState<string>('Mathematics');
  const [selectedExam, setSelectedExam] = useState<ExamType>('UT-2');
  const [activeRole, setActiveRole] = useState<'Admin' | 'Principal' | 'Teacher'>('Admin');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [showApkModal, setShowApkModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persistence in state
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('edutrack_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers] = useState<Teacher[]>(INITIAL_TEACHERS);

  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const saved = localStorage.getItem('edutrack_chapters');
    return saved ? JSON.parse(saved) : INITIAL_CHAPTERS;
  });

  const [alerts] = useState<AdministrativeAlert[]>(INITIAL_ALERTS);

  // Sync state
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Today at 09:42 AM');
  const [isLiveSyncActive, setIsLiveSyncActive] = useState<boolean>(true);
  const [sheetUrl, setSheetUrl] = useState<string>('https://docs.google.com/spreadsheets/d/1X9_EDUTrack_DPS4_Roster_2024/edit');

  useEffect(() => {
    localStorage.setItem('edutrack_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('edutrack_chapters', JSON.stringify(chapters));
  }, [chapters]);

  let toastTimer: any = null;
  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const updateStudentAttendance = (studentId: string, status: AttendanceStatus) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, todayStatus: status };
      }
      return s;
    }));
  };

  const markAllPresent = (classFilter?: string) => {
    const targetClass = classFilter || selectedClass;
    setStudents(prev => prev.map(s => {
      if (s.classId === targetClass) {
        return { ...s, todayStatus: 'P' };
      }
      return s;
    }));
    showToast(`Marked all students in Class ${targetClass} as Present`);
  };

  const updateStudentMarks = (studentId: string, exam: ExamType, subjectKey: keyof StudentMarks, score: number) => {
    const clampedScore = Math.max(0, Math.min(50, score));
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const currentExamMarks = s.marks[exam] || { math: 0, science: 0, english: 0 };
        return {
          ...s,
          marks: {
            ...s.marks,
            [exam]: {
              ...currentExamMarks,
              [subjectKey]: clampedScore
            }
          }
        };
      }
      return s;
    }));
  };

  const updateChapter = (chapterId: string, updates: Partial<Chapter>) => {
    setChapters(prev => prev.map(c => {
      if (c.id === chapterId) {
        return { ...c, ...updates };
      }
      return c;
    }));
  };

  const addNewChapter = (chap: Omit<Chapter, 'id'>) => {
    const newId = `chap-${Date.now()}`;
    setChapters(prev => [...prev, { ...chap, id: newId }]);
    showToast(`Added unit: ${chap.name}`);
  };

  const triggerManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(`Today at ${timeStr}`);
      showToast('All 4 Master Sheets successfully synced!');
    }, 1200);
  };

  const sendWhatsAppNotice = (phone: string, text: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${cleanPhone || '919876543210'}?text=${encoded}`;
    window.open(url, '_blank');
    showToast('Dispatched WhatsApp notification to parent');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedClass,
        setSelectedClass,
        selectedSubject,
        setSelectedSubject,
        selectedExam,
        setSelectedExam,
        students,
        teachers,
        chapters,
        alerts,
        activeRole,
        setActiveRole,
        drawerOpen,
        setDrawerOpen,
        showApkModal,
        setShowApkModal,
        toastMessage,
        showToast,
        updateStudentAttendance,
        markAllPresent,
        updateStudentMarks,
        updateChapter,
        addNewChapter,
        isSyncing,
        lastSyncTime,
        isLiveSyncActive,
        setIsLiveSyncActive,
        sheetUrl,
        setSheetUrl,
        triggerManualSync,
        sendWhatsAppNotice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
