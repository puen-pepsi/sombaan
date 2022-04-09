import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { ArticleService } from '../article.service';
import { article, commentAriticleCreate, commentArticleDto, commentGetDto } from '../articles.model';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
  encapsulation:ViewEncapsulation.None
  
})
export class ArticleDetailsComponent implements OnInit {
  user:User;
  //parent:ParentComment;
  // parent:ParentComment = {parentusername:"puen",parentId:2};
  article:article;
  canModify: boolean = false;
  commentToGet:commentGetDto;

  constructor(private articleservice : ArticleService,
              private commentsService : CommentsService,
              private accountService :AccountService,
              private formBuilder :FormBuilder,
              private route :ActivatedRoute) {
                this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user=user);

               }
  // commentForm : FormGroup;
  ngOnInit(): void {
    console.log(this.user)
    this.route.params.subscribe( params => {
      this.articleservice.getBySlug(params["slug"]).subscribe( (article) => {
        this.article = article;
        if(this.user)
          this.canModify = (this.user.username === this.article.author.username);
        this.populateComments();
      })
    });
    
    // this.commentForm = this.formBuilder.group({
    //   content: ['',{
    //     validators :[Validators.required]
    //   }]
    // }); 
  }

  
  populateComments() {
    this.commentToGet = {slug:this.article.slug}
  }
  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }
  onToggleFavorite(favorited: boolean) {
    this.article.liked = favorited;

    if (favorited) {
      this.article.likesCount++;
    } else {
      this.article.likesCount--;
    }
  }
}
