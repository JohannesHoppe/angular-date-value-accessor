import { Component } from '@angular/core';

import { LocalIsoDateValueAccessor } from './local-iso-date-value-accessor';
import { Context, setupTemplateDrivenForms } from './spec-utils';

@Component({
  template: `
    <form>
      <input type="date" [(ngModel)]="testDate" name="someName" useValueAsLocalIsoDate>
    </form>`
})
export class TestFormComponent {
  testDate: Date = new Date(2020, 11, 8); // Create LOCAL Date
}

describe('LocalDateValueAccessor (template-driven forms)', () => {

  let c: Context<TestFormComponent> = {};
  setupTemplateDrivenForms(c, TestFormComponent, LocalIsoDateValueAccessor);

  // it('should fix date input controls to bind on dates', waitForAsync(() => {
  //   expect(inputElement.nativeElement.value).toBe('2020-12-08');
  // }));

  // it('should populate LOCAL dates (instead of strings) on change', waitForAsync(() => {
  //   dispatchInputEvent(inputElement.nativeElement, '2020-12-31');
  //   expect(fixture.componentInstance.testDate).toEqual(jasmine.any(Date));
  //   expect(fixture.componentInstance.testDate).toEqual(new Date(2020, 11, 31));
  //   expect(fixture.componentInstance.testDate.getDate()).toBe(31);
  //   expect(fixture.componentInstance.testDate.getMonth()).toBe(11);
  //   expect(fixture.componentInstance.testDate.getFullYear()).toBe(2020);
  //   expect(fixture.componentInstance.testDate.getHours()).toBe(0);
  //   expect(fixture.componentInstance.testDate.getMinutes()).toBe(0);
  // }));
});
