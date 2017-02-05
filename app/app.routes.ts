import {ConComponent} from './con/con.component'
import {AddComponent} from './add/add.component'
import {Routes, RouterModule} from '@angular/router'

const appRoutes: Routes = [
    {path: '', component: ConComponent},
    {path: 'add', component: AddComponent}
]

export const routing = RouterModule.forRoot(appRoutes, { useHash: true })