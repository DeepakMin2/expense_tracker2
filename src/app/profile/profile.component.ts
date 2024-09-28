import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';
import { UserProfile } from '../auth/auth.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profileForm: FormGroup;
  editMode = false;
  user:UserProfile;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.user=this.userService.getProfile();
    this.profileForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      password: [' ••••••••',Validators.required],
      confirmPassword: [' ••••••••',Validators.required],
  });
  }

  onSubmit(){

    if(this.profileForm.valid){
      this.userService.updateProfile(this.profileForm.value);
      this.editMode = false;
    }
    

  }

}
