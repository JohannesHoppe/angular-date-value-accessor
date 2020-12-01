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
  // this selector changes the previous behavior silently and might break existing code
  // selector: 'input[type=date][formControlName],input[type=date][formControl],input[type=date][ngModel]',

  // this selector is an opt-in version
  // tslint:disable-next-line: directive-selector
  selector: '[useValueAsLocalDate]',
  providers: [LOCAL_DATE_VALUE_ACCESSOR]
})
// tslint:disable-next-line: directive-class-suffix
export class LocalDateValueAccessor implements ControlValueAccessor {

  onChange: any = () => {};

  @HostListener('input', ['$event.target.valueAsDate']) onInput = (date: Date) => {
    let selectedDate: Date | null = null;
    if (date) {
      // Create new Date in local timezone of the system and "reset" time
      selectedDate = convertUtcToLocalDate(date);
    }
    this.onChange(selectedDate);
  }
  @HostListener('blur', []) onTouched = () => { };

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  writeValue(value: Date): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'valueAsDate', value ? convertLocalToUtcDate(value) : null);
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }
}

// https://stackoverflow.com/questions/53032953/what-is-the-correct-way-to-set-and-get-htmlinputelement-valueasdate-using-local
function convertLocalToUtcDate(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

function convertUtcToLocalDate(date: Date): Date {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

