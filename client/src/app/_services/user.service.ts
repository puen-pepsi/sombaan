import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profile } from '../profile/profile.model';
import { UserUpdateDto } from '../settings/settings.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiURL + 'users';
  constructor(private http : HttpClient) { }

  public update(userUpdateDto:UserUpdateDto){
    const formData = this.BuildFormData(userUpdateDto);
    console.log(formData)
    return this.http.put<Profile>(`${this.apiUrl}`,formData);
  }

  private BuildFormData(userUpdateDto: UserUpdateDto): FormData {
    const formData = new FormData();

    formData.append('username', userUpdateDto.username);
    formData.append('bio', userUpdateDto.bio);
    if(userUpdateDto.image){
      formData.append('image', userUpdateDto.image,userUpdateDto.image.name);
    }

    return formData;
  }
}
