import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { DepartmentDataService } from '../service/data/department-data.service';
import { EmployeeDataService } from '../service/data/employee-data.service';
import { Department, Employee } from '../department-list/department-list.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  id!:number
  departmentName!:string
  pagedEmployeeList!: Employee[];
  page = 1;
  public departmentList: Department[] =  [
    new Department(0, '', 0, 0, 0, [])]
  fetchingAllList: boolean = false
  public employeeList!:Employee[]
  message!:string

  constructor(private activateRoute: ActivatedRoute, private shareData:SharedService, 
    private departmentDataSvc: DepartmentDataService,
    private router :Router, private employeeDataSvc: EmployeeDataService){}

  ngOnInit(): void {
  this.refreshEmployeeList()
  }

  refreshEmployeeList(){
    this.id = this.activateRoute.snapshot.params['id']
    // for particular department
    if(this.id!=-1){
      //this.departmentList = this.shareData.getSharedObject() --> for shared object
      this.departmentDataSvc.getAllDeptWithEmp().subscribe(response => {
        this.departmentList = response
      for (let department of this.departmentList) {
        if (this.id == department.id) {
          this.departmentName = department.name
          for(let emp of department.employee ){
            emp.department = department.name
          }
          this.employeeList = department.employee;
          this.employeeList.sort((a, b) => b.id - a.id);
          // this.updatePagedEmployeeList();
        }
      }
    })
    }else{
      //for all department
      this.fetchingAllList = true
      this.employeeList = [];
      this.getAllEmployees()
    }

  }

  
  getAllEmployees(){
    this.departmentDataSvc.getAllDeptWithEmp().subscribe(response =>{
      this.departmentList = response
      this.shareData.setSharedObject(this.departmentList);
      for (let department of this.departmentList) {
        console.log(department.id)
        for(let emp of department.employee ){
          emp.department = department.name
       }
        this.employeeList = this.employeeList.concat(department.employee);
      }
      this.employeeList.sort((a, b) => b.id - a.id);
      // this.updatePagedEmployeeList();
    })
}

// updatePagedEmployeeList() {
//   const itemsPerPage = 5;
//   const startIndex = (this.page - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   this.pagedEmployeeList = this.employeeList.slice(startIndex, endIndex);
// }

updateEmployee(id:number){
  console.log('inside the update employee...')
  this.router.navigate(['employees',id])
}

addEmployee(){
  console.log('inside the add employee...')
  this.router.navigate(['employees',-1])
}

deleteEmployee(id:number){
  console.log('list todo component: '+id)
  this.employeeDataSvc.deleteEmployee(id).subscribe(
    response => { console.log(response)
      this.message = 'Employee successfully deleted.'
      this.refreshEmployeeList()
    }
  )
}

}
