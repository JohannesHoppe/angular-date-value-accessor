import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { DateValueAccessor } from './date-value-accessor';


@Component({
  template: `
  <form>
    <input type="date" name="test1" [(ngModel)]="testDate1">
    <input type="date" name="test2" [(ngModel)]="testDate2" useValueAsDate>
  </form>`
})
export class TestFormComponent {
  testDate1: Date;
  testDate2: Date;
  constructor() {
    this.testDate1 = new Date('2016-07-22');
    this.testDate2 = new Date('2016-09-15');
  }
}

describe('DateValueAccessor', () => {
  let fixture: ComponentFixture<TestFormComponent>;
  let formComponent: TestFormComponent;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [TestFormComponent, DateValueAccessor],
      imports: [FormsModule]
    });

    TestBed.compileComponents();

    fixture = TestBed.createComponent(TestFormComponent);
    formComponent = fixture.componentInstance;
  }));

  it('should fix to date input controls', () => {

    //fixture.debugElement.query(By.directive(DateValueAccessor));

  });

});

