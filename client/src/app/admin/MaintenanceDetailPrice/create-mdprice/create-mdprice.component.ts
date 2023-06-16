import { Component, OnInit } from '@angular/core';
import { MaintenanceDetailGroup, MaintenanceDetailsCreateDto, MaintenanceDetailsCreatePriceDto } from '../../MaintenanceDetail/maintenance-detail.model';
import { TechnicianService } from 'src/app/technician/technician.service';
import { MaintenanceDetailService } from '../../MaintenanceDetail/maintenance-detail.service';

@Component({
  selector: 'app-create-mdprice',
  templateUrl: './create-mdprice.component.html',
  styleUrls: ['./create-mdprice.component.css']
})
export class CreateMdpriceComponent implements OnInit {
  model : MaintenanceDetailGroup[];
  nonSelectedTypes : any[];
  constructor(private technicianService :TechnicianService,
              private maintenanceDetailService:MaintenanceDetailService) { }

  ngOnInit(): void {
    this.technicianService.getCategory().subscribe( res =>{
      this.nonSelectedTypes = res;
    });
  }
  onSave(event:MaintenanceDetailsCreatePriceDto){
    this.maintenanceDetailService.createPrice(event).subscribe(()=>{
      console.log()
    });
  }
  onChanges(id:number){
    this.maintenanceDetailService.getMaintenanceDetail(id).subscribe(res => {
      this.model = res;
    });
  }
}
