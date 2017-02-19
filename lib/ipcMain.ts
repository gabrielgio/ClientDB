const jetpack = require('fs-jetpack')
import {Client, Database, Collection} from 'documentdb-typescript'

export class IpcMain{
    constructor(private ipcMain){
        ipcMain.on('loadFile',this.loadFile)
        ipcMain.on('saveFile', this.saveFile)
        ipcMain.on('getDatabases', this.getDatabases)
        ipcMain.on('getInfo', this.getInfo);
        ipcMain.on('getCollections', this.getCollections);
        ipcMain.on('queryCollection', this.queryCollection)
    }

    private loadFile(event, arg){
        var data = jetpack.read(arg)
        var objs = data == null ? [] : JSON.parse(data)
        event.returnValue = objs
    }

    private saveFile(event, arg){
        jetpack.write(arg.fileName, JSON.stringify(arg.fileData))
        event.returnValue = null
    }

    private async getDatabases(event, arg){
        try {
            var client = new Client(arg.host, arg.key)
            await client.openAsync()
            var item = await client.listDatabasesAsync()
            event.sender.send('getDatabases-reply', item)
        }
        catch (e) {
            event.sender.send('getDatabases-reply', null)
        }
    }

    private async getInfo(event, arg){
        try {
            if (arg.host == null || arg.key == null ||
                arg.host == "" || arg.key == "") {
                event.sender.send('getInfo-reply', null)
                return
            }

            var client = new Client(arg.host, arg.key)
            await client.openAsync();
            var item = await client.getAccountInfoAsync()
            event.sender.send('getInfo-reply', item)
        }
        catch (e) {
            event.sender.send('getInfo-reply', null)
        }
    }

    private async getCollections(event, arg){
        try {
            var client = new Client(arg.host, arg.key)
            await client.openAsync();
            var db = new Database(arg.name, client)
            await db.openAsync();
            var item = await db.listCollectionsAsync()
            event.sender.send('getCollections-reply', item)
        }
        catch (e) {
            event.sender.send('getCollections-reply', null)
        }
    }

    private async queryCollection(event, arg){
        try {
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
        catch (e) {
            event.sender.send('queryCollection-reply', e.message)
        }
    }
}
