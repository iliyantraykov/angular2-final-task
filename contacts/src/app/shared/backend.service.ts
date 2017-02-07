import { Type } from '@angular/core';
import { Contact } from './../contact/contact.model';

export abstract class BackendService {

  public getAll:() => Promise<Contact[]>;

  public abstract getContact(id: number): Promise<Contact>;

  public abstract addContact(item: Contact): Promise<Contact>;

  public abstract editContact(item: Contact): Promise<Contact>;

  public abstract deleteContact(itemId: number): Promise<void>;

}