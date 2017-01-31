import {Injectable, Inject} from '@angular/core'
import {Connection} from './Connection'
import {IpcService} from "./IpcService";

declare var ipcRenderer

@Injectable()
export class ConnectionService {

    private ipc: IpcService;

    constructor(@Inject(IpcService) ipc: IpcService) {
        this.ipc = ipc;
    }

    public saveConnection(con: Connection) {
        console.log(ipcRenderer.sendSync('save', 'ping'))
    }

    public getConnection(id: string): Connection {
        return {
            id: 'iaskdasjdk',
            host: 'htt://google.com',
            key: '89324iuohfdsmnfdsi9u'
        }
    }

    public getConnections(): Connection[] {
        return this.loadData()
    }

    private loadData(): Connection[] {
        return <Connection[]> this.ipc.loadFile('config.json')
    }

    private saveData(cons: Connection[]) {
        this.ipc.saveFile({
            fileData: cons,
            fileName: 'config.json'
        });
    }
}