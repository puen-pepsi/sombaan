import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscriber } from 'rxjs';
import { User } from 'src/app/_models/user';
import { commentArticleDto } from '../../articles.model';
import { CommentsService } from '../../comments.service';

@Component({
  selector: 'app-article-comment',
  templateUrl: './article-comment.component.html',
  styleUrls: ['./article-comment.component.css']
})
export class ArticleCommentComponent implements OnInit {
  @Input() comment: commentArticleDto;
  @Input() i:number;
  @Output() sentComment = new EventEmitter<any>();
  @Output() deleteComment = new EventEmitter<commentArticleDto>();
  togglePanel:any ={};
  @Input()user:User;
  canModify:boolean;
  constructor(
              private commentsService:CommentsService) { 

  }

  ngOnInit(): void {   
    if(this.user){
      this.canModify = (this.user.username === this.comment.userName);
    }
  
  }
  test(event){
    console.log(event)
  }
  addComment(event){
    this.sentComment.emit(event);
  }
  addLike(commentid:number){
    this.commentsService.addLikedComment(commentid).subscribe();
  }
  deleteClicked(comment) {
    console.log(comment)
    this.deleteComment.emit(comment);
  }
}
