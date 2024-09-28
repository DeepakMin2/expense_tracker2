import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
    this.loginForm=fb.group({email:['', [Validators.required,Validators.email]],password:['',[Validators.required]]});
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        {next:(response)=>{
          console.log('Login Succesful');
          sessionStorage.setItem('token', response.jwt);
          this.router.navigate(['/home'])
        }, error: (error)=>{
          console.error('Error logging in', error);
        }}
      );
    }
  }
}
