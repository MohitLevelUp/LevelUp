import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostInterviewsComponent } from './most-interviews.component';

describe('MostInterviewsComponent', () => {
  let component: MostInterviewsComponent;
  let fixture: ComponentFixture<MostInterviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostInterviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
