import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { SocialUser } from 'angularx-social-login';
// import { ToastrService } from 'ngx-toastr';
// import { ExternalAuthDto } from '../../_models/externalAuthDto';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  public errorMessage: string = '';
  public showError: boolean=false;
  registerMode = false;
  returnUrl:string='';
  constructor(
    public accountService: AccountService ,
    private router : Router,
    private fb :FormBuilder,
    private route :ActivatedRoute,
    private toastr:ToastrService,
    ) { }


  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.intitializeForm();
  }
  intitializeForm(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password: ['', [Validators.required]
      ],   
    })
  }
  login(){
    console.log(this.loginForm.value);
    this.accountService.login(this.loginForm.value).subscribe({
      next:(response) => {
        this.router.navigateByUrl(this.returnUrl);
        this.toastr.success("LogIn Success","Information");
      },
      error:(error)=> {
        this.errorMessage = error;
        this.showError = true;
        console.log(this.errorMessage)
      }
    });
  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
    this.toastr.success("LogOut success","Information")
  }

  // public loginWithGoogle = () => {
  //   //this.showError = false;
  //   this.accountService.signInWithGoogle()
  //   .then(res => {
  //     const user: SocialUser = { ...res };
  //     // console.log(user)
  //     const externalAuth: ExternalAuthDto = {
  //       provider: user.provider,
  //       idToken: user.idToken
  //     }
  //     this.validateExternalAuth(externalAuth);
  //   }, error => console.log(error))
  // }
  gotoRegister(){
    this.router.navigate([])
  }
  // public loginWithFacebook = () => {
  //   //this.showError = false;
  //   this.accountService.signInWithFaceBook()
  //   .then(res => {
  //     const user: SocialUser = { ...res };
  //           console.log(user)

  //     // this.validateExternalAuth(externalAuth);
  //   }, error => console.log(error))
  // }
  // private validateExternalAuth(externalAuth: ExternalAuthDto) {
  //   this.accountService.externalLogin(externalAuth)
  //     .subscribe(res => {
  //       // localStorage.setItem("token", res.token);
  //       // this._authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
  //       // this.router.navigate([this._returnUrl]);
  //       this.router.navigateByUrl('/stories');
  //       this.toastr.success("LogIn Success","Information");
  //     },
  //     error => {
  //       this.errorMessage = error;
  //       this.showError = true;
  //     });
  // }
  registerToggle(){
    this.registerMode = !this.registerMode;
  }


  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }
  home(){
    this.router.navigateByUrl('/')
  }
  getEmailErrorMessage(){
    var field = this.loginForm.get('email');
    if (field.hasError('required')){
      return "The email field is required";
    }

    if (field.hasError('email')){
      return "The email is invalid";
    }

    return '';
  }  
}
