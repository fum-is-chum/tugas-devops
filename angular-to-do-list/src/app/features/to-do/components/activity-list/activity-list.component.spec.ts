import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListComponent } from './activity-list.component';
import { ActivityStateService } from "../../services/activity-state.service";
import { ActivityService } from "../../services/activity.service";
import { HttpClientModule } from "@angular/common/http";
import { NotificationAlertService } from "src/app/common-components/notification-alert/service/notification-alert.service";

describe('ActivityListComponent', () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityListComponent ],
      imports: [HttpClientModule],
      providers: [ActivityStateService, ActivityService, NotificationAlertService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
