import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExamType, StudentMarks } from '../../types';
import confetti from 'canvas-confetti';

export const MarksScreen: React.FC = () => {
  const {
    students,
    selectedClass,
    setSelectedClass,
    selectedExam,
    setSelectedExam,
    updateStudentMarks,
    showToast,
    sendWhatsAppNotice
  } = useApp();

  const [activeMarksView, setActiveMarksView] = useState<'marksheet' | 'analytics' | 'report'>('marksheet');
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<string>('std-1');

  const examList: ExamType[] = ['UT-1', 'UT-2', 'Mid-Term', 'Final'];

  // Filter students for the class
  const classStudents = students.filter(s => s.classId === selectedClass);

  // Compute student totals and sort by total descending for live ranking
  const studentRankList = classStudents.map(student => {
    const marks = student.marks[selectedExam] || { math: 0, science: 0, english: 0 };
    const total = (marks.math || 0) + (marks.science || 0) + (marks.english || 0);
    const maxMarks = 150;
    const percentage = Number(((total / maxMarks) * 100).toFixed(1));
    
    let grade = 'Fail';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 50) grade = 'C';

    return {
      ...student,
      examMarks: marks,
      total,
      percentage,
      grade
    };
  }).sort((a, b) => b.total - a.total);

  // Add rank numbers
  const rankedStudents = studentRankList.map((item, idx) => ({
    ...item,
    computedRank: idx + 1
  }));

  // Find active student for report card
  const reportStudent = rankedStudents.find(s => s.id === selectedStudentForReport) || rankedStudents[0] || {
    id: 'std-1',
    name: 'Aarav Patel',
    rollNo: '01',
    classId: '10-A',
    attendancePercentage: 94.5,
    examMarks: { math: 48, science: 46, english: 45 },
    total: 139,
    percentage: 92.7,
    grade: 'A+',
    computedRank: 1,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeOdlwA-fM5WKKeqRkKYaSo-A9OXHVBLrhm8K3Ufmnjt_DCWnTfbrANMja7jq5QEXwb_eXdhsWY32NpPSINLow-dNMrz-6x7b5YI5pMwZhzA3cFiq3o97Kn3ohDUKoZ6i85nbysYgernq8GaDZyUzYpKhvqmKrZc8YMUxZJ5V4MpXx2_r93v1r_EaxZ-0LsK8TjGQQLy-pRwlZobO8iUZutXsq2eEY7jJn3sJyLNPguZy5kroi0JGn',
    phone: '+91 98765 43210'
  };

  const handleScoreChange = (studentId: string, subject: keyof StudentMarks, rawValue: string) => {
    const num = Math.max(0, Math.min(50, parseFloat(rawValue) || 0));
    updateStudentMarks(studentId, selectedExam, subject, num);
  };

  const handleSaveMarksheet = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
    showToast(`All ${selectedExam} marks updated and saved successfully!`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col w-full px-4 py-3 space-y-4 max-w-4xl mx-auto pb-24">
      {/* Header & Term Context Strip */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#004ac6] text-[22px]">military_tech</span>
          <h1 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight">Marks & Assessments</h1>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#eaedff] rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#007d55] animate-pulse"></span>
          <span className="text-xs font-semibold text-[#434655]">Term 2 Active</span>
        </div>
      </div>

      {/* Exam Selection Horizontal Scroll Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {examList.map((exam) => {
          const isSelected = selectedExam === exam;
          return (
            <button
              key={exam}
              onClick={() => {
                setSelectedExam(exam);
                showToast(`Switched assessment view to ${exam}`);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                isSelected
                  ? 'bg-[#2563eb] text-white shadow-md'
                  : 'bg-white text-[#434655] shadow-sm hover:bg-[#f2f3ff] border border-[#c3c6d7]/30'
              }`}
              type="button"
            >
              {isSelected && <span className="material-symbols-outlined text-[16px]">check_circle</span>}
              <span>{exam === 'UT-1' ? 'Unit Test 1 (UT-1)' : exam === 'UT-2' ? 'Unit Test 2 (UT-2)' : exam}</span>
            </button>
          );
        })}
      </div>

      {/* Filter & Configuration Strip */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#c3c6d7]/30 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {/* Class Selector */}
          <div className="flex flex-col bg-[#f2f3ff] p-2.5 rounded-xl border border-[#c3c6d7]/30">
            <span className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Class & Section</span>
            <div className="flex items-center justify-between mt-0.5">
              <select
                className="font-bold text-sm text-[#131b2e] bg-transparent focus:outline-none cursor-pointer w-full"
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value as any);
                  showToast(`Viewing Class ${e.target.value} marksheet`);
                }}
              >
                <option value="10-A">Class 10-A</option>
                <option value="10-B">Class 10-B</option>
                <option value="9-A">Class 9-A</option>
              </select>
            </div>
          </div>

          {/* Subject Scope */}
          <div className="flex flex-col bg-[#f2f3ff] p-2.5 rounded-xl border border-[#c3c6d7]/30">
            <span className="text-[10px] font-bold text-[#434655] uppercase tracking-wider">Subject Scope</span>
            <div className="flex items-center justify-between mt-0.5">
              <span className="font-bold text-sm text-[#131b2e] truncate">All Subjects</span>
              <span className="material-symbols-outlined text-[18px] text-[#737686]">expand_more</span>
            </div>
          </div>
        </div>

        {/* Max Marks & Grading Scheme Tagline */}
        <div className="flex items-center justify-between px-1 pt-1">
          <div className="flex items-center gap-1.5 text-[#434655]">
            <span className="material-symbols-outlined text-[16px] text-[#004ac6]">info</span>
            <span className="text-xs">
              Max Marks: <strong className="text-[#131b2e] font-bold">50 / Subject</strong> (Total: 150)
            </span>
          </div>
          <span className="px-2.5 py-0.5 bg-[#dbe1ff] text-[#00174b] rounded-full text-xs font-bold">
            Scale: A+ (≥90%)
          </span>
        </div>
      </div>

      {/* Segmented View Mode Controller */}
      <div className="bg-[#eaedff] p-1 rounded-2xl flex items-center shadow-inner">
        <button
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeMarksView === 'marksheet'
              ? 'bg-white text-[#004ac6] shadow-sm'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
          onClick={() => setActiveMarksView('marksheet')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">table_chart</span>
          <span>Marksheet</span>
        </button>

        <button
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeMarksView === 'analytics'
              ? 'bg-white text-[#004ac6] shadow-sm'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
          onClick={() => setActiveMarksView('analytics')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">insights</span>
          <span>Analytics</span>
        </button>

        <button
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeMarksView === 'report'
              ? 'bg-white text-[#004ac6] shadow-sm'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
          onClick={() => setActiveMarksView('report')}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">badge</span>
          <span>Report Card</span>
        </button>
      </div>

      {/* VIEW 1: Marksheet Table */}
      {activeMarksView === 'marksheet' && (
        <section className="space-y-3 flex flex-col">
          {/* Real-time Grade Engine Banner */}
          <div className="flex items-center justify-between bg-white p-3 rounded-2xl shadow-sm border border-[#c3c6d7]/30">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] font-semibold">
                <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
              </span>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-[#131b2e]">Real-time Grade Engine</span>
                <span className="text-[11px] text-[#434655]">Changes auto-recalculate % and rank</span>
              </div>
            </div>
            <button
              className="px-4 py-2 bg-[#004ac6] rounded-xl text-white text-xs font-bold shadow-sm active:scale-95 transition-transform flex items-center gap-1 hover:bg-[#2563eb]"
              onClick={handleSaveMarksheet}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Save</span>
            </button>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#c3c6d7]/30">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#f2f3ff] text-[#434655] border-b border-[#c3c6d7]/30">
                    <th className="py-2.5 px-3 font-bold uppercase tracking-wider">Roll</th>
                    <th className="py-2.5 px-3 font-bold uppercase tracking-wider min-w-[140px]">Student</th>
                    <th className="py-2.5 px-2 font-bold uppercase tracking-wider text-center">Math (50)</th>
                    <th className="py-2.5 px-2 font-bold uppercase tracking-wider text-center">Sci (50)</th>
                    <th className="py-2.5 px-2 font-bold uppercase tracking-wider text-center">Eng (50)</th>
                    <th className="py-2.5 px-2 font-bold uppercase tracking-wider text-center">Total</th>
                    <th className="py-2.5 px-2 font-bold uppercase tracking-wider text-center">%</th>
                    <th className="py-2.5 px-2 font-bold uppercase tracking-wider text-center">Grade</th>
                    <th className="py-2.5 px-3 font-bold uppercase tracking-wider text-center">Rank</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c3c6d7]/20 text-[#131b2e]">
                  {rankedStudents.map((student) => {
                    const isTopper = student.computedRank === 1;
                    return (
                      <tr
                        key={student.id}
                        onClick={() => setSelectedStudentForReport(student.id)}
                        className={`hover:bg-[#f2f3ff]/60 transition-colors cursor-pointer ${
                          selectedStudentForReport === student.id ? 'bg-[#eaedff]/40' : ''
                        }`}
                      >
                        <td className="py-2.5 px-3 font-bold text-[#004ac6]">{student.rollNo}</td>
                        <td className="py-2.5 px-3 min-w-[140px]">
                          <div className="flex items-center gap-2">
                            <img
                              className="w-7 h-7 rounded-full object-cover shrink-0"
                              src={student.avatarUrl}
                              alt={student.name}
                            />
                            <div className="flex flex-col min-w-0">
                              <span className="font-bold text-[#131b2e] truncate">{student.name}</span>
                              {isTopper ? (
                                <span className="text-[10px] text-[#007d55] font-bold flex items-center gap-0.5">
                                  <span className="material-symbols-outlined text-[13px]">military_tech</span> Rank #1
                                </span>
                              ) : (
                                <span className="text-[10px] text-[#434655]">Class {student.classId}</span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Editable Math */}
                        <td className="py-2 px-1 text-center">
                          <input
                            className="w-12 h-8 text-center bg-[#f2f3ff] rounded-lg font-bold text-xs text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#004ac6] outline-none border border-[#c3c6d7]/30"
                            type="number"
                            min="0"
                            max="50"
                            value={student.examMarks.math}
                            onChange={(e) => handleScoreChange(student.id, 'math', e.target.value)}
                          />
                        </td>

                        {/* Editable Science */}
                        <td className="py-2 px-1 text-center">
                          <input
                            className="w-12 h-8 text-center bg-[#f2f3ff] rounded-lg font-bold text-xs text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#004ac6] outline-none border border-[#c3c6d7]/30"
                            type="number"
                            min="0"
                            max="50"
                            value={student.examMarks.science}
                            onChange={(e) => handleScoreChange(student.id, 'science', e.target.value)}
                          />
                        </td>

                        {/* Editable English */}
                        <td className="py-2 px-1 text-center">
                          <input
                            className="w-12 h-8 text-center bg-[#f2f3ff] rounded-lg font-bold text-xs text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#004ac6] outline-none border border-[#c3c6d7]/30"
                            type="number"
                            min="0"
                            max="50"
                            value={student.examMarks.english}
                            onChange={(e) => handleScoreChange(student.id, 'english', e.target.value)}
                          />
                        </td>

                        {/* Computed Total */}
                        <td className="py-2 px-2 text-center font-bold text-[#131b2e]">{student.total}</td>

                        {/* Computed % */}
                        <td className="py-2 px-2 text-center font-bold text-[#004ac6]">{student.percentage}%</td>

                        {/* Grade Badge */}
                        <td className="py-2 px-2 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              student.grade === 'A+'
                                ? 'bg-[#6ffbbe]/40 text-[#002113]'
                                : student.grade === 'A'
                                ? 'bg-[#dbe1ff] text-[#00174b]'
                                : student.grade === 'B'
                                ? 'bg-[#eaedff] text-[#131b2e]'
                                : 'bg-[#ffdad6] text-[#ba1a1a]'
                            }`}
                          >
                            {student.grade}
                          </span>
                        </td>

                        {/* Rank Badge */}
                        <td className="py-2 px-3 text-center">
                          <div
                            className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-[11px] ${
                              isTopper
                                ? 'bg-[#6063ee] text-white shadow-sm'
                                : 'bg-[#eaedff] text-[#131b2e]'
                            }`}
                          >
                            {student.computedRank}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Quick Guidance Footer */}
            <div className="bg-[#f2f3ff] px-3 py-2 flex items-center justify-between text-[#434655] text-xs border-t border-[#c3c6d7]/30">
              <span className="flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[15px] text-[#007d55]">verified</span>
                Formula active: Marks ÷ 150 × 100
              </span>
              <span className="font-semibold">{rankedStudents.length} Students listed</span>
            </div>
          </div>
        </section>
      )}

      {/* VIEW 2: Analytics & Toppers Banner */}
      {activeMarksView === 'analytics' && (
        <section className="space-y-4">
          {/* Topper Spotlight Banner */}
          <div className="bg-gradient-to-r from-[#004ac6] to-[#4648d4] p-4 rounded-3xl text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 bg-[#6ffbbe] text-[#002113] rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Class Valedictorian
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {rankedStudents[0]?.name || 'Aarav Patel'}
                </h2>
                <p className="text-xs text-[#dbe1ff]">
                  Rank #1 • {rankedStudents[0]?.percentage || '92.7'}% Overall ({rankedStudents[0]?.total || 139} / 150)
                </p>
              </div>
              <div className="relative shrink-0">
                <img
                  className="w-16 h-16 rounded-full object-cover shadow-lg ring-4 ring-[#6ffbbe]"
                  alt="Valedictorian"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSXdTNEpChEvec26SDgCq6kilVFCapP3CQGhzmX-vNP7Nm1vJUJePtNrK3_sFuNyRNfbD0WkhyVDz2EhnPMLb6IttppM9QrMwWJoRY-BcmXyG7eeM26yEMButBcgjGvAr6I9bAlCmunkkfZCRq5onbLYTvmsNt-W8cg7uCMzXgdhQqNF9IhqRS3i1TfPIXAZuQRVbZJmtXC2UduPAzLuAx7kEeoZRrhCs_kB3TjADyuImOzPnct_jQ"
                />
                <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#6063ee] text-white flex items-center justify-center text-[10px] font-bold shadow">
                  #1
                </span>
              </div>
            </div>
          </div>

          {/* 3-Card Bento */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#c3c6d7]/30 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[#004ac6] text-[22px] mb-1">stacked_line_chart</span>
              <span className="text-[10px] font-bold text-[#434655] uppercase">Average</span>
              <span className="text-base sm:text-lg font-bold text-[#131b2e] mt-0.5">83.2%</span>
              <span className="text-[11px] text-[#007d55] font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[12px]">arrow_upward</span> +3.4%
              </span>
            </div>

            <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#c3c6d7]/30 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[#4648d4] text-[22px] mb-1">emoji_events</span>
              <span className="text-[10px] font-bold text-[#434655] uppercase">Highest</span>
              <span className="text-base sm:text-lg font-bold text-[#131b2e] mt-0.5">
                {rankedStudents[0]?.percentage || '92.7'}%
              </span>
              <span className="text-[11px] text-[#434655] truncate max-w-full">
                {rankedStudents[0]?.name || 'Aarav Patel'}
              </span>
            </div>

            <div className="bg-white p-3 rounded-2xl shadow-sm border border-[#c3c6d7]/30 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[#007d55] text-[22px] mb-1">check_circle</span>
              <span className="text-[10px] font-bold text-[#434655] uppercase">Passing</span>
              <span className="text-base sm:text-lg font-bold text-[#131b2e] mt-0.5">100%</span>
              <span className="text-[11px] text-[#007d55] font-bold">All Cleared</span>
            </div>
          </div>

          {/* Subject Performance Breakdown Progress Bars */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#c3c6d7]/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#131b2e]">Subject Averages</h3>
              <span className="text-xs text-[#434655]">Out of 50 Marks</span>
            </div>

            <div className="space-y-3 pt-1">
              {/* Mathematics */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#131b2e] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#004ac6]"></span> Mathematics
                  </span>
                  <span className="font-bold text-[#131b2e]">41.5 / 50 (83.0%)</span>
                </div>
                <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#004ac6] h-full rounded-full transition-all duration-500" style={{ width: '83%' }}></div>
                </div>
              </div>

              {/* Science */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#131b2e] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#007d55]"></span> Science
                  </span>
                  <span className="font-bold text-[#131b2e]">43.1 / 50 (86.2%)</span>
                </div>
                <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#007d55] h-full rounded-full transition-all duration-500" style={{ width: '86.2%' }}></div>
                </div>
              </div>

              {/* English */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#131b2e] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4648d4]"></span> English
                  </span>
                  <span className="font-bold text-[#131b2e]">39.8 / 50 (79.6%)</span>
                </div>
                <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#4648d4] h-full rounded-full transition-all duration-500" style={{ width: '79.6%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* VIEW 3: Student Printable Report Card Preview */}
      {activeMarksView === 'report' && (
        <section className="space-y-4">
          {/* Student Selector pill bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {rankedStudents.slice(0, 8).map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStudentForReport(st.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStudentForReport === st.id
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
                type="button"
              >
                {st.name} ({st.rollNo})
              </button>
            ))}
          </div>

          {/* Printable Paper Card */}
          <div
            id="printable-report-sheet"
            className="bg-white rounded-3xl shadow-lg border border-[#c3c6d7]/40 p-5 space-y-4"
          >
            {/* School Header */}
            <div className="flex items-center justify-between pb-3 bg-[#f2f3ff] p-3 rounded-2xl border border-[#c3c6d7]/30">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-bold text-base shadow-sm">
                  DPS
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-bold text-[#131b2e] leading-tight">Delhi Public School</span>
                  <span className="text-xs text-[#434655]">DPS Sector 4 • Terminal Progress Card</span>
                </div>
              </div>
              <span className="px-3 py-1 bg-[#eaedff] text-[#131b2e] rounded-full text-xs font-bold">
                {selectedExam} (2024-25)
              </span>
            </div>

            {/* Student Bio Details Strip */}
            <div className="flex items-center gap-3.5 bg-[#faf8ff] p-3 rounded-2xl border border-[#c3c6d7]/30">
              <img
                className="w-14 h-14 rounded-2xl object-cover shadow-sm ring-2 ring-white shrink-0"
                alt={reportStudent.name}
                src={reportStudent.avatarUrl}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-[#131b2e] truncate">{reportStudent.name}</h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#6ffbbe]/40 text-[#002113] text-[11px] font-bold">
                    Rank #{reportStudent.computedRank}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-1 text-xs text-[#434655]">
                  <span>
                    Roll No: <strong className="text-[#131b2e] font-semibold">{reportStudent.rollNo}</strong>
                  </span>
                  <span>
                    Class: <strong className="text-[#131b2e] font-semibold">{reportStudent.classId}</strong>
                  </span>
                  <span>
                    Attendance:{' '}
                    <strong className="text-[#007d55] font-semibold">{reportStudent.attendancePercentage}%</strong>
                  </span>
                  <span>
                    Status:{' '}
                    <strong className="text-[#004ac6] font-semibold">Passed ({reportStudent.grade})</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Subject Breakdown Table */}
            <div className="rounded-2xl overflow-hidden border border-[#c3c6d7]/30 shadow-sm text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#f2f3ff] text-[#434655] font-bold uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Subject</th>
                    <th className="py-2.5 px-2 text-center">Max Marks</th>
                    <th className="py-2.5 px-2 text-center">Scored</th>
                    <th className="py-2.5 px-2 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c3c6d7]/20 text-[#131b2e]">
                  <tr className="hover:bg-[#f2f3ff]/40">
                    <td className="py-2.5 px-3 font-semibold">Mathematics</td>
                    <td className="py-2.5 px-2 text-center text-[#434655]">50</td>
                    <td className="py-2.5 px-2 text-center font-bold text-[#004ac6]">
                      {reportStudent.examMarks.math}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-[#6ffbbe]/40 text-[#002113] font-bold text-[10px]">
                        {reportStudent.examMarks.math >= 45 ? 'A+' : 'A'}
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#f2f3ff]/40">
                    <td className="py-2.5 px-3 font-semibold">Science</td>
                    <td className="py-2.5 px-2 text-center text-[#434655]">50</td>
                    <td className="py-2.5 px-2 text-center font-bold text-[#004ac6]">
                      {reportStudent.examMarks.science}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-[#6ffbbe]/40 text-[#002113] font-bold text-[10px]">
                        {reportStudent.examMarks.science >= 45 ? 'A+' : 'A'}
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#f2f3ff]/40">
                    <td className="py-2.5 px-3 font-semibold">English</td>
                    <td className="py-2.5 px-2 text-center text-[#434655]">50</td>
                    <td className="py-2.5 px-2 text-center font-bold text-[#004ac6]">
                      {reportStudent.examMarks.english}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-[#6ffbbe]/40 text-[#002113] font-bold text-[10px]">
                        {reportStudent.examMarks.english >= 45 ? 'A+' : 'A'}
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-[#eaedff] font-bold text-xs">
                    <td className="py-2.5 px-3">Aggregate Grand Total</td>
                    <td className="py-2.5 px-2 text-center">150</td>
                    <td className="py-2.5 px-2 text-center text-[#004ac6]">
                      {reportStudent.total} ({reportStudent.percentage}%)
                    </td>
                    <td className="py-2.5 px-2 text-center text-[#007d55]">{reportStudent.grade}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Teacher Remarks Box */}
            <div className="bg-[#f2f3ff] p-3 rounded-2xl space-y-1 border border-[#c3c6d7]/30">
              <div className="flex items-center gap-1.5 text-[#004ac6]">
                <span className="material-symbols-outlined text-[16px]">edit_note</span>
                <span className="text-[11px] uppercase font-bold tracking-wide">Class Teacher Remarks</span>
              </div>
              <p className="text-xs text-[#131b2e] italic">
                “Outstanding conceptual clarity and disciplined work ethic. Keep it up! Exemplary performance across all disciplines.”
              </p>
            </div>

            {/* Signatures & Authority Stamps */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex flex-col items-center bg-[#faf8ff] p-2.5 rounded-xl text-center border border-[#c3c6d7]/30">
                <span className="material-symbols-outlined text-[#737686] text-[28px] mb-1">draw</span>
                <span className="text-xs font-bold text-[#131b2e]">Ms. Priya Sen</span>
                <span className="text-[11px] text-[#434655]">Class Teacher</span>
              </div>
              <div className="flex flex-col items-center bg-[#faf8ff] p-2.5 rounded-xl text-center border border-[#c3c6d7]/30">
                <span className="material-symbols-outlined text-[#004ac6] text-[28px] mb-1">
                  approval_delegation
                </span>
                <span className="text-xs font-bold text-[#131b2e]">Dr. Rajesh Kumar</span>
                <span className="text-[11px] text-[#434655]">Principal</span>
              </div>
            </div>
          </div>

          {/* Action Buttons for Parent Distribution */}
          <div className="space-y-2">
            <button
              className="w-full h-11 bg-[#004ac6] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-transform hover:bg-[#2563eb]"
              onClick={handlePrint}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">print</span>
              <span>Print Report Card</span>
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                className="h-11 bg-[#007d55] text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform hover:opacity-95"
                onClick={() =>
                  sendWhatsAppNotice(
                    reportStudent.phone,
                    `Dear Parent, Progress Report for ${reportStudent.name} (${selectedExam}): Scored ${reportStudent.total}/150 (${reportStudent.percentage}% - Grade ${reportStudent.grade}), Rank #${reportStudent.computedRank}. DPS Sector 4.`
                  )
                }
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Send via WhatsApp</span>
              </button>
              <button
                className="h-11 bg-[#eaedff] text-[#131b2e] rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform hover:bg-[#dae2fd]"
                onClick={() => showToast(`Exported ${reportStudent.name} score card to Excel`)}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                <span>Export to Excel</span>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
