import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { multipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { addonCutomerCreationDto } from '../../addons.model';
import { AddonStateService } from '../../state/addon-state-service';
import { AddonCustomerService } from '../addon-customer.service';

@Component({
  selector: 'app-create-addon-customer',
  templateUrl: './create-addon-customer.component.html',
  styleUrls: ['./create-addon-customer.component.css']
})
export class CreateAddonCustomerComponent implements OnInit {
  errors: string[] = [];
  states;
  constructor(private router: Router, 
              private addonStateService : AddonStateService,
              private addonCustomerService: AddonCustomerService) { }

  ngOnInit(): void {
   //get state
    this.addonStateService.getAll().subscribe(res => {
      this.states = res;
    })
  }

  saveChanges(addonCutomerCreation:addonCutomerCreationDto){
    
    this.addonCustomerService.create(addonCutomerCreation).subscribe(() => {
      this.router.navigate(['/admin/addoncustomer']);
    }, error => this.errors = parseWebAPIErrors(error));

  }
}
