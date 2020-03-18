import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateValueAccessorComponent } from './date-value-accessor.component';

describe('DateValueAccessorComponent', () => {
  let component: DateValueAccessorComponent;
  let fixture: ComponentFixture<DateValueAccessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateValueAccessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateValueAccessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
