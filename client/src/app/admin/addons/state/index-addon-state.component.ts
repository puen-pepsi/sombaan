import { Component, OnInit } from '@angular/core';
import { addonstateDto } from '../addons.model';
import { AddonStateService } from './addon-state-service';

@Component({
  selector: 'app-index-addon-state',
  templateUrl: './index-addon-state.component.html',
  styleUrls: ['./index-addon-state.component.css']
})
export class IndexAddonStateComponent implements OnInit {
  addonstates: addonstateDto[];

  columnsToDisplay = ['name', 'actions'];

  constructor(private addonStateService : AddonStateService) { }

  ngOnInit(): void {
   this.loadAddonState();
  }

  loadAddonState(){
    this.addonStateService.getAll().subscribe(addonstates => {
      this.addonstates = addonstates;
    });
  }

  delete(id: number){
    this.addonStateService.delete(id)
    .subscribe(() => {
      this.loadAddonState();
    });
  }

}
