import { Component, HostListener, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sombaan';
  isSticky: boolean = false;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.isSticky = window.pageYOffset >= 180;
  }
  constructor(private accountService:AccountService,
              private presence:PresenceService){}

  ngOnInit(){
    this.setCurrentUser();
    console.log(this.accountService.isAuthenticated())
  }
  setCurrentUser(){
    const user:User = JSON.parse(localStorage.getItem('user'));
    if(user){
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
  }
  
}
