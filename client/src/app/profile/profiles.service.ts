import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from './profile.model';



@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  constructor(private http:HttpClient) { }
  private apiUrl = environment.apiURL + 'profiles';

  // get(username: string): Observable<Profile> {
  //   return this.apiService.get('/profiles/' + username)
  //     .pipe(map((data: {profile: Profile}) => data.profile));
  // }

  follow(username:string) : Observable<Profile>{
    return this.http.post<Profile>(`${this.apiUrl}/${username}/follow`,null);
  }

  unfollow(username: string): Observable<Profile> {
    return this.http.delete<Profile>(`${this.apiUrl}/${username}/follow`);
  }

}
