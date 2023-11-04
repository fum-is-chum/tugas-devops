import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationAlertService } from 'src/app/common-components/notification-alert/service/notification-alert.service';
import { Todo } from '../../models/to-do.model';
import { TodoService } from '../../services/to-do.service';

export enum TODO_ACTION {
  ADD = "Tambah",
  EDIT = "Edit"
}

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.scss']
})
export class TodoModalComponent implements OnInit {
  public action = TODO_ACTION.ADD;
  public activity_group_id!: number;
  public todo?: Todo;
  public form: FormGroup;
  public isLoading: boolean = false;
  public submitted: boolean = false;
  public priorityList: string[] = Todo.priorities;

  constructor(
    private _todoService: TodoService,
    private _fb: FormBuilder,
    private _notificationService: NotificationAlertService,
    private _activeModal: NgbActiveModal
  ) {
    this.form = this._fb.group(new Todo());
    this.addValidators();
  }

  get priorityMap() {
    return Todo.priorityMap;
  }

  get f(): {
    [key: string]: AbstractControl;
  } {
    return this.form.controls;
  }

  private addValidators(): void {
    const reqFields = Todo.requiredFields;

    reqFields.forEach((field) => {
      this.f[field].addValidators([Validators.required]);
    });
  }

  async save(): Promise<void> {
    this.submitted = true;
    if (this.form.invalid || this.isLoading) return;
    try {
      this.isLoading = true;
      const todo = this.form.getRawValue();
      if (this.action === TODO_ACTION.ADD) {
        await this._todoService.addTodo(todo);
      } else {
        await this._todoService.updateTodo(todo);
      }
      this.close();
    } catch (error) {
      this._notificationService.errorAlert(`Terjadi kesalahan: Gagal ${this.action === TODO_ACTION.ADD ? 'menambahkan' : 'mengeditf'} Todo`);
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  dismiss(): void {
    this._activeModal.dismiss();
  }

  close(): void {
    this._activeModal.close();
  }

  ngOnInit(): void {
    if (this.activity_group_id) {
      this.f['activity_group_id'].patchValue(this.activity_group_id);
    }

    if (this.todo) {
      this.form = this._fb.group(this.todo);
      this.addValidators();
    }

    // setTimeout(() => {
    //   this.close()
    // }, 1000)
  }

}
