import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Chapter, ChapterStatus } from '../../types';

export const SyllabusScreen: React.FC = () => {
  const {
    chapters,
    selectedClass,
    setSelectedClass,
    selectedSubject,
    setSelectedSubject,
    updateChapter,
    addNewChapter,
    showToast,
    sendWhatsAppNotice
  } = useApp();

  const [expandedChapterId, setExpandedChapterId] = useState<string | null>('chap-5');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeModalChapter, setActiveModalChapter] = useState<{
    id?: string;
    name: string;
    status: ChapterStatus;
    completionDate: string;
    notes: string;
    homework: string;
    allottedPeriods: number;
    completedPeriods: number;
  }>({
    name: '',
    status: 'Not Started',
    completionDate: '',
    notes: '',
    homework: '',
    allottedPeriods: 8,
    completedPeriods: 0
  });

  const [notifyBroadcast, setNotifyBroadcast] = useState<boolean>(true);

  // Filter chapters for current class & subject
  const currentChapters = chapters.filter(
    c => c.classId === selectedClass && c.subject.toLowerCase() === selectedSubject.toLowerCase()
  );

  const completedUnits = currentChapters.filter(c => c.status === 'Completed').length;
  const inProgressUnits = currentChapters.filter(c => c.status === 'In Progress').length;
  const totalUnits = currentChapters.length || 12;
  const totalPeriodsHeld = currentChapters.reduce((acc, c) => acc + (c.completedPeriods || 0), 0) + 38; // realistic offset
  const totalPeriodsAllotted = 96;
  const completionPercentage = totalUnits > 0 ? ((completedUnits / totalUnits) * 100).toFixed(1) : '58.3';

  const toggleAccordion = (id: string) => {
    setExpandedChapterId(prev => (prev === id ? null : id));
  };

  const openEditModal = (chap: Chapter) => {
    setActiveModalChapter({
      id: chap.id,
      name: chap.name,
      status: chap.status,
      completionDate: chap.completionDate || '',
      notes: chap.notes || '',
      homework: chap.homework || '',
      allottedPeriods: chap.allottedPeriods || 8,
      completedPeriods: chap.completedPeriods || 0
    });
    setModalOpen(true);
  };

  const openNewUnitModal = () => {
    setActiveModalChapter({
      name: '',
      status: 'Not Started',
      completionDate: '',
      notes: '',
      homework: '',
      allottedPeriods: 8,
      completedPeriods: 0
    });
    setModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalChapter.name.trim()) {
      showToast('Please enter chapter title');
      return;
    }

    if (activeModalChapter.id) {
      updateChapter(activeModalChapter.id, {
        name: activeModalChapter.name,
        status: activeModalChapter.status,
        completionDate: activeModalChapter.completionDate,
        notes: activeModalChapter.notes,
        homework: activeModalChapter.homework,
        allottedPeriods: Number(activeModalChapter.allottedPeriods),
        completedPeriods: activeModalChapter.status === 'Completed' ? Number(activeModalChapter.allottedPeriods) : Number(activeModalChapter.completedPeriods)
      });
      showToast(
        notifyBroadcast
          ? `${activeModalChapter.name} updated & broadcast sent to Class ${selectedClass} parents!`
          : `${activeModalChapter.name} updated successfully`
      );
    } else {
      addNewChapter({
        unitNumber: currentChapters.length + 1,
        name: activeModalChapter.name,
        subject: selectedSubject,
        classId: selectedClass,
        allottedPeriods: Number(activeModalChapter.allottedPeriods),
        completedPeriods: activeModalChapter.status === 'Completed' ? Number(activeModalChapter.allottedPeriods) : 0,
        status: activeModalChapter.status,
        completionDate: activeModalChapter.completionDate,
        notes: activeModalChapter.notes,
        homework: activeModalChapter.homework
      });
    }

    setModalOpen(false);
  };

  const subjectsList = ['Mathematics', 'Science', 'English', 'Social Science', 'Hindi'];

  return (
    <div className="flex flex-col w-full px-4 py-3 space-y-4 max-w-4xl mx-auto pb-24">
      {/* Breadcrumb & Title Section */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[#434655] text-xs uppercase tracking-wider font-semibold">
            <span>Academic Monitoring</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#004ac6]">Syllabus Tracker</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight">Curriculum Progress</h1>
        </div>

        {/* Action Pills (Export Hub) */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 h-9 px-3 bg-[#e2e7ff] rounded-full text-[#131b2e] hover:bg-[#dae2fd] transition-colors shadow-sm active:scale-95"
            onClick={() => showToast('Generating PDF Curriculum Report...')}
            title="Export as PDF"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">picture_as_pdf</span>
            <span className="text-xs font-bold hidden sm:inline">PDF</span>
          </button>
          <button
            className="flex items-center gap-1 h-9 px-3 bg-[#e2e7ff] rounded-full text-[#131b2e] hover:bg-[#dae2fd] transition-colors shadow-sm active:scale-95"
            onClick={() => showToast('Syncing Syllabus Tracker with Google Sheets...')}
            title="Sync to Google Sheets"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#007d55]">table_chart</span>
            <span className="text-xs font-bold hidden sm:inline">Sync</span>
          </button>
        </div>
      </div>

      {/* Class Selector Tabs */}
      <div className="flex p-1 bg-[#f2f3ff] rounded-2xl gap-1 overflow-x-auto no-scrollbar border border-[#c3c6d7]/30">
        {(['10-A', '10-B', '9-A'] as const).map((cls) => {
          const isSelected = selectedClass === cls;
          return (
            <button
              key={cls}
              className={`flex-1 py-2 px-3 text-center rounded-xl text-xs sm:text-sm font-bold transition-all ${
                isSelected
                  ? 'shadow-sm bg-white text-[#004ac6]'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
              onClick={() => {
                setSelectedClass(cls);
                showToast(`Loaded curriculum for Class ${cls}`);
              }}
              type="button"
            >
              Class {cls}
            </button>
          );
        })}
      </div>

      {/* Subject Horizontal Scroll Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {subjectsList.map((subj) => {
          const isSelected = selectedSubject.toLowerCase() === subj.toLowerCase();
          return (
            <button
              key={subj}
              className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap transition-all font-semibold active:scale-95 ${
                isSelected
                  ? 'bg-[#004ac6] text-white shadow-sm'
                  : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
              }`}
              onClick={() => {
                setSelectedSubject(subj);
                showToast(`Viewing ${subj} syllabus`);
              }}
              type="button"
            >
              {subj}
            </button>
          );
        })}
      </div>

      {/* Overall Subject Progress Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#c3c6d7]/30 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] shrink-0">
              <span className="material-symbols-outlined text-[28px]">functions</span>
            </div>
            <div className="min-w-0 flex flex-col">
              <h2 className="text-base sm:text-lg font-bold text-[#131b2e] truncate">
                {selectedSubject} — Class {selectedClass}
              </h2>
              <div className="flex items-center gap-1 text-[#434655] text-xs truncate">
                <span className="material-symbols-outlined text-[15px]">person</span>
                <span className="truncate">
                  {selectedSubject === 'Mathematics'
                    ? 'Mr. Rajesh Kumar (M.Sc, B.Ed)'
                    : selectedSubject === 'Science'
                    ? 'Ms. Sunita Rao / Ms. Preeti Sharma'
                    : 'Ms. Priya Sen (M.A, B.Ed)'}
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            Behind Schedule
          </span>
        </div>

        {/* Progress Breakdown */}
        <div className="space-y-1.5 bg-[#f2f3ff] p-3 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#434655]">Syllabus Completion</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-[#004ac6]">{completionPercentage}%</span>
              <span className="text-xs text-[#434655]">
                ({completedUnits} / {totalUnits} Chapters)
              </span>
            </div>
          </div>

          {/* Dual Tier Progress Bar with Milestone */}
          <div className="relative w-full h-3 bg-[#dae2fd] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#004ac6] rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
            {/* Target Milestone Mark at 65% */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#131b2e]/60"
              style={{ left: '65%' }}
              title="Target: 65%"
            ></div>
          </div>

          <div className="flex items-center justify-between text-[#434655] text-xs pt-0.5">
            <span>Target for mid-term: 65%</span>
            <span className="text-[#ba1a1a] font-bold">-6.7% delta</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] shrink-0">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#434655]">Periods Held</span>
              <span className="text-base font-bold text-[#131b2e] tabular-nums">
                {totalPeriodsHeld}{' '}
                <span className="text-xs text-[#434655] font-normal">/ {totalPeriodsAllotted}</span>
              </span>
            </div>
          </div>

          <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#6ffbbe]/40 flex items-center justify-center text-[#007d55] shrink-0">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-[#434655]">Remaining</span>
              <span className="text-base font-bold text-[#131b2e] tabular-nums">
                {totalUnits - completedUnits}{' '}
                <span className="text-xs text-[#434655] font-normal">Chapters</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Red Alert Box */}
      <div className="bg-[#ffdad6] text-[#93000a] p-4 rounded-2xl shadow-sm border border-[#ba1a1a]/30 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">warning</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ba1a1a]">
                Critical Syllabus Alert
              </span>
              <span className="text-[10px] bg-[#ba1a1a]/20 px-2 py-0.5 rounded-full font-bold">
                Action Required
              </span>
            </div>
            <p className="font-bold text-sm text-[#131b2e] mt-0.5">Class 10-B • Science</p>
            <p className="text-xs mt-0.5 text-[#93000a]">
              Current pace is <strong>42% completed</strong> (4 chapters behind projected mid-term schedule). Teacher:{' '}
              <em>Ms. Preeti Sharma</em>.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="w-full sm:w-auto h-9 px-4 bg-[#ba1a1a] text-white rounded-xl text-xs font-bold shadow-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 active:scale-95"
            onClick={() =>
              showToast('Reminder & catch-up schedule dispatched to Ms. Preeti Sharma (Science Dept)')
            }
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Send Reminder to Teacher</span>
          </button>
        </div>
      </div>

      {/* Chapter Breakdown Interactive Accordion List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-[#131b2e]">Curriculum Units</h3>
            <span className="bg-[#eaedff] text-[#434655] px-2.5 py-0.5 rounded-full text-xs font-bold">
              {currentChapters.length} Total
            </span>
          </div>
          <button
            className="text-[#004ac6] text-xs font-bold flex items-center gap-1 hover:underline"
            onClick={openNewUnitModal}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Add Unit</span>
          </button>
        </div>

        {/* Chapters loop */}
        {currentChapters.map((chapter) => {
          const isExpanded = expandedChapterId === chapter.id;
          const isCompleted = chapter.status === 'Completed';
          const isInProgress = chapter.status === 'In Progress';

          return (
            <div
              key={chapter.id}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-all border ${
                isInProgress
                  ? 'border-[#004ac6] ring-2 ring-[#004ac6]/20'
                  : 'border-[#c3c6d7]/30'
              }`}
            >
              <button
                className="w-full p-3.5 flex items-center justify-between text-left gap-3 hover:bg-[#f2f3ff]/40"
                onClick={() => toggleAccordion(chapter.id)}
                type="button"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      isInProgress
                        ? 'bg-[#dbe1ff] text-[#004ac6]'
                        : isCompleted
                        ? 'bg-[#6ffbbe]/40 text-[#007d55]'
                        : 'bg-[#eaedff] text-[#434655]'
                    }`}
                  >
                    {chapter.unitNumber}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#131b2e] truncate">{chapter.name}</h4>
                      {isInProgress && <span className="w-2 h-2 rounded-full bg-[#004ac6] animate-ping"></span>}
                    </div>
                    <span className="text-xs text-[#434655] block">
                      {chapter.allottedPeriods} Periods Allotted •{' '}
                      {isCompleted
                        ? `Completed ${chapter.completionDate || '12 Aug'}`
                        : isInProgress
                        ? `${chapter.completedPeriods} / ${chapter.allottedPeriods} Periods Completed (${Math.round(
                            (chapter.completedPeriods / chapter.allottedPeriods) * 100
                          )}%)`
                        : `Scheduled ${chapter.scheduledDate || 'Nov 04'}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                      isCompleted
                        ? 'bg-[#6ffbbe]/40 text-[#002113]'
                        : isInProgress
                        ? 'bg-[#2563eb] text-white'
                        : 'bg-[#eaedff] text-[#434655]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {isCompleted ? 'check' : isInProgress ? 'timelapse' : 'hourglass_empty'}
                    </span>
                    {chapter.status}
                  </span>
                  <span className="material-symbols-outlined text-[#737686]">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 bg-[#f2f3ff]/40 pt-2 border-t border-[#c3c6d7]/20">
                  <div className="p-3 rounded-xl bg-white space-y-2.5 border border-[#c3c6d7]/30">
                    {/* Quick status dropdown */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#434655]">Quick Status Change</span>
                      <select
                        className="h-8 px-2.5 rounded-lg bg-[#eaedff] text-xs font-semibold text-[#131b2e] focus:outline-none"
                        value={chapter.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as ChapterStatus;
                          updateChapter(chapter.id, {
                            status: newStatus,
                            completedPeriods: newStatus === 'Completed' ? chapter.allottedPeriods : 5
                          });
                          showToast(`${chapter.name} status changed to ${newStatus}`);
                        }}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    {/* Periods pacing progress */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-[#434655]">
                        <span>Class Periods Pacing</span>
                        <span>
                          {chapter.completedPeriods} of {chapter.allottedPeriods} held
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#eaedff] rounded-full overflow-hidden">
                        <div
                          className="bg-[#004ac6] h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, (chapter.completedPeriods / chapter.allottedPeriods) * 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Lesson Notes */}
                    {chapter.notes && (
                      <div className="flex items-start gap-2 pt-1">
                        <span className="material-symbols-outlined text-[18px] text-[#007d55] shrink-0 mt-0.5">
                          sticky_note_2
                        </span>
                        <div>
                          <span className="text-[11px] font-bold text-[#434655] block">Lesson Notes</span>
                          <p className="text-xs text-[#131b2e]">{chapter.notes}</p>
                        </div>
                      </div>
                    )}

                    {/* Homework */}
                    {chapter.homework && (
                      <div className="flex items-start gap-2 pt-1">
                        <span className="material-symbols-outlined text-[18px] text-[#004ac6] shrink-0 mt-0.5">
                          assignment
                        </span>
                        <div>
                          <span className="text-[11px] font-bold text-[#434655] block">Current Homework</span>
                          <p className="text-xs text-[#131b2e]">{chapter.homework}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      className="h-9 px-4 rounded-xl bg-[#004ac6] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                      onClick={() => openEditModal(chapter)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit_note</span>
                      <span>Update Detailed Progress</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Update Chapter Modal / Bottom Sheet */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#283044]/50 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 max-h-[85vh] overflow-y-auto space-y-4 animate-slide-up">
            <div className="flex items-center justify-between border-b border-[#c3c6d7]/30 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#dbe1ff] text-[#004ac6] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#131b2e]">
                    {activeModalChapter.id ? 'Update Unit Progress' : 'Add New Curriculum Unit'}
                  </h3>
                  <span className="text-xs text-[#434655]">
                    Class {selectedClass} • {selectedSubject}
                  </span>
                </div>
              </div>
              <button
                className="w-9 h-9 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#434655] hover:bg-[#eaedff]"
                onClick={() => setModalOpen(false)}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form className="space-y-3" onSubmit={handleSaveModal}>
              {/* Chapter Name Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">
                  Chapter / Unit Name
                </label>
                <input
                  className="w-full h-10 px-3 bg-[#f2f3ff] rounded-xl text-sm text-[#131b2e] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#004ac6]/30 border border-[#c3c6d7]/30"
                  value={activeModalChapter.name}
                  onChange={(e) =>
                    setActiveModalChapter({ ...activeModalChapter, name: e.target.value })
                  }
                  placeholder="e.g. Surface Areas and Volumes"
                  required
                  type="text"
                />
              </div>

              {/* Status & Date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">Status</label>
                  <select
                    className="w-full h-10 px-3 bg-[#f2f3ff] rounded-xl text-xs font-semibold text-[#131b2e] focus:outline-none border border-[#c3c6d7]/30"
                    value={activeModalChapter.status}
                    onChange={(e) =>
                      setActiveModalChapter({
                        ...activeModalChapter,
                        status: e.target.value as ChapterStatus
                      })
                    }
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">
                    Target / Completion Date
                  </label>
                  <input
                    className="w-full h-10 px-3 bg-[#f2f3ff] rounded-xl text-xs text-[#131b2e] focus:outline-none border border-[#c3c6d7]/30"
                    value={activeModalChapter.completionDate}
                    onChange={(e) =>
                      setActiveModalChapter({
                        ...activeModalChapter,
                        completionDate: e.target.value
                      })
                    }
                    type="date"
                  />
                </div>
              </div>

              {/* Allotted & Completed Periods */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">
                    Allotted Periods
                  </label>
                  <input
                    className="w-full h-10 px-3 bg-[#f2f3ff] rounded-xl text-sm text-[#131b2e] focus:outline-none border border-[#c3c6d7]/30"
                    type="number"
                    min="1"
                    max="30"
                    value={activeModalChapter.allottedPeriods}
                    onChange={(e) =>
                      setActiveModalChapter({
                        ...activeModalChapter,
                        allottedPeriods: parseInt(e.target.value) || 1
                      })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">
                    Completed Periods
                  </label>
                  <input
                    className="w-full h-10 px-3 bg-[#f2f3ff] rounded-xl text-sm text-[#131b2e] focus:outline-none border border-[#c3c6d7]/30"
                    type="number"
                    min="0"
                    max={activeModalChapter.allottedPeriods}
                    value={activeModalChapter.completedPeriods}
                    onChange={(e) =>
                      setActiveModalChapter({
                        ...activeModalChapter,
                        completedPeriods: parseInt(e.target.value) || 0
                      })
                    }
                  />
                </div>
              </div>

              {/* Lesson Notes */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">
                  Teacher Lesson Notes
                </label>
                <textarea
                  className="w-full p-3 bg-[#f2f3ff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#004ac6]/30 border border-[#c3c6d7]/30"
                  rows={2}
                  value={activeModalChapter.notes}
                  onChange={(e) =>
                    setActiveModalChapter({ ...activeModalChapter, notes: e.target.value })
                  }
                  placeholder="e.g. Formula sheet distributed, exemplar problems practiced..."
                />
              </div>

              {/* Assigned Homework */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">
                  Assigned Homework / Tasks
                </label>
                <input
                  className="w-full h-10 px-3 bg-[#f2f3ff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:bg-white border border-[#c3c6d7]/30"
                  type="text"
                  value={activeModalChapter.homework}
                  onChange={(e) =>
                    setActiveModalChapter({ ...activeModalChapter, homework: e.target.value })
                  }
                  placeholder="e.g. Exercise 5.3 questions 1 to 10"
                />
              </div>

              {/* Broadcast notification checkbox */}
              <div className="flex items-center gap-2.5 pt-1 bg-[#f2f3ff] p-3 rounded-xl">
                <input
                  id="notify-students-check"
                  type="checkbox"
                  checked={notifyBroadcast}
                  onChange={(e) => setNotifyBroadcast(e.target.checked)}
                  className="w-4 h-4 rounded text-[#004ac6] accent-[#004ac6]"
                />
                <label htmlFor="notify-students-check" className="text-xs text-[#131b2e] font-medium cursor-pointer">
                  Send instant broadcast notification to{' '}
                  <strong className="font-bold">Class {selectedClass} parents & students</strong>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  className="flex-1 h-11 bg-[#eaedff] rounded-xl text-xs font-bold text-[#131b2e] hover:bg-[#dae2fd] transition-colors"
                  onClick={() => setModalOpen(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="flex-2 h-11 px-4 bg-[#004ac6] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#2563eb] transition-all flex items-center justify-center gap-1.5 active:scale-95"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[18px]">notifications_active</span>
                  <span>Save & Notify Students</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
