import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, LoginRequest, SignUpRequest } from './auth.model';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:8080/api/user';
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string){
    const loginRequest: LoginRequest = {
      email: email,
      password: password
    }
    return this.http.post<any>(`${this.apiUrl}/login`,loginRequest);
  }
  
  signUp(signUpRequest: SignUpRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, signUpRequest).pipe(
      tap(response =>{
        console.log('Sign up Response' + response);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    console.log('Token removed')
    this.router.navigate(['/login']);
  }

  
  isLoggedIn(): boolean{
    console.log('isLoggedIn getting token: ', sessionStorage.getItem('token'));
    return !!sessionStorage.getItem('token');
  }

  
}
