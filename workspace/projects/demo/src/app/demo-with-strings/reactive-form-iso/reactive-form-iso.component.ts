import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ReleaseWithIsoString } from '../../shared/release-with-iso-string';

@Component({
  selector: 'app-reactive-form-iso',
  templateUrl: './reactive-form-iso.component.html'
})
export class ReactiveFormIsoComponent {

  demoIsoDateValue = new ReleaseWithIsoString('2.0.0', new Date('2020-01-01').toISOString()); // UTC
  demoLocalIsoDateValue = new ReleaseWithIsoString('3.0.0', new Date(2020, 0, 1).toISOString()); // with offset
  demoIsoDefault = new ReleaseWithIsoString('1.5.8', new Date('2016-07-22').toISOString()); // UTC

  myFormDateValue = new FormGroup({
    version:     new FormControl(this.demoIsoDateValue.version, { nonNullable: true }),
    releaseDate: new FormControl(this.demoIsoDateValue.releaseDate, { nonNullable: true })
  });

  myFormLocalDateValue = new FormGroup({
    version:     new FormControl(this.demoLocalIsoDateValue.version, { nonNullable: true }),
    releaseDate: new FormControl(this.demoLocalIsoDateValue.releaseDate, { nonNullable: true })
  });

  myFormDefault = new FormGroup({
    version:     new FormControl(this.demoIsoDefault.version, { nonNullable: true }),
    releaseDate: new FormControl(this.demoIsoDefault.releaseDate, { nonNullable: true })
  });

  constructor() {
    this.myFormDateValue.valueChanges.subscribe(values => this.demoIsoDateValue = new ReleaseWithIsoString(values.version, values.releaseDate));
    this.myFormLocalDateValue.valueChanges.subscribe(values => this.demoLocalIsoDateValue = new ReleaseWithIsoString(values.version, values.releaseDate));
    this.myFormDefault.valueChanges.subscribe(values => this.demoIsoDefault = new ReleaseWithIsoString(values.version, values.releaseDate));
  }

  toggle(formGroup: FormGroup) {
    const control = formGroup.get('releaseDate');
    if (control.enabled) {
      control.disable();
    } else {
      control.enable();
    }
  }

  typeof(obj: any) {
    return typeof obj;
  }
}
