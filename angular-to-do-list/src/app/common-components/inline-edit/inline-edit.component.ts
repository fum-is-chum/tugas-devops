import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'inline-edit',
  templateUrl: './inline-edit.component.html',
  styleUrls: ['./inline-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineEditComponent implements OnInit {
  public formControl = new FormControl();
  @Input() className: string = '';
  @Input() viewDisplay!: TemplateRef<any>;
  @Input() value: string | any;
  @Input() id: number | string = +new Date();
  @Output() valueChange = new EventEmitter<string>();
  public isFocused: boolean = false;
  constructor(
    private _cd: ChangeDetectorRef
  ) {
  }

  triggerFocusOut(): void {
    this.valueChange.emit(this.formControl.value);
    this.isFocused = false;
  }

  setFocus(): void {
    this.isFocused = true;
    this.formControl.patchValue(this.value);
    this._cd.markForCheck();
  }

  ngOnInit(): void {
  }

}
