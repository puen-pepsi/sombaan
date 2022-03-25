import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { htmlPageCreateDTO } from '../html-page.model';

@Component({
  selector: 'app-form-html',
  templateUrl: './form-html.component.html',
  styleUrls: ['./form-html.component.css']
})
export class FormHtmlComponent implements OnInit {
  @Output()
  onSaveChanges = new EventEmitter<htmlPageCreateDTO>();

  @Input() model:htmlPageCreateDTO;
  // model = {link:'test',
  //   content:'content test'}
  constructor(private formBuilder : FormBuilder,
              private route:Router) { }
  form : FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      link:['',{
        validators:[Validators.required]
      }],
      content:['',{
        Validators:[Validators.required]}]
    })
    if(this.model !== undefined){
      this.form.patchValue(this.model)
    }
  }
  getContent(event){
    this.form.get('content').setValue(event);
  }
  saveChanges(){
    this.onSaveChanges.emit(this.form.value);
  }
}
