import { Component, OnInit } from '@angular/core';
import { categorytypeDTO } from './categorytype.model';
import { CategorytypeService } from './categorytype.service';

@Component({
  selector: 'app-index-categorytype',
  templateUrl: './index-categorytype.component.html',
  styleUrls: ['./index-categorytype.component.css']
})
export class IndexCategorytypeComponent implements OnInit {
  categorytypes: categorytypeDTO[];

  columnsToDisplay = ['name', 'actions'];
  constructor(private categoryTypeService :CategorytypeService) { }

  ngOnInit(): void {
    this.loadcategorytype();
  }
  loadcategorytype(){
    this.categoryTypeService.getAll().subscribe(categorytypes => {
      this.categorytypes = categorytypes;
    });
  }

  delete(id: number){
    this.categoryTypeService.delete(id)
    .subscribe(() => {
      this.loadcategorytype();
    });
  }
}
