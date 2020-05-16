import { ProfileService } from './../../providers/profile.service';
import { AuthenticationService } from './../../providers/authentication.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';

import { UserOptions } from '../../interfaces/user-options';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: any = { email: '', password: '' };
  submitted = false;
  msg: string;

  constructor(
    public userData: UserData,
    public router: Router,
    private authentication: AuthenticationService,
    public toastController: ToastController,
    private storageService: Storage,
    private profileService: ProfileService
  ) { }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      color: 'light',
      animated: true,
      mode: 'ios'
    });
    toast.present();
  }
  onLogin(form: NgForm) {
    this.submitted = true;
    this.storageService.get('userId').then((data) => this.presentToast(console.log(data)))
    if (form.valid) {
      this.authentication.login(this.login.email, this.login.password).
      subscribe((data) => {
        console.log(data);
        if (data.status === true) {
          this.profileService.userId = data.userId
          this.storageService.set('userId', data.userId);
          
          this.router.navigateByUrl('bmi');
        } else {
          this.presentToast('<b >Please check your credentials !<b>');
        }
      });
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
