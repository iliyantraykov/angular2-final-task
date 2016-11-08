import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ContactComponent } from './contact.component';

@NgModule({
    imports : [BrowserModule],
    declarations : [ContactComponent],
    exports : [ContactComponent],
})

export class ContactModule {}
