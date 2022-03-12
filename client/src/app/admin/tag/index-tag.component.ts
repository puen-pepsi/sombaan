import { Component, OnInit } from '@angular/core';
import { tagDTO } from './tags.model';
import { TagsService } from './tags.service';

@Component({
  selector: 'app-index-tag',
  templateUrl: './index-tag.component.html',
  styleUrls: ['./index-tag.component.css']
})
export class IndexTagComponent implements OnInit {
  tags: tagDTO[];

  columnsToDisplay = ['name', 'actions'];
  constructor(private tagsservice :TagsService) { }

  ngOnInit(): void {
    this.loadtag();
  }
  loadtag(){
    this.tagsservice.getAll().subscribe(tags => {
      this.tags = tags;
    });
  }

  delete(id: number){
    this.tagsservice.delete(id)
    .subscribe(() => {
      this.loadtag();
    });
  }
}
