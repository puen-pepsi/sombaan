import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { htmlPageCreateDTO, htmlPageDTO } from './html-page.model';

@Injectable({
  providedIn: 'root'
})
export class HtmlPageService {

  constructor(private http:HttpClient) { }
  private apiUrl = environment.apiURL + 'htmlpages';

  public putget(id:number): Observable<htmlPageDTO>{
    return this.http.get<htmlPageDTO>(`${this.apiUrl}/putget/${id}`);
  }
  public create(htmlPageCreateDTO : htmlPageCreateDTO) : Observable<number>{
    const formData = this.BuildFormData(htmlPageCreateDTO);
    return this.http.post<number>(this.apiUrl,formData);
  }
  public edit(id:number,htmlPageCreateDTO:htmlPageCreateDTO){
    const formData = this.BuildFormData(htmlPageCreateDTO);
    return this.http.put(`${this.apiUrl}/${id}`,formData);

  }

  private BuildFormData(htmlpage:htmlPageCreateDTO){
    const formData = new FormData();
    formData.append('link',htmlpage.link);
    formData.append('content',htmlpage.content);
    return formData;
  }
}
