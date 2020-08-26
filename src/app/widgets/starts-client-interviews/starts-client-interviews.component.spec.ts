import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartsClientInterviewsComponent } from './starts-client-interviews.component';

describe('StartsClientInterviewsComponent', () => {
  let component: StartsClientInterviewsComponent;
  let fixture: ComponentFixture<StartsClientInterviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartsClientInterviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartsClientInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
