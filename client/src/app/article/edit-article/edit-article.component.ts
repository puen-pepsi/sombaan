import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { ArticleService } from '../article.service';
import { articleDTO, photoDTO } from '../articles.model';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  selectedGenres : multipleSelectorModel[];
  nonSelectedGenres : multipleSelectorModel[];
  selectedTags : string[];
  nonSelectedTags : string[];
  photoList : photoDTO[];
  constructor(private articleservice:ArticleService,
              private activeRoute:ActivatedRoute) { }
  model : articleDTO;
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.articleservice.putget(params["id"]).subscribe(putGetDto => {
          this.model = putGetDto.article;
          console.log(putGetDto.selectedTags)
          this.selectedGenres = putGetDto.selectedGenres.map(genre => {
            return <multipleSelectorModel>{key:genre.id,value:genre.name};
          });
          this.nonSelectedGenres = putGetDto.nonSelectedGenres.map(genre => {
            return <multipleSelectorModel>{key:genre.id,value:genre.name};
          });
          this.selectedTags = putGetDto.selectedTags;
          this.nonSelectedTags = putGetDto.nonSelectedTags;
          this.photoList = putGetDto.article.photos;
          
      });
    });
  }
}
