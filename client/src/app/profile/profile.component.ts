import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { Profile } from './profile.model';
import { ProfilesService } from './profiles.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  user: User;
  isUser: boolean;
  constructor(private accountService:AccountService,
              private profileService:ProfilesService,
              private route : ActivatedRoute) { 
                this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user=user);

              }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
        this.profile = data["profile"];

        this.isUser = (this.user.username === this.profile.username);
    });
      console.log(this.profile)
      // this.profileService.get().subscribe( data => {
      //   this.profile = data;
      // })
  }
  onToggleFollowing(event){
    console.log(event)
  }
}
