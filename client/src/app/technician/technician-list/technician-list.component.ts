import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { TechnicianDto, TechnicianParams } from '../technician.model';
import { TechnicianService } from '../technician.service';

@Component({
  selector: 'app-technician-list',
  templateUrl: './technician-list.component.html',
  styleUrls: ['./technician-list.component.css']
})
export class TechnicianListComponent implements OnInit {
  technicians : TechnicianDto[];
  pagination : Pagination;
  technicianParams : TechnicianParams;
  constructor(private technicianService:TechnicianService) { 
     this.technicianParams = this.technicianService.getTechnicianParams();
  }

  ngOnInit(): void {
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
    this.technicianParams.type = event;
    this.technicianParams.pageNumber=1;
    this.loadTechnician();
  }
  searchFilter(event:string){
    this.technicianParams.search = event;
    this.technicianParams.pageNumber=1;
    this.loadTechnician();
  }
  resetFilter(){
    this.technicianParams = this.technicianService.resetTechnicianParams();
    this.loadTechnician();
  }
}
