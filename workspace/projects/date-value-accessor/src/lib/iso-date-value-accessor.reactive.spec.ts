import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { dispatchInputEvent } from './spec-utils';
import { IsoDateValueAccessor } from './iso-date-value-accessor';

@Component({
  template: `
    <form>
      <input type="date" [formControl]="control" useValueAsIso>
    </form>`
})
export class TestFormComponent {
  control = new FormControl(new Date('2021-10-25').toISOString());
}

describe('IsoDateValueAccessor (reactive forms)', () => {

  let fixture: ComponentFixture<TestFormComponent>;
  let inputElement: HTMLInputElement;
  let component: TestFormComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestFormComponent, IsoDateValueAccessor],
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

  beforeEach(() => inputElement = fixture.nativeElement.querySelector('input'));

  it('should reflect changes from the form model to the input', () => {
    // start value
    expect(inputElement.value).toBe('2021-10-25');

    // changed value
    component.control.setValue(new Date('2021-07-15').toISOString());
    fixture.detectChanges();
    expect(inputElement.value).toBe('2021-07-15');
  });

  it('should reflect changes from the input to the form model', () => {
    dispatchInputEvent(inputElement, '2021-03-22');
    expect(component.control.value).toBe('2021-03-22T00:00:00.000Z');
  });
});
