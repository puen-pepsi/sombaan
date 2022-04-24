import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechnicianDto } from '../technician.model';
import { TechnicianService } from '../technician.service';

@Component({
  selector: 'app-technician-details',
  templateUrl: './technician-details.component.html',
  styleUrls: ['./technician-details.component.css']
})
export class TechnicianDetailsComponent implements OnInit {
  technician : TechnicianDto;
  constructor(private techinicianService : TechnicianService,
              private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      this.technician = data['technicianDetail'];
    })
  }

}
