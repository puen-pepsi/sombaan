import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../error/not-found/not-found.component';
import { ArticleDetailedResolver } from '../_resolvers/article-detailed.resolver';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { ArticleFilterComponent } from './article-filter/article-filter.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
const routes: Routes = [
    {path:'create',component:CreateArticleComponent},
    {path:'edit/:id',component:EditArticleComponent},
    {path:'',component:ArticleListComponent},
    {
      path: ':slug',
      component: ArticleDetailsComponent,
      resolve: {
        articledetail : ArticleDetailedResolver
      }
    },   


  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ArticleRoutingModule { }