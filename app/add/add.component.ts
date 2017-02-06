import {
    Component, Inject, AfterContentInit, Input, ChangeDetectorRef, ChangeDetectionStrategy,
    NgZone
} from '@angular/core'
import {Router} from '@angular/router'
import {ConnectionService} from '../service/conService'
import {IpcService} from '../service/ipcService'

@Component({
    selector: 'add',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app/add/add.component.html'
})
export class AddComponent extends AfterContentInit {

    @Input() name: string
    @Input() host: string
    @Input() key: string
    @Input() passTest: boolean

    @Input() info

    private conService: ConnectionService
    private router: Router
    private ipc: IpcService
    private ref: ChangeDetectorRef
    private ngZone: NgZone
    private static add: AddComponent

    constructor(@Inject(ConnectionService) conService: ConnectionService,
                @Inject(Router)router: Router,
                @Inject(IpcService)ipc: IpcService,
                @Inject(ChangeDetectorRef) ref: ChangeDetectorRef,
                @Inject(NgZone)ngZone: NgZone) {
        super()
        this.conService = conService
        this.router = router
        this.ipc = ipc
        this.passTest = false
        this.ref = ref
        this.ngZone = ngZone

        AddComponent.add = this

        this.host = 'https://uvk-dev-db.documents.azure.com:443/'
        this.key = 'WaDxWXjFw9Hx5wATbysUeQ1LIhAYttog2RKWhCgvfXFqsG4hX7VTgMfOW5h8277dtLkI9g28xOsNbuXOfwnHoA=='
    }

    ngAfterContentInit(): void {
        this.ipc.getInfoReply(this.infoReply)
    }

    private infoReply(event, args) {

        //I dont know if this is right way to do it, but It is the only that I go it Working.
        AddComponent.add.ngZone.run(() => {
            if (args === null)
                AddComponent.add.passTest = false
            else {
                AddComponent.add.info = args
                AddComponent.add.passTest = true
            }
            AddComponent.add.ref.markForCheck()
        });
    }

    public testCon(event) {

        var info = this.ipc.getInfo({
            host: this.host,
            id: this.name,
            key: this.key
        })

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