import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-type',
  templateUrl: './detail-type.component.html',
  styleUrls: ['./detail-type.component.css']
})
export class DetailTypeComponent implements OnInit {
@Input() 
parent:FormGroup;

@Output()
removed = new EventEmitter<any>();

@Output()
add = new EventEmitter<any>();
  constructor(private fb :FormBuilder) { }

  ngOnInit(): void {

  }
  get details() {
    return this.parent.get('subDetail') as FormArray;
  }

  onRemove(group) {
    const control = this.parent.get('subDetail') as FormArray;
    control.removeAt(group);
  }
  initSubDetail(){
    return this.fb.group({
      detail: ['', Validators.required],
      subDetail:this.fb.array([])
    })
  }
  addChild(detail){
    console.log(detail)
    // this.add.emit(group);
    const control = <FormArray>detail.controls.subDetail;
    control.push(this.initSubDetail());
    console.log(detail)
  }

}
