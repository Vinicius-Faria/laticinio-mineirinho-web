import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelatorioSaida } from '../screen/entity/relatorioSaida';

@Injectable({
    providedIn: 'root'
})
export class RelatorioService{
    url = 'https://laticineo-mineirinho.herokuapp.com/';
    urlLocal = 'http://localhost:8080/'
    headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient){}

    getRelatorioVenda(relatorio: RelatorioSaida): Observable<any>{
        return this.http.get<any>(this.url + "relatorio/saida", {
            headers: this.headers,
            observe: 'response',
            params:{
                nome: relatorio.nome,
                dataInicio: JSON.stringify(relatorio.dataInicio),
                dataFim: JSON.stringify(relatorio.dataFim)
            },
            responseType: 'blob' as 'json'
          });
    }

    getRelatorioEntrada(relatorio: RelatorioSaida): Observable<any>{
        return this.http.get<any>(this.url + "relatorio/entrada", {
            headers: this.headers,
            observe: 'response',
            params:{
                nome: relatorio.nome,
                dataInicio: JSON.stringify(relatorio.dataInicio),
                dataFim: JSON.stringify(relatorio.dataFim)
            },
            responseType: 'blob' as 'json'
          });
    }

}