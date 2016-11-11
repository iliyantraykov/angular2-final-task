import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {KeysPipe} from './keys-pipe.pipe';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [KeysPipe],
  exports: [KeysPipe]
})
export class PipesModule { }
