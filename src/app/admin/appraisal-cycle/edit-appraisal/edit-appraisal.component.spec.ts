import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppraisalComponent } from './edit-appraisal.component';

describe('EditAppraisalComponent', () => {
  let component: EditAppraisalComponent;
  let fixture: ComponentFixture<EditAppraisalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAppraisalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
