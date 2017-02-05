import {Component, Inject} from '@angular/core'
import {Router} from '@angular/router'
import {ConnectionService} from '../service/conService'
import {IpcService} from '../service/ipcService'

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
    private ipc: IpcService

    constructor(@Inject(ConnectionService) conService: ConnectionService, @Inject(Router)router: Router, @Inject(IpcService)ipc: IpcService) {
        this.conService = conService
        this.router = router
        this.ipc = ipc
    }

    public testCon(event) {
        var info = this.ipc.getInfo({
            host: this.host,
            id: this.name,
            key: this.key
        })

        if(info)
            alert('NAO FOI KRL!')
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