import { ToastController } from '@ionic/angular';
import { ProfileService } from './../../providers/profile.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserOptions } from '../../interfaces/user-options';
import { UserData } from '../../providers/user-data';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.page.html',
  styleUrls: ['./bmi.page.scss'],
})
export class BmiPage {

  bmi: any = { weight: '', height: '', age: '', gender: ''  };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    private profileService: ProfileService,
    private storageService: Storage
  ) { }
  onLogin(form: NgForm) {
    this.submitted = true;
    this.storageService.get('userId')
    .then((id) => {console.log(id); });
    if (form.valid) {
      console.log(this.bmi);

      // this.storageService.get('userId')
      // .then((id) => {
      //   console.log(id);
      this.profileService.addBMI(this.bmi, this.profileService.userId)
        .subscribe((data) => {
          console.log(data);
          if (data === true) {
            this.router.navigateByUrl('activity-body');
          }
        });
      // })

    }
  }

}
