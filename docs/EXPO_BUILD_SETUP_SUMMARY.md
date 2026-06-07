# Expo EAS Build Setup Complete Walkthrough

This document provides a complete setup guide for Expo EAS preview builds with Android APK and iOS TestFlight distribution.

## Current Status ✅

The following files have been configured for EAS builds:

- ✅ `eas.json` - Build profiles (dev, preview, production)
- ✅ `app.json` - Bundle identifiers and app configuration
- ✅ `package.json` - Build scripts
- ✅ `.github/workflows/eas-build-preview.yml` - CI/CD automation
- ✅ `docs/BUILD_PREVIEW.md` - Reference guide

## Configuration Overview

### eas.json Profiles

```json
{
  "development": {
    "developmentClient": true,
    "distribution": "internal",
    "android": { "buildType": "apk" },
    "ios": { "simulator": true }
  },
  "preview": {
    "distribution": "internal",
    "android": { "buildType": "apk" },
    "ios": {}
  },
  "production": {
    "distribution": "store",
    "android": { "buildType": "app-bundle" },
    "ios": {}
  }
}
```

**Profile Details:**
- **development**: For local testing with expo-dev-client
- **preview**: For QA testing (Android APK + iOS TestFlight)
- **production**: For Play Store and App Store release

### app.json Configuration

**iOS Bundle ID**: `com.shadowapp.shadow`
**Android Package**: `com.shadowapp.shadow`

**Required Fields Added:**
- `ios.bundleIdentifier` - Unique identifier for App Store
- `android.package` - Unique package name for Play Store
- `ios.supportsTabletMode` - Tablet optimization
- `android.permissions` - Location permissions example

### package.json Build Scripts

```bash
npm run build:dev              # Local development (both platforms)
npm run build:dev:ios          # Local iOS simulator
npm run build:dev:android      # Local Android APK

npm run build:preview          # Preview for QA (both platforms)
npm run build:preview:ios      # Preview iOS → TestFlight
npm run build:preview:android  # Preview Android → APK download

npm run build:production       # Production (both platforms)
npm run build:production:ios   # Production iOS → App Store
npm run build:production:android # Production Android → Play Store

npm run submit:ios             # Submit to App Store
npm run submit:android         # Submit to Play Store
```

## Setup Steps

### Step 1: Initialize EAS Project ⚙️

```bash
# Initialize EAS (updates eas.json with project ID)
eas init --force
```

This will:
- Create EAS project
- Add project ID to eas.json
- Authenticate with Expo account

**Output:**
```
✅ EAS project initialized
📱 Project ID: [UUID]
```

### Step 2: Configure iOS Credentials 🍎

#### Prerequisites

- Apple Developer Account
- Apple Team ID (format: XXXXXXXXXX)
- Access to App Store Connect

#### Steps

```bash
# Configure iOS credentials
eas credentials --platform ios
```

**Interactive Prompts:**

1. **Keychain password** (if first time):
   ```
   A passphrase to protect your credentials
   Leave empty for no passphrase
   ```

2. **Apple Team ID**:
   ```
   Apple Team ID: [PROVIDE_YOUR_TEAM_ID]
   ```

3. **Credential Setup**:
   ```
   Select an option:
   > Let EAS handle this (Recommended)
     Set up manually
   ```

4. **Building for Preview**:
   ```
   Do you want to set up credentials for Preview?
   > (Y/n): Y
   ```

5. **Building for Production**:
   ```
   Do you want to set up credentials for Production?
   > (Y/n): Y (optional, can skip for now)
   ```

**What Happens:**
- EAS creates signing certificates
- EAS creates provisioning profiles
- Credentials stored securely in EAS (not locally)
- No files added to git repository

**Verify**:
```bash
eas credentials --platform ios --show
# Shows certificate and provisioning profile details
```

### Step 3: Configure Android Credentials 🤖

#### Prerequisites

- None! Google Play uses OAuth

#### Steps

```bash
# Configure Android credentials
eas credentials --platform android
```

**Interactive Prompts:**

1. **Build Type Selection**:
   ```
   What type of build would you like to create?
   > APK (for Preview testing)
     App Bundle (for Play Store)
   ```

2. **Credential Creation**:
   ```
   Let EAS handle creating keystore (Recommended)
   Or use existing keystore
   ```

3. **Keystore Alias**:
   - EAS generates automatically
   - Or provide your own

