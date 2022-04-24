import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { TechnicianCreateDto } from '../technician.model';
import { TechnicianService } from '../technician.service';

@Component({
  selector: 'app-create-technician',
  templateUrl: './create-technician.component.html',
  styleUrls: ['./create-technician.component.css']
})
export class CreateTechnicianComponent implements OnInit {
  nonSelectedTypes : any[];
  selectedTypes : multipleSelectorModel[];
  nonSelectedAreas : multipleSelectorModel[];
  selectedAreas : multipleSelectorModel[];
  groups : GroupDto[];
  constructor(private technicianService:TechnicianService,
              private route : Router) { }

  ngOnInit(): void {
    // this.technicianService.getGroups().subscribe( res => {
    //   this.groups = res;
    // })
    this.technicianService.postget().subscribe(res => {
      this.nonSelectedAreas = res.areas.map(area => {
        return <multipleSelectorModel>{key:area.id,value:area.name}
      });
      this.nonSelectedTypes = res.groupTypes;
    });
  }
  saveChanges(technicianCreateDto : TechnicianCreateDto){
    console.log(technicianCreateDto)
    this.technicianService.create(technicianCreateDto).subscribe(()=>{
      this.route.navigate(['']);
    })
  }
}
