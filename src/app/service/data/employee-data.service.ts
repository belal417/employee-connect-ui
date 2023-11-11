import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from 'src/app/department-list/department-list.component';
import { Employee } from 'src/app/employee/employee.component';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(private httpClient: HttpClient) { }

  getEmployeeById(id:number){
      return this.httpClient.get<Employee>(`http://localhost:8080/v1/employees/${id}`);
  }

  public getAllDeptWithEmp(){
    return this.httpClient.get<Department[]>(`http://localhost:8080/v1/deparments`);
  }

  public addEmployee(employee : Employee){
    return this.httpClient.post(`http://localhost:8080/v1/employees`, employee);
  }

  public updateEmployee(id:number, employee : Employee){
    return this.httpClient.put(`http://localhost:8080/v1/employees`,employee);
  }

  public deleteEmployee(id:number){
    console.log("inside delete department function")
    return this.httpClient.delete(`http://localhost:8080/v1/employees/${id}`);
  }
  

  
}
