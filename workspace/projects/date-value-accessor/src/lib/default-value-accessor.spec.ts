import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DateValueAccessor } from './date-value-accessor';
import { dispatchInputEvent } from './spec-utils';

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

  let fixture: ComponentFixture<TestFormComponent>;
  let inputElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestFormComponent, DateValueAccessor],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormComponent);
  });

  beforeEach(waitForAsync(() => {
    // https://stackoverflow.com/questions/39582707/updating-input-html-field-from-within-an-angular-2-test
    fixture.detectChanges();
    fixture.whenStable();
  }));

  beforeEach(() => inputElement = fixture.debugElement.query(By.css('input')));

  it('should NOT fix date input controls', () => {
    expect(inputElement.nativeElement.value).toBe('');
  });

  it('should populate simple strings on change', waitForAsync(() => {
    dispatchInputEvent(inputElement.nativeElement, '1984-09-30');
    expect(fixture.componentInstance.testDate).toEqual('1984-09-30');
  }));
});
