import {Component, Inject} from '@angular/core'
import {Router} from '@angular/router'
import {ConnectionService} from '../service/ConnectionService'

declare var $
declare var $scope
declare var CodeMirror

@Component({
    selector: 'formcon',
    templateUrl: './app/form/form.component.html'
})
export class FormComponent {
    name = ''
    host = ''
    key = ''

    private conService: ConnectionService
    private router: Router

    constructor(@Inject(ConnectionService) conService: ConnectionService, @Inject(Router)router: Router) {
        this.conService = conService
        this.router = router;
    }

    public save(event) {
        event.preventDefault()

        this.conService.saveConnection({
            id: this.name,
            key: this.key,
            host: this.host
        })

        this.router.navigateByUrl('/');

    }

}