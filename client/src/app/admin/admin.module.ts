import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGenreComponent } from './genre/create-genre/create-genre.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../_modules/shared.module';
import { FormGenreComponent } from './genre/form-genre/form-genre.component';
import { IndexGenresComponent } from './genre/index-genres.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { EditGenreComponent } from './genre/edit-genre/edit-genre.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { IndexTagComponent } from './tag/index-tag.component';
import { CreateTagComponent } from './tag/create-tag/create-tag.component';
import { EditTagComponent } from './tag/edit-tag/edit-tag.component';
import { FormTagComponent } from './tag/form-tag/form-tag.component';

@NgModule({
  declarations: [
    CreateGenreComponent,
    FormGenreComponent,
    IndexGenresComponent,
    EditGenreComponent,
    IndexTagComponent,
    CreateTagComponent,
    EditTagComponent,
    FormTagComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UtilitiesModule,
    SweetAlert2Module,
    RouterModule.forChild([
      {path:'genres',component:IndexGenresComponent},
      {path:'genres/create',component:CreateGenreComponent},
      {path:'genres/edit/:id',component:EditGenreComponent},
      {path:'tags',component:IndexTagComponent},
      {path:'tags/create',component:CreateTagComponent},
      {path:'tags/edit/:id',component:EditTagComponent},
    ])
    

  ]
})
export class AdminModule { }
