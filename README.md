# DevStation 🚀

> **Ultimate Developer Dashboard** — Code Editor · Live Preview · Console · Tools
> **by DigitalDairy786** | Faisalabad, Pakistan 🇵🇰

---

## 📁 Final Repo Structure (Verified)

Humne structure ko optimize kiya hai taake APK build fail na ho:

```text
devstation-app/
├── index.html              ← Main dashboard (Optimized Viewport)
├── devstation-logic.js     ← Core logic (Auto-save & Restore)
├── manifest.json           ← PWA manifest (Relative Paths ✅)
├── sw.js                   ← Service Worker (Offline Support)
├── capacitor.config.json   ← Android APK config
├── package.json            ← Dependencies & Scripts
├── icon.svg                ← App icon (Source)
├── icons/                  ← PNG icons (Critical for APK)
│   ├── icon-96.png
│   ├── icon-192.png
│   └── icon-512.png
└── .github/
    └── workflows/
        └── build-apk.yml   ← Auto-build APK (GitHub Actions)

```

---

## 🌐 Live PWA & Deployment

### 1. GitHub Pages Setup:

1. **Settings** → **Pages** par jayein.
2. Source: **Deploy from branch** → Branch: **main**.
3. Live Link: `https://ranag786tech-lang.github.io/devstation-app/`

---

## 📲 APK Build Process (Auto-Mode)

Aapko manual mehnat ki zaroorat nahi:

1. Bas files **Push/Commit** karein.
2. GitHub → **Actions** tab mein jayein.
3. Workflow khatam hone par **Artifacts** se `DevStation-Debug-APK` download karein.

---

## ⚡ Key Features

* ✅ **Mobile-First Design:** Full-screen experience with `viewport-fit=cover`.
* ✅ **Smart Sync:** Code automatically saves to `localStorage` every 20 seconds.
* ✅ **Offline Mode:** Service Worker ensures the editor works without internet.
* ✅ **Auto-Restore:** Pichla likha hua code browser reload par wapas aa jata hai.
* ✅ **PWA Ready:** Installable on Android, iOS, and Desktop.

---

## 📋 Critical Files Checklist

| File | Status | Role |
| --- | --- | --- |
| `index.html` | ✅ Ready | Main UI & Layout |
| `devstation-logic.js` | ✅ Ready | Sync & File Management |
| `manifest.json` | ✅ Ready | App Identity & Icons |
| `sw.js` | ✅ Ready | Offline & Caching |
| `icons/` | ✅ Ready | Launcher Icons (96, 192, 512) |
| `.github/workflows/` | ✅ Ready | Auto APK Engine |

---

## 📞 Contact & Support

* 📧 **Email:** ranag786tech@outlook.com
* 💻 **GitHub:** [ranag786tech-lang](https://www.google.com/search?q=https://github.com/ranag786tech-lang)
* 📍 **Location:** Faisalabad, Pakistan

---

**Built with 🤍 | © 2026 DigitalDairy786**
