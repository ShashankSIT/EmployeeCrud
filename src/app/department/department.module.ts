import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { AddDeptComponent } from './add-dept/add-dept.component';
import { ViewDeptComponent } from './view-dept/view-dept.component';
import { MaterialModule } from 'src/MaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddDeptComponent,
    ViewDeptComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    AddDeptComponent,
    ViewDeptComponent
  ]
})
export class DepartmentModule { }
