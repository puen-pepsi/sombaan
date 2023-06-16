import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnicianService } from 'src/app/technician/technician.service';
import { TypeDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';

@Component({
  selector: 'app-edit-maintenance-detail',
  templateUrl: './edit-maintenance-detail.component.html',
  styleUrls: ['./edit-maintenance-detail.component.css']
})
export class EditMaintenanceDetailComponent implements OnInit {
  nonSelectedTypes : any[];
  selectedTypes : Partial<TypeDto> = {};
  public form : FormGroup;
  AddRootChild:boolean = false;
  constructor(private fb : FormBuilder,
              private technicianService :TechnicianService) { }
  get subDetails(){
    return this.form.get('subDetail') as FormArray;
  }
  ngOnInit(): void {
    this.technicianService.getCategory().subscribe( res =>{
      this.nonSelectedTypes = res;
    })
  }
  addRootDetail(){
    const control = <FormArray>this.form.controls['subDetail'];
    control.push(this.initSubDetail());
  }
  initSubDetail(){
    return this.fb.group({
      technicianTypeId:this.selectedTypes.id,
      uuId:'',
      parentId:'',
      detail:['',Validators.required],
      subDetail:this.fb.array([])
    })
  }
  onChange(event){
    this.selectedTypes = event;
    if(this.selectedTypes != null){
      this.AddRootChild = true;
      this.form.get('technicianTypeId').setValue(this.selectedTypes.id);
      // this.initSubDetail();
      this.addRootDetail();
    }
  }
  save(form) {
    console.log(form.value)
    
  }
}
