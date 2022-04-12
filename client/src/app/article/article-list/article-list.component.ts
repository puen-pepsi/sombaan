import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { ArticleService } from '../article.service';
import { article, ArticleParams } from '../articles.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']

})
export class ArticleListComponent implements OnInit {
  articles : article[];
  pagination : Pagination;
  articleParams : ArticleParams;
  constructor(private articleService:ArticleService) {
     this.articleParams = this.articleService.getArticleParams()
   }

  ngOnInit(): void {
    // this.articleService.getArticles().subscribe( res => {
    //     this.articles = res;
    //     console.log(this.articles);
    // })
    this.loadArticles();
  }
  loadArticles(){
    this.articleService.setArticleParams(this.articleParams);
    //console.log(this.articleParams);
    this.articleService.getArticlesPagination(this.articleParams).subscribe(response => {
      this.articles = response.result;
      this.pagination = response.pagination;
      // this.dataSource.data = response.result;
      // this.obs = this.dataSource.connect();
    });
  }
  pageChanged(event:any){
    this.articleService.setArticleParams(this.articleParams);
    // this.articleParams.pageNumber++;
    //this.articleParams.pageNumber = event.page;
    this.articleParams.pageNumber=event.pageIndex+1;
    this.loadArticles();
  }
  genreFilter(event:number){
    this.articleParams.genre = event;
    console.log(this.articleParams)
    this.loadArticles();
  }
  searchFilter(event:string){
    this.articleParams.search = event;
    console.log(this.articleParams)
    this.loadArticles();
  }
  resetFilter(){
    this.articleParams = this.articleService.resetArticleParams();
    this.loadArticles();
  }
}
