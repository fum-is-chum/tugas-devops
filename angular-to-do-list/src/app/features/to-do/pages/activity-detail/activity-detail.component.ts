import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../../models/activity.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivityService } from '../../services/activity.service';
import { NotificationAlertService } from 'src/app/common-components/notification-alert/service/notification-alert.service';
import { TodoStateService } from '../../services/todo-state.service';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TodoModalComponent } from '../../components/todo-modal/todo-modal.component';
import { Todo } from "../../models/to-do.model";
import { TodoService } from "../../services/to-do.service";

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit, OnDestroy {
  private activity!: Activity;
  private _onDestroy: Subject<void> = new Subject();
  public form: FormGroup;
  public todosIsLoading: boolean = false;
  private todoListSubject: BehaviorSubject<Todo[]>;
  public activeSort: string = 'sort-latest';
  public sortOptions = [
    {
      label: 'Terbaru',
      value: 'sort-latest'
    },
    {
      label: 'Terlama',
      value: 'sort-oldest'
    },
    {
      label: 'A-Z',
      value: 'sort-az'
    },
    {
      label: 'Z-A',
      value: 'sort-za'
    },
    {
      label: 'Belum Selesai',
      value: 'sort-unfinished'
    },
  ];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _activityService: ActivityService,
    private _notificationService: NotificationAlertService,
    private _todoStateService: TodoStateService,
    private _todoService: TodoService,
    private _modalService: NgbModal
  ) {
    this.activity = this._route.snapshot.data['activity'];
    this.form = this._fb.group(this.activity);
    console.log(this.activity)
    this.todoListSubject = new BehaviorSubject<Todo[]>([]);
    this.initTodoList();
  }

  get f(): { [key: string]: AbstractControl; } {
    return this.form.controls;
  }

  get todoList$(): Observable<Todo[]> {
    return this.todoListSubject.asObservable();
  }

  control(formName: string) {
    return this.f[formName] as FormControl;
  }

  initTodoList(): void {
    this.f['todo_items'].patchValue(this.activity.todo_items);
  }

  addTodo(): void {
    if (!this.f['id'].value) {
      this._notificationService.errorAlert('Terjadi kesalahan: activity_id tidak valid, silahkan kembali ke halaman sebelumnya');
      return;
    }
    const modalRef = this._modalService.open(TodoModalComponent, {
      centered: true,
      size: 'lg'
    });

    modalRef.componentInstance.activity_group_id = this.f['id'].value;

    modalRef.result
      .finally(() => {
        this.loadTodoList();
      });
  }

  async updateTitle(newTitle: string): Promise<void> {
    const { title, id } = this.form.getRawValue();
    if (title !== newTitle) {
      try {
        // // Panggil API update jika ada perubahan judul
        this.f['title'].patchValue(newTitle);
        // throw new Error('test')
        await this._activityService.updateActivityTitle(newTitle, id);
        this.activity.title = newTitle;
      } catch (error) {
        this._notificationService.errorAlert(`Terjadi kesalahan: Gagal mengupdate judul`);
        console.error(error);
        this.f['title'].patchValue(title);
      }
    }
  }

  async loadTodoList(): Promise<void> {
    if (this.todosIsLoading) return;
    try {
      this.todosIsLoading = true;
      const todos = await this._todoService.getTodos(this.activity.id!) ?? [];
      switch (this.activeSort) {
        case 'sort-latest':
          todos.sort((a, b) => b.id! - a.id!);
          break;
        case 'sort-oldest':
          todos.sort((a, b) => a.id! - b.id!);
          break;
        case 'sort-az':
          todos.sort((a, b) => {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0;
          });
          break;
        case 'sort-za':
          todos.sort((a, b) => {
            if (a.title < b.title) { return 1; }
            if (a.title > b.title) { return -1; }
            return 0;
          });
          break;
        case 'sort-unfinished':
          todos.sort((a, b) => Number(b.is_active) - Number(a.is_active));
          break;
      }
      this.todoListSubject.next(todos);

    } catch (e) {
      this._notificationService.errorAlert('Terjadi kesalahan: Gagal memuat Todo list');
      console.error(e);
    } finally {
      this.todosIsLoading = false;
    }
  }

  setSort(sortType: string) {
    switch (sortType) {
      case 'sort-latest':
        this.todoListSubject.value.sort((a, b) => b.id! - a.id!);
        break;
      case 'sort-oldest':
        this.todoListSubject.value.sort((a, b) => a.id! - b.id!);
        break;
      case 'sort-az':
        this.todoListSubject.value.sort((a, b) => {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        });
        break;
      case 'sort-za':
        this.todoListSubject.value.sort((a, b) => {
          if (a.title < b.title) { return 1; }
          if (a.title > b.title) { return -1; }
          return 0;
        });
        break;
      case 'sort-unfinished':
        this.todoListSubject.value.sort((a, b) => Number(b.is_active) - Number(a.is_active));
        break;
    }

    this.activeSort = sortType;
  }

  back(): void {
    this._router.navigate(['../../'], { relativeTo: this._route });
  }

  ngOnInit(): void {
    this.loadTodoList();
    this.todoListSubject.next(this.activity.todo_items ?? []);
    this._todoStateService.addEvent$.pipe(takeUntil(this._onDestroy))
      .subscribe(() => this.addTodo());
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
