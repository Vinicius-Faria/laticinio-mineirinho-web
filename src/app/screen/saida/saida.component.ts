import { NumberFormatStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../service/produtoService';
import { Produto } from '../entity/produto';
import { Saida } from '../entity/saida';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';
import { SaidaService } from '../../service/saidaService';
import { delay } from 'rxjs';

@Component({
  selector: 'app-saida',
  templateUrl: './saida.component.html',
  styleUrls: ['./saida.component.css']
})
export class SaidaComponent implements OnInit {

  card: Array<Saida>;
  produto: Produto[] = [];
  produtoSelected = '';
  quantidade = '';
  preco = '';
  saidaForm : Saida;
  valorTotal = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  bolleanCard = false;
  nVenda = '';
  loading = false;
  adicionado = true;
  pagamento = 0;
  estoque = '';

  constructor(
    private service: ProdutoService,
    private _snackBar: MatSnackBar,
    private saidaService: SaidaService
  ) { 
    this.saidaForm = new Saida();
    this.card = new Array<Saida>();
  }

  async ngOnInit() {
    try {
      this.loading = true;
      this.loading = true;
      this.service.getProduto().subscribe(
        resposta => this.produto = resposta
      )
      this.loading = false;
      this.atualizaNumeroVenda();
    } catch (error) {}
  }

  atualizaNumeroVenda(){
    this.saidaService.getNumeroVenda().subscribe(
      success => {
        this.nVenda = String(Number(success) + 1);
        this.loading = false
      },
    );
  }

  onSubmit(){

    if(!this.produtoSelected || !this.quantidade || !this.preco){
      this.openSnackBar('Preencha os campos corretamente.','OK');
      return;
    }

    if(this.pagamento == 0){
      this.openSnackBar('Escolha o método de pagamento.','OK');
      return;
    }

    this.alteraPontuacao();
    if(this.adicionado){
      this.atualizaForm();

      if(this.card.length > 0){
        this.card.forEach((element: any) => {
          if(element.nome === this.saidaForm.nome){
            this.openSnackBar('Produto já adicionado, retire do carrinho e adcione corretamente','OK');
            this.bolleanCard = true
          }
        });
      }
  
      if(!this.bolleanCard){
        this.saidaForm.venda = this.nVenda;
        if(this.pagamento == 1){
          this.saidaForm.pagamento = 'dinheiro';
        }else{
          this.saidaForm.pagamento = 'cartao';
        }
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
    this.adicionado = true;
  }

  atualizaForm(){
    this.saidaForm.nome = this.produtoSelected;
    this.saidaForm.preco = String(Number(this.preco));
    this.saidaForm.quantidade = this.quantidade;
    this.saidaForm.totalProd = String((Number(this.preco) * Number(this.quantidade)).toFixed(2)).toString();
  }

  updateValues(){

    this.produto.forEach((element: Produto) => {
      if(element.nome == this.produtoSelected.toString()){
        this.preco = element.preco;
        this.estoque = element.quantidade;
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
    this.preco = this.preco.valueOf().replace(',' , '.');

    this.produto.forEach((element: Produto) => {
      if(element.nome == this.produtoSelected.toString()){
        if(Number(this.quantidade) > Number(element.quantidade)){
          this.openSnackBar('Produto "' + element.nome + '" com quantidade de "' + element.quantidade + '" no estoque. Não foi possivel adicionar.','OK');
          this.adicionado = false;
        }
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8 * 1000,
      horizontalPosition: this.horizontalPosition,
      panelClass: 'panelClass'
    });
  }

  finalizarSaida(){
    this.loading = true;

    if(this.card.length == 0){
      this.openSnackBar('Nenhum produto adicionado.','OK');
      this.loading = false;
      return;
    }

    this.saidaService.save(this.card).subscribe(
      success => {
          this.openSnackBar('Saída Finalizada','OK');
          this.card = [];
          this.saidaForm.nome = '';
          this.saidaForm.preco = '';
          this.saidaForm.quantidade = '';
          this.saidaForm.total = '';
          this.saidaForm.totalProd = '';
          this.valorTotal = 0;
          this.pagamento = 0;
          this.atualizaNumeroVenda();
      },
    );
  }

  numeroVenda(){
    return this.saidaService.getNumeroVenda();
  }

  tipoPagamento(num: number){
    this.pagamento = num;
  }
}
