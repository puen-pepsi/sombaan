import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  helper = new JwtHelperService();

  constructor(private accountService:AccountService,
      private router:Router,
      private toastr:ToastrService){}

  // canActivate(route: ActivatedRouteSnapshot, 
  //               state: RouterStateSnapshot) {
    // return this.accountService.currentUser$.pipe(
    //   map( user => {
    //     const expirationDate = this.helper.isTokenExpired(user.token);
    //     console.log(user)
    //     if(expirationDate || user == null){
    //         this.accountService.logout();
    //         this.router.navigate(['/authentication/login']);
    //         // this.router.navigate(['/authentication/login'],
    //         //   {queryParams: { returnUrl: state.url }});
    //         return false;
    //     }
    //     return true;
    //   })
    //)

      // var isLogin = this.accountService.isAuthenticated;
      // console.log(isLogin)
      // if(!this.accountService.isAuthenticated){
      //   this.accountService.logout();
      //   this.router.navigate(['/authentication/login'],
      //     {queryParams: { returnUrl: state.url }});
      // }
      // return true;

  //}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.accountService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/authentication/login'], {
        queryParams: {
          returnUrl: state.url
        }
      });
      return false;
    }
  }
}
