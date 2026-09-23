import React from 'react';
import { useApp } from '../../context/AppContext';

export const TeachersDirectoryScreen: React.FC = () => {
  const { teachers, showToast } = useApp();

  return (
    <div className="flex flex-col w-full px-4 space-y-4 py-3 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#434655] uppercase tracking-wider font-semibold">
            <span>Faculty Management</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#004ac6]">Teachers Register</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight">Faculty Directory</h1>
        </div>
        <button
          className="h-9 px-3.5 bg-[#004ac6] text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm active:scale-95 hover:bg-[#2563eb]"
          onClick={() => showToast('Teacher Onboarding form opened')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Add Faculty</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white p-4 rounded-2xl shadow-sm border border-[#c3c6d7]/30 flex flex-col justify-between gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  className="w-13 h-13 rounded-2xl object-cover ring-2 ring-[#eaedff] shrink-0"
                  src={teacher.avatarUrl}
                  alt={teacher.name}
                />
                <div className="min-w-0 flex flex-col">
                  <span className="font-bold text-sm text-[#131b2e] truncate">{teacher.name}</span>
                  <span className="text-xs text-[#004ac6] font-semibold truncate">{teacher.designation}</span>
                  <span className="text-[11px] text-[#434655] truncate">{teacher.qualification}</span>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                teacher.status === 'In Campus'
                  ? 'bg-[#6ffbbe]/40 text-[#002113]'
                  : 'bg-[#dbe1ff] text-[#00174b]'
              }`}>
                {teacher.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-[#f2f3ff] p-2.5 rounded-xl text-xs">
              <div>
                <span className="text-[#434655] text-[10px] uppercase font-bold block">Biometric Entry</span>
                <span className="font-bold text-[#131b2e] flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[15px] text-[#007d55]">login</span>
                  {teacher.checkInTime}
                </span>
              </div>
              <div>
                <span className="text-[#434655] text-[10px] uppercase font-bold block">Department</span>
                <span className="font-bold text-[#131b2e] mt-0.5 block truncate">{teacher.subject}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#434655]">
                Leave: CL: {teacher.leaveBalance.cl} • SL: {teacher.leaveBalance.sl} • EL: {teacher.leaveBalance.el}
              </span>
              <button
                className="text-[#004ac6] font-bold text-xs hover:underline flex items-center gap-0.5"
                onClick={() => showToast(`Opening timetable & syllabus for ${teacher.name}`)}
              >
                <span>Timetable</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
