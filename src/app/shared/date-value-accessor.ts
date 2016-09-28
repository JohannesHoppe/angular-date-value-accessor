import {Directive, ElementRef, Renderer, forwardRef} from '@angular/core';

import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms/src/directives/control_value_accessor';

export const DATE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessor),
  multi: true
};

/**
 * The accessor for writing a value and listening to changes on a date input element
 *
 *  ### Example
 *  ```
 *  <input type="date" name="myBirthday" ngModel>
 *  ```
 */
@Directive({
  // this 'more correct' selector would cause a breaking change
  // selector: 'input[type=date][formControlName],input[type=date][formControl],input[type=date][ngModel]',
  selector: '[dateValueAccessor]',
  host: {'(input)': 'onChange($event.target.valueAsDate)', '(blur)': 'onTouched()'},
  providers: [DATE_VALUE_ACCESSOR]
})
export class DateValueAccessor implements ControlValueAccessor {
  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private _renderer: Renderer, private _elementRef: ElementRef) { }

  writeValue(value: Date): void {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'valueAsDate', value);
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }
}
