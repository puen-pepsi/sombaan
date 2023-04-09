import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { addonCustomerDto } from '../addons.model';

@Component({
  selector: 'app-addon-autocomplete',
  templateUrl: './addon-autocomplete.component.html',
  styleUrls: ['./addon-autocomplete.component.css']
})
export class AddonAutocompleteComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;

  control : FormControl = new FormControl();
  @Input()
  selectedAddonCustomer: addonCustomerDto[] = [];

  addonCustomerToDisplay: addonCustomerDto[] = [];
  columnsToDisplay = ['name', 'descriptions', 'price', 'actions']
  constructor() { }
  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => {
      // this.actorsService.searchByName(value).subscribe(actors => {
      //   this.actorsToDisplay = actors;
      // });
    })
  }
  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);

    this.control.patchValue('');

    if (this.selectedAddonCustomer.findIndex(x => x.id == event.option.value.id) !== -1){
      return;
    }

    this.selectedAddonCustomer.push(event.option.value);
    if (this.table !== undefined){
      this.table.renderRows();
    }
  }
  remove(addon){
    const index = this.selectedAddonCustomer.findIndex(a => a.name === addon.name);
    this.selectedAddonCustomer.splice(index, 1);
    this.table.renderRows();
  }
  dropped(event: CdkDragDrop<any[]>){
    const previousIndex = this.selectedAddonCustomer.findIndex(actor => actor === event.item.data);
    moveItemInArray(this.selectedAddonCustomer, previousIndex, event.currentIndex);
    this.table.renderRows();
  }
}
