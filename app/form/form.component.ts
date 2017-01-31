import {Component, Inject} from '@angular/core'
import {ConnectionService} from '../service/ConnectionService'

declare var $
declare var CodeMirror

@Component({
    selector: 'formcon',
    templateUrl: './app/form/form.component.html'
})
export class FormComponent {
    public name: string
    public host: string
    public key: string

    private conService: ConnectionService

    constructor(@Inject(ConnectionService) conService: ConnectionService) {
        this.conService = conService
    }

    public save(event) {
        event.preventDefault()

        this.conService.saveConnection({
            id: this.name,
            key: this.key,
            host: this.host
        })
    }

}