**What Happens:**
- EAS creates signing keystore
- Android signing key securely stored
- Credentials ready for production

**Verify**:
```bash
eas credentials --platform android --show
# Shows keystore fingerprint and alias
```

### Step 4: Set Up GitHub Actions 🔄

#### Add EXPO_TOKEN Secret

1. **Generate Token Locally**:
   ```bash
   # This shows your EXPO_TOKEN
   eas credentials --platform all
   ```

2. **Add to GitHub**:
   - Go to: Repository → Settings → Secrets and variables → Actions
   - Click: "New repository secret"
   - Name: `EXPO_TOKEN`
   - Value: Paste token from step 1
   - Click: "Add secret"

3. **Enable Workflow**:
   ```bash
   # GitHub automatically runs on push to main
   # Or manually trigger in Actions tab
   ```

#### What Workflow Does

- Automatically builds on push to main
- Creates Android APK
- Creates iOS build for TestFlight
- Reports status with links
- No manual intervention needed

### Step 5: Update Bundle Identifiers (Optional) 📝

If you want to customize the app identifiers:

**Option A: Keep defaults**
```
iOS: com.shadowapp.shadow
Android: com.shadowapp.shadow
```

**Option B: Customize**

Edit `app.json`:
```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.your-domain.shadow"
    },
    "android": {
      "package": "com.your_domain.shadow"
    }
  }
}
```

Then reconfigure credentials:
```bash
eas credentials --platform all --delete
eas credentials
```

## First Build Walkthrough

### Manual Build

```bash
# Test preview build locally
npm run build:preview:android

# Follow the prompts:
# 1. Select build profile: preview
# 2. Review build configuration
# 3. Start build (may take 5-15 minutes)

# Once complete:
# - Visit https://expo.dev/builds
# - Find your Android build
# - Download APK
# - Install on device/emulator
```

### Automated Build (GitHub Actions)

```bash
# 1. Make a code change
git add .
git commit -m "test: build setup"

# 2. Push to main
git push origin main

# 3. Watch build in GitHub
# - Go to Actions tab
# - Watch workflow run
# - View logs and status

# 4. Check results
# - Android: Download APK from expo.dev/builds
# - iOS: Check TestFlight (appstoreconnect.apple.com)
```

## Testing the Builds

### Android APK Testing

**Installation Methods**:

```bash
# Method 1: adb (connected device/emulator)
adb install shadow.apk

# Method 2: Email APK to yourself
# Download from expo.dev/builds, attach to email

# Method 3: Build from scratch
npm run build:preview:android
```

**Testing Checklist**:
- [ ] App launches without crashes
- [ ] Offline functionality works
- [ ] Local storage persists data
- [ ] Navigation works as expected
- [ ] UI renders correctly
- [ ] Performance acceptable

### iOS TestFlight Testing

**Add Testers**:

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Select "Partwise" app
3. Go to "TestFlight" → "iOS"
4. Invite test users by email
5. Users receive invitation email
6. Users install TestFlight app from App Store
7. Users tap invitation link to install app

**Testing Checklist**:
- [ ] Invitation received
- [ ] TestFlight installation works
- [ ] App launches from TestFlight
- [ ] Same functionality as Android APK
- [ ] App handles lifecycle transitions
- [ ] Performance on actual device good

## Common Issues & Solutions

### Issue: "Credentials are required but not configured"

```
Error: Credentials are required but not configured
```

**Solution**:
```bash
eas credentials
# Follow prompts to set up managed credentials
```

### Issue: Build Fails with "Invalid Bundle ID"

```
Error: Invalid bundle identifier
```

**Solution**:
1. Ensure bundle ID matches `app.json`
2. Recreate credentials:
   ```bash
   eas credentials --platform ios --delete
   eas credentials --platform ios
   ```

### Issue: EXPO_TOKEN not working in GitHub Actions

```
Error: EXPO_TOKEN not set
```

**Solution**:
1. Verify token added to GitHub Secrets
2. Token format should be long string (50+ chars)
3. Regenerate if needed:
   ```bash
   eas logout
   eas login
   # Then get new token from credentials
   ```

### Issue: "App not found in App Store Connect"

```
Error: The app with bundle ID ... was not found
```

**Solution**:
1. Create app in App Store Connect:
   - Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
   - Click "+" → "New App"
   - Enter bundle ID from `app.json`
   - Select platform (iOS)
   - Create app
