import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
    selector: 'contact-list',
    template: `
    <h2>Contact Screen</h2>
    <h4>Contact List</h4>
    <div>
      <ul>
        <li *ngFor="let contact of contacts" [class.selected]="contact.id === selectedId"  
           [title]="contact.name">
          <span (click)="selectItem(contact)">{{contact.id}} {{contact.name}} {{contact.family}}</span>
          <span (click)="deleteItem(contact.id); $event.stopPropagation()" title="Click to delete this contact.">X</span>
        </li>
      </ul>
      <button (click)="addItem()">Add Contact</button>
    </div>
  `,
})

export class ContactListComponent implements OnInit{
  public contacts: Contact[]= [];
    public selectedContact: Contact;
    public selectedId: number;

    constructor (private service: ContactService, private router: Router){}

    public ngOnInit () {
        this.service.getContacts().then(contacts =>{
          this.contacts = contacts;
        });
        console.log(this.contacts);
    }

    public selectItem(contact: Contact) {
      this.selectedId = contact.id;
      this.router.navigate(['.', { selectedId: contact.id }], { replaceUrl: true })
        .then(isSucces => this.router.navigate(['/contact', contact.id]));
    }

    public addItem(){
      this.selectedId = 0;
      this.router.navigate(['.'], { replaceUrl: true })
        .then(isSucces => this.router.navigate(['/contact']));
    }

    public deleteItem(itemId: number) {
      this.service.deleteContact(itemId);
  }
}
