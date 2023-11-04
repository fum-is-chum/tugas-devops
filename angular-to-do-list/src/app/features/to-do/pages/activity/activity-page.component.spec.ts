import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPageComponent } from './activity-page.component';
import { ActivityStateService } from "../../services/activity-state.service";
import { ActivityService } from "../../services/activity.service";
import { HttpClientModule } from "@angular/common/http";

describe('ActivityPageComponent', () => {
  let component: ActivityPageComponent;
  let fixture: ComponentFixture<ActivityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityPageComponent],
      imports: [HttpClientModule],
      providers: [ActivityStateService, ActivityService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
