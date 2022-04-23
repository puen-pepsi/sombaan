import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechnicianRoutingModule } from './technician-routing.module';
import { FormTechnicianComponent } from './form-technician/form-technician.component';
import { CreateTechnicianComponent } from './create-technician/create-technician.component';
import { EditTechnicianComponent } from './edit-technician/edit-technician.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../_modules/shared.module';
import { UtilitiesModule } from '../utilities/utilities.module';


@NgModule({
  declarations: [
    FormTechnicianComponent,
    CreateTechnicianComponent,
    EditTechnicianComponent
  ],
  imports: [
    CommonModule,
    TechnicianRoutingModule,
    MaterialModule,
    SharedModule,
    UtilitiesModule
  ]
})
export class TechnicianModule { }
