import { A } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupDto, TypeDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { MaintenanceCreateDto, MaintenanceDto } from '../maintenance.model';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-edit-maintenance',
  templateUrl: './edit-maintenance.component.html',
  styleUrls: ['./edit-maintenance.component.css']
})
export class EditMaintenanceComponent implements OnInit {
  selectedTypes: TypeDto[];
  nonSelectedTypes: GroupDto[];
  selectedAreas: multipleSelectorModel;
  nonSelectedAreas: multipleSelectorModel[];
  photoList:string[];
  model : MaintenanceDto;
  constructor(private activeRoute:ActivatedRoute,
              private maintenanceService:MaintenanceService,
              private router : Router) { }

  ngOnInit(): void {

    this.activeRoute.params.subscribe(params => {
      this.maintenanceService.putget(params["id"]).subscribe(putGetDTO => {
        this.model = putGetDTO.maintenance;
        this.selectedTypes = putGetDTO.selectedTypes.map(type => {
          return {id: type.id, name: type.name}
        });
        this.nonSelectedTypes = putGetDTO.groupTypes;
        this.photoList = putGetDTO.maintenance.pictures.map(url => {
          return url.pictureUrl;
        });
        this.selectedAreas = {key:putGetDTO.selectedAreas.id,value:putGetDTO.selectedAreas.name}
        this.nonSelectedAreas = putGetDTO.areas.map(area =>{
          return <multipleSelectorModel>{key:area.id,value:area.name}
        })
      });
    });
  }
 saveChanges(maintenanceCreateDto : MaintenanceCreateDto){
      this.maintenanceService.edit(this.model.id, maintenanceCreateDto).subscribe(() => {
        this.router.navigate(['/maintenance/edit/' + this.model.id]);
      });
    }

}
