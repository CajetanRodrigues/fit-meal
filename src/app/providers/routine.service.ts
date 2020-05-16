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
export class RoutineService {

  constructor(private http: HttpClient) { }
  frameRoutine(data: any): Observable<any> {
    return this.http.post<any>
      ('http://ec2-13-127-91-5.ap-south-1.compute.amazonaws.com/frame-routine',
      {
        totalProteins: data.totalProteins,
        totalCarbs: data.totalCarbs,
        totalCalories: data.totalCalories,
        basket: data.basket
      } , httpOptions);
  }

  addRoutine(data: any): Observable<any> {
    return this.http.post<any>
      ('http://ec2-13-127-91-5.ap-south-1.compute.amazonaws.com/add-routine',
      {
        userId: data.userId,
        routineName: data.routineName,
        routineFramed: data.routineFramed,
      } , httpOptions);
  }

  readRoutinesById(userId: any): Observable<any> {
    return this.http.post<any>
      ('http://ec2-13-127-91-5.ap-south-1.compute.amazonaws.com/read-routines',
      {
        'userId' : userId
      },
      httpOptions);
  }

  updateRoutineById(routineId: any, routineFramed: any): Observable<any> {
    return this.http.post<any>
      ('http://ec2-13-127-91-5.ap-south-1.compute.amazonaws.com/update-routine',
      {
        'routineId': routineId,
        'routineFramed': routineFramed
      },
      httpOptions);
  }


}
