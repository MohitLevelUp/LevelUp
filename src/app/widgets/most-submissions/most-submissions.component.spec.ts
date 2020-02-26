import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostSubmissionsComponent } from './most-submissions.component';

describe('MostSubmissionsComponent', () => {
  let component: MostSubmissionsComponent;
  let fixture: ComponentFixture<MostSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
