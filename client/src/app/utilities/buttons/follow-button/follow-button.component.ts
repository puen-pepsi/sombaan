import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { articleDTO } from 'src/app/article/articles.model';
import { Profile } from 'src/app/profile/profile.model';
import { ProfilesService } from 'src/app/profile/profiles.service';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css']
})
export class FollowButtonComponent {
  constructor(
    private profilesService: ProfilesService,
    private router: Router,
    private accountService:AccountService
  ) {}

  @Input() profile: Profile;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleFollowing() {
    this.isSubmitting = true;
      if( !this.accountService.isAuthenticated()){
         this.router.navigateByUrl('authentication/login');
         return of(null)
      }

        // Follow this profile if we aren't already
        if (!this.profile.following) {
          return this.profilesService.follow(this.profile.username).subscribe(res =>{
            console.log(res)
            this.isSubmitting = false;
            this.toggle.emit(true);
          })
        }else{
          return this.profilesService.unfollow(this.profile.username).subscribe(res =>{
            console.log(res);
            this.isSubmitting = false;
            this.toggle.emit(false);
          })
        }
      }
}
