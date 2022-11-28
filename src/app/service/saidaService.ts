import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Saida } from '../screen/entity/saida';
import { Observable, delay } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SaidaService{
    url = 'https://laticineo-mineirinho.herokuapp.com/';
    urlLocal = 'http://localhost:8080/'

    constructor(private http: HttpClient){}

    save(saida: Array<Saida>): Observable<any> {
        return this.http.post<Saida>(this.urlLocal + 'saida', saida)
    }

    getNumeroVenda(): Observable<any>{
        return this.http.get(this.urlLocal + 'saida/numero')
    }

}