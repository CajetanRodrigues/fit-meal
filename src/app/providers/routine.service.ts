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
      ('http://18.181.189.89:8081/frame-routine',
      {
        totalProteins: data.totalProteins,
        totalCarbs: data.totalCarbs,
        totalCalories: data.totalCalories,
        basket: data.basket
      } , httpOptions);
  }

  addRoutine(data: any): Observable<any> {
    return this.http.post<any>
      ('http://18.181.189.89:8081/add-routine',
      {
        userId: '5ed90fd57f053059fa1bee49',
        routineName: data.routineName,
        routineFramed: data.routineFramed,
      } , httpOptions);
  }

  readRoutinesById(userId: any): Observable<any> {
    return this.http.post<any>
      ('http://18.181.189.89:8081/read-routines',
      {
        'userId' : '5ed90fd57f053059fa1bee49'
      },
      httpOptions);
  }

  updateRoutineById(routineId: any, routineFramed: any): Observable<any> {
    return this.http.post<any>
      ('http://18.181.189.89:8081/update-routine',
      {
        'routineId': routineId,
        'routineFramed': routineFramed
      },
      httpOptions);
  }


}
