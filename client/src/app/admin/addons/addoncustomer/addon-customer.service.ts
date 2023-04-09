import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addonCustomerDto, addonCutomerCreationDto } from '../addons.model';

@Injectable({
  providedIn: 'root'
})
export class AddonCustomerService {
  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'addoncustomer'

  getAll(): Observable<addonCustomerDto[]>{
    return this.http.get<addonCustomerDto[]>(this.apiURL);
  }

  getById(id: number): Observable<addonCustomerDto>{
    return this.http.get<addonCustomerDto>(`${this.apiURL}/${id}`);
  }

  create(addonCustomer: addonCutomerCreationDto){
    return this.http.post(this.apiURL, addonCustomer);
  }

  edit(id: number, addonCustomer: addonCutomerCreationDto){
    return this.http.put(`${this.apiURL}/${id}`, addonCustomer);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  searchByName(name: string): Observable<addonCustomerDto[]>{
    return this.http.post<addonCustomerDto[]>(`${this.apiURL}/searchByName`, 
    JSON.stringify(name));
  }
}
