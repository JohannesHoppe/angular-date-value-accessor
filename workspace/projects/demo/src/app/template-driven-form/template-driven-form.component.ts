import { Component } from '@angular/core';
import { Release } from '../shared/release';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html'
})
export class TemplateDrivenFormComponent {

  release1: Release;
  release2: Release;

  constructor() {
    this.release1 = new Release('2.0.0', new Date('2020-01-01'));
    this.release2 = new Release('1.5.8', new Date('2016-07-22'));
  }
}
