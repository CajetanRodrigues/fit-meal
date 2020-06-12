import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  displayName: any;
  imageUrl: any;
  email: any;


  constructor(private storage: Storage, private menu: MenuController) {
    this.menu.enable(true);
    storage.get('google_user').then((user: any) => {
      this.displayName = user.displayName;
      this.imageUrl = user.imageUrl;
      this.email = user.email;
    });
   }
  ngOnInit() {

  }

}
