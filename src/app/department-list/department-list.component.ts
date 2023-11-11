import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { DepartmentDataService } from '../service/data/department-data.service';
import { Router } from '@angular/router';

export class Department{
  constructor(
    public id:number,
    public name: string,
    public count: number,
    public totalSalary: number,
    public maxSalary: number,
    public employee:Employee[]){

  }
}

export class Employee{
  constructor(public name:string,
  public salary:number,
  public dateOfBirth: Date,
  public id: number,
  public departmentId:number,
  public department:string
  ){}
}

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})

export class DepartmentListComponent implements OnInit{

// Create some dummy employees
 employees1: Employee[] = [
  new Employee('John Doe', 50000, new Date('1990-01-15'), 1, 1,''),
  new Employee('Jane Smith', 55000, new Date('1988-07-21'), 2, 1,''),
  // Add more employees as needed
];

 employees2: Employee[] = [
  new Employee('Alice Johnson', 60000, new Date('1992-03-10'), 3, 2,''),
  new Employee('Bob Brown', 58000, new Date('1985-11-05'), 4, 2,''),
  // Add more employees as needed
];

 employees3: Employee[] = [
  new Employee('Eva White', 75000, new Date('1993-09-30'), 5, 3,''),
  new Employee('David Lee', 72000, new Date('1987-04-18'), 6, 3,''),
  // Add more employees as needed
];

 employees4: Employee[] = [
  new Employee('Olivia Green', 67000, new Date('1991-06-25'), 7, 4,''),
  new Employee('Michael Clark', 70000, new Date('1986-02-14'), 8, 4,''),
  // Add more employees as needed
];
 employees5: Employee[] = [
  new Employee('Sophia Turner', 62000, new Date('1994-12-05'), 9, 5,''),
  new Employee('William Hall', 64000, new Date('1989-08-09'), 10, 5,''),
  // Add more employees as needed
];

// Create the list of departments with employees
//  public departments: Department[] = [
//   new Department(1, 'HR', 10, 1000000.00, 25000, this.employees1),
//   new Department(2, 'Sales', 25, 1000000.00, 15000, this.employees2),
//   new Department(3, 'BA', 5, 1500000.00, 95000, this.employees3),
//   new Department(4, 'DEV', 8, 2000000.00, 65000, this.employees4),
//   new Department(5, 'SQC', 4, 1500000.00, 35000, this.employees5),
// ];
  public departments: Department[] =  [
      new Department(0, '', 0, 0, 0,[])]

  errorMessage:string = ''
  successMessage:string = ''
  
  constructor(private sharedService:SharedService, private departmentDataSvc: DepartmentDataService,
    private router: Router){}

  ngOnInit(): void {
    
    this.refreshDepartments()

  }

  refreshDepartments(){
      this.departmentDataSvc.getAllDeptWithEmp().subscribe(response =>{
        this.departments = response
        this.sharedService.setSharedObject(this.departments);
        this.departments.sort((a,b) => b.id - a.id)
      })
  }

  addNewDepartment(){
    this.router.navigate(['department',-1])
  }

  updateDepartment(id:number){
    this.router.navigate(['department',id])
  }

  deleteDepartment(id:number){
    console.log('list todo component: '+id)
    this.departmentDataSvc.deleteDepartment(id).subscribe(response => { 
        this.successMessage = 'Department successfully deleted.'
        this.refreshDepartments()
      },error => {
        this.errorMessage = 'Department Cant be deleted.'
        this.refreshDepartments()
      }
    )
  }

}
