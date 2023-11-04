import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Activity } from '../../models/activity.model';
import { ActivityService } from '../../services/activity.service';
import { ActivityStateService } from '../../services/activity-state.service';

@Component({
  selector: 'activity-page',
  templateUrl: './activity-page.component.html',
  styleUrls: ['./activity-page.component.scss']
})
export class ActivityPageComponent implements OnInit, OnDestroy {
  private activitySubject: BehaviorSubject<Activity[]>;
  private _onDestroy: Subject<void>;
  public activityIsLoading: boolean = false;
  public isAddingActivity: boolean = false;
  constructor(
    private _activityService: ActivityService,
    private _activityStateService: ActivityStateService
  ) {
    this.activitySubject = new BehaviorSubject<Activity[]>([]);
    this._onDestroy = new Subject();
  }

  // Defined Method

  get activityList$(): Observable<Activity[]> {
    return this.activitySubject.asObservable();
  }

  async getActivityList(): Promise<void> {
    try {
      this.activityIsLoading = true;
      const newActivityList = await this._activityService.getActivities();
      this.activitySubject.next(newActivityList);
    } catch (error) {
      console.error(error);
    } finally {
      this.activityIsLoading = false;
    }
  }

  async addActivity(): Promise<void> {
    if (this.isAddingActivity) return;
    try {
      this.isAddingActivity = true;
      await this._activityService.addActivity(new Activity());

      // Jika berhasil, load ulang list activity
      this.getActivityList();
    } catch (error) {
      console.error(error);
    } finally {
      this.isAddingActivity = false;
    }
  }

  // Lifecycle Method
  ngOnInit(): void {
    // Panggil API untuk load activity list
    this.getActivityList();

    // setiap ada event delete activity item, load ulang activity list
    this._activityStateService.deleteEvent$.pipe(takeUntil(this._onDestroy))
      .subscribe((event) => this.getActivityList());

    this._activityStateService.addEvent$.pipe(takeUntil(this._onDestroy))
      .subscribe((event) => this.addActivity());
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
