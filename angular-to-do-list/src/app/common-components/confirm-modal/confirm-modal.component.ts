import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit, AfterViewInit {
  public dialog: string = '';
  public isLoading: boolean = false;
  public callback?: Function;
  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  dismiss(): void {
    this.activeModal.dismiss();
  }

  async close(confirm: boolean = true): Promise<void> {
    await this.runCallback();
    this.activeModal.close(true);
  }

  async runCallback(): Promise<void> {
    if (this.isLoading) return;
    try {
      this.isLoading = true;
      if (this.callback) {
        await this.callback();
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  ngOnInit(): void {
    // console.log(this.callback);
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.activeModal.close();
    // }, 1000);
  }
}
