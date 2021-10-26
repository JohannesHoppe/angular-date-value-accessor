import { Component } from '@angular/core';

@Component({
  selector: 'app-explanation-default-value-accessor',
  template: `
    <p>
      The <strong>DefaultValueAccessor</strong> from Angular will not work as expected.
      The HTML date input will not display the given Date Object – it's empty after load.
      When you select a date it will output as a simple string. (see <strong>typeof(releaseDate)</strong>)
      This simple string contains only a date and no time.
    </p>`
})
export class ExplanationDefaultValueAccessorComponent {
}
