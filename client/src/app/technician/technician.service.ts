import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransitionCheckState } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupDto } from '../utilities/multiple-selector-group/multiple-group.model';
import { formatDateFormData } from '../utilities/utils';
import { TechnicianCreateDto, TechnicianPostGetDTO } from './technician.model';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {
  private apiUrl = environment.apiURL + 'technicians';
  constructor(private http:HttpClient) { }
  public postget() : Observable<TechnicianPostGetDTO>{
    return this.http.get<TechnicianPostGetDTO>(`${this.apiUrl}/postget`);
  }
  public create(technicianCreateDto : TechnicianCreateDto) : Observable<number>{
    const formData = this.BuildFormData(technicianCreateDto);
    console.log(formData)
    return this.http.post<number>(this.apiUrl, formData);
  }
  public getGroups() : Observable<GroupDto[]>{
    return this.http.get<GroupDto[]>(`${environment.apiURL}techniciantypes/category`);
  }
  private BuildFormData(technicianCreateDto: TechnicianCreateDto): FormData {
    const formData = new FormData();

    formData.append('fullName', technicianCreateDto.fullName);
    formData.append('bio', technicianCreateDto.bio);
    if(technicianCreateDto.dateOfBirth)
        formData.append('dateOfBirth',formatDateFormData(technicianCreateDto.dateOfBirth));
    if (technicianCreateDto.pictureUrl)
       formData.append('pictureUrl',technicianCreateDto.pictureUrl);

    formData.append('typeIds', JSON.stringify(technicianCreateDto.typeIds));
    formData.append('areaIds', JSON.stringify(technicianCreateDto.areaIds));
    return formData;
  }
}
