import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { article } from '../articles.model';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {
  @Input() article:article;
  @ViewChild('nav') slider: NgImageSliderComponent;
  genre = [{ "id": 2, "name": "electric" }, { "id": 3, "name": "floor" }];
  imageObject:Array<Object>=[];
  constructor() { }

  ngOnInit(): void {
   
    // this.imageObject=[ { "image": "https://localhost:5001/articles/e6cd24c3-ac1a-440e-b751-1cf5248bb8e7.jpg", "thumbImage": "https://localhost:5001/articles/e6cd24c3-ac1a-440e-b751-1cf5248bb8e7.jpg" }, { "image": "https://localhost:5001/articles/80c79df6-fb08-4b34-a501-2b11a76242dd.jpg", "thumbImage": "https://localhost:5001/articles/80c79df6-fb08-4b34-a501-2b11a76242dd.jpg" }, { "image": "https://localhost:5001/articles/cca90b58-dade-400c-b515-f4960ad77cfa.jpg", "thumbImage": "https://localhost:5001/articles/cca90b58-dade-400c-b515-f4960ad77cfa.jpg" } ]
    this.getImages(this.article.photos);
  }
  popup(){
    console.log("popup")
    this.slider.imagePopup;
  }
  getImages(photos:any){
    photos.forEach(item => {
      var temp = {image:item.url,thumbImage:item.url}
       this.imageObject.push(temp)
    });
  }
}
