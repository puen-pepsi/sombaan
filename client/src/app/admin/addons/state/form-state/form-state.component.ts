import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addonStateCreationDTO } from '../../addons.model';

@Component({
  selector: 'app-form-state',
  templateUrl: './form-state.component.html',
  styleUrls: ['./form-state.component.css']
})
export class FormStateComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) { }

  @Input()
  model: addonStateCreationDTO;

  form: FormGroup;

  @Output()
  onSaveChanges: EventEmitter<addonStateCreationDTO> = new EventEmitter<addonStateCreationDTO>();

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
