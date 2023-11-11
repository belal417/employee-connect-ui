import { Component } from '@angular/core';
import { UserAuthenticationService } from '../service/user-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(public authenticationService: UserAuthenticationService){}
  
  ngOnInit(): void {
    this.authenticationService.logout()
  }

}
