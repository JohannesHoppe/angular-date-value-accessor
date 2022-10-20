import { NgModule } from '@angular/core';
import { IsoDateValueAccessor } from './iso-date-value-accessor';

@NgModule({
  imports: [IsoDateValueAccessor],
  exports: [IsoDateValueAccessor]
})
export class IsoDateValueAccessorModule { }
