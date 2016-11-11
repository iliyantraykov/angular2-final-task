import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactListComponent } from './contact/contact-list.component';


@NgModule({
    imports:[
        RouterModule.forRoot([
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'contacts', component: ContactListComponent}
        ])
    ],
    exports : [ RouterModule ],
})

export class AppRoutingModule {

}
