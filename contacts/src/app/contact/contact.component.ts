import { Component, OnInit, Injectable,Pipe } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Contact, Gender } from './contact.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BackendService } from './../shared/backend.service'; 

@Component({
    selector: 'contact',
    template: `
    <h2>Contact Screen</h2>
    <h4>Contact Modification</h4>
    <form>
      <label>Name:</label>
      <input [(ngModel)]="contact.name" name="name" />
      <label>Family:</label>
      <input [(ngModel)]="contact.family" name="family" />
      <label>Address:</label>
      <input [(ngModel)]="contact.address" name="address" />
      <label>Email:</label>
      <input [(ngModel)]="contact.email" name="email" />
      <label>Gender</label>
      <select [(ngModel)]="contact.gender" name="gender">
          <option *ngFor="let item of genders | keys" [value]="item.key">{{item.value}}</option>
        </select>  
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
    private service:BackendService){}

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
console.log(JSON.stringify(this.contact));
        //     this.service.getProduct(id).then(
        //       product => {
        //         this.product = product;
        //         this.resetForm();
        // });
      }
    });
  }
}
