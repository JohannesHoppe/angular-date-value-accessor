import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';

import { DateValueAccessor } from './date-value-accessor';
import { Context, dispatchInputEvent, setupTemplateDrivenForms } from './spec-utils';

@Component({
  template: `
  <form>
    <input type="date" [(ngModel)]="testDate" name="someName" useValueAsDate>
  </form>`
})
export class TestFormComponent {
  testDate = new Date('2020-01-01'); // Create UTC Date
}

describe('DateValueAccessor (template-driven forms)', () => {

  let c: Context<TestFormComponent> = {};
  setupTemplateDrivenForms(c, TestFormComponent, DateValueAccessor);

  it('should fix date input controls to bind on dates', waitForAsync(() => {
    expect(c.inputElement.nativeElement.value).toBe('2020-01-01');
  }));

  it('should populate UTC dates (instead of strings) on change', waitForAsync(() => {
    dispatchInputEvent(c.inputElement.nativeElement, '2020-12-31');
    expect(c.fixture.componentInstance.testDate).toEqual(jasmine.any(Date));
    expect(c.fixture.componentInstance.testDate).toEqual(new Date('2020-12-31'));
    expect(c.fixture.componentInstance.testDate.getUTCDate()).toBe(31);
    expect(c.fixture.componentInstance.testDate.getUTCMonth()).toBe(11);
    expect(c.fixture.componentInstance.testDate.getUTCFullYear()).toBe(2020);
    expect(c.fixture.componentInstance.testDate.getUTCHours()).toBe(0);
    expect(c.fixture.componentInstance.testDate.getUTCMinutes()).toBe(0);
  }));
});


