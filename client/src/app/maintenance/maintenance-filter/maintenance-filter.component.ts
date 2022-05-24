import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupDto, TypeDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';

@Component({
  selector: 'app-maintenance-filter',
  templateUrl: './maintenance-filter.component.html',
  styleUrls: ['./maintenance-filter.component.css']
})
export class MaintenanceFilterComponent implements OnInit {
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
    this.submitfilterform.emit(this.form.value);
  }

}
