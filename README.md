# EduTrack Pro - School Management & Academic Tracker

EduTrack Pro is a mobile-responsive School Management and Academic Monitoring application built for school principals, administrative faculty, and teachers.

---

## 📱 How to Build Android APK via GitHub Actions

This repository is pre-configured with a continuous integration (CI/CD) workflow in `.github/workflows/build-apk.yml`. You do not need Android Studio or a local Android SDK installed.

### 1. Push your repository to GitHub

Initialize your git repository and push to GitHub:

```bash
git init
git add .
git commit -m "feat: initialize EduTrack Pro with Android APK CI"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

### 2. Automated Build Process

Once pushed to GitHub, GitHub Actions will automatically:
1. Set up Node.js 20 & Java 17 Temurin SDK.
2. Build the optimized production web assets (`npm run build`).
3. Sync the Capacitor Android bridge (`npx cap sync android`).
4. Compile the Android Debug APK using Gradle (`./gradlew assembleDebug`).
5. Output `EduTrack-Pro-debug.apk`.

### 3. Downloading your APK File

You can download your ready-to-install `.apk` file in two ways:

- **Via GitHub Actions Artifacts**:
  1. Open your repository on GitHub.
  2. Click the **Actions** tab at the top.
  3. Click on the latest workflow run: **Build Android APK**.
  4. Scroll down to the **Artifacts** section at the bottom of the summary page.
  5. Click **EduTrack-Pro-Android-APK** to download your zip containing `EduTrack-Pro-debug.apk`.

- **Via GitHub Releases**:
  1. On pushes to `main`, a new Release tag `v1.0.X` is automatically created under the **Releases** tab.
  2. Download `EduTrack-Pro-debug.apk` directly.

### 4. Installing on your Android Phone
1. Transfer or download the `.apk` file to your Android smartphone.
2. Tap the file in your Downloads or File Manager.
3. If prompted, enable **"Install unknown apps"** for your browser/file manager.
4. Tap **Install** and open EduTrack Pro.

---

## 💻 Local Android Development (Optional)

If you have Android Studio installed and prefer to test locally on an emulator or USB device:

```bash
# Install dependencies
npm install

# Build web distribution
npm run build

# Add/sync Android platform
npx cap add android
npx cap sync android

# Open project in Android Studio
npx cap open android

# Or build debug APK directly via command line
cd android && ./gradlew assembleDebug
```
Output APK location: `android/app/build/outputs/apk/debug/app-debug.apk`
