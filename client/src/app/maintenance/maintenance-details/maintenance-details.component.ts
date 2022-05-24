import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaintenanceDetailsDto } from '../maintenance.model';
import { MaintenanceService } from '../maintenance.service';

@Component({
  selector: 'app-maintenance-details',
  templateUrl: './maintenance-details.component.html',
  styleUrls: ['./maintenance-details.component.css']
})
export class MaintenanceDetailsComponent implements OnInit {
  @Input()
  maintenance : MaintenanceDetailsDto;
  imageObject:Array<Object>=[];
  imageWidth:"{width: '100%', height: '20%'}";

  constructor(private maintenanceService:MaintenanceService,
              private activeRoute : ActivatedRoute) { }
  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.maintenanceService.getById(params["id"]).subscribe(res => {
          this.maintenance = res;
          this.getImages(this.maintenance.pictures);
          console.log(this.maintenance)
      });
    });
  }
  getImages(photos:any){
    photos.forEach(item => {
      var temp = {image:item.pictureUrl,thumbImage:item.pictureUrl}
       this.imageObject.push(temp)
    });
    // this.imageWidth = "{width: '100%', height: '20%'}";
    console.log(this.imageObject)
  } 
  cancel(id:number){
    console.log(id)
    this.maintenanceService.delete(id).subscribe( () => {});
  }
}
