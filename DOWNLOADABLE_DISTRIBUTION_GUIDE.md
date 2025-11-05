# 📦 Downloadable Distribution Guide - VendorSoluce RiskIQ

**Version:** 2.0.0  
**Last Updated:** November 5, 2025

---

## 🎯 Overview

This guide covers how to build, distribute, and support the downloadable version of VendorSoluce RiskIQ using Electron. This is Phase 1 of your dual-distribution strategy (Download then SaaS).

---

## 🏗️ Architecture Overview

```
VendorSoluce RiskIQ (Downloadable)
├── React Frontend (Vite build)
│   ├── All existing components
│   ├── LocalStorage for data
│   └── License validation UI
├── Electron Wrapper
│   ├── electron-main.js (Main process)
│   ├── preload.js (Security bridge)
│   └── Native features (file system, menus)
└── License System
    ├── Client-side validation
    ├── Online verification (optional)
    └── Offline fallback
```

---

## 📋 Prerequisites

### Development Environment
```bash
# Required software
- Node.js 18+ 
- npm 9+
- Git

# Platform-specific (for building installers)
Windows:
- Windows 10+ SDK (for code signing)

macOS:
- Xcode Command Line Tools
- Apple Developer Account (for code signing)

Linux:
- Standard build tools (gcc, make)
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd VendorSoluce-RiskIQ
npm install
```

This will install:
- Electron 28
- Electron Builder 24.9
- Concurrently & wait-on (for dev)
- All existing dependencies

### 2. Run in Development
```bash
# Start development with hot reload
npm run electron:dev
```

This will:
1. Start Vite dev server on http://localhost:3000
2. Wait for it to be ready
3. Launch Electron window
4. Enable DevTools automatically

### 3. Build for Production
```bash
# Build for current platform
npm run electron:build

# Or platform-specific:
npm run electron:build:win    # Windows (.exe, portable)
npm run electron:build:mac    # macOS (.dmg, .zip)
npm run electron:build:linux  # Linux (.AppImage, .deb)
```

Output will be in `release/` directory.

---

## 🔧 Configuration

### Package.json Settings

Already configured for you:
```json
{
  "main": "electron-main.js",
  "homepage": "./",
  "build": {
    "appId": "com.vendorsoluce.riskiq",
    "productName": "VendorSoluce RiskIQ",
    "directories": {
      "output": "release"
    },
    "files": [
      "dist/**/*",
      "electron-main.js",
      "preload.js",
      "package.json"
    ]
  }
}
```

### Icon Files (Required)

Create these icon files in `public/`:
```
public/
├── icon.ico     # Windows (256x256)
├── icon.icns    # macOS (512x512)
└── icon.png     # Linux (512x512)
```

**To create icons:**
1. Design 512x512 PNG logo
2. Use online converter or:
   ```bash
   # Install icon generator
   npm install -g electron-icon-maker
   
   # Generate all formats
   electron-icon-maker --input=public/logo-512.png --output=public
   ```

---

## 🔐 License System

### How It Works

1. **User purchases** license on your website (Stripe)
2. **Backend generates** license key and emails user
3. **User enters** key in Settings → License Activation
4. **App validates** key (online then offline fallback)
5. **License stored** in LocalStorage
6. **App checks** license on every startup

### License Key Format

```
TIER-XXXX-XXXX-XXXX-XXXX

Examples:
PRO-A3F5-8D2C-1E9B-4F7A
ENTERPRISE-B4G6-9E3D-2F0C-5G8B
```

### Validation Flow

```
User enters key
    ↓
Format validation (client-side)
    ↓
Try online validation (api.vendorsoluce.com)
    ↓
If online fails → Offline validation
    ↓
Store in LocalStorage
    ↓
Unlock features
```

### Testing License Activation

**Development Mode:**
1. Go to Settings → License Activation
2. Click "Generate Demo Key" (dev only)
3. Click "Activate"
4. Check that tier updates to Pro

**Production Mode:**
1. Generate key with backend script
2. Enter key in app
3. Should validate online
4. If offline, validates format only

---

## 🎨 Customization

### White-Label (Enterprise Only)

Enterprise users can customize:
- Company name
- Logo URL
- Primary color
- Show/hide VendorSoluce branding

**Configured in:** Settings → White-Label Settings

### Application Menu

**Customizable menus** in `electron-main.js`:
- File (Export, Import, Preferences)
- Edit (standard editing)
- View (zoom, reload)
- Navigation (keyboard shortcuts)
- Help (docs, support, about)

