import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { areaCreateDto } from '../areas.model';
import { AreasService } from '../areas.service';

@Component({
  selector: 'app-create-areas',
  templateUrl: './create-areas.component.html',
  styleUrls: ['./create-areas.component.css']
})
export class CreateAreasComponent implements OnInit {
  errors: string[] = [];

  constructor(private router: Router, private areaService: AreasService) { }

  ngOnInit(): void {
   
  }

  saveChanges(areaCreateDto:areaCreateDto){
    this.areaService.create(areaCreateDto).subscribe(() => {
      this.router.navigate(['/admin/areas']);
    }, error => this.errors = parseWebAPIErrors(error));

  }
}
