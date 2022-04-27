import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMaintenanceComponent } from './create-maintenance/create-maintenance.component';

const routes: Routes = [
  // {path:'',component:TechnicianListComponent},
  {path:'create',component:CreateMaintenanceComponent},
  // {path:'edit/:id',component:EditTechnicianComponent},
  // {path:':id',component:TechnicianDetailsComponent,
  //     resolve: {
  //       technicianDetail : TechnicianDetailedResolver
  //     }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
