import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meals-filter',
  templateUrl: './meals-filter.page.html',
  styleUrls: ['./meals-filter.page.scss'],
})
export class MealsFilterPage implements OnInit {
  tracks: {name: string, isChecked: boolean}[] = [
    {
      name: 'High Carbs',
      isChecked: true
    },
    {
      name: 'Low Carbs',
      isChecked: true
    },
    {
      name: 'High Cals',
      isChecked: true
    },
    {
      name: 'Low Cals',
      isChecked: true
    },
    {
      name: 'High Protein',
      isChecked: true
    },
    {
      name: 'Low Protein',
      isChecked: true
    },
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
  applyFilters() {
    this.modalCtrl.dismiss();
  }
  selectAll(check: boolean) {
    // set all to checked or unchecked
    this.tracks.forEach(track => {
      track.isChecked = check;
    });
  }
}
