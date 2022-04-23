import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { multipleSelectorModel } from '../multiple-selector/multiple-selector.model';

@Component({
  selector: 'app-multiple-selector-dropdown',
  templateUrl: './multiple-selector-dropdown.component.html',
  styleUrls: ['./multiple-selector-dropdown.component.css']
})
export class MultipleSelectorDropdownComponent implements OnInit {
  @Output() onChangeSelectItems = new EventEmitter<any>();

  @Input() groups:any;
  @Input() placeHolder:string;
  @Input() SelectedItems : any[];
  constructor() { }

  ngOnInit(): void {
  }
  onChange(event : MatSelectChange){
    this.onChangeSelectItems.emit(event.value);
  }
  selectAll(select: NgModel) {
    let values: any[] = []; // array which will contain all values

    // loop through all groups and add their items' values to the array
    for(let group of this.groups){
        values.push(group);
    }
    // submit the array with all values
    select.update.emit(values);
  }

  deselectAll(select: NgModel) {
    select.update.emit([]);
  }
  comparer(o1: any, o2: any): boolean {
    // if possible compare by object's name, and not by reference.
    return o1 && o2 ? o1.value === o2.value : o2 === o2;
  }
}
