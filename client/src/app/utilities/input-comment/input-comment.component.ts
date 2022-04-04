import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { commentAriticleCreate } from 'src/app/article/articles.model';
import { ParentComment } from 'src/app/profile/profile.model';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-input-comment',
  templateUrl: './input-comment.component.html',
  styleUrls: ['./input-comment.component.css']
})
export class InputCommentComponent implements OnInit {
  @Input() user:User;
  @Input() parent:ParentComment;
  @Output() inputComment = new EventEmitter<any>();
  canModify: boolean;
  commentCreateDto :commentAriticleCreate;
  commentFormErrors = {};
  @Input()
  isSubmitting = false;
  isDeleting = false;
  constructor(private formBuilder:FormBuilder) { }
  commentForm : FormGroup;

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: [ '' ,{
        validators :[Validators.required]
      }],
      parentId:null
    }); 

    if (this.parent !== null){
      this.commentForm.patchValue({
        content:this.parent.parentusername,
        parentId:this.parent.parentId
      });
    }
  }
  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};
    this.inputComment.emit(this.commentForm.value);
    this.commentForm.reset('');
  }
}
