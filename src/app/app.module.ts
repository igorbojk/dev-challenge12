import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {MzButtonModule, MzInputModule} from 'ng2-materialize';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MzInputModule,
    MzButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
