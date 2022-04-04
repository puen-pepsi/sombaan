import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFilterComponent } from './article-filter/article-filter.component';
import { SharedModule } from '../_modules/shared.module';
import { RouterModule } from '@angular/router';
import { FormArticleComponent } from './form-article/form-article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ArticleCommentComponent } from './article-comment/article-comment/article-comment.component';
import { ArticleCommentListComponent } from './article-comment-list/article-comment-list/article-comment-list.component';
import { ArticleCommentReplyListComponent } from './article-comment-reply-list/article-comment-reply-list.component';



@NgModule({
  declarations: [
    ArticleFilterComponent,
    FormArticleComponent,
    CreateArticleComponent,
    ArticleDetailsComponent,
    EditArticleComponent,
    ArticleCommentComponent,
    ArticleCommentListComponent,
    ArticleCommentReplyListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UtilitiesModule,
    RouterModule.forChild([
      {path:'',component:ArticleFilterComponent},
      {path:'create',component:CreateArticleComponent},
      {path:'edit/:id',component:EditArticleComponent},
      {path:'details/:slug',component:ArticleDetailsComponent}
    ])
  ]
})
export class ArticleModule { }
