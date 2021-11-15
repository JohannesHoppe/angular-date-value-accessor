import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';

import { LocalDateValueAccessor } from './local-date-value-accessor';
import { Context, dispatchInputEvent, setupTemplateDrivenForms } from './spec-utils';

@Component({
  template: `
    <form>
      <input type="date" [(ngModel)]="testDate" name="someName" useValueAsLocalDate>
    </form>`
})
export class TestFormComponent {
  testDate: Date = new Date(2020, 11, 8); // Create LOCAL Date, HINT: Everything except the day is 0 based!
}

describe('LocalDateValueAccessor (template-driven forms)', () => {

  let c: Context<TestFormComponent> = {};
  setupTemplateDrivenForms(c, TestFormComponent, LocalDateValueAccessor);

  it('should reflect changes from the model to the input after init', () => {
    expect(c.inputElement.value).toBe('2020-12-08');
  });

  it('should reflect changes from the model to the input', done => {
    c.fixture.componentInstance.testDate = new Date(2021, 10, 15);
    c.fixture.detectChanges();
    c.fixture.whenStable().then(() => {
      expect(c.inputElement.value).toBe('2021-11-15');
      done();
    })
  });

  it('should reflect changes from the input to the model', () => {
    dispatchInputEvent(c.inputElement, '2020-12-31');

    expect(c.fixture.componentInstance.testDate).toEqual(jasmine.any(Date));
    expect(c.fixture.componentInstance.testDate).toEqual(new Date(2020, 11, 31));
    expect(c.fixture.componentInstance.testDate.getDate()).toBe(31);
    expect(c.fixture.componentInstance.testDate.getMonth()).toBe(11);
    expect(c.fixture.componentInstance.testDate.getFullYear()).toBe(2020);
    expect(c.fixture.componentInstance.testDate.getHours()).toBe(0);
    expect(c.fixture.componentInstance.testDate.getMinutes()).toBe(0);
  });

  it('should populate NULL for invalid dates', () => {
    dispatchInputEvent(c.inputElement, "NOT A DATE");
    expect(c.fixture.componentInstance.testDate).toBeNull();
    expect(c.inputElement.value).toBe('');
  });
});
