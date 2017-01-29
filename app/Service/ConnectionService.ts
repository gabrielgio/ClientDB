import {Injectable} from '@angular/core'
import {Connection} from './Connection'

@Injectable()
export class ConnectionService{

    public saveConnection(con: Connection){

    }

    public getConnection(id: string): Connection{
        return {
            id: 'iaskdasjdk',
            host : 'htt://google.com',
            key: '89324iuohfdsmnfdsi9u'
        }
    }

    public getConnections():Connection[]{
        return [
            {
                id: 'iaskdasjdk',
                host : 'htt://google.com',
                key: '89324iuohfdsmnfdsi9u'
            },
            {
                id: 'iaskdasjdk',
                host : 'htt://google.com',
                key: '89324iuohfdsmnfdsi9u'
            },
            {
                id: 'iaskdasjdk',
                host : 'htt://google.com',
                key: '89324iuohfdsmnfdsi9u'
            }
        ]
    }
}