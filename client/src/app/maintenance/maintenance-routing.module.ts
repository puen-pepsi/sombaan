import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAddressComponent } from './address/create-address/create-address.component';
import { CreateMaintenanceComponent } from './create-maintenance/create-maintenance.component';
import { EditMaintenanceComponent } from './edit-maintenance/edit-maintenance.component';

const routes: Routes = [
  // {path:'',component:TechnicianListComponent},
  {path:'create',component:CreateMaintenanceComponent},
  {path:'edit/:id',component:EditMaintenanceComponent},
  // {path:':id',component:TechnicianDetailsComponent,
  //     resolve: {
  //       technicianDetail : TechnicianDetailedResolver
  //     }
  // }
  {path:'address',component:CreateAddressComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
