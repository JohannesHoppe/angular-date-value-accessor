import { Component } from '@angular/core';
import { Release } from './shared/release';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  release: Release;

  constructor() {

    this.release = new Release('Proprioception', 'Reinforcement', new Date('2016-09-15'));
  }
}
