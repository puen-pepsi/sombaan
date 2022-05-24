import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicianRoutingModule } from './technician-routing.module';
import { FormTechnicianComponent } from './form-technician/form-technician.component';
import { CreateTechnicianComponent } from './create-technician/create-technician.component';
import { EditTechnicianComponent } from './edit-technician/edit-technician.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../_modules/shared.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { TechnicianCardComponent } from './technician-card/technician-card.component';
import { TechnicianDetailsComponent } from './technician-details/technician-details.component';
import { TechnicianListComponent } from './technician-list/technician-list.component';
import { TechnicianFilterComponent } from './technician-filter/technician-filter.component';


@NgModule({
  declarations: [
    FormTechnicianComponent,
    CreateTechnicianComponent,
    EditTechnicianComponent,
    TechnicianCardComponent,
    TechnicianDetailsComponent,
    TechnicianListComponent,
    TechnicianFilterComponent
  ],
  imports: [
    CommonModule,
    TechnicianRoutingModule,
    MaterialModule,
    SharedModule,
    UtilitiesModule
  ],
  exports:[
  ]
})
export class TechnicianModule { }
