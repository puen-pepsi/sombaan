import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupDto, TypeDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { TechnicianCreateDto, TechnicianDto } from '../technician.model';

@Component({
  selector: 'app-form-technician',
  templateUrl: './form-technician.component.html',
  styleUrls: ['./form-technician.component.css']
})
export class FormTechnicianComponent implements OnInit {
  @Output()  onSaveChanges = new EventEmitter<TechnicianCreateDto>();
  @Input() model: TechnicianDto;
  @Input() selectedTypes: TypeDto[] = [];
  @Input() nonSelectedTypes : GroupDto[] = [];
  @Input() selectedAreas: multipleSelectorModel[] = [];
      // = [{ "key": 2, "value": "ลาดพร้าว" }, { "key": 4, "value": "ห้วยขวาง" } ];
  @Input() nonSelectedAreas : multipleSelectorModel[] = [];
  // @Input() groups:GroupDto[]=[];
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
  minDate: Date;
  maxDate: Date;

  phoneNumberReg = /((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))/;
  constructor(private formBuilder : FormBuilder) { 
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 80, 0, 1);
    this.maxDate = new Date(currentYear - 15, 11, 31);
  }
  form : FormGroup;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullName:['',{
        validators :[Validators.required]
      }],
      dateOfBirth:'',
      phoneNumber:['',{
        validators:[Validators.required,
          Validators.pattern(this.phoneNumberReg)]
      }],
      lineId:'',
      bio:'',
      pictureUrl:'',
      typeIds: '',
      areaIds:'',
    })
    if (this.model !== undefined){
      this.form.patchValue(this.model);
    }
  }
  onChangeMultiple(event:TypeDto[]){
    this.selectedTypes = [];
    this.selectedTypes = event;
    // console.log(this.selectedTypes)
  }
 
  onChageSelectedMultiDropdown(event : multipleSelectorModel[]){
    this.selectedAreas = [];
    
    for(let item of event)
    {
      this.selectedAreas.push({key:item.key,value:item.value})
    }
  }
  changeMarkdown(bio:string){
    this.form.get('bio').setValue(bio);
  }
  onUploadImage(images:any){   
    this.form.get('pictureUrl').setValue(images);
  }
  saveChanges(){
    const typeIds = this.selectedTypes.map(value => value.id);
    this.form.get('typeIds').setValue(typeIds);
    const areaIds = this.selectedAreas.map(value => value.key);
    this.form.get('areaIds').setValue(areaIds);
    this.onSaveChanges.emit(this.form.value);
  }

}
