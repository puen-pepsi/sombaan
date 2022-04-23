import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../_modules/shared.module';
import { UtilitiesModule } from '../utilities/utilities.module';

@NgModule({
  declarations: [
  
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    UtilitiesModule
  ]
})
export class ProfileModule { }
