import {ConComponent} from './con/con.component'
import {Routes, RouterModule} from '@angular/router'

const appRoutes: Routes = [
    {path: '', component: ConComponent}
]

export const routing = RouterModule.forRoot(appRoutes, { useHash: true })