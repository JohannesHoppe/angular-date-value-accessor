import { Component } from '@angular/core';

import { Context, dispatchInputEvent, setupTemplateDrivenForms } from './spec-utils';

@Component({
  template: `
  <form>
    <input type="date" [(ngModel)]="testDate" name="someName">
  </form>`
})
export class TestFormComponent {
  testDate: Date | string = new Date('2020-01-01'); // Create UTC Date
}

// just to describe the default behaviour af the inbuild DefaultValueAccessor
describe('DefaultValueAccessor (template-driven forms)', () => {

  let c: Context<TestFormComponent> = {};
  setupTemplateDrivenForms(c, TestFormComponent);

  it('should NOT reflect changes from the model to the input after init (when using dates)', () => {
    expect(c.fixture.componentInstance.testDate).toEqual(new Date('2020-01-01')); // nothing happens
    expect(c.inputElement.value).toBe('');
  });

  it('should reflect changes from the input to the model, BUT returns simple strings', () => {
    dispatchInputEvent(c.inputElement, '2020-12-31');
    expect(c.fixture.componentInstance.testDate).toEqual('2020-12-31');
  });

  // All our value accessors have a different behaviour here
  // by design, they return NULL instead of an empty string
  // Default implementation in Angular:
  //
  //    const normalizedValue = value == null ? '' : value;
  //
  // see: https://github.com/angular/angular/blob/539d720fcde2ba5094224abc6e7380f9f6d4828f/packages/forms/src/directives/default_value_accessor.ts#L104
  //
  // Q: Why NULL and not UNDEFINED?
  // A: input.valueAsDate also returns NULL on broken input values
  it('IMPORTANT: should populate EMPTY STRING for invalid dates', () => {
    dispatchInputEvent(c.inputElement, "NOT A DATE");
    expect(c.fixture.componentInstance.testDate).toBe(''); // <-- !!!!
    expect(c.inputElement.value).toBe('');
  });
});
