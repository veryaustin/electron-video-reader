const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

// Set mainWindow
let mainWindow;

// On App startup
app.on('ready', () => {
  // Create a new BrowserWindow
  mainWindow = new BrowserWindow({});

  // Use the node __dirname to load the index.html file into mainWindow using loadURL()
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

// Inter-process communication listen for the even "video:submit" sent from the mainWindow process
ipcMain.on('video:submit', (event, path) => {
  // Use ffmpeg probe to get the metadata about the video file.
  ffmpeg.ffprobe(path, (err, metadata) => {
    // Send the video metadata.format.duration (Video Duration) back to the mainWindow process using the "video:metadata event"
    mainWindow.webContents.send('video:metadata', metadata.format.duration);
  });
});