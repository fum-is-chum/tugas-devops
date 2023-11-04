import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAlertComponent } from './notification-alert.component';
import { CommonModule } from "@angular/common";
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { NotificationAlertService } from "./service/notification-alert.service";

describe('NotificationAlertComponent', () => {
  let component: NotificationAlertComponent;
  let fixture: ComponentFixture<NotificationAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationAlertComponent],
      imports: [
        CommonModule,
        NgbToastModule
      ],
      providers: [NotificationAlertService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
