import { NgModule } from '@angular/core';
import { DateValueAccessorPolyfill } from './date-value-accessor-polyfill';

@NgModule({
  declarations: [DateValueAccessorPolyfill],
  exports: [DateValueAccessorPolyfill]
})
export class DateValueAccessorPolyfillModule { }
