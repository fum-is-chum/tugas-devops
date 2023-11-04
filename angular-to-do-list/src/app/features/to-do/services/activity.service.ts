import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Activity } from "../models/activity.model";
import { ApiResponse } from "../models/api-response.model";

@Injectable()
export class ActivityService {
  constructor(
    private _http: HttpClient
  ) {

  }

  getActivities(): Promise<Activity[]> {
    return new Promise((resolve, reject) => {
      this._http.get<ApiResponse>(`/activity-groups`, { responseType: 'json' })
        .subscribe({
          next: (resp) => resolve(resp.data),
          error: (err) => reject(err),
          complete: () => { }
        });
    });
  }

  getActivity(id: number): Promise<Activity> {
    return new Promise((resolve, reject) => {
      this._http.get<ApiResponse>(`/activity-groups/${id}`, { responseType: 'json' })
        .subscribe({
          next: (resp) => resolve(resp.data),
          error: (err) => reject(err),
          complete: () => { }
        });
    });
  }

  addActivity(data: Activity): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      this._http.post<ApiResponse>(`/activity-groups`, data, { responseType: 'json' })
        .subscribe({
          next: (resp) => resolve(resp),
          error: (err) => reject(err),
          complete: () => { }
        });
    });
  }

  removeActivity(id: number): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      this._http.delete<ApiResponse>(`/activity-groups/${id}`, { responseType: 'json' })
        .subscribe({
          next: (resp) => resolve(resp),
          error: (err) => reject(err),
          complete: () => { }
        });
    });
  }

  updateActivityTitle(title: string, id: number): Promise<ApiResponse> {
    return new Promise((resolve, reject) => {
      this._http.patch<ApiResponse>(`/activity-groups/${id}`, { title }, { responseType: 'json' })
        .subscribe({
          next: (resp) => resolve(resp),
          error: (err) => reject(err),
          complete: () => { }
        });
    });
  }

  test() {
    alert("TEST");
  }
}
