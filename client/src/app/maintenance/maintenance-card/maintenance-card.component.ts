import { Component, Input, OnInit } from '@angular/core';
import { TechnicianService } from 'src/app/technician/technician.service';
import { MaintenanceDetailsDto, MaintenanceDto } from '../maintenance.model';

@Component({
  selector: 'app-maintenance-card',
  templateUrl: './maintenance-card.component.html',
  styleUrls: ['./maintenance-card.component.css']
})
export class MaintenanceCardComponent implements OnInit {
  @Input()
  maintenance : MaintenanceDetailsDto;
  imageObject:Array<Object>=[];
  imageWidth:"{width: '100%', height: '20%'}";
  constructor() { }
  // longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  // from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  // originally bred for hunting.`;
  ngOnInit(): void {
    this.getImages(this.maintenance.pictures);
  }
  getImages(photos:any){
    photos.forEach(item => {
      var temp = {image:item.pictureUrl,thumbImage:item.pictureUrl}
       this.imageObject.push(temp)
    });
    // this.imageWidth = "{width: '100%', height: '20%'}";
  }
}
