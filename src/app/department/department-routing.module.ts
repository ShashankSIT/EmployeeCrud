import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeptComponent } from './add-dept/add-dept.component';
import { ViewDeptComponent } from './view-dept/view-dept.component';
import { AuthGuard } from '../Guard/auth.guard';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
