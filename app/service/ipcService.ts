import {Injectable} from '@angular/core'
import {Connection} from '../service/conService'

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

    public getInfo(con: Connection) {
        return ipcRenderer.send('getInfo', con)
    }

    public getInfoReply(callback){
        ipcRenderer.on('getInfo-reply', callback)
    }
}