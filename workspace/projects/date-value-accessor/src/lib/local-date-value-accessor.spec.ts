import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { LocalDateValueAccessor } from './local-date-value-accessor.directive';

@Component({
  template: `
    <form>
      <input type="date" name="fixedInput" [(ngModel)]="testDate" useValueAsLocalDate>
    </form>`
})
export class TestFormComponent {
  // Create local date from a specific day
  // Hours are set to 0 in local time
  testDate: Date = new Date(2020, 11, 8);
}

function dispatchInputEvent(inputElement: HTMLInputElement, fixture: ComponentFixture<TestFormComponent>, text: string) {
  inputElement.value = text;
  inputElement.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  return fixture.whenStable();
}

describe('LocalDateValueAccessor', () => {

  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestFormComponent, LocalDateValueAccessor],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormComponent);
    fixture.detectChanges();
  });

  describe('with the "useValueAsDateLocal" attribute', () => {

    let fixedInput: DebugElement;
    beforeEach(() => fixedInput = fixture.debugElement.query(By.css('input[name=fixedInput]')));

    it('should fix date input controls to bind on dates', fakeAsync((done) => {
      fixture.whenStable().then(() => {
        expect(fixedInput.nativeElement.value).toBe('2020-12-08');
        done();
      });
    }));

    it('should also populate dates (instead of strings) on change', fakeAsync(done => {
      dispatchInputEvent(fixedInput.nativeElement, fixture, '2020-12-31').then(() => {
        tick();
        fixture.detectChanges();
        expect(fixture.componentInstance.testDate).toEqual(jasmine.any(Date));
        expect(fixture.componentInstance.testDate).toEqual(new Date('2020-12-31'));
        done();
      });
    }));
  });
});
