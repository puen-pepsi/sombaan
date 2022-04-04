import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { htmlPageDTO } from './html-page.model';
import { HtmlPageService } from './html-page.service';

@Component({
  selector: 'app-html-page',
  templateUrl: './html-page.component.html',
  styleUrls: ['./html-page.component.css'],
  // encapsulation:ViewEncapsulation.None
})
export class HtmlPageComponent implements OnInit {
  model : htmlPageDTO;
  constructor(private htmlPageService:HtmlPageService,
              private activeRouter:ActivatedRoute,
              private router:Router) { }
  ngOnInit(): void {
    this.htmlPageService.putget(1).subscribe(putGetDto =>{
      this.model = putGetDto;
      console.log(this.model)
    })
  }

}
