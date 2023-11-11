import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDataService } from '../service/data/employee-data.service';
import { Department, SharedService } from '../service/shared.service';
import { ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';

export class Employee{
  constructor(public name:string,
  public salary:number,
  public dateOfBirth: Date,
  public id: number,
  public departmentId:number,
  public departmentName:string
  ){}

}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  
  successMessage!:string
  errorMessage!:string
  id!:number
  employee: Employee = new Employee('',0,new Date(), 0, 0 , '')
  departmentList: Department[] =  [new Department(0, '', 0, 0, 0, [])]
  departmentArray: [number, string][] = [];
  sharedObject! : Department[]
  

  constructor(private activatedGaurd : ActivatedRoute, private employeeDataService : EmployeeDataService,
    public dataShareService :SharedService,private cdr: ChangeDetectorRef, private router: Router,
    private location: Location){

  }  

  
  ngOnInit(): void {
    this.id = this.activatedGaurd.snapshot.params['id']
    this.fetchDropDown()
    //console.log(this.dataShareService.getSharedObject())
    if(this.id != -1){
      this.employeeDataService.getEmployeeById(this.id).subscribe(
        data => { this.employee = data
      this.employee.departmentName = data.departmentName;
      this.employee.id = data.id;
    })
    }
  }

  fetchDropDown(){
    this.employeeDataService.getAllDeptWithEmp().subscribe(data => {
      this.departmentList = data
      this.cdr.detectChanges();
    })
  }



  saveEmployee(){
    console.log("inside employee functions" + this.id);
    if (this.id == -1) {
      // Create a employee
      this.employeeDataService.addEmployee(this.employee).subscribe(
        (data: any) => {
          this.successMessage = data.message;
          setTimeout(() => {
            // this.router.navigate(['all-employees',-1]);
            this.location.back();
          }, 2000);
        },
        (error: any) => {
          this.errorMessage = 'An error occurred while adding the employee.'
          setTimeout(() => {
            // this.router.navigate(['all-employees',-1]);
            this.location.back();
          }, 2000);
        }
      );
    } else {
      this.employeeDataService.updateEmployee(this.id, this.employee).subscribe(
        (data: any) => {
          this.successMessage = 'Successfully updated the Employee.'
          
          setTimeout(() => {
                // this.router.navigate(['all-employees',-1]);
               this.location.back();
          }, 2000);
        },
        (error: any) => {
          this.errorMessage = 'An error occurred while updating the Employee.'
          setTimeout(() => {
            // this.router.navigate(['all-employees',-1]);
            this.location.back();
          }, 2000);
        }
      );
    }
  }

}
