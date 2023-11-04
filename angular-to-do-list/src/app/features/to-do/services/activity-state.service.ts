import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class ActivityStateService {
  // Untuk trigger event delete activity item
  private deleteTriggerSubject: Subject<void>;
  // Untuk trigger event add activity
  private addTriggerSubject: Subject<void>;
  constructor() {
    this.deleteTriggerSubject = new Subject();
    this.addTriggerSubject = new Subject();
  }

  get deleteEvent$(): Observable<void> {
    return this.deleteTriggerSubject.asObservable();
  }
  
  get addEvent$(): Observable<void> {
    return this.addTriggerSubject.asObservable();
  }

  emitDeleteEvent(): void {
    this.deleteTriggerSubject.next();
  }

  emitAddEvent(): void {
    this.addTriggerSubject.next();
  }
}