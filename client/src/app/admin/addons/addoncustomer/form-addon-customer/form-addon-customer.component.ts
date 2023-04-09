import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { addonCutomerCreationDto } from '../../addons.model';

@Component({
  selector: 'app-form-addon-customer',
  templateUrl: './form-addon-customer.component.html',
  styleUrls: ['./form-addon-customer.component.css']
})
export class FormAddonCustomerComponent implements OnInit {
  @Input()
      model: addonCutomerCreationDto;
  @Input() states;

  selectedValue:string;
  form: FormGroup;
  
  @Output()
  onSaveChanges: EventEmitter<addonCutomerCreationDto> = new EventEmitter<addonCutomerCreationDto>();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3)]
      }],
      descriptions:['',{
        validators : [Validators.required]
      }],
      price:'',
      addonStateId:'',
    });
    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }

  saveChanges(){
    console.log(this.form.value)
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