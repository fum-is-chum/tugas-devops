import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastInfo } from '../model/notification.model';

@Injectable()
export class NotificationAlertService {
  public alertListSubject: BehaviorSubject<ToastInfo[]>;
  constructor() {
    this.alertListSubject = new BehaviorSubject<ToastInfo[]>([]);
  }

  get alertList$(): Observable<ToastInfo[]> {
    return this.alertListSubject.asObservable()
  }

  alert(body: string) {
    // console.log(this.alertListSubject.value)
    if (this.alertListSubject.value.length > 3) {
      this.alertListSubject.value.pop();
    }
    this.alertListSubject.next([...this.alertListSubject.value, { body, show: true, iconClass: 'bi bi-exclamation-circle' }])
  }

  errorAlert(body: string) {
    if (this.alertListSubject.value.length > 3) {
      this.alertListSubject.value.pop();
    }
    this.alertListSubject.next([...this.alertListSubject.value, { body, show: true, iconClass: 'bi bi-exclamation-triangle' }])
  }

  close(index: number) {
    this.alertListSubject.value.splice(index, 1)
    this.alertListSubject.next(
      this.alertListSubject.value
    )
  }

  // show(header: string, body: string) {
  //   this.toasts.push({ header, body })
  // }

  // remove(toast: ToastInfo) {
  //   this.toasts = this.toasts.filter((t) => t != toast)
  // }
}
