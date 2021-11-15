import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DateValueAccessor } from './date-value-accessor';
import { dispatchInputEvent } from './spec-utils';

@Component({
  template: `
  <form [formGroup]="form">
    <input type="date" formControlName="testDate" useValueAsDate>
  </form>`
})
export class ReactiveTestFormComponent {

  form = new FormGroup({
    testDate: new FormControl(new Date('2020-01-01'))
  });
}

describe('DateValueAccessor (reactive forms)', () => {

  let fixture: ComponentFixture<ReactiveTestFormComponent>;
  let inputElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveTestFormComponent, DateValueAccessor],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveTestFormComponent);
    fixture.detectChanges();
  });

  beforeEach(() => inputElement = fixture.debugElement.query(By.css('input')));

  it('should fix date input controls to bind on dates', waitForAsync(() => {
    expect(inputElement.nativeElement.value).toBe('2020-01-01');
  }));

  it('should populate UTC dates (instead of strings) on change', waitForAsync(() => {
    dispatchInputEvent(inputElement.nativeElement, '2020-12-31');
    expect(fixture.componentInstance.form.value.testDate).toEqual(jasmine.any(Date));
    expect(fixture.componentInstance.form.value.testDate).toEqual(new Date('2020-12-31'));
    expect(fixture.componentInstance.form.value.testDate.getUTCDate()).toBe(31);
    expect(fixture.componentInstance.form.value.testDate.getUTCMonth()).toBe(11);
    expect(fixture.componentInstance.form.value.testDate.getUTCFullYear()).toBe(2020);
    expect(fixture.componentInstance.form.value.testDate.getUTCHours()).toBe(0);
    expect(fixture.componentInstance.form.value.testDate.getUTCMinutes()).toBe(0);
  }));
});
