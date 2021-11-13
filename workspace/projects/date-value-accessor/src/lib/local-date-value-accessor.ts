import { Directive, ElementRef, HostListener, Renderer2, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The accessor for writing a value and listening to changes on a date input element
 *
 *  ### Example
 *  `<input type="date" name="myBirthday" ngModel useValueAsLocalDate>`
 *
 * See also:
 * What is the correct way to set and get HTMLInputElement.valueAsDate using local Dates?
 * https://stackoverflow.com/a/53033442
 */
@Directive({
  selector: '[useValueAsLocalDate]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocalDateValueAccessor),
      multi: true
    }
  ]
})
export class LocalDateValueAccessor implements ControlValueAccessor {

  @HostListener('input', ['$event.target.valueAsDate']) onInput = (date?: Date) => {
    // convert to LOCAL Date, time is set to 00:00 in LOCAL time
    const localDate = date ? new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) : undefined;
    this.onChange(localDate);
  }
  onChange: any = () => {};

  @HostListener('blur', []) onTouched = () => { };

  @HostBinding('valueAsDate') valueAsDate?: Date;
  @HostBinding('disabled') disabled: boolean;

  writeValue(date?: Date): void {
    // convert to UTC Date, time is set to 00:00 in UTC time
    const utcDate = date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) : undefined;
    this.valueAsDate = utcDate;
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
