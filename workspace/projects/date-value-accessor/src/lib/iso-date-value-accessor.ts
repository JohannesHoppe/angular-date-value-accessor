import { Directive, forwardRef, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

  @HostBinding('valueAsNumber') inputValue?: number;

  @HostListener('blur', []) onTouched = () => { };
  onChange = (_: string) => {};

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
}
