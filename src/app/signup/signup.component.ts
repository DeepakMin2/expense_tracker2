import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  signupForm: FormGroup;
 

  constructor(public fb: FormBuilder){
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

    console.log(password + '***' + password2)
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
      console.log(this.signupForm.value);
    }
  }
}
