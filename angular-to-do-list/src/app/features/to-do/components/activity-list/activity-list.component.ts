import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from "src/app/common-components/confirm-modal/confirm-modal.component";
import { Activity } from "../../models/activity.model";
import { ActivityStateService } from '../../services/activity-state.service';
import { ActivityService } from "../../services/activity.service";
import { NotificationAlertService } from "src/app/common-components/notification-alert/service/notification-alert.service";

@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  @Input() activities: any[] | null = [];
  constructor(
    private _activityStateService: ActivityStateService,
    private _activityService: ActivityService,
    private _notificationService: NotificationAlertService,
    private _modalService: NgbModal
  ) { }

  confirmDeletetion(activity: Activity) {
    const modalRef = this._modalService.open(ConfirmModalComponent, {
      centered: true,

    });

    modalRef.componentInstance.dialog = `Apakah anda yakin menghapus activity<br/><b>"${activity.title}"?</b>`;
    modalRef.componentInstance.callback = async () => await this._activityService.removeActivity(activity.id!);
    modalRef.result
      .catch(() => { }) // user dismiss
      .then((isDeleted) => {
        if (isDeleted) {
          this._notificationService.alert('Activity berhasil dihapus');
          this.emitDeleteEvent();
        }
      }); // user close
  }


  emitDeleteEvent(): void {
    this._activityStateService.emitDeleteEvent();
  };

  emitAddEvent(): void {
    this._activityStateService.emitAddEvent();
  };

  ngOnInit(): void {
  };

}
