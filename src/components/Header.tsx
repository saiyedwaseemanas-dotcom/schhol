import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { setDrawerOpen, activeRole, setActiveRole, showToast, setShowApkModal } = useApp();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* Left: Drawer Toggle & Brand */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Open menu"
            className="w-10 h-10 flex items-center justify-center rounded-lg text-[#131b2e] hover:bg-[#f2f3ff] transition-colors active:scale-95"
            onClick={() => setDrawerOpen(true)}
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center text-white shadow-sm">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[17px] text-[#131b2e] leading-tight tracking-tight">EduTrack</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-[#dbe1ff] text-[#004ac6] rounded tracking-wide">PRO</span>
              </div>
              <span className="text-[11px] leading-3 text-[#434655] font-medium">DPS, Sector 4</span>
            </div>
          </div>
        </div>

        {/* Right: APK Builder Button, Role Dropdown, Notifications, Profile */}
        <div className="flex items-center gap-2">
          {/* GitHub APK Builder Button */}
          <button
            onClick={() => setShowApkModal(true)}
            className="hidden sm:flex items-center gap-1.5 h-8 px-2.5 bg-[#6ffbbe]/30 text-[#002113] hover:bg-[#6ffbbe]/50 border border-[#007d55]/30 rounded-full text-xs font-bold transition-all active:scale-95 shadow-xs"
            type="button"
            title="Build APK via GitHub Actions"
          >
            <span className="material-symbols-outlined text-[16px] text-[#007d55]">android</span>
            <span>Build APK</span>
          </button>
          {/* Role Switcher */}
          <div className="relative">
            <button
              className="flex items-center gap-1.5 h-8 pl-2.5 pr-2 bg-[#eaedff] rounded-full text-[#131b2e] hover:bg-[#dae2fd] transition-colors text-xs font-semibold"
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              type="button"
            >
              <span className="w-2 h-2 rounded-full bg-[#007d55] animate-pulse"></span>
              <span>{activeRole}</span>
              <span className="material-symbols-outlined text-[16px] text-[#434655]">arrow_drop_down</span>
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-[#c3c6d7]/30 py-1 z-50 text-xs">
                {(['Admin', 'Principal', 'Teacher'] as const).map((role) => (
                  <button
                    key={role}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#f2f3ff] transition-colors ${
                      activeRole === role ? 'font-bold text-[#004ac6] bg-[#eaedff]/60' : 'text-[#131b2e]'
                    }`}
                    onClick={() => {
                      setActiveRole(role);
                      setShowRoleDropdown(false);
                      showToast(`Switched active profile to ${role}`);
                    }}
                  >
                    <span>{role} Mode</span>
                    {activeRole === role && <span className="material-symbols-outlined text-[16px]">check</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              aria-label="Notifications"
              className="relative w-9 h-9 flex items-center justify-center rounded-full text-[#434655] hover:bg-[#f2f3ff] transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[#c3c6d7]/30 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#c3c6d7]/30">
                  <span className="font-semibold text-xs uppercase tracking-wider text-[#131b2e]">Urgent Notifications</span>
                  <span className="text-[10px] bg-[#ffdad6] text-[#ba1a1a] px-2 py-0.5 rounded-full font-bold">2 Action Items</span>
                </div>
                <div className="space-y-2 py-2">
                  <div className="p-2 bg-[#ffdad6]/40 rounded-xl flex items-start gap-2 text-xs">
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] shrink-0 mt-0.5">warning</span>
                    <div>
                      <span className="font-semibold text-[#131b2e] block">2 Attendance Defaulters</span>
                      <span className="text-[11px] text-[#434655]">Kabir Mehta (71.4%) & Riya Sen (68.0%)</span>
                    </div>
                  </div>
                  <div className="p-2 bg-[#e1e0ff]/40 rounded-xl flex items-start gap-2 text-xs">
                    <span className="material-symbols-outlined text-[#4648d4] text-[18px] shrink-0 mt-0.5">pending_actions</span>
                    <div>
                      <span className="font-semibold text-[#131b2e] block">Physics Chapter Delay</span>
                      <span className="text-[11px] text-[#434655]">10-B Magnetic Effects 12 days pending</span>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full py-1.5 text-center text-xs font-semibold text-[#004ac6] hover:underline"
                  onClick={() => setShowNotifications(false)}
                >
                  Dismiss all notifications
                </button>
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="flex items-center">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#004ac6]/20 cursor-pointer shadow-sm"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHjnfW0yD4P0JPB3pCJ8PvHI9VdRb2yr8Uaoib1V1D0SD7h-f1dSFY2rMXl9PP58IK3jJXKMqNrYLuXFSvhtN82V_qaE3gNo89VF9f9JuAuoDjW2OORZ1NI3KkSPLZ05a3hTO6XuiqShgR-PLjxuBOd5a16_0RtINVa0xAbUuhvnKk-UkbEEN2UZFFY7Dluql-5eL0SGWewPuxfBKozgrYjH8eTqaryMyeRomqQ_-p_6F8LHOlQgau"
              onClick={() => showToast('Signed in as Dr. Anita Roy (Principal)')}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
