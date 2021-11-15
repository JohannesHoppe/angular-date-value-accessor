import { Component } from '@angular/core';

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

  it('should reflect changes from the model to the input after init', () => {
    expect(c.inputElement.value).toBe('2020-01-01');
  });

  it('should reflect changes from the model to the input', done => {
    c.fixture.componentInstance.testDate = new Date('2021-11-15');
    c.fixture.detectChanges();
    c.fixture.whenStable().then(() => {
      expect(c.inputElement.value).toBe('2021-11-15');
      done();
    })
  });

  it('should reflect changes from the input to the model', () => {
    dispatchInputEvent(c.inputElement, '2020-12-31');

    expect(c.fixture.componentInstance.testDate).toEqual(jasmine.any(Date));
    expect(c.fixture.componentInstance.testDate).toEqual(new Date('2020-12-31'));
    expect(c.fixture.componentInstance.testDate.getUTCDate()).toBe(31);
    expect(c.fixture.componentInstance.testDate.getUTCMonth()).toBe(11);
    expect(c.fixture.componentInstance.testDate.getUTCFullYear()).toBe(2020);
    expect(c.fixture.componentInstance.testDate.getUTCHours()).toBe(0);
    expect(c.fixture.componentInstance.testDate.getUTCMinutes()).toBe(0);
  });

  it('should populate NULL for invalid dates', () => {
    dispatchInputEvent(c.inputElement, "NOT A DATE");
    expect(c.fixture.componentInstance.testDate).toBeNull();
    expect(c.inputElement.value).toBe('');
  });
});


