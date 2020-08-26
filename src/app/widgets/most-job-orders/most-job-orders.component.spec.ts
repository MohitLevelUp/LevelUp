import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostJobOrdersComponent } from './most-job-orders.component';

describe('MostJobOrdersComponent', () => {
  let component: MostJobOrdersComponent;
  let fixture: ComponentFixture<MostJobOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostJobOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostJobOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
