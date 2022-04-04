import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent {
  @Input('likeCount') likeCount:number;
  @Input('isActive') isActive:boolean;
  @Input('usersLike') usersLike:string[];
  @Output() commentId = new EventEmitter<number>();
  onClick(){
    this.likeCount += (this.isActive)?-1:+1;
    this.isActive = !this.isActive;
    this.commentId.emit();
  }

}
