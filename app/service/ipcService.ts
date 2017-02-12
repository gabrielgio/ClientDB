import {Injectable} from '@angular/core'
import {ClientConnection, DatabseConnection, QueryConnection} from '../service/conService'

declare var ipcRenderer

export class SaveFile {
    public fileName: string
    public fileData: Object
}

@Injectable()
export class IpcService {

    public loadFile(fileName: string): Object {
        return ipcRenderer.sendSync('loadFile', fileName)
    }

    public saveFile(saveFile: SaveFile) {
        ipcRenderer.sendSync('saveFile', saveFile)
    }

    public getInfo(con: ClientConnection) {
        return ipcRenderer.send('getInfo', con)
    }

    public getDatabases(con: ClientConnection) {
        return ipcRenderer.send('getDatabases', con)
    }

    public getCollections(con: DatabseConnection) {
        return ipcRenderer.send('getCollections', con)
    }

    public queryCollection(con: QueryConnection) {
        return ipcRenderer.send('queryCollection', con)
    }

    public queryCollectionReplay(callback, sender){
        ipcRenderer.on('queryCollection-reply', (event, args) =>{
            callback(event, args, sender)
        })
    }

    public getCollectionsReplay(callback, sender){
        ipcRenderer.on('getCollections-reply', (event, args) =>{
            callback(event, args, sender)
        })
    }

    public getDatabasesReplay(callback, sender){
        ipcRenderer.on('getDatabases-reply', (event, args) =>{
            callback(event, args, sender)
        })
    }

    public getInfoReply(callback, sender){
        ipcRenderer.on('getInfo-reply', (event, args) =>{
            callback(event, args, sender)
        })
    }
}