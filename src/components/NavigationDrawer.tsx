import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';

export const NavigationDrawer: React.FC = () => {
  const { drawerOpen, setDrawerOpen, activeTab, setActiveTab, showToast, setShowApkModal } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: string; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'students', label: 'Students Directory', icon: 'group', badge: '40' },
    { id: 'teachers', label: 'Teachers Register', icon: 'badge', badge: '5' },
    { id: 'attendance', label: 'Take Attendance', icon: 'fact_check' },
    { id: 'syllabus', label: 'Syllabus Tracker', icon: 'menu_book' },
    { id: 'exams', label: 'Marks & Exams', icon: 'military_tech' },
    { id: 'sync', label: 'Google Sheets Sync', icon: 'sync_alt' },
    { id: 'reports', label: 'Reports Hub', icon: 'query_stats' },
  ];

  const handleNav = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-[#283044]/40 backdrop-blur-[2px] z-50 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer Aside */}
      <aside
        className={`fixed inset-y-0 left-0 w-[300px] max-w-[85vw] bg-white z-50 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.15)] transition-transform duration-300 ease-in-out flex flex-col pt-safe ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header inside drawer */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#c3c6d7]/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[18px] text-[#131b2e] tracking-tight">EduTrack</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#dbe1ff] text-[#004ac6] rounded">PRO</span>
            </div>
          </div>
          <button
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#434655] hover:bg-[#f2f3ff] transition-colors"
            onClick={() => setDrawerOpen(false)}
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Academic Session Card */}
        <div className="p-3">
          <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#c3c6d7]/40">
            <span className="text-[11px] font-bold text-[#434655] block uppercase tracking-wider mb-1">
              Academic Session
            </span>
            <div className="flex items-center justify-between text-sm text-[#131b2e]">
              <span className="flex items-center gap-1.5 font-semibold">
                <span className="material-symbols-outlined text-[18px] text-[#004ac6]">school</span>
                2024 - 2025 (Term 2)
              </span>
              <span className="material-symbols-outlined text-[#737686] text-[18px]">unfold_more</span>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto px-2 py-1 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center justify-between px-3 h-11 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#dbe1ff] text-[#004ac6] font-semibold shadow-sm'
                    : 'text-[#434655] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-[#004ac6]' : 'text-[#434655]'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-[#004ac6] text-white' : 'bg-[#eaedff] text-[#434655]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => {
                setDrawerOpen(false);
                setShowApkModal(true);
              }}
              className="w-full flex items-center justify-between px-3 h-11 rounded-xl text-sm font-semibold bg-[#6ffbbe]/25 text-[#002113] hover:bg-[#6ffbbe]/40 border border-[#007d55]/20 transition-all active:scale-95"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] text-[#007d55]">android</span>
                <span>Build Android APK</span>
              </div>
              <span className="text-[10px] bg-[#007d55] text-white px-2 py-0.5 rounded-full font-bold">
                CI/CD
              </span>
            </button>
          </div>
        </nav>

        {/* Profile Footer */}
        <div className="p-3 border-t border-[#c3c6d7]/30 pb-safe">
          <div className="flex items-center gap-3 p-2 bg-[#f2f3ff] rounded-xl">
            <img
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#004ac6]/20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRJXIZXZlPwjRjqIdOewHPrqmWVOfX_qSru1pJ4WirWTXPNZvY0S0m91pApGPNwpN-tpHLrm58mwrWDnLONhFcfRwAtzmf1p9S9nc5pAJxG6JtPo_AU0LJuOslTFgl-NtLxuV91O1tGpvnBNFm1Q6KKRqcqJKN4aetgHeKjZytR2h9fLqewHXToZhSvDAKKom9gG1OsVSX3ZwfuoMb1otyvXU900pGg1kofiNzM7c8PGt_ahQd-QbK"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-bold text-[#131b2e] truncate">Dr. Rajesh Kumar</span>
              <span className="text-xs text-[#434655] truncate">principal@dpssec4.edu</span>
            </div>
            <button
              aria-label="Sign out"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[#434655] hover:bg-[#dae2fd] hover:text-[#ba1a1a] transition-colors"
              onClick={() => showToast('Session locked. Re-authenticated with PIN')}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
