import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaintenanceCreateDto, MaintenancePostGetDTO, MaintenancePutGetDTO } from './maintenance.model';
@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = environment.apiURL + 'maintenances';

  constructor(private http : HttpClient) { }
  public getMaintenance(id:number){
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  public postget() : Observable<MaintenancePostGetDTO>{
    return this.http.get<MaintenancePostGetDTO>(`${this.apiUrl}/postget`);
  }
  public create(maintenanceCreateDto:MaintenanceCreateDto) : Observable<number>{
    const formData = this.BuildFormData(maintenanceCreateDto);
    return this.http.post<number>(this.apiUrl,formData);
  }
  public putget(id:number) :Observable<MaintenancePutGetDTO>{
    return this.http.get<MaintenancePutGetDTO>(`${this.apiUrl}/putget/${id}`);
  }
  public edit(id:number,maintenanceCreateDto:MaintenanceCreateDto){
    const formData = this.BuildFormData(maintenanceCreateDto);
    return this.http.put(`${this.apiUrl}/${id}`,formData);
  }
  private BuildFormData(maintenanceCreateDto: MaintenanceCreateDto): FormData {
    const formData = new FormData();
    formData.append('description', maintenanceCreateDto.description);
    for (const file of maintenanceCreateDto.pictureUrl) {
      formData.append('pictures', file, file.name);
    } 
    formData.append('typeIds', JSON.stringify(maintenanceCreateDto.typeIds));
    formData.append('areaIds', maintenanceCreateDto.areaIds.toString());
    return formData;
  }
}
