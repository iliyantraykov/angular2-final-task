import { Injectable, Inject, Type } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Contact } from '../contact/contact.model';
import { BackendService } from './backend.service';

@Injectable()
export class BackendServiceHttp implements BackendService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(
    @Inject('API_BASE_URL') private baseUrl: string,
    private http: Http) { }

  public getAll(): Promise<Contact[]> {
    
    return this.http.get(this.baseUrl + '/contacts')
      .map(response => response.json().data as Contact[])
      .catch(this.handleErrorObservable)
      .toPromise();
  }

  public getContact( id: number): Promise<Contact> {
    return this.getAll().then(
      items => items.filter(item => item.id === id)[0]
    ).catch(err => {
      throw new Error(`Cannot find contact with id: ${id}`);
    });
  }

  public addContact(item: Contact): Promise<Contact> {
    return this.http.post(this.baseUrl + '/contacts', JSON.stringify(item), this.options)
      .toPromise()
      .then(res => res.json().data)
      .then(itemData => {
        return itemData;
      }).catch(this.handleErrorPromise);
  }

  public editContact(item: Contact): Promise<Contact> {
    return this.http.put(this.baseUrl + '/contacts/' + item.id, JSON.stringify(item), this.options)
      .toPromise()
      .then(() => {
        return item;
      }).catch(this.handleErrorPromise);
  }

  public deleteContact(itemId: number): Promise<void> {
    return this.http.delete(this.baseUrl + '/contacts/' + itemId)
      .toPromise()
      .then(response => {
        return;
      }).catch(this.handleErrorPromise);
  }

  private handleErrorObservable(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    // in a real world app, we may send the error to some remote logging infrastructure
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private handleErrorPromise(error: any) {
    // in a real world app, we may send the error to some remote logging infrastructure
    console.error(error);
    return Promise.reject(error.message || error.json().error || 'Server error');
  }


}
