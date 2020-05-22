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
  readMeals(obj: any): Observable<any> {
    return this.http.post<any>
      ('http://13.127.91.5:8081/read-meals', obj, httpOptions);
  }
  searchMeal(term): Observable<any> {
    return this.http.get<any>
      ('http://13.127.91.5:8083/search/' + term , httpOptions);
  }
}
