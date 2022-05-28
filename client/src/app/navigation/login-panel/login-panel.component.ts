import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { NotificationDto } from '../notification/notification.model';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent{
  @Input() user:User;
  @Output() getLogout = new EventEmitter<boolean>();

  contents:NotificationDto[];
  constructor(public accountService:AccountService,
              private notificaionService:NotificationService) { }
  
  logout(){
    this.getLogout.emit(true);
  }

}
