import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input-multi-img',
  templateUrl: './input-multi-img.component.html',
  styleUrls: ['./input-multi-img.component.css']
})
export class InputMultiImgComponent implements OnInit {
  @Output()
  onUploadImage = new EventEmitter<FileList>();
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  @Input()
  previews: string[]=[];
  @Input()
  imageInfos?: Observable<any>;
  constructor() { }

  ngOnInit(): void {
    // this.imageInfos = this.uploadService.getFiles();
  }
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    // console.log(this.selectedFiles)
    // this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
    console.log(this.previews)
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
