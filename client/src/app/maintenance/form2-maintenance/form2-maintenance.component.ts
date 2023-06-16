import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { GroupDto, TypeDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { multipleSelectorModelWithDetail } from '../maintenance.model';
import { MaintenanceDetailGroup } from 'src/app/admin/MaintenanceDetail/maintenance-detail.model';

@Component({
  selector: 'app-form2-maintenance',
  templateUrl: './form2-maintenance.component.html',
  styleUrls: ['./form2-maintenance.component.css'],
})
export class Form2MaintenanceComponent implements OnInit,OnChanges {
  @Input() selectedTypes: TypeDto;
  @Input() nonSelectedTypes : GroupDto[] = [];
  @Input() selectedDetailTypes:multipleSelectorModel;
  @Input() nonSelectedDetailTypes :multipleSelectorModelWithDetail[];
  @Input() selectList:MaintenanceDetailGroup[];
  @Input() selectPrice:number;
  @Output() onSelectedTypeChange = new EventEmitter<TypeDto>();
  @Output() onSelectedDetailChange = new EventEmitter<any>();
  @Output() onSelected = new EventEmitter<number>();
  form:FormGroup;
  constructor(private fb :FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.nonSelectedDetailTypes && this.nonSelectedDetailTypes.length > 0){
      this.adddetailArray();
    }
    if(this.selectedTypes != undefined ){
      this.form.get('technicianTypeId').setValue(this.selectedTypes.id);
      this.form.get('price').setValue(this.selectPrice);

    }
      
    if(this.selectedDetailTypes != undefined){
      this.form.get('detailId').setValue(this.selectedDetailTypes.key)
    }
    if(this.selectPrice != undefined){
      this.form.get('price').setValue(this.selectPrice);
    }
    //#region changes
    // if(  changes['selectedTypes'].previousValue !== undefined && 
    //     (changes['selectedTypes'].previousValue !== changes['selectedTypes'].currentValue)){
    //   this.clearDetailList();
    // }
    // this.adddetailArray(changes['nonSelectedDetailTypes'].currentValue);
    //#endregion
  }
  get detailType(){
    return this.form.controls["detailArray"] as FormArray;
  }

  // detailPrice(i:number){
  //   return this.detailType.controls[i].get("price") as FormControl;
  // }
  // get detailList() {
  //   return (this.form.get('detailArray') as FormArray).controls;
  // }
  ngOnInit(): void {
    this.form = this.fb.group({
        technicianTypeId:'',
        detailId:'',
        price:'',
        detailArray:this.fb.array([])
    });
  }
  initialDetailArray(){
    return this.fb.group({
      detailId:'',
      price:'',
      detailList:this.fb.array(this.nonSelectedDetailTypes)
    });
  }
  onChange(event){
    this.clearDetailList();
    this.onSelectedTypeChange.emit(event);
  }
  onSelectChange(event,i,detail:FormGroup){
    detail.get("price").setValue(detail.get('detailList').value.find(x => x.key === event).price);
    if(i < this.detailType.length-1)this.removeDetailList(i);
    this.onSelectedDetailChange.emit(event);
  }
  adddetailArray(){
    this.detailType.push(this.initialDetailArray());
  }
  removeDetailList(index:number){
    for(let i= this.detailType.length-1; i > index;i--)
    {
      this.detailType.removeAt(i);
    }
  }
  clearDetailList(){
    this.detailType.clear();
  }
  select(event){
    //remove controls
    this.clearDetailList();
    this.onSelected.emit(event);
    
  }
  reset(){
    this.selectedTypes = {id:null,name:null};
    this.clearDetailList();
    // this.nonSelectedDetailTypes = [];
    this.form.reset();
    this.selectList = [];
  }
}
