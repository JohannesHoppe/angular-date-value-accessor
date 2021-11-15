import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


export function dispatchInputEvent(inputElement: HTMLInputElement, text: string): void {
  inputElement.value = text;
  inputElement.dispatchEvent(new Event('input'));
}

export interface Context<T> {
  fixture?: ComponentFixture<T>;
  inputElement?: DebugElement;
}

export function setupTemplateDrivenForms<TComp, TAcess>(
  context: Context<TComp>,
  testComponent: Type<TComp>,
  acessor?: TAcess) {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        testComponent,
        ...(acessor ? [acessor]: [])
      ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    context.fixture = TestBed.createComponent(testComponent);
  });

  beforeEach(waitForAsync(() => {
    // https://stackoverflow.com/questions/39582707/updating-input-html-field-from-within-an-angular-2-test
    context.fixture.detectChanges();
    context.fixture.whenStable();
  }));

  beforeEach(() => context.inputElement = context.fixture.debugElement.query(By.css('input')));
}
