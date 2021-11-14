import { Component } from '@angular/core';

@Component({
  selector: 'app-explanation-local-iso-date-value-accessor',
  template: `
    <p class="small">
      This directive gets and sets ISO 8601 formatted date strings in HTML date inputs.
      The handling of the dates is the same as for the <code>LocalDateValueAccessor</code>.
      <br>
      The <strong>LocalIsoDateValueAccessor</strong> operates in your Local Time.
      The HTML date input will use the Local Time representation of a given ISO 8601 formatted date string.
      When you select a date it will output an ISO-formatted string with a time that equals to 00:00 (Local Time).<br>
      <br>
      Note: The timezone of the outputted string is always zero UTC offset, as denoted by the suffix "Z".
    </p>`
})
export class ExplanationLocalIsoDateValueAccessorComponent {
}
