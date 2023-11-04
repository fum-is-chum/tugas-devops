import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineEditComponent } from './inline-edit.component';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonDirectivesModule } from "src/app/common-directives/common-directives.module";

describe('InlineEditComponent', () => {
  let component: InlineEditComponent;
  let fixture: ComponentFixture<InlineEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineEditComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        CommonDirectivesModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
