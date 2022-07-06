import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { DateValueAccessor } from './date-value-accessor';
import { Context, dispatchInputEvent, setupReactiveForms } from './spec-utils';

@Component({
  template: `
  <form>
    <input type="date" [formControl]="testDate" useValueAsDate>
  </form>`
})
export class TestFormComponent {
  testDate = new FormControl(new Date('2020-01-01'), { nonNullable: true }) // Create UTC Date
}

describe('DateValueAccessor (reactive forms)', () => {

  let c: Context<TestFormComponent> = {};
  setupReactiveForms(c, TestFormComponent, DateValueAccessor);

  it('should reflect changes from the model to the input after init', () => {
    expect(c.inputElement.value).toBe('2020-01-01');
  });

  it('should reflect changes from the model to the input', () => {
    c.fixture.componentInstance.testDate.setValue(new Date('2021-11-15'));
    c.fixture.detectChanges();
    expect(c.inputElement.value).toBe('2021-11-15');
  });

  it('should reflect changes from the input to the model', () => {
    dispatchInputEvent(c.inputElement, '2020-12-31');

    expect(c.fixture.componentInstance.testDate.value).toEqual(jasmine.any(Date));
    expect(c.fixture.componentInstance.testDate.value).toEqual(new Date('2020-12-31'));
    expect(c.fixture.componentInstance.testDate.value.getUTCDate()).toBe(31);
    expect(c.fixture.componentInstance.testDate.value.getUTCMonth()).toBe(11);
    expect(c.fixture.componentInstance.testDate.value.getUTCFullYear()).toBe(2020);
    expect(c.fixture.componentInstance.testDate.value.getUTCHours()).toBe(0);
    expect(c.fixture.componentInstance.testDate.value.getUTCMinutes()).toBe(0);
  });

  it('should populate NULL for invalid dates', () => {
    dispatchInputEvent(c.inputElement, "NOT A DATE");
    expect(c.fixture.componentInstance.testDate.value).toBeNull();
    expect(c.inputElement.value).toBe('');
  });
});
