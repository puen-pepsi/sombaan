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
import { HtmlPageComponent } from './html-page/html-page.component';
import { CreateHtmlPageComponent } from './html-page/create-html-page/create-html-page.component';
import { FormHtmlComponent } from './html-page/form-html/form-html.component';
import { EditHtmlPageComponent } from './html-page/edit-html-page/edit-html-page.component';
import { IndexAreaComponent } from './area/index-area.component';
import { CreateAreasComponent } from './area/create-areas/create-areas.component';
import { EditAreasComponent } from './area/edit-areas/edit-areas.component';
import { FormAreasComponent } from './area/form-areas/form-areas.component';
import { CreateCategorytypeComponent } from './categorytype/create-categorytype/create-categorytype.component';
import { EditCategorytypeComponent } from './categorytype/edit-categorytype/edit-categorytype.component';
import { IndexCategorytypeComponent } from './categorytype/index-categorytype.component';
import { FormCategorytypeComponent } from './categorytype/form-categorytype/form-categorytype.component';
import { IndexTechniciantypeComponent } from './techniciantype/index-techniciantype.component';
import { FormTechniciantypeComponent } from './techniciantype/form-techniciantype/form-techniciantype.component';
import { CreateTechnicianComponent } from './techniciantype/create-technician/create-technician.component';
import { EditTechnicianComponent } from './techniciantype/edit-technician/edit-technician.component';
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
    HtmlPageComponent,
    CreateHtmlPageComponent,
    FormHtmlComponent,
    EditHtmlPageComponent,
    IndexAreaComponent,
    CreateAreasComponent,
    EditAreasComponent,
    FormAreasComponent,
    CreateCategorytypeComponent,
    EditCategorytypeComponent,
    IndexCategorytypeComponent,
    FormCategorytypeComponent,
    IndexTechniciantypeComponent,
    FormTechniciantypeComponent,
    CreateTechnicianComponent,
    EditTechnicianComponent,
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
    ])
    

  ],
  exports:[
    HtmlPageComponent
  ]
})
export class AdminModule { }
