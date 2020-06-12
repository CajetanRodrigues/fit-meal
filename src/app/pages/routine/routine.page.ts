import { ProfileService } from './../../providers/profile.service';
import { RoutineService } from './../../providers/routine.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.page.html',
  styleUrls: ['./routine.page.scss'],
})
export class RoutinePage implements OnInit {
  animals: string[];
  edit = false;
  routines: any = [];
  // routines: any[] = [
  //   {
  //     time: '8.00 AM',
  //     header: true
  //   },
  //   {
  //     header: false,
  //     name: 'Oats',
  //     image: 'https://www.glutenfreewatchdog.org/news/wp-content/uploads/2018/05/cdam2018post10photo-640x445.jpg',
  //     protein: 16.9,
  //     carbs:  66.3,
  //     calories: 389,
  //     benefits: ['Good Anti-Oxidant', 'Improves Blood Sugar control', 'Lower Cholesterol levels'],
  //     quantity: 2
  //   },
  //   {
  //     time: '11.00 AM',
  //     header: true
  //   },
  //   {
  //     header: false,
  //     name: 'Potato',
  //     image: 'https://rukminim1.flixcart.com/image/352/352/jtsz3bk0/vegetable/b/8/4/2-potato-un-branded-no-whole-original-imafdsymh2aepaph.jpeg?q=70',
  //     protein: 2,
  //     carbs:  17,
  //     calories: 77,
  //     benefits: ['Heart Health', 'Good Antioxidant'],
  //     quantity: 1
  //   },
  //   {
  //     header: false,
  //     name: 'Milk',
  //     image: 'https://img.medscape.com/thumbnail_library/is_200219_milk_splash_glass_800x450.jpg',
  //     protein: 3.4,
  //     carbs:  5,
  //     calories: 42,
  //     benefits: ['Bone Health', 'Immune System', 'Promotes Greater gains'],
  //     quantity: 5
  //   },
  // ];
  buttonName = '';
  routineId: any;
  constructor(private router: Router,
              public alertController: AlertController,
              private route: ActivatedRoute,
              private routineService: RoutineService,
              private storageService: Storage,
              private toastController: ToastController,
              private profileService: ProfileService,
              private menu: MenuController) {
                this.menu.enable(true);
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.routines = this.router.getCurrentNavigation().extras.state.framedRoutine;
                    console.log(this.routines)
                    this.routineId = this.router.getCurrentNavigation().extras.state.routineId;
                    console.log(this.router.getCurrentNavigation().extras.state.routineId);
                    if(this.router.getCurrentNavigation().extras.state.from === 'saved-routines') {
                      this.buttonName = 'Update Routine';
                    } else {
                      this.buttonName = 'Create Routine';
                    }
                  }
                });
              }

  ngOnInit() {
  }
  navigatePrev() {
    this.router.navigateByUrl('basket');
  }
  reorderRoutine(event) {
    console.log(event);
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);
    const itemMove = this.routines.splice(event.detail.from, 1)[0];
    console.log(itemMove);
    this.routines.splice(event.detail.to, 0, itemMove);
    event.detail.complete();
  }
  editRoutine() {
    if ( this.edit === false) {
      this.edit = true;
    } else {
      this.edit = false;
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: '<b>All changes saved successfully!</b>',
      duration: 1000,
      position: 'top',
      color: 'success',
      mode: 'ios',
    });
    toast.present();
  }
  addOrUpdateRoutine() {
    if ( this.buttonName === 'Update Routine') {
      this.routineService.updateRoutineById(this.routineId, this.routines)
      .subscribe();
      this.presentToast();
    } else {
      this.presentAlertPrompt();
    }
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'Name your Routine',
      inputs: [
        {
          name: 'routineName',
          type: 'text',
          placeholder: 'Ex. High Carbs Routine',
          value: ''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
          //   this.storageService.get('userId')
          // .then((id) => {
            this.routineService.addRoutine({
              userId: this.profileService.userId,
              routineName: data.routineName,
              routineFramed: this.routines,
            })
            .subscribe((data) => {
              console.log(data);
              this.router.navigateByUrl('saved-routines');
            });
          // });
            
          }
        }
      ]
    });

    await alert.present();
  }

}
