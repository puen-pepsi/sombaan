import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFilterComponent } from './article-filter/article-filter.component';
import { SharedModule } from '../_modules/shared.module';
import { FormArticleComponent } from './form-article/form-article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ArticleCommentComponent } from './article-comment/article-comment/article-comment.component';
import { ArticleCommentListComponent } from './article-comment-list/article-comment-list/article-comment-list.component';
import { ArticleCommentReplyListComponent } from './article-comment-reply-list/article-comment-reply-list.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { NgImageSliderModule } from 'ng-image-slider';
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
    ArticleListComponent,
    ArticleCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UtilitiesModule,
    ArticleRoutingModule,
    NgImageSliderModule,
  ]
})
export class ArticleModule { }
