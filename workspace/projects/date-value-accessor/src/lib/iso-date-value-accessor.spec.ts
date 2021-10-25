import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { dispatchInputEvent } from './spec-utils';
import { ISODateValueAccessor } from './iso-date-value-accessor';

@Component({
  template: `
    <form>
      <input type="date" name="fixedInput" [formControl]="control" useValueAsISO>
    </form>`
})
export class TestFormComponent {
  control = new FormControl(new Date('2021-10-25').toISOString());
}

fdescribe('ISODateValueAccessor', () => {

  let fixture: ComponentFixture<TestFormComponent>;
  let component: TestFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestFormComponent, ISODateValueAccessor],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormComponent);
    component = fixture.componentInstance;
  });

  beforeEach(waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable();
  }));

  describe('with the "useValueAsISO" directive', () => {

    let fixedInput: HTMLInputElement;
    beforeEach(() => {
      fixedInput = fixture.nativeElement.querySelector('input[name=fixedInput]');
    });

    it('should reflect changes from the form model to the input', () => {
      // start value
      expect(fixedInput.value).toBe('2021-10-25');

      // changed value
      component.control.setValue(new Date('2021-07-15').toISOString());
      fixture.detectChanges();
      expect(fixedInput.value).toBe('2021-07-15');
    });

    it('should reflect changes from the input to the form model', () => {
      dispatchInputEvent(fixedInput, '2021-03-22');
      expect(component.control.value).toBe('2021-03-22T00:00:00.000Z');
    });
  });
});
