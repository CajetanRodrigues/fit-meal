import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    })
};
@Injectable({
  providedIn: 'root'
})
export class ImageSearchService {

  constructor(private http: HttpClient) { }

  fetchGoogleImages(searchValue: string): Observable<any> {
    return this.http.post<any>
      ('http://ec2-13-127-91-5.ap-south-1.compute.amazonaws.com/searchImages',
      {
        searchQuery: searchValue
      } , httpOptions);
  }
}

