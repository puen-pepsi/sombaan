import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { SocialUser } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  @Input() headlogo:string;
  model:any = {};
  public errorMessage: string = '';
  public showError: boolean;


  ShowToggle = false;
  constructor(public accountService: AccountService ,
    private router : Router,
    private route :ActivatedRoute,
    private toastr:ToastrService

    ) {}


  ngOnInit(): void {

   };





}
