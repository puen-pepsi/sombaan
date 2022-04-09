import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ArticleService } from '../article.service';
import { article } from '../articles.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']

})
export class ArticleListComponent implements OnInit {
  articles : article[];
  constructor(private articleService:ArticleService) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe( res => {
        this.articles = res;
        console.log(this.articles);
    })
  }

}
