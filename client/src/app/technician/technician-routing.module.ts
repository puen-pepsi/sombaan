import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicianDetailedResolver } from '../_resolvers/technician-detailed.resolver';
import { CreateTechnicianComponent } from './create-technician/create-technician.component';
import { EditTechnicianComponent } from './edit-technician/edit-technician.component';
import { TechnicianCardComponent } from './technician-card/technician-card.component';
import { TechnicianDetailsComponent } from './technician-details/technician-details.component';
import { TechnicianListComponent } from './technician-list/technician-list.component';

const routes: Routes = [
  {path:'',component:TechnicianListComponent},
  {path:'create',component:CreateTechnicianComponent},
  {path:'edit/:id',component:EditTechnicianComponent},
  {path:':id',component:TechnicianDetailsComponent,
      resolve: {
        technicianDetail : TechnicianDetailedResolver
      }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianRoutingModule { }
