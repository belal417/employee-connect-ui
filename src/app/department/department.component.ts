import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../service/shared.service';
import { DepartmentDataService } from '../service/data/department-data.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit{
 
  constructor(private activatedRouter: ActivatedRoute, private router: Router, 
    private departmentDataSvc: DepartmentDataService){}
 
  id!: number
  message :string = ''
  errorMessage: string = ''
department: Department = new Department(0,'',0,0,0,[])

  ngOnInit(): void {
    this.id = this.activatedRouter.snapshot.params['id']

    if (this.id != -1) {
      this.departmentDataSvc.getDeptByID(this.id).subscribe(data => this.department = data)
    }
  }


  saveDepartment() {
    console.log("inside department functions" + this.id);
  
    if (this.id == -1) {
      // Create a department
      this.departmentDataSvc.addDepartment(this.department).subscribe(
        (data: any) => {
          this.message = data.message;
          console.log("message is " + this.message);
          setTimeout(() => {
            this.router.navigate(['departments']);
          }, 2000);
        },
        (error: any) => {
          this.errorMessage = 'An error occurred while adding the department'
          setTimeout(() => {
            this.router.navigate(['departments']);
          }, 2000);
        }
      );
    } else {
      this.departmentDataSvc.updateDepartment(this.id, this.department).subscribe(
        (data: any) => {
          this.message = 'Successfully updated the Department'
          console.log(data);
          setTimeout(() => {
            this.router.navigate(['departments']);
          }, 2000);
        },
        (error: any) => {
          this.errorMessage = 'An error occurred while updating the department'
          setTimeout(() => {
            this.router.navigate(['departments']);
          }, 2000);
        }
      );
    }
  }
  

}
