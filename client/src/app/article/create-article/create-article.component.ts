import { Component, OnInit } from '@angular/core';
import { articleCreationDTO } from '../articles.model';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  saveChanges(articleCreationDTO : articleCreationDTO){
    console.log(articleCreationDTO)
  }
}
