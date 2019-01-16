// Modules to control application life and create native browser window
const electron = require('electron')
const { app, globalShortcut, BrowserWindow } = electron

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
  mainWindow = new BrowserWindow({
    width: width, // 使用electron.screen.getPrimaryDisplay().workAreaSize.width获取
    height: height, // 使用electron.screen.getPrimaryDisplay().workAreaSize.hight获取
    title: 'Artiley 系统',
    // fullscreen: true, // 全屏窗口
    // // kiosk: true, // 服务亭模式
    // frame: false, // 是否显示窗口边缘框架
    // backgroundColor: '#fff',
    // resizable: false, // 不可更改窗口尺寸
    // maximizable: true, // 支持最大化
    // show: false, // 为了让初始化窗口显示无闪烁，先关闭显示，等待加载完成后再显示。
  })
  // mainWindow.setFullScreen(true)
  // globalShortcut.register('ESC', () => {
  //   mainWindow.setFullScreen(false)
  // })
  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL('http://localhost:8080')
  mainWindow.webContents.openDevTools()
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  require('./electron/mainProcess/menu.js')

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
