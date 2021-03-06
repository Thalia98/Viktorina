import { SpinnerLoadComponent } from './spinner-load/spinner-load.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@NgModule({
  declarations: [SpinnerComponent, SpinnerLoadComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SpinnerComponent,
    SpinnerLoadComponent,
  ],
  providers: [FormBuilder],
})
export class SharedModule { }
