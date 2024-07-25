import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaskedInputDefaultComponent } from './masked-input-default.component';

describe('MaskedInputDefaultComponent', () => {
  let component: MaskedInputDefaultComponent;
  let fixture: ComponentFixture<MaskedInputDefaultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaskedInputDefaultComponent]
    });
    fixture = TestBed.createComponent(MaskedInputDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
