import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

import { LocalIsoDateValueAccessor } from './local-iso-date-value-accessor';
import { Context, dispatchInputEvent, setupReactiveForms } from './spec-utils';

@Component({
  template: `
    <form>
      <input type="date" [formControl]="testDate" useValueAsLocalIso>
    </form>`
})
export class TestFormComponent {
  testDate = new UntypedFormControl(new Date(2020, 11, 8).toISOString()); // Create LOCAL Date, HINT: Everything except the day is 0 based!
}

describe('LocalIsoDateValueAccessor (reactive forms)', () => {

  let c: Context<TestFormComponent> = {};
  setupReactiveForms(c, TestFormComponent, LocalIsoDateValueAccessor);

  it('should reflect changes from the model to the input after init', () => {
    expect(c.inputElement.value).toBe('2020-12-08');
  });

  it('should reflect changes from the model to the input', () => {
    c.fixture.componentInstance.testDate.setValue(new Date(2021, 10, 15).toISOString());
    c.fixture.detectChanges();
    expect(c.inputElement.value).toBe('2021-11-15');
  });

  it('should reflect changes from the input to the model', () => {
    dispatchInputEvent(c.inputElement, '2020-12-31');
    expect(c.fixture.componentInstance.testDate.value).toBe(new Date(2020, 11, 31).toISOString());
  });

  it('should populate NULL for invalid dates', () => {
    dispatchInputEvent(c.inputElement, "NOT A DATE");
    expect(c.fixture.componentInstance.testDate.value).toBeNull();
    expect(c.inputElement.value).toBe('');
  });
});
