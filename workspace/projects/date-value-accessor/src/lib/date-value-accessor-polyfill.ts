import { Directive } from "@angular/core";
import '@12core/date-input-polyfill/dist/date-input-polyfill.esm';
import { Input } from '@12core/date-input-polyfill/dist/date-input-polyfill.esm'


/**
 * The original polyfill patches controls on DOMContentLoaded and body.mousedown
 * but not when Angular adds elements to DOM
 * see https://github.com/little-core-labs/date-input-polyfill/blob/master/src/date-input-polyfill.js
 *
 * This directives makes sure all our date input controls are patched before first usage
 */
@Directive({
  selector: '[useValueAsDate],[useValueAsLocalDate],[useValueAsIso],[useValueAsLocalIso]'
})
export class DateValueAccessorPolyfill {
  constructor() {
    if (!Input.supportsDateInput()) {
      Input.addPickerToDateInputs()
    }
  }
}

// https://stackoverflow.com/a/31732310
export function isSafari() {
  return navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
    navigator.userAgent &&
    navigator.userAgent.indexOf('CriOS') == -1 &&
    navigator.userAgent.indexOf('FxiOS') == -1;
}
