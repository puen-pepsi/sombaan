import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { GroupDto, TypeDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { MaintenanceCreateDto } from '../maintenance.model';

@Component({
  selector: 'app-form-maintenance',
  templateUrl: './form-maintenance.component.html',
  styleUrls: ['./form-maintenance.component.css']
})
export class FormMaintenanceComponent implements OnInit {
  @Output() onSaveChanges = new EventEmitter<MaintenanceCreateDto>();
  @Input() selectedTypes: TypeDto[] = [];
  @Input() nonSelectedTypes : GroupDto[] = [];
  @Input() selectedAreas: multipleSelectorModel;
      // = [{ "key": 2, "value": "ลาดพร้าว" }, { "key": 4, "value": "ห้วยขวาง" } ];
  @Input() nonSelectedAreas : multipleSelectorModel[] = [];
  @Input() photoPreview:string[]=[];
  @Input()  model: MaintenanceCreateDto;
  constructor(private formBuilder : FormBuilder) { }
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date());
    const now = new Date();
    now.setDate(now.getDate()-1)
    // Prevent Saturday and Sunday from being selected.
    return day > now;
  };
  form : FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description:['',{
        validators :[Validators.required]
      }],
      pictureUrl:'',
      typeIds: '',
      dueDate:'',
      areaIds:'',
    })
    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }
  changeMarkdown(des:string){
    this.form.get('description').setValue(des);
  }
  onChangeMultiple(event:TypeDto[]){
    this.selectedTypes = [];
    this.selectedTypes = event;
    // console.log(this.selectedTypes)
  }
  onUploadImage(images:any){
    this.form.get('pictureUrl').setValue(images);
    // console.log(this.form.value)
  }
  onChageSelectedDropdown(event : multipleSelectorModel){
    this.selectedAreas[0] = {key:event.key,value:event.value};
    // console.log(this.selectedAreas[0])
  }
  onChangeSingleSelect(value:multipleSelectorModel){
    this.selectedAreas= {key:value.key,value:value.value};
  }
  saveChanges(){
    const typeIds = this.selectedTypes.map(value => value.id);
    this.form.get('typeIds').setValue(typeIds);
    const areaIds = this.selectedAreas.key;
    this.form.get('areaIds').setValue(areaIds);
    this.onSaveChanges.emit(this.form.value);
  }
}
