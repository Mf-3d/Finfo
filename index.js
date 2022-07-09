const electron = require("electron");

let win;
let winSize;

function nw() {
  win = new electron.BrowserWindow({
    width: 750, height: 500, minWidth: 500, minHeight: 500,
    frame: false,
    transparent: false,
    backgroundColor: '#ffffff',
    title: 'Finfo',
    titleBarStyle: 'hidden',
    // icon: `${__dirname}/src/image/logo.png`,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      nodeIntegration:false,
      contextIsolation: true,
      preload: `${__dirname}/preload/preload.js`
    }
  });

  winSize = win.getSize();

  win.loadFile(`${__dirname}/src/views/index.html`);
}

setInterval(async () => {
  let cpu = require("node-os-utils").cpu;
  win.webContents.send("update_status", {
    cpu: await cpu.usage(),
    memory: process.memoryUsage().rss
  });
}, 5000);

electron.app.on("ready", nw);