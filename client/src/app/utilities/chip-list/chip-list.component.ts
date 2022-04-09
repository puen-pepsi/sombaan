import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.css']
})
export class ChipListComponent  {
  @Input() chiplist:any[];
  @Input() prefix?:string;
  constructor() { }

}
