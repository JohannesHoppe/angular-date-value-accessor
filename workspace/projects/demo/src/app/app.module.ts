import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DateValueAccessorModule, LocalDateValueAccessorModule } from 'projects/date-value-accessor/src/public-api';

import { AppComponent } from './app.component';
import { ReactiveFormComponent } from './demo-with-dates/reactive-form/reactive-form.component';
import { ExplanationDateValueAccessorComponent } from './shared/explanation-date-value-accessor.component';
import { ExplanationDefaultValueAccessorComponent } from './shared/explanation-default-value-accessor.component';
import { ExplanationLocalDateValueAccessorComponent } from './shared/explanation-local-date-value-accessor.component';
import { TemplateDrivenFormComponent } from './demo-with-dates/template-driven-form/template-driven-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    ExplanationDateValueAccessorComponent,
    ExplanationLocalDateValueAccessorComponent,
    ExplanationDefaultValueAccessorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DateValueAccessorModule,
    LocalDateValueAccessorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
