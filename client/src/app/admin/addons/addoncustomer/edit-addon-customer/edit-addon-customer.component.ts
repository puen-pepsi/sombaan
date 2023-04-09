import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addonCustomerDto, addonCutomerCreationDto } from '../../addons.model';
import { AddonStateService } from '../../state/addon-state-service';
import { AddonCustomerService } from '../addon-customer.service';

@Component({
  selector: 'app-edit-addon-customer',
  templateUrl: './edit-addon-customer.component.html',
  styleUrls: ['./edit-addon-customer.component.css']
})
export class EditAddonCustomerComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private addonStateService : AddonStateService,
              private addonCustomerService: AddonCustomerService,
              private router: Router) { }

  model: addonCustomerDto;
  states;
  ngOnInit(): void {
    this.addonStateService.getAll().subscribe(res => {
      this.states = res;
    })
    this.activatedRoute.params.subscribe(params => {
      this.addonCustomerService.getById(params['id']).subscribe(addoncustomer => {
        this.model = addoncustomer;
      })
    });

  }

  saveChanges(addonCutomerCreationDto: addonCutomerCreationDto){
    this.addonCustomerService.edit(this.model.id, addonCutomerCreationDto)
    .subscribe(() => {
      this.router.navigate(["/admin/addoncustomer"]);
    });
  }
}
