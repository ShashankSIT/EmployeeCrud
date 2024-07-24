import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { MaterialModule } from 'src/MaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import {NgFor} from '@angular/common';


@NgModule({
  declarations: [
    AddEmployeeComponent,
    ViewEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    FormsModule,
    MatSortModule,
    NgFor,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    AddEmployeeComponent,
    ViewEmployeeComponent
  ]
})
export class EmployeeModule { }
