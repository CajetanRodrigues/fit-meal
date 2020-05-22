import { ProfileService } from './../../providers/profile.service';
import { RoutineService } from './../../providers/routine.service';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-saved-routines',
  templateUrl: './saved-routines.page.html',
  styleUrls: ['./saved-routines.page.scss'],
})
export class SavedRoutinesPage implements OnInit {
  routineList = [];
  backupRoutineList = []
  searchValue = '';
  constructor(private router: Router,
              private routineService: RoutineService,
              private storageService: Storage,
              private profileService: ProfileService,
              private menu: MenuController) {
                this.menu.enable(true);
                this.apiCall();
    }

  ngOnInit() {
  }
  doRefresh(event) {
    console.log(event);
    this.apiCall();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);

  }
  apiCall() {
    // this.storageService.get('userId')
    // .then((id) => {
      this.routineService.readRoutinesById(this.profileService.userId)
      .subscribe((data) => {
        this.routineList = data;
        console.log(data);
        this.backupRoutineList = this.routineList;
      });
    // });
  }
  searchMeals() {
    if (this.searchValue === '') {
      this.routineList = this.backupRoutineList;
    }
    this.routineList = this.backupRoutineList;
    setTimeout(() => {
      this.routineList = this.routineList.filter((routine) => {
        return routine.routineName.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1;
      });
    },100);
  }

  showRoutine(routine) {
    console.log(routine._id);
    let navigationExtras: NavigationExtras = {
      state: {
        framedRoutine: routine.routineFramed,
        from: 'saved-routines',
        routineId: routine._id
      }
    };
    this.router.navigate(['routine'], navigationExtras);
  }
}
