import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tagCreationDTO, tagDTO } from './tags.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'tags'

  getAll(): Observable<tagDTO[]>{
    return this.http.get<tagDTO[]>(this.apiURL);
  }

  getById(id: number): Observable<tagDTO>{
    return this.http.get<tagDTO>(`${this.apiURL}/${id}`);
  }

  create(tag: tagCreationDTO){
    return this.http.post(this.apiURL, tag);
  }

  edit(id: number, tag: tagCreationDTO){
    return this.http.put(`${this.apiURL}/${id}`, tag);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
