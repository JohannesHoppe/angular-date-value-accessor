import { NgModule } from '@angular/core';
import { LocalDateValueAccessor } from './local-date-value-accessor';

@NgModule({
  imports: [LocalDateValueAccessor],
  exports: [LocalDateValueAccessor]
})
export class LocalDateValueAccessorModule { }
