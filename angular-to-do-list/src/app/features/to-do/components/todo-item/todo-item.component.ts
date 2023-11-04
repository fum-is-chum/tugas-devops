import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from "../../models/to-do.model";

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = new Todo();
  @Output() onDelete = new EventEmitter<void>();
  @Output() onToggle = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<void>();
  constructor(
  ) { }

  updateIsActive() {
    this.onToggle.emit();
  }

  deleteTodo() {
    this.onDelete.emit();
  }

  editTodo() {
    this.onEdit.emit();
  }

  ngOnInit(): void {

  }

  test() {
    console.count();
  }

}
