import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { SignUpRequest } from '../auth/auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  signupForm: FormGroup;
 

  constructor(public fb: FormBuilder, private authService: AuthService, private router: Router){
    this.signupForm = this.fb.group({
      firstName:['', [Validators.required]],
      lastName:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8), this.strongPassword]],
      password2:['', [Validators.required]]
    },{validators: this.passwordMatch});


  }



  passwordMatch: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    if (!group.value) return null;

    const password = group.get('password')?.value;
    const password2 = group.get('password2')?.value;
    if(password!=password2){
      return {passwordMismatch: true}
    }

    return null;
  }

  strongPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const hasUpperCase = /[A-Z]/.test(control.value);
    const hasLowerCase = /[a-z]/.test(control.value);
    const hasNumeric = /[0-9]/.test(control.value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);

    const valid = hasLowerCase && hasNumeric && hasSymbol && hasUpperCase;

    return valid ? null : { strongPassword: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signupRequest: SignUpRequest = {
        firstName: this.signupForm.value.firstName,
        lastName: this.signupForm.value.lastName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        confirmPassword: this.signupForm.value.password2
      }

      console.log('sending signup request');
      this.authService.signUp(signupRequest).subscribe(
        {next: (response)=> {
          console.log('Sign up Success'+ response);
          this.router.navigate(['/login']);
        },}
      );
    }
  }
}
