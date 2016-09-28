import { Component } from '@angular/core';
import { Release } from './shared/release';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  release1: Release;
  release2: Release;

  constructor() {

    this.release1 = new Release('1.5.8', 'arbitrary-fallbacks', new Date('2016-07-22'));
    this.release2 = new Release('2.0.0', 'proprioception-reinforcement', new Date('2016-09-15'));
  }
}
