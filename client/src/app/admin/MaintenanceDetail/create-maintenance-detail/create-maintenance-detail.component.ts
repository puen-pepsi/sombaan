import { Component, OnInit } from '@angular/core';
import { TechnicianService } from 'src/app/technician/technician.service';
import { MaintenanceDetailGroup, MaintenanceDetailsCreateDto } from '../maintenance-detail.model';
import { MaintenanceDetailService } from '../maintenance-detail.service';
@Component({
  selector: 'app-create-maintenance-detail',
  templateUrl: './create-maintenance-detail.component.html',
  styleUrls: ['./create-maintenance-detail.component.css']
})
export class CreateMaintenanceDetailComponent implements OnInit {
  model : MaintenanceDetailGroup[];
  nonSelectedTypes : any[];
  constructor(private technicianService :TechnicianService,
              private maintenanceDetailService:MaintenanceDetailService) { }

  ngOnInit(): void {
    this.technicianService.getCategory().subscribe( res =>{
      this.nonSelectedTypes = res;
    });
  }
  onChanges(id:number){
    this.maintenanceDetailService.getMaintenanceDetail(id).subscribe(res => {
      this.model = res;
    })
  }
  onSave(event:MaintenanceDetailsCreateDto){
    console.log(event)
    this.maintenanceDetailService.create(event).subscribe(()=>{
      console.log()
    })
  }
}
