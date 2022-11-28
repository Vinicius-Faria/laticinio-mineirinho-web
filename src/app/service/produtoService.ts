import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Produto } from '../screen/entity/produto';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProdutoService{
    url = 'https://laticineo-mineirinho.herokuapp.com/';
    urlLocal = 'http://localhost:8080/'
constructor(private http: HttpClient){}

    save(produto: Produto): Observable<any> {
        return this.http.post<Produto>(this.urlLocal + 'produto', produto)
    }

    getProduto(): Observable<Produto[]>{
        return this.http.get<Produto[]>(this.urlLocal + 'produto');
    }

    atualizar(produto: Produto): Observable<any>{
        return this.http.put<Produto>(this.urlLocal + `produto/${produto.id}`, produto);
      }

}