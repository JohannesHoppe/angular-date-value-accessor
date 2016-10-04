import 'es6-shim';
import 'reflect-metadata';

import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateValueAccessorModule } from './module';
import { DateValueAccessor } from './date-value-accessor';

@Component({
  template: `
  <form>
    <input type="date" name="test1" [(ngModel)]="testDate1">
    <input type="date" name="test2" [(ngModel)]="testDate2" useValueAsDate>
  </form>`
})
export class DummyFormComponent {
  testDate1: Date;
  testDate2: Date;
  constructor() {
    this.testDate1 = new Date('2016-07-22');
    this.testDate2 = new Date('2016-09-15');
  }
}

@NgModule({
  declarations: [DummyFormComponent],
  imports: [FormsModule, DateValueAccessorModule],
  exports: [DummyFormComponent, DateValueAccessor]
})
export class DummyModule { }


describe('DateValueAccessor', () => {
  let fixture: ComponentFixture<DummyFormComponent>;
  let formComponent: DummyFormComponent;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [DummyModule]
    });

    TestBed.compileComponents();

    fixture = TestBed.createComponent(DummyFormComponent);
    formComponent = fixture.componentInstance;
  }));

  it('should fix the date input controls', () => {

    fixture.debugElement.query(By.directive(DateValueAccessor));
  });
});

