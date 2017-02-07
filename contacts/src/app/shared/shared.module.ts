import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule }       from '@angular/platform-browser';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataModel } from './in-memory-data.model';
import { BackendService }      from './backend.service';
import { BackendServiceMock } from './backend-mock.service';
import { BackendServiceHttp } from './backend-http.service';
@NgModule({
   imports:[
      BrowserModule,
      HttpModule,
      InMemoryWebApiModule.forRoot(InMemoryDataModel)
   ],
    providers: [
        { provide: 'API_BASE_URL', useValue: '/api' },
        {provide: BackendService, useClass: BackendServiceHttp}
    ],
    declarations: [],
    exports: []
}) 

export class SharedModule {}

