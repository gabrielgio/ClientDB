import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppComponent} from './app.component'
import {ConComponent} from './con/con.component'
import {routing} from './app.routes'
import {ConnectionService} from './service/conService'
import {IpcService} from "./service/ipcService";

@NgModule({
    imports: [BrowserModule, routing],
    declarations: [AppComponent,ConComponent],
    bootstrap: [AppComponent],
    providers: [ConnectionService, IpcService]
})
export class AppModule {
}