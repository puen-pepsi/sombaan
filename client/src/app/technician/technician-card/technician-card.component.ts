import { Component, Input, OnInit } from '@angular/core';
import { TechnicianDto } from '../technician.model';

@Component({
  selector: 'app-technician-card',
  templateUrl: './technician-card.component.html',
  styleUrls: ['./technician-card.component.css']
})
export class TechnicianCardComponent implements OnInit {
  @Input() technician : TechnicianDto;
  constructor() { }
  panelOpenState = false;
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  ngOnInit(): void {
    // console.log(this.technician)

  }

}
