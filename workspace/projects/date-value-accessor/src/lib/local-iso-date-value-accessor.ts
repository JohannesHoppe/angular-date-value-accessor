import { Directive, forwardRef, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The accessor for writing an iso-formatted string and listening to changes on a date input element.
 *
 *  ### Example
 *  `<input type="date" name="myBirthday" ngModel useValueAsLocalIso>`
 *
 * See also:
 * What is the correct way to set and get HTMLInputElement.valueAsDate using local Dates?
 * https://stackoverflow.com/a/53033442
 */
@Directive({
  selector: '[useValueAsLocalIso]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocalIsoDateValueAccessor),
      multi: true
    }
  ]
})
export class LocalIsoDateValueAccessor implements ControlValueAccessor {

  @HostListener('input', ['$event.target.valueAsDate']) onInput = (date?: Date) => {
    // convert to LOCAL Date, time is set to 00:00 in LOCAL time
    const localDate = date ? new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) : null;
    const isoString = localDate ? localDate.toISOString() : null;
    this.onChange(isoString);
  }
  onChange: any = () => {};

  @HostListener('blur', []) onTouched = () => { };

  @HostBinding('valueAsDate') valueAsDate?: Date;
  @HostBinding('disabled') disabled: boolean;

  writeValue(isoString?: string): void {
    const date = isoString ? new Date(isoString) : null;
    // convert to UTC Date, time is set to 00:00 in UTC time
    const utcDate = date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) : null;
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
