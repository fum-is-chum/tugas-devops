import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationAlertComponent } from './notification-alert.component';
import { NotificationAlertService } from './service/notification-alert.service';

@NgModule({
  declarations: [NotificationAlertComponent],
  imports: [
    CommonModule,
    NgbToastModule
  ],
  exports: [
    NotificationAlertComponent
  ],
  providers: [NotificationAlertService]
})
export class NotificationAlertModule { }
