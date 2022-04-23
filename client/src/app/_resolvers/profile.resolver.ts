import { Injectable, } from '@angular/core';
import {   ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Profile } from '../profile/profile.model';
import { ProfilesService } from '../profile/profiles.service';

@Injectable({
  providedIn:'root'
})
export class ProfileResolver implements Resolve<Profile> {
  constructor(private profileService:ProfilesService) {}
  resolve(route:ActivatedRouteSnapshot): Observable<Profile> {
    return this.profileService.get(route.paramMap.get('username'));
  }
}
