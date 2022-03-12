import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tagCreationDTO, tagDTO } from '../tags.model';
import { TagsService } from '../tags.service';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
    private tagsservice: TagsService,
    private router: Router) { }

  model: tagDTO;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.tagsservice.getById(params['id']).subscribe(tag => {
        this.model = tag;
      })
    });
  }

  saveChanges(tagCreationDTO: tagCreationDTO){
    this.tagsservice.edit(this.model.id, tagCreationDTO)
    .subscribe(() => {
      this.router.navigate(["/admin/tags"]);
    });
  }

}
