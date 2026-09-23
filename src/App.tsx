/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { NavigationDrawer } from './components/NavigationDrawer';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { AttendanceScreen } from './components/screens/AttendanceScreen';
import { SyllabusScreen } from './components/screens/SyllabusScreen';
import { MarksScreen } from './components/screens/MarksScreen';
import { SyncScreen } from './components/screens/SyncScreen';
import { StudentsDirectoryScreen } from './components/screens/StudentsDirectoryScreen';
import { TeachersDirectoryScreen } from './components/screens/TeachersDirectoryScreen';
import { ApkBuilderModal } from './components/ApkBuilderModal';

const MainContent: React.FC = () => {
  const { activeTab, showApkModal, setShowApkModal } = useApp();

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'attendance':
        return <AttendanceScreen />;
      case 'syllabus':
        return <SyllabusScreen />;
      case 'exams':
        return <MarksScreen />;
      case 'sync':
      case 'reports':
        return <SyncScreen />;
      case 'students':
        return <StudentsDirectoryScreen />;
      case 'teachers':
        return <TeachersDirectoryScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      <Header />
      <NavigationDrawer />
      
      <main className="flex-1 w-full pt-16 pb-20">
        {renderScreen()}
      </main>

      <ApkBuilderModal isOpen={showApkModal} onClose={() => setShowApkModal(false)} />
      <Toast />
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
