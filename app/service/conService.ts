import {Injectable, Inject} from '@angular/core'
import {IpcService} from "./ipcService";

export class Connection {

    public host: string
    public key: string
    public id: string
}

@Injectable()
export class ConnectionService {

    private ipc: IpcService;

    constructor(@Inject(IpcService) ipc: IpcService) {
        this.ipc = ipc;
    }

    public saveConnection(con: Connection) {
        var cons = this.loadData()
        cons.push(con)
        this.saveData(cons)
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
        return <Connection[]> this.ipc.loadFile('./config.json')
    }

    private saveData(cons: Connection[]) {
        this.ipc.saveFile({
            fileData: cons,
            fileName: './config.json'
        });
    }
}