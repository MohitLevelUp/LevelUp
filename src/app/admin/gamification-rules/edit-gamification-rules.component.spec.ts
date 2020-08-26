import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGamificationRulesComponent } from './edit-gamification-rules.component';

describe('EditGamificationRulesComponent', () => {
  let component: EditGamificationRulesComponent;
  let fixture: ComponentFixture<EditGamificationRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGamificationRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGamificationRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
