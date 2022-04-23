import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { categorytypeCreationDTO } from '../categorytype.model';
import { CategorytypeService } from '../categorytype.service';

@Component({
  selector: 'app-create-categorytype',
  templateUrl: './create-categorytype.component.html',
  styleUrls: ['./create-categorytype.component.css']
})
export class CreateCategorytypeComponent implements OnInit {
  errors: string[] = [];

  constructor(private router: Router, private categorytypeService : CategorytypeService ) { }

  ngOnInit(): void {
   
  }

  saveChanges(categorytypeCreationDTO: categorytypeCreationDTO){
    this.categorytypeService.create(categorytypeCreationDTO).subscribe(() => {
      this.router.navigate(['/admin/categorytypes']);
    }, error => this.errors = parseWebAPIErrors(error));

  }
}
