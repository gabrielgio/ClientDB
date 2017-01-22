const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const pug = require('electron-pug')({pretty: true});

let mainWindow

function createWindow() {

    mainWindow = new BrowserWindow({width: 1000, height: 800})

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/view/index.pug'),
        protocol: 'file:',
        slashes: true
    }))
    //mainWindow.openDevTools()
    mainWindow.setMenu(null);

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})