import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-detail-type-array2',
  templateUrl: './detail-type-array2.component.html',
  styleUrls: ['./detail-type-array2.component.css']
})
export class DetailTypeArray2Component implements OnInit {
  @Input() parent : FormGroup;
  constructor(private fb : FormBuilder) { }

  get details(){
    return this.parent.get('subDetail') as FormArray
  }

  ngOnInit(): void {
    this.parent.get('detail')
          .valueChanges.subscribe(value => console.log(value));
  }
  initSubDetail(detail){
    return this.fb.group({
      technicianTypeId:detail.controls.technicianTypeId,
      uuId:uuidv4(),
      parentId:detail.controls.uuId,
      detail: ['', Validators.required],
      subDetail:this.fb.array([])
    })
  }
  addChild(detail){
    // this.add.emit(detail);
    const control = <FormArray>detail.controls.subDetail;
    control.push(this.initSubDetail(detail));
  }
  onRemove(index) {
      const control = this.parent.get('subDetail') as FormArray
      control.removeAt(index);
  }
}
