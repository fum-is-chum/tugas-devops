import { TestBed } from '@angular/core/testing';

import { ActivityDetailResolver } from './activity-detail.resolver';
import { ActivityStateService } from "../services/activity-state.service";
import { ActivityService } from "../services/activity.service";
import { HttpClientModule } from "@angular/common/http";

describe('ActivityDetailResolver', () => {
  let resolver: ActivityDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ActivityStateService, ActivityService]
    });
    resolver = TestBed.inject(ActivityDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
