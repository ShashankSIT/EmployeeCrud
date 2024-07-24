import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from '../Service/department.service';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  twoFactor: boolean = false

  SaveSettings() {
    this.isClassAdded2 = !this.isClassAdded2
    console.log(this.twoFactor); 
    this.userService.twoFactorAuth(this.twoFactor, localStorage.getItem('UserId')).subscribe((item: any)=>{
      alert('Two Factor Authentication Enabled')
    })
  }
  responseData: any;
  CurrentRoute: any;
  UserName: any;
  isClassAdded: any;
  isClassAdded2 = false;
  UserRole: any;

  ShowSidebar() {
    const body = document.body;
    this.isClassAdded = !this.isClassAdded;

    if (this.isClassAdded) {
      body.classList.add('g-sidenav-pinned');
    } else {
      body.classList.remove('g-sidenav-pinned');
    }
  }

  constructor(private route: Router, private service: DepartmentService, private userService: UserService) {
    this.responseData = this.route.getCurrentNavigation()?.extras.state
    this.twoFactor = this.responseData?.twoFactor
   }

  ngDoCheck(): void {
    if (this.CurrentRoute !== this.route.url) {
      this.CurrentRoute = this.route.url;
      this.UserName = localStorage.getItem('User')
      this.UserRole = localStorage.getItem('UserRole')
    }
  }
}
