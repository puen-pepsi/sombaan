import { Component, Input, OnInit, Output,EventEmitter, Self } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister  = new EventEmitter();
  registerForm :FormGroup;
  validationErrors:string[] = [];
  urladdress = environment.urlAddress;
  constructor(private accountService:AccountService,private toastr: ToastrService,
      private fb:FormBuilder,private router: Router) { }

  ngOnInit(): void {
      this.intitializeForm();
  }

  intitializeForm(){
    this.registerForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password: ['', [Validators.required, 
        Validators.minLength(4), Validators.maxLength(16)
        ]
      ],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      // clientURI:['https://localhost:4200/authentication/emailconfirmation']
      clientURI:[`${this.urladdress}authentication/emailconfirmation`]
      //clientURI:['https://rainobunew.azurewebsites.net/authentication/emailconfirmation']
   
    })
  }

  matchValues(matchTo:string): ValidatorFn{
    return (control:AbstractControl) =>{
      return control?.value === control?.parent?.controls[matchTo].value ? 
      null:{isMathching:true}
    }
  }

  register(){
    // this.accountService.register(this.registerForm.value).subscribe(response => {
    //   this.router.navigateByUrl('/stories');
    // }, error =>{
    //   this.validationErrors = error;
    // })
    this.accountService.register(this.registerForm.value).subscribe(()=>{
      //console.log("here")
      this.toastr.warning("Please Confirm Your Email","Sombaan Register");
      this.router.navigateByUrl('/');
    })
  }
  cancel(){
    this.cancelRegister.emit(false);
  }
  getEmailErrorMessage(){
    var field = this.registerForm.get('email');
    if (field.hasError('required')){
      return "The email field is required";
    }

    if (field.hasError('email')){
      return "The email is invalid";
    }

    return '';
  }  
  getConfirmPasswordErrorMessage(){
    var field = this.registerForm.get('confirmPassword');
    if(field.hasError('required')){
      return "The comfirm password field is required";
    }

    if(field.hasError('1')){
      return "The comfirm password not math";
    }
  }

}
