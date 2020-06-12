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
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>
      ('http://18.181.189.89:8081/signup',
      {
        email: email,
        name: name,
        password: password
      } , httpOptions);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>
      ('http://18.181.189.89:8081/login',
      {
        email: email,
        password: password
      } , httpOptions);
  }
}
