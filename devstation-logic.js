'use strict';

const DevStationLogic = {
  version: "2026.03.15",
  status:  "Active",

  notifyUser: function(msg) {
    if (typeof notify === "function") notify('info', msg);
    else console.info(`[DevStation]: ${msg}`);
  }
};

function syncEditorState() {
  if (typeof editor === "undefined" || !editor) return;
  const activeFile = typeof currentFile !== "undefined" ? currentFile : 'index.html';
  try {
    localStorage.setItem('ds_file_' + activeFile, editor.getValue());
  } catch (e) {
    console.error("Save failed:", e);
  }
}

function restoreFromLocalStorage() {
  if (typeof FILES === "undefined") return;
  Object.keys(FILES).forEach(fname => {
    const saved = localStorage.getItem('ds_file_' + fname);
    if (saved && saved.trim() !== "") {
      FILES[fname].content = saved;
    }
  });
}

// Auto-save every 20 seconds
setInterval(syncEditorState, 20000);

window.addEventListener('load', () => {
  setTimeout(() => {
    restoreFromLocalStorage();
    console.log("DevStation Core Ready");
  }, 1000);
});
