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
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import { MaintenanceCardComponent } from './maintenance-card/maintenance-card.component';
import { MaintenanceDetailsComponent } from './maintenance-details/maintenance-details.component';
import { NgImageSliderModule} from 'ng-image-slider';
import { MaintenanceFilterComponent } from './maintenance-filter/maintenance-filter.component'
import { TechnicianModule } from '../technician/technician.module';
import { MatchtechnicianCardComponent } from './matchtechnician-card/matchtechnician-card.component';
import { Form2MaintenanceComponent } from './form2-maintenance/form2-maintenance.component';

@NgModule({
  declarations: [
    CreateMaintenanceComponent,
    FormMaintenanceComponent,
    CreateAddressComponent,
    FormAddressComponent,
    EditMaintenanceComponent,
    MaintenanceListComponent,
    MaintenanceCardComponent,
    MaintenanceDetailsComponent,
    MaintenanceFilterComponent,
    MatchtechnicianCardComponent,
    Form2MaintenanceComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    MaterialModule,
    SharedModule,
    UtilitiesModule,
    NgImageSliderModule,
  ],
  exports:[
    
  ]
})
export class MaintenanceModule { }
