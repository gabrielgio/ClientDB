import {NgModule, NgZone} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppComponent} from './app.component'
import {ConComponent} from './con/con.component'
import {AddComponent} from './add/add.component'
import {routing} from './app.routes'
import {ConnectionService} from './service/conService'
import {IpcService} from "./service/ipcService";

@NgModule({
    imports: [BrowserModule, routing],
    declarations: [AppComponent,ConComponent, AddComponent],
    bootstrap: [AppComponent],
    providers: [ConnectionService, IpcService]
})
export class AppModule {
}