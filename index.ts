/// <reference path="typings/index.d.ts" />

import electron = require('electron')

//TODO: remove this line as soon I find out how solve namespace bug
//for some unknown reason it does find Electron namepace
import Electron = require('electron')

let app = electron.app
let dialog = electron.dialog
let BrowserWindow = electron.BrowserWindow
let Menu = electron.Menu

let mainWindow: Electron.BrowserWindow

function createWindow() {

    mainWindow = new Electron.BrowserWindow({width: 800, height: 600})
    Menu.setApplicationMenu(null)

    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)