import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categorytypeCreationDTO } from '../categorytype.model';

@Component({
  selector: 'app-form-categorytype',
  templateUrl: './form-categorytype.component.html',
  styleUrls: ['./form-categorytype.component.css']
})
export class FormCategorytypeComponent implements OnInit {

  @Output() 
  onSaveChanges: EventEmitter<categorytypeCreationDTO> = new EventEmitter<categorytypeCreationDTO>();
  @Input()
  model:categorytypeCreationDTO;
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
