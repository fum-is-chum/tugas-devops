
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrimaryButtonComponent implements OnInit {
  @Input() dataCy: string = '';
  @Input() btnClass: string = '';
  @Input() label: string = 'Primary Button';
  @Input() icon: string = 'bi-plus-lg';
  @Input() showIcon: boolean = true;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<MouseEvent>();
  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  onClickButton(event: any) {
    this.onClick.emit(event);
  }

}
