import { NgModule } from '@angular/core';
import { LocalIsoDateValueAccessor } from './local-iso-date-value-accessor';

@NgModule({
  imports: [LocalIsoDateValueAccessor],
  exports: [LocalIsoDateValueAccessor]
})
export class LocalIsoDateValueAccessorModule { }
