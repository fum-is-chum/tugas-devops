import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Activity } from '../models/activity.model';
import { ActivityService } from '../services/activity.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityDetailResolver implements Resolve<Activity> {
  constructor(
    private _activityService: ActivityService,
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Activity> {
    return new Promise((resolve, reject) => {
      const id = route.params['id'];
      if (id) {
        this._activityService.getActivity(id).then((resp) => resolve(resp)).catch((err) => reject(err))
      }
    })
  }
}
