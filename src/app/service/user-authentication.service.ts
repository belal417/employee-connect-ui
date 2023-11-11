import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  authenticatedUser = 'authenticatedUser'
  constructor() { }

  authenticateUser(username:string, password:string){
    console.log('authenticating user')
    if(username === 'belal' && password === 'pass'){
      sessionStorage.setItem(this.authenticatedUser,username)
      return true
    }
    return false
  }

  isUserLoggedIn(){
    let user =  sessionStorage.getItem(this.authenticatedUser)
    return !(user === null)
  }

  logout(){
     sessionStorage.removeItem(this.authenticatedUser)
  }

}
