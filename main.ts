import {SaveFile} from './app/service/IpcService'

declare var __dirname
declare var process

declare function require(name:string)
const electron = require('electron')
const jetpack = require('fs-jetpack')

const app = electron.app
const ipc = electron.ipcMain;

const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')

let mainWindow


ipc.on('loadFile', function(event, arg) {
    var data = jetpack.read(arg)
    var objs = data == null ? [] : JSON.parse(data)
    event.returnValue = objs
});

ipc.on('saveFile', function(event, arg: SaveFile) {
    jetpack.write(arg.fileName, JSON.stringify(arg.fileData))
    event.returnValue = null
});


function createWindow() {

    mainWindow = new BrowserWindow({width: 1000, height: 800})

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/index.html'),
        protocol: 'file:',
        slashes: true,
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