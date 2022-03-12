import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { articleCreationDTO } from '../articles.model';

@Component({
  selector: 'app-form-article',
  templateUrl: './form-article.component.html',
  styleUrls: ['./form-article.component.css']
})
export class FormArticleComponent implements OnInit {
  @Output()
  onSaveChanges = new EventEmitter<articleCreationDTO>();

  @Input() model: articleCreationDTO;

  // @Input()
  @Input()
  selectedGenres: multipleSelectorModel[] = [];
  @Input()
  selectedTags:string[]=['Lemon'];
  nonSelectedGenres: multipleSelectorModel[] = [
    {key:1,value:"Drama"},
    {key:2,value:"Action"},
    {key:3,value:"Comedy"}
  ];
  allTags:string[]=[
    'Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'
  ]

  constructor(private formBuilder : FormBuilder) { }
  form : FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title:['',{
        validators :[Validators.required]
      }],
      description:['',{
        validators : [Validators.required]
      }],
      body:['',{
        validators : [Validators.required]
      }],
      genresIds: '',
      tagsIds:'',
      picture:''
    })
    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }
  changeMarkdown(content){
    this.form.get('description').setValue(content);
  }
  onImageSelected(image){
    console.log(image)
    this.form.get('picture').setValue(image);
  }
  saveChanges(){
    const genresIds = this.selectedGenres.map(value => value.key);
    this.form.get('genresIds').setValue(genresIds);
    const tagsIds = this.selectedTags.map(value => value);
    this.form.get('tagsIds').setValue(tagsIds);

    this.onSaveChanges.emit(this.form.value);

  }
}
