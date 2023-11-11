import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../service/user-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username = ""
  password = ""
  invalidLogin = false
  errorMessage = "Invalid Username or Credentials"

  constructor(private router:Router, private authenitcationService: UserAuthenticationService){}

  ngOnInit(): void {
  }

  handleLogin(){

    if (this.authenitcationService.authenticateUser(this.username,this.password)){
      this.invalidLogin = false
      this.router.navigate([''])
    }else{
      this.invalidLogin = true
    }
  }

}
