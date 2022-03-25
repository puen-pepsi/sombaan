import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input-multi-img',
  templateUrl: './input-multi-img.component.html',
  styleUrls: ['./input-multi-img.component.css']
})
export class InputMultiImgComponent implements OnInit {
  @Output()
  onUploadImage = new EventEmitter<any[]>();
  @Input()
  previews: string[]=[];
  @Input()
  imageInfos?: Observable<any>;
  // selectedFiles?: FileList;
  selectedFiles:any[]=[];
  // progressInfos: any[] = [];
  // message: string[] = [];

  constructor() { }

  ngOnInit(): void {
    // this.imageInfos = this.uploadService.getFiles();
  }
  selectFiles(event: any): void {
    // this.message = [];
    // this.progressInfos = [];
    //this.selectedFiles = event.target.files;
    
    this.previews = [];
    this.selectedFiles = [];
    // if (this.selectedFiles && this.selectedFiles[0]) {
      // const numberOfFiles = this.selectedFiles.length;
    const files = event.target.files;
    
    if(event.target.files && event.target.files[0]){
      const numberOfFiles = files.length;
      for (let i = 0; i < numberOfFiles; i++) {
        // file = files[i];
        this.selectedFiles.push(files[i]);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
    this.onUploadImage.emit(this.selectedFiles);
  }
  
  removeImage(index) {

    // this.previews.slice(index,1);
   this.previews.splice(index,1);
    this.selectedFiles.splice(index,1);
    // this.selectedFiles = this.selectedFiles.filter((file:File)=> file !== this.selectedFiles[index]);
    this.onUploadImage.emit(this.selectedFiles);
  }
  // uploadFiles(): void {
  //   this.message = [];
  //   if (this.selectedFiles) {
  //     for (let i = 0; i < this.selectedFiles.length; i++) {
  //       this.upload(i, this.selectedFiles[i]);
  //     }
  //   }
  // }
  // upload(idx: number, file: File): void {
  //   this.progressInfos[idx] = { value: 0, fileName: file.name };
  //   if (file) {
      // this.uploadService.upload(file).subscribe(
      //   (event: any) => {
      //     if (event.type === HttpEventType.UploadProgress) {
      //       this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
      //     } else if (event instanceof HttpResponse) {
      //       const msg = 'Uploaded the file successfully: ' + file.name;
      //       this.message.push(msg);
      //       this.imageInfos = this.uploadService.getFiles();
      //     }
      //   },
      //   (err: any) => {
      //     this.progressInfos[idx].value = 0;
      //     const msg = 'Could not upload the file: ' + file.name;
      //     this.message.push(msg);
      //   });
    // }
  // }
}
