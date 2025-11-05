const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  // File operations
  saveFile: (data) => ipcRenderer.invoke('save-file', data),
  openFile: () => ipcRenderer.invoke('open-file'),
  
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getAppPath: (name) => ipcRenderer.invoke('get-app-path', name),
  
  // Menu events
  onMenuExport: (callback) => ipcRenderer.on('menu-export', callback),
  onMenuImport: (callback) => ipcRenderer.on('menu-import', callback),
  onMenuPreferences: (callback) => ipcRenderer.on('menu-preferences', callback),
  onNavigate: (callback) => ipcRenderer.on('navigate', (event, path) => callback(path)),
  onCheckUpdates: (callback) => ipcRenderer.on('check-updates', callback),
  
  // Environment detection
  isElectron: true,
  platform: process.platform
});

// Log that preload script executed
console.log('Electron preload script loaded successfully');

