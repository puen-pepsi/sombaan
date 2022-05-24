import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { areaDto } from 'src/app/admin/area/areas.model';
import { GroupDto, TypeDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { TechnicianService } from '../technician.service';

@Component({
  selector: 'app-technician-filter',
  templateUrl: './technician-filter.component.html',
  styleUrls: ['./technician-filter.component.css']
})
export class TechnicianFilterComponent implements OnInit {
  @Output() submitfilterform = new EventEmitter<any>();
  @Output() reset = new EventEmitter();
  @ViewChild('search',{static:true}) seachTerm:ElementRef;
  @Input() selectedTypes: TypeDto[] = [];
  @Input() nonSelectedTypes : GroupDto[] = [];
  @Input() selectedAreas: number;
  @Input() nonSelectedAreas: multipleSelectorModel[]=[];
  constructor(private formbuilder : FormBuilder) { }
  form : FormGroup;
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      search:'',
      types:'',
      areas:''
    })
  }

  onTypeChange(event){
   
  }
  onChangeMultiple(event){
    this.selectedTypes = [];
    this.selectedTypes = event;
    console.log(this.selectedTypes)
  }
  // onAreaChange(event){
  //   this.selectedAreas = [];
  //   this.selectedAreas = event;
  // }
  onSearch(event){
    // this.search.emit(event.target.value)
  }
  resetFilter(){
    this.form.reset();
    this.selectedAreas=0;
    this.selectedTypes=[];
    this.seachTerm.nativeElement.value='';
    this.reset.emit();
  }
  saveChanges(){
    if(this.selectedTypes.length > 0){
      const types = this.selectedTypes.map(value => value.id)
      this.form.get('types').setValue(types);
    }
    // if(this.selectedAreas.length > 0){
    //   const areas = this.selectedAreas.map(value => value.key)
    //   this.form.get('areas').setValue(areas);
    // }
    this.submitfilterform.emit(this.form.value);
  }
}
