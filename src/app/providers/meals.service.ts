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
export class MealsService {

  constructor(private http: HttpClient) { }
  readMeals(skipCount: number, pageNumber: number): Observable<any> {
    return this.http.post<any>
      ('http://ec2-13-127-91-5.ap-south-1.compute.amazonaws.com/read-meals', {skipCount: skipCount, pageNumber: pageNumber},  httpOptions);
  }
}
