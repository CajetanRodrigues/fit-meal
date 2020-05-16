import { MealsService } from './../../providers/meals.service';
import { MealsFilterPage } from './meals-filter/meals-filter.page';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { AboutPage } from '../about/about';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { BasketService } from '../../providers/basket.service';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {
  searchValue = '';
  selectMeals = [];
  backupMealArray = [];
  totalProteins = 0;
  totalCarbs = 0;
  totalCals = 0;
  buttonFlag = false;
  meals: any[] = [];
  excludeTracks: any = [];
  skipCount = 0;
  pageNumber = 0;
  constructor(public modalController: ModalController,
              private router: Router,
              private basketService: BasketService,
              public routerOutlet: IonRouterOutlet,
              private modalCtrl: ModalController,
              private mealsService: MealsService,
              private route: ActivatedRoute,
              private storage: Storage) {
                this.apiCall(0,4); 

   }
  apiCall(skipCount: number, pageNumber: number) {
    if(skipCount === 0) {
      this.mealsService.readMeals(skipCount, pageNumber)
      .subscribe((data) => {
        console.log('fetched items')
        console.log(data);
        this.meals = data;
        this.backupMealArray = this.meals;
      });
    }
    else {
      this.mealsService.readMeals(skipCount,pageNumber)
      .subscribe((data) => {
        console.log(data);
        Array.prototype.push.apply(this.meals, data); 
        console.log(this.meals)
        this.backupMealArray = this.meals;
        if(data.status === 'over') {
          return false;
        }
      });
    }
    
  }
  ngOnInit() {
  }
  navigateToAddMeal() {
    this.router.navigateByUrl('add-meal');
  }
  addMeal(meal: any) {
    this.totalProteins = 0;
    this.totalCarbs = 0;
    this.totalCals = 0;
    setTimeout(() => {
    //   this.selectMeals.forEach( (Meal: any) => {
    //     if (Meal.name === meal.name) {
    //       Meal.quantity = Meal.quantity + 1;
    //     }
    //     this.selectMeals.push(meal);
    // });
    this.selectMeals.push(meal);
    setTimeout(() => {
        this.selectMeals.forEach( (meal: any) => {
          this.totalProteins += meal.protein;
      });
        this.selectMeals.forEach( (meal: any) => {
        this.totalCarbs += meal.carbohydrates;
    });
        this.selectMeals.forEach( (meal: any) => {
      this.totalCals += meal.calories;
    });
      }, 2);
    }, 2);
    meal.quantity++;

  }
  searchMeals() {
    if (this.searchValue === '') {
      this.meals = this.backupMealArray;
    }
    this.meals = this.backupMealArray;
    console.log(this.searchValue);
    setTimeout(() => {
      this.meals = this.meals.filter((meal) => {
        return meal.item.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1;
      });
    },500);

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
  navigate() {
    setTimeout(
      () => {
        this.router.navigateByUrl('basket');
        let navigationExtras: NavigationExtras = {
          state: {
            totalProteins: this.totalProteins,
            totalCarbs: this.totalCarbs,
            totalCals: this.totalCals,
            selectMeals: this.selectMeals
          }
        };
        this.router.navigate(['basket'], navigationExtras);

      }, 20
    );
  }
  async presentFilter() {
    const modal = await this.modalController.create({
      component: MealsFilterPage
    });
    return await modal.present();
  }
  loadData(event) {
    this.skipCount+=4;
    this.pageNumber+=1;
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      this.apiCall(this.skipCount, this.pageNumber);
      if (this.meals.length === 8) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
