import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ApkBuilderModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'github' | 'local' | 'config'>('github');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const gitCommands = `# 1. Initialize and add all files
git init
git add .
git commit -m "feat: initialize EduTrack Pro with Android APK CI/CD"

# 2. Link your GitHub repository
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/edutrack-pro.git

# 3. Push to GitHub (Automated APK build will start immediately!)
git push -u origin main`;

  const localCommands = `# 1. Build the web app assets
npm run build

# 2. Sync with Android Capacitor project
npx cap sync android

# 3. Open in Android Studio or compile debug APK directly
cd android
./gradlew assembleDebug

# Your APK will be generated at:
# android/app/build/outputs/apk/debug/app-debug.apk`;

  const workflowYaml = `name: Build Android APK

on:
  push:
    branches: [ "main", "master" ]
  workflow_dispatch: # Allows manual trigger from GitHub Actions

permissions:
  contents: write

jobs:
  build-apk:
    name: Build & Package Android APK
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Setup Java JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Setup Android SDK
        uses: android-actions/setup-android@v3

      - name: Install Dependencies
        run: npm install

      - name: Build Web Application
        run: npm run build

      - name: Initialize & Sync Capacitor Android
        run: |
          if [ ! -d "android" ]; then
            npx cap add android
          fi
          npx cap sync android

      - name: Make Gradle Executable & Build Debug APK
        run: |
          cd android
          chmod +x gradlew
          ./gradlew assembleDebug

      - name: Find & Rename APK
        run: |
          mkdir -p build-output
          cp android/app/build/outputs/apk/debug/app-debug.apk build-output/EduTrack-Pro-debug.apk

      - name: Upload Debug APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: EduTrack-Pro-Android-APK
          path: build-output/EduTrack-Pro-debug.apk
          retention-days: 30

      - name: Create GitHub Release
        if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master')
        uses: softprops/action-gh-release@v2
        with:
          tag_name: v1.0.\${{ github.run_number }}
          name: EduTrack Pro Release v1.0.\${{ github.run_number }}
          files: build-output/EduTrack-Pro-debug.apk
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#c3c6d7]/40 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm shadow-inner">
              <span className="material-symbols-outlined text-[24px]">android</span>
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">GitHub APK Builder</h2>
              <p className="text-xs text-white/80">Continuous APK Build & Release Workflow</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="flex border-b border-[#eaedff] bg-[#faf8ff] px-4 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('github')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'github'
                ? 'bg-white text-[#004ac6] border-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e] border-transparent'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
            <span>GitHub Actions Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('local')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'local'
                ? 'bg-white text-[#004ac6] border-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e] border-transparent'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">terminal</span>
            <span>Local Build (CLI)</span>
          </button>

          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'config'
                ? 'bg-white text-[#004ac6] border-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e] border-transparent'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">settings</span>
            <span>App Config</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs text-[#131b2e] flex-1">
          {activeTab === 'github' && (
            <div className="space-y-4">
              {/* Ready status */}
              <div className="bg-[#6ffbbe]/20 border border-[#007d55]/30 rounded-2xl p-3.5 flex items-start gap-3">
                <span className="material-symbols-outlined text-[#007d55] text-[22px] shrink-0 mt-0.5">check_circle</span>
                <div className="space-y-1">
                  <p className="font-bold text-sm text-[#002113]">Workflow File Pre-Configured!</p>
                  <p className="text-[#002113]/80 leading-relaxed">
                    We created <code className="bg-white/80 px-1.5 py-0.5 rounded font-mono font-bold text-[#004ac6]">.github/workflows/build-apk.yml</code> in your repository. When you push your code to GitHub, an Android debug APK will automatically compile and be made available for download!
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-[#131b2e] flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#004ac6] text-white flex items-center justify-center text-[10px]">1</span>
                  Push to your GitHub Repository
                </h3>
                
                <div className="relative bg-[#131b2e] text-slate-100 p-3.5 rounded-2xl font-mono text-[11px] leading-relaxed">
                  <button
                    onClick={() => copyToClipboard(gitCommands, 'Git Commands')}
                    className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[10px] font-sans font-bold flex items-center gap-1 transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {copiedSection === 'Git Commands' ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedSection === 'Git Commands' ? 'Copied' : 'Copy Commands'}</span>
                  </button>
                  <pre className="overflow-x-auto pr-24 whitespace-pre">{gitCommands}</pre>
                </div>

                <h3 className="font-bold text-sm text-[#131b2e] flex items-center gap-1.5 pt-2">
                  <span className="w-5 h-5 rounded-full bg-[#004ac6] text-white flex items-center justify-center text-[10px]">2</span>
                  Download your Android APK from GitHub
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="bg-[#f2f3ff] p-3 rounded-2xl border border-[#c3c6d7]/30 space-y-1">
                    <span className="font-bold text-[#004ac6] block flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">folder_zip</span>
                      Option A: Actions Artifact
                    </span>
                    <p className="text-[#434655] text-[11px]">
                      Open your repo &rarr; <strong>Actions</strong> tab &rarr; Click latest workflow run &rarr; Scroll down to <strong>Artifacts</strong> &rarr; Click <code className="bg-white px-1 rounded">EduTrack-Pro-Android-APK</code>.
                    </p>
                  </div>

                  <div className="bg-[#f2f3ff] p-3 rounded-2xl border border-[#c3c6d7]/30 space-y-1">
                    <span className="font-bold text-[#007d55] block flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">new_releases</span>
                      Option B: GitHub Releases
                    </span>
                    <p className="text-[#434655] text-[11px]">
                      Upon pushing to <code className="bg-white px-1 rounded">main</code>, a GitHub Release is automatically published with the attached direct <code className="bg-white px-1 rounded">.apk</code> installer!
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-bold text-xs text-[#434655]">View Workflow Code (.github/workflows/build-apk.yml)</span>
                    <button
                      onClick={() => copyToClipboard(workflowYaml, 'Workflow YAML')}
                      className="text-[#004ac6] font-bold text-xs hover:underline flex items-center gap-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                      <span>Copy YAML</span>
                    </button>
                  </div>
                  <div className="bg-[#1e293b] text-slate-200 p-3 rounded-xl font-mono text-[10px] max-h-36 overflow-y-auto">
                    <pre className="whitespace-pre">{workflowYaml}</pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'local' && (
            <div className="space-y-3">
              <p className="text-[#434655] leading-relaxed">
                If you prefer building the APK on your own machine using Android Studio or the command line:
              </p>

              <div className="relative bg-[#131b2e] text-slate-100 p-3.5 rounded-2xl font-mono text-[11px] leading-relaxed">
                <button
                  onClick={() => copyToClipboard(localCommands, 'Local Commands')}
                  className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded-lg text-[10px] font-sans font-bold flex items-center gap-1 transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[13px]">
                    {copiedSection === 'Local Commands' ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedSection === 'Local Commands' ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="overflow-x-auto whitespace-pre">{localCommands}</pre>
              </div>

              <div className="bg-[#fff8e1] border border-[#ffe082] p-3 rounded-2xl text-[#6b4f00] space-y-1">
                <span className="font-bold block flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">info</span>
                  Prerequisites for local builds:
                </span>
                <p className="text-[11px]">
                  Node.js 18+, JDK 17, and Android Studio with Android SDK Platform 34 installed.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#434655] uppercase">App Name</label>
                  <input
                    type="text"
                    readOnly
                    value="EduTrack Pro"
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] border border-[#c3c6d7]/40 text-xs font-semibold text-[#131b2e]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-[#434655] uppercase">Package Identifier (App ID)</label>
                  <input
                    type="text"
                    readOnly
                    value="com.edutrack.schoolmanagement"
                    className="w-full h-10 px-3 rounded-xl bg-[#f2f3ff] border border-[#c3c6d7]/40 text-xs font-mono text-[#004ac6]"
                  />
                </div>
              </div>

              <div className="bg-[#f2f3ff] p-3.5 rounded-2xl border border-[#c3c6d7]/30 space-y-2">
                <span className="font-bold text-xs text-[#131b2e] block">Mobile Capabilities Included</span>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#434655]">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#007d55]">check_circle</span>
                    <span>Capacitor 8 Android SDK</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#007d55]">check_circle</span>
                    <span>Offline Data Cache</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#007d55]">check_circle</span>
                    <span>WhatsApp Deep Linking</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#007d55]">check_circle</span>
                    <span>Print & Report Card Export</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#f2f3ff] border-t border-[#c3c6d7]/30 flex items-center justify-between gap-3">
          <button
            onClick={() => copyToClipboard(gitCommands, 'Quick Git Setup')}
            className="h-10 px-4 bg-white text-[#004ac6] border border-[#004ac6]/30 hover:bg-[#dbe1ff] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">content_copy</span>
            <span>Copy Push Commands</span>
          </button>
          
          <button
            onClick={onClose}
            className="h-10 px-5 bg-[#004ac6] text-white rounded-xl text-xs font-bold hover:bg-[#2563eb] shadow-sm transition-colors"
            type="button"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
