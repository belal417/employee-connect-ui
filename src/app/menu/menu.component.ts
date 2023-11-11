import { Component } from '@angular/core';
import { UserAuthenticationService } from '../service/user-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(public authenticationService:UserAuthenticationService){}
  ngOnInit(): void {
    
  }
}
