import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DateLocalValueAccessor } from './date-local-value-accessor';

@Component({
  template: `
  <form>
    <input type="text" name="test0" [(ngModel)]="test">
    <input type="date" name="normalInput" [(ngModel)]="testDate1">
    <input type="date" name="fixedInput" [(ngModel)]="testDate2" useValueAsDateLocal>
  </form>`
})
export class TestFormComponent {
  test: string;
  testDate1: any;
  testDate2: Date;

  constructor() {
    this.test = 'Hello Angular';
    this.testDate1 = new Date('2019-01-01');
    this.testDate2 = new Date('2020-01-01');
  }
}

function dispatchInputEvent(inputElement: HTMLInputElement, fixture: ComponentFixture<TestFormComponent>, text: string) {
  inputElement.value = text;
  inputElement.dispatchEvent(new Event('input'));
  fixture.detectChanges();
  return fixture.whenStable();
}

describe('DateLocalValueAccessor', () => {

  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestFormComponent, DateLocalValueAccessor],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFormComponent);
    fixture.detectChanges();
  });

  describe('without the "useValueAsDateLocal" attribute', () => {

    let normalInput: DebugElement;
    beforeEach(() => normalInput = fixture.debugElement.query(By.css('input[name=normalInput]')));

    it('should NOT fix date input controls', () => {
      expect(normalInput.nativeElement.value).toBe('');
    });

    it('should populate simple strings on change', fakeAsync(done => {
      dispatchInputEvent(normalInput.nativeElement, fixture, '1984-09-30').then(() => {
        tick();
        fixture.detectChanges();
        expect(fixture.componentInstance.testDate1).toEqual('1984-09-30');
        done();
      });
    }));
  });

  describe('with the "useValueAsDateLocal" attribute', () => {

    let fixedInput: DebugElement;
    beforeEach(() => fixedInput = fixture.debugElement.query(By.css('input[name=fixedInput]')));

    it('should fix date input controls to bind on dates', fakeAsync((done) => {
      fixture.whenStable().then(() => {
        expect(fixedInput.nativeElement.value).toBe('2020-01-01');
        done();
      });
    }));

    it('should also populate dates (instead of strings) on change', fakeAsync(done => {
      dispatchInputEvent(fixedInput.nativeElement, fixture, '2020-12-31').then(() => {
        tick();
        fixture.detectChanges();
        expect(fixture.componentInstance.testDate2).toEqual(jasmine.any(Date));
        expect(fixture.componentInstance.testDate2).toEqual(new Date('2020-12-31'));
        done();
      });
    }));
  });
});
