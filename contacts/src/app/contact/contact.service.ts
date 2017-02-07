import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { BackendService } from './../shared/backend.service';

@Injectable()
export class ContactService {
    private contacts: Contact[] = [];

    constructor(private backend: BackendService){}


    public getContacts(): Promise<Contact[]>{
        return this.backend.getAll().catch(err => console.log(`ContactService error: ${err}`));;
    }

    public getContact(id : number): Promise<Contact>{
        return this.backend.getContact(id);
    }

    public addContact(contact : Contact): Promise<Contact>{
        return this.backend.addContact(contact);
    }

     public editContact(contact : Contact): Promise<Contact>{
        return this.backend.editContact(contact);
    }

    public deleteContact(itemId : number) : Promise<void>{
        return this.backend.deleteContact(itemId).catch(err => console.log(`ContactService error: ${err}`));;
    }
}
