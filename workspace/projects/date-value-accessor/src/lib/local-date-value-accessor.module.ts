import { NgModule } from '@angular/core';
import { LocalDateValueAccessor } from './local-date-value-accessor.directive';
@NgModule({
  declarations: [LocalDateValueAccessor],
  exports: [LocalDateValueAccessor]
})
export class LocalDateValueAccessorModule { }
