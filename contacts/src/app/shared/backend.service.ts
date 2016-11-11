import { Injectable } from '@angular/core';
import { Contact } from './../contact/contact.model';

const CONTACTS: Contact[] = [   
    new Contact( 1, 'Iliyan', 'Traykov', '0889545655', 'Elin Pelin'),
    new Contact( 0, 'Desislava', 'Naydenova', '654545454', 'Elin Pelin'),
    new Contact( 1, 'Kaloyan', 'Stoilov', '0889721015', 'Sofia'),
    new Contact( 0, 'Dobrina', 'Stoycheva', '0889545655', 'Sofia'),
];

@Injectable()
export class BackendService {
    public getAll(): Promise<any> {
        return Promise.resolve(CONTACTS);
    }
}
