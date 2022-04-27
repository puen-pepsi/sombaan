import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ArticleService } from 'src/app/article/article.service';
import { article } from 'src/app/article/articles.model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-favorite-icon',
  templateUrl: './favorite-icon.component.html',
  styleUrls: ['./favorite-icon.component.css']
})
export class FavoriteIconComponent implements OnInit {
  @Input() pSize:number;
  @Input() article: Partial<article>;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  constructor(private accountService : AccountService,
              private articleService :ArticleService,
              private router : Router) { }

  ngOnInit(): void {
  }
  toggleFavorite(){
    this.isSubmitting = true;

    if( !this.accountService.isAuthenticated()){
      this.router.navigateByUrl('authentication/login');
      return of(null)
    }
        // Favorite the article if it isn't favorited yet
        if (!this.article.liked) {
          this.isSubmitting = false;
          this.article.liked = true;
          this.article.likesCount++;
          return this.articleService.favorite(this.article).subscribe( () => {
              console.log(this.article)
              this.toggle.emit(true);
          })
        }else{
          this.isSubmitting = false;
          this.article.liked = false;
          this.article.likesCount == 0 ? 0: this.article.likesCount--;
          return this.articleService.unfavorite(this.article).subscribe(()=>{
            console.log(this.article)
            this.toggle.emit(false);
          })
        }
  }

}
