import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DateValueAccessor } from './date-value-accessor';
import { dispatchInputEvent } from './spec-utils';

@Component({
  template: `
  <form [formGroup]="form">
    <input type="date" name="fixedInput"  formControlName="testDate1" useValueAsDate>
    <input type="date" name="fixedInputFalsy" formControlName="testDate2" useValueAsDate>
  </form>`
})
export class ReactiveTestFormComponent {

  form = new FormGroup({
    testDate1: new FormControl(new Date('2020-01-01')),
    testDate2: new FormControl(null)
  });
}

describe('DateValueAccessor (reactive forms)', () => {

  let fixture: ComponentFixture<ReactiveTestFormComponent>;

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

  describe('with the "useValueAsDate" attribute', () => {

    let fixedInput: DebugElement;
    beforeEach(() => fixedInput = fixture.debugElement.query(By.css('input[name=fixedInput]')));

    it('should fix date input controls to bind on dates', waitForAsync(() => {
      expect(fixedInput.nativeElement.value).toBe('2020-01-01');
    }));

    it('should populate UTC dates (instead of strings) on change', waitForAsync(() => {
      dispatchInputEvent(fixedInput.nativeElement, '2020-12-31');
      expect(fixture.componentInstance.form.value.testDate1).toEqual(jasmine.any(Date));
      expect(fixture.componentInstance.form.value.testDate1).toEqual(new Date('2020-12-31'));
      expect(fixture.componentInstance.form.value.testDate1.getUTCDate()).toBe(31);
      expect(fixture.componentInstance.form.value.testDate1.getUTCMonth()).toBe(11);
      expect(fixture.componentInstance.form.value.testDate1.getUTCFullYear()).toBe(2020);
      expect(fixture.componentInstance.form.value.testDate1.getUTCHours()).toBe(0);
      expect(fixture.componentInstance.form.value.testDate1.getUTCMinutes()).toBe(0);
    }));

    it('should fix date input controls to bind on dates', waitForAsync(() => {
      const fixedInputFalsy = fixture.debugElement.query(By.css('input[name=fixedInputFalsy]'));
      expect(fixedInputFalsy.nativeElement.value).toBe('');
    }));

    it('should populate NULL for falsy values on change', waitForAsync(() => {
      dispatchInputEvent(fixedInput.nativeElement, null);
      expect(fixture.componentInstance.form.value.testDate2).toEqual(null);
    }));
  });
});
