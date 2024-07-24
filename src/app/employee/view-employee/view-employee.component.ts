import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Service/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
})
export class ViewEmployeeComponent implements OnInit {
  multipleSelect() {
    this.GetEmployess(
      this.pageSize2,
      this.pageIndex2,
      this.searchByName,
      this.sortBy,
      this.sortOrder,
      this.departmentList.value
    );
    this.paginator.pageIndex = 0;
  }

  SearchName(name: any) {
    name == '' ? (this.searchByName = '') : (this.searchByName = name);
    this.GetEmployess(
      this.pageSize2,
      this.pageIndex2,
      this.searchByName,
      this.sortBy,
      this.sortOrder,
      this.departmentList.value
    );
  }

  searchFromAnywhere(name: any) {
    debugger
    this.pageIndex2 = 0;
    name == '' ? (this.searchByName = '') : (this.searchByName = name);
    this.GetEmployess(
      this.pageSize2,
      this.pageIndex2,
      this.searchByName,
      this.sortBy,
      this.sortOrder,
      this.departmentList.value
    );
    this.paginator.pageIndex = 0;
  }
  previousPage() {
    if (this.pageIndex > 1) {
      this.pageIndex -= 1;
      this.GetEmployess(this.selectedPageSize, this.pageIndex);
    }
  }
  nextPage() {
    if (
      this.EmpDataCount >=
      this.selectedPageSize * (this.pageIndex + 1) - (this.selectedPageSize - 1)
    ) {
      this.pageIndex += 1;
      this.GetEmployess(this.selectedPageSize, this.pageIndex);
    }
    // if ((this.pageIndex + 1) * this.selectedPageSize < this.EmpDataCount) {
    //   // There are more records available for the next page
    //   this.pageIndex += 1;
    //   this.GetEmployess(this.selectedPageSize, this.pageIndex);
    // }
  }
  getPageValue(event: any) {
    this.pageIndex = event.target.textContent;
    event.target.classList.add('active');
    this.GetEmployess(this.selectedPageSize, this.pageIndex);
  }
  SelectRows() {
    this.pageIndex = 1;
    this.GetEmployess(this.selectedPageSize, this.pageIndex);
  }
  Employee = {
    id: null,
    Department: null,
    Email: null,
    Name: null,
    Salary: null,
    Skills: null,
    Coding: false,
    Communication: false,
    Gender: null,
  };
  EmpDetail: any;
  EmpDataCount: any;
  selectedPageSize: any;
  EmployeeDetail: any;
  pageIndex = 1;
  pageIndex2 = 0;
  pageSize2 = 5;
  searchByName = '';
  sortBy = '';
  sortOrder = '';
  AllDepartments: any;
  departmentList = new FormControl('');
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild(MatSort) sort: any;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    // '#',
    'EmpName',
    'EmpEmail',
    'EmpGender',
    'EmpDepartment',
    'Skills',
    'Salary',
    'Actions',
  ];
  constructor(
    private service: EmployeeService,
    private route: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  UpdateUser(data: any) {

    data.value.Coding == true ? (data.value.Coding = 'Coding') : '';
    data.value.Communication == true
      ? (data.value.Communication = 'Communication')
      : '';

    data.value.Skills = [data.value.Coding, data.value.Communication]
      .filter((e) => e)
      .join(', ');
    this.service
      .UpdateEmployee(data.value, data.value.EmpId)
      .subscribe((item) => {
        this.SearchName('');
      });
  }
  updateButton(id: any) {
    this.service.GetEmployeeById(id).subscribe((item: any) => {
      this.EmployeeDetail = item;
      this.Employee = {
        id: this.EmployeeDetail.data.empId,
        Department: this.EmployeeDetail.data.empDepartment,
        Email: this.EmployeeDetail.data.empEmail,
        Name: this.EmployeeDetail.data.empName,
        Salary: this.EmployeeDetail.data.salary,
        Skills: this.EmployeeDetail.data.skills,
        Gender: this.EmployeeDetail.data.empGender,
        Coding: false,
        Communication: false,
      };
      this.Employee.Coding = this.EmployeeDetail.data.skills
        .split(',')
        .map((skill: string) => skill.trim())
        .includes('Coding')
        ? true
        : false;
      this.Employee.Communication = this.EmployeeDetail.data.skills
        .split(',')
        .map((skill: string) => skill.trim())
        .includes('Communication')
        ? true
        : false;
    });

  }
  deleteButton(id: any) {
    if (confirm('Are You Sure You Want To Delete This Record?')) {
      this.service.DeleteEmployee(id).subscribe((item: any) => {
        alert('Record Deleted Successfully');
        this.GetAllEmployees();
      });
    }
  }
  GetAllEmployees() {
    return new Promise((resolve, reject) => {
      this.service.getAllUsers().subscribe((item: any) => {
        this.EmpDetail = item;
        // this.dataSource = new MatTableDataSource(this.EmpDetail.data);
        this.EmpDataCount = this.EmpDetail.dataCount;
        resolve(this.EmpDataCount);
      });
    });
  }
  onPageChange(event: any) {
    event.length = this.EmpDataCount;
    this.pageSize2 = event.pageSize;
    this.pageIndex2 = event.pageIndex;
    this.SearchName(this.searchByName);
  }

  GetEmployess(
    rows: any,
    page: any,
    name?: any,
    sortBy?: any,
    sortOrder?: any,
    departmentList?: any
  ) {
    this.service
      .EmployeePagination(rows, page, name, sortBy, sortOrder, departmentList)
      .subscribe((item) => {
        this.EmpDetail = item;
        this.dataSource = new MatTableDataSource(this.EmpDetail.data);
        this.EmpDetail.data.length == 0 ? this.EmpDataCount =  0 : this.EmpDataCount =  this.EmpDetail.data[0].totalCount 
        
      });
  }

  Departments() {
    this.service.DepartmentList().subscribe((item: any) => {
      this.AllDepartments = item.data;
    });
  }

  announceSortChange(sortState: any) {
    this.sortBy = sortState.active;
    this.sortOrder = sortState.direction;

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    this.GetEmployess(
      this.pageSize2,
      this.pageIndex2,
      this.searchByName,
      this.sortBy,
      this.sortOrder,
      this.departmentList.value
    );
    this.paginator.pageIndex = 0;
  }

  ngOnInit(): void {
    this.Departments();
    (function () {
      'use strict';
      var forms = document.querySelectorAll('.needs-validation');
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
    });
    this.GetEmployess(this.pageSize2, this.pageIndex2);
  }
}
