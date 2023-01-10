import { Component, OnInit, EventEmitter, Output, Injectable } from '@angular/core';
import { ProdutoService } from '../../service/produtoService';
import { delay } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { __values } from 'tslib';
import { Produto } from '../entity/produto';
import { X } from 'chart.js/dist/chunks/helpers.core';

@Component({
  selector: 'app-controle-estoque',
  templateUrl: './controle-estoque.component.html',
  styleUrls: ['./controle-estoque.component.css']
})
export class ControleEstoqueComponent implements OnInit {

  card: any = [];
  cardCompleto : any = [];
  dto: any = [];
  loading = false;
  searchByName = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  backList : Boolean = false;

  constructor(
    private service: ProdutoService,
    private _snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    try {
      this.loading = true;
      this.card = await this.service.getProdutoControle().toPromise();

      delay(300);
      this.cardCompleto = await this.card;

      this.loading = false;
    } catch (error) {
      
    }
  }

  onSearch(string : String){

    let cardSearch = new  Array();
    if(string == ''){
      this.openSnackBar('Digite uma palavra para usar como filtro.','OK');
      return;
    }

    this.card = null;
    this.loading = true;

    this.cardCompleto.forEach(async (element : Produto) => {
      if(element.nome.toUpperCase().includes(string.toString().toUpperCase())){
          cardSearch.push(element);
          this.backList = true;
        }
    });

    this.card = cardSearch;
    if(this.card == null || this.card.length == 0 ){
      this.openSnackBar('Não foi possivel encontrar nenhum produto com : ' + string,'OK');
      this.loading = false;
      this.card = this.cardCompleto;
      this.backList = false;
      return;
    }

    this.loading = false;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5 * 1000,
      horizontalPosition: this.horizontalPosition,
      panelClass: 'panelClass'
    });
  }

  onBackList(){
    this.searchByName = '';
    this.card = this.cardCompleto;
    this.backList = false;
  }

}
