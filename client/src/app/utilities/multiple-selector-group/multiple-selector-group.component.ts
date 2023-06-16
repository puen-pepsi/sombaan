import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
// import { MatSelect, MatSelectChange } from '@angular/material/select';
// import { multipleSelectorModel } from '../multiple-selector/multiple-selector.model';
import { GroupDto } from './multiple-group.model';

@Component({
  selector: 'app-multiple-selector-group',
  templateUrl: './multiple-selector-group.component.html',
  styleUrls: ['./multiple-selector-group.component.css']
})
export class MultipleSelectorGroupComponent {
  @Output() onChangeSelectItems = new EventEmitter<any>();
  @Input() groups:GroupDto[];
  @Input() SelectedItems : any[];
  @Input() getRequired:boolean = true;
  @Input() MultiSelect:boolean = true;
  @Input() placeHolder:string = "Skill"
  // @Input() SelectedItems:multipleSelectorModel[]=[];
  // modelGroup =[{ "id": 3, "name": "เดินไฟฟ้า", "categoryId": 2 }]; // the selected values
  constructor() { }

  selectAll(select: NgModel) {
    
    let values: any[] = []; // array which will contain all values
    // this.SelectedItems = [];
    // loop through all groups and add their items' values to the array
    for(let group of this.groups){
      for(let type of group.types){
        values.push(type);
        // this.SelectedItems.push({key:type.id,value:type.name});
      }
    }
    // submit the array with all values
    select.update.emit(values);
    // console.log(this.SelectedItems)
  }

  deselectAll(select: NgModel) {
    select.update.emit([]);
    // this.onChangeSelectItems.emit(null);
  }
  // onChange(event: MatSelectChange) {
  //    this.onChangeSelectItems.emit(event.value);
  // }
  ngModelChange(event){
    this.onChangeSelectItems.emit(event);
  }
  // getAllTypes(){
  //   this.allTypes = [];
  //   for(let group of this.groups){
  //     for(let type of group.types){
  //       if(this.modelGroup.includes(type.id)){
  //           this.allTypes.push(type);
  //       }
  //     }
  //   }
  // }
  comparer(o1: any, o2: any): boolean {
    // if possible compare by object's name, and not by reference.
    return o1 && o2 ? o1.name === o2.name : o2 === o2;
  }
}
