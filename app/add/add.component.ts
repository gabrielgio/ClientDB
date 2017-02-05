import {Component, Inject} from '@angular/core'
import {Router} from '@angular/router'
import {ConnectionService} from '../service/conService'

@Component({
    selector: 'add',
    templateUrl: './app/add/add.component.html'
})
export class AddComponent {
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