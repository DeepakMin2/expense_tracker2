import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user1: User = {
    userId: 'abc',
    firstName: 'firstName1',
    lastName: 'lastName1',
    email: 'email1@abc.com'
  }

  constructor() { }

  getProfile(): User{
    return this.user1; 
  }

  updateProfile(user: User){
    this.user1.firstName = user.firstName;
    this.user1.lastName = user.lastName;
    this.user1.email = user.email;
  }
}
