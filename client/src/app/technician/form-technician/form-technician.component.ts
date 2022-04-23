import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { TechnicianCreateDto } from '../technician.model';

@Component({
  selector: 'app-form-technician',
  templateUrl: './form-technician.component.html',
  styleUrls: ['./form-technician.component.css']
})
export class FormTechnicianComponent implements OnInit {
  @Output()  onSaveChanges = new EventEmitter<TechnicianCreateDto>();
  @Input() model: TechnicianCreateDto;
  @Input() selectedTypes: multipleSelectorModel[] = [];
  @Input() nonSelectedTypes : multipleSelectorModel[] = [];
  @Input() selectedAreas: multipleSelectorModel[] 
      = [{ "key": 2, "value": "ลาดพร้าว" }, { "key": 4, "value": "ห้วยขวาง" } ];
  @Input() nonSelectedAreas : multipleSelectorModel[] = [];
  @Input() groups:GroupDto[]=[];
  // @Input()
  // photoPreview: photoDTO[]=[];
  // nonSelectedGenres: multipleSelectorModel[] = [
  //   {key:1,value:"Drama"},
  //   {key:2,value:"Action"},
  //   {key:3,value:"Comedy"}
  // ];
  // allTags:string[]=[
  //   'Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'
  // ]
  date : any;
  constructor(private formBuilder : FormBuilder) { }
  form : FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullName:['',{
        validators :[Validators.required]
      }],
      dateOfBirth:'',
      bio:'',
      pictureUrl:'',
      typeIds: '',
      areaIds:'',
    })
    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }
  onChangeMultiple(event){
    this.selectedTypes = [];
   
    for(let item of event){
        this.selectedTypes.push({key:item.id,value:item.name});
    }
  }
 
  onChageSelectedMultiDropdown(event){
    this.selectedAreas = [];
    this.selectedAreas = event;
  }
  changeMarkdown(bio:string){
    this.form.get('bio').setValue(bio);
  }
  onUploadImage(images:any){   
    this.form.get('pictureUrl').setValue(images);
  }
  saveChanges(){
    const typeIds = this.selectedTypes.map(value => value.key);
    this.form.get('typeIds').setValue(typeIds);
    const areaIds = this.selectedAreas.map(value => value.key);
    this.form.get('areaIds').setValue(areaIds);
    this.onSaveChanges.emit(this.form.value);
  }

}
