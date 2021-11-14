import { Directive, forwardRef, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The accessor for writing a date object value and listening to changes on a date input element.
 *
 *  ### Example
 *  `<input type="date" name="myBirthday" ngModel useValueAsDate>`
 */
@Directive({
  selector: '[useValueAsDate]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateValueAccessor),
      multi: true
    }
  ]
})
export class DateValueAccessor implements ControlValueAccessor {

  @HostListener('input', ['$event.target.valueAsDate']) onChange = (_: any) => { };
  @HostListener('blur', []) onTouched = () => { };

  @HostBinding('valueAsDate') valueAsDate?: Date;
  @HostBinding('disabled') disabled: boolean;

  writeValue(date?: Date): void {
    this.valueAsDate = date;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
