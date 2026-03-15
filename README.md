# DevStation 🚀

> Developer Dashboard — Code Editor · Live Preview · Console · Tools

**by DigitalDairy786** | Faisalabad, Pakistan 🇵🇰

---

## 📁 Repo Structure

```
devstation-app/
├── index.html              ← Main dashboard (full app)
├── devstation-logic.js     ← Core logic bridge
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service Worker (offline support)
├── capacitor.config.json   ← Android APK config
├── package.json            ← NPM dependencies
├── icon.svg                ← App icon (source)
├── icons/                  ← PNG icons (generate from icon.svg)
│   ├── icon-72.png
│   ├── icon-96.png
│   ├── icon-128.png
│   ├── icon-144.png
│   ├── icon-152.png
│   ├── icon-192.png
│   ├── icon-384.png
│   └── icon-512.png
├── screenshots/
│   └── desktop.png
└── .github/
    └── workflows/
        └── build-apk.yml   ← GitHub Actions (auto build APK)
```

---

## 🌐 Step 1 — GitHub Pages (Live PWA)

### GitHub repo settings:
1. GitHub repo کھولیں → **Settings**
2. Left sidebar → **Pages**
3. Source: **Deploy from branch**
4. Branch: **main** → folder: **/ (root)**
5. **Save** کریں

آپ کا live link ہوگا:
```
https://ranag786tech-lang.github.io/devstation-app/
```

---

## 📲 Step 2 — APK بنانے کے 2 طریقے

### طریقہ A — PWABuilder (آسان ترین، کوئی coding نہیں)

1. جائیں: **https://www.pwabuilder.com**
2. URL paste کریں:
   ```
   https://ranag786tech-lang.github.io/devstation-app/
   ```
3. **Start** کریں → score آئے گا
4. **Package for Stores** → **Android** → **Download Package**
5. آپ کو `.apk` یا Android project مل جائے گا

> ✅ سب سے آسان طریقہ — بس URL دیں، APK لیں

---

### طریقہ B — GitHub Actions (خودکار)

Push کریں repo پر، Actions خود APK بنا دے گا:

```bash
git clone git@github.com:ranag786tech-lang/devstation-app.git
cd devstation-app
# سب files copy کریں یہاں
git add .
git commit -m "🚀 Add PWA + APK build"
git push origin main
```

پھر GitHub → **Actions tab** → workflow چل رہا ہوگا۔
ختم ہونے پر **Artifacts** میں APK ملے گی۔

---

## 🖼 Step 3 — Icons بنائیں

`icon.svg` کو PNG میں convert کریں:

**Online (آسان):**
- جائیں: **https://realfavicongenerator.net**
- SVG upload کریں
- سب sizes download کریں → `icons/` folder میں رکھیں

**یا manually:**
- https://svgtopng.com سے ہر size بنائیں

---

## 📋 Files یاد رکھیں — GitHub پر push ضرور کریں

| File | ضروری؟ |
|------|---------|
| `index.html` | ✅ ہاں |
| `devstation-logic.js` | ✅ ہاں |
| `manifest.json` | ✅ ہاں |
| `sw.js` | ✅ ہاں |
| `capacitor.config.json` | ✅ APK کے لیے |
| `package.json` | ✅ APK کے لیے |
| `icons/icon-192.png` | ✅ ہاں |
| `icons/icon-512.png` | ✅ ہاں |
| `.github/workflows/build-apk.yml` | ✅ Auto-build کے لیے |

---

## ⚡ Features

- ✅ Code Editor (HTML / CSS / JS) with syntax highlighting
- ✅ Live Preview — auto-refresh
- ✅ Console + Terminal
- ✅ File system — create, save, download
- ✅ Dark / Light theme
- ✅ Color Picker, Snippets, Find & Replace
- ✅ PWA — installable on Android/Desktop
- ✅ Offline support (Service Worker)
- ✅ Auto-save to localStorage

---

## 📞 Contact

- 📧 ranag786tech@outlook.com
- 💻 github.com/ranag786tech-lang
- 📍 Faisalabad, Pakistan

---

Built with 🤍 | © 2026 DigitalDairy786
