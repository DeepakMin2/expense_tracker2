import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(private authService: AuthService, private router: Router){ }

  isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  onLogout(){
    console.log('OnLogout started');
    this.authService.logout();
  }

}
