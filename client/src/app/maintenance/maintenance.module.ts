import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../_modules/shared.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { CreateMaintenanceComponent } from './create-maintenance/create-maintenance.component';
import { FormMaintenanceComponent } from './form-maintenance/form-maintenance.component';
import { CreateAddressComponent } from './address/create-address/create-address.component';
import { FormAddressComponent } from './address/form-address/form-address.component';
import { EditMaintenanceComponent } from './edit-maintenance/edit-maintenance.component';


@NgModule({
  declarations: [
    CreateMaintenanceComponent,
    FormMaintenanceComponent,
    CreateAddressComponent,
    FormAddressComponent,
    EditMaintenanceComponent
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
