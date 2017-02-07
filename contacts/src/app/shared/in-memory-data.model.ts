import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Contact } from '../contact/contact.model';


const CONTACTS: Contact[] = [
  new Contact( 1, 'Iliyan', 'Traykov', 'i.traykov@esof.net', 'Elin Pelin'),
    new Contact( 0, 'Desislava', 'Naydenova', 'chlouzie@gmail.com', 'Elin Pelin'),
    new Contact( 1, 'Kaloyan', 'Stoilov', 'k.stoilov13@gmail.com', 'Sofia'),
    new Contact( 0, 'Dobrina', 'Stoycheva', 'd.stoycheva@gmail.com', 'Sofia'),
];

export class InMemoryDataModel implements InMemoryDbService {
  public createDb() {
     return {
      contacts: CONTACTS
    };
  }
}
