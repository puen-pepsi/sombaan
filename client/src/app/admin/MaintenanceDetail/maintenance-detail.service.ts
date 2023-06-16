import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MaintenanceDetailGroup, MaintenanceDetailsCreateDto, MaintenanceDetailsCreatePriceDto } from './maintenance-detail.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceDetailService {

  constructor(private http:HttpClient) { }
  private apiUrl = environment.apiURL + 'detailtypes'

  public getMaintenanceDetail(id:number): Observable<MaintenanceDetailGroup[]>{
    return this.http.get<MaintenanceDetailGroup[]>(`${this.apiUrl}/group/${id}`);
  }
  public create(maintenanceDetailCreateDto:MaintenanceDetailsCreateDto){
    return this.http.post(this.apiUrl,maintenanceDetailCreateDto);
  }
  public createPrice(maintenanceCreatePriceDto:MaintenanceDetailsCreatePriceDto){
    return this.http.post(`${this.apiUrl}/CreatePrice`,maintenanceCreatePriceDto);
  }
  // private BuildFormData(maintenanceDetailCreateDto: MaintenanceDetailsCreateDto): FormData {
  //   const formData = new FormData();
  //   formData.append('technicianTypeId', maintenanceDetailCreateDto.technicianTypeId.toString());
  //   // for (const file of maintenanceCreateDto.pictureUrl) {
  //   //   formData.append('pictures', file, file.name);
  //   // } 
  //   formData.append('uuId',maintenanceDetailCreateDto.uuId);
  //   formData.append('parentId', maintenanceDetailCreateDto.parentId);
  //   formData.append('detail', maintenanceDetailCreateDto.detail);
  //   formData.append('subDetail',JSON.stringify(maintenanceDetailCreateDto.subDetail));
  //   return formData;
  // }

}
