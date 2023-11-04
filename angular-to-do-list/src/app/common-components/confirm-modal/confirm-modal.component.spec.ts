import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalComponent } from './confirm-modal.component';
import { CommonModule } from "@angular/common";
import { NgbActiveModal, NgbModal, NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { PrimaryButtonModule } from "../primary-button/primary-button.module";

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmModalComponent ],
      imports: [
        CommonModule,
        NgbModalModule,
        PrimaryButtonModule
      ],
      providers: [NgbActiveModal]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
