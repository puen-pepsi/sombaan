import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { IndexGenresComponent } from './genre/index-genres.component';
import { EditGenreComponent } from './genre/edit-genre/edit-genre.component';
import { IndexTagComponent } from './tag/index-tag.component';
import { CreateTagComponent } from './tag/create-tag/create-tag.component';
import { EditTagComponent } from './tag/edit-tag/edit-tag.component';
import { CreateHtmlPageComponent } from './html-page/create-html-page/create-html-page.component';
import { EditHtmlPageComponent } from './html-page/edit-html-page/edit-html-page.component';
import { IndexAreaComponent } from './area/index-area.component';
import { CreateAreasComponent } from './area/create-areas/create-areas.component';
import { EditAreasComponent } from './area/edit-areas/edit-areas.component';
import { CreateCategorytypeComponent } from './categorytype/create-categorytype/create-categorytype.component';
import { EditCategorytypeComponent } from './categorytype/edit-categorytype/edit-categorytype.component';
import { IndexCategorytypeComponent } from './categorytype/index-categorytype.component';
import { IndexTechniciantypeComponent } from './techniciantype/index-techniciantype.component';
import { CreateTechnicianComponent } from './techniciantype/create-technician/create-technician.component';
import { EditTechnicianComponent } from './techniciantype/edit-technician/edit-technician.component';
import { CreateGenreComponent } from './genre/create-genre/create-genre.component';

const routes: Routes = [
  {path:'',component:AdminPanelComponent,
  children:[
      {path:'',component:IndexGenresComponent},
      {path:'genres',component:IndexGenresComponent},
      {path:'genres/create',component:CreateGenreComponent},
      {path:'genres/edit/:id',component:EditGenreComponent},
      {path:'tags',component:IndexTagComponent},
      {path:'tags/create',component:CreateTagComponent},
      {path:'tags/edit/:id',component:EditTagComponent},
      {path:'htmlpage/create',component:CreateHtmlPageComponent},
      {path:'htmlpage/edit/:id',component:EditHtmlPageComponent},
      {path:'areas',component:IndexAreaComponent},
      {path:'areas/create',component:CreateAreasComponent},
      {path:'areas/edit/:id',component:EditAreasComponent},
      {path:'categorytypes',component:IndexCategorytypeComponent},
      {path:'categorytypes/create',component:CreateCategorytypeComponent},
      {path:'categorytypes/edit/:id',component:EditCategorytypeComponent},
      {path:'techniciantypes',component:IndexTechniciantypeComponent},
      {path:'techniciantypes/create',component:CreateTechnicianComponent},
      {path:'techniciantypes/edit/:id',component:EditTechnicianComponent},
    ]
  }
];
// .forChild([
//   {path:'genres',component:IndexGenresComponent},
//   {path:'genres/create',component:CreateGenreComponent},
//   {path:'genres/edit/:id',component:EditGenreComponent},
//   {path:'tags',component:IndexTagComponent},
//   {path:'tags/create',component:CreateTagComponent},
//   {path:'tags/edit/:id',component:EditTagComponent},
//   {path:'htmlpage/create',component:CreateHtmlPageComponent},
//   {path:'htmlpage/edit/:id',component:EditHtmlPageComponent},
//   {path:'areas',component:IndexAreaComponent},
//   {path:'areas/create',component:CreateAreasComponent},
//   {path:'areas/edit/:id',component:EditAreasComponent},
//   {path:'categorytypes',component:IndexCategorytypeComponent},
//   {path:'categorytypes/create',component:CreateCategorytypeComponent},
//   {path:'categorytypes/edit/:id',component:EditCategorytypeComponent},
//   {path:'techniciantypes',component:IndexTechniciantypeComponent},
//   {path:'techniciantypes/create',component:CreateTechnicianComponent},
//   {path:'techniciantypes/edit/:id',component:EditTechnicianComponent},
// ])
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
