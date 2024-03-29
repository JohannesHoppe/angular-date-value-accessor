import { Component } from '@angular/core';

@Component({
  selector: 'app-explanation-local-date-value-accessor',
  template: `
    <p class="small">
      The <strong>improved LocalDateValueAccessor</strong> operates in your Local Time.
      The HTML date input will use the Local Time representation of a given the Date Object.
      When you select a date it will output a Local Date with the time set to 00:00 (Local Time).
    </p>`
})
export class ExplanationLocalDateValueAccessorComponent {
}
