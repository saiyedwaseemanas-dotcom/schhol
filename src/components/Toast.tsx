import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast: React.FC = () => {
  const { toastMessage, showToast } = useApp();

  if (!toastMessage) return null;

  return (
    <div
      id="toast-container"
      className="fixed bottom-20 left-4 right-4 max-w-md mx-auto bg-[#283044] text-[#eef0ff] px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3 z-50 animate-bounce-short transition-all duration-300"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="material-symbols-outlined text-[20px] text-[#6ffbbe] shrink-0">check_circle</span>
        <span className="text-sm font-medium leading-snug truncate">{toastMessage}</span>
      </div>
      <span className="text-[11px] text-[#c3c6d7] shrink-0">Just now</span>
    </div>
  );
};
