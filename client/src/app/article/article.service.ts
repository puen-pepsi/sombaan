import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { getPaginatedResult, getPaginationHeaders } from '../_services/paginationHelper';
import { article, articleCreationDTO, articleDTO, ArticleParams, articlePostGetDTO, articlePutGetDTO, commentAriticleCreate, commentArticleDto } from './articles.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  article : article;
  articles: article[]=[];
  articleCache = new Map();
  user : User;
  articleParams : ArticleParams = new ArticleParams;

  constructor(private http:HttpClient,
              private accountService:AccountService) { 
                this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
                  this.user = user;
                  this.articleParams = new ArticleParams(user);
                })
              }
  private apiUrl = environment.apiURL + 'articles';
  
  public getArticleParams(){
      this.articleParams.pageNumber = 1;
      return this.articleParams;
  }
  public setArticleParams(params : ArticleParams){
      this.articleParams = params;
  }
  public resetArticleParams(){
      this.articleParams = new ArticleParams(this.user);
      return this.articleParams;
  }
  public getArticles():Observable<article[]>{
    return this.http.get<article[]>(`${this.apiUrl}`);
  }
  getArticlesPagination(articleParams:ArticleParams){
    var response = this.articleCache.get(Object.values(articleParams).join('-'));
    if(response){
      return of(response);
    }
    let params = getPaginationHeaders(articleParams.pageNumber,articleParams.pageSize);
        params = params.append('genre',articleParams.genre);
        params = params.append('search',articleParams.search);
    return getPaginatedResult<article[]>(this.apiUrl,params,this.http)
        .pipe(map(response => {
          this.articleCache.set(Object.values(articleParams).join('-'),response);
          console.log(this.articleCache)
          return response;
        }))
  }
  getArticle(slug :string){
    // const member = this.members.find(x=>x.username === username);
    // if(member !== undefined) return of(member);
    const article = [...this.articleCache.values()]
      .reduce((arr,elem)=> arr.concat(elem.result),[])
      .find((article:article)=> article.slug === slug);

      if(article){
        return of(article);
      }
    return this.http.get<article>(`${this.apiUrl}/${slug}`);
  }
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
    console.log(formData)
    return this.http.put(`${this.apiUrl}/${id}`,formData);
  }
  public create(articleCreationDTO : articleCreationDTO) : Observable<number>{
    const formData = this.BuildFormData(articleCreationDTO);
    return this.http.post<number>(this.apiUrl, formData);
  }
  

  favorite(article) {
    return this.http.post(`${this.apiUrl}/${article.slug}/favorite`,null).pipe(
      map(()=> {
        const index = this.articles.indexOf(article);
        this.articles[index] = article;
      })
    );
  }

  unfavorite(article){
    return this.http.delete(`${this.apiUrl}/${article.slug}/favorite`);
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
