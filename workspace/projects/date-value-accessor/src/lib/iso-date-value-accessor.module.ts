import { NgModule } from '@angular/core';
import { ISODateValueAccessor } from './iso-date-value-accessor';

@NgModule({
  declarations: [ISODateValueAccessor],
  exports: [ISODateValueAccessor]
})
export class ISODateValueAccessorModule { }
