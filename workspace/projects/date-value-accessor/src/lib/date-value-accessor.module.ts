import { NgModule } from '@angular/core';
import { DateValueAccessor } from './date-value-accessor';
import { DateLocalValueAccessor } from './date-local-value-accessor.directive';

@NgModule({
  declarations: [DateValueAccessor, DateLocalValueAccessor],
  exports: [DateValueAccessor, DateLocalValueAccessor]
})
export class DateValueAccessorModule { }
