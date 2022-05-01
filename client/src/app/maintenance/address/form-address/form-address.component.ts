import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { TechnicianDetailedResolver } from 'src/app/_resolvers/technician-detailed.resolver';
import { AddressCreateDto, DistrictDto } from '../address.model';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.css']
})
export class FormAddressComponent implements OnInit {
  @Output() onSaveChange = new EventEmitter<AddressCreateDto>();
  @Output() onProvinceSelected = new EventEmitter<number>();
  @Output() onAmphureSelected = new EventEmitter<number>();
  @Output() onDistrictSelected = new EventEmitter<number>();
  @Input()
  ProvinceList:  multipleSelectorModel []= [];
  @Input()
	AmphureList: multipleSelectorModel[]=[];
  @Input()
	DistrictList: multipleSelectorModel[] = [];
  @Input()
  model : AddressCreateDto;
  form : FormGroup;
  constructor(private formBuilder : FormBuilder,
              private addressService:AddressService) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      addressAt:['',{
        validators :[Validators.required]
      }],
      subdistrict:['',{
        Validators :[Validators.required]
      }],
      district:['',{
        Validators :[Validators.required]
      }],
      province:['',{
        Validators :[Validators.required]
      }],
      postcode:['',{
        Validators:[Validators.required]
      }]
    

    })
    if (this.model !== undefined){
      console.log(this.model)
      this.form.patchValue(this.model);
    }

  }
  onProvinceChange(value:multipleSelectorModel){
    this.form.get('province').setValue(value.value);
    this.onProvinceSelected.emit(value.key);
  }
  onAmphureChange(value:multipleSelectorModel){
    this.form.get('district').setValue(value.value);
    this.onAmphureSelected.emit(value.key);
  }
  onSubDistrictChange(value:DistrictDto){
    this.form.get('subdistrict').setValue(value.value);
    this.form.get('postcode').setValue(value.zipCode);
    this.onDistrictSelected.emit(value.key);
  }
  saveChanges(){
      this.onSaveChange.emit(this.form.value);
  }
}
