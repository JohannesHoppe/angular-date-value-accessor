import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Release } from '../shared/release';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html'
})
export class ReactiveFormComponent implements OnInit {

  release1: Release;
  release2: Release;
  release3: Release;

  myForm1: FormGroup;
  myForm2: FormGroup;
  myForm3: FormGroup;

  constructor(private fb: FormBuilder) {
    this.release1 = new Release('2.0.0', new Date('2020-01-01'));
    this.release2 = new Release('1.5.8', new Date('2016-07-22'));
    this.release3 = new Release('3.0.0', new Date(2020, 0, 1));
  }

  ngOnInit() {
    this.myForm1 = this.fb.group({
      version:     [this.release1.version],
      releaseDate: [this.release1.releaseDate]
    });

    this.myForm2 = this.fb.group({
      version:     [this.release2.version],
      releaseDate: [this.release2.releaseDate]
    });

    this.myForm3 = this.fb.group({
      version:     [this.release3.version],
      releaseDate: [this.release3.releaseDate]
    });

    this.myForm1.valueChanges.subscribe(values => this.release1 = new Release(values.version, values.releaseDate));
    this.myForm2.valueChanges.subscribe(values => this.release2 = new Release(values.version, values.releaseDate));
    this.myForm3.valueChanges.subscribe(values => this.release3 = new Release(values.version, values.releaseDate));
  }
}
