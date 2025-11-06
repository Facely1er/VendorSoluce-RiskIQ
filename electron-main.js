const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Keep a global reference of the window object
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    title: 'VendorSoluce™ RiskIQ - Enterprise Vendor Risk Management',
    icon: path.join(__dirname, 'public', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#f5f5f5',
    show: false // Don't show until ready
  });

  // Load the app
  const startUrl = app.isPackaged
    ? `file://${path.join(__dirname, 'dist', 'index.html')}`
    : 'http://localhost:3000';

  mainWindow.loadURL(startUrl);

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // Open DevTools in development
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  // Create application menu
  createMenu();

  // Handle window close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Open external links in default browser
    if (url.startsWith('http://') || url.startsWith('https://')) {
      require('electron').shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Export Data',
          accelerator: 'CmdOrCtrl+E',
          click: () => {
            mainWindow.webContents.send('menu-export');
          }
        },
        {
          label: 'Import Data',
          accelerator: 'CmdOrCtrl+I',
          click: () => {
            mainWindow.webContents.send('menu-import');
          }
        },
        { type: 'separator' },
        {
          label: 'Preferences',
          accelerator: 'CmdOrCtrl+,',
          click: () => {
            mainWindow.webContents.send('menu-preferences');
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Navigation',
      submenu: [
        {
          label: 'Dashboard',
          accelerator: 'CmdOrCtrl+1',
          click: () => {
            mainWindow.webContents.send('navigate', '/dashboard');
          }
        },
        {
          label: 'Vendors',
          accelerator: 'CmdOrCtrl+2',
          click: () => {
            mainWindow.webContents.send('navigate', '/vendors');
          }
        },
        {
          label: 'Assessments',
          accelerator: 'CmdOrCtrl+3',
          click: () => {
            mainWindow.webContents.send('navigate', '/assessments');
          }
        },
        {
          label: 'Settings',
          accelerator: 'CmdOrCtrl+4',
          click: () => {
            mainWindow.webContents.send('navigate', '/settings');
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation',
          click: () => {
            require('electron').shell.openExternal('https://vendorsoluce.com/docs');
          }
        },
        {
          label: 'Report Issue',
          click: () => {
            require('electron').shell.openExternal('https://vendorsoluce.com/support');
          }
        },
        { type: 'separator' },
        {
          label: 'Check for Updates',
          click: () => {
            mainWindow.webContents.send('check-updates');
          }
        },
        { type: 'separator' },
        {
          label: 'About VendorSoluce RiskIQ',
          click: () => {
            const version = app.getVersion();
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About VendorSoluce™ RiskIQ',
              message: `VendorSoluce™ RiskIQ`,
              detail: `Version: ${version}\n\nEnterprise Vendor Risk Management Platform\n\nA Supply Chain Assurance by ERMITS\n\n© ${new Date().getFullYear()} VendorSoluce. All rights reserved.`,
              buttons: ['OK']
            });
          }
        }
      ]
    }
  ];

  // Add DevTools menu in development
  if (!app.isPackaged) {
    template.push({
      label: 'Developer',
      submenu: [
        { role: 'toggledevtools' },
        { type: 'separator' },
        {
          label: 'Reload',
          accelerator: 'F5',
          click: () => {
            mainWindow.reload();
          }
        }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC Handlers for file system operations (if needed)
ipcMain.handle('save-file', async (event, data) => {
  try {
    if (!mainWindow) {
      return { success: false, error: 'Main window not available' };
    }

    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Save Export',
      defaultPath: path.join(app.getPath('documents'), 'vendorsoluce-export.json'),
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'CSV Files', extensions: ['csv'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (!canceled && filePath) {
      try {
        fs.writeFileSync(filePath, data);
        return { success: true, path: filePath };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    return { success: false, error: 'Save cancelled' };
  } catch (error) {
    return { success: false, error: error.message || 'Save operation failed' };
  }
});

ipcMain.handle('open-file', async (event) => {
  try {
    if (!mainWindow) {
      return { success: false, error: 'Main window not available' };
    }

    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      title: 'Import Data',
      defaultPath: app.getPath('documents'),
      filters: [
        { name: 'JSON Files', extensions: ['json'] },
        { name: 'CSV Files', extensions: ['csv'] },
        { name: 'All Files', extensions: ['*'] }
      ],
      properties: ['openFile']
    });

    if (!canceled && filePaths.length > 0) {
      try {
        const data = fs.readFileSync(filePaths[0], 'utf-8');
        return { success: true, data, path: filePaths[0] };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
    return { success: false, error: 'Open cancelled' };
  } catch (error) {
    return { success: false, error: error.message || 'Open operation failed' };
  }
});

// Get app version
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

// Get app path
ipcMain.handle('get-app-path', (event, name) => {
  return app.getPath(name);
});

// App lifecycle events
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked and no windows are open
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // On macOS, apps stay active until user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Handle app updates (can be enhanced with electron-updater)
app.on('ready', () => {
  // Auto-update logic can be added here
  // Only log in development mode
  if (!app.isPackaged) {
    console.log('VendorSoluce RiskIQ is ready!');
    console.log(`Version: ${app.getVersion()}`);
    console.log(`Environment: Development`);
  }
});

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, focus our window
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  // Always log uncaught exceptions for debugging
  console.error('Uncaught exception:', error);
  // Show user-friendly error dialog (only if dialog is available)
  try {
    if (dialog && typeof dialog.showErrorBox === 'function') {
      dialog.showErrorBox(
        'Application Error',
        `An unexpected error occurred. Please restart the application.\n\nError: ${error.message || 'Unknown error'}`
      );
    }
  } catch (dialogError) {
    // Fallback if dialog is not available
    console.error('Could not show error dialog:', dialogError);
  }
});

