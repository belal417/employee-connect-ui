import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from 'src/app/department-list/department-list.component';


@Injectable({
  providedIn: 'root'
})
export class DepartmentDataService {

  constructor(private http:HttpClient) { }

  public getAllDeptWithEmp(){
    return this.http.get<Department[]>(`http://localhost:8080/v1/deparments`);
  }

  public getDeptByID(id:number){
    return this.http.get<Department>(`http://localhost:8080/v1/deparments/${id}`);
  }

  public addDepartment(department:Department){
    return this.http.post(`http://localhost:8080/v1/deparments`,department);
  }
  public updateDepartment(id:number, department:Department){
    return this.http.put(`http://localhost:8080/v1/deparments/${id}`,department);
  }

  public deleteDepartment(id:number){
    console.log("inside delete department function")
    return this.http.delete(`http://localhost:8080/v1/deparments/${id}`);
  }


}
