import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tagCreationDTO } from '../tags.model';

@Component({
  selector: 'app-form-tag',
  templateUrl: './form-tag.component.html',
  styleUrls: ['./form-tag.component.css']
})
export class FormTagComponent implements OnInit {
  @Output() 
  onSaveChanges: EventEmitter<tagCreationDTO> = new EventEmitter<tagCreationDTO>();
  @Input()
  model:tagCreationDTO;
  constructor(private formBuilder: FormBuilder) { }

  form:FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3)]
      }]
    });

    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }
  saveChanges(){
    this.onSaveChanges.emit(this.form.value);
  }
  getErrorMessageFieldName(){
    const field = this.form.get('name');

    if (field.hasError('required')){
      return 'The name field is required';
    }

    if (field.hasError('minlength')){
      return 'The minimum length is 3';
    }
    return '';
  }
}
