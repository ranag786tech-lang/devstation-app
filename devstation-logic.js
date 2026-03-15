'use strict';

const DevStationLogic = {
  version: "2026.03.15",
  status:  "Active",

  handleIconTransfer: function(fileName) {
    if (fileName.includes('icon_transfer')) {
      this.notifyUser("Icon detected. Renaming...");
      return "icon.svg";
    }
    return fileName;
  },

  notifyUser: function(msg) {
    if (typeof notify === "function") notify('info', msg);
    else console.info(`[DevStation]: ${msg}`);
  }
};

// ================================================
// FIXED: SYNC LOGIC WITH FALLBACK
// ================================================
function syncEditorState() {
  if (typeof editor === "undefined" || !editor) return;
  
  // Agar currentFile undefined hai to default set karein
  const activeFile = typeof currentFile !== "undefined" ? currentFile : 'index.html';
  const content = editor.getValue();

  try {
    localStorage.setItem('ds_file_' + activeFile, content);
    // APK Debugging ke liye
    if (window.Capacitor) {
       console.log("Capacitor Sync: " + activeFile);
    }
  } catch (e) {
    console.warn("[Editor] Save failed:", e.message);
  }
}

// ================================================
// FIXED: RESTORE LOGIC (Safe Check)
// ================================================
function restoreFromLocalStorage() {
  if (typeof FILES === "undefined") return;

  Object.keys(FILES).forEach(function(fname) {
    const saved = localStorage.getItem('ds_file_' + fname);
    if (saved && saved.trim() !== "") {
      FILES[fname].content = saved;
      // UI Update trigger
      if (typeof conLog === "function") conLog('info', '↺ Restored: ' + fname);
    }
  });
  
  // Restore ke baad editor refresh lazmi hai
  if (typeof editor !== "undefined" && typeof currentFile !== "undefined") {
      editor.setValue(FILES[currentFile].content);
  }
}

// ... (triggerBuild same rahega) ...

// ================================================
// AUTO-SAVE (Slightly faster for mobile stability)
// ================================================
setInterval(syncEditorState, 20000); 

window.addEventListener('load', function() {
  setTimeout(function() {
    restoreFromLocalStorage();
  }, 800);
});
