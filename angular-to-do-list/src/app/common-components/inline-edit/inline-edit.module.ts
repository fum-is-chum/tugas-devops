import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineEditComponent } from './inline-edit.component';
import { CommonDirectivesModule } from 'src/app/common-directives/common-directives.module';

@NgModule({
  declarations: [
    InlineEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonDirectivesModule
  ],
  providers: [
  ],
  exports: [
    InlineEditComponent
  ]
})
export class InlineEditModule { }
