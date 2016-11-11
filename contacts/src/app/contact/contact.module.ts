import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ContactComponent } from './contact.component';
import { ContactListComponent } from './contact-list.component';
import { ContactService } from './contact.service';
import { ContactRoutingModule } from './contact-routing.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './../pipes/pipes.module';



@NgModule({
    imports : [BrowserModule, ContactRoutingModule, FormsModule,PipesModule],
    declarations : [ContactComponent, ContactListComponent],
    exports : [ContactComponent, ContactListComponent],
    providers: [ContactService]
})

export class ContactModule {}
