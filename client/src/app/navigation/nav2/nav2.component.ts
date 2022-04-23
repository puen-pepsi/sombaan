import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-nav2',
  templateUrl: './nav2.component.html',
  styleUrls: ['./nav2.component.css']
})
export class Nav2Component implements OnInit {
  @Output()
  sidenavtoggle = new EventEmitter<void>();
  constructor(public accountService:AccountService,
              private router:Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  onToggleSidenav(){
    this.sidenavtoggle.emit();
  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
    this.toastr.success("LogOut success")
  } 
}
