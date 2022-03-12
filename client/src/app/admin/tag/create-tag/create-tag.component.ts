import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { tagCreationDTO } from '../tags.model';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-create-tag',
  templateUrl: './create-tag.component.html',
  styleUrls: ['./create-tag.component.css']
})
export class CreateTagComponent implements OnInit {
  errors: string[] = [];

  constructor(private router: Router, private tagservices : TagsService ) { }

  ngOnInit(): void {
   
  }

  saveChanges(tagCreationDTO: tagCreationDTO){
    this.tagservices.create(tagCreationDTO).subscribe(() => {
      this.router.navigate(['/admin/tags']);
    }, error => this.errors = parseWebAPIErrors(error));

  }
}
