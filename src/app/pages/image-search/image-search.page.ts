import { ImageSearchService } from './../../providers/image-search.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, DoCheck } from '@angular/core';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    })
};
@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.page.html',
  styleUrls: ['./image-search.page.scss'],
})
export class ImageSearchPage implements OnInit, DoCheck {
  searchValue = '';
  imageList = [];
  constructor(private router: Router,
              private httpClient: HttpClient,
              private imageSearchService: ImageSearchService) { }
  ngOnInit() {
  }
  navigatePrev() {
    this.router.navigateByUrl('add-meal');
  }
  ngDoCheck() {
    console.log(this.searchValue);
  }
  fetchImages() {
    console.log('Query String is : ' + this.searchValue);
    this.imageSearchService.fetchGoogleImages(this.searchValue)
    .subscribe((data: any) => {
      this.imageList = data;
      console.log(data);
    });
  }
  transferUrl(image) {
    localStorage.setItem('url', image);
    this.router.navigateByUrl('add-meal');
  }
}
