import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Produto } from '../screen/entity/produto';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProdutoService{
    url = 'https://laticinio-mineirinho.herokuapp.com/';
    urlLocal = 'http://localhost:8080/'
constructor(private http: HttpClient){}

    save(produto: Produto): Observable<any> {
        return this.http.post<Produto>(this.url + 'produto', produto)
    }

    getProduto(): Observable<Produto[]>{
        return this.http.get<Produto[]>(this.url + 'produto');
    }

    getProdutoList(): Observable<Produto[]>{
        return this.http.get<Produto[]>(this.url + 'produto/list');
    }


    atualizar(produto: Produto): Observable<any>{
        return this.http.put<Produto>(this.url + `produto/${produto.id}`, produto);
    }

    getProdutoControle(): Observable<Produto[]>{
        return this.http.get<Produto[]>(this.url + 'produto/controle');
    }

}