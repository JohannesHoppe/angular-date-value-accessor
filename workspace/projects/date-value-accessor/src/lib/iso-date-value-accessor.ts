import { Directive, ElementRef, forwardRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

//

/**
 * The accessor for writing a iso-formatted string value and listening to changes on a date input element
 *
 *  ### Example
 *  `<input type="date" name="myBirthday" ngModel useValueAsIso>`
 */
@Directive({
  selector: '[useValueAsIso]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IsoDateValueAccessor),
      multi: true
    }
  ]
})
export class IsoDateValueAccessor implements ControlValueAccessor {

  @HostListener('input', ['$event.target.valueAsDate']) onInput = (date?: Date) => {
    const isoString = date ? date.toISOString() : null;
    this.onChange(isoString);
  }
  onChange: any = () => {};

  @HostListener('blur', []) onTouched = () => { };

  @HostBinding('valueAsDate') valueAsDate?: Date;
  @HostBinding('disabled') disabled: boolean;

  writeValue(isoString?: string) {
    const date = isoString ? new Date(isoString) : null;
    this.valueAsDate = date;
  }

  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
