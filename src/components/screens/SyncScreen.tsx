import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const SyncScreen: React.FC = () => {
  const {
    isLiveSyncActive,
    setIsLiveSyncActive,
    lastSyncTime,
    triggerManualSync,
    isSyncing,
    sheetUrl,
    setSheetUrl,
    showToast,
    selectedClass,
    setSelectedClass,
    setShowApkModal
  } = useApp();

  const [activeSyncTab, setActiveSyncTab] = useState<'import' | 'export'>('import');
  const [importingProgress, setImportingProgress] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [showWebhookLog, setShowWebhookLog] = useState<boolean>(false);
  const [webhookLogTime, setWebhookLogTime] = useState<string>('32ms');

  const [columnMapA, setColumnMapA] = useState('Roll No');
  const [columnMapB, setColumnMapB] = useState('Student Name');
  const [columnMapC, setColumnMapC] = useState('Parent WhatsApp');
  const [columnMapD, setColumnMapD] = useState('Class & Section');

  const handleStartImport = () => {
    setImportingProgress(0);
    const interval = setInterval(() => {
      setImportingProgress((prev) => {
        if (prev === null) return 25;
        const next = prev + 25;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setImportingProgress(null);
            showToast('40 Student records successfully validated and imported from Google Sheet!');
          }, 400);
          return 100;
        }
        return next;
      });
    }, 200);
  };

  const handleExecuteExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast('Students, Attendance, Marks & Syllabus exported to Google Drive (4 Worksheets)!');
    }, 1300);
  };

  const handleTestPing = () => {
    setShowWebhookLog(true);
    setWebhookLogTime(`${Math.floor(Math.random() * 20) + 24}ms`);
    showToast('Test Ping delivered! 200 OK Bi-directional Webhook Active');
  };

  const handlePasteClipboard = () => {
    setSheetUrl('https://docs.google.com/spreadsheets/d/1X9_EDUTrack_DPS4_Roster_2024/edit#gid=0');
    showToast('Pasted spreadsheet URL from clipboard');
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-4 py-3 max-w-4xl mx-auto pb-24">
      {/* Top Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] uppercase tracking-wider text-[#004ac6] font-bold">
            Integrations & Analytics
          </span>
          <span className="w-1 h-1 rounded-full bg-[#c3c6d7]"></span>
          <span className="text-[11px] text-[#434655] font-medium">Cloud Data Pipeline</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight">Sheets Sync & Reports</h1>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6ffbbe] text-[#002113] text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#007d55] animate-pulse"></span>
            v2.4 Active
          </span>
        </div>
      </div>

      {/* Master Google Sheet Connected Card */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#c3c6d7]/30 relative overflow-hidden space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-[#6ffbbe]/30 flex items-center justify-center text-[#007d55] shrink-0">
              <span className="material-symbols-outlined text-[24px]">table_chart</span>
            </div>
            <div className="min-w-0 flex flex-col">
              <span className="text-xs text-[#007d55] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#007d55] animate-ping"></span>
                Master Google Sheet Connected
              </span>
              <span className="font-bold text-sm sm:text-base text-[#131b2e] truncate max-w-[260px]">
                EduTrack_Pro_Master_Database_2024.xlsx
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isLiveSyncActive}
              onChange={(e) => {
                setIsLiveSyncActive(e.target.checked);
                showToast(
                  e.target.checked
                    ? 'Live two-way real-time listener active'
                    : 'Two-way sync paused. Offline mode on'
                );
              }}
            />
            <div className="w-11 h-6 bg-[#dae2fd] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563eb]"></div>
          </label>
        </div>

        {/* Auto Sync Pulse Bar */}
        <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[18px] text-[#434655] shrink-0">update</span>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-[#434655] font-medium truncate">Auto-Sync Pulse</span>
              <span className="text-xs font-bold text-[#131b2e] truncate">{lastSyncTime}</span>
            </div>
          </div>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eaedff] text-[#004ac6] text-xs font-bold active:scale-95 transition-all shadow-sm hover:bg-[#dae2fd]"
            onClick={triggerManualSync}
            disabled={isSyncing}
            type="button"
          >
            <span className={`material-symbols-outlined text-[16px] ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
            <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[#434655] text-xs px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-[#007d55]">lock_reset</span>
            <span>Bi-directional Webhook Active</span>
          </div>
          <span className="text-xs text-[#004ac6] font-bold">SSL 256-bit</span>
        </div>
      </section>

      {/* Import / Export Tabs */}
      <section className="flex flex-col space-y-3">
        <div className="flex rounded-2xl bg-[#eaedff] p-1 shadow-inner">
          <button
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSyncTab === 'import'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveSyncTab('import')}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">cloud_download</span>
            <span>Import Records</span>
          </button>
          <button
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSyncTab === 'export'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
            onClick={() => setActiveSyncTab('export')}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
            <span>Multi-Tab Export</span>
          </button>
        </div>

        {/* Tab 1: Import Records */}
        {activeSyncTab === 'import' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#c3c6d7]/30 space-y-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#004ac6] text-[18px]">link</span>
                Google Sheet Shareable URL
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    className="w-full h-11 pl-3 pr-8 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30 border border-[#c3c6d7]/30 truncate font-mono"
                    type="text"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                  />
                  {sheetUrl && (
                    <button
                      className="absolute right-2.5 top-3 text-[#737686] hover:text-[#131b2e]"
                      onClick={() => setSheetUrl('')}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">cancel</span>
                    </button>
                  )}
                </div>
                <button
                  className="h-11 px-3 bg-[#eaedff] rounded-xl text-[#131b2e] text-xs font-bold flex items-center gap-1 shrink-0 active:scale-95 transition-all hover:bg-[#dae2fd]"
                  onClick={handlePasteClipboard}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#004ac6]">content_paste</span>
                  <span>Paste</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-[#434655]">
                Detected Sheet: <strong className="text-[#131b2e] font-bold">Sheet1 (Students_Roster)</strong>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#e1e0ff] text-[#07006c] text-[11px] font-bold">
                4 Columns Valid
              </span>
            </div>

            {/* Interactive Column Mapping */}
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#434655]">
                Interactive Column Mapping
              </span>

              <div className="flex flex-col gap-2">
                {/* Col A */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c3c6d7]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#dbe1ff] flex items-center justify-center text-xs font-bold text-[#004ac6]">
                      A
                    </span>
                    <span className="text-xs font-medium text-[#131b2e]">Roll_Number</span>
                  </div>
                  <span className="material-symbols-outlined text-[#737686] text-[16px]">arrow_forward</span>
                  <select
                    className="h-8 px-2.5 rounded-lg bg-white text-[#131b2e] text-xs font-semibold focus:outline-none shadow-sm border border-[#c3c6d7]/30"
                    value={columnMapA}
                    onChange={(e) => setColumnMapA(e.target.value)}
                  >
                    <option value="Roll No">Roll No</option>
                    <option value="Admission ID">Admission ID</option>
                    <option value="Do Not Map">Do Not Map</option>
                  </select>
                </div>

                {/* Col B */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c3c6d7]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#dbe1ff] flex items-center justify-center text-xs font-bold text-[#004ac6]">
                      B
                    </span>
                    <span className="text-xs font-medium text-[#131b2e]">Full_Name</span>
                  </div>
                  <span className="material-symbols-outlined text-[#737686] text-[16px]">arrow_forward</span>
                  <select
                    className="h-8 px-2.5 rounded-lg bg-white text-[#131b2e] text-xs font-semibold focus:outline-none shadow-sm border border-[#c3c6d7]/30"
                    value={columnMapB}
                    onChange={(e) => setColumnMapB(e.target.value)}
                  >
                    <option value="Student Name">Student Name</option>
                    <option value="First Name">First Name</option>
                    <option value="Parent Name">Parent Name</option>
                  </select>
                </div>

                {/* Col C */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c3c6d7]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#dbe1ff] flex items-center justify-center text-xs font-bold text-[#004ac6]">
                      C
                    </span>
                    <span className="text-xs font-medium text-[#131b2e]">WhatsApp_No</span>
                  </div>
                  <span className="material-symbols-outlined text-[#737686] text-[16px]">arrow_forward</span>
                  <select
                    className="h-8 px-2.5 rounded-lg bg-white text-[#131b2e] text-xs font-semibold focus:outline-none shadow-sm border border-[#c3c6d7]/30"
                    value={columnMapC}
                    onChange={(e) => setColumnMapC(e.target.value)}
                  >
                    <option value="Parent WhatsApp">Parent WhatsApp</option>
                    <option value="Emergency Contact">Emergency Contact</option>
                    <option value="Alternate Mobile">Alternate Mobile</option>
                  </select>
                </div>

                {/* Col D */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c3c6d7]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#dbe1ff] flex items-center justify-center text-xs font-bold text-[#004ac6]">
                      D
                    </span>
                    <span className="text-xs font-medium text-[#131b2e]">Class_Sec</span>
                  </div>
                  <span className="material-symbols-outlined text-[#737686] text-[16px]">arrow_forward</span>
                  <select
                    className="h-8 px-2.5 rounded-lg bg-white text-[#131b2e] text-xs font-semibold focus:outline-none shadow-sm border border-[#c3c6d7]/30"
                    value={columnMapD}
                    onChange={(e) => setColumnMapD(e.target.value)}
                  >
                    <option value="Class & Section">Class & Section</option>
                    <option value="Grade Level">Grade Level</option>
                    <option value="Section Only">Section Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Import Progress Bar */}
            {importingProgress !== null && (
              <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-[#dbe1ff]/40 border border-[#004ac6]/20 animate-fade-in">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#00174b] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#004ac6] animate-spin">
                      progress_activity
                    </span>
                    Validating schema & formatting...
                  </span>
                  <span className="font-bold text-[#004ac6]">{importingProgress}%</span>
                </div>
                <div className="w-full bg-[#dae2fd] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#004ac6] h-full transition-all duration-300"
                    style={{ width: `${importingProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <button
              className="w-full h-11 bg-[#004ac6] text-white text-xs sm:text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all hover:bg-[#2563eb] disabled:opacity-50"
              onClick={handleStartImport}
              disabled={importingProgress !== null}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">cloud_download</span>
              <span>Validate & Import 40 Records</span>
            </button>
          </div>
        )}

        {/* Tab 2: Multi-Tab Export */}
        {activeSyncTab === 'export' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#c3c6d7]/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#131b2e]">Destination Drive Sync</h3>
                <span className="text-xs text-[#434655]">4 Worksheets configured for multi-tab write</span>
              </div>
              <span className="material-symbols-outlined text-[#004ac6] text-[28px]">drive_folder_upload</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#c3c6d7]/30 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="w-7 h-7 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] font-bold text-xs">
                    #1
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#007d55]"></span>
                </div>
                <div className="mt-2">
                  <span className="font-bold text-sm text-[#131b2e] block truncate">Students</span>
                  <span className="text-xs text-[#434655] block">40 rows active</span>
                  <span className="text-[10px] text-[#007d55] font-semibold">Updated 9m ago</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#c3c6d7]/30 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="w-7 h-7 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] font-bold text-xs">
                    #2
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#007d55]"></span>
                </div>
                <div className="mt-2">
                  <span className="font-bold text-sm text-[#131b2e] block truncate">Attendance_Oct</span>
                  <span className="text-xs text-[#434655] block">P / A / L / HD Logs</span>
                  <span className="text-[10px] text-[#007d55] font-semibold">Daily register synced</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#c3c6d7]/30 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="w-7 h-7 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] font-bold text-xs">
                    #3
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#007d55]"></span>
                </div>
                <div className="mt-2">
                  <span className="font-bold text-sm text-[#131b2e] block truncate">Marks_UT2</span>
                  <span className="text-xs text-[#434655] block">Subject Scores & GPA</span>
                  <span className="text-[10px] text-[#007d55] font-semibold">Term 2 Exam ready</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#c3c6d7]/30 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="w-7 h-7 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] font-bold text-xs">
                    #4
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#007d55]"></span>
                </div>
                <div className="mt-2">
                  <span className="font-bold text-sm text-[#131b2e] block truncate">Syllabus_Status</span>
                  <span className="text-xs text-[#434655] block">Chapter Milestones</span>
                  <span className="text-[10px] text-[#007d55] font-semibold">68.5% verified</span>
                </div>
              </div>
            </div>

            <button
              className="w-full h-11 bg-[#004ac6] text-white text-xs sm:text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all hover:bg-[#2563eb]"
              onClick={handleExecuteExport}
              disabled={isExporting}
              type="button"
            >
              <span className={`material-symbols-outlined text-[20px] ${isExporting ? 'animate-spin' : ''}`}>
                file_upload
              </span>
              <span>{isExporting ? 'Uploading 4 Worksheets...' : 'Export All Tabs to Google Drive'}</span>
            </button>
          </div>
        )}
      </section>

      {/* Unified Reports Hub */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#c3c6d7]/30 space-y-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#004ac6] text-[22px]">analytics</span>
              <h3 className="font-bold text-base text-[#131b2e]">Unified Reports Hub</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#004ac6] text-xs font-bold">
              360° View
            </span>
          </div>
          <p className="text-xs text-[#434655]">
            Consolidated operational telemetry combining attendance registers, Unit Test scores, and curriculum pacing.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#434655]">Academic Class</label>
            <select
              className="h-10 px-2.5 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold focus:outline-none border border-[#c3c6d7]/30"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value as any);
                showToast(`Loaded telemetry report for Class ${e.target.value}`);
              }}
            >
              <option value="10-A">Class 10-A (General)</option>
              <option value="10-B">Class 10-B (Advanced)</option>
              <option value="9-A">Class 9-A (Foundation)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#434655]">Report Type</label>
            <select className="h-10 px-2.5 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold focus:outline-none border border-[#c3c6d7]/30">
              <option>Combined 360° Matrix</option>
              <option>Attendance Defaulter Brief</option>
              <option>CBSE Marks Audit Sheet</option>
            </select>
          </div>
        </div>

        {/* Telemetry Snapshot Box */}
        <div className="bg-[#f2f3ff] rounded-2xl p-3.5 space-y-3 border border-[#c3c6d7]/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#131b2e] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#004ac6] text-[18px]">speed</span>
              Class Telemetry Snapshot
            </span>
            <span className="text-xs text-[#434655] font-semibold">N=40 Enrolled</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-white shadow-sm border border-[#c3c6d7]/20 flex flex-col justify-between">
              <span className="text-xs text-[#434655] font-semibold">Class Attendance</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-[#007d55]">94.2%</span>
                <span className="material-symbols-outlined text-[14px] text-[#007d55]">trending_up</span>
              </div>
              <span className="text-[10px] text-[#434655]">Target: &gt;85.0%</span>
            </div>

            <div className="p-3 rounded-xl bg-white shadow-sm border border-[#c3c6d7]/20 flex flex-col justify-between">
              <span className="text-xs text-[#434655] font-semibold">UT-2 Pass Rate</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-[#004ac6]">100%</span>
                <span className="text-xs text-[#434655] font-medium">Avg: 83.2%</span>
              </div>
              <span className="text-[10px] text-[#434655]">Top: Science (91%)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white shadow-sm border border-[#c3c6d7]/20 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#131b2e] font-semibold">Syllabus Pacing Status</span>
              <span className="font-bold text-[#131b2e]">68.5% Complete</span>
            </div>
            <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
              <div className="bg-[#004ac6] h-full rounded-full" style={{ width: '68.5%' }}></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#434655]">
              <span>Term 2 Milestone: 70%</span>
              <span className="text-[#ba1a1a] font-bold">1.5% deficit</span>
            </div>
          </div>

          {/* Action Flags */}
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-[#434655] uppercase tracking-wider">
              Action Flags (Requires Sign-off)
            </span>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/30">
              <span className="material-symbols-outlined text-[18px] text-[#ba1a1a] shrink-0">warning</span>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold block truncate">2 Attendance Defaulters Identified</span>
                <span className="text-[11px] block text-[#93000a]/90">Roll 08 (64%), Roll 29 (69%) under 75% limit</span>
              </div>
              <button
                className="px-2.5 py-1 bg-white text-[#ba1a1a] text-xs font-bold rounded-lg shadow-sm shrink-0 active:scale-95"
                onClick={() => showToast('SMS & WhatsApp reminders queued for Roll 08 & 29')}
                type="button"
              >
                Alert
              </button>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#e1e0ff] text-[#07006c] border border-[#4648d4]/30">
              <span className="material-symbols-outlined text-[18px] text-[#4648d4] shrink-0">pending_actions</span>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold block truncate">1 Subject Syllabus Lag</span>
                <span className="text-[11px] block text-[#07006c]/90">Physics Ch. 4 is 2 lessons behind</span>
              </div>
              <button
                className="px-2.5 py-1 bg-white text-[#4648d4] text-xs font-bold rounded-lg shadow-sm shrink-0 active:scale-95"
                onClick={() => showToast('Remedy plan dispatched to Physics coordinator')}
                type="button"
              >
                Remedy
              </button>
            </div>
          </div>
        </div>

        {/* Export Channels */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs font-bold text-[#434655]">One-Tap Multi-Channel Export</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              className="h-12 bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-bold rounded-2xl flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-sm"
              onClick={() => showToast('PDF Report generated and downloaded')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#ba1a1a]">picture_as_pdf</span>
              <span>Download PDF</span>
            </button>
            <button
              className="h-12 bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-bold rounded-2xl flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-sm"
              onClick={() => showToast('Pushed 360° Matrix to Google Drive Sheets')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#007d55]">sheets_rtl</span>
              <span>To Sheets</span>
            </button>
            <button
              className="h-12 bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-bold rounded-2xl flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-sm"
              onClick={() => showToast('Dispatched summary to Parents Broadcast Group')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-[#007d55]">chat</span>
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* GitHub Actions Android APK Builder */}
      <section className="bg-gradient-to-br from-[#004ac6] to-[#1e3a8a] rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-[24px]">android</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base">GitHub APK Auto-Build</span>
                <span className="px-2 py-0.5 rounded-full bg-[#6ffbbe] text-[#002113] text-[10px] font-bold">
                  CI/CD Ready
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                Push commits to GitHub to automatically compile & download <code className="bg-black/20 px-1 py-0.2 rounded font-mono">.apk</code> binaries.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowApkModal(true)}
            className="px-3.5 py-2 bg-white text-[#004ac6] font-bold text-xs rounded-xl shadow hover:bg-[#eaedff] active:scale-95 transition-all shrink-0 flex items-center gap-1.5"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
            <span>View Setup</span>
          </button>
        </div>
      </section>

      {/* API Webhook Documentation */}
      <section className="bg-[#f2f3ff] rounded-2xl p-4 shadow-sm border border-[#c3c6d7]/30">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#131b2e] shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px]">terminal</span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-[#131b2e]">API Webhook Documentation</h4>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#dae2fd] text-[#004ac6] font-bold">
                POST /v1/sync
              </span>
            </div>
            <p className="text-xs text-[#434655] leading-relaxed">
              Google Apps Script triggers an HTTPS endpoint whenever classroom spreadsheets are modified. EduTrack maps payloads in real time, computes weighted averages, and dispatches instant parent push receipts.
            </p>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#007d55] animate-ping"></span>
                <span className="text-xs font-semibold text-[#131b2e]">Sandbox Mock Webhook Listener</span>
              </div>
              <button
                className="px-3 py-1.5 rounded-xl bg-[#004ac6] text-white text-xs font-bold flex items-center gap-1 active:scale-95 transition-all hover:bg-[#2563eb]"
                onClick={handleTestPing}
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">send</span>
                <span>Fire Test Ping</span>
              </button>
            </div>

            {showWebhookLog && (
              <div className="p-3 rounded-xl bg-white font-mono text-[11px] text-[#434655] mt-2 border-l-4 border-[#007d55] shadow-sm animate-fade-in">
                <code>
                  Status: 200 OK | Handshake payload parsed in {webhookLogTime}. Event: [onEdit:Students_Roster]
                </code>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
