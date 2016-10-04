import 'es6-shim';
import 'reflect-metadata';

import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';

import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateValueAccessorModule } from './module';
import { DateValueAccessor } from './date-value-accessor';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

@Component({
  template: `
  <form>
    <input type="text" name="test" [(ngModel)]="test">
    <input type="date" name="test1" [(ngModel)]="testDate1">
    <input type="date" name="test2" [(ngModel)]="testDate2" useValueAsDate>
  </form>`
})
export class DummyFormComponent {
  test: string;
  testDate1: Date;
  testDate2: Date;
  constructor() {
    this.test = 'Hello NG2';
    this.testDate1 = new Date('2016-07-22');
    this.testDate2 = new Date('2016-09-15');
  }
}

@NgModule({
  declarations: [DummyFormComponent],
  imports: [FormsModule, DateValueAccessorModule],
  exports: [DummyFormComponent, DateValueAccessor]
})
export class DummyModule { }


describe('DateValueAccessor', () => {
  let fixture: ComponentFixture<DummyFormComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [FormsModule, DummyModule]
    });

    TestBed.compileComponents();

    fixture = TestBed.createComponent(DummyFormComponent);
    fixture.detectChanges();
  }));

  it('should fix date input controls to be bindable on dates', () => {

    var element = fixture.debugElement.query(By.directive(DateValueAccessor));
    expect(element.nativeElement.value).toBe('2016-09-15');
  });
});

