import {
    Inject, NgZone, Injectable, ApplicationRef
} from '@angular/core'
import {ClientConnection, DatabseConnection, QueryConnection} from '../service/conService'


declare var ipcRenderer

export class SaveFile {
    public fileName: string
    public fileData: Object
}

@Injectable()
export class IpcService {

    constructor(@Inject(ApplicationRef) private ref: ApplicationRef,
                @Inject(NgZone) private ngZone: NgZone) {

    }

    public loadFile(fileName: string): Object {
        return ipcRenderer.sendSync('loadFile', fileName)
    }

    public getInfo(con: ClientConnection, callback, sender) {
        var self = this
        ipcRenderer.once('getInfo-reply', (event, args) => {
            self.ngZone.run(() => {
                callback(event, args, sender)
                self.ref.tick()
            })
        })
        ipcRenderer.send('getInfo', con)
    }

    public saveFile(saveFile: SaveFile) {
        ipcRenderer.sendSync('saveFile', saveFile)
    }

    public getDatabases(con: ClientConnection, callback, sender) {
        var self = this
        ipcRenderer.once('getDatabases-reply', (event, args) => {
            self.ngZone.run(() => {
                callback(event, args, sender)
                self.ref.tick()
            })
        })
        return ipcRenderer.send('getDatabases', con)
    }

    public getCollections(con: DatabseConnection, callback, sender) {
        var self = this
        ipcRenderer.once('getCollections-reply', (event, args) => {
            callback(event, args, sender)
        })
        return ipcRenderer.send('getCollections', con)
    }

    public queryCollection(con: QueryConnection, callback, sender) {
        var self = this
        ipcRenderer.once('queryCollection-reply', (event, args) => {
            self.ngZone.run(() => {
                callback(event, args, sender)
            });
        })
        return ipcRenderer.send('queryCollection', con)
    }

}