import {Injectable} from '@angular/core'

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

}