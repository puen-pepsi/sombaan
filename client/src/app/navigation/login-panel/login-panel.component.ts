import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent{
  @Input() user:User;
  @Output() getLogout = new EventEmitter<boolean>();
  constructor(public accountService:AccountService) { }
  logout(){
    this.getLogout.emit(true);
  }

}
