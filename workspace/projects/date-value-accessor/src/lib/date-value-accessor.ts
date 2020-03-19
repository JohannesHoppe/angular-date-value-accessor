import { Directive, ElementRef, HostListener, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const DATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessor),
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
  selector: '[useValueAsDate]',
  providers: [DATE_VALUE_ACCESSOR]
})
// tslint:disable-next-line: directive-class-suffix
export class DateValueAccessor implements ControlValueAccessor {

  @HostListener('input', ['$event.target.valueAsDate']) onChange = (_: any) => { };
  @HostListener('blur', []) onTouched = () => { };

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  writeValue(value: Date): void {
    if (!value) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', null);
      return;
    }
    this.renderer.setProperty(this.elementRef.nativeElement, 'valueAsDate', value);
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }
}
