import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { areaCreateDto, areaDto } from './areas.model';

@Injectable({
  providedIn: 'root'
})
export class AreasService {
  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'areas'

  getAll(): Observable<areaDto[]>{
    return this.http.get<areaDto[]>(this.apiURL);
  }

  getById(id: number): Observable<areaDto>{
    return this.http.get<areaDto>(`${this.apiURL}/${id}`);
  }

  create(area: areaCreateDto){
    return this.http.post(this.apiURL, area);
  }

  edit(id: number, area: areaCreateDto){
    return this.http.put(`${this.apiURL}/${id}`, area);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
