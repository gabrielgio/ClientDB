/// <reference path="typings/index.d.ts" />

import {Client, Database, Collection} from 'documentdb-typescript'
import electron = require('electron')
import {IpcMain} from './lib/ipcMain'

//TODO: I shall remove this line as soon I find out how to solve this namespace bug
//for some unknown reason it does not find Electron namepace
import Electron = require('electron')
const jetpack = require('fs-jetpack')

let app = electron.app
let dialog = electron.dialog
let ipcMain = electron.ipcMain
let BrowserWindow = electron.BrowserWindow
let Menu = electron.Menu

let mainWindow: Electron.BrowserWindow

new IpcMain(ipcMain)


function createWindow() {
    let screen = require('electron').screen

    mainWindow = new Electron.BrowserWindow(screen.getPrimaryDisplay().workArea)

    mainWindow.loadURL(`file://${__dirname}/index.html`)
    mainWindow.openDevTools()
    if (process.platform !== 'darwin')
        mainWindow.setMenuBarVisibility(false);
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