import { Component, OnInit, Injectable,Pipe } from '@angular/core';
import { FormsModule , NgForm} from '@angular/forms'; 
import { Contact, Gender } from './contact.model';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { BackendService } from './../shared/backend.service'; 
import {Location} from '@angular/common';

@Component({
    selector: 'contact',
    template: `
    <h2>Contact Screen</h2>
    <h4 *ngIf="!isNewContact">Contact Modification</h4>
    <h4 *ngIf="isNewContact">Contact Add</h4>
    <form #contactForm=ngForm>
      <input type="hidden" [(ngModel)]="contact.id" name="id"/>
      <label>Name:</label>
      <input [(ngModel)]="contact.name" name="name" required/>
      <label>Family:</label>
      <input [(ngModel)]="contact.family" name="family" required/>
      <label>Address:</label>
      <input [(ngModel)]="contact.address" name="address" required/>
      <label>Email:</label>
      <input [(ngModel)]="contact.email" name="email" pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" required/>
      <label>Gender</label>
      <select [(ngModel)]="contact.gender" name="gender">
          <option *ngFor="let item of genders | keys" [value]="item.key">{{item.value}}</option>
        </select>  
        <button type="submit" [disabled]="!contactForm.valid" (click)="onSubmit(contactForm)">Submit</button>
    </form>

  `,
})

@Injectable()
export class ContactComponent implements OnInit{
  public selectedId: number; 
  public genders = Gender;
  public contact: Contact = {id: undefined, name: '', gender : 1, family : '', email : ''};
  public isNewContact: boolean;

  public constructor( private route: ActivatedRoute,
    private router: Router,
    private service:BackendService,
    private location : Location){}

  public ngOnInit(){
    this.route.params.forEach((params: Params) => {
      let id = +params['id']; // (+) converts string 'id' to a number
      if (id) {

        this.isNewContact = false; // has Id => not new
        this.service.getAll().then(contacts=> 
        { 
          let filtered = contacts.filter(el=> {return el.id == id;});
          this.contact  = filtered[0];
        });

      }else{
        this.isNewContact = true;
      }
    });
  }

  public onSubmit(form : NgForm){
      this.contact = form.form.getRawValue() as Contact;
      if (this.isNewContact) {
      this.service.addContact(this.contact);
      this.goBack();
    } else {
      this.service.editContact(this.contact);
      this.goBack();
    }
  }

  public goBack() {
    this.location.back();
    
  }

  public resetForm(cForm : NgForm) {
    cForm.reset(this.contact);
  }
}
