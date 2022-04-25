import { Component, OnInit } from '@angular/core';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { Pagination } from 'src/app/_models/pagination';
import { TechnicianDto, TechnicianParams } from '../technician.model';
import { TechnicianService } from '../technician.service';

@Component({
  selector: 'app-technician-list',
  templateUrl: './technician-list.component.html',
  styleUrls: ['./technician-list.component.css']
})
export class TechnicianListComponent implements OnInit {
  nonSelectedTypes : any[];
  selectedTypes : multipleSelectorModel[];
  technicians : TechnicianDto[];
  nonSelectedAreas : multipleSelectorModel[];
  pagination : Pagination;
  technicianParams : TechnicianParams;
  constructor(private technicianService:TechnicianService) { 
     this.technicianParams = this.technicianService.getTechnicianParams();
  }

  ngOnInit(): void {
    this.technicianService.postget().subscribe(res => {
      this.nonSelectedAreas = res.areas.map(area => {
        return <multipleSelectorModel>{key:area.id,value:area.name}
      });
      this.nonSelectedTypes = res.groupTypes;
    });
    this.loadTechnician();
  }
  loadTechnician(){
    this.technicianService.setTechnicianParams(this.technicianParams);
    this.technicianService.getTechnicianPagination(this.technicianParams).subscribe(response => {
       this.technicians = response.result;
       this.pagination = response.pagination;
    })
  }
  pageChanged(event:any){
    this.technicianService.setTechnicianParams(this.technicianParams);
    // this.articleParams.pageNumber++;
    //this.articleParams.pageNumber = event.page;
    this.technicianParams.pageNumber=event.pageIndex+1;
    this.loadTechnician();
  }
  typeFilter(event:number){
    // this.technicianParams.type = event;
    this.technicianParams.pageNumber=1;
    this.loadTechnician();
  }
  searchFilter(event:string){
    // this.technicianParams.search = event;
    this.technicianParams.pageNumber=1;
    this.loadTechnician();
  }
  resetFilter(){
    this.technicianParams = this.technicianService.resetTechnicianParams();
    this.loadTechnician();
  }
  submitFilter(event){
    this.technicianParams.areas = event.areas;
    this.technicianParams.types  = event.types;
    this.technicianParams.search = event.search;
    this.loadTechnician();
  }
}
