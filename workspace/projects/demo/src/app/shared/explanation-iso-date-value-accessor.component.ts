import { Component } from '@angular/core';

@Component({
  selector: 'app-explanation-iso-date-value-accessor',
  template: `
    <p class="small">
      This directive gets and sets ISO 8601 formatted date strings in HTML date inputs.
      The handling of the dates is the same as for the <code>DateValueAccessor</code>.
      <br>
      The <strong>IsoDateValueAccessor</strong> operates in UTC (Coordinated Universal Time).
      The HTML date input will use the UTC representation of a given ISO 8601 formatted date string.
      When you select a date it will output an ISO-formatted string with the time set to 00:00 (UTC).
    </p>`
})
export class ExplanationIsoDateValueAccessorComponent {
}
