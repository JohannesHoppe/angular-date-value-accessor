import { Directive, ElementRef, forwardRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The accessor for writing an iso-formatted string value and listening to changes on a date input element.
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

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  writeValue(isoString?: string): void {
    const date = isoString ? new Date(isoString) : null;
    this.renderer.setProperty(this.elementRef.nativeElement, 'valueAsDate', date);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', isDisabled);
  }
}
