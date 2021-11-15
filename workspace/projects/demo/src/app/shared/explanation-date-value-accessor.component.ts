import { Component } from '@angular/core';

@Component({
  selector: 'app-explanation-date-value-accessor',
  template: `
    <p class="small">
      The <strong>orginal DateValueAccessor</strong> operates in UTC (Coordinated Universal Time).
      The HTML date input will use the UTC representation of a given Date Object.
      When you select a date it will output an UTC date with the time set to 00:00 (UTC).<br>
      <br>
      <strong>
        If you are unsure what to use, use the <code>LocalDateValueAccessor</code> and not the <code>DateValueAccessor</code>.
        Most users will expect the input field to correlate to their local clock.
      </strong>
    </p>`
})
export class ExplanationDateValueAccessorComponent {
}
