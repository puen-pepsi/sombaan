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
  bioText = `Text Form sombaan`;
  ngOnInit(): void {
    // console.log(this.technician)

  }

}
