import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { IsoDateValueAccessor } from './iso-date-value-accessor';
import { Context, dispatchInputEvent, setupReactiveForms } from './spec-utils';

@Component({
  template: `
    <form>
      <input type="date" [formControl]="testDate" useValueAsIso>
    </form>`
})
export class TestFormComponent {
  testDate = new FormControl(new Date('2021-10-25').toISOString());
}

describe('IsoDateValueAccessor (reactive forms)', () => {

  let c: Context<TestFormComponent> = {};
  setupReactiveForms(c, TestFormComponent, IsoDateValueAccessor);

  it('should reflect changes from the form model to the input', () => {
    // start value
    expect(c.inputElement.value).toBe('2021-10-25');

    // changed value
    c.fixture.componentInstance.testDate.setValue(new Date('2021-07-15').toISOString());
    c.fixture.detectChanges();
    expect(c.inputElement.value).toBe('2021-07-15');
  });

  it('should reflect changes from the input to the form model', () => {
    dispatchInputEvent(c.inputElement, '2021-03-22');
    expect(c.fixture.componentInstance.testDate.value).toBe('2021-03-22T00:00:00.000Z');
  });
});
