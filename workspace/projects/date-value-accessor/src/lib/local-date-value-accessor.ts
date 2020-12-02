import { Directive, ElementRef, HostListener, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const LOCAL_DATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LocalDateValueAccessor),
  multi: true
};

/**
 * The accessor for writing a value and listening to changes on a date input element
 *
 *  ### Example
 *  `<input type="date" name="myBirthday" ngModel useValueAsLocalDate>`
 */
@Directive({
  selector: '[useValueAsLocalDate]',
  providers: [LOCAL_DATE_VALUE_ACCESSOR]
})
// tslint:disable-next-line: directive-class-suffix
export class LocalDateValueAccessor implements ControlValueAccessor {

  onChange: any = () => {};

  @HostListener('input', ['$event.target.valueAsDate']) onInput = (date: Date) => {
    let selectedDate: Date | null = null;
    if (date) {
      // Create LOCAL Date, time is set to 00:00 in LOCAL time
      selectedDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());;
    }
    this.onChange(selectedDate);
  }
  @HostListener('blur', []) onTouched = () => { };

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  writeValue(date: Date): void {
    // Create UTC Date, time is set to 00:00 in UTC time
    const utcDate: Date = date ?
      new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) :
      null;
    this.renderer.setProperty(this.elementRef.nativeElement, 'valueAsDate', utcDate);
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }
}

// Use Local Dates with html input type date
// https://stackoverflow.com/questions/53032953/what-is-the-correct-way-to-set-and-get-htmlinputelement-valueasdate-using-local
