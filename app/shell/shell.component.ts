import {
    Component, Inject, AfterContentInit, Input, ChangeDetectorRef, ChangeDetectionStrategy,
    NgZone
} from '@angular/core'
import {Router} from "@angular/router";
import {ConnectionService, ClientConnection} from '../service/conService'
import {IpcService} from '../service/ipcService'

declare var CodeMirror

@Component({
    selector: 'shell',
    templateUrl: './app/shell/shell.component.html'
})
export class ShellComponent extends AfterContentInit {

    private conService: ConnectionService
    private router: Router
    private ipc: IpcService

    cons: ClientConnection[]
    dbs
    collections

    selectedCon
    selectedDb
    selectedCol

    codeInput
    codeOutput

    constructor(@Inject(ConnectionService) conService: ConnectionService,
                @Inject(Router)router: Router,
                @Inject(IpcService) ipc: IpcService) {
        super()
        this.conService = conService
        this.router = router
        this.ipc = ipc
    }

    public onConChange(item) {
        var con: ClientConnection

        this.cons.forEach(x => {
            if (x.id == item) {
                con = x
            }
        })

        this.selectedCon = con
    }

    public play() {
        this.ipc.queryCollection({
            id: this.selectedCon.id,
            key: this.selectedCon.key,
            name: this.selectedDb.id,
            host: this.selectedCon.host,
            collection: this.selectedCol.id,
            query: this.codeInput.getValue()
        }, this.queryCollectionReplay, this)
    }

    public onColChange(item) {
        var col

        this.cons.forEach(x => {
            if (x.id == item) {
                col = x
            }
        })

        this.selectedCol = col
    }

    public onDbChange(item) {
        var db

        this.dbs.forEach(x => {
            if (x.id == item) {
                db = x
            }
        })

        this.selectedDb = db
        this.ipc.getCollections({
            id: this.selectedCon.id,
            key: this.selectedCon.key,
            name: this.selectedDb.id,
            host: this.selectedCon.host,
        }, this.getCollectionsReplay, this)
    }

    private getDatabasesReplay(event, args, sender) {
        var self = <ShellComponent> sender;

        if (args != null) {
            sender.dbs = args
            self.selectedDb = self.dbs[0]
            self.ipc.getCollections({
                id: self.selectedCon.id,
                key: self.selectedCon.key,
                name: self.selectedDb.id,
                host: self.selectedCon.host,
            }, self.getCollectionsReplay, self);
        }
    }

    private getCollectionsReplay(event, args, sender) {
        var self = <ShellComponent> sender;

        if (args != null) {
            self.collections = args
            if (self.collections.length > 0)
                self.selectedCol = self.collections[0]
            else
                self.selectedCol = []
        }
    }


    private queryCollectionReplay(event, args, sender) {

        var self = <ShellComponent> sender;
        if (args != null) {
            self.codeOutput.setValue(JSON.stringify(args, null, 2))
        }
    }

    ngAfterContentInit(): void {

        this.cons = this.conService.getConnections()

        if (this.cons.length > 0) {
            this.selectedCon = this.cons[0]
            this.ipc.getDatabases(this.selectedCon, this.getDatabasesReplay, this)
        }

        this.codeInput = CodeMirror.fromTextArea(document.getElementById('textInputCode'), {
            lineNumbers: true,
            lineWrapping: true,
            mode: "text/x-sql"
        });

        this.codeInput.setValue('select * from main')

        this.codeOutput = CodeMirror.fromTextArea(document.getElementById('textOutputCode'), {
            lineNumbers: true,
            lineWrapping: true,
            mode: "application/json"
        });

        this.codeOutput.setValue('{\n\t"hello" : "world"\n}')
    }
}