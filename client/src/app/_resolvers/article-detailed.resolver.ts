import { ActivatedRouteSnapshot, Resolve} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { article } from "../article/articles.model";
import { ArticleService } from "../article/article.service";

@Injectable({
    providedIn:'root'
})

export class ArticleDetailedResolver implements Resolve<article> {
    
    constructor(private articleService:ArticleService){}
    resolve(route: ActivatedRouteSnapshot): Observable<article> {
        return this.articleService.getArticle(route.paramMap.get('slug'));
    }

}
