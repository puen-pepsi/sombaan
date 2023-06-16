import { Component, OnInit } from '@angular/core';
import { techniciantypeDTO } from './technician.model';
import { TechniciantypeService } from './techniciantype.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-index-techniciantype',
  styleUrls: ['./index-techniciantype.component.css'],
  templateUrl: './index-techniciantype.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IndexTechniciantypeComponent implements OnInit {
  techniciantypes : techniciantypeDTO[];

  columnsToDisplay = ['category','name', 'actions'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay,'expand'  ];
  expandedElement: techniciantypeDTO | null;

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
