import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { multipleSelectorModel } from '../multiple-selector/multiple-selector.model';

@Component({
  selector: 'app-selector-dropdown',
  templateUrl: './selector-dropdown.component.html',
  styleUrls: ['./selector-dropdown.component.css']
})
export class SelectorDropdownComponent implements OnInit {
  @Output() onChangeSelectItems = new EventEmitter<any>();

  @Input() groups:any;
  @Input() placeHolder:string;
  @Input() SelectedItems : multipleSelectorModel[];
  //  = {key: 2, value: 'ลาดพร้าว'};
  constructor() { }

  ngOnInit(): void {
  }
  onChange(){
    this.onChangeSelectItems.emit(this.SelectedItems);
  }
  comparer(o1: any, o2: any): boolean {
    // if possible compare by object's name, and not by reference.
    return o1 && o2 ? o1.value === o2.value : o2 === o2;
  }
}
