import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Profile } from './profile.model';



@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  constructor(private http:HttpClient) { }
  private apiUrl = environment.apiURL + 'profiles';

  get(username: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/${username}`);
  }

  follow(username:string) : Observable<Profile>{
    return this.http.post<Profile>(`${this.apiUrl}/${username}/follow`,null);
  }

  unfollow(username: string): Observable<Profile> {
    return this.http.delete<Profile>(`${this.apiUrl}/${username}/follow`);
  }

}
