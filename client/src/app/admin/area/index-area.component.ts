import { Component, OnInit } from '@angular/core';
import { areaDto } from './areas.model';
import { AreasService } from './areas.service';

@Component({
  selector: 'app-index-area',
  templateUrl: './index-area.component.html',
  styleUrls: ['./index-area.component.css']
})
export class IndexAreaComponent implements OnInit {
  areas: areaDto[];

  columnsToDisplay = ['name', 'actions'];
  constructor(private areaService :AreasService) { }

  ngOnInit(): void {
    this.loadArea();
  }
  loadArea(){
    this.areaService.getAll().subscribe(area => {
      this.areas = area;
    });
  }

  delete(id: number){
    this.areaService.delete(id)
    .subscribe(() => {
      this.loadArea();
    });
  }

}
