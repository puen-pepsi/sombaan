import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmlPageComponent } from './admin/html-page/html-page.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path:'' ,component:HomeComponent},
  {path:'',
    runGuardsAndResolvers:'always',
    // canActivate: [AuthGuard],
    children: [
         {path:'about/:link',component:HtmlPageComponent,canActivate: [AuthGuard]},
         {path:'authentication',
               loadChildren: () => import('./authentication/authentication.module')
               .then(m => m.AuthenticationModule) },
         {path:'admin',
            loadChildren: () => import('./admin/admin.module')
            .then(m => m.AdminModule) },
         {path: 'profile',
            loadChildren: () => import('./profile/profile.module')
            .then(m => m.ProfileModule)
         },
         {path:'article',
            loadChildren: () => import('./article/article.module')
            .then(m => m.ArticleModule) },
         {path:'technician',
            loadChildren: () => import('./technician/technician.module')
            .then(m => m.TechnicianModule) },
         {path:'settings',
         loadChildren: () => import('./settings/settings.module')
         .then(m => m.SettingsModule) },
    ]      
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
