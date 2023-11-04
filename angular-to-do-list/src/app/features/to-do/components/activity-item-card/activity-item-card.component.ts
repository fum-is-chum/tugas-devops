import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../../models/activity.model';
@Component({
  selector: 'activity-item-card',
  templateUrl: './activity-item-card.component.html',
  styleUrls: ['./activity-item-card.component.scss']
})
export class ActivityItemCardComponent implements OnInit {
  @Input() activity: Activity = new Activity();
  @Output() onDeleted = new EventEmitter<void>();
  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) { }


  deleteActivity() {
    this.onDeleted.emit();
  }

  activityDetail(): void {
    this._router.navigate(['detail', this.activity.id], { relativeTo: this._route });
  }

  ngOnInit(): void {
  }
}
