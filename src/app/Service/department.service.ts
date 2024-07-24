import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient) { }

  DepartmentList(rows: number, page: number, search: any, sortOrder:any) {
    
    return this.http.post(
      `http://localhost:5219/api/Employee/GetDepartmentList?rows=${rows}&pageNumber=${page}&searchByName=${search}&sortOrder=${sortOrder}`,{}
    );
  }
  UpdateDepartment(id: number, name: any){
    return this.http.post(
      `http://localhost:5219/api/Employee/UpdateDepartment/${id}?s=${name}`,{name}
    )
  }
  DeleteDepartment(id: number){
    return this.http.delete(
      `http://localhost:5219/api/Employee/DeleteDepartment/${id}`
    )
  }
  AddDepartment(data: any){
    return this.http.post(
      `http://localhost:5219/api/Employee/AddDepartment?s=${data}`, data
    )
  }
  SalaryChart(){
    return this.http.get(
      `http://localhost:5219/api/Employee/SalaryChart`
    )
  }
}
