"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
const config_1 = require("./configuration/config");
let mainWindow;
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        titleBarStyle: 'hidden',
        height: 600,
        width: 800,
        show: true,
        icon: path.join(__dirname, '../assets/icons/64x64.png'),
        title: 'Time of Changes',
        frame: true,
        resizable: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    if (!config_1.default.get('app').debug) {
        mainWindow.maximize();
        mainWindow.setFullScreen(true);
    }
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "../index.html"),
        protocol: "file:",
        slashes: true,
    }));
    // Open the DevTools.
    if (config_1.default.get('app').debug) {
        mainWindow.maximize();
        mainWindow.webContents.openDevTools();
    }
    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    electron_1.protocol.registerStringProtocol('tocgame', (request, callback) => {
        const uri = request.url;
        console.log(uri);
    });
    electron_1.app.setAsDefaultProtocolClient('tocgame://');
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on("ready", createWindow);
// Quit when all windows are closed.
electron_1.app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
electron_1.app.on("activate", () => {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
//# sourceMappingURL=main.js.map