import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from "@angular/common/http";
import { TodoService } from "../../services/to-do.service";
import { TodoStateService } from "../../services/todo-state.service";
import { TodoListComponent } from './todo-list.component';
import { NotificationAlertService } from "src/app/common-components/notification-alert/service/notification-alert.service";

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      imports: [HttpClientModule],
      providers: [TodoStateService, TodoService, NotificationAlertService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
