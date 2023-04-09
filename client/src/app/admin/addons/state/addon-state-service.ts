import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addonStateCreationDTO, addonstateDto } from '../addons.model';

@Injectable({
  providedIn: 'root'
})
export class AddonStateService {
  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'addonstate'

  getAll(): Observable<addonstateDto[]>{
    return this.http.get<addonstateDto[]>(this.apiURL);
  }

  getById(id: number): Observable<addonstateDto>{
    return this.http.get<addonstateDto>(`${this.apiURL}/${id}`);
  }

  create(addonstate: addonStateCreationDTO){
    console.log(addonstate)
    return this.http.post(this.apiURL, addonstate);
  }

  edit(id: number, addonstate: addonStateCreationDTO){
    return this.http.put(`${this.apiURL}/${id}`, addonstate);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
