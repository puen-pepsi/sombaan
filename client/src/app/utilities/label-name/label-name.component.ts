import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-label-name',
  templateUrl: './label-name.component.html',
  styleUrls: ['./label-name.component.css']
})
export class LabelNameComponent implements OnInit {
  @Input('imageUrl') imageUrl:string;
  @Input('knownAs') knownAs:string;
  @Input('userName') userName:string;
  @Input('pHeight') pHeight:number;
  @Input('point') point:number;
  @Input('title') title:string;
  @Output() username = new EventEmitter();
  bShadow :string="#ffffff";
  //setHeight :string= '40px';
  rank:string;
  border:number;
  tooltip:string;
  role:string[]=[];
  isVIP:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
