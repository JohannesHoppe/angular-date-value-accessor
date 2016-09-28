import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// IMPORTANT: importing & declaring the DateValueAccessor
import { DateValueAccessor } from './shared/date-value-accessor';

@NgModule({
  declarations: [
    AppComponent,
    DateValueAccessor
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
