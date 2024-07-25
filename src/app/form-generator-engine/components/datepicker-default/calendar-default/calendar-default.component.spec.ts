import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDefaultComponent } from './calendar-default.component';

describe('CalendarDefaultComponent', () => {
  let component: CalendarDefaultComponent;
  let fixture: ComponentFixture<CalendarDefaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarDefaultComponent]
    });
    fixture = TestBed.createComponent(CalendarDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
