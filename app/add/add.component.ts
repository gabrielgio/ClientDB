import {
    Component, Inject, AfterContentInit, Input, ChangeDetectorRef, ChangeDetectionStrategy,
    NgZone, OnDestroy
} from '@angular/core'
import {Router} from '@angular/router'
import {ConnectionService} from '../service/conService'
import {BaseService} from '../service/baseService'
import {IpcService} from '../service/ipcService'

declare var $

@Component({
    selector: 'add',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app/add/add.component.html'
})
export class AddComponent implements AfterContentInit, OnDestroy {

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
    private base: BaseService

    constructor(@Inject(ConnectionService) conService: ConnectionService,
                @Inject(Router)router: Router,
                @Inject(IpcService)ipc: IpcService,
                @Inject(ChangeDetectorRef) ref: ChangeDetectorRef,
                @Inject(BaseService) base: BaseService,
                @Inject(NgZone)ngZone: NgZone) {
        this.conService = conService
        this.router = router
        this.ipc = ipc
        this.passTest = false
        this.isLoading = false
        this.ref = ref
        this.ngZone = ngZone
        this.base = base;

        this.name = ''
        this.host = ''
        this.key = ''
    }

    ngAfterContentInit(): void {
        //this.ipc.getInfoReply(this.infoReply, this)
    }

    ngOnDestroy() {

    }

    private infoReply(event, args, sender) {

        var self = <AddComponent> sender;

        self.ngZone.run(() => {
            if (args === null) {
                self.passTest = false
                self.base.notify('This is not a valid connection', 'inverse');
            }
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
        var info = this.ipc.getInfoOnce({
            host: this.host,
            id: this.name,
            key: this.key
        }, this.infoReply, this)

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