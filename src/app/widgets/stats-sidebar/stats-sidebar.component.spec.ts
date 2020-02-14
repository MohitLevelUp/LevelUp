import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSidebarComponent } from './stats-sidebar.component';

describe('StatsSidebarComponent', () => {
  let component: StatsSidebarComponent;
  let fixture: ComponentFixture<StatsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
