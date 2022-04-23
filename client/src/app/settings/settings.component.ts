import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  constructor(private accountService:AccountService,
              private userService:UserService,
              private router : Router,
              private formBuilder:FormBuilder) {
                this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user=user);

                 // create form group using the form builder
              this.settingsForm = this.formBuilder.group({
                username:['',{
                  validators :[Validators.required]
                }],
                bio: '',
                image:''
              });
              // Optional: subscribe to changes on the form
              // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
               }

  ngOnInit(): void {
     if(this.user) this.settingsForm.patchValue(this.user);
     console.log(this.user)
  }
  logout() {
    this.accountService.logout();
  }

  submitForm() {
    this.isSubmitting = true;
     console.log(this.settingsForm.value) 
    // update the model
    //this.updateUser(this.settingsForm.value);

    this.userService.update(this.settingsForm.value).subscribe( res =>{
      this.user.username = res.username;
      this.user.bio = res.bio;
      this.user.photoUrl = res.image;
      this.accountService.setCurrentUser(this.user);
      this.settingsForm.reset(this.user);
      //navigate
      this.router.navigate(['/profile',this.user.username])
    });
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }
  onImageSelected(image:any){
    this.settingsForm.get('image').setValue(image);
  }
}
