import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { htmlPageCreateDTO } from '../html-page.model';
import { HtmlPageService } from '../html-page.service';

@Component({
  selector: 'app-create-html-page',
  templateUrl: './create-html-page.component.html',
  styleUrls: ['./create-html-page.component.css']
})
export class CreateHtmlPageComponent implements OnInit {

  constructor(private htmlPageService:HtmlPageService,
              private route:Router) { }

  ngOnInit(): void {
  }
  saveChanges(htmlPageCreateDTO : htmlPageCreateDTO){
    this.htmlPageService.create(htmlPageCreateDTO).subscribe(()=>{
      this.route.navigate(['']);
    })
  }
}
