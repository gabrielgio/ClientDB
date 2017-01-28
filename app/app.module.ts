import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {AppComponent} from './app.component'
import {CodemirrorComponent} from './codemirror/codemirror.component'

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent, CodemirrorComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
