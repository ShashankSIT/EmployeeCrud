import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from 'src/app/Service/department.service';

@Component({
  selector: 'app-view-dept',
  templateUrl: './view-dept.component.html',
  styleUrls: ['./view-dept.component.css'],
})
export class ViewDeptComponent implements OnInit {

  @ViewChild('deptInput', { static: false }) deptInput!: ElementRef;

  isEdit = 0;
  element: any = {}; // Initialize as an empty object
  editingDeptId: number | null = null;
  modalValue: any;

  constructor(
    private service: DepartmentService,
    private fb: FormBuilder
  ) { }

  pageSize = 5;
  pageIndex = 0;
  searchText = '';
  sortOrder = '';
  i: any;
  DepartmentsCount: any;
  Departments: any;
  dataSource!: MatTableDataSource<any>;
  isSuccess: any
  displayedColumns: string[] = ['deptId', 'deptName', 'Actions'];

  ngOnInit(): void {
    this.GetDepartments();
  }
  addDepartment(data: any) {
    console.log(data);
    this.service.AddDepartment(data).subscribe((item) => {
      this.isSuccess = item
      if (this.isSuccess.success) {
        this.GetDepartments();
      }
      else {
        alert("This Department Already Exists")
      }
    })
    this.resetModalValue()
  }
  resetModalValue() {
    this.modalValue = '';
  }
  

  updateButton(deptId: number) {
    this.isEdit = 1;
    this.editingDeptId = deptId;
    console.log(deptId);
  }

  cancelButton(deptId: number) {
    console.log(deptId);
    this.isEdit = 0;
    this.editingDeptId = null;
  }

  saveButton(deptId: number) {
    console.log(deptId);
    this.isEdit = 0;
    this.editingDeptId = null;
    const inputValue = this.deptInput.nativeElement.value;
    console.log(inputValue);
    this.service.UpdateDepartment(deptId, inputValue).subscribe((item) => {
      this.isSuccess = item
      if (this.isSuccess.success) {
        this.GetDepartments();
      }
      else {
        alert('This Department Already Exists')
      }
    });
  }

  deleteButton(id: any) {
    if (confirm("Are You Sure You Want To Delete This Record?") == true) {
      this.service.DeleteDepartment(id).subscribe((item) => {
        alert("Deleted Successfully");
        this.GetDepartments();
      })
    }
  }

  GetDepartments() {
    this.service.DepartmentList(
      this.pageSize,
      this.pageIndex,
      this.searchText,
      this.sortOrder
    ).subscribe((item: any) => {
      this.Departments = item;
      this.DepartmentsCount = this.Departments.data[0].totalCount;
      debugger
      this.dataSource = new MatTableDataSource(this.Departments.data);
    });
  }

  Sorting(event: any) {
    this.sortOrder = event.direction;
    this.GetDepartments();
  }

  SearchDept(search: string) {
    this.searchText = search;
    this.GetDepartments();
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.GetDepartments();
  }
}