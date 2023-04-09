import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { addonStateCreationDTO } from '../../addons.model';
import { AddonStateService } from '../addon-state-service';

@Component({
  selector: 'app-create-state',
  templateUrl: './create-state.component.html',
  styleUrls: ['./create-state.component.css']
})
export class CreateStateComponent implements OnInit {
  errors: string[] = [];

  constructor(private router: Router, private addonStateService: AddonStateService) { }

  ngOnInit(): void {
   
  }

  saveChanges(addonStateCreationDTO: addonStateCreationDTO){
    this.addonStateService.create(addonStateCreationDTO).subscribe(() => {
      this.router.navigate(['/admin/addonstate']);
    }, error => this.errors = parseWebAPIErrors(error));

  }
}
