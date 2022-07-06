import { Component } from '@angular/core';
import { Release } from '../../shared/release';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html'
})
export class TemplateDrivenFormComponent {

  demoDateValue = new Release('2.0.0', new Date('2020-01-01')); // UTC
  demoLocalDateValue = new Release('3.0.0', new Date(2020, 0, 1)); // with offset
  demoDefault = new Release('1.5.8', new Date('2016-07-22')); // UTC

  demoDateValueDisabled = false;
  demoLocalDateValueDisabled = false;
  demoDefaultDisabled = false;

  typeof(obj: any) {
    return typeof obj;
  }
}
