import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileResolver } from '../_resolvers/profile.resolver';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  {
    path: ':username',
    component: ProfileComponent,
      resolve:{
        profile:ProfileResolver
      }
    // children: [
      // {
      //   path: '',
      //   component: ProfileArticlesComponent
      // },
      // {
      //   path: 'favorites',
      //   component: ProfileFavoritesComponent
      // }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
