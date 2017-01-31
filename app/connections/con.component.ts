import {Component, AfterContentInit, Inject} from '@angular/core'
import {ConnectionService} from '../service/ConnectionService'
import {Connection} from '../service/Connection'


@Component({
    selector: 'con',
    templateUrl: './app/connections/con.component.html',
    providers: [ConnectionService]
})
export class ConComponent extends AfterContentInit {

    conService: ConnectionService

    public cons: Connection[]

    constructor(@Inject(ConnectionService) conService: ConnectionService) {
        super()
        this.conService = conService
    }

    ngAfterContentInit(): void {
        this.cons = this.conService.getConnections()
    }
}