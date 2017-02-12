import {Injectable, Inject} from '@angular/core'
import {IpcService} from "./ipcService";

export class ClientConnection {

    public host: string
    public key: string
    public id: string
}

export class DatabseConnection extends ClientConnection{
    public name: string
}

export class CollectionConnection extends DatabseConnection{
    public collection: string
}

export class QueryConnection extends CollectionConnection{
    public query: string
}

@Injectable()
export class ConnectionService {

    private ipc: IpcService;

    constructor(@Inject(IpcService) ipc: IpcService) {
        this.ipc = ipc;
    }

    public saveConnection(con: ClientConnection) {
        var cons = this.loadData()
        cons.push(con)
        this.saveData(cons)
    }

    public getConnection(id: string): ClientConnection {
        return {
            id: 'iaskdasjdk',
            host: 'htt://google.com',
            key: '89324iuohfdsmnfdsi9u'
        }
    }

    public getConnections(): ClientConnection[] {
        return this.loadData()
    }

    private loadData(): ClientConnection[] {
        return <ClientConnection[]> this.ipc.loadFile('./config.json')
    }

    private saveData(cons: ClientConnection[]) {
        this.ipc.saveFile({
            fileData: cons,
            fileName: './config.json'
        });
    }
}