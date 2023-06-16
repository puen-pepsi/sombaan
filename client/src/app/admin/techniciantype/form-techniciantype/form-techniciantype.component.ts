import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categorytypeDTO } from '../../categorytype/categorytype.model';
import { CategorytypeService } from '../../categorytype/categorytype.service';
import { techniciantypeCreationDTO } from '../technician.model';

@Component({
  selector: 'app-form-techniciantype',
  templateUrl: './form-techniciantype.component.html',
  styleUrls: ['./form-techniciantype.component.css']
})
export class FormTechniciantypeComponent implements OnInit {
  @Output() 
  onSaveChanges: EventEmitter<techniciantypeCreationDTO> = new EventEmitter<techniciantypeCreationDTO>();
  @Input()
  model:techniciantypeCreationDTO;
  Selected:number;
  categorytypes:categorytypeDTO[];
  constructor(private formBuilder: FormBuilder,
              private categoryTypeService:CategorytypeService) { }

  form:FormGroup;

  ngOnInit(): void {
    this.categoryTypeService.getAll().subscribe(categorytypes => {
      this.categorytypes = categorytypes;
    });
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3)]
      }],
      categoryTypeId:0
    });

    if (this.model !== undefined){
      console.log(this.model)
      // this.form.patchValue(this.model);
      this.form.get('name').setValue(this.model.name);
      this.form.get('categoryTypeId').setValue(this.model.categoryTypeId);
    }
  }
  onCategoryTypeChange(event){

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
