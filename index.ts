/// <reference path="typings/index.d.ts" />

import {Client, Database, Collection} from 'documentdb-typescript'
import electron = require('electron')

//TODO: I shall remove this line as soon I find out how to solve this namespace bug
//for some unknown reason it does find Electron namepace
import Electron = require('electron')
const jetpack = require('fs-jetpack')

let app = electron.app
let dialog = electron.dialog
let ipcMain = electron.ipcMain
let BrowserWindow = electron.BrowserWindow
let Menu = electron.Menu

let mainWindow: Electron.BrowserWindow

ipcMain.on('loadFile', function (event, arg) {
    var data = jetpack.read(arg)
    var objs = data == null ? [] : JSON.parse(data)
    event.returnValue = objs
});

ipcMain.on('saveFile', function (event, arg) {
    jetpack.write(arg.fileName, JSON.stringify(arg.fileData))
    event.returnValue = null
});


ipcMain.on('getDatabases', async function (event, arg) {
    try{
        var client = new Client(arg.host, arg.key)
        await client.openAsync();
        var item = await client.listDatabasesAsync()
        event.sender.send('getDatabases-reply', item)
    }
    catch(e) {
        event.sender.send('getDatabases-reply', null)
    }
});

ipcMain.on('getDatabases', async function (event, arg) {
    try{
        var client = new Client(arg.host, arg.key)
        await client.openAsync();
        var item = await client.getAccountInfoAsync()
        event.sender.send('getInfo-reply', item)
    }
    catch(e) {
        event.sender.send('getInfo-reply', null)
    }
});

ipcMain.on('getCollections', async function (event, arg) {
    try{
        var client = new Client(arg.host, arg.key)
        await client.openAsync();
        var db = new Database(arg.name, client)
        await db.openAsync();
        var item = await db.listCollectionsAsync()
        event.sender.send('getCollections-reply', item)
    }
    catch(e) {
        event.sender.send('getCollections-reply', null)
    }
});

ipcMain.on('queryCollection', async function (event, arg) {
    try{
        var client = new Client(arg.host, arg.key)
        await client.openAsync();
        var db = new Database(arg.name, client)
        await db.openAsync();
        var col = await new Collection(arg.collection, db)
        await col.openAsync()
        var q = col.queryDocuments(arg.query)
        var item = await q.toArray()
        event.sender.send('queryCollection-reply', item)
    }
    catch(e) {
        event.sender.send('queryCollection-reply', e.message)
    }
});


function createWindow() {
    let screen = require('electron').screen

    mainWindow = new Electron.BrowserWindow(screen.getPrimaryDisplay().workArea)
    Menu.setApplicationMenu(null)
    mainWindow.loadURL(`file://${__dirname}/index.html`)
    
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)