import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { areaCreateDto, areaDto } from '../areas.model';
import { AreasService } from '../areas.service';

@Component({
  selector: 'app-edit-areas',
  templateUrl: './edit-areas.component.html',
  styleUrls: ['./edit-areas.component.css']
})
export class EditAreasComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
    private areaService: AreasService,
    private router: Router) { }

  model: areaDto;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.areaService.getById(params['id']).subscribe(area => {
        this.model = area;
      })
    });
  }

  saveChanges(areaCreateDto:areaCreateDto){
    this.areaService.edit(this.model.id,areaCreateDto)
    .subscribe(() => {
      this.router.navigate(["/admin/areas"]);
    });
  }

}
