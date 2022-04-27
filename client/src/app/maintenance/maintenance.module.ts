import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../_modules/shared.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { CreateMaintenanceComponent } from './create-maintenance/create-maintenance.component';
import { FormMaintenanceComponent } from './form-maintenance/form-maintenance.component';


@NgModule({
  declarations: [
    CreateMaintenanceComponent,
    FormMaintenanceComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    MaterialModule,
    SharedModule,
    UtilitiesModule
  ],
  exports:[
    
  ]
})
export class MaintenanceModule { }
