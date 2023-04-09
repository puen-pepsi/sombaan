import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addonStateCreationDTO, addonstateDto } from '../../addons.model';
import { AddonStateService } from '../addon-state-service';

@Component({
  selector: 'app-edit-state',
  templateUrl: './edit-state.component.html',
  styleUrls: ['./edit-state.component.css']
})
export class EditStateComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
    private addonStateService: AddonStateService,
    private router: Router) { }

  model: addonstateDto;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.addonStateService.getById(params['id']).subscribe(addonstate => {
        this.model = addonstate;
      })
    });
  }

  saveChanges(addonStateCreationDTO: addonStateCreationDTO){
    this.addonStateService.edit(this.model.id, addonStateCreationDTO)
    .subscribe(() => {
      this.router.navigate(["/admin/addonstate"]);
    });
  }
}
