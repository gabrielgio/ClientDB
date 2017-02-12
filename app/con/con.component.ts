import {Component, AfterContentInit, Inject} from '@angular/core'
import {ConnectionService, ClientConnection} from '../service/conService'


@Component({
    selector: 'con',
    templateUrl: './app/con/con.component.html',
    providers: [ConnectionService]
})
export class ConComponent extends AfterContentInit {

    conService: ConnectionService

    public cons: ClientConnection[]

    constructor(@Inject(ConnectionService) conService: ConnectionService) {
        super()
        this.conService = conService
    }

    ngAfterContentInit(): void {
        this.cons = this.conService.getConnections()
    }
}