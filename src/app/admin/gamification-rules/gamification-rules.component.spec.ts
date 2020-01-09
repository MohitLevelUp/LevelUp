import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationRulesComponent } from './gamification-rules.component';

describe('GamificationRulesComponent', () => {
  let component: GamificationRulesComponent;
  let fixture: ComponentFixture<GamificationRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamificationRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamificationRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
