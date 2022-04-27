import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ArticleService } from 'src/app/article/article.service';
import { articleDTO } from 'src/app/article/articles.model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent {
  constructor(
    private articleService: ArticleService,
    private router: Router,
    private accountService: AccountService
  ) {}
  @Input() pSize:number;
  @Input() article: articleDTO;
  isSubmitting = false;

  toggleFavorite() {
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
            
          })
        }else{
          this.isSubmitting = false;
          this.article.liked = false;
          this.article.likesCount == 0 ? 0: this.article.likesCount--;
          return this.articleService.unfavorite(this.article).subscribe(()=>{
            
          })
        }
  }

}
