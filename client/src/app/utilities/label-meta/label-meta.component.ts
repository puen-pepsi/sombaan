import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { article, articleDTO } from 'src/app/article/articles.model';
import { Profile } from 'src/app/profile/profile.model';

@Component({
  selector: 'app-label-meta',
  templateUrl: './label-meta.component.html',
  styleUrls: ['./label-meta.component.css']
})
export class LabelMetaComponent {
  @Input() article: article;
  constructor() { }
  

}
