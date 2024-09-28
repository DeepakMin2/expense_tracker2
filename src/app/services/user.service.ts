import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { ApiService } from './apiservice.service';
import { UserProfile } from '../auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: UserProfile = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private apiService: ApiService) { }

  getProfile(): UserProfile{
    this.apiService.getUserProfile().subscribe(
      {next: (resposne)=>{
        this.user.email = resposne.email;
        this.user.lastName = resposne.lastName;
        this.user.firstName = resposne.firstName;
        this.user.password = resposne.password;
        this.user.confirmPassword = resposne.confirmPassword;
      }}
    );
    
    return this.user;
  }

  updateProfile(user: User){
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.email = user.email;
  }
}
