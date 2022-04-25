import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { articleDTO } from 'src/app/article/articles.model';

@Component({
  selector: 'app-favorite-icon',
  templateUrl: './favorite-icon.component.html',
  styleUrls: ['./favorite-icon.component.css']
})
export class FavoriteIconComponent implements OnInit {
  @Input() pSize:number;
  @Input() article: articleDTO;
  @Output() toggle = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }
  toggleFavorite(){
    
  }

}
