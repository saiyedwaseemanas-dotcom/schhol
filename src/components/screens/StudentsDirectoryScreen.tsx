import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';

export const StudentsDirectoryScreen: React.FC = () => {
  const { students, selectedClass, setSelectedClass, showToast, sendWhatsAppNotice } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = students.filter(s => {
    const matchesClass = selectedClass ? s.classId === selectedClass : true;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.includes(searchQuery) ||
      s.guardianName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full px-4 space-y-4 py-3 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#434655] uppercase tracking-wider font-semibold">
            <span>Administration</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#004ac6]">Directory</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight">Students Directory</h1>
        </div>
        <button
          className="h-9 px-3.5 bg-[#004ac6] text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-sm active:scale-95 hover:bg-[#2563eb]"
          onClick={() => showToast('Enrollment form modal opened')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Add Student</span>
        </button>
      </div>

      {/* Search & Class Filter */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#c3c6d7]/30 space-y-3">
        <div className="relative">
          <input
            type="text"
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#f2f3ff] text-sm text-[#131b2e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30 border border-[#c3c6d7]/30"
            placeholder="Search by student name, roll number, or guardian..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="material-symbols-outlined absolute left-3 top-3 text-[#737686] text-[20px]">
            search
          </span>
          {searchQuery && (
            <button
              className="absolute right-3 top-3 text-[#737686]"
              onClick={() => setSearchQuery('')}
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Class Filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(['10-A', '10-B', '9-A'] as const).map((cls) => {
            const isSelected = selectedClass === cls;
            const count = students.filter(s => s.classId === cls).length;
            return (
              <button
                key={cls}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#434655] hover:bg-[#dae2fd]'
                }`}
                onClick={() => setSelectedClass(cls)}
                type="button"
              >
                <span>Class {cls}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isSelected ? 'bg-[#dbe1ff] text-[#00174b]' : 'bg-[#dae2fd] text-[#434655]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Students List Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filteredStudents.map((student) => {
          const isDefaulter = student.attendancePercentage < 75 || student.isDefaulter;
          return (
            <div
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className="bg-white p-3.5 rounded-2xl shadow-sm border border-[#c3c6d7]/30 flex flex-col justify-between gap-3 hover:border-[#004ac6]/40 cursor-pointer transition-all active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#eaedff] shrink-0"
                    src={student.avatarUrl}
                    alt={student.name}
                  />
                  <div className="min-w-0 flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-[#131b2e] truncate">{student.name}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#eaedff] text-[#004ac6] rounded">
                        #{student.rollNo}
                      </span>
                    </div>
                    <span className="text-xs text-[#434655] truncate">
                      Class {student.classId} • {student.guardianRelation}: {student.guardianName}
                    </span>
                    <span className="text-[11px] text-[#737686] font-mono">{student.phone}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  isDefaulter ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#6ffbbe]/40 text-[#002113]'
                }`}>
                  {student.attendancePercentage}%
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#c3c6d7]/20 text-xs">
                <span className="text-[#434655]">
                  Status:{' '}
                  <strong className={student.todayStatus === 'P' ? 'text-[#007d55]' : 'text-[#ba1a1a]'}>
                    {student.todayStatus === 'P' ? 'Present' : student.todayStatus === 'A' ? 'Absent' : 'Leave'}
                  </strong>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 rounded-lg bg-[#f2f3ff] text-[#007d55] flex items-center justify-center hover:bg-[#eaedff]"
                    onClick={(e) => {
                      e.stopPropagation();
                      sendWhatsAppNotice(student.phone, `Greetings from DPS Sector 4 regarding ${student.name}`);
                    }}
                    type="button"
                    title="WhatsApp Guardian"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                  </button>
                  <button
                    className="w-8 h-8 rounded-lg bg-[#f2f3ff] text-[#004ac6] flex items-center justify-center hover:bg-[#eaedff]"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast(`Calling ${student.guardianName} at ${student.phone}`);
                    }}
                    type="button"
                    title="Call Guardian"
                  >
                    <span className="material-symbols-outlined text-[16px]">call</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Student Profile Dialog */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#283044]/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-5 space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-[#c3c6d7]/30 pb-3">
              <div className="flex items-center gap-3">
                <img
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#004ac6]/20"
                  src={selectedStudent.avatarUrl}
                  alt={selectedStudent.name}
                />
                <div>
                  <h3 className="font-bold text-base text-[#131b2e]">{selectedStudent.name}</h3>
                  <p className="text-xs text-[#434655]">
                    Roll #{selectedStudent.rollNo} • Class {selectedStudent.classId}
                  </p>
                </div>
              </div>
              <button
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#434655]"
                onClick={() => setSelectedStudent(null)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-[#f2f3ff] rounded-xl">
                <span className="text-[#434655] block">Guardian</span>
                <span className="font-bold text-[#131b2e]">
                  {selectedStudent.guardianName} ({selectedStudent.guardianRelation})
                </span>
              </div>
              <div className="p-3 bg-[#f2f3ff] rounded-xl">
                <span className="text-[#434655] block">Attendance Rate</span>
                <span className="font-bold text-[#007d55]">{selectedStudent.attendancePercentage}%</span>
              </div>
            </div>

            <div className="p-3 bg-[#f2f3ff] rounded-xl space-y-1 text-xs">
              <span className="font-bold text-[#131b2e]">Unit Test 2 Scores</span>
              <div className="grid grid-cols-3 gap-2 pt-1 font-semibold text-[#004ac6]">
                <div>Math: {selectedStudent.marks['UT-2']?.math || 0}/50</div>
                <div>Sci: {selectedStudent.marks['UT-2']?.science || 0}/50</div>
                <div>Eng: {selectedStudent.marks['UT-2']?.english || 0}/50</div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                className="flex-1 h-10 bg-[#007d55] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                onClick={() => {
                  sendWhatsAppNotice(selectedStudent.phone, `Official notice for ${selectedStudent.name}`);
                  setSelectedStudent(null);
                }}
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Send WhatsApp</span>
              </button>
              <button
                className="h-10 px-4 bg-[#eaedff] text-[#131b2e] rounded-xl text-xs font-bold"
                onClick={() => setSelectedStudent(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
