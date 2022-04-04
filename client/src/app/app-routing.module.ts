import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmlPageComponent } from './admin/html-page/html-page.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  
  {path:'',component:BlogComponent},
  {path:'about/:link',component:HtmlPageComponent},
  {path:'authentication',
   loadChildren: () => import('./authentication/authentication.module')
   .then(m => m.AuthenticationModule) },
   {path:'admin',
   loadChildren: () => import('./admin/admin.module')
   .then(m => m.AdminModule) },
   {path:'article',
   loadChildren: () => import('./article/article.module')
   .then(m => m.ArticleModule) },

  //  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
