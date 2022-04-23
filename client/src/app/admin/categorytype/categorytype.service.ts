import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { categorytypeCreationDTO, categorytypeDTO } from './categorytype.model';

@Injectable({
  providedIn: 'root'
})
export class CategorytypeService {
  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'categorytypes'

  getAll(): Observable<categorytypeDTO[]>{
    return this.http.get<categorytypeDTO[]>(this.apiURL);
  }

  getById(id: number): Observable<categorytypeDTO>{
    return this.http.get<categorytypeDTO>(`${this.apiURL}/${id}`);
  }

  create(categorytypeCreationDTO: categorytypeCreationDTO){
    return this.http.post(this.apiURL, categorytypeCreationDTO);
  }

  edit(id: number, categorytypeCreationDTO: categorytypeCreationDTO){
    return this.http.put(`${this.apiURL}/${id}`, categorytypeCreationDTO);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
