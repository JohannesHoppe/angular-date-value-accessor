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

  myForm1: FormGroup;
  myForm2: FormGroup;

  constructor(private fb: FormBuilder) {
    this.release1 = new Release('1.5.8', 'arbitrary-fallbacks', new Date('2016-07-22'));
    this.release2 = new Release('2.0.0', 'proprioception-reinforcement', new Date('2016-09-15'));
  }

  ngOnInit() {
    this.myForm1 = this.fb.group({
      version:     [this.release1.version],
      name:        [this.release1.name],
      releaseDate: [this.release1.releaseDate]
    });

    this.myForm2 = this.fb.group({
      version:     [this.release2.version],
      name:        [this.release2.name],
      releaseDate: [this.release2.releaseDate]
    });

    this.myForm1.valueChanges.subscribe(values => this.release1 = new Release(values.version, values.name, values.releaseDate));
    this.myForm2.valueChanges.subscribe(values => this.release2 = new Release(values.version, values.name, values.releaseDate));
  }
}