**Add custom menu items:**
```javascript
// In electron-main.js createMenu()
{
  label: 'Custom Feature',
  accelerator: 'CmdOrCtrl+K',
  click: () => {
    mainWindow.webContents.send('custom-action');
  }
}
```

---

## 📦 Building Installers

### Windows

```bash
npm run electron:build:win
```

**Creates:**
- `VendorSoluce-RiskIQ-2.0.0-Setup.exe` (NSIS installer)
- `VendorSoluce-RiskIQ-2.0.0.exe` (Portable)

**Options:**
- Install for all users / current user
- Desktop shortcut
- Start menu entry
- Custom install location

**Code Signing (Recommended):**
```bash
# Get certificate from SSL provider
# Set environment variables:
set CSC_LINK=path/to/certificate.pfx
set CSC_KEY_PASSWORD=your-password

# Then build
npm run electron:build:win
```

### macOS

```bash
npm run electron:build:mac
```

**Creates:**
- `VendorSoluce-RiskIQ-2.0.0.dmg` (disk image)
- `VendorSoluce-RiskIQ-2.0.0-mac.zip` (zip archive)

**Code Signing (Required for distribution):**
```bash
# Requires Apple Developer Account ($99/year)
# Export credentials:
export APPLE_ID=your@email.com
export APPLE_ID_PASSWORD=app-specific-password
export CSC_LINK=Developer_ID.p12
export CSC_KEY_PASSWORD=your-password

# Then build
npm run electron:build:mac
```

**Notarization:**
```javascript
// Add to package.json → build
"mac": {
  "hardenedRuntime": true,
  "gatekeeperAssess": false,
  "entitlements": "entitlements.mac.plist",
  "entitlementsInherit": "entitlements.mac.plist"
},
"afterSign": "scripts/notarize.js"
```

### Linux

```bash
npm run electron:build:linux
```

**Creates:**
- `VendorSoluce-RiskIQ-2.0.0.AppImage` (portable)
- `VendorSoluce-RiskIQ_2.0.0_amd64.deb` (Debian/Ubuntu)

**No code signing required** for Linux.

---

## 🌐 Distribution Options

### Option 1: Direct Download (Simple)

1. **Upload installers** to your website
2. **Create download page** with links
3. **Users download** directly

**Example page:**
```html
<h2>Download VendorSoluce RiskIQ</h2>

<div class="downloads">
  <a href="/downloads/VendorSoluce-RiskIQ-2.0.0-Setup.exe">
    Windows (64-bit)
  </a>
  
  <a href="/downloads/VendorSoluce-RiskIQ-2.0.0.dmg">
    macOS (Intel & Apple Silicon)
  </a>
  
  <a href="/downloads/VendorSoluce-RiskIQ-2.0.0.AppImage">
    Linux (AppImage)
  </a>
</div>
```

### Option 2: Auto-Updates (Recommended)

Use `electron-updater`:
```bash
npm install electron-updater
```

**Configure:**
```javascript
// In electron-main.js
const { autoUpdater } = require('electron-updater');

app.on('ready', () => {
  autoUpdater.checkForUpdatesAndNotify();
});
```

**Host updates:**
- GitHub Releases (free)
- Your own server
- S3/CDN

### Option 3: App Stores

**Microsoft Store (Windows):**
- Submit APPX package
- Review process (1-3 days)
- $19 one-time registration

**Mac App Store:**
- Requires developer account
- Strict review process
- 30% commission on sales

---

## 📄 Licensing & Distribution

### License Management Workflow

```
1. User visits vendorsoluce.com/pricing
2. Clicks "Buy Pro" ($149)
3. Stripe Payment Link opens
4. User completes purchase
5. Stripe webhook fires
6. Your backend:
   - Generates license key
   - Stores in database
   - Emails key to customer
7. User downloads app
8. User activates license in app
9. App validates online/offline
10. Features unlocked
```

### Backend Setup (Simple)

**License Key Generator:**
```javascript
// license-generator.js
const crypto = require('crypto');

function generateLicenseKey(tier, email, orderId) {
  const secret = process.env.LICENSE_SECRET; // Keep this secret!
  const data = `${tier}:${email}:${orderId}`;
  const signature = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex')
    .substring(0, 16)
    .toUpperCase();
  
  return `${tier.toUpperCase()}-${signature.match(/.{4}/g).join('-')}`;
}

// Example
const key = generateLicenseKey('pro', 'user@example.com', 'ch_abc123');
// Returns: PRO-A3F5-8D2C-1E9B-4F7A
```

