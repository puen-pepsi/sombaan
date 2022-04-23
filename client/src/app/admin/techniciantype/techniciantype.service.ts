import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { techniciantypeCreationDTO, techniciantypeDTO } from './technician.model';

@Injectable({
  providedIn: 'root'
})
export class TechniciantypeService {
  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'techniciantypes'

  getAll(): Observable<techniciantypeDTO[]>{
    return this.http.get<techniciantypeDTO[]>(this.apiURL);
  }

  getById(id: number): Observable<techniciantypeDTO>{
    return this.http.get<techniciantypeDTO>(`${this.apiURL}/${id}`);
  }

  create(techniciantype: techniciantypeCreationDTO){
    return this.http.post(this.apiURL, techniciantype);
  }

  edit(id: number, techniciantype: techniciantypeCreationDTO){
    return this.http.put(`${this.apiURL}/${id}`, techniciantype);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
