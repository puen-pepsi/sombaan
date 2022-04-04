import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ParentComment } from 'src/app/profile/profile.model';
import { User } from 'src/app/_models/user';
import { ArticleService } from '../../article.service';
import { commentAriticleCreate, commentArticleDto, commentGetDto } from '../../articles.model';
import { CommentsService } from '../../comments.service';

@Component({
  selector: 'app-article-comment-list',
  templateUrl: './article-comment-list.component.html',
  styleUrls: ['./article-comment-list.component.css']
})
export class ArticleCommentListComponent implements OnInit {
 
  @Input() user:User;
  @Input() getcomment:any;
  @Input() parent:ParentComment;
  @Output() addComment = new EventEmitter<commentArticleDto>();
  @Output() deleteComment = new EventEmitter<commentArticleDto>();
  commentCreateDto:commentAriticleCreate;
  comments: commentArticleDto[];
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;
  togglePanel: any = {};
  constructor(private articleservice : ArticleService,
              private commentsService:CommentsService) { 
              }
  ngOnInit(): void {
    // this.getcomment = { "slug": "test-NpI0ovmrmkigwTjFdahI_Q", "parentId": 10 }
    console.log(this.getcomment)
    if(this.getcomment){
      this.commentsService.getComment(this.getcomment).subscribe(
       comments => {
         this.comments = comments
         console.log(this.comments)
       });
   }

  }

  addComments(comment){
      this.isSubmitting = true;
      this.commentFormErrors = {};
  
      // const commentContent = this.commentForm.value;
      this.commentCreateDto = comment;
      this.commentsService.createComment(this.getcomment.slug,this.commentCreateDto).subscribe(comment => {
        this.comments.unshift(comment);
        this.isSubmitting = false;
      },
      errors => {
        this.isSubmitting = false;
        this.commentFormErrors = errors;
      });
  }
  onDeleteComment(comment){
    this.commentsService.deleteComment(this.getcomment.slug,comment.id).subscribe(success => {
      this.comments = this.comments.filter((item) => item !== comment);
    })
  }

}
