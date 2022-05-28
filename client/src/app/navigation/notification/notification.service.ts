import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationDto } from './notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }
  private apiUrl = environment.apiURL + 'notification';

 getNotifications() : Observable<NotificationDto[]>{
    return this.http.get<NotificationDto[]>(this.apiUrl);
  }
  postMarkAsRead(){
    return this.http.post(this.apiUrl,{});
  }
}
