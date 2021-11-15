import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Release } from '../../shared/release';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {

  demoDateValue: Release;
  demoLocalDateValue: Release;
  demoDefault: Release;

  myFormDateValue: FormGroup;
  myFormLocalDateValue: FormGroup;
  myFormDefault: FormGroup;

  constructor(private fb: FormBuilder) {
    this.demoDateValue = new Release('2.0.0', new Date('2020-01-01')); // UTC
    this.demoLocalDateValue = new Release('3.0.0', new Date(2020, 0, 1)); // with offset
    this.demoDefault = new Release('1.5.8', new Date('2016-07-22')); // UTC
  }

  ngOnInit() {
    this.myFormDateValue = this.fb.group({
      version:     [this.demoDateValue.version],
      releaseDate: [this.demoDateValue.releaseDate]
    });

    this.myFormLocalDateValue = this.fb.group({
      version:     [this.demoLocalDateValue.version],
      releaseDate: [this.demoLocalDateValue.releaseDate]
    });

    this.myFormDefault = this.fb.group({
      version:     [this.demoDefault.version],
      releaseDate: [this.demoDefault.releaseDate]
    });

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
