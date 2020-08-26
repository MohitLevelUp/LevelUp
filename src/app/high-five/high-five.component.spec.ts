import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighFiveComponent } from './high-five.component';

describe('HighFiveComponent', () => {
  let component: HighFiveComponent;
  let fixture: ComponentFixture<HighFiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighFiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
