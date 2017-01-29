import {Routes, RouterModule} from '@angular/router'
import {CodemirrorComponent} from './codemirror/codemirror.component'
import {ConComponent} from './connections/con.component'
import {FormComponent} from './form/form.component'

const appRoutes: Routes = [
    {path: '', component: ConComponent},
    {path: 'shell', component: CodemirrorComponent},
    {path: 'add', component: FormComponent},
    {path: '**', component: ConComponent}
]

export const routing = RouterModule.forRoot(appRoutes, { useHash: true })


