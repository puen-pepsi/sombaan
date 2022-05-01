import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  AddressCreateDto, DistrictDto, SelectorDistrictDto, SelectorDto } from './address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = environment.apiURL + 'addresses';
  constructor(private http:HttpClient) { }

  getProvince(){
    return this.http.get<SelectorDto[]>(`${this.apiUrl}/getprovince`);
  }
  getAmphure(provineId:number){
    return this.http.get<SelectorDto[]>(`${this.apiUrl}/getamphure/${provineId}`);
  }
  getDistrict(amphureId:number){
    return this.http.get<SelectorDistrictDto[]>(`${this.apiUrl}/getDistrict/${amphureId}`);
  }
  public create(addressCreateDto:AddressCreateDto) : Observable<number>{
    const formData = this.BuildFormData(addressCreateDto);
    return this.http.post<number>(this.apiUrl,formData);
  }
  private BuildFormData(addressCreateDto: AddressCreateDto): FormData {
    const formData = new FormData();
    formData.append('addressAt', addressCreateDto.addressAt); 
    formData.append('subdistrict',addressCreateDto.subdistrict);
    formData.append('district',addressCreateDto.district);
    formData.append('province',addressCreateDto.province);
    formData.append('postcode',addressCreateDto.postcode);
    return formData;
  }
}
