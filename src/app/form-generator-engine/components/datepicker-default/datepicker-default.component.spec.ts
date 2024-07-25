import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerDefaultComponent } from './datepicker-default.component';

describe('DatepickerDefaultComponent', () => {
  let component: DatepickerDefaultComponent;
  let fixture: ComponentFixture<DatepickerDefaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerDefaultComponent]
    });
    fixture = TestBed.createComponent(DatepickerDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
