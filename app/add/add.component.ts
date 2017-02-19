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
    @Input() isLoading: boolean

    @Input() info

    private conService: ConnectionService
    private router: Router
    private ipc: IpcService
    private ref: ChangeDetectorRef
    private ngZone: NgZone

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
        this.isLoading = false
        this.ref = ref
        this.ngZone = ngZone

        this.name = ''
        this.host = ''
        this.key = ''
    }

    ngAfterContentInit(): void {
        this.ipc.getInfoReply(this.infoReply, this)
    }

    private infoReply(event, args, sender) {

        var self = <AddComponent> sender;

        self.ngZone.run(() => {
            if (args === null)
                self.passTest = false
            else {
                self.info = args
                self.passTest = true
            }
            self.isLoading = false
            self.ref.markForCheck()
        });
    }

    public testCon(event) {
        this.isLoading = true
        this.passTest = false
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