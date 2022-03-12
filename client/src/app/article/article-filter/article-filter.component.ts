import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-article-filter',
  templateUrl: './article-filter.component.html',
  styleUrls: ['./article-filter.component.css']
})
export class ArticleFilterComponent implements OnInit {

  constructor(private formbuilder : FormBuilder) { }
  form : FormGroup;

  genres = [{id:1,name:'Drama'},{id:2,name:'Action'}]

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      title:'',
      genre:0
    })
  }

}
