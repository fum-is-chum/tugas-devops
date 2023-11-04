import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastInfo } from './model/notification.model';
import { NotificationAlertService } from './service/notification-alert.service';
@Component({
  selector: 'notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.scss']
})
export class NotificationAlertComponent implements OnInit {
  public autohide = true;
  constructor(
    private _notificationAlertService: NotificationAlertService
  ) { }

  get alerts$(): Observable<ToastInfo[]> {
    return this._notificationAlertService.alertList$;
  }

  close(idx: number): void {
    this._notificationAlertService.close(idx)
  }

  ngOnInit(): void {
  }

}
