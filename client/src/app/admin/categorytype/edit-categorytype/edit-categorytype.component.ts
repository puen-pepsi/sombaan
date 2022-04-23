import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categorytypeCreationDTO, categorytypeDTO } from '../categorytype.model';
import { CategorytypeService } from '../categorytype.service';

@Component({
  selector: 'app-edit-categorytype',
  templateUrl: './edit-categorytype.component.html',
  styleUrls: ['./edit-categorytype.component.css']
})
export class EditCategorytypeComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
    private categoryTypeService: CategorytypeService,
    private router: Router) { }

  model: categorytypeDTO;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.categoryTypeService.getById(params['id']).subscribe(categorytype => {
        this.model = categorytype;
      })
    });
  }

  saveChanges(categorytypeCreationDTO: categorytypeCreationDTO){
    this.categoryTypeService.edit(this.model.id, categorytypeCreationDTO)
    .subscribe(() => {
      this.router.navigate(["/admin/categorytypes"]);
    });
  }

}
