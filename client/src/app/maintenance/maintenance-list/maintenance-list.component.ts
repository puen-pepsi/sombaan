import { Component, OnInit } from '@angular/core';
import { TechnicianService } from 'src/app/technician/technician.service';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { Pagination } from 'src/app/_models/pagination';
import { MaintenanceDetailsDto, MaintenanceDto, MaintenanceParams } from '../maintenance.model';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.component.html',
  styleUrls: ['./maintenance-list.component.css']
})
export class MaintenanceListComponent implements OnInit {
  nonSelectedTypes : any[];
  selectedTypes : multipleSelectorModel[];
  nonSelectedAreas : multipleSelectorModel[];
  pagination : Pagination;
  maintenanceParams : MaintenanceParams;
  maintenances : MaintenanceDetailsDto[];
  constructor(private maintenanceService:MaintenanceService,
              private technicianService:TechnicianService) {
                this.maintenanceParams = this.maintenanceService.getMaintenanceParams();
               }

  ngOnInit(): void {
    this.technicianService.postget().subscribe(res => {
      this.nonSelectedAreas = res.areas.map(area => {
        return <multipleSelectorModel>{key:area.id,value:area.name}
      });
      this.nonSelectedTypes = res.groupTypes;
    });
    this.loadMaintenance();
  }
  loadMaintenance(){
    this.maintenanceService.setMaintenanceParams(this.maintenanceParams);
    this.maintenanceService.getMaintenancePagination(this.maintenanceParams).subscribe(response => {
       this.maintenances = response.result;
       this.pagination = response.pagination;
      //  console.log(response.result)
    })
  }
  pageChanged(event:any){
    this.technicianService.setTechnicianParams(this.maintenanceParams);
    // this.articleParams.pageNumber++;
    //this.articleParams.pageNumber = event.page;
    this.maintenanceParams.pageNumber=event.pageIndex+1;
    this.loadMaintenance();
  }
  typeFilter(event:number){
    // this.technicianParams.type = event;
    this.maintenanceParams.pageNumber=1;
    this.loadMaintenance();
  }
  searchFilter(event:string){
    // this.technicianParams.search = event;
    this.maintenanceParams.pageNumber=1;
    this.loadMaintenance();
  }
  resetFilter(){
    this.maintenanceParams = this.technicianService.resetTechnicianParams();
    this.loadMaintenance();
  }
  submitFilter(event){
    this.maintenanceParams.areas = event.areas;
    this.maintenanceParams.types  = event.types;
    this.maintenanceParams.search = event.search;
    this.loadMaintenance();
  }
}
