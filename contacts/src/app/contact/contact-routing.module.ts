import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
import { ContactListComponent } from './contact-list.component';

@NgModule({
    imports :[
        RouterModule.forChild([
            { path : 'contacts', component: ContactListComponent},
            { path : 'contact/:id', component : ContactComponent, data : {title : 'Edit Contact'}},
            { path : 'contact', component : ContactComponent, data : {title : 'Add Contact'}},
        ])
    ], 
    exports : [ RouterModule ],
})

export class ContactRoutingModule {}
