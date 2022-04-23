import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { CategorytypeService } from '../../categorytype/categorytype.service';
import { techniciantypeCreationDTO } from '../technician.model';
import { TechniciantypeService } from '../techniciantype.service';

@Component({
  selector: 'app-create-technician',
  templateUrl: './create-technician.component.html',
  styleUrls: ['./create-technician.component.css']
})
export class CreateTechnicianComponent implements OnInit {
  errors: string[] = [];

  constructor(private router: Router,
     private techniciantypeService : TechniciantypeService ) { }

  ngOnInit(): void {
  }

  saveChanges(techniciantypeCreationDTO:techniciantypeCreationDTO){
    this.techniciantypeService.create(techniciantypeCreationDTO).subscribe(() => {
      this.router.navigate(['/admin/techniciantypes']);
    }, error => this.errors = parseWebAPIErrors(error));
  }
}
