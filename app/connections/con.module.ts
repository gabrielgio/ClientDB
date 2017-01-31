import {NgModule} from '@angular/core'
import {ConComponent} from './con.component'
import {ConnectionService} from '../service/ConnectionService'

@NgModule({
    declarations: [ConComponent],
    bootstrap: [ConComponent],
    providers: [ConnectionService]
})
export class ConModule {

}
