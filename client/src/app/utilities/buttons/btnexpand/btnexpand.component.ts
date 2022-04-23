import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-btnexpand',
  templateUrl: './btnexpand.component.html',
  styleUrls: ['./btnexpand.component.css']
})
export class BtnexpandComponent {
  // @HostBinding('class.button-backgroud') private ishovering: boolean;
  @Input() iCon:string;
  @Input() iText:string;
  @Input() iColor:string;
  ishovering:boolean;
  constructor() { }
  // @HostListener('document:mouseover', ['$event'])
  // mouseover(event) {
  //     if(event.target.matches('.button')) {
  //         this.ishovering =true
  //     }
  // }

}
