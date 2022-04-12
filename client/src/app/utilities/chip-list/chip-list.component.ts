import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChipListComponent  {
  @Input() chiplist:any[];
  @Input() prefix?:string;
  @Input() minHeight:number;
  @Input() fontSize:number;
  constructor() { }

}
