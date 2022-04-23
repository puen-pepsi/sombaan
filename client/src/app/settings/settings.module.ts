import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '../_modules/shared.module';
import { SettingsComponent } from './settings.component';
import { UtilitiesModule } from '../utilities/utilities.module';


@NgModule({
  declarations: [
  
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
    UtilitiesModule
  ]
})
export class SettingsModule { }
