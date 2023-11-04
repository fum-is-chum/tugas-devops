import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppHeaderComponent],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    AppHeaderComponent
  ]
})
export class AppHeaderModule { }
