import { Component, Input, OnInit } from '@angular/core';
import { TechnicianDto } from 'src/app/technician/technician.model';
import { TechnicianService } from 'src/app/technician/technician.service';

@Component({
  selector: 'app-matchtechnician-card',
  templateUrl: './matchtechnician-card.component.html',
  styleUrls: ['./matchtechnician-card.component.css']
})
export class MatchtechnicianCardComponent implements OnInit {
  @Input() technicianId:number;
  technician : TechnicianDto;
  constructor(private technicianService:TechnicianService) { }

  ngOnInit(): void {
    console.log(this.technicianId)
    this.technicianService.getTechnician(this.technicianId).subscribe(res=>{
       this.technician = res;
    });
  }

}
