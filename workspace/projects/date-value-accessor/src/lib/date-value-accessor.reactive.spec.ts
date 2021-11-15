import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { DateValueAccessor } from './date-value-accessor';
import { Context, dispatchInputEvent, setupReactiveForms } from './spec-utils';

@Component({
  template: `
  <form [formGroup]="form">
    <input type="date" formControlName="testDate" useValueAsDate>
  </form>`
})
export class TestFormComponent {

  form = new FormGroup({
    testDate: new FormControl(new Date('2020-01-01')) // Create UTC Date
  });
}

describe('DateValueAccessor (reactive forms)', () => {

  let c: Context<TestFormComponent> = {};
  setupReactiveForms(c, TestFormComponent, DateValueAccessor);

  it('should fix date input controls to bind on dates', waitForAsync(() => {
    expect(c.inputElement.value).toBe('2020-01-01');
  }));

  it('should populate UTC dates (instead of strings) on change', waitForAsync(() => {
    dispatchInputEvent(c.inputElement, '2020-12-31');
    expect(c.fixture.componentInstance.form.value.testDate).toEqual(jasmine.any(Date));
    expect(c.fixture.componentInstance.form.value.testDate).toEqual(new Date('2020-12-31'));
    expect(c.fixture.componentInstance.form.value.testDate.getUTCDate()).toBe(31);
    expect(c.fixture.componentInstance.form.value.testDate.getUTCMonth()).toBe(11);
    expect(c.fixture.componentInstance.form.value.testDate.getUTCFullYear()).toBe(2020);
    expect(c.fixture.componentInstance.form.value.testDate.getUTCHours()).toBe(0);
    expect(c.fixture.componentInstance.form.value.testDate.getUTCMinutes()).toBe(0);
  }));
});
