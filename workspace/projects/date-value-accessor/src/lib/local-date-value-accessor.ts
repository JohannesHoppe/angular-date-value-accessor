import { Directive, ElementRef, forwardRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The accessor for writing a value and listening to changes on a date input element in local time.
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
  ],
  standalone: true
})
export class LocalDateValueAccessor implements ControlValueAccessor {

  @HostListener('input', ['$event.target.valueAsDate']) onInput = (date?: Date) => {
    // convert to LOCAL Date, time is set to 00:00 in LOCAL time
    const localDate = date ? new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) : null;
    this.onChange(localDate);
  }
  onChange: any = () => {};

  @HostListener('blur', []) onTouched = () => { };

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  writeValue(date?: Date): void {
    // convert to UTC Date, time is set to 00:00 in UTC time
    const utcDate = date ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) : null;
    this.renderer.setProperty(this.elementRef.nativeElement, 'valueAsDate', utcDate);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }
}
