import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTechnicianComponent } from './create-technician/create-technician.component';
import { EditTechnicianComponent } from './edit-technician/edit-technician.component';

const routes: Routes = [
  {path:'create',component:CreateTechnicianComponent},
  {path:'edit/:id',component:EditTechnicianComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TechnicianRoutingModule { }
