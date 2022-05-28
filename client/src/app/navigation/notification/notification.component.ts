import { Component, Input } from '@angular/core';
import { NotificationDto, NotificationType } from './notification.model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent{

  constructor(private notificaionService:NotificationService) { }
  // @Input()
  contents:NotificationDto[];
  types = NotificationType;
  popup(){
      this.notificaionService.getNotifications().subscribe(res => {
        this.contents = res;
      })
  }
  MarkAsRead(){
    this.notificaionService.postMarkAsRead().subscribe(()=> console.log())
  }

}
