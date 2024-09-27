import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { ApiService } from './apiservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User = this.apiService.getUser();

  constructor(private apiService: ApiService) { }

  getProfile(): User{
    return this.user; 
  }

  updateProfile(user: User){
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.email = user.email;
  }
}
