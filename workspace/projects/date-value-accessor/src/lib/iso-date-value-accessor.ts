import { Directive, ElementRef, forwardRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The accessor for writing a iso-formatted string value and listening to changes on a date input element
 *
 *  ### Example
 *  `<input type="date" name="myBirthday" ngModel useValueAsISO>`
 */
@Directive({
  selector: '[useValueAsISO]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ISODateValueAccessor),
      multi: true
    }
  ]
})
export class ISODateValueAccessor implements ControlValueAccessor {

  @HostListener('input', ['$event.target.valueAsNumber']) onInput(value: number) {
    this.onChange(new Date(value).toISOString());
  }
  onChange = (_: string) => {};

  @HostListener('blur', []) onTouched = () => { };

  @HostBinding('valueAsNumber') inputValue?: number;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  writeValue(isoString: string) {
    const value = isoString ? new Date(isoString).getTime() : undefined;
    this.inputValue = value;
  }

  registerOnChange(fn: (value: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }
}
