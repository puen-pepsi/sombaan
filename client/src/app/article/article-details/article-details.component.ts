import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { articleDTO } from '../articles.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  article:articleDTO;

  constructor(private articleservice : ArticleService,
              private route :ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.articleservice.getById(params["id"]).subscribe( (article) => {
        this.article = article;
      })
    })
  }

}