2. Then rebuild:
   ```bash
   npm run build:preview:ios
   ```

## Next Steps After Setup

### 1. First Preview Build

```bash
npm run build:preview
# Wait for completion
# Test on actual devices/emulators
```

### 2. Add to Git

```bash
git add eas.json app.json package.json .github/
git commit -m "feat: setup EAS preview builds"
git push origin main
```

### 3. Set Up Distribution

**For Android**:
- Continue testing with APK downloads
- Prepare Play Store account for production

**For iOS**:
- Add testers to TestFlight
- Prepare App Store account for production

### 4. Production Setup (Future)

```bash
# When ready for App Store / Play Store:
npm run build:production:ios
npm run build:production:android
npm run submit:ios
npm run submit:android
```

## Security Notes

⚠️ **Important Security Practices**:

1. **Never commit credentials**:
   - Keystores not in git
   - Certificates not in git
   - Private keys not in git

2. **Use EXPO_TOKEN carefully**:
   - Add to GitHub Secrets (not in code)
   - Rotate periodically
   - Regenerate if compromised

3. **EAS-Managed Credentials Recommended**:
   - More secure than local files
   - Automatically backed up
   - Easy credential rotation

4. **Restrict App Store Access**:
   - Use App-specific passwords on Apple
   - Use OAuth on Google Play (recommended)
   - Limit GitHub secret access

## Useful Commands Reference

```bash
# Initialization
eas init --force                    # Initialize EAS project

# Credentials
eas credentials                     # Interactive credential setup
eas credentials --platform ios      # iOS only
eas credentials --platform android  # Android only
eas credentials --show              # View current credentials
eas credentials --delete            # Remove credentials

# Building
npm run build:dev                   # Dev build both platforms
npm run build:preview               # Preview build both platforms
npm run build:preview:ios           # iOS preview (TestFlight)
npm run build:preview:android       # Android preview (APK)
npm run build:production            # Production both platforms

# Monitoring
eas build:list                      # View all builds
eas build:view --id <BUILD_ID>      # View specific build
eas build:log --id <BUILD_ID>       # View build logs

# CI/CD
# GitHub Actions runs automatically on push to main
# Manual trigger: Go to Actions tab → select workflow → Run workflow

# Account
eas login                           # Log in to EAS
eas logout                          # Log out
eas whoami                          # Check logged in user
```

## File Structure After Setup

```
shadow/
├── .github/
│   └── workflows/
│       └── eas-build-preview.yml     # CI/CD workflow
├── docs/
│   ├── BUILD_PREVIEW.md              # Quick reference
│   └── EXPO_BUILD_SETUP_SUMMARY.md   # This file
├── eas.json                           # Build profiles
├── app.json                           # App configuration
├── package.json                       # Scripts updated
└── [other project files...]
```

## Success Criteria

After completing setup, you should be able to:

- ✅ Run `npm run build:preview:android` and get APK
- ✅ Run `npm run build:preview:ios` and get TestFlight build
- ✅ Manage credentials with `eas credentials`
- ✅ See builds at [expo.dev/builds](https://expo.dev/builds)
- ✅ GitHub Actions automatically builds on push to main
- ✅ Download Android APK and test on device
- ✅ Add testers to TestFlight and share iOS build
- ✅ View build logs and errors in EAS console

## Additional Resources

- **Expo Docs**: https://docs.expo.dev/versions/v56.0.0/
- **EAS Build**: https://docs.expo.dev/versions/v56.0.0/build/introduction/
- **EAS Submit**: https://docs.expo.dev/versions/v56.0.0/submit/introduction/
- **TestFlight Setup**: https://docs.expo.dev/versions/v56.0.0/build-reference/ios-builds/
- **Play Store Setup**: https://docs.expo.dev/versions/v56.0.0/build-reference/android-builds/
- **Expo Community**: https://chat.expo.dev
- **GitHub Actions**: https://docs.github.com/en/actions

## Support

If you encounter issues:

1. Check build logs: [expo.dev/builds](https://expo.dev/builds)
2. Review this guide: `docs/EXPO_BUILD_SETUP_SUMMARY.md`
3. Check reference guide: `docs/BUILD_PREVIEW.md`
4. Visit Expo Community: https://chat.expo.dev
5. Check GitHub Actions logs: Repository → Actions tab
