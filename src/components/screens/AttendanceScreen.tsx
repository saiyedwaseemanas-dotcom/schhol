import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AttendanceStatus, Student } from '../../types';

export const AttendanceScreen: React.FC = () => {
  const {
    students,
    teachers,
    selectedClass,
    setSelectedClass,
    updateStudentAttendance,
    markAllPresent,
    showToast,
    sendWhatsAppNotice,
    triggerManualSync,
    isSyncing,
    lastSyncTime
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'student' | 'faculty'>('student');
  const [defaultersOnly, setDefaultersOnly] = useState<boolean>(false);
  const [currentDateIndex, setCurrentDateIndex] = useState<number>(0);

  const dates = ['Today: Oct 24, 2024', 'Yesterday: Oct 23, 2024', 'Tuesday: Oct 22, 2024'];

  // Filter students by selected class
  const classStudents = students.filter(s => s.classId === selectedClass);
  const displayStudents = defaultersOnly
    ? classStudents.filter(s => s.attendancePercentage < 75 || s.isDefaulter)
    : classStudents;

  // Realtime counts for currently selected class
  const presentCount = classStudents.filter(s => s.todayStatus === 'P').length;
  const absentCount = classStudents.filter(s => s.todayStatus === 'A').length;
  const leaveCount = classStudents.filter(s => s.todayStatus === 'L').length;
  const halfDayCount = classStudents.filter(s => s.todayStatus === 'HD').length;
  const defaulterCount = classStudents.filter(s => s.attendancePercentage < 75 || s.isDefaulter).length;

  const handleStatusClick = (student: Student, status: AttendanceStatus) => {
    updateStudentAttendance(student.id, status);
    showToast(`${student.name} marked as ${status === 'P' ? 'Present' : status === 'A' ? 'Absent' : status === 'L' ? 'Leave' : 'Half-Day'}`);
  };

  const handleDateShift = (dir: number) => {
    const newIdx = Math.max(0, Math.min(dates.length - 1, currentDateIndex + dir));
    setCurrentDateIndex(newIdx);
    showToast(`Switched register to ${dates[newIdx]}`);
  };

  const exportAttendance = (type: 'Excel' | 'PDF') => {
    showToast(`Generating ${type} Attendance Register for Class ${selectedClass}...`);
  };

  return (
    <div className="flex flex-col w-full pb-20 max-w-4xl mx-auto">
      {/* Top Filter & Navigator Header */}
      <div className="px-4 py-3 bg-[#f2f3ff] flex flex-col gap-3 border-b border-[#c3c6d7]/30">
        {/* Segmented View Switcher: Student vs Faculty */}
        <div className="p-1 bg-[#eaedff] rounded-2xl flex items-center justify-between shadow-inner">
          <button
            className={`flex-1 py-2 rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'student'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveSubTab('student')}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span>Student Roster</span>
          </button>
          <button
            className={`flex-1 py-2 rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'faculty'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveSubTab('faculty')}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">badge</span>
            <span>Faculty Log</span>
          </button>
        </div>

        {/* Date Navigator */}
        <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-[#c3c6d7]/30">
          <button
            aria-label="Previous Day"
            className="w-8 h-8 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#434655] hover:text-[#004ac6] transition-colors active:scale-95 disabled:opacity-40"
            onClick={() => handleDateShift(1)}
            disabled={currentDateIndex === dates.length - 1}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[20px]">calendar_today</span>
            <span className="font-bold text-sm text-[#131b2e]">{dates[currentDateIndex]}</span>
            {currentDateIndex === 0 && (
              <span className="w-2 h-2 rounded-full bg-[#007d55] animate-ping"></span>
            )}
          </div>
          <button
            aria-label="Next Day"
            className="w-8 h-8 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#434655] hover:text-[#004ac6] transition-colors active:scale-95 disabled:opacity-40"
            onClick={() => handleDateShift(-1)}
            disabled={currentDateIndex === 0}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* Class Selection Filter Pills */}
        {activeSubTab === 'student' && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {(['10-A', '10-B', '9-A'] as const).map((cls) => {
              const isSelected = selectedClass === cls;
              const count = students.filter(s => s.classId === cls).length;
              return (
                <button
                  key={cls}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                    isSelected
                      ? 'bg-[#004ac6] text-white shadow-sm'
                      : 'bg-[#eaedff] text-[#434655] hover:bg-[#dae2fd]'
                  }`}
                  onClick={() => {
                    setSelectedClass(cls);
                    showToast(`Switched to Class ${cls} attendance roster`);
                  }}
                  type="button"
                >
                  <span>Class {cls}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                    isSelected ? 'bg-[#dbe1ff] text-[#00174b]' : 'bg-[#dae2fd] text-[#434655]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {activeSubTab === 'student' ? (
        <div className="flex flex-col space-y-3 px-4 pt-3">
          {/* Realtime Metric Ticker (4 Bento Stats) */}
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white p-2.5 rounded-2xl flex flex-col items-center justify-center shadow-sm border border-[#c3c6d7]/30">
              <span className="text-[11px] font-semibold text-[#434655]">Present</span>
              <span className="text-xl font-bold text-[#007d55]">{presentCount}</span>
            </div>
            <div className="bg-white p-2.5 rounded-2xl flex flex-col items-center justify-center shadow-sm border border-[#c3c6d7]/30">
              <span className="text-[11px] font-semibold text-[#434655]">Absent</span>
              <span className="text-xl font-bold text-[#ba1a1a]">{absentCount}</span>
            </div>
            <div className="bg-white p-2.5 rounded-2xl flex flex-col items-center justify-center shadow-sm border border-[#c3c6d7]/30">
              <span className="text-[11px] font-semibold text-[#434655]">Leave</span>
              <span className="text-xl font-bold text-[#4648d4]">{leaveCount}</span>
            </div>
            <div className="bg-white p-2.5 rounded-2xl flex flex-col items-center justify-center shadow-sm border border-[#c3c6d7]/30">
              <span className="text-[11px] font-semibold text-[#434655]">Half-Day</span>
              <span className="text-xl font-bold text-[#004ac6]">{halfDayCount}</span>
            </div>
          </div>

          {/* Quick Actions Ribbon */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              className="whitespace-nowrap px-3.5 py-2 bg-[#2563eb] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              onClick={() => markAllPresent(selectedClass)}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">done_all</span>
              <span>Mark All Present</span>
            </button>

            <button
              className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 ${
                defaultersOnly
                  ? 'bg-[#ba1a1a] text-white ring-2 ring-[#ba1a1a]/30'
                  : 'bg-[#ffdad6] text-[#93000a] hover:bg-[#ffdad6]/80'
              }`}
              onClick={() => {
                setDefaultersOnly(!defaultersOnly);
                showToast(!defaultersOnly ? 'Showing Defaulters (<75%) only' : 'Showing all students');
              }}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">warning</span>
              <span>Defaulters (&lt;75%)</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${defaultersOnly ? 'bg-white text-[#ba1a1a]' : 'bg-[#ba1a1a] text-white'}`}>
                {defaulterCount}
              </span>
            </button>

            <div className="flex items-center gap-1.5 ml-auto">
              <button
                className="h-9 px-2.5 bg-[#eaedff] text-[#434655] rounded-xl text-xs font-semibold flex items-center gap-1 hover:bg-[#dae2fd] transition-colors"
                onClick={() => exportAttendance('Excel')}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-[#007d55]">table_view</span>
                <span>Excel</span>
              </button>
              <button
                className="h-9 px-2.5 bg-[#eaedff] text-[#434655] rounded-xl text-xs font-semibold flex items-center gap-1 hover:bg-[#dae2fd] transition-colors"
                onClick={() => exportAttendance('PDF')}
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">picture_as_pdf</span>
                <span>PDF</span>
              </button>
            </div>
          </div>

          {/* Student Roster Cards List */}
          <div className="flex flex-col gap-3 pt-1">
            {displayStudents.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center text-[#434655] border border-[#c3c6d7]/30">
                <span className="material-symbols-outlined text-[40px] text-[#007d55] mb-2">verified_user</span>
                <p className="font-bold text-sm text-[#131b2e]">No Defaulters in Class {selectedClass}</p>
                <p className="text-xs mt-1">All enrolled students meet the statutory 75% CBSE attendance threshold.</p>
              </div>
            ) : (
              displayStudents.map((student) => {
                const isDefaulter = student.attendancePercentage < 75 || student.isDefaulter;
                const status = student.todayStatus;

                return (
                  <div
                    key={student.id}
                    className={`p-3.5 rounded-2xl shadow-sm flex flex-col gap-3 transition-all border ${
                      isDefaulter
                        ? 'bg-[#ffdad6]/25 border-[#ba1a1a]/30'
                        : 'bg-white border-[#c3c6d7]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                          isDefaulter ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#dbe1ff] text-[#00174b]'
                        }`}>
                          {student.rollNo}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#131b2e] truncate">{student.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-0.5 ${
                              isDefaulter ? 'bg-[#ba1a1a] text-white' : 'bg-[#eaedff] text-[#434655]'
                            }`}>
                              {isDefaulter && <span className="material-symbols-outlined text-[12px]">warning</span>}
                              {student.attendancePercentage}%
                            </span>
                          </div>
                          <span className={`text-xs truncate ${isDefaulter ? 'text-[#ba1a1a] font-semibold' : 'text-[#434655]'}`}>
                            {student.note || `Class ${student.classId} • ${student.guardianRelation}: ${student.guardianName}`}
                          </span>
                        </div>
                      </div>

                      {/* Parent Contact Action */}
                      {isDefaulter ? (
                        <button
                          className="px-3 py-1.5 rounded-full bg-[#ba1a1a] text-white flex items-center gap-1 text-xs font-bold shadow-sm active:scale-95 transition-transform"
                          onClick={() =>
                            sendWhatsAppNotice(
                              student.phone,
                              `URGENT WARNING from DPS Sector 4: ${student.name} attendance is ${student.attendancePercentage}%, which is below the mandatory 75% CBSE requirement. Please contact the class teacher immediately.`
                            )
                          }
                          type="button"
                          title="Alert Parent on WhatsApp"
                        >
                          <span className="material-symbols-outlined text-[15px]">priority_high</span>
                          <span>Alert Parent</span>
                        </button>
                      ) : (
                        <button
                          className="w-9 h-9 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#007d55] hover:bg-[#eaedff] transition-colors active:scale-95"
                          onClick={() =>
                            sendWhatsAppNotice(
                              student.phone,
                              `EduTrack Pro Alert: Daily attendance update for ${student.name} (Roll ${student.rollNo}). Status: ${
                                status === 'P' ? 'Present' : status === 'A' ? 'Absent' : status === 'L' ? 'On Leave' : 'Half-Day Leave'
                              } on ${dates[currentDateIndex]}.`
                            )
                          }
                          type="button"
                          title="Message Parent on WhatsApp"
                        >
                          <span className="material-symbols-outlined text-[20px]">chat</span>
                        </button>
                      )}
                    </div>

                    {/* 4 Segmented Buttons: P / A / L / HD */}
                    <div className="grid grid-cols-4 bg-[#f2f3ff] p-1 rounded-xl gap-1">
                      <button
                        className={`py-1.5 rounded-lg text-xs font-bold text-center transition-all ${
                          status === 'P'
                            ? 'bg-[#007d55] text-white shadow-sm'
                            : 'text-[#434655] hover:bg-[#eaedff]'
                        }`}
                        onClick={() => handleStatusClick(student, 'P')}
                        type="button"
                      >
                        P
                      </button>
                      <button
                        className={`py-1.5 rounded-lg text-xs font-bold text-center transition-all ${
                          status === 'A'
                            ? 'bg-[#ba1a1a] text-white shadow-sm'
                            : 'text-[#434655] hover:bg-[#eaedff]'
                        }`}
                        onClick={() => handleStatusClick(student, 'A')}
                        type="button"
                      >
                        A
                      </button>
                      <button
                        className={`py-1.5 rounded-lg text-xs font-bold text-center transition-all ${
                          status === 'L'
                            ? 'bg-[#4648d4] text-white shadow-sm'
                            : 'text-[#434655] hover:bg-[#eaedff]'
                        }`}
                        onClick={() => handleStatusClick(student, 'L')}
                        type="button"
                      >
                        L
                      </button>
                      <button
                        className={`py-1.5 rounded-lg text-xs font-bold text-center transition-all ${
                          status === 'HD'
                            ? 'bg-[#004ac6] text-white shadow-sm'
                            : 'text-[#434655] hover:bg-[#eaedff]'
                        }`}
                        onClick={() => handleStatusClick(student, 'HD')}
                        type="button"
                      >
                        HD
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* Faculty Log Tab View */
        <div className="flex flex-col gap-3 px-4 pt-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-bold text-sm text-[#131b2e]">Teaching Faculty Daily Register</span>
            <span className="text-xs text-[#007d55] font-semibold bg-[#6ffbbe]/40 px-2.5 py-0.5 rounded-full">
              5 of 5 Present
            </span>
          </div>

          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white p-4 rounded-2xl shadow-sm border border-[#c3c6d7]/30 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#eaedff]"
                    src={teacher.avatarUrl}
                    alt={teacher.name}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-sm text-[#131b2e] truncate">{teacher.name}</span>
                    <span className="text-xs text-[#434655] truncate">{teacher.designation} • {teacher.qualification}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                  teacher.status === 'In Campus'
                    ? 'bg-[#6ffbbe]/40 text-[#002113]'
                    : 'bg-[#dbe1ff] text-[#00174b]'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#007d55]"></span>
                  {teacher.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-[#f2f3ff] p-2.5 rounded-xl text-xs">
                <div className="flex flex-col">
                  <span className="text-[#434655] text-[11px]">Biometric Check-In</span>
                  <span className="font-bold text-[#131b2e] flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[16px] text-[#007d55]">login</span>
                    {teacher.checkInTime}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#434655] text-[11px]">Scheduled Out</span>
                  <span className="font-bold text-[#131b2e] flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[16px] text-[#737686]">logout</span>
                    {teacher.checkOutTime}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between px-1 text-xs">
                <span className="text-[#434655] font-medium">Leave Balances:</span>
                <div className="flex items-center gap-2">
                  <span className="bg-[#eaedff] px-2 py-0.5 rounded-md font-semibold text-[#131b2e]">CL: {teacher.leaveBalance.cl}</span>
                  <span className="bg-[#eaedff] px-2 py-0.5 rounded-md font-semibold text-[#131b2e]">SL: {teacher.leaveBalance.sl}</span>
                  <span className="bg-[#eaedff] px-2 py-0.5 rounded-md font-semibold text-[#131b2e]">EL: {teacher.leaveBalance.el}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Sticky Save & Google Sheet Sync Strip */}
      <div className="sticky bottom-16 z-30 px-4 py-2 mt-4 bg-[#faf8ff]/90 backdrop-blur-md">
        <div className="bg-[#283044] text-[#eef0ff] p-3 rounded-2xl shadow-xl flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6ffbbe]"></span>
              <span className="text-xs font-semibold text-white truncate">
                {isSyncing ? 'Syncing with Google Sheets...' : `Auto-saved (${lastSyncTime})`}
              </span>
            </div>
            <span className="text-[11px] text-[#c3c6d7] truncate">Connected: DPS_Attendance_Sync_2024</span>
          </div>
          <button
            className="px-3.5 py-2 bg-[#004ac6] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all shrink-0 hover:bg-[#2563eb]"
            onClick={triggerManualSync}
            disabled={isSyncing}
            type="button"
          >
            <span className={`material-symbols-outlined text-[18px] ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
            <span>{isSyncing ? 'Pushing...' : 'Push Sheet'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
