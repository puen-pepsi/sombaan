import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { areaCreateDto } from '../areas.model';

@Component({
  selector: 'app-form-areas',
  templateUrl: './form-areas.component.html',
  styleUrls: ['./form-areas.component.css']
})
export class FormAreasComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) { }

  @Input()
  model: areaCreateDto;

  form: FormGroup;

  @Output()
  onSaveChanges: EventEmitter<areaCreateDto> = new EventEmitter<areaCreateDto>();

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
