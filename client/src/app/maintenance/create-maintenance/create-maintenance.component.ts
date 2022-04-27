import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TechnicianService } from 'src/app/technician/technician.service';
import { GroupDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { MaintenanceCreateDto } from '../maintenance.model';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-create-maintenance',
  templateUrl: './create-maintenance.component.html',
  styleUrls: ['./create-maintenance.component.css']
})
export class CreateMaintenanceComponent implements OnInit {
  nonSelectedTypes : any[];
  selectedTypes : multipleSelectorModel[];
  nonSelectedAreas : multipleSelectorModel[];
  selectedAreas : multipleSelectorModel[];
  constructor(private technicianService:TechnicianService,
              private maintenanceService:MaintenanceService,
              private route : Router) { }

  ngOnInit(): void {
    this.technicianService.postget().subscribe(res => {
      this.nonSelectedAreas = res.areas.map(area => {
        return <multipleSelectorModel>{key:area.id,value:area.name}
      });
      this.nonSelectedTypes = res.groupTypes;
    });
   
  }
 saveChanges(maintenanceCreateDto : MaintenanceCreateDto){
      this.maintenanceService.create(maintenanceCreateDto).subscribe(()=>{
        this.route.navigate(['']);
      })
    }
}
