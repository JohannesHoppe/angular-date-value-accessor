import { Component } from '@angular/core';
import { ReleaseWithIsoString } from '../../shared/release-with-iso-string';

@Component({
  selector: 'app-template-driven-form-iso',
  templateUrl: './template-driven-form-iso.component.html'
})
export class TemplateDrivenFormIsoComponent {

  demoIsoDateValue: ReleaseWithIsoString;
  demoIsoLocalDateValue: ReleaseWithIsoString;
  demoIsoDefault: ReleaseWithIsoString;

  constructor() {
    this.demoIsoDateValue = new ReleaseWithIsoString('2.0.0', new Date('2020-01-01').toISOString()); // UTC
    this.demoIsoLocalDateValue = new ReleaseWithIsoString('3.0.0', new Date(2020, 0, 1).toISOString()); // with offset
    this.demoIsoDefault = new ReleaseWithIsoString('1.5.8', new Date('2016-07-22').toISOString()); // UTC
  }

  typeof(obj: any) {
    return typeof obj;
  }
}
