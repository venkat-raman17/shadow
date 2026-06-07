# Expo EAS Preview Builds Guide

This guide covers building and distributing preview builds for Android (APK) and iOS (TestFlight).

## Prerequisites

- **EAS Account**: Sign up at [expo.dev](https://expo.dev)
- **Apple Developer Account**: For iOS builds
- **Android**: No additional account needed for APK preview
- **Credentials**: Must be configured with EAS (managed credentials recommended)

## Quick Start

### Local Development Build

```bash
# Build for local testing
npm run build:dev

# Or for specific platform
npm run build:dev:ios
npm run build:dev:android
```

### Preview Builds

```bash
# Build preview for both platforms
npm run build:preview

# Build individual platforms
npm run build:preview:ios    # For TestFlight
npm run build:preview:android # For APK download
```

## Android APK Preview

### Build APK

```bash
npm run build:preview:android
```

### Download and Install

1. Visit [expo.dev/builds](https://expo.dev/builds)
2. Find the completed Android build
3. Click **Download** to get the APK
4. Transfer to Android device or use Android emulator:

```bash
# Install on connected device/emulator
adb install shadow.apk
```

### Direct Testing

```bash
# Build and wait for completion
eas build --platform android --profile preview --wait

# Download APK URL from response
curl -O <APK_URL>
adb install shadow.apk
```

## iOS TestFlight Preview

### Prerequisites for iOS

1. **Apple Developer Team ID**: Required in app.json
2. **App Store Connect Access**: Ensure your Apple account has access
3. **Bundle Identifier**: Must be registered in Apple Developer

### Build for TestFlight

```bash
npm run build:preview:ios
```

### Monitor Build

1. Go to [expo.dev/builds](https://expo.dev/builds)
2. Wait for build to complete
3. Build will automatically be submitted to TestFlight

### Add Testers to TestFlight

1. Visit [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Select your app (Partwise)
3. Go to **TestFlight** → **iOS**
4. Add test users via email
5. Users will receive TestFlight invite

### Install from TestFlight

- Testers will receive email invitation
- Install TestFlight app from App Store
- Accept invite and install Partwise app
- Updates automatically notify testers

## Automated CI/CD Builds

### GitHub Actions Setup

The workflow `.github/workflows/eas-build-preview.yml` automatically builds on push to main.

#### Enable Workflow

1. Go to repository Settings → Secrets and variables → Actions
2. Add secret `EXPO_TOKEN`:
   - Run: `eas credentials --platform all`
   - Generate or copy existing token
   - Add to GitHub as `EXPO_TOKEN`

#### How It Works

- **Trigger**: Push to main branch (or manual dispatch)
- **Steps**:
  1. Checkout code
  2. Install dependencies
  3. Setup EAS with token
  4. Build Android APK
  5. Build iOS for TestFlight
- **Output**: Links to builds at expo.dev/builds

#### View Results

1. GitHub: **Actions** tab → Latest workflow run
2. EAS: [expo.dev/builds](https://expo.dev/builds)
3. TestFlight: [appstoreconnect.apple.com](https://appstoreconnect.apple.com)

## Build Profiles

### Development Profile

```
- Used for: Local testing with development client
- Distribution: Internal (simulator + device)
- Android: APK format
- iOS: Simulator build
```

### Preview Profile

```
- Used for: QA testing before production
- Distribution: Internal
- Android: APK for easy download and install
- iOS: Ad hoc for TestFlight
- Credentials: EAS-managed
```

### Production Profile

```
- Used for: App Store / Play Store submission
- Distribution: Store release
- Android: App Bundle (.aab) format
- iOS: For App Store submission
- Credentials: Secure, production-ready
```

## Credential Management

### Set Up Credentials

```bash
# Configure all platforms
eas credentials

# Or specific platform
eas credentials --platform ios
eas credentials --platform android
```

### Use EAS-Managed Credentials

**Recommended approach:**

1. Run `eas credentials`
2. Select "Let EAS handle this" for each platform
3. EAS stores credentials securely
4. No local keystores/certs in repository

### View Credentials

```bash
# List all credentials
eas credentials --platform all --show
```

### Update Credentials

```bash
# Update specific platform
eas credentials --platform android --delete   # Delete old
eas credentials                               # Create new
```

## Environment Variables

Set environment variables for builds:

```bash
# In eas.json, under build profile:
"env": {
  "REACT_APP_VERSION": "1.0.0",
  "REACT_APP_ENV": "preview"
}
```

Then access in app:

```typescript
import Constants from 'expo-constants';
const version = Constants.expoConfig?.extra?.version;
```

## Troubleshooting

### Build Fails with Credential Error

```
Error: Credentials are required but not set up
```

**Solution**:
```bash
eas credentials
# Follow prompts to set up managed credentials
```

### Slow Build Times

- First build is slowest (full compilation)
- Subsequent builds are faster (cached layers)
- Android APK builds faster than App Bundle
- iOS builds typically take 10-15 minutes

### APK Won't Install

```bash
# Check device/emulator
adb devices

# Clear old installation
adb uninstall com.shadowapp.shadow

# Reinstall
adb install shadow.apk
```

### TestFlight Stuck Processing

- Apple processes builds for 5-30 minutes
- Check [appstoreconnect.apple.com](https://appstoreconnect.apple.com) for status
- If stuck > 1 hour, try rebuilding

### Network/Credential Issues in CI

Ensure `EXPO_TOKEN` is set in GitHub secrets:

```bash
# Generate token (run locally)
eas credentials --show
# Copy token value
```

Then add to GitHub:
1. Settings → Secrets and variables → Actions
2. New repository secret
3. Name: `EXPO_TOKEN`
4. Value: Paste token

## Best Practices

1. **Use EAS-managed credentials** - More secure than local files
2. **Test preview builds** - Always validate before production
3. **Use CI/CD** - Automate builds on code changes
4. **Monitor app size** - APK/IPA size impacts download rates
5. **Update bundle IDs** - Match your actual domain
6. **Rotate credentials** - Periodically update for security
7. **Version consistently** - Use semantic versioning

## Further Reading

- [EAS Build Documentation](https://docs.expo.dev/versions/v56.0.0/build/introduction/)
- [EAS Submit Documentation](https://docs.expo.dev/versions/v56.0.0/submit/introduction/)
- [TestFlight Setup](https://docs.expo.dev/versions/v56.0.0/build-reference/ios-builds/)
- [Play Store Setup](https://docs.expo.dev/versions/v56.0.0/build-reference/android-builds/)

## Support

- Check build logs: `eas build --help`
- View errors in: [expo.dev/builds](https://expo.dev/builds)
- Community: [Expo Discord](https://chat.expo.dev)
