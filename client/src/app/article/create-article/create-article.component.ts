import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { ArticleService } from '../article.service';
import { articleCreationDTO } from '../articles.model';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor(private articleservice:ArticleService,private route:Router) { }
  nonSelectedGenres : multipleSelectorModel[];
  allTags : string[];
  ngOnInit(): void {
    this.articleservice.postget().subscribe(res => {
      this.nonSelectedGenres = res.genres.map(genre => {
        return <multipleSelectorModel>{key:genre.id,value:genre.name}
      });
      this.allTags = res.tags.map(tag => {
        return tag.name;
      })
    });
  }
  saveChanges(articleCreationDTO : articleCreationDTO){
    console.log(articleCreationDTO)
    this.articleservice.create(articleCreationDTO).subscribe(()=>{
      this.route.navigate(['']);
    })
  }
}
