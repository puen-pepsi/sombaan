import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from 'src/app/utilities/rating.service';
import Swal from 'sweetalert2';
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
              private ratingsService:RatingService,
              private route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      this.technician = data['technicianDetail'];
    })
    console.log(this.technician)
  }
  onRating(rate: number){
    this.ratingsService.rate(this.technician.id, rate).subscribe(() => {
      // this.technician.userVote = rate;
      Swal.fire("Success", "Your vote has been received", "success");
    });
  }
}
