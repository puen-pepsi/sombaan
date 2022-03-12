import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFilterComponent } from './article-filter/article-filter.component';
import { SharedModule } from '../_modules/shared.module';
import { RouterModule } from '@angular/router';
import { FormArticleComponent } from './form-article/form-article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { UtilitiesModule } from '../utilities/utilities.module';



@NgModule({
  declarations: [
    ArticleFilterComponent,
    FormArticleComponent,
    CreateArticleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UtilitiesModule,
    RouterModule.forChild([
      {path:'',component:ArticleFilterComponent},
      {path:'create',component:CreateArticleComponent}
    ])
  ]
})
export class ArticleModule { }
