import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Release } from '../../shared/release';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent {

  demoDateValue = new Release('2.0.0', new Date('2020-01-01')); // UTC
  demoLocalDateValue = new Release('3.0.0', new Date(2020, 0, 1)); // with offset
  demoDefault = new Release('1.5.8', new Date('2016-07-22')); // UTC

  myFormDateValue = new FormGroup({
    version:     new FormControl(this.demoDateValue.version, { nonNullable: true }),
    releaseDate: new FormControl(this.demoDateValue.releaseDate, { nonNullable: true })
  });

  myFormLocalDateValue = new FormGroup({
    version:     new FormControl(this.demoLocalDateValue.version, { nonNullable: true }),
    releaseDate: new FormControl(this.demoLocalDateValue.releaseDate, { nonNullable: true })
  });

  myFormDefault = new FormGroup({
    version:     new FormControl(this.demoDefault.version, { nonNullable: true }),
    releaseDate: new FormControl(this.demoDefault.releaseDate, { nonNullable: true })
  });

  constructor() {
    this.myFormDateValue.valueChanges.subscribe(values => this.demoDateValue = new Release(values.version, values.releaseDate));
    this.myFormLocalDateValue.valueChanges.subscribe(values => this.demoLocalDateValue = new Release(values.version, values.releaseDate));
    this.myFormDefault.valueChanges.subscribe(values => this.demoDefault = new Release(values.version, values.releaseDate));
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
