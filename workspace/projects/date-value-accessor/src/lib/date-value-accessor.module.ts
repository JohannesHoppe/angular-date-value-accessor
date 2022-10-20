import { NgModule } from '@angular/core';
import { DateValueAccessor } from './date-value-accessor';

@NgModule({
  imports: [DateValueAccessor],
  exports: [DateValueAccessor]
})
export class DateValueAccessorModule { }
