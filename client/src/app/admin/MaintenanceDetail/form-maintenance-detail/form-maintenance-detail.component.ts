import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeDto } from 'src/app/utilities/multiple-selector-group/multiple-group.model';
import { v4 as uuidv4 } from 'uuid';
import { MaintenanceDetailGroup } from '../maintenance-detail.model';
@Component({
  selector: 'app-form-maintenance-detail',
  templateUrl: './form-maintenance-detail.component.html',
  styleUrls: ['./form-maintenance-detail.component.css']
})
export class FormMaintenanceDetailComponent implements OnInit,OnChanges{
  @Input() nonSelectedTypes : any[];
  @Input() model : MaintenanceDetailGroup[];
  @Output() onSaveChanges = new EventEmitter<any>();
  @Output() onTypeChanges = new EventEmitter<number>();
  selectedTypes : Partial<TypeDto> = {};
  AddRootChild:boolean = true;
  form : FormGroup;
  constructor(private fb : FormBuilder) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.model !== undefined){
      // this.form.patchValue(this.model);
      this.model.filter(m => m.parentId==='').forEach(element => {
        this.addRootDetailWithModel(element);
      });
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      technicianTypeId : '',
      uuId:uuidv4(),
      parentId:'',
      detail: '',
      subDetail : this.fb.array([
        // this.initSubDetail()
      ])
    });
    // this.form.setControl('detail', this.fb.array([{parentId:1,detail:'test'}]));
    if(this.selectedTypes === null)this.AddRootChild = true;
    
  }

  initRootSubDetail(){
  return this.fb.group({
      technicianTypeId:this.selectedTypes.id,
      uuId:uuidv4(),
      parentId:'',
      detail:['',Validators.required],
      subDetail:this.fb.array([])
    })
  }
  initSubDetail(item:MaintenanceDetailGroup)
  {
      return this.fb.group({
        technicianTypeId:item.technicianTypeId,
        uuId:item.uuId,
        parentId:item.parentId,
        detail:item.details,
        subDetail:this.fb.array([])
      })
  }
  addRootDetail(){
    const control = <FormArray>this.form.controls['subDetail'];
    control.push(this.initRootSubDetail());
  }
  addRootDetailWithModel(item:MaintenanceDetailGroup){
    const control = <FormArray>this.form.controls['subDetail'];
    control.push(this.initSubDetail(item));
    const index = (<FormArray>this.form.get('subDetail')).controls
    .findIndex(x => x.value.uuId === item.uuId);
    this.addChild(control.controls[index]);
  }
  addChild(control){
    let child = this.model.filter(x => x.parentId === control.get('uuId').value);
    if(child.length > 0){
        let subDetail = control.get('subDetail') as FormArray;
        child.forEach(item =>{
          subDetail.push(this.initSubDetail(item));
          const index = (<FormArray>control.get('subDetail')).controls
          .findIndex(x => x.value.uuId === item.uuId);
          this.addChild(subDetail.controls[index])
        })
    }
  }
  addSubDetail(item?:MaintenanceDetailGroup){
    const control = <FormArray>this.form.controls['subDetail'];
    // let controls = this.form.get('subDetail') as FormArray;
    control.push(this.initSubDetail(item));
    const subDetail = (<FormArray>this.form.get('subDetail')).controls
                            .findIndex(x => x.value.uuId === item.uuId);

    
  }
  onChange(event){
    this.selectedTypes = event;
    this.onTypeChanges.emit(this.selectedTypes.id);
    // if(this.model !== undefined || this.model == null){
    //   console.log(this.model)
    // }
    // if(this.selectedTypes != null){
    //   this.AddRootChild = true;
    //   this.removeSubDetail();
    //   this.form.get('technicianTypeId').setValue(this.selectedTypes.id);
    //   // this.initSubDetail();
    //   this.addRootDetail();
    // }
    this.removeAllArray();
    this.form.get('technicianTypeId').setValue(this.selectedTypes.id);
  }
  removeAllArray(){
    const control = this.form.get('subDetail') as FormArray
    control.clear();
  }
  save() {
    console.log(this.form.value)
    this.onSaveChanges.emit(this.form.value);
  }
}
