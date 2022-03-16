import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { multipleSelectorModel } from '../multiple-selector/multiple-selector.model';


@Component({
  selector: 'app-tag-autocomplete',
  templateUrl: './tag-autocomplete.component.html',
  styleUrls: ['./tag-autocomplete.component.css']
})
export class TagAutocompleteComponent implements OnInit {
  @Input()
    SelectedTags: string[] = [];
  @Input()
    AllTags:string[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredtags: Observable<string[]>;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  constructor() { 
    this.filteredtags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.AllTags.slice())),
    );
  }

  ngOnInit(): void {
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim().toLowerCase();
    // console.log(value)
    if(!(this.SelectedTags.includes(value))){
      // Add our fruit
      if (value) {
        this.SelectedTags.push(value);
      }
      
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }
  remove(tag: string): void {
    const index = this.SelectedTags.indexOf(tag);

    if (index >= 0) {
      this.SelectedTags.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    // console.log(event.option.viewValue)
    if(!(this.SelectedTags.includes(event.option.viewValue))){
      this.SelectedTags.push(event.option.viewValue);
    }
    
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.AllTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }
}
