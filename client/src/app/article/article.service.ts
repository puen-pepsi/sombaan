import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { article, articleCreationDTO, articleDTO, articlePostGetDTO, articlePutGetDTO, commentAriticleCreate, commentArticleDto } from './articles.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }
  private apiUrl = environment.apiURL + 'articles';

  public getById(id:number) :Observable<articleDTO>{
    return this.http.get<articleDTO>(`${this.apiUrl}/${id}`);
  }
  public getBySlug(slug:string) :Observable<article>{
    return this.http.get<article>(`${this.apiUrl}/${slug}`);
  }
  public postget() : Observable<articlePostGetDTO>{
    return this.http.get<articlePostGetDTO>(`${this.apiUrl}/postget`);
  }
  public putget(id:number) :Observable<articlePutGetDTO>{
    return this.http.get<articlePutGetDTO>(`${this.apiUrl}/putget/${id}`);
  }
  public edit(id:number,articleCreationDTO:articleCreationDTO){
    const formData = this.BuildFormData(articleCreationDTO);
    return this.http.put(`${this.apiUrl}/${id}`,formData);
  }
  public create(articleCreationDTO : articleCreationDTO) : Observable<number>{
    const formData = this.BuildFormData(articleCreationDTO);
    return this.http.post<number>(this.apiUrl, formData);
  }
  

  favorite(slug): Observable<article> {
    return this.http.post<article>(`${this.apiUrl}/${slug}/favorite`,null);
  }

  unfavorite(slug){
    return this.http.delete(`${this.apiUrl}/${slug}/favorite`);
  }

  private BuildFormData(article: articleCreationDTO): FormData {
    const formData = new FormData();

    formData.append('title', article.title);
    formData.append('description', article.description);
    formData.append('body', article.body);
    // if (movie.releaseDate){
    //   formData.append('releaseDate', formatDateFormData(movie.releaseDate));
    // }
    
    // this.selectedFiles.forEach((f) => formData.append('certificates', f));
    if (article.photoList){
      for (const file of article.photoList) {
        formData.append('photoList', file, file.name);
      } 
      // formData.append('photoList',article.photoList)
      // article.photoList.forEach((file)=>{formData.append('photoList',file)})
    }

    formData.append('genresIds', JSON.stringify(article.genresIds));
    formData.append('tagsIds', JSON.stringify(article.tagsIds));
    // if(article.tagsIds){
    //   article.tagsIds.forEach( t => {formData.append('tageIds',t)})
    // }
    return formData;
  }
}
