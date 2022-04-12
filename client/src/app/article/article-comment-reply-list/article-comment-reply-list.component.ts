import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParentComment } from 'src/app/profile/profile.model';
import { User } from 'src/app/_models/user';
import { commentAriticleCreate, commentArticleDto, commentGetDto } from '../articles.model';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-article-comment-reply-list',
  templateUrl: './article-comment-reply-list.component.html',
  styleUrls: ['./article-comment-reply-list.component.css']
})
export class ArticleCommentReplyListComponent implements OnInit {
  @Input() user:User;
  @Input() getreplycomment:number;
  @Input() parent:ParentComment;
  // @Output() addComment = new EventEmitter<commentArticleDto>();
  commentreply:commentArticleDto[];
  commentCreateDto:commentAriticleCreate;
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;
  slug:string;
  constructor(private route:ActivatedRoute,
              private commentsService:CommentsService) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.params["slug"];
    // this.parent = {
    //   parentusername:this.parentusername,
    //   parentId:this.parentId
    // }
    if(this.getreplycomment){
      const dto = {slug:this.slug,parentId:this.getreplycomment};
      this.commentsService.getComment(dto).subscribe(
       comments => {
         this.commentreply = comments
         console.log(this.commentreply)
       });
   }
  }
  addReplyComment(comment){
    console.log(comment)
    this.isSubmitting = true;
    this.commentFormErrors = {};
    this.commentCreateDto = comment;
    this.commentsService.createComment(this.slug,this.commentCreateDto).subscribe(comment => {
      this.commentreply.unshift(comment);
      this.isSubmitting = false;
    },
    errors => {
      this.isSubmitting = false;
      this.commentFormErrors = errors;
    });
  }
  onDeleteComment(comment){
    this.commentsService.deleteComment(this.slug,comment.id).subscribe(success => {
      this.commentreply = this.commentreply.filter((item) => item !== comment);
    })
  }

}
