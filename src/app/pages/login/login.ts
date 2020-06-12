import { ProfileService } from './../../providers/profile.service';
import { AuthenticationService } from './../../providers/authentication.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';

import { UserOptions } from '../../interfaces/user-options';
import { ToastController, LoadingController, Platform, AlertController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { MenuController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  userData: any = {};

  login: any = { email: '', password: '' };
  submitted = false;
  msg: string;
  googleData: any;
  FB_APP_ID = 2958999687554664;
  facebookData: any = {};
  constructor(
    public router: Router,
    private authentication: AuthenticationService,
    public toastController: ToastController,
    private profileService: ProfileService,
    private googlePlus: GooglePlus,
    private fb: Facebook,
		  private nativeStorage: NativeStorage,
		  public loadingController: LoadingController,
		  private platform: Platform,
    public alertController: AlertController,
    public menu: MenuController,
    private storage: Storage
  ) {
    this.menu.enable(true);
  }
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
    this.storage.get('userId').then((data) => this.presentToast(console.log(data)));
    if (form.valid) {
      this.authentication.login(this.login.email, this.login.password).
      subscribe((data) => {
        console.log(data);
        if (data.status === true) {
          this.profileService.userId = data.userId;
          this.storage.set('userId', data.userId);

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

  googleSignIn() {
    this.googlePlus.login({})
      .then(user => {
        this.userData = user;
		      this.nativeStorage.setItem('google_user', {
            displayName: user.displayName,
            email: user.email,
            imageUrl: user.imageUrl
          })
          .then(() => {
            this.router.navigate(['/bmi']);
          }, error => {
            console.log(error);
          });
            } )
      .catch(err => this.userData = `Error ${JSON.stringify(err)}`);
  }

  async doFbLogin() {
		const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
		});
		this.presentLoading(loading);


  this.fb.login(['public_profile', 'email'])
  .then((res: FacebookLoginResponse) => {console.log('Logged into Facebook!', res);
                                         this.facebookData = res; })
  .catch(e => console.log('Error logging into Facebook', e));
	}

	async presentLoading(loading) {
		return await loading.present();
	}
}
