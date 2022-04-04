import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { commentAriticleCreate, commentArticleDto, commentGetDto } from './articles.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http:HttpClient) { }
  private apiUrl = environment.apiURL + 'comments';

    public createComment(slug:string,commentAriticleCreate : commentAriticleCreate) : Observable<commentArticleDto>{
    return this.http.post<commentArticleDto>(`${this.apiUrl}/${slug}`, commentAriticleCreate);
    }
    public deleteComment(slug:string,commentId:number){
    return this.http.delete(`${this.apiUrl}/${slug}/${commentId}`);
    }
    public getComment(commentToGet:commentGetDto):Observable<commentArticleDto[]>{
      let path = commentToGet.parentId==null?
          `${this.apiUrl}/${commentToGet.slug}`:`${this.apiUrl}/${commentToGet.slug}/${commentToGet.parentId}`
    return this.http.get<commentArticleDto[]>(path);
    }
    addLikedComment(commentId:number){
      return this.http.post(`${this.apiUrl}/addlike/${commentId}`,{})
    }
}
