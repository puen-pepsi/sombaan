import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-label-name',
  templateUrl: './label-name.component.html',
  styleUrls: ['./label-name.component.css']
})
export class LabelNameComponent implements OnInit {
  @Input('imageUrl') imageUrl:string;
  @Input('userName') userName:string;
  @Output() username = new EventEmitter();
  bShadow :string="#ffffff";
  //setHeight :string= '40px';
  border:number;
  tooltip:string;
  role:string[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
