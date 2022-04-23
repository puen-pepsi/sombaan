import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { techniciantypeCreationDTO, techniciantypeDTO } from '../technician.model';
import { TechniciantypeService } from '../techniciantype.service';

@Component({
  selector: 'app-edit-technician',
  templateUrl: './edit-technician.component.html',
  styleUrls: ['./edit-technician.component.css']
})
export class EditTechnicianComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
    private techniciantypeService : TechniciantypeService,
    private router: Router) { }

  model: techniciantypeDTO;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.techniciantypeService.getById(params['id']).subscribe(techniciantype => {
        this.model = techniciantype;
      })
    });
  }

  saveChanges(techniciantypeCreationDTO: techniciantypeCreationDTO){
    this.techniciantypeService.edit(this.model.id, techniciantypeCreationDTO)
    .subscribe(() => {
      this.router.navigate(["/admin/techniciantypes"]);
    });
  }
}
