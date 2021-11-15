import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';

import { Context, dispatchInputEvent, setupTemplateDrivenForms } from './spec-utils';

@Component({
  template: `
  <form>
    <input type="date" [(ngModel)]="testDate" name="someName">
  </form>`
})
export class TestFormComponent {
  testDate: Date | string = new Date('2019-01-01'); // Create UTC Date
}

// just to describe the default behaviour
describe('DefaultValueAccessor (template-driven forms)', () => {

  let c: Context<TestFormComponent> = {};
  setupTemplateDrivenForms(c, TestFormComponent);

  it('should NOT fix date input controls', () => {
    expect(c.inputElement.nativeElement.value).toBe('');
  });

  it('should populate simple strings on change', waitForAsync(() => {
    dispatchInputEvent(c.inputElement.nativeElement, '1984-09-30');
    expect(c.fixture.componentInstance.testDate).toEqual('1984-09-30');
  }));
});
