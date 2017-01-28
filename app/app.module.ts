import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppComponent} from './app.component'
import {CodemirrorComponent} from './codemirror/codemirror.component'
import {ConComponent} from './connections/con.component'
import {routing} from './app.routes'



@NgModule({
    imports: [BrowserModule, routing],
    declarations: [AppComponent, CodemirrorComponent, ConComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
