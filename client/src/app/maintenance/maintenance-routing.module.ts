import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { CreateAddressComponent } from './address/create-address/create-address.component';
import { CreateMaintenanceComponent } from './create-maintenance/create-maintenance.component';
import { EditMaintenanceComponent } from './edit-maintenance/edit-maintenance.component';
import { MaintenanceDetailsComponent } from './maintenance-details/maintenance-details.component';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';

const routes: Routes = [
  {path:'',component:MaintenanceListComponent,canActivate: [AuthGuard]},
  {path:'create',component:CreateMaintenanceComponent},
  {path:'address',component:CreateAddressComponent},
  {path:'edit/:id',component:EditMaintenanceComponent},
  {path:':id',component:MaintenanceDetailsComponent,
      // resolve: {
      //   technicianDetail : TechnicianDetailedResolver
      // }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
