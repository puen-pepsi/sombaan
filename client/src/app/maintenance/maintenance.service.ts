import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MaintenanceCreateDto } from './maintenance.model';
@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = environment.apiURL + 'maintenances';

  constructor(private http : HttpClient) { }
  public create(maintenanceCreateDto:MaintenanceCreateDto) : Observable<number>{
    const formData = this.BuildFormData(maintenanceCreateDto);
    return this.http.post<number>(this.apiUrl,formData);
  }

  private BuildFormData(maintenanceCreateDto: MaintenanceCreateDto): FormData {
    const formData = new FormData();
    formData.append('description', maintenanceCreateDto.description);
    for (const file of maintenanceCreateDto.pictureUrl) {
      formData.append('pictures', file, file.name);
    } 
    formData.append('typeIds', JSON.stringify(maintenanceCreateDto.typeIds));
    formData.append('areaIds', JSON.stringify(maintenanceCreateDto.areaIds));
    return formData;
  }
}