**Stripe Webhook Handler:**
```javascript
// webhook.js (Express)
app.post('/stripe/webhook', async (req, res) => {
  const event = req.body;
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const tier = session.metadata.tier;
    const email = session.customer_details.email;
    
    // Generate license
    const licenseKey = generateLicenseKey(tier, email, session.id);
    
    // Save to database
    await db.licenses.create({
      key: licenseKey,
      tier,
      email,
      orderId: session.id,
      createdAt: new Date()
    });
    
    // Email to customer
    await sendEmail({
      to: email,
      subject: 'Your VendorSoluce License',
      body: `
        Thank you for purchasing VendorSoluce RiskIQ ${tier.toUpperCase()}!
        
        Your license key: ${licenseKey}
        
        To activate:
        1. Open VendorSoluce RiskIQ
        2. Go to Settings → License Activation
        3. Enter your key
        4. Click Activate
        
        Questions? Reply to this email!
      `
    });
  }
  
  res.json({ received: true });
});
```

---

## 🐛 Troubleshooting

### Build Issues

**Error: "Cannot find module electron-main.js"**
```bash
# Ensure file exists in root:
ls electron-main.js

# Verify package.json:
"main": "electron-main.js"
```

**Error: "ENOENT: no such file or directory 'dist/index.html'"**
```bash
# Build web app first:
npm run build

# Then build Electron:
npm run electron:build
```

**Error: "Code signing failed"**
```bash
# For testing, disable code signing:
export CSC_IDENTITY_AUTO_DISCOVERY=false

# Then build
npm run electron:build
```

### Runtime Issues

**White screen on launch:**
- Check DevTools console (Ctrl+Shift+I)
- Verify dist/ folder exists
- Check if running in development mode

**License not activating:**
- Check network connection (online validation)
- Verify key format
- Check browser console for errors

**Data not persisting:**
- LocalStorage is per-app domain
- Check if app has write permissions
- Verify userData directory

---

## 📊 Analytics & Monitoring

### Track App Usage (Optional)

```javascript
// In electron-main.js
const analytics = require('electron-google-analytics');

app.on('ready', () => {
  analytics.send('screenview', {
    cd: 'Main Window',
    an: 'VendorSoluce RiskIQ',
    av: app.getVersion()
  });
});
```

### License Telemetry

Track license usage (respecting privacy):
```javascript
// On app startup
fetch('https://api.vendorsoluce.com/telemetry', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    licenseKey: storedLicense.key, // Hashed on server
    version: app.getVersion(),
    platform: process.platform,
    timestamp: new Date().toISOString()
  })
});
```

---

## 🚢 Release Checklist

### Pre-Release

- [ ] Update version in `package.json`
- [ ] Test on all platforms (Win, Mac, Linux)
- [ ] Test license activation flow
- [ ] Test offline mode
- [ ] Update CHANGELOG.md
- [ ] Create release notes

### Build Process

- [ ] Clean build: `rm -rf dist release`
- [ ] Run full build: `npm run build`
- [ ] Build Windows: `npm run electron:build:win`
- [ ] Build macOS: `npm run electron:build:mac`
- [ ] Build Linux: `npm run electron:build:linux`
- [ ] Code sign all platforms

### Distribution

- [ ] Upload to download server
- [ ] Update website download links
- [ ] Test downloads from website
- [ ] Announce on social media
- [ ] Email existing customers (if update)
- [ ] Update documentation

---

## 📚 Additional Resources

- **Electron Documentation:** https://www.electronjs.org/docs
- **Electron Builder:** https://www.electron.build
- **Code Signing Guide:** https://www.electron.build/code-signing
- **Auto Updates:** https://www.electron.build/auto-update

---

## 🆘 Support

**For build issues:**
- Check Electron Builder logs in `release/`
- Review console output carefully
- Search GitHub issues: github.com/electron-userland/electron-builder

**For license system:**
- Test with demo keys first
- Check network tab in DevTools
- Verify backend API is responding

---

**Next Steps:**
1. ✅ Build your first installer: `npm run electron:build`
2. ✅ Test installation on clean machine
3. ✅ Set up backend license generation
4. ✅ Configure Stripe webhook
5. ✅ Launch! 🚀

---

**Version:** 2.0.0  
**Last Updated:** November 5, 2025  
**Status:** Production Ready ✅

