import { Component } from '@angular/core';

import { IsoDateValueAccessor } from './iso-date-value-accessor';
import { Context, dispatchInputEvent, setupTemplateDrivenForms } from './spec-utils';

@Component({
  template: `
  <form>
    <input type="date" [(ngModel)]="testDate" name="someName" useValueAsIso>
  </form>`
})
export class TestFormComponent {
  testDate = new Date('2020-01-01').toISOString(); // Create UTC Date
}

describe('IsoDateValueAccessor (template-driven forms)', () => {

  let c: Context<TestFormComponent> = {};
  setupTemplateDrivenForms(c, TestFormComponent, IsoDateValueAccessor);

  it('should reflect changes from the model to the input after init', () => {
    expect(c.inputElement.value).toBe('2020-01-01');
  });

  it('should reflect changes from the model to the input', done => {
    c.fixture.componentInstance.testDate = new Date('2021-11-15').toISOString();
    c.fixture.detectChanges();
    c.fixture.whenStable().then(() => {
      expect(c.inputElement.value).toBe('2021-11-15');
      done();
    })
  });

  it('should reflect changes from the input to the model', () => {
    dispatchInputEvent(c.inputElement, '2020-12-31');
    expect(c.fixture.componentInstance.testDate).toBe('2020-12-31T00:00:00.000Z');
  });

  it('should populate NULL for invalid dates', () => {
    dispatchInputEvent(c.inputElement, "NOT A DATE");
    expect(c.fixture.componentInstance.testDate).toBeNull();
    expect(c.inputElement.value).toBe('');
  });
});


