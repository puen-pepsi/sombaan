import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { htmlPageCreateDTO, htmlPageDTO } from '../html-page.model';
import { HtmlPageService } from '../html-page.service';

@Component({
  selector: 'app-edit-html-page',
  templateUrl: './edit-html-page.component.html',
  styleUrls: ['./edit-html-page.component.css']
})
export class EditHtmlPageComponent implements OnInit {
  model: htmlPageDTO;
  constructor(private htmlpageService:HtmlPageService,
              private activeRoute:ActivatedRoute,
              private router : Router) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.htmlpageService.putget(params["id"]).subscribe(putGetDto =>{
        this.model = putGetDto;
        console.log(this.model)
      })
    })
  }
  saveChanges(htmlPageCreateDTO : htmlPageCreateDTO){
    this.htmlpageService.edit(this.model.id,htmlPageCreateDTO).subscribe(()=>{
       this.router.navigate([]);
    })
  }
}
