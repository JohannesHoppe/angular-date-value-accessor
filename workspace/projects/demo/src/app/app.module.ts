import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IsoDateValueAccessorModule } from 'projects/date-value-accessor/src/lib/iso-date-value-accessor.module';
import { DateValueAccessorModule, LocalDateValueAccessorModule } from 'projects/date-value-accessor/src/public-api';

import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './demo-with-dates/reactive-form/reactive-form.component';
import { TemplateDrivenFormComponent } from './demo-with-dates/template-driven-form/template-driven-form.component';
import { ReactiveFormIsoComponent } from './demo-with-strings/reactive-form-iso/reactive-form-iso.component';
import {
  TemplateDrivenFormIsoComponent,
} from './demo-with-strings/template-driven-form-iso/template-driven-form-iso.component';
import { ExplanationDateValueAccessorComponent } from './shared/explanation-date-value-accessor.component';
import { ExplanationDefaultValueAccessorComponent } from './shared/explanation-default-value-accessor.component';
import { ExplanationLocalDateValueAccessorComponent } from './shared/explanation-local-date-value-accessor.component';


@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    TemplateDrivenFormIsoComponent,
    ReactiveFormIsoComponent,
    ExplanationDateValueAccessorComponent,
    ExplanationLocalDateValueAccessorComponent,
    ExplanationDefaultValueAccessorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DateValueAccessorModule,
    LocalDateValueAccessorModule,
    IsoDateValueAccessorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
