import { Component } from '@angular/core';

import { LocalIsoDateValueAccessor } from './local-iso-date-value-accessor';
import { Context, dispatchInputEvent, setupTemplateDrivenForms } from './spec-utils';

@Component({
  template: `
  <form>
    <input type="date" [(ngModel)]="testDate" name="someName" useValueAsLocalIso>
  </form>`
})
export class TestFormComponent {
  testDate = new Date(2020, 11, 8).toISOString(); // Create LOCAL Date, HINT: Everything except the day is 0 based!
}

describe('LocalIsoDateValueAccessor (template-driven forms)', () => {

  let c: Context<TestFormComponent> = {};
  setupTemplateDrivenForms(c, TestFormComponent, LocalIsoDateValueAccessor);

  it('should reflect changes from the model to the input after init', () => {
    expect(c.inputElement.value).toBe('2020-12-08');
  });

  it('should reflect changes from the model to the input', done => {
    c.fixture.componentInstance.testDate = new Date(2021, 10, 15).toISOString();
    c.fixture.detectChanges();
    c.fixture.whenStable().then(() => {
      expect(c.inputElement.value).toBe('2021-11-15');
      done();
    })
  });

  it('should reflect changes from the input to the model', () => {
    dispatchInputEvent(c.inputElement, '2020-12-31');
    expect(c.fixture.componentInstance.testDate).toBe(new Date(2020, 11, 31).toISOString());
  });

  it('should populate NULL for invalid dates', () => {
    dispatchInputEvent(c.inputElement, "NOT A DATE");
    expect(c.fixture.componentInstance.testDate).toBeNull();
    expect(c.inputElement.value).toBe('');
  });
});


