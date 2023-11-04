import { EventEmitter, Component, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../../models/to-do.model';
import { TodoStateService } from '../../services/todo-state.service';
import { TodoService } from "../../services/to-do.service";
import { NotificationAlertService } from "src/app/common-components/notification-alert/service/notification-alert.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ConfirmModalComponent } from "src/app/common-components/confirm-modal/confirm-modal.component";
import { TODO_ACTION, TodoModalComponent } from "../todo-modal/todo-modal.component";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[] | null = [];
  @Output() itemDeleted = new EventEmitter<void>();
  @Output() itemUpdated = new EventEmitter<void>();
  constructor(
    private _todoStateService: TodoStateService,
    private _todoService: TodoService,
    private _notificationService: NotificationAlertService,
    private _modalService: NgbModal
  ) { }

  emitAddEvent(): void {
    this._todoStateService.emitAddEvent();
  }

  confirmDeletion(idx: number): void {
    const todo = this.todos![idx];
    const modalRef = this._modalService.open(ConfirmModalComponent, {
      centered: true,

    });

    modalRef.componentInstance.dialog = `Apakah anda yakin menghapus List Item<br/><b>"${todo.title}"?</b>`;
    modalRef.componentInstance.callback = async () => await this._todoService.deleteTodo(todo.id!);
    modalRef.result
      .catch(() => { }) // user dismiss
      .then((isDeleted) => {
        if (isDeleted) {
          this._notificationService.alert('List Item berhasil dihapus');
          this.itemDeleted.emit();
        }
      });
  }

  async updateIsActive(idx: number): Promise<void> {
    let todo = this.todos![idx];
    const newTodo = Object.assign({}, { ...todo, is_active: !todo.is_active });
    try {
      await this._todoService.updateTodo(newTodo);
      this.todos![idx] = newTodo;
    } catch (e) {
      this._notificationService.errorAlert('Terjadi kesalahan: Gagal mengupdate status todo');
      console.error(e);
    }
  }

  updateTodo(idx: number) {
    const todo = this.todos![idx];
    const modalRef = this._modalService.open(TodoModalComponent, {
      centered: true,
      size: 'lg'
    });

    modalRef.componentInstance.action = TODO_ACTION.EDIT;
    modalRef.componentInstance.todo = todo;

    modalRef.result.then(() => this.itemUpdated.emit());
  }

  ngOnInit(): void {
  }

}
