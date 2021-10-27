import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReleaseWithIsoString } from '../../shared/release-with-iso-string';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form-iso.component.html'
})
export class ReactiveFormIsoComponent implements OnInit {

  demoIsoDateValue: ReleaseWithIsoString;
  demoIsoLocalDateValue: ReleaseWithIsoString;
  demoIsoDefault: ReleaseWithIsoString;

  myFormDateValue: FormGroup;
  myFormDefault: FormGroup;
  myFormLocalDateValue: FormGroup;

  constructor(private fb: FormBuilder) {
    this.demoIsoDateValue = new ReleaseWithIsoString('2.0.0', new Date('2020-01-01').toISOString()); // UTC
    this.demoIsoLocalDateValue = new ReleaseWithIsoString('3.0.0', new Date(2020, 0, 1).toISOString()); // with offset
    this.demoIsoDefault = new ReleaseWithIsoString('1.5.8', new Date('2016-07-22').toISOString()); // UTC
  }

  ngOnInit() {
    this.myFormDateValue = this.fb.group({
      version:     [this.demoIsoDateValue.version],
      releaseDate: [this.demoIsoDateValue.releaseDate]
    });

    this.myFormLocalDateValue = this.fb.group({
      version:     [this.demoIsoLocalDateValue.version],
      releaseDate: [this.demoIsoLocalDateValue.releaseDate]
    });

    this.myFormDefault = this.fb.group({
      version:     [this.demoIsoDefault.version],
      releaseDate: [this.demoIsoDefault.releaseDate]
    });

    this.myFormDateValue.valueChanges.subscribe(values => this.demoIsoDateValue = new ReleaseWithIsoString(values.version, values.releaseDate));
    this.myFormLocalDateValue.valueChanges.subscribe(values => this.demoIsoLocalDateValue = new ReleaseWithIsoString(values.version, values.releaseDate));
    this.myFormDefault.valueChanges.subscribe(values => this.demoIsoDefault = new ReleaseWithIsoString(values.version, values.releaseDate));
  }

  typeof(obj: any) {
    return typeof obj;
  }
}
