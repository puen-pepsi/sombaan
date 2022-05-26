import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.css']
})
export class NavMainComponent implements OnInit {
@Output() toggle = new EventEmitter<void>();
isSticky: boolean = false;
@HostListener('window:scroll', ['$event'])
checkScroll() {
  this.isSticky = window.pageYOffset >= 180;
}
constructor() { }
  ngOnInit(): void {
  }
  sidenavtoggle(){
    this.toggle.emit();
  }
}
