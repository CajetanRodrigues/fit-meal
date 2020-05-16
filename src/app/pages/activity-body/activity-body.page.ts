import { ProfileService } from './../../providers/profile.service';
import { Component, OnInit } from '@angular/core';
import { UserOptions } from '../../interfaces/user-options';
import { UserData } from '../../providers/user-data';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-activity-body',
  templateUrl: './activity-body.page.html',
  styleUrls: ['./activity-body.page.scss'],
})
export class ActivityBodyPage {

  // login: UserOptions = { username: '', password: '' };
  data: any = { goal: '', bodyType: '', mealsPerDay: 0, activity: ''}
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    private profileService: ProfileService,
    private storageService: Storage
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      // this.storageService.get('userId')
      // .then((id) => {
        this.profileService.addInfo(this.data, this.profileService.userId)
        .subscribe((data) => {
          if (data) {
            console.log(data);
            this.router.navigateByUrl('meals');
          }
        });
      // });

    }
  }
}

