import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastMonthStartsComponent } from './last-month-starts.component';

describe('LastMonthStartsComponent', () => {
  let component: LastMonthStartsComponent;
  let fixture: ComponentFixture<LastMonthStartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastMonthStartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastMonthStartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
