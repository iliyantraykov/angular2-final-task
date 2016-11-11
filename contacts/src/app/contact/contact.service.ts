import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { BackendService } from './../shared/backend.service';

@Injectable()
export class ContactService {
    private contacts: Contact[] = [];

    constructor(private backend: BackendService){}

    public getContacts(): Promise<Contact[]>{
        return this.backend.getAll().catch(err => console.log(`ProductService error: ${err}`));;
    }
}