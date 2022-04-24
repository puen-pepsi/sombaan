import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupDto, TypeDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { TechnicianCreateDto, TechnicianDto } from '../technician.model';
import { TechnicianService } from '../technician.service';

@Component({
  selector: 'app-edit-technician',
  templateUrl: './edit-technician.component.html',
  styleUrls: ['./edit-technician.component.css']
})
export class EditTechnicianComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute,
              private technicianService : TechnicianService,
              private router : Router) { }
  model: TechnicianDto;

  selectedTypes: TypeDto[];
  nonSelectedTypes: GroupDto[];
  selectedAreas: multipleSelectorModel[];
  nonSelectedAreas: multipleSelectorModel[];
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.technicianService.putget(params["id"]).subscribe(putGetDTO => {
        this.model = putGetDTO.technician;

        this.selectedTypes = putGetDTO.selectedTypes.map(type => {
          return {id: type.id, name: type.name}
        });

        this.nonSelectedTypes = putGetDTO.groupTypes;
  
        this.selectedAreas = putGetDTO.selectedAreas.map(area => {
          return <multipleSelectorModel>{key: area.id, value: area.name}
        });
        this.nonSelectedAreas = putGetDTO.areas.map(area =>{
          return <multipleSelectorModel>{key:area.id,value:area.name}
        })


      });
    });
  }
  saveChanges(technicianCreateDto: TechnicianCreateDto){
    this.technicianService.edit(this.model.id, technicianCreateDto).subscribe(() => {
      this.router.navigate(['/technician/edit/' + this.model.id]);
    });
  }

}
