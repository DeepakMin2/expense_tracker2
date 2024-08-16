import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, SignUpRequest } from './auth.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }

  signUp(signUpRequest: SignUpRequest): Observable<AuthResponse>{
    return this.http.post<AuthResponse>('${this.apiUrl}/signup', signUpRequest);
  }

  
  isLoggedIn(): boolean{
    return true;
  }

  
}
