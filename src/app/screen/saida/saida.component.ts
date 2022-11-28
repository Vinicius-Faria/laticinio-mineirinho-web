import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../service/produtoService';
import { Produto } from '../entity/produto';
import { Saida } from '../entity/saida';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.css']
})
export class SaidaComponent implements OnInit {

  card: any = [];
  produto: any = [];
  produtoSelected = '';
  quantidade = '';
  preco = '';
  saidaForm : Saida;
  valorTotal = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  bolleanCard = false;

  constructor(
    private service: ProdutoService,
    private _snackBar: MatSnackBar
  ) { 
    this.produto = new Produto();
    this.saidaForm = new Saida();
  }

  async ngOnInit() {
    try {
      this.produto = await this.service.getProduto().toPromise();
    } catch (error) {}
  }

  onSubmit(){

   this.atualizaForm();

    if(this.card.length > 0){
      this.card.forEach((element: any) => {
        if(element.nome === this.saidaForm.nome){
          this.openSnackBar('Produto já adicionado, retire do carrinho e adcione corretamente','OK');
          this.bolleanCard = true;
        }
      });
    }

    if(!this.bolleanCard){
      this.card.push({
        ...this.saidaForm
        });
        
        this.preco = '';
        this.quantidade = '';
        this.valorTotal = this.valorTotal + Number(this.saidaForm.totalProd);
        this.saidaForm.total = String(this.valorTotal.toFixed(2));
    }
    this.bolleanCard = false;
  }

  atualizaForm(){
    this.saidaForm.nome = this.produtoSelected;
    this.saidaForm.preco = this.preco;
    this.saidaForm.quantidade = this.quantidade;
    this.saidaForm.totalProd = String((Number(this.preco) * Number(this.quantidade)).toFixed(2)).toString();
  }

  updateValues(){

    this.produto.forEach((element: Produto) => {
      if(element.nome == this.produtoSelected.toString()){
        this.preco = element.preco;
      }
    });

  }

  retirarCard(card: any){
    this.card.forEach((element: any) => {
      if(element.nome == card.nome){
        this.card.splice(this.card.indexOf(element), 1);
        this.valorTotal = (Number(this.valorTotal) - Number(element.preco * element.quantidade));
      }
    });
  }

  alteraPontuacao(){
    this.quantidade = this.quantidade.valueOf().replace(',', '.');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8 * 1000,
      horizontalPosition: this.horizontalPosition,
      panelClass: 'panelClass'
    });
  }

  finalizarSaida(){
  }
}
