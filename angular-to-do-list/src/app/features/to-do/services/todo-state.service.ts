import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class TodoStateService {
  // Untuk trigger event add activity
  private addTriggerSubject: Subject<void>;
  constructor() {
    this.addTriggerSubject = new Subject();
  }

  get addEvent$(): Observable<void> {
    return this.addTriggerSubject.asObservable();
  }

  emitAddEvent(): void {
    this.addTriggerSubject.next();
  }
}