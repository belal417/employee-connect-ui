import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../service/user-authentication.service';
import { HttpClient } from '@angular/common/http';

export class maxSalary {
  constructor(public name: number, public maxSalary: string) { }
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit {

  data!: maxSalary[];

  ngOnInit(): void {

  }

  constructor(public authenticationService: UserAuthenticationService, private http: HttpClient) { }

  fetchData() {
    this.http.get<maxSalary[]>('http://localhost:8080/v1/deparments/max-salary').subscribe((response) => {
      //this.data = response;
      // console.log(response)
      this.data = this.findMaxSal(response)
    });
  }



  findMaxSal(response: any) {
    let temp!: maxSalary[];
    let maxSalary = -1;
    let departmentsWithMaxSalary = [];

    for (const entry of response) {
      if (entry.maxSalary > maxSalary) {
        maxSalary = entry.maxSalary;
        departmentsWithMaxSalary = [entry];
      } else if (entry.maxSalary === maxSalary) {
        departmentsWithMaxSalary.push(entry);
      }
    }
    temp = departmentsWithMaxSalary;
    return temp;
  }

}


