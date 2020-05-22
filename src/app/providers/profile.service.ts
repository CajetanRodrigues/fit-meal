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
export class ProfileService {
  userId = '';
  constructor(private http: HttpClient,
              private profileService: ProfileService) { }
  addBMI(bmi: any, id: string): Observable<any> {
    return this.http.post<any>
      ('http://13.127.91.5:8081/add-bmi',
      {
        userId: id,
        age: bmi.age,
        height: bmi.height,
        weight: bmi.weight,
        gender: bmi.gender
      } , httpOptions);
  }
  addInfo(data: any, id: string): Observable<any> {
    return this.http.post<any>
      ('http://13.127.91.5:8081/add-info',
      {
        userId: id,
        goal: data.goal,
        activityLevel: data.activityLevel,
        bodyType: data.bodyType,
        mealsNumber: data.mealsNumber
      } , httpOptions);
  }
}
