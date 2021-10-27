import { Component } from '@angular/core';

@Component({
  selector: 'app-explanation-date-value-accessor',
  template: `
    <p class="small">
      The <strong>orginal DateValueAccessor</strong> operates in UTC (Coordinated Universal Time).
      The HTML date input will read the UTC representation of the Date Object.
      When you select a date it will output an UTC date with the time set to 00:00 (UTC).
    </p>`
})
export class ExplanationDateValueAccessorComponent {
}
