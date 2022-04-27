import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupDto, TypeDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { MultipleSelectorComponent } from 'src/app/utilities/multiple-selector/multiple-selector.component';
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
  @Input() selectedAreas: multipleSelectorModel[] = [];
      // = [{ "key": 2, "value": "ลาดพร้าว" }, { "key": 4, "value": "ห้วยขวาง" } ];
  @Input() nonSelectedAreas : multipleSelectorModel[] = [];
  // @Input() 
  model: MaintenanceCreateDto;
  constructor(private formBuilder : FormBuilder) { }
  form : FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      description:['',{
        validators :[Validators.required]
      }],
      pictureUrl:'',
      typeIds: '',
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
  saveChanges(){
    const typeIds = this.selectedTypes.map(value => value.id);
    this.form.get('typeIds').setValue(typeIds);
    const areaIds = this.selectedAreas.map(value => value.key);
    this.form.get('areaIds').setValue(areaIds);
    this.onSaveChanges.emit(this.form.value);
  }
}
