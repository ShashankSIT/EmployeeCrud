import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  UserName: any;
  UserEmail: any;
  UserRole: any;
  Details: any;
  Coding: any;
  Communication: any;
  AllDepartments: any;

  Departments() {
    this.service.DepartmentList().subscribe((item: any)=>
    {
      this.AllDepartments = item.data
      console.log(this.AllDepartments);
    })
  }

  AddEmployee(EmpDetail: any) {
    if (EmpDetail.valid) {
      console.log(this.Coding);


      this.Coding == true ? (this.Coding = 'Coding') : '';
      this.Communication == true ? (this.Communication = 'Communication') : '';

      EmpDetail.value.skills = [this.Coding, this.Communication]
        .filter((e) => e)
        .join(', ');

      this.service.AddEmployee(EmpDetail.value).subscribe((item) => {
        this.Details = item;
        console.log(this.Details.success);
        this.route.navigate(['/dashboard/view-emp']);
      });
    }
  }
  constructor(private service: EmployeeService, private route: Router) {}

  ngOnInit(): void {
    this.Departments()
    this.UserName = localStorage.getItem('User');
    this.UserEmail = localStorage.getItem('UserEmail');
    this.UserRole = localStorage.getItem('UserRole');
    (function () {
      'use strict';
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation');

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          'submit',
          function (event: any) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          },
          false
        );
      });
    })();
  }
}
