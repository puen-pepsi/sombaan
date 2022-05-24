import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { CreateGenreComponent } from './genre/create-genre/create-genre.component';
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
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminRoutingModule } from './admin-routing.module';
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
    AdminPanelComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MaterialModule,
    UtilitiesModule,
    SweetAlert2Module,
   
    

  ],
  exports:[
    HtmlPageComponent
  ]
})
export class AdminModule { }
