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

  @Input() article: articleDTO;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFavorite() {
    this.isSubmitting = true;

    if( !this.accountService.isAuthenticated()){
      this.router.navigateByUrl('authentication/login');
      return of(null)
   }

        // Favorite the article if it isn't favorited yet
        if (!this.article.liked) {
          return this.articleService.favorite(this.article.slug).subscribe( () => {
            this.isSubmitting = false;
              this.toggle.emit(true);
          })

              
        }else{
          return this.articleService.unfavorite(this.article.slug).subscribe(()=>{
            this.isSubmitting = false;
            this.toggle.emit(false);
          })
        }
  }

}
