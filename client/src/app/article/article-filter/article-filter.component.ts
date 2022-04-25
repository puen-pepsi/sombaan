import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { genreDTO } from 'src/app/admin/genre/genres.model';
import { GenresService } from 'src/app/admin/genre/genres.service';

@Component({
  selector: 'app-article-filter',
  templateUrl: './article-filter.component.html',
  styleUrls: ['./article-filter.component.css']
})
export class ArticleFilterComponent implements OnInit {
  @Output() genre = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();
  @Output() reset = new EventEmitter();
  @ViewChild('search',{static:true}) seachTerm:ElementRef;

  constructor(private formbuilder : FormBuilder,
              private genresService:GenresService) { }
  form : FormGroup;

  // genres = [{id:1,name:'Drama'},{id:2,name:'Action'}]
  genres : genreDTO[];
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      title:'',
      genreId:0
    })

    this.genresService.getAll().subscribe(genres => {
      this.genres = genres;
    });
  }
  onGenreChange(event){
    this.genre.emit(event.value);
  }
  onSearch(event){
    this.search.emit(event.target.value)
  }
  resetFilter(){
    this.form.reset();
    this.seachTerm.nativeElement.value='';
    this.reset.emit();
  }
}
