import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { MaintenanceCreateDto, multipleSelectorModelWithDetail } from '../maintenance.model';
import { MaintenanceService } from '../maintenance.service';
import { MaintenanceDetailService } from 'src/app/admin/MaintenanceDetail/maintenance-detail.service';
import { TypeDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { MaintenanceDetailGroup } from 'src/app/admin/MaintenanceDetail/maintenance-detail.model';

@Component({
  selector: 'app-create-maintenance',
  templateUrl: './create-maintenance.component.html',
  styleUrls: ['./create-maintenance.component.css']
})
export class CreateMaintenanceComponent implements OnInit {
  selectedTypes : TypeDto;
  selectedDetailTypes:multipleSelectorModel;
  nonSelectedTypes : any[];
  nonSelectedAreas : multipleSelectorModel[];
  selectedAreas : multipleSelectorModel[];
  nonSelectedDetailTypes:multipleSelectorModelWithDetail[];
  nonSelectedDetailTypesDisplay:multipleSelectorModel[];
  selectedList : MaintenanceDetailGroup[] = [];
  price:number;
  DetailGroup : MaintenanceDetailGroup[];
  constructor(
              private maintenanceService:MaintenanceService,
              private maintenanceDetailService:MaintenanceDetailService,
              private route : Router) { }

  ngOnInit(): void {
    this.maintenanceService.postget().subscribe(res => {
      this.nonSelectedAreas = res.areas.map(area => {
        return <multipleSelectorModel>{key:area.id,value:area.name}
      });
      this.nonSelectedTypes = res.groupTypes;
      this.selectedTypes ={id: null, name: ''};
    });
   
  }
  onTypeChange(event:TypeDto){
    this.maintenanceDetailService.getMaintenanceDetail(event.id).subscribe(res => {
      this.DetailGroup = res;
      this.detailGroupfilter(null);
      this.selectedTypes=event;
      this.selectedList =[];
      this.price=null;
    });
  }
  onDetailChange(event){
     this.selectedDetailTypes = {key:event,value:null};
     this.detailGroupfilter(event)
  }
  detailGroupfilter(id:number){
    let display;
    if(id === null){
      const param = '';
      display = this.DetailGroup.filter( d => d.parentId === param);
    }else{
      let index = this.DetailGroup.findIndex(x => x.id === id)
      display = this.DetailGroup.filter(d => d.parentId === this.DetailGroup[index].uuId);
    }
    this.nonSelectedDetailTypes = display.map(res => {
      return <multipleSelectorModel>{key:res.id,value:res.details,price:res.price};
    })
  }
 onSelected(event){
    this.selectedList = [];
    this.price = null;
    let select = this.DetailGroup.find(x => x.id === event);
    this.price = select.price;
      this.selectedList.push(select);
      let parent = select;
      while (parent.parentId != '') {
        parent = this.DetailGroup.find(c => c.uuId === parent.parentId);
        this.selectedList.push(parent)
      }
      this.selectedList.reverse();
      this.nonSelectedDetailTypes = [];

 }
 saveChanges(maintenanceCreateDto : MaintenanceCreateDto){
      this.maintenanceService.create(maintenanceCreateDto).subscribe(()=>{
        this.route.navigate(['']);
      })
    }
}
