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
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: any = { email: '', password: '' };
  submitted = false;
  msg: string;
  googleData: any;
  FB_APP_ID = 2958999687554664;
  constructor(
    public userData: UserData,
    public router: Router,
    private authentication: AuthenticationService,
    public toastController: ToastController,
    private storageService: Storage,
    private profileService: ProfileService,
    private googlePlus: GooglePlus,
    private fb: Facebook,
		  private nativeStorage: NativeStorage,
		  public loadingController: LoadingController,
		  private platform: Platform,
    public alertController: AlertController,
    public menu: MenuController
  ) { 
    this.menu.enable(false);
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
    this.storageService.get('userId').then((data) => this.presentToast(console.log(data)));
    if (form.valid) {
      this.authentication.login(this.login.email, this.login.password).
      subscribe((data) => {
        console.log(data);
        if (data.status === true) {
          this.profileService.userId = data.userId;
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
  googleLogin() {
    this.googlePlus.login({})
  .then(res => {
    this.googleData = res;
  })
  .catch(err => console.error(err));
  }

  async doFbLogin() {
		const loading = await this.loadingController.create({
			message: 'Please wait...'
		});
		this.presentLoading(loading);

		// the permissions your facebook app needs from the user
  const permissions = ['public_profile', 'email'];

		this.fb.login(permissions)
		.then(response => {
			const userId = response.authResponse.userID;

			// Getting name and gender properties
			this.fb.api('/me?fields=name,email', permissions)
			.then(user => {
				user.picture = 'https://graph.facebook.com/' + userId + '/picture?type=large';
				// now we have the users info, let's save it in the NativeStorage
				this.nativeStorage.setItem('facebook_user',
				{
					name: user.name,
					email: user.email,
					picture: user.picture
				})
				.then(() => {
					this.router.navigate(['/bmi']);
					loading.dismiss();
				}, error => {
					console.log(error);
					loading.dismiss();
				});
			});
		}, error => {
			console.log(error);
			loading.dismiss();
		});
	}

	async presentLoading(loading) {
		return await loading.present();
	}
}
