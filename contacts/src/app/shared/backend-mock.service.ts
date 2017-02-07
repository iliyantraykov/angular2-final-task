import { Injectable } from '@angular/core';
import { Contact } from './../contact/contact.model';
import { ContactsPage } from './../../../e2e/app.po';
import { BackendService } from './backend.service';

const CONTACTS: Contact[] = [   
    new Contact( 1, 'Iliyan', 'Traykov', 'i.traykov@esof.net', 'Elin Pelin'),
    new Contact( 0, 'Desislava', 'Naydenova', 'chlouzie@gmail.com', 'Elin Pelin'),
    new Contact( 1, 'Kaloyan', 'Stoilov', 'k.stoilov13@gmail.com', 'Sofia'),
    new Contact( 0, 'Dobrina', 'Stoycheva', 'd.stoycheva@gmail.com', 'Sofia'),
];

@Injectable()
export class BackendServiceMock implements BackendService {
    public getAll(): Promise<any> {
        return Promise.resolve(CONTACTS);
    }

    public addContact(contact : Contact) : Promise<Contact>{
        contact.id = this.getNextId(CONTACTS);
        CONTACTS.push(contact);
        return Promise.resolve(contact);
    }

    public getContact(id : number) : Promise<Contact>{
        return this.getAll().then(
            items => items.filter(item => item.id === id)[0]
        ).catch(err => {
            throw new Error(`Cannot find object with id: ${id}`);
        });
    }

    private getNextId(collection: Contact[]): number {
    return collection.reduce((prevMaxId, next) =>
      next.id > prevMaxId ? next.id : prevMaxId, 0) + 1;
  }

    public editContact(contact: Contact){
        let isSuccessful = false;
        let err = new Error(`Contact with ID:${contact.id} does not exist: ${JSON.stringify(contact)}.`);  
        for (let i = 0; i < CONTACTS.length; i++) {
            if (CONTACTS[i].id === contact.id) {
                Object.assign(CONTACTS[i], contact);
                isSuccessful = true;
            }
        }  
        return isSuccessful ? Promise.resolve(contact) : Promise.reject<Contact>(err);
    }

    public deleteContact(id: number) : Promise<void>{
        for (let i = 0; i < CONTACTS.length; i++) {
            if (CONTACTS[i].id === id) {
                CONTACTS.splice(i, 1)[0];
                return Promise.resolve(id);
            }
        }
        return Promise.reject(id);
    }
}
