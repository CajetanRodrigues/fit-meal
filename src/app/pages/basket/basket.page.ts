import { RoutineService } from './../../providers/routine.service';
import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { BasketService } from '../../providers/basket.service';
import { AboutPage } from '../about/about';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit, DoCheck {
  meals = [];
  tipShow = false;
  totalProteins: number;
  totalCarbs: number;
  totalCals: number;
  selectMeals: any;
  framedRoutine: any = [];
  hide = false;
  idx = 0;
  mealsCount = 0;
  constructor(private router: Router,
              private basketService: BasketService,
              private modalController: ModalController,
              private route: ActivatedRoute,
              private routineService: RoutineService,
              private storage: Storage) {
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.totalProteins = this.router.getCurrentNavigation().extras.state.totalProteins;
                    this.totalCarbs = this.router.getCurrentNavigation().extras.state.totalCarbs;
                    this.totalCals = this.router.getCurrentNavigation().extras.state.totalCals;
                    this.meals = [...new Set(this.router.getCurrentNavigation().extras.state.selectMeals)];
                    this.mealsCount = this.router.getCurrentNavigation().extras.state.mealsCount;
                  }
                });
               }

  ngOnInit() {
    console.log(this.meals);
    setInterval(() => {
      this.idx = 0;
      this.meals.forEach((meal) => {
        if( meal.quantity <= 0 ) {
          this.meals.splice(this.idx);
        }
        this.idx++;
      });
    },100);
  }
  navigatePrev() {
    const navigationExtras: NavigationExtras = {
      state: {
        mealsCount: this.mealsCount,
        totalProteins: this.totalProteins,
        totalCarbs:  this.totalCarbs,
        totalCals: this.totalCals
      }
    };
    this.router.navigate(['meals'], navigationExtras);
  }
  async presentModal(meal: any) {
    const modal = await this.modalController.create({
      component: AboutPage,
      componentProps: {
        Meal: meal
      }
    });
    return await modal.present();
  }
  minusQuantity(Meal: any) {
    this.mealsCount = 0;
    console.log(this.meals.length)

    console.log(this.meals);
    let idx = -1;
    this.meals.forEach((meal) => {
        idx++;
        if (meal.description === Meal.description ) {
          meal.quantity -= 1;
          if (meal.quantity === 0) {
            this.meals.splice(idx, 1);
          }
        }
      });


    this.meals.forEach( (meal: any) => {
        if (meal.description === Meal.description) {
          this.totalProteins -= 2;
          this.totalCarbs -= 10;
          this.totalCals -= 15;
        }
    });
    this.meals.forEach( (meal: any) => {
      this.mealsCount += meal.quantity;
    });
    console.log('Total Meal Quntity: ' + this.mealsCount);
}
 ngDoCheck() {
    // let idx = -1;
    // this.meals.forEach((meal) => {
    //   idx++;
    //   if(meal.quantity === 0) {
    //     delete meal[idx];
    //   }
    // });
    if (this.meals.length === 0) {
      this.tipShow = true;
    } else {
      this.tipShow = false;
    }
    
  }
navigateToRoutine() {
    this.routineService.frameRoutine(
      {
        totalProteins: this.totalProteins,
        totalCarbs: this.totalCarbs,
        totalCalories: this.totalCals,
        basket: this.meals
      }
    )
    .subscribe((data) => {
      console.log(data);
      let navigationExtras: NavigationExtras = {
        state: {
          framedRoutine: data,
          from: 'basket'
        }
      };
      this.router.navigateByUrl('routine', navigationExtras);
    });
  }
}
