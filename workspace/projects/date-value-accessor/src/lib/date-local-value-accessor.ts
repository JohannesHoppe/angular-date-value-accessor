import { Directive, ElementRef, HostListener, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const DATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateLocalValueAccessor),
  multi: true
};

/**
 * The accessor for writing a value and listening to changes on a date input element
 *
 *  ### Example
 *  `<input type="date" name="myBirthday" ngModel useValueAsDate>`
 */
@Directive({
  // this selector changes the previous behavior silently and might break existing code
  // selector: 'input[type=date][formControlName],input[type=date][formControl],input[type=date][ngModel]',

  // this selector is an opt-in version
  // tslint:disable-next-line: directive-selector
  selector: '[useValueAsDateLocal]',
  providers: [DATE_VALUE_ACCESSOR]
})
// tslint:disable-next-line: directive-class-suffix
export class DateLocalValueAccessor implements ControlValueAccessor {

  onChange: any = () => {};

  @HostListener('input', ['$event.target.value']) onInput = (dateAsString: string) => {
    let selectedDate: Date | null = null;
    if (dateAsString) {
      // Create new Date in local timezone of the system and "reset" time
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
      selectedDate = new Date(Date.parse(dateAsString + 'T00:00:00'));
    }
    this.onChange(selectedDate);
  }
  @HostListener('blur', []) onTouched = () => { };

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  writeValue(value: Date): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value ? formatDate(value) : null);
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }
}

// Convert Date to Date string with format: yyyy-mm-dd
// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd?page=1&tab=votes#tab-top
function formatDate(d: Date) {
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

