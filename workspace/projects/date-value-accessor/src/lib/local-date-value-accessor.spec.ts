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
  testDate: Date = new Date(2020, 11, 8); // Create LOCAL Date
}

describe('LocalDateValueAccessor (template-driven forms)', () => {

  let c: Context<TestFormComponent> = {};
  setupTemplateDrivenForms(c, TestFormComponent, LocalDateValueAccessor);

  it('should fix date input controls to bind on dates', waitForAsync(() => {
    expect(c.inputElement.nativeElement.value).toBe('2020-12-08');
  }));

  it('should populate LOCAL dates (instead of strings) on change', waitForAsync(() => {
    dispatchInputEvent(c.inputElement.nativeElement, '2020-12-31');
    expect(c.fixture.componentInstance.testDate).toEqual(jasmine.any(Date));
    expect(c.fixture.componentInstance.testDate).toEqual(new Date(2020, 11, 31));
    expect(c.fixture.componentInstance.testDate.getDate()).toBe(31);
    expect(c.fixture.componentInstance.testDate.getMonth()).toBe(11);
    expect(c.fixture.componentInstance.testDate.getFullYear()).toBe(2020);
    expect(c.fixture.componentInstance.testDate.getHours()).toBe(0);
    expect(c.fixture.componentInstance.testDate.getMinutes()).toBe(0);
  }));
});
