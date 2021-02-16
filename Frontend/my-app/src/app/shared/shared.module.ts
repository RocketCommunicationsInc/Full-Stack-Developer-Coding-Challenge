import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid/data-grid.component';

@NgModule({
  declarations: [DataGridComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DataGridComponent,
  ]
})
export class SharedModule { }
