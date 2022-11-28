import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Login } from '../screen/entity/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'https://laticineo-mineirinho.herokuapp.com/';
  urlLocal = 'http://localhost:8080/'
  constructor(private http: HttpClient) { }

  verifica(login: Login): Observable<any>{
    return this.http.get(this.url + "login?login=" +
    login.login + "&senha=" + login.senha).pipe(delay(1000))
  }
  
  //     return this.http.get("https://emporiomineirinho.vercel.app/login?username=" +
  //     return this.http.get("http://localhost:8080/login?username=" +
}