import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { Login } from '../screen/entity/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  verifica(login: Login): Observable<any>{
    return this.http.get("https://emporiomineirinho.vercel.app/login?username=" +
    login.login + "&senha=" + login.senha).pipe(delay(1000))
  }
  
  //     return this.http.get("https://emporiomineirinho.vercel.app/login?username=" +
  //     return this.http.get("http://localhost:8080/login?username=" +
}