import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {MzButtonModule, MzIconMdiModule, MzIconModule, MzInputModule, MzToastService} from 'ng2-materialize';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MzInputModule,
    MzIconModule,
    MzButtonModule,
    MzIconMdiModule
  ],
  providers: [MzToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
