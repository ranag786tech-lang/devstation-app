/**
 * DevStation - Core Logic Bridge
 * Version: 2026.03.15
 * File: devstation-logic.js
 *
 * Usage: Add this script AFTER your main dashboard HTML loads
 * <script src="devstation-logic.js"></script>
 *
 * Requires (from devstation-dashboard.html):
 *   - editor       (CodeMirror instance)
 *   - currentFile  (string)
 *   - FILES        (object)
 *   - notify()     (function)
 *   - conLog()     (function)
 *   - switchBottomPanel() (function)
 */

'use strict';

// ================================================
// 1. DEVSTATION CORE OBJECT
// ================================================
const DevStationLogic = {
  version: "2026.03.15",
  status:  "Active",

  /**
   * File Transfer Handler
   * Checks if a file is an icon transfer and renames it
   * @param {string} fileName
   * @returns {string} final file name
   */
  handleIconTransfer: function(fileName) {
    console.log(`[System] Processing: ${fileName}`);
    if (fileName.includes('icon_transfer')) {
      this.notifyUser("Icon transfer detected. Renaming for build...");
      return "icon.svg";
    }
    return fileName;
  },

  /**
   * Notification Wrapper
   * Links to dashboard notify() if available, else console fallback
   * @param {string} msg
   */
  notifyUser: function(msg) {
    if (typeof notify === "function") {
      notify('info', msg);
    } else {
      console.info(`[DevStation]: ${msg}`);
    }
  }
};

// ================================================
// 2. EDITOR SYNC — saves active file to localStorage
// ================================================
function syncEditorState() {
  // editor is defined in devstation-dashboard.html (CodeMirror instance)
  if (typeof editor === "undefined" || !editor) {
    console.warn("[DevStation] editor not ready yet.");
    return;
  }
  if (typeof currentFile === "undefined") {
    console.warn("[DevStation] currentFile not defined.");
    return;
  }

  const content = editor.getValue();

  try {
    localStorage.setItem('ds_file_' + currentFile, content);
    console.log(`[Editor] Synced & saved → ${currentFile}`);
  } catch (e) {
    console.warn("[Editor] localStorage save failed:", e.message);
  }
}

// ================================================
// 3. RESTORE — load saved files from localStorage on startup
// ================================================
function restoreFromLocalStorage() {
  if (typeof FILES === "undefined") {
    console.warn("[DevStation] FILES object not found.");
    return;
  }

  Object.keys(FILES).forEach(function(fname) {
    const saved = localStorage.getItem('ds_file_' + fname);
    if (saved && saved.trim() !== "") {
      FILES[fname].content = saved;
      if (typeof conLog === "function") {
        conLog('info', '↺ Restored from cache: ' + fname);
      }
    }
  });
}

// ================================================
// 4. BUILD TRIGGER SIMULATION
// ================================================
function triggerBuild() {
  if (typeof conLog === "function") {
    conLog('ok', '🚀 Triggering GitHub Actions Build...');
  }

  DevStationLogic.notifyUser("Build started. Check Actions tab.");

  if (typeof switchBottomPanel === "function") {
    switchBottomPanel('console');
  }

  setTimeout(function() {
    if (typeof conLog === "function") {
      conLog('info', '📦 Packaging: com.dg.devstation');
    }
  }, 1200);

  setTimeout(function() {
    if (typeof conLog === "function") {
      conLog('ok', '✅ Build Successful!');
    }
    if (typeof notify === "function") {
      notify('ok', '✅ Build done!');
    }
  }, 3000);
}

// ================================================
// 5. AUTO-SAVE every 30 seconds
// ================================================
setInterval(function() {
  if (typeof editor !== "undefined" && editor) {
    syncEditorState();
  }
}, 30000);

// ================================================
// 6. INIT — runs after full page load
//    NOTE: Using 'load' not 'DOMContentLoaded'
//    because CodeMirror editor is ready only after 'load'
// ================================================
window.addEventListener('load', function() {
  console.log(
    "%c DevStation Logic v" + DevStationLogic.version + " Loaded ",
    "background: #a07840; color: #fff; font-weight: bold; padding: 2px 6px; border-radius: 3px;"
  );

  // Small delay to make sure CodeMirror is fully initialized
  setTimeout(function() {
    restoreFromLocalStorage();
    console.log("[DevStation] Status:", DevStationLogic.status);
  }, 500);
});
