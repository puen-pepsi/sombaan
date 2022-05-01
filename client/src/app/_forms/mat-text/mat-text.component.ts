import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-mat-text',
  templateUrl: './mat-text.component.html',
  styleUrls: ['./mat-text.component.css']
})
export class MatTextComponent implements  ControlValueAccessor {
  @Input() label:string;
  @Input() type='text'
  constructor(@Self() public ngControl:NgControl ) { 
    this.ngControl.valueAccessor = this;
  }
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }


}
