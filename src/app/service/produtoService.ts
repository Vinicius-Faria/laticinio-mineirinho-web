import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Produto } from '../screen/entity/produto';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProdutoService{
constructor(private http: HttpClient){}

    save(produto: Produto): Observable<any> {
        return this.http.post<Produto>('https://laticineo-mineirinho.herokuapp.com/produto', produto)
    }

    getProduto(): Observable<Produto[]>{
        return this.http.get<Produto[]>('https://laticineo-mineirinho.herokuapp.com/produto');
    }

}