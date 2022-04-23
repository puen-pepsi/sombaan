import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { toBase64 } from '../utils';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent  {
  @Input() @HostBinding("class.child-image") public isImage = true;
  @Input() 
    urlCurrentImage:string;
  @Output()
  onImageSelected = new EventEmitter<File>();

  constructor() { }
  imageBase64 : string;
  change(event){
    if (event.target.files.length > 0){
      const file: File = event.target.files[0];
      toBase64(file).then((value: string) => this.imageBase64 = value);
      this.onImageSelected.emit(file);
      this.urlCurrentImage = null;
    }
  }
}
