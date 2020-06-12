import { MealsService } from './../../providers/meals.service';
import { MealsFilterPage } from './meals-filter/meals-filter.page';
import { Component, OnInit, DoCheck } from '@angular/core';
import { ModalController, IonRouterOutlet, MenuController } from '@ionic/angular';
import { AboutPage } from '../about/about';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { BasketService } from '../../providers/basket.service';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { Storage } from '@ionic/storage';
import { ThrowStmt } from '@angular/compiler';


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
  pageSize = 15;
  pageNumber = 0;
  mealsCount = 0;
  constructor(public modalController: ModalController,
              private router: Router,
              private basketService: BasketService,
              public routerOutlet: IonRouterOutlet,
              private modalCtrl: ModalController,
              private mealsService: MealsService,
              private route: ActivatedRoute,
              private storage: Storage,
              public menu: MenuController) {
                this.menu.enable(true);
                this.apiCall(this.pageSize, this.pageNumber);
                this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.mealsCount = this.router.getCurrentNavigation().extras.state.mealsCount;
                    this.totalProteins = this.router.getCurrentNavigation().extras.state.totalProteins;
                    this.totalCarbs = this.router.getCurrentNavigation().extras.state.totalCarbs;
                    this.totalCals = this.router.getCurrentNavigation().extras.state.totalCals;
                    console.log('Meals Count: ' + this.mealsCount);
                  }
                });
   }
  apiCall(pageSize: number, pageNumber: number) {
    console.log('PageSize: ' + this.pageSize);
    console.log('PageNumber:' + this.pageNumber);
    const obj = {
      pageSize : this.pageSize,
      pageNumber: this.pageNumber
    };
    this.mealsService.readMeals(obj)
      .subscribe((data) => {
        console.log('fetched items');
        console.log(data);
        this.meals = [...this.meals, ...data];
        this.backupMealArray = this.meals;
        this.pageNumber += 1;
        // this.pageSize += 4;
      });
  }
  ngOnInit() {
  }
  // navigateToAddMeal() {
  //   this.router.navigateByUrl('add-meal');
  // }
  addMeal(meal: any) {

    this.totalProteins = 0;
    this.totalCarbs = 0;
    this.totalCals = 0;
    this.mealsCount = 0;
    // First Check if the meal already exists in the selectedMeals Array
    let flag = false;
    this.selectMeals.forEach((data: any) => {
      if (data.description === meal.description) {
        meal.quantity = meal.quantity + 1;
        flag = true;
      }
      console.log();
    });
    // Then, if still flag is false, then set quantity to 0 and push the meal for the first time in the array
    if (flag === false) {
      meal["quantity"] = 1;
      this.selectMeals.push(meal);
    }
    
    // After the meals quantity is properly synced, now sum up the total protein, carbs & cals

    this.selectMeals.forEach( (meal: any) => {
          this.totalProteins += 2*meal.quantity;
      });
    this.selectMeals.forEach( (meal: any) => {
        this.totalCarbs += 10*meal.quantity;
    });
    this.selectMeals.forEach( (meal: any) => {
      this.totalCals += 15*meal.quantity;
    });
    this.selectMeals.forEach( (meal: any) => {
      this.mealsCount += meal.quantity;
    });

    console.log(this.selectMeals);


  }
  searchMeals() {
    this.mealsService.searchMeal(this.searchValue)
    .subscribe((mealArray) => {
      this.meals = mealArray;
    });
    if (this.searchValue === '') {
      this.meals = this.backupMealArray;
    }
    // this.meals = this.backupMealArray;
    // console.log(this.searchValue);
    // setTimeout(() => {
    //   this.meals = this.meals.filter((meal) => {
    //     return meal.item.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1;
    //   });
    // }, 500);

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
        const navigationExtras: NavigationExtras = {
          state: {
            totalProteins: this.totalProteins,
            totalCarbs: this.totalCarbs,
            totalCals: this.totalCals,
            selectMeals: this.selectMeals,
            mealsCount: this.mealsCount
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
    this.apiCall(this.pageSize, this.pageNumber);
    setTimeout(() => {
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length == 1000) {
      //   event.target.disabled = true;
      // }
    }, 4500);
  }
}
