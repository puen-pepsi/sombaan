import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { areaDto } from 'src/app/admin/area/areas.model';
import { TypeDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { TechnicianService } from '../technician.service';

@Component({
  selector: 'app-technician-filter',
  templateUrl: './technician-filter.component.html',
  styleUrls: ['./technician-filter.component.css']
})
export class TechnicianFilterComponent implements OnInit {
  @Output() type = new EventEmitter<number>();
  @Output() area = new EventEmitter<number>();
  @Output() search = new EventEmitter<string>();
  @Output() reset = new EventEmitter();
  @ViewChild('search',{static:true}) seachTerm:ElementRef;
  constructor(private formbuilder : FormBuilder,
              private technicianService:TechnicianService) { }
  form : FormGroup;
  types : TypeDto[];
  areas : areaDto[];
  ngOnInit(): void {
    this.form = this.formbuilder.group({
      search:'',
      type:0,
      area:0,
    })
  }
  onTypeChange(event){
    this.type.emit(event.value);
  }

  onAreaChange(event){
    this.area.emit(event.value);
  }
  onSearch(event){
    this.search.emit(event.target.value)
  }
  resetFilter(){
    this.seachTerm.nativeElement.value='';
    this.reset.emit();
  }
}
