import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getAllUsers(): any {
    return this.http.get('http://localhost:5219/api/Employee/GetEmployeeList');
  }

  DepartmentList(): any {
    return this.http.get(
      'http://localhost:5219/api/Employee/GetDepartmentList1'
    );
  }

  DeleteEmployee(id: number) {
    return this.http.delete(
      `http://localhost:5219/api/Employee/DeleteEmployee?id=${id}`
    );
  }

  GetEmployeeById(id: number) {
    return this.http.get(
      'http://localhost:5219/api/Employee/GetEmployeeById/' + id
    );
  }

  AddEmployee(data: any) {
    return this.http.post(
      'http://localhost:5219/api/Employee/AddEmployee',
      data
    );
  }

  UpdateEmployee(data: any, Id: any) {
    return this.http.post(
      `http://localhost:5219/api/Employee/UpdateEmployee?id=${Id}`,
      data
    );
  }
  EmployeePagination(
    rows: any,
    page: any,
    name?: any,
    sortBy?: any,
    SortOrder?: any,
    DepartmentList?: any
  ) {
    if (name == null) {
      return this.http.post(
        `http://localhost:5219/api/Employee/EmployeePagination?rows=${rows}&pageNumber=${page}`,
        {}
      );
    } else {
      return this.http.post(
        `http://localhost:5219/api/Employee/EmployeePagination?rows=${rows}&pageNumber=${page}&searchByName=${name}&sortBy=${sortBy}&sortOrder=${SortOrder}&DepartmentList=${DepartmentList}`,
        {}
      );
    }
  }
}
