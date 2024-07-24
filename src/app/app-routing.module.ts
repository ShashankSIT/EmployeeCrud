import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { AuthGuard } from './Guard/auth.guard';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';
import { AddDeptComponent } from './department/add-dept/add-dept.component';
import { ViewDeptComponent } from './department/view-dept/view-dept.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { TwoFactorAuthenticationComponent } from './login/two-factor-authentication/two-factor-authentication.component';

const routes: Routes = [
  { path: 'signIn', component: SignInComponent},
  { path: 'signUp', component: SignUpComponent },
  { path: 'forgot-pass', component: ForgotPasswordComponent },
  { path: 'verification', component: TwoFactorAuthenticationComponent },
  { path: 'reset-pass/:id', component: ResetPasswordComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '', component: HomeComponent, canActivate:[AuthGuard] },
      { path: 'add-emp', component: AddEmployeeComponent, canActivate: [AuthGuard], },
      { path: 'view-emp', component: ViewEmployeeComponent, canActivate: [AuthGuard], },
      { path: 'add-dept', component: AddDeptComponent, canActivate: [AuthGuard], },
      { path: 'view-dept', component: ViewDeptComponent, canActivate: [AuthGuard], },
      { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard], }
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
