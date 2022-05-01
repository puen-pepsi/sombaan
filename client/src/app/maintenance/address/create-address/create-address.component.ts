import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { AddressCreateDto, DistrictDto } from '../address.model';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-create-address',
  templateUrl: './create-address.component.html',
  styleUrls: ['./create-address.component.css']
})
export class CreateAddressComponent implements OnInit {
  ProvinceList : multipleSelectorModel[];
  AmphureList :multipleSelectorModel[];
  DistrictList :DistrictDto[];
  model :AddressCreateDto;
  constructor(private addressService:AddressService,
              private route:Router) { }

  ngOnInit(): void {
    this.addressService.getProvince().subscribe( res =>{
      this.ProvinceList = res.map(p => {
        return <multipleSelectorModel>{key:p.id,value:p.name}
      });

    })
  }
  getAmphureByProvince(id:number){
		this.addressService.getAmphure(id).subscribe(res=> {
      this.AmphureList = res.map(res => {
        return <multipleSelectorModel>{key:res.id,value:res.name}
      });
		});
  }
  getDistrictByAmphure(id:number){
    this.addressService.getDistrict(id).subscribe(res=> {
      this.DistrictList = res.map(res => {
        return <DistrictDto>{key:res.id,value:res.name,zipCode:res.zipCode}
      });
		});
  }
  saveChange(addressCreateDto:AddressCreateDto){
    console.log(addressCreateDto)
    this.addressService.create(addressCreateDto).subscribe(()=>{
      this.route.navigate(['']);
    })
  }

}
