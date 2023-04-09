import { Component } from '@angular/core';
import { NotificationDto, NotificationType } from './notification.model';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
    // @Input()
  contents:NotificationDto[];
  types = NotificationType;
  badgeCount = 0;
  constructor(private notificaionService:NotificationService) { }
 
  // ngOnInit(): void {
  //   this.notificaionService.getNotifications().subscribe(res => {
  //     this.contents = res;
  //     this.badgeCount = this.contents.length;
  //   })
  // }


  popup(){
      this.notificaionService.getNotifications().subscribe(res => {
        this.contents = res;
        console.log(this.contents)
      })
  }
  MarkAsRead(){
    this.notificaionService.postMarkAsRead().subscribe(()=> console.log())
  }

}
