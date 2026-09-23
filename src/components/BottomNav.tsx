import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'attendance', label: 'Attendance', icon: 'event_available' },
    { id: 'syllabus', label: 'Syllabus', icon: 'menu_book' },
    { id: 'exams', label: 'Exams', icon: 'workspace_premium' },
    { id: 'sync', label: 'Sync', icon: 'sync_saved_locally' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.06)] border-t border-[#c3c6d7]/30 bottom-nav">
      <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-12 rounded-xl transition-all ${
                isActive
                  ? 'text-[#004ac6] font-bold bg-[#eaedff] shadow-sm'
                  : 'text-[#434655] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              <span className={`material-symbols-outlined text-[22px] ${isActive ? 'fill text-[#004ac6]' : ''}`}>
                {tab.icon}
              </span>
              <span className="text-[11px] font-semibold tracking-tight mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
