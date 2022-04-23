import { Component, OnInit } from '@angular/core';
import { techniciantypeDTO } from './technician.model';
import { TechniciantypeService } from './techniciantype.service';

@Component({
  selector: 'app-index-techniciantype',
  templateUrl: './index-techniciantype.component.html',
  styleUrls: ['./index-techniciantype.component.css']
})
export class IndexTechniciantypeComponent implements OnInit {
  techniciantypes : techniciantypeDTO[];

  columnsToDisplay = ['category','name', 'actions'];
  constructor(private techniciantypeService :TechniciantypeService) { }

  ngOnInit(): void {
    this.loadtechnicianType();
  }
  loadtechnicianType(){
    this.techniciantypeService.getAll().subscribe(techniciantypes => {
      this.techniciantypes = techniciantypes;
    });
  }

  delete(id: number){
    this.techniciantypeService.delete(id)
    .subscribe(() => {
      this.loadtechnicianType();
    });
  }

}
