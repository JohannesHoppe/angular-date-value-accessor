import { Component } from '@angular/core';

@Component({
  selector: 'app-explanation-default-value-accessor',
  template: `
    <p class="small">
      The <strong>DefaultValueAccessor</strong> from Angular will not work as expected.
      The HTML date input will not display the given Date Object – it's empty after load.
      When you select a date it will output as a simple string. Please note the <strong>typeof(releaseDate)</strong> after setting a value.
      This simple string contains only a date and no time.
    </p>`
})
export class ExplanationDefaultValueAccessorComponent {
}